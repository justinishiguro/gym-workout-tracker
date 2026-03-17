export default function ExerciseNameInput({ value, onChange, onBlur, templates, hasError, id }) {
  const listId = `${id}-list`;
  return (
    <>
      <input
        id={id}
        type="text"
        list={listId}
        className={`input${hasError ? ' error' : ''}`}
        placeholder="Exercise name"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => onBlur && onBlur(value)}
        autoComplete="off"
      />
      <datalist id={listId}>
        {templates.map((t) => (
          <option key={t.id} value={t.name} />
        ))}
      </datalist>
    </>
  );
}
