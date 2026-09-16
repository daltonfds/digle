import { supabase } from "./supabaseClient";

async function currentUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data.user;
}

export async function getCurrentUser() {
  return currentUser();
}

export async function getDashboardData() {
  const user = await currentUser();
  if (!user) return { user: null, stats: null, progress: [], achievements: [] };

  const [statsResult, progressResult, achievementsResult] = await Promise.all([
    supabase
      .from("user_stats")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle(),

    supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", user.id)
      .order("completed_at", { ascending: false }),

    supabase
      .from("user_achievements")
      .select("achievement_id, earned_at, achievements(*)")
      .eq("user_id", user.id)
      .order("earned_at", { ascending: false }),
  ]);

  if (statsResult.error) throw statsResult.error;
  if (progressResult.error) throw progressResult.error;
  if (achievementsResult.error) throw achievementsResult.error;

  return {
    user,
    stats: statsResult.data,
    progress: progressResult.data || [],
    achievements: achievementsResult.data || [],
  };
}

export async function getLessonsWithProgress() {
  const user = await currentUser();

  const [{ data: lessons, error: lessonsError }, progressResult] =
    await Promise.all([
      supabase
        .from("lessons")
        .select("*")
        .eq("is_published", true)
        .order("sort_order", { ascending: true }),

      user
        ? supabase
            .from("user_progress")
            .select("*")
            .eq("user_id", user.id)
        : Promise.resolve({ data: [], error: null }),
    ]);

  if (lessonsError) throw lessonsError;
  if (progressResult.error) throw progressResult.error;

  const progressMap = new Map(
    (progressResult.data || []).map((item) => [item.lesson_id, item])
  );

  return (lessons || []).map((lesson) => ({
    ...lesson,
    progress: progressMap.get(lesson.id) || null,
    completed: progressMap.get(lesson.id)?.status === "completed",
  }));
}

export async function getLessonWithQuiz(lessonId) {
  const [
    { data: lesson, error: lessonError },
    { data: questions, error: questionsError },
  ] = await Promise.all([
    supabase
      .from("lessons")
      .select("*")
      .eq("id", lessonId)
      .maybeSingle(),

    supabase
      .from("questions")
      .select(`
        id,
        lesson_id,
        prompt,
        explanation,
        sort_order,
        question_options (
          id,
          option_text
        )
      `)
      .eq("lesson_id", lessonId)
      .order("sort_order", { ascending: true }),
  ]);

  if (lessonError) throw lessonError;
  if (questionsError) throw questionsError;

  return {
    lesson,
    questions: questions || [],
  };
}

export async function completeLesson(lessonId) {
  const { data, error } = await supabase.rpc("complete_lesson", {
    p_lesson_id: lessonId,
    p_xp: 0,
    p_score: 0,
  });

  if (error) throw error;

  await supabase.rpc("unlock_achievements");

  return data;
}

export async function submitQuiz(lessonId, answers) {
  const { data, error } = await supabase.rpc("submit_quiz_attempt", {
    p_lesson_id: lessonId,
    p_answers: answers,
  });

  if (error) throw error;

  await supabase.rpc("unlock_achievements");

  return data;
}

export async function recordActivity({
  type,
  referenceId = null,
  minutes = 0,
  xp = 0,
}) {
  const { data, error } = await supabase.rpc("record_study_activity", {
    p_activity_type: type,
    p_reference_id: referenceId,
    p_minutes: minutes,
    p_xp: xp,
  });

  if (error) throw error;

  await supabase.rpc("unlock_achievements");

  return data;
}

export async function getAchievements() {
  const user = await currentUser();

  const [{ data: achievements, error }, earnedResult] = await Promise.all([
    supabase
      .from("achievements")
      .select("*")
      .order("title"),

    user
      ? supabase
          .from("user_achievements")
          .select("achievement_id, earned_at")
          .eq("user_id", user.id)
      : Promise.resolve({ data: [], error: null }),
  ]);

  if (error) throw error;
  if (earnedResult.error) throw earnedResult.error;

  const earned = new Map(
    (earnedResult.data || []).map((item) => [
      item.achievement_id,
      item.earned_at,
    ])
  );

  return (achievements || []).map((achievement) => ({
    ...achievement,
    unlocked: earned.has(achievement.id),
    earned_at: earned.get(achievement.id) || null,
  }));
}

export async function getNotes() {
  const user = await currentUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("user_notes")
    .select("*")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createNote({ title, content }) {
  const user = await currentUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("user_notes")
    .insert({
      user_id: user.id,
      title: title || "",
      content: content || "",
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateNote(id, { title, content }) {
  const { data, error } = await supabase
    .from("user_notes")
    .update({
      title: title || "",
      content: content || "",
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteNote(id) {
  const { error } = await supabase
    .from("user_notes")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

export async function getSavedVerses() {
  const user = await currentUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("saved_verses")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function saveVerse(verse) {
  const user = await currentUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("saved_verses")
    .upsert(
      {
        user_id: user.id,
        book: verse.book,
        chapter: verse.chapter,
        verse: verse.verse,
        reference: verse.reference,
        text: verse.text,
      },
      {
        onConflict: "user_id,book,chapter,verse",
      }
    )
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteSavedVerse(id) {
  const { error } = await supabase
    .from("saved_verses")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

export async function getGoals() {
  const user = await currentUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("user_goals")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function createGoal(goal) {
  const user = await currentUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("user_goals")
    .insert({
      user_id: user.id,
      title: goal.title,
      target: Number(goal.target) || 1,
      current: Number(goal.current) || 0,
      unit: goal.unit || "vezes",
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateGoal(id, values) {
  const { data, error } = await supabase
    .from("user_goals")
    .update({
      ...values,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteGoal(id) {
  const { error } = await supabase
    .from("user_goals")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

export async function getStudySessions(limit = 100) {
  const user = await currentUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("user_study_sessions")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data || [];
}

export async function getLeaderboard(limit = 50) {
  const { data, error } = await supabase
    .from("user_stats")
    .select(`
      user_id,
      xp_total,
      streak_current,
      streak_longest,
      profiles (
        display_name,
        avatar_url
      )
    `)
    .order("xp_total", { ascending: false })
    .limit(limit);

  if (error) throw error;

  return (data || []).map((item, index) => ({
    ...item,
    position: index + 1,
    display_name: item.profiles?.display_name || "Peregrino",
    avatar_url: item.profiles?.avatar_url || null,
  }));
}

export async function getPreferences() {
  const user = await currentUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("user_preferences")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function savePreferences(values) {
  const user = await currentUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("user_preferences")
    .upsert({
      user_id: user.id,
      ...values,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}
