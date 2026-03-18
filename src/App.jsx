import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SignIn, SignUp, useUser } from '@clerk/react';
import { useWorkouts } from './hooks/useWorkouts';
import { useExerciseTemplates } from './hooks/useExerciseTemplates';
import { UnitProvider } from './context/UnitContext';
import NavBar from './components/layout/NavBar';
import WorkoutListPage from './pages/WorkoutListPage';
import NewWorkoutPage from './pages/NewWorkoutPage';
import WorkoutDetailPage from './pages/WorkoutDetailPage';
import ProgressPage from './pages/ProgressPage';

function AuthenticatedApp({ userId }) {
  const { workouts, saveWorkout, deleteWorkout, getWorkoutById, loading } = useWorkouts(userId);
  const { templates, addTemplate } = useExerciseTemplates(userId);

  return (
    <UnitProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<WorkoutListPage workouts={workouts} />} />
        <Route
          path="/workout/new"
          element={
            <NewWorkoutPage
              saveWorkout={saveWorkout}
              templates={templates}
              addTemplate={addTemplate}
            />
          }
        />
        <Route
          path="/workout/:id"
          element={
            <WorkoutDetailPage
              getWorkoutById={getWorkoutById}
              deleteWorkout={deleteWorkout}
              loading={loading}
            />
          }
        />
        <Route
          path="/progress"
          element={<ProgressPage workouts={workouts} templates={templates} />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </UnitProvider>
  );
}

function AppRoutes() {
  const { isSignedIn, isLoaded, user } = useUser();

  if (!isLoaded) return null;

  if (isSignedIn) {
    return <AuthenticatedApp userId={user.id} />;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Routes>
        <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in" />} />
        <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" />} />
        <Route path="*" element={<Navigate to="/sign-in" replace />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
