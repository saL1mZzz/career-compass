import type { AssessmentAnswers, CareerProfile } from "@/lib/scoring";

const answersKey = "career-compass.assessment.answers.v1";
const profileKey = "career-compass.assessment.profile.v1";
const roadmapKey = "career-compass.roadmap.completed.v1";

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function readJson<T>(key: string, fallback: T): T {
  if (!canUseStorage()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function loadAssessmentAnswers(): AssessmentAnswers {
  return readJson<AssessmentAnswers>(answersKey, {});
}

export function saveAssessmentAnswers(answers: AssessmentAnswers) {
  writeJson(answersKey, answers);
}

export function loadCareerProfile(): CareerProfile | null {
  return readJson<CareerProfile | null>(profileKey, null);
}

export function saveCareerProfile(profile: CareerProfile | null) {
  if (!canUseStorage()) return;
  if (!profile) {
    window.localStorage.removeItem(profileKey);
    return;
  }
  writeJson(profileKey, profile);
}

export function loadRoadmapProgress(): string[] {
  return readJson<string[]>(roadmapKey, []);
}

export function saveRoadmapProgress(ids: string[]) {
  writeJson(roadmapKey, ids);
}

export function resetCareerCompassStorage() {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(answersKey);
  window.localStorage.removeItem(profileKey);
  window.localStorage.removeItem(roadmapKey);
}
