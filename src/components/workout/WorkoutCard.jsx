import { Link } from 'react-router-dom';
import './WorkoutCard.css';

export default function WorkoutCard({ workout }) {
  const totalSets = workout.exercises.reduce((n, ex) => n + ex.sets.length, 0);

  return (
    <Link to={`/workout/${workout.id}`} className="workout-card card">
      <div className="wc-header row-spread">
        <div>
          <p className="wc-date text-muted text-sm">{workout.date}</p>
          <h3 className="wc-name">{workout.name || 'Workout'}</h3>
        </div>
        <span className="wc-arrow text-muted">›</span>
      </div>
      <div className="wc-meta row text-sm text-muted">
        <span>{workout.exercises.length} exercise{workout.exercises.length !== 1 ? 's' : ''}</span>
        <span>·</span>
        <span>{totalSets} set{totalSets !== 1 ? 's' : ''}</span>
      </div>
      {workout.exercises.length > 0 && (
        <p className="wc-exercises text-sm text-muted">
          {workout.exercises.map((ex) => ex.name).join(', ')}
        </p>
      )}
    </Link>
  );
}
