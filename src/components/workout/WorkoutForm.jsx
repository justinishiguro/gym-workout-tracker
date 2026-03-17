import { useState } from 'react';
import ExerciseBlock from './ExerciseBlock';
import { generateId } from '../../utils/idGenerator';
import { useUnit, toKg } from '../../context/UnitContext';
import './WorkoutForm.css';

function today() {
  return new Date().toISOString().slice(0, 10);
}

function emptyExercise() {
  return { id: generateId(), name: '', sets: [{ reps: '', weight: '' }] };
}

export default function WorkoutForm({ onSave, templates, addTemplate }) {
  const { unit } = useUnit();
  const [form, setForm] = useState({
    date: today(),
    name: '',
    notes: '',
    exercises: [emptyExercise()],
  });
  const [showErrors, setShowErrors] = useState(false);

  function updateExercise(index, updated) {
    setForm((f) => ({
      ...f,
      exercises: f.exercises.map((ex, i) => (i === index ? updated : ex)),
    }));
  }

  function addExercise() {
    setForm((f) => ({ ...f, exercises: [...f.exercises, emptyExercise()] }));
  }

  function removeExercise(index) {
    setForm((f) => ({
      ...f,
      exercises: f.exercises.filter((_, i) => i !== index),
    }));
  }

  function validate() {
    if (!form.date) return false;
    if (form.exercises.length === 0) return false;
    for (const ex of form.exercises) {
      if (!ex.name.trim()) return false;
      for (const s of ex.sets) {
        if (!s.reps || !s.weight) return false;
      }
    }
    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) {
      setShowErrors(true);
      return;
    }
    const payload = {
      ...form,
      exercises: form.exercises.map((ex) => ({
        ...ex,
        sets: ex.sets.map((s) => ({
          reps: Number(s.reps),
          weight: toKg(s.weight, unit),
        })),
      })),
    };
    onSave(payload);
  }

  return (
    <form className="workout-form stack stack-lg" onSubmit={handleSubmit} noValidate>
      {/* Date + Name */}
      <div className="form-row-2">
        <div>
          <label className="label" htmlFor="wf-date">Date *</label>
          <input
            id="wf-date"
            type="date"
            className={`input${showErrors && !form.date ? ' error' : ''}`}
            value={form.date}
            max={today()}
            onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
          />
          {showErrors && !form.date && <p className="error-msg">Date required</p>}
        </div>
        <div>
          <label className="label" htmlFor="wf-name">Workout Name</label>
          <input
            id="wf-name"
            type="text"
            className="input"
            placeholder="e.g. Push Day"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="label" htmlFor="wf-notes">Notes</label>
        <textarea
          id="wf-notes"
          className="input wf-notes"
          placeholder="How did it go?"
          rows={2}
          value={form.notes}
          onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
        />
      </div>

      {/* Exercises */}
      <div className="stack stack-md">
        <div className="row-spread">
          <h2>Exercises</h2>
          {showErrors && form.exercises.length === 0 && (
            <p className="error-msg">Add at least one exercise</p>
          )}
        </div>

        {form.exercises.map((ex, i) => (
          <ExerciseBlock
            key={ex.id}
            exercise={ex}
            exerciseIndex={i}
            onChange={(updated) => updateExercise(i, updated)}
            onRemove={() => removeExercise(i)}
            onNameBlur={(name) => addTemplate(name)}
            templates={templates}
            showErrors={showErrors}
            unit={unit}
          />
        ))}

        <button
          type="button"
          className="btn btn-secondary"
          onClick={addExercise}
        >
          + Add Exercise
        </button>
      </div>

      <button type="submit" className="btn btn-primary save-btn">
        Save Workout
      </button>
    </form>
  );
}
