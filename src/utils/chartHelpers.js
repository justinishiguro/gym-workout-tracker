/**
 * computeSeries — build chart data points for a given exercise and metric.
 * @param {Array} workouts - all workouts from storage
 * @param {string} exerciseName - case-insensitive exercise name to filter
 * @param {'maxWeight'|'totalVolume'} metric
 * @returns {Array<{date: string, value: number}>} sorted ascending by date
 */
export function computeSeries(workouts, exerciseName, metric) {
  const lower = exerciseName.toLowerCase();
  const points = [];

  for (const workout of workouts) {
    const matching = workout.exercises.filter(
      (ex) => ex.name.toLowerCase() === lower
    );
    if (matching.length === 0) continue;

    let value;
    if (metric === 'maxWeight') {
      value = Math.max(
        ...matching.flatMap((ex) => ex.sets.map((s) => Number(s.weight) || 0))
      );
    } else {
      // totalVolume = sum of (reps * weight) across all matching sets
      value = matching.reduce(
        (sum, ex) =>
          sum +
          ex.sets.reduce(
            (s2, set) => s2 + (Number(set.reps) || 0) * (Number(set.weight) || 0),
            0
          ),
        0
      );
    }

    points.push({ date: workout.date, value });
  }

  return points.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
}
