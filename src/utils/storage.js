import { supabase } from './supabase'

export async function getWorkouts(userId) {
  const { data, error } = await supabase
    .from('workouts')
    .select('*')
    .eq('user_id', userId)
  if (error) throw error
  return data || []
}

export async function setWorkout(workout) {
  const { error } = await supabase
    .from('workouts')
    .upsert(workout)
  if (error) throw error
}

export async function deleteWorkout(id) {
  const { error } = await supabase
    .from('workouts')
    .delete()
    .eq('id', id)
  if (error) throw error
}

export async function getTemplates(userId) {
  const { data, error } = await supabase
    .from('exercise_templates')
    .select('*')
    .eq('user_id', userId)
  if (error) throw error
  return data || []
}

export async function setTemplate(template) {
  const { error } = await supabase
    .from('exercise_templates')
    .upsert(template)
  if (error) throw error
}
