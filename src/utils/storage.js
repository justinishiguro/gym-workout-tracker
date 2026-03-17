const WORKOUTS_KEY = 'workouts';
const TEMPLATES_KEY = 'exerciseTemplates';

export function getWorkouts() {
  try {
    return JSON.parse(localStorage.getItem(WORKOUTS_KEY)) || [];
  } catch {
    return [];
  }
}

export function setWorkouts(workouts) {
  localStorage.setItem(WORKOUTS_KEY, JSON.stringify(workouts));
}

export function getTemplates() {
  try {
    return JSON.parse(localStorage.getItem(TEMPLATES_KEY)) || [];
  } catch {
    return [];
  }
}

export function setTemplates(templates) {
  localStorage.setItem(TEMPLATES_KEY, JSON.stringify(templates));
}

export function initStorage() {
  if (!localStorage.getItem(WORKOUTS_KEY)) setWorkouts([]);
  if (!localStorage.getItem(TEMPLATES_KEY)) setTemplates([]);
}
