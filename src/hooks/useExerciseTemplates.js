import { useState, useEffect } from 'react';
import { getTemplates, setTemplate } from '../utils/storage';
import { generateId } from '../utils/idGenerator';

export function useExerciseTemplates(userId) {
  const [templates, setTemplatesState] = useState([]);

  useEffect(() => {
    if (!userId) return;
    getTemplates(userId).then((data) => setTemplatesState(data));
  }, [userId]);

  async function addTemplate(name) {
    if (!name || !name.trim()) return;
    const trimmed = name.trim();
    const exists = templates.some(
      (t) => t.name.toLowerCase() === trimmed.toLowerCase()
    );
    if (exists) return;
    const template = { id: generateId(), name: trimmed, user_id: userId };
    await setTemplate(template);
    setTemplatesState((prev) => [...prev, template]);
  }

  return { templates, addTemplate };
}
