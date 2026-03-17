import { useState } from 'react';
import { getWorkouts, setWorkouts } from '../utils/storage';
import { generateId } from '../utils/idGenerator';

export function useWorkouts() {
  const [workouts, setWorkoutsState] = useState(() => getWorkouts());

  function persist(next) {
    setWorkoutsState(next);
    setWorkouts(next);
  }

  function saveWorkout(data) {
    const workout = { ...data, id: generateId() };
    persist([...workouts, workout]);
    return workout.id;
  }

  function deleteWorkout(id) {
    persist(workouts.filter((w) => w.id !== id));
  }

  function getWorkoutById(id) {
    return workouts.find((w) => w.id === id) || null;
  }

  const sorted = [...workouts].sort((a, b) =>
    a.date < b.date ? -1 : a.date > b.date ? 1 : 0
  );

  return { workouts: sorted, saveWorkout, deleteWorkout, getWorkoutById };
}
