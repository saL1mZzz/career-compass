import type { Question, QuestionOption } from "@/data/questions";
import {
  careerPaths,
  optionTraitWeights,
  tagTraitWeights,
  traitDefinitions,
  type CareerPath,
  type TraitKey,
  type TraitWeightMap,
} from "@/data/careers";

export type AssessmentAnswerValue = string | string[] | number;
export type AssessmentAnswers = Record<string, AssessmentAnswerValue>;

export type TraitScore = {
  key: TraitKey;
  label: string;
  description: string;
  score: number;
};

export type CareerMatch = {
  careerId: string;
  title: string;
  family: string;
  score: number;
  confidence: number;
  explanation: string;
  supportingTraits: TraitScore[];
  gaps: TraitScore[];
  simulationIds: string[];
  entryRoles: string[];
  companiesToFollow: string[];
  blockers: string[];
  skillGaps: string[];
  roadmap: CareerPath["roadmap"];
};

export type CareerProfile = {
  completed: boolean;
  completedAt: string;
  answeredCount: number;
  totalQuestions: number;
  baselineConfidence: number;
  careerConfidence: number;
  dominantProfileType: string;
  dominantProfileDescription: string;
  summary: string;
  traitScores: TraitScore[];
  topStrengths: TraitScore[];
  weakAreas: TraitScore[];
  matches: CareerMatch[];
  recommendedSimulationIds: string[];
  roadmapPriorities: string[];
};

export const careerDiscoveryQuestionIds = [
  "onboarding_decision_type",
  "onboarding_career_areas",
  "onboarding_current_confidence",
  "onboarding_main_outcome",
  "profile_interests",
  "profile_skills",
  "profile_values",
  "profile_constraints",
  "profile_work_style",
  "profile_energy_drainers",
  "ai_ambiguity_preference",
  "ai_success_definition",
  "ai_daily_work_preference",
  "ai_best_environment",
];

const textKeywordTraitWeights: Record<string, TraitWeightMap> = {
  startup: { entrepreneurial_drive: 1, market_curiosity: 0.5 },
  founder: { entrepreneurial_drive: 1, leadership_potential: 0.5 },
  product: { product_thinking: 1, user_empathy: 0.5 },
  user: { user_empathy: 0.8, product_thinking: 0.4 },
  ai: { technical_curiosity: 1, product_thinking: 0.4 },
  data: { analytical_depth: 0.8, quantitative_reasoning: 0.7 },
  finance: { financial_literacy: 1, quantitative_reasoning: 0.5 },
  market: { market_curiosity: 0.8, commercial_instinct: 0.5 },
  client: { client_confidence: 0.8, communication_clarity: 0.5 },
  people: { team_collaboration: 0.6, stakeholder_management: 0.6 },
  impact: { social_impact: 1 },
  strategy: { strategic_thinking: 0.9, business_judgment: 0.5 },
  research: { research_intensity: 1, analytical_depth: 0.5 },
  build: { entrepreneurial_drive: 0.5, product_thinking: 0.5 },
  present: { presentation_confidence: 0.8, communication_clarity: 0.5 },
};

function addWeights(
  target: Record<TraitKey, number>,
  weights: TraitWeightMap | undefined,
  multiplier = 1,
) {
  if (!weights) return;
  Object.entries(weights).forEach(([key, value]) => {
    target[key as TraitKey] += (value ?? 0) * multiplier;
  });
}

function getSelectedOptions(question: Question, answer: AssessmentAnswerValue | undefined) {
  if (!question.options || answer === undefined) return [];
  const answerIds = Array.isArray(answer) ? answer : [answer];
  return question.options.filter((option) => answerIds.includes(option.id));
}

function scoreOption(
  option: QuestionOption,
  answerId: string,
  rawTraits: Record<TraitKey, number>,
  multiplier = 1,
) {
  option.tags?.forEach((tag) => addWeights(rawTraits, tagTraitWeights[tag], multiplier));
  addWeights(rawTraits, optionTraitWeights[answerId], multiplier);
}

