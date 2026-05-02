/**
 * Career Compass - Generic Question Bank
 * ------------------------------------------------------------
 * Use this file as hardcoded seed data for the prototype.
 * It is intentionally generic and company-neutral.
 *
 * Product principle:
 * Career Compass should not "decide" the student's career.
 * It should guide the student through structured reflection,
 * simulations, evidence, and next-step planning.
 */

export type QuestionType =
  | "single_select"
  | "multi_select"
  | "scale"
  | "short_text"
  | "long_text"
  | "ranking"
  | "reflection";

export type QuestionOption = {
  id: string;
  label: string;
  tags?: string[];
  weight?: number;
};

export type Question = {
  id: string;
  section:
    | "onboarding"
    | "profile"
    | "ai_interview"
    | "simulation_reflection"
    | "trust"
    | "pricing"
    | "career_advisor"
    | "university"
    | "partner_opt_in";
  type: QuestionType;
  prompt: string;
  helperText?: string;
  options?: QuestionOption[];
  min?: number;
  max?: number;
  step?: number;
  followUpLogic?: string;
  whyWeAsk?: string;
  tags?: string[];
};

export const onboardingQuestions: Question[] = [
  {
    id: "onboarding_decision_type",
    section: "onboarding",
    type: "single_select",
    prompt: "What career decision are you trying to make right now?",
    helperText: "We will personalize your journey around this decision.",
    options: [
      { id: "internship_direction", label: "Choosing an internship direction", tags: ["internship", "early_career"] },
      { id: "first_job_path", label: "Choosing a first job path", tags: ["first_job", "early_career"] },
      { id: "major_choice", label: "Choosing a major or academic track", tags: ["education"] },
      { id: "masters_choice", label: "Choosing a master's program", tags: ["education", "masters"] },
      { id: "compare_paths", label: "Comparing two or more career paths", tags: ["comparison"] },
      { id: "general_clarity", label: "I feel lost and need general career clarity", tags: ["clarity"] }
    ],
    whyWeAsk: "The same student can need different guidance depending on the decision they are facing."
  },
  {
    id: "onboarding_career_areas",
    section: "onboarding",
    type: "multi_select",
    prompt: "Which areas are you currently considering?",
    helperText: "Choose up to 4. You can change this later.",
    options: [
      { id: "business_strategy", label: "Business and strategy", tags: ["consulting", "strategy"] },
      { id: "finance_investment", label: "Finance and investment", tags: ["finance", "banking", "investing"] },
      { id: "tech_product", label: "Technology and product", tags: ["tech", "product"] },
      { id: "marketing_brand", label: "Marketing and brands", tags: ["marketing", "consumer"] },
      { id: "data_analytics", label: "Data and analytics", tags: ["data", "analytics"] },
      { id: "entrepreneurship", label: "Entrepreneurship and startups", tags: ["startups", "founder"] },
      { id: "sustainability", label: "Sustainability and impact", tags: ["sustainability", "impact"] },
      { id: "law_policy", label: "Law, policy, and regulation", tags: ["law", "policy"] },
      { id: "healthcare_biotech", label: "Healthcare and biotech", tags: ["healthcare", "biotech"] },
      { id: "luxury_fashion", label: "Luxury and fashion", tags: ["luxury", "fashion"] },
      { id: "unsure", label: "I am not sure yet", tags: ["uncertain"] }
    ],
    whyWeAsk: "This lets Career Compass recommend the first simulations that are most relevant to the user's current interests."
  },
  {
    id: "onboarding_current_confidence",
    section: "onboarding",
    type: "scale",
    prompt: "How confident do you feel about your current career direction?",
    helperText: "0 = completely lost. 100 = very confident.",
    min: 0,
    max: 100,
    step: 5,
    tags: ["confidence_metric"],
    whyWeAsk: "This creates a baseline career confidence score that can be compared after simulations."
  },
  {
    id: "onboarding_main_outcome",
    section: "onboarding",
    type: "single_select",
    prompt: "What would make this session valuable for you?",
    options: [
      { id: "clear_top_paths", label: "Getting 2–3 clear career paths to explore" },
      { id: "understand_fit", label: "Understanding why certain careers fit me" },
      { id: "test_real_work", label: "Testing what the work actually feels like" },
      { id: "action_plan", label: "Getting a concrete action plan" },
      { id: "reduce_anxiety", label: "Feeling less anxious about the decision" },
      { id: "compare_options", label: "Comparing different options more rationally" }
    ],
    whyWeAsk: "Different users define career clarity differently. This helps personalize the final roadmap."
  }
];

