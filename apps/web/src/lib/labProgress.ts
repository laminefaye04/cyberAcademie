// ============================================================
// PROGRESSION DES ACTIVITÉS — persistance de démo (localStorage)
//
// En mode démo (pas de Supabase configuré), la validation d'un
// lab natif ou la vérification d'un external lab est mémorisée
// localement. En production, ces états viendraient de
// learning_activity_states (voir migration SQL).
//
// External lab : started → declared completed → verified → XP
// (spec §25 — le clic sur un lien externe ne donne PAS l'XP).
// ============================================================

const STORAGE_KEY = "cyberacademy:lab-progress";

export interface LabProgressStore {
  completed: string[];
  externalVerified: string[];
  externalStarted: string[];
}

const DEFAULT_STORE: LabProgressStore = {
  completed: [],
  externalVerified: [],
  externalStarted: [],
};

export function readLabProgress(): LabProgressStore {
  if (typeof window === "undefined") return DEFAULT_STORE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STORE;
    const parsed = JSON.parse(raw) as Partial<LabProgressStore>;
    return {
      completed: Array.isArray(parsed.completed) ? parsed.completed : [],
      externalVerified: Array.isArray(parsed.externalVerified)
        ? parsed.externalVerified
        : [],
      externalStarted: Array.isArray(parsed.externalStarted)
        ? parsed.externalStarted
        : [],
    };
  } catch {
    return DEFAULT_STORE;
  }
}

function writeLabProgress(store: LabProgressStore) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    /* stockage indisponible — la démo continue sans persistance */
  }
}

export function isNativeLabCompleted(labId: string): boolean {
  return readLabProgress().completed.includes(labId);
}

export function isExternalLabVerified(externalId: string): boolean {
  return readLabProgress().externalVerified.includes(externalId);
}

export function isExternalLabStarted(externalId: string): boolean {
  return readLabProgress().externalStarted.includes(externalId);
}

export function getCompletedLabIds(): string[] {
  return readLabProgress().completed;
}

export function getCompletedExternalLabIds(): string[] {
  return readLabProgress().externalVerified;
}

export function markNativeLabCompleted(labId: string) {
  const store = readLabProgress();
  if (!store.completed.includes(labId)) {
    store.completed = [...store.completed, labId];
    writeLabProgress(store);
  }
}

export function markExternalLabStarted(externalId: string) {
  const store = readLabProgress();
  if (!store.externalStarted.includes(externalId)) {
    store.externalStarted = [...store.externalStarted, externalId];
    writeLabProgress(store);
  }
}

export function markExternalLabVerified(externalId: string) {
  const store = readLabProgress();
  if (!store.externalVerified.includes(externalId)) {
    store.externalVerified = [...store.externalVerified, externalId];
    writeLabProgress(store);
  }
}