function scoreTextAnswer(answer: string, rawTraits: Record<TraitKey, number>) {
  const normalized = answer.toLowerCase();
  Object.entries(textKeywordTraitWeights).forEach(([keyword, weights]) => {
    if (normalized.includes(keyword)) addWeights(rawTraits, weights, 0.8);
  });
}

function normalizeTrait(rawValue: number) {
  return Math.max(12, Math.min(96, Math.round(44 + rawValue * 8.5)));
}

function getProfileType(topTraits: TraitScore[], topMatchTitle: string) {
  const topKeys = new Set(topTraits.slice(0, 5).map((trait) => trait.key));

  if (topMatchTitle.includes("Investment Banking")) {
    return {
      type: "Finance-Oriented Dealmaker",
      description:
        "You appear strongest in environments where financial reasoning, detail, and high-pressure execution matter.",
    };
  }

  if (topMatchTitle.includes("Product")) {
    return {
      type: "Product Builder",
      description:
        "You appear strongest when translating user needs, technical curiosity, and prioritization into product decisions.",
    };
  }

  if (topMatchTitle.includes("Consulting")) {
    return {
      type: "Client-Facing Strategist",
      description:
        "You appear strongest in structured problem solving, advisory communication, and recommendation work.",
    };
  }

  if (topKeys.has("entrepreneurial_drive") && topKeys.has("market_curiosity")) {
    return {
      type: "Startup Explorer",
      description:
        "You appear energized by markets, ambiguity, ownership, and opportunity discovery.",
    };
  }

  if (topKeys.has("analytical_depth") && topKeys.has("quantitative_reasoning")) {
    return {
      type: "Research-Driven Analyst",
      description:
        "You appear strongest when turning data, research, and evidence into practical decisions.",
    };
  }

  if (topKeys.has("creativity_storytelling")) {
    return {
      type: "Creative Growth Thinker",
      description:
        "You appear strongest where consumer insight, communication, and market storytelling shape outcomes.",
    };
  }

  return {
    type: "Commercial Strategist",
    description:
      "You appear strongest when commercial judgment, structured thinking, and practical recommendations come together.",
  };
}

function traitLookup(traitScores: TraitScore[]) {
  return traitScores.reduce<Record<TraitKey, TraitScore>>((acc, trait) => {
    acc[trait.key] = trait;
    return acc;
  }, {} as Record<TraitKey, TraitScore>);
}

function computeCareerMatch(career: CareerPath, traitScores: TraitScore[]): CareerMatch {
  const lookup = traitLookup(traitScores);
  const weightEntries = Object.entries(career.traitWeights) as Array<[TraitKey, number]>;
  const totalWeight = weightEntries.reduce((sum, [, weight]) => sum + weight, 0) || 1;
  const weightedScore =
    weightEntries.reduce((sum, [key, weight]) => sum + (lookup[key]?.score ?? 44) * weight, 0) /
    totalWeight;
  const score = Math.max(38, Math.min(97, Math.round(weightedScore)));
  const supportingTraits = weightEntries
    .map(([key]) => lookup[key])
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);
  const gaps = weightEntries
    .map(([key]) => lookup[key])
    .filter(Boolean)
    .sort((a, b) => a.score - b.score)
    .slice(0, 3);

  const explanation = `${career.explanation} Your strongest supporting signals are ${supportingTraits
    .slice(0, 3)
    .map((trait) => trait.label.toLowerCase())
    .join(", ")}.`;

  return {
    careerId: career.id,
    title: career.title,
    family: career.family,
    score,
    confidence: Math.max(45, Math.min(95, Math.round(score - gaps[0].score / 12 + 6))),
    explanation,
    supportingTraits,
    gaps,
    simulationIds: career.simulationIds,
    entryRoles: career.entryRoles,
    companiesToFollow: career.companiesToFollow,
    blockers: career.blockers,
    skillGaps: career.skillGaps,
    roadmap: career.roadmap,
  };
}

