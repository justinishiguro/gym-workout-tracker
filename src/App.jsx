import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useWorkouts } from './hooks/useWorkouts';
import { useExerciseTemplates } from './hooks/useExerciseTemplates';
import { UnitProvider } from './context/UnitContext';
import NavBar from './components/layout/NavBar';
import WorkoutListPage from './pages/WorkoutListPage';
import NewWorkoutPage from './pages/NewWorkoutPage';
import WorkoutDetailPage from './pages/WorkoutDetailPage';
import ProgressPage from './pages/ProgressPage';

export default function App() {
  const { workouts, saveWorkout, deleteWorkout, getWorkoutById } = useWorkouts();
  const { templates, addTemplate } = useExerciseTemplates();

  return (
    <UnitProvider>
    <BrowserRouter>
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
            />
          }
        />
        <Route
          path="/progress"
          element={<ProgressPage workouts={workouts} templates={templates} />}
        />
      </Routes>
    </BrowserRouter>
    </UnitProvider>
  );
}
