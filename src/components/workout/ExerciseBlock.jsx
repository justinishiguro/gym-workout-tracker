import SetRow from './SetRow';
import ExerciseNameInput from '../exercises/ExerciseNameInput';
import './ExerciseBlock.css';

export default function ExerciseBlock({
  exercise,
  exerciseIndex,
  onChange,
  onRemove,
  onNameBlur,
  templates,
  showErrors,
  unit,
}) {
  function updateSet(setIndex, updated) {
    const sets = exercise.sets.map((s, i) => (i === setIndex ? updated : s));
    onChange({ ...exercise, sets });
  }

  function addSet() {
    const last = exercise.sets[exercise.sets.length - 1];
    const newSet = last && (last.reps || last.weight)
      ? { reps: last.reps, weight: last.weight }
      : { reps: '', weight: '' };
    onChange({ ...exercise, sets: [...exercise.sets, newSet] });
  }

  function removeSet(setIndex) {
    onChange({
      ...exercise,
      sets: exercise.sets.filter((_, i) => i !== setIndex),
    });
  }

  const nameId = `exercise-name-${exerciseIndex}`;
  const hasNameError = showErrors && !exercise.name.trim();

  return (
    <div className="exercise-block card">
      <div className="exercise-header row-spread">
        <div className="exercise-name-wrap">
          <label className="label" htmlFor={nameId}>Exercise {exerciseIndex + 1}</label>
          <ExerciseNameInput
            id={nameId}
            value={exercise.name}
            onChange={(val) => onChange({ ...exercise, name: val })}
            onBlur={onNameBlur}
            templates={templates}
            hasError={hasNameError}
          />
          {hasNameError && <p className="error-msg">Exercise name required</p>}
        </div>
        <button
          type="button"
          className="btn btn-ghost btn-sm exercise-remove"
          onClick={onRemove}
          aria-label="Remove exercise"
        >
          Remove
        </button>
      </div>

      {exercise.sets.length > 0 && (
        <div className="sets-header">
          <span className="set-col-label">#</span>
          <span className="set-col-label">Reps</span>
          <span className="set-col-label">Weight ({unit})</span>
        </div>
      )}

      <div className="stack stack-sm sets-list">
        {exercise.sets.map((set, i) => (
          <SetRow
            key={i}
            set={set}
            index={i}
            onChange={(updated) => updateSet(i, updated)}
            onRemove={() => removeSet(i)}
            showErrors={showErrors}
            unit={unit}
          />
        ))}
      </div>

      <button
        type="button"
        className="btn btn-secondary btn-sm add-set-btn"
        onClick={addSet}
      >
        + Add Set
      </button>
    </div>
  );
}
