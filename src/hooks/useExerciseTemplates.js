import { useState } from 'react';
import { getTemplates, setTemplates } from '../utils/storage';
import { generateId } from '../utils/idGenerator';

export function useExerciseTemplates() {
  const [templates, setTemplatesState] = useState(() => getTemplates());

  function persist(next) {
    setTemplatesState(next);
    setTemplates(next);
  }

  function addTemplate(name) {
    if (!name || !name.trim()) return;
    const trimmed = name.trim();
    const exists = templates.some(
      (t) => t.name.toLowerCase() === trimmed.toLowerCase()
    );
    if (exists) return;
    persist([...templates, { id: generateId(), name: trimmed }]);
  }

  return { templates, addTemplate };
}
