import { supabase } from "./supabase";

export async function fetchCourses() {
  const { data, error } = await supabase
    .from("courses")
    .select(`
      *,
      modules (
        *,
        lessons (*)
      )
    `)
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function fetchCourse(courseId) {
  const { data, error } = await supabase
    .from("courses")
    .select(`
      *,
      modules (
        *,
        lessons (
          *,
          questions (*)
        )
      )
    `)
    .eq("id", courseId)
    .single();

  if (error) throw error;
  return data;
}

export async function fetchUserProgress(userId) {
  const { data, error } = await supabase
    .from("user_progress")
    .select("*")
    .eq("user_id", userId);

  if (error) throw error;
  return data || [];
}

export async function markLessonComplete(userId, lessonId) {
  const { data, error } = await supabase
    .from("user_progress")
    .upsert(
      {
        user_id: userId,
        lesson_id: lessonId,
        completed: true,
        completed_at: new Date().toISOString(),
      },
      {
        onConflict: "user_id,lesson_id",
      }
    )
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function fetchUserStats(userId) {
  const { data, error } = await supabase
    .from("user_stats")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function createUserStats(userId) {
  const { data, error } = await supabase
    .from("user_stats")
    .upsert(
      {
        user_id: userId,
        xp: 0,
        level: 1,
        hearts: 5,
        streak: 0,
      },
      {
        onConflict: "user_id",
        ignoreDuplicates: true,
      }
    )
    .select()
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function updateUserStats(userId, updates) {
  const { data, error } = await supabase
    .from("user_stats")
    .upsert(
      {
        user_id: userId,
        ...updates,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "user_id",
      }
    )
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function fetchSavedVerses(userId) {
  const { data, error } = await supabase
    .from("saved_verses")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}