export const profileQuestions: Question[] = [
  {
    id: "profile_interests",
    section: "profile",
    type: "multi_select",
    prompt: "Which topics naturally attract your attention?",
    helperText: "Choose the topics you are genuinely curious about, not only the ones that look prestigious.",
    options: [
      { id: "markets", label: "Markets", tags: ["finance", "economics"] },
      { id: "startups", label: "Startups", tags: ["vc", "entrepreneurship"] },
      { id: "strategy", label: "Strategy", tags: ["consulting", "business"] },
      { id: "consumer_brands", label: "Consumer brands", tags: ["marketing", "brand"] },
      { id: "ai_technology", label: "AI and technology", tags: ["tech", "ai"] },
      { id: "finance", label: "Finance", tags: ["banking", "investment"] },
      { id: "psychology", label: "People and psychology", tags: ["hr", "consumer", "leadership"] },
      { id: "design", label: "Design and user experience", tags: ["product", "ux"] },
      { id: "data", label: "Data", tags: ["analytics", "data"] },
      { id: "sustainability", label: "Sustainability", tags: ["impact", "climate"] },
      { id: "operations", label: "Operations and systems", tags: ["ops", "logistics"] },
      { id: "luxury", label: "Luxury", tags: ["luxury", "brand"] },
      { id: "healthcare", label: "Healthcare", tags: ["healthcare", "biotech"] }
    ],
    whyWeAsk: "Interests help identify fields worth exploring, but they are not enough to determine fit."
  },
  {
    id: "profile_skills",
    section: "profile",
    type: "multi_select",
    prompt: "Which skills feel strongest for you today?",
    helperText: "Choose what you can actually do or learn quickly, not only what you admire.",
    options: [
      { id: "problem_solving", label: "Problem-solving", tags: ["consulting", "product", "strategy"] },
      { id: "analytical_thinking", label: "Analytical thinking", tags: ["finance", "data", "consulting"] },
      { id: "communication", label: "Communication", tags: ["consulting", "marketing", "sales"] },
      { id: "creativity", label: "Creativity", tags: ["marketing", "product", "design"] },
      { id: "leadership", label: "Leadership", tags: ["management", "entrepreneurship"] },
      { id: "research", label: "Research", tags: ["vc", "consulting", "policy"] },
      { id: "negotiation", label: "Negotiation", tags: ["sales", "business_development"] },
      { id: "presentation", label: "Presentation", tags: ["consulting", "banking", "marketing"] },
      { id: "coding", label: "Coding", tags: ["software", "data", "product"] },
      { id: "writing", label: "Writing", tags: ["marketing", "policy", "research"] },
      { id: "quantitative_analysis", label: "Quantitative analysis", tags: ["finance", "data"] },
      { id: "sales", label: "Sales", tags: ["business_development", "startups"] },
      { id: "organization", label: "Organization", tags: ["operations", "project_management"] }
    ],
    whyWeAsk: "The app compares self-perceived skills with simulation behavior later."
  },
  {
    id: "profile_values",
    section: "profile",
    type: "multi_select",
    prompt: "What matters most in your future career?",
    helperText: "Choose up to 5 values. Trade-offs are expected.",
    options: [
      { id: "salary", label: "High salary", tags: ["compensation"] },
      { id: "prestige", label: "Prestige", tags: ["status"] },
      { id: "learning_speed", label: "Learning speed", tags: ["growth"] },
      { id: "work_life_balance", label: "Work-life balance", tags: ["lifestyle"] },
      { id: "international_opportunities", label: "International opportunities", tags: ["global"] },
      { id: "impact", label: "Impact", tags: ["purpose"] },
      { id: "autonomy", label: "Autonomy", tags: ["independence"] },
      { id: "stability", label: "Stability", tags: ["security"] },
      { id: "creativity", label: "Creativity", tags: ["creative"] },
      { id: "fast_promotion", label: "Fast promotion", tags: ["ambition"] },
      { id: "entrepreneurial_exposure", label: "Entrepreneurial exposure", tags: ["startups"] }
    ],
    whyWeAsk: "Career paths differ not only by tasks but by lifestyle, incentives, and trade-offs."
  },
  {
    id: "profile_constraints",
    section: "profile",
    type: "multi_select",
    prompt: "What constraints should Career Compass consider?",
    helperText: "Constraints are not weaknesses. They make recommendations more realistic.",
    options: [
      { id: "lack_experience", label: "I lack experience", tags: ["experience_gap"] },
      { id: "grades_uncertain", label: "I am not sure about my grades", tags: ["academic"] },
      { id: "family_expectations", label: "My family has expectations", tags: ["social_pressure"] },
      { id: "need_short_term_plan", label: "I need a realistic short-term plan", tags: ["action_plan"] },
      { id: "need_high_paying_path", label: "I need a high-paying path", tags: ["compensation"] },
      { id: "country_preference", label: "I want to work in a specific country", tags: ["geography"] },
      { id: "feel_behind", label: "I feel behind compared to others", tags: ["confidence"] },
      { id: "dont_know_start", label: "I do not know where to start", tags: ["clarity"] }
    ],
    whyWeAsk: "A useful roadmap must account for practical constraints, not only ideal preferences."
  },
  {
    id: "profile_work_style",
    section: "profile",
    type: "single_select",
    prompt: "Which work style sounds most natural to you?",
    options: [
      { id: "structured_process", label: "Clear process, defined tasks, and measurable outputs", tags: ["operations", "finance"] },
      { id: "ambiguous_problem", label: "Ambiguous problems where I need to create structure", tags: ["consulting", "strategy", "product"] },
      { id: "people_heavy", label: "People-heavy work involving persuasion and relationships", tags: ["sales", "marketing", "business_development"] },
      { id: "creative_building", label: "Creative work where I build or design something new", tags: ["product", "design", "marketing"] },
      { id: "deep_analysis", label: "Deep individual analysis with data, research, or models", tags: ["finance", "data", "research"] }
    ],
    whyWeAsk: "Work style often predicts daily satisfaction better than job title attraction."
  },
  {
    id: "profile_energy_drainers",
    section: "profile",
    type: "multi_select",
    prompt: "Which types of work drain your energy fastest?",
    options: [
      { id: "repetitive_admin", label: "Repetitive administrative tasks" },
      { id: "constant_pressure", label: "Constant pressure and tight deadlines" },
      { id: "unclear_expectations", label: "Unclear expectations" },
      { id: "too_much_detail", label: "Too much detail and precision" },
      { id: "too_much_social", label: "Too many meetings and social interactions" },
      { id: "lack_autonomy", label: "Lack of autonomy" },
      { id: "slow_pace", label: "Slow pace and bureaucracy" },
      { id: "selling_persuasion", label: "Selling, persuasion, or rejection" }
    ],
    whyWeAsk: "Avoiding energy-draining work is as important as finding attractive work."
  }
];

