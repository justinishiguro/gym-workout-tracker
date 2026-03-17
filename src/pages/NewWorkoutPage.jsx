import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import WorkoutForm from '../components/workout/WorkoutForm';

export default function NewWorkoutPage({ saveWorkout, templates, addTemplate }) {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Log Workout — Workout Tracker';
  }, []);

  function handleSave(data) {
    saveWorkout(data);
    navigate('/');
  }

  return (
    <PageWrapper title="Log Workout">
      <WorkoutForm onSave={handleSave} templates={templates} addTemplate={addTemplate} />
    </PageWrapper>
  );
}
