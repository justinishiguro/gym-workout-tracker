import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import WorkoutForm from '../components/workout/WorkoutForm';

export default function NewWorkoutPage({ saveWorkout, templates, addTemplate }) {
  const navigate = useNavigate();
  const [saveError, setSaveError] = useState(null);

  useEffect(() => {
    document.title = 'Log Workout — Workout Tracker';
  }, []);

  async function handleSave(data) {
    setSaveError(null);
    try {
      await saveWorkout(data);
      navigate('/');
    } catch (err) {
      setSaveError(err.message || 'Failed to save workout. Check your Supabase setup.');
    }
  }

  return (
    <PageWrapper title="Log Workout">
      {saveError && (
        <p style={{ color: 'var(--color-danger)', marginBottom: '1rem', fontSize: '0.875rem' }}>
          {saveError}
        </p>
      )}
      <WorkoutForm onSave={handleSave} templates={templates} addTemplate={addTemplate} />
    </PageWrapper>
  );
}
