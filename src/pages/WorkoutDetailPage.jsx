import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import { useUnit, fromKg } from '../context/UnitContext';
import './WorkoutDetailPage.css';

export default function WorkoutDetailPage({ getWorkoutById, deleteWorkout }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const workout = getWorkoutById(id);
  const { unit } = useUnit();

  useEffect(() => {
    document.title = workout
      ? `${workout.name || 'Workout'} — Workout Tracker`
      : 'Not Found — Workout Tracker';
  }, [workout]);

  if (!workout) {
    return (
      <PageWrapper title="Not Found">
        <p className="text-muted">Workout not found.</p>
        <Link to="/" className="btn btn-secondary" style={{ marginTop: '1rem' }}>
          Back to History
        </Link>
      </PageWrapper>
    );
  }

  function handleDelete() {
    if (window.confirm('Delete this workout?')) {
      deleteWorkout(workout.id);
      navigate('/');
    }
  }

  return (
    <PageWrapper>
      <div className="detail-header row-spread" style={{ marginBottom: '1.25rem' }}>
        <div>
          <p className="text-muted text-sm">{workout.date}</p>
          <h1>{workout.name || 'Workout'}</h1>
        </div>
        <button className="btn btn-danger btn-sm" onClick={handleDelete}>
          Delete
        </button>
      </div>

      {workout.notes && (
        <div className="card" style={{ marginBottom: '1rem' }}>
          <p className="label">Notes</p>
          <p className="text-sm">{workout.notes}</p>
        </div>
      )}

      <div className="stack stack-md">
        {workout.exercises.map((ex, i) => (
          <div key={ex.id} className="card detail-exercise">
            <h3 className="detail-ex-name">{ex.name}</h3>
            <table className="sets-table">
              <thead>
                <tr>
                  <th>Set</th>
                  <th>Reps</th>
                  <th>Weight ({unit})</th>
                </tr>
              </thead>
              <tbody>
                {ex.sets.map((s, j) => (
                  <tr key={j}>
                    <td>{j + 1}</td>
                    <td>{s.reps}</td>
                    <td>{fromKg(s.weight, unit)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      <Link to="/" className="btn btn-secondary" style={{ marginTop: '1.5rem', width: '100%' }}>
        ← Back to History
      </Link>
    </PageWrapper>
  );
}
