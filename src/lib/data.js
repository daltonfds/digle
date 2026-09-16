import { supabase } from "./supabase";

export async function getCourses() {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function getCourse(courseId) {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", courseId)
    .single();

  if (error) throw error;
  return data;
}

export async function getModules(courseId) {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("modules")
    .select("*")
    .eq("course_id", courseId)
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function getLessons(moduleId) {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("lessons")
    .select("*")
    .eq("module_id", moduleId)
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function getLesson(id) {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("lessons")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function getQuestions(lessonId) {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("questions")
    .select(`
      *,
      question_options (*)
    `)
    .eq("lesson_id", lessonId)
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function getStats(userId) {
  if (!supabase || !userId) return null;

  const { data } = await supabase
    .from("user_stats")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  return data;
}

export async function getProgress(userId) {
  if (!supabase || !userId) return [];

  const { data } = await supabase
    .from("user_progress")
    .select("*")
    .eq("user_id", userId);

  return data || [];
}

export async function saveProgress({
  userId,
  lessonId,
  xp = 0,
  completed = true,
  score = 0,
}) {
  if (!supabase || !userId) return;

  const { error } = await supabase
    .from("user_progress")
    .upsert(
      {
        user_id: userId,
        lesson_id: lessonId,
        completed,
        score,
        xp_earned: xp,
        completed_at: completed ? new Date().toISOString() : null,
      },
      {
        onConflict: "user_id,lesson_id",
      }
    );

  if (error) throw error;
}

export async function updateStats(userId, values) {
  if (!supabase || !userId) return;

  const { data: current } = await supabase
    .from("user_stats")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  const next = {
    ...(current || {}),
    ...values,
    user_id: userId,
  };

  delete next.created_at;
  delete next.updated_at;

  await supabase
    .from("user_stats")
    .upsert(next, { onConflict: "user_id" });
}

export async function checkAccess(lessonId) {
  if (!supabase) {
    return { has_access: false };
  }

  const { data, error } = await supabase.functions.invoke(
    "check-access",
    {
      body: {
        lesson_id: lessonId,
      },
    }
  );

  if (error) throw error;
  return data || { has_access: false };
}

export async function getPurchases(userId) {
  if (!supabase || !userId) return [];

  const { data } = await supabase
    .from("purchases")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return data || [];
}

export async function getPasses(userId) {
  if (!supabase || !userId) return [];

  const { data } = await supabase
    .from("premium_passes")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return data || [];
}
