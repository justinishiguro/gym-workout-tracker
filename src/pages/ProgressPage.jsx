import { useEffect, useMemo, useState } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import ProgressChart from '../components/charts/ProgressChart';
import { computeSeries } from '../utils/chartHelpers';
import { useUnit, fromKg } from '../context/UnitContext';
import './ProgressPage.css';

export default function ProgressPage({ workouts, templates }) {
  const { unit } = useUnit();
  const [selectedExercise, setSelectedExercise] = useState('');
  const [metric, setMetric] = useState('maxWeight');

  useEffect(() => {
    document.title = 'Progress — Workout Tracker';
  }, []);

  // Merge template names + all exercise names from workout history
  const exerciseNames = useMemo(() => {
    const set = new Set(templates.map((t) => t.name));
    for (const w of workouts) {
      for (const ex of w.exercises) {
        if (ex.name.trim()) set.add(ex.name.trim());
      }
    }
    return [...set].sort((a, b) => a.localeCompare(b));
  }, [workouts, templates]);

  const chartData = useMemo(() => {
    if (!selectedExercise) return [];
    const series = computeSeries(workouts, selectedExercise, metric);
    return series.map((pt) => ({ ...pt, value: fromKg(pt.value, unit) }));
  }, [workouts, selectedExercise, metric, unit]);

  return (
    <PageWrapper title="Progress">
      <div className="progress-controls stack stack-md">
        <div>
          <label className="label" htmlFor="prog-exercise">Exercise</label>
          <select
            id="prog-exercise"
            className="input"
            value={selectedExercise}
            onChange={(e) => setSelectedExercise(e.target.value)}
          >
            <option value="">-- Select exercise --</option>
            {exerciseNames.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>

        <div className="metric-toggle">
          <button
            type="button"
            className={`btn btn-sm${metric === 'maxWeight' ? ' btn-primary' : ' btn-secondary'}`}
            onClick={() => setMetric('maxWeight')}
          >
            Max Weight
          </button>
          <button
            type="button"
            className={`btn btn-sm${metric === 'totalVolume' ? ' btn-primary' : ' btn-secondary'}`}
            onClick={() => setMetric('totalVolume')}
          >
            Total Volume
          </button>
        </div>
      </div>

      {selectedExercise ? (
        <ProgressChart data={chartData} metric={metric} unit={unit} />
      ) : (
        <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
          <p className="text-muted">Select an exercise to view progress.</p>
        </div>
      )}
    </PageWrapper>
  );
}