export function getCareerDiscoveryQuestions(allQuestions: Question[]) {
  return careerDiscoveryQuestionIds
    .map((id) => allQuestions.find((question) => question.id === id))
    .filter(Boolean) as Question[];
}

export function isQuestionAnswered(question: Question, answer: AssessmentAnswerValue | undefined) {
  if (answer === undefined) return false;
  if (typeof answer === "number") return true;
  if (typeof answer === "string") return answer.trim().length > 0;
  return answer.length > 0;
}

export function scoreAssessment(answers: AssessmentAnswers, questions: Question[]): CareerProfile {
  const rawTraits = traitDefinitions.reduce<Record<TraitKey, number>>((acc, trait) => {
    acc[trait.key] = 0;
    return acc;
  }, {} as Record<TraitKey, number>);

  questions.forEach((question) => {
    const answer = answers[question.id];
    if (!isQuestionAnswered(question, answer)) return;

    if (typeof answer === "number") {
      if (question.id === "onboarding_current_confidence") {
        const confidenceBias = (answer - 50) / 35;
        addWeights(rawTraits, { decision_style: confidenceBias, pressure_tolerance: confidenceBias / 2 });
      }
      return;
    }

    if (typeof answer === "string" && !question.options) {
      scoreTextAnswer(answer, rawTraits);
      return;
    }

    const selectedOptions = getSelectedOptions(question, answer);
    selectedOptions.forEach((option, index) => {
      const rankingMultiplier = question.type === "ranking" ? Math.max(0.35, 1 - index * 0.13) : 1;
      scoreOption(option, option.id, rawTraits, rankingMultiplier);
    });
  });

  const traitScores = traitDefinitions
    .map((trait) => ({
      key: trait.key,
      label: trait.label,
      description: trait.description,
      score: normalizeTrait(rawTraits[trait.key]),
    }))
    .sort((a, b) => b.score - a.score);

  const matches = careerPaths
    .map((career) => computeCareerMatch(career, traitScores))
    .sort((a, b) => b.score - a.score);

  const answeredCount = questions.filter((question) => isQuestionAnswered(question, answers[question.id])).length;
  const baselineAnswer = answers.onboarding_current_confidence;
  const baselineConfidence = typeof baselineAnswer === "number" ? baselineAnswer : 42;
  const topMatch = matches[0];
  const profileType = getProfileType(traitScores, topMatch.title);
  const topStrengths = traitScores.slice(0, 5);
  const weakAreas = traitScores.slice(-5).reverse();
  const recommendedSimulationIds = Array.from(
    new Set(matches.slice(0, 3).flatMap((match) => match.simulationIds)),
  ).slice(0, 5);
  const careerConfidence = Math.max(
    50,
    Math.min(96, Math.round((topMatch.score + baselineConfidence * 0.35 + answeredCount * 2.2) / 1.55)),
  );

  return {
    completed: answeredCount >= questions.length,
    completedAt: new Date().toISOString(),
    answeredCount,
    totalQuestions: questions.length,
    baselineConfidence,
    careerConfidence,
    dominantProfileType: profileType.type,
    dominantProfileDescription: profileType.description,
    summary: `Your strongest fit is ${topMatch.title}. You show strongest evidence in ${topStrengths
      .slice(0, 4)
      .map((trait) => trait.label.toLowerCase())
      .join(", ")}. Career Compass recommends testing this with ${topMatch.simulationIds.length} matched simulation${
      topMatch.simulationIds.length === 1 ? "" : "s"
    } before committing.`,
    traitScores,
    topStrengths,
    weakAreas,
    matches,
    recommendedSimulationIds,
    roadmapPriorities: [
      ...topMatch.roadmap.thirty.slice(0, 2),
      `Improve ${topMatch.gaps[0]?.label.toLowerCase() ?? "your weakest evidence area"} with a focused project.`,
      `Target entry roles such as ${topMatch.entryRoles.slice(0, 2).join(" or ")}.`,
    ],
  };
}

export function getCareerById(careerId: string) {
  return careerPaths.find((career) => career.id === careerId);
}
