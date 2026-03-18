import { useState, useEffect } from 'react';
import { getWorkouts, setWorkout, deleteWorkout as dbDeleteWorkout } from '../utils/storage';
import { generateId } from '../utils/idGenerator';

export function useWorkouts(userId) {
  const [workouts, setWorkoutsState] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    getWorkouts(userId).then((data) => {
      setWorkoutsState(data);
      setLoading(false);
    });
  }, [userId]);

  async function saveWorkout(data) {
    const workout = { ...data, id: generateId(), user_id: userId };
    await setWorkout(workout);
    setWorkoutsState((prev) => [...prev, workout]);
    return workout.id;
  }

  async function deleteWorkout(id) {
    await dbDeleteWorkout(id);
    setWorkoutsState((prev) => prev.filter((w) => w.id !== id));
  }

  function getWorkoutById(id) {
    return workouts.find((w) => w.id === id) || null;
  }

  const sorted = [...workouts].sort((a, b) =>
    a.date < b.date ? -1 : a.date > b.date ? 1 : 0
  );

  return { workouts: sorted, saveWorkout, deleteWorkout, getWorkoutById, loading };
}
