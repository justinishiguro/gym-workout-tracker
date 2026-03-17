import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import WorkoutCard from '../components/workout/WorkoutCard';

export default function WorkoutListPage({ workouts }) {
  useEffect(() => {
    document.title = 'History — Workout Tracker';
  }, []);

  return (
    <PageWrapper title="History">
      {workouts.length === 0 ? (
        <div className="stack stack-md" style={{ textAlign: 'center', paddingTop: '3rem' }}>
          <p className="text-muted">No workouts yet.</p>
          <Link to="/workout/new" className="btn btn-primary" style={{ alignSelf: 'center' }}>
            Log Your First Workout
          </Link>
        </div>
      ) : (
        <div className="stack stack-sm">
          {workouts.map((w) => (
            <WorkoutCard key={w.id} workout={w} />
          ))}
        </div>
      )}
    </PageWrapper>
  );
}