export const aiInterviewQuestions: Question[] = [
  {
    id: "ai_attraction_reason",
    section: "ai_interview",
    type: "long_text",
    prompt: "What attracts you most to the career areas you selected?",
    helperText: "Try to separate genuine interest from prestige, pressure, or what others expect.",
    followUpLogic: "If the answer mentions status, money, or family pressure, ask what would remain attractive if nobody else knew their career choice.",
    whyWeAsk: "Students often confuse attraction to the image of a career with attraction to the actual work."
  },
  {
    id: "ai_last_enjoyed_project",
    section: "ai_interview",
    type: "long_text",
    prompt: "Walk me through the last project, class, internship, or activity you genuinely enjoyed. What exactly made it enjoyable?",
    followUpLogic: "Extract verbs from the answer: analyzing, presenting, building, persuading, researching, organizing, designing, leading.",
    whyWeAsk: "Past behavior gives better evidence than hypothetical preferences."
  },
  {
    id: "ai_ambiguity_preference",
    section: "ai_interview",
    type: "single_select",
    prompt: "Do you prefer clear instructions or ambiguous problems?",
    options: [
      { id: "clear", label: "Clear instructions" },
      { id: "ambiguous", label: "Ambiguous problems" },
      { id: "mix", label: "A mix of both" },
      { id: "depends_team", label: "It depends on the team and stakes" }
    ],
    followUpLogic: "If ambiguous is selected, recommend strategy, product, venture, entrepreneurship, or consulting simulations. If clear is selected, recommend finance, operations, data, or structured analyst simulations.",
    whyWeAsk: "Some careers reward ambiguity; others reward precision and repeatable process."
  },
  {
    id: "ai_wrong_choice_fear",
    section: "ai_interview",
    type: "multi_select",
    prompt: "What worries you most about making the wrong career choice?",
    options: [
      { id: "wasting_time", label: "Wasting time" },
      { id: "not_earning_enough", label: "Not earning enough" },
      { id: "disappointing_family", label: "Disappointing family" },
      { id: "falling_behind", label: "Falling behind peers" },
      { id: "getting_bored", label: "Getting bored" },
      { id: "burnout", label: "Burnout" },
      { id: "lack_prestige", label: "Choosing something less prestigious" },
      { id: "not_knowing_start", label: "Not knowing where to start" }
    ],
    whyWeAsk: "Career decisions are emotional decisions disguised as rational decisions."
  },
  {
    id: "ai_success_definition",
    section: "ai_interview",
    type: "ranking",
    prompt: "Rank what success means to you right now.",
    options: [
      { id: "money", label: "Money" },
      { id: "status", label: "Status" },
      { id: "autonomy", label: "Autonomy" },
      { id: "impact", label: "Impact" },
      { id: "learning", label: "Learning" },
      { id: "security", label: "Security" },
      { id: "lifestyle", label: "Lifestyle" }
    ],
    whyWeAsk: "Different careers optimize for different definitions of success."
  },
  {
    id: "ai_daily_work_preference",
    section: "ai_interview",
    type: "multi_select",
    prompt: "Which daily tasks would you be willing to do repeatedly?",
    options: [
      { id: "build_models", label: "Build financial or analytical models", tags: ["banking", "finance", "data"] },
      { id: "write_slides", label: "Create slides and recommendations", tags: ["consulting", "strategy"] },
      { id: "talk_clients", label: "Talk to clients or users", tags: ["consulting", "sales", "product"] },
      { id: "analyze_data", label: "Analyze data and identify patterns", tags: ["data", "product", "finance"] },
      { id: "research_markets", label: "Research markets and competitors", tags: ["vc", "consulting", "marketing"] },
      { id: "design_campaigns", label: "Design campaigns or brand messages", tags: ["marketing", "brand"] },
      { id: "prioritize_features", label: "Prioritize product features", tags: ["product"] },
      { id: "coordinate_execution", label: "Coordinate projects and operations", tags: ["operations", "project_management"] }
    ],
    whyWeAsk: "Career fit should be based on actual tasks, not only job titles."
  },
  {
    id: "ai_prestige_filter",
    section: "ai_interview",
    type: "long_text",
    prompt: "If nobody could see your job title, which career would still interest you? Why?",
    followUpLogic: "Compare this answer with prestige-heavy choices from profile values.",
    whyWeAsk: "This helps separate intrinsic motivation from social signaling."
  },
  {
    id: "ai_test_before_commit",
    section: "ai_interview",
    type: "multi_select",
    prompt: "What would you want to test before committing to a path?",
    options: [
      { id: "daily_tasks", label: "Whether I enjoy the daily tasks" },
      { id: "skill_fit", label: "Whether I have the right skills" },
      { id: "lifestyle_fit", label: "Whether I can handle the lifestyle" },
      { id: "earning_potential", label: "Whether the path has strong earning potential" },
      { id: "entry_barriers", label: "Whether I can realistically enter the field" },
      { id: "network_fit", label: "Whether I like the people in the industry" },
      { id: "long_term_growth", label: "Whether it opens good future options" }
    ],
    whyWeAsk: "This helps Career Compass select the right simulation and action plan."
  },
  {
    id: "ai_self_doubt",
    section: "ai_interview",
    type: "long_text",
    prompt: "What do you secretly worry you are not good enough for?",
    helperText: "This answer stays private. It helps us build a realistic plan.",
    followUpLogic: "If a specific skill gap is mentioned, map it to skill-building actions and beginner simulations.",
    whyWeAsk: "Many students avoid paths not because of low interest, but because of low confidence."
  },
  {
    id: "ai_best_environment",
    section: "ai_interview",
    type: "single_select",
    prompt: "Which environment would help you perform best?",
    options: [
      { id: "competitive_fast", label: "Competitive and fast-paced" },
      { id: "collaborative_supportive", label: "Collaborative and supportive" },
      { id: "independent_deep_work", label: "Independent deep work" },
      { id: "creative_flexible", label: "Creative and flexible" },
      { id: "structured_professional", label: "Structured and professional" },
      { id: "mission_driven", label: "Mission-driven and impact-focused" }
    ],
    whyWeAsk: "Environment fit influences satisfaction and performance."
  }
];

