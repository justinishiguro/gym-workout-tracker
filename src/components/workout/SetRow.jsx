import './SetRow.css';

export default function SetRow({ set, index, onChange, onRemove, showErrors, unit = 'kg' }) {
  return (
    <div className="set-row">
      <span className="set-index">{index + 1}</span>
      <div className="set-field">
        <input
          type="number"
          className={`input set-input${showErrors && !set.reps ? ' error' : ''}`}
          placeholder="Reps"
          min="1"
          value={set.reps}
          onChange={(e) => onChange({ ...set, reps: e.target.value })}
        />
      </div>
      <div className="set-field">
        <input
          type="number"
          className={`input set-input${showErrors && !set.weight ? ' error' : ''}`}
          placeholder={unit}
          min="0"
          step="0.5"
          value={set.weight}
          onChange={(e) => onChange({ ...set, weight: e.target.value })}
        />
      </div>
      <button
        type="button"
        className="btn btn-ghost btn-sm set-remove"
        onClick={onRemove}
        aria-label="Remove set"
      >
        ✕
      </button>
    </div>
  );
}
