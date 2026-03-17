# Gym Workout Tracker

A simple, client-side workout logging app built with React and Vite. All data is stored locally in the browser — no account or backend required.

## Features

- **Log workouts** — add exercises with multiple sets (reps + weight) and optional notes
- **Workout history** — browse past workouts, view full details, and delete entries
- **Progress charts** — visualize max weight or total volume over time for any exercise using Recharts
- **Exercise autocomplete** — exercise names are saved as templates and suggested as you type
- **lbs / kg toggle** — switch units globally at any time; all weights convert automatically
- **Persistent storage** — data lives in `localStorage`, so it survives page refreshes

## Tech Stack

| Tool | Version |
|---|---|
| React | 19 |
| React Router | 7 |
| Recharts | 3 |
| Vite | 5 |

## Getting Started

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── components/
│   ├── charts/       # ProgressChart
│   ├── exercises/    # ExerciseNameInput (autocomplete)
│   ├── layout/       # NavBar, PageWrapper
│   └── workout/      # WorkoutForm, ExerciseBlock, SetRow, WorkoutCard
├── context/          # UnitContext (lbs/kg)
├── hooks/            # useWorkouts, useExerciseTemplates
├── pages/            # WorkoutListPage, NewWorkoutPage, WorkoutDetailPage, ProgressPage
└── utils/            # storage, idGenerator, chartHelpers
```