export const simulationReflectionQuestions: Question[] = [
  {
    id: "reflection_energy",
    section: "simulation_reflection",
    type: "single_select",
    prompt: "How did this simulation feel?",
    options: [
      { id: "energizing", label: "Energizing" },
      { id: "interesting_difficult", label: "Interesting but difficult" },
      { id: "too_analytical", label: "Too analytical" },
      { id: "too_ambiguous", label: "Too ambiguous" },
      { id: "stressful", label: "Stressful" },
      { id: "boring", label: "Boring" },
      { id: "want_more", label: "I want to try more" }
    ],
    whyWeAsk: "A career can fit your skills but still drain your energy."
  },
  {
    id: "reflection_best_part",
    section: "simulation_reflection",
    type: "long_text",
    prompt: "Which part of the simulation gave you the most energy? Why?",
    whyWeAsk: "This identifies the type of work the student may want more of."
  },
  {
    id: "reflection_worst_part",
    section: "simulation_reflection",
    type: "long_text",
    prompt: "Which part felt most frustrating or unnatural?",
    whyWeAsk: "This identifies risk areas and possible misfit."
  },
  {
    id: "reflection_reality_match",
    section: "simulation_reflection",
    type: "single_select",
    prompt: "Did the simulation match your image of this career?",
    options: [
      { id: "yes", label: "Yes, it matched what I expected" },
      { id: "better", label: "It felt better than expected" },
      { id: "worse", label: "It felt worse than expected" },
      { id: "different", label: "It was very different from what I imagined" }
    ],
    whyWeAsk: "This captures whether the simulation corrected a misconception."
  },
  {
    id: "reflection_repeat_work",
    section: "simulation_reflection",
    type: "scale",
    prompt: "How willing would you be to do this type of work again?",
    min: 0,
    max: 10,
    step: 1,
    whyWeAsk: "Repeat willingness is a stronger signal than general interest."
  },
  {
    id: "reflection_share",
    section: "simulation_reflection",
    type: "single_select",
    prompt: "Would you share this simulation result with a company if it could unlock opportunities?",
    options: [
      { id: "yes", label: "Yes, if I control what is shared" },
      { id: "maybe", label: "Maybe, depending on the company" },
      { id: "no", label: "No, I want to keep it private" }
    ],
    whyWeAsk: "This tests willingness to enter opportunity mode."
  }
];

export const trustQuestions: Question[] = [
  {
    id: "trust_recommendation_understood",
    section: "trust",
    type: "scale",
    prompt: "How well did you understand why this career path was recommended?",
    min: 0,
    max: 10,
    step: 1,
    whyWeAsk: "Explainability is the core trust mechanism."
  },
  {
    id: "trust_reasoning",
    section: "trust",
    type: "scale",
    prompt: "How much did you trust the reasoning behind the recommendation?",
    min: 0,
    max: 10,
    step: 1
  },
  {
    id: "trust_more_credible",
    section: "trust",
    type: "multi_select",
    prompt: "What would make Career Compass more credible for you?",
    options: [
      { id: "human_review", label: "Review by a human career advisor" },
      { id: "professional_input", label: "Input from professionals in the field" },
      { id: "real_company_cases", label: "More real company-backed simulations" },
      { id: "salary_data", label: "Salary and market data" },
      { id: "alumni_examples", label: "Examples from alumni paths" },
      { id: "source_explanations", label: "Clear sources and explanation of logic" },
      { id: "university_endorsement", label: "Endorsement by my university" }
    ]
  },
  {
    id: "trust_ai_role",
    section: "trust",
    type: "single_select",
    prompt: "What role should AI play in your career decision?",
    options: [
      { id: "assistant", label: "Assistant that helps me reflect" },
      { id: "coach", label: "Coach that asks better questions" },
      { id: "researcher", label: "Researcher that summarizes options" },
      { id: "decision_maker", label: "Decision-maker that tells me what to do" },
      { id: "not_sure", label: "Not sure" }
    ],
    whyWeAsk: "The product should position AI as support, not authority."
  }
];

export const pricingQuestions: Question[] = [
  {
    id: "pricing_report_value",
    section: "pricing",
    type: "multi_select",
    prompt: "Which premium features would be worth paying for?",
    options: [
      { id: "full_report", label: "Full personalized career report" },
      { id: "unlimited_simulations", label: "Unlimited simulations" },
      { id: "human_review", label: "Human expert review" },
      { id: "company_cases", label: "Access to company-backed cases" },
      { id: "career_passport", label: "Exportable Career Passport" },
      { id: "internship_recommendations", label: "Internship recommendations" },
      { id: "outreach_templates", label: "LinkedIn outreach templates" },
      { id: "interview_prep", label: "Interview preparation plan" }
    ]
  },
  {
    id: "pricing_wtp",
    section: "pricing",
    type: "single_select",
    prompt: "What would you realistically pay for a full personalized report?",
    options: [
      { id: "zero", label: "€0" },
      { id: "five", label: "€4.99" },
      { id: "ten", label: "€9.99" },
      { id: "twenty", label: "€19.99" },
      { id: "thirty", label: "€29.99" },
      { id: "fifty_plus", label: "€49+" }
    ],
    whyWeAsk: "This is only a signal. Real willingness to pay should be tested behaviorally with a fake-door or preorder."
  }
];

export const careerAdvisorQuestions: Question[] = [
  {
    id: "advisor_when_needed",
    section: "career_advisor",
    type: "single_select",
    prompt: "When would you want a human advisor involved?",
    options: [
      { id: "before_results", label: "Before results, to guide the process" },
      { id: "after_results", label: "After results, to review the roadmap" },
      { id: "before_applications", label: "Before applications or interviews" },
      { id: "only_if_confused", label: "Only if I remain confused" },
      { id: "never", label: "I prefer self-guided exploration" }
    ]
  },
  {
    id: "advisor_type",
    section: "career_advisor",
    type: "multi_select",
    prompt: "Who would you trust most to review your report?",
    options: [
      { id: "career_advisor", label: "Career advisor" },
      { id: "psychologist", label: "Psychologist or coach" },
      { id: "industry_professional", label: "Professional in the target industry" },
      { id: "alumni", label: "Alumni in the target career" },
      { id: "professor", label: "Professor" },
      { id: "recruiter", label: "Recruiter" }
    ]
  }
];

export const universityQuestions: Question[] = [
  {
    id: "university_biggest_gap",
    section: "university",
    type: "multi_select",
    prompt: "What career support gap do you experience most at university?",
    options: [
      { id: "too_generic", label: "Advice feels too generic" },
      { id: "hard_access", label: "It is hard to access one-to-one guidance" },
      { id: "not_enough_real_work", label: "I do not see what jobs actually feel like" },
      { id: "too_late", label: "Support comes too late" },
      { id: "prestige_bias", label: "Everyone talks about the same prestigious careers" },
      { id: "unclear_next_steps", label: "I leave without concrete next steps" }
    ]
  }
];

export const partnerOptInQuestions: Question[] = [
  {
    id: "partner_share_preference",
    section: "partner_opt_in",
    type: "single_select",
    prompt: "Would you like to share selected simulation results with partner companies?",
    helperText: "You control what is shared. Private practice mode is always available.",
    options: [
      { id: "private", label: "No, keep everything private" },
      { id: "anonymous", label: "Share anonymous performance insights only" },
      { id: "selected", label: "Let me choose which results to share" },
      { id: "opportunities", label: "Share with companies if it can unlock opportunities" }
    ],
    whyWeAsk: "Partner access must be opt-in to preserve trust."
  }
];

export const allQuestions: Question[] = [
  ...onboardingQuestions,
  ...profileQuestions,
  ...aiInterviewQuestions,
  ...simulationReflectionQuestions,
  ...trustQuestions,
  ...pricingQuestions,
  ...careerAdvisorQuestions,
  ...universityQuestions,
  ...partnerOptInQuestions
];

export default allQuestions;
