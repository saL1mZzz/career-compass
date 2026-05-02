export const traitDefinitions = [
  {
    key: "quantitative_reasoning",
    label: "Quantitative reasoning",
    description: "Comfort turning numbers, models, and metrics into decisions.",
  },
  {
    key: "commercial_instinct",
    label: "Commercial instinct",
    description: "Ability to spot what creates business value and where markets are moving.",
  },
  {
    key: "strategic_thinking",
    label: "Strategic thinking",
    description: "Ability to structure ambiguous choices and compare trade-offs.",
  },
  {
    key: "analytical_depth",
    label: "Analytical depth",
    description: "Patience for research, evidence, and rigorous problem diagnosis.",
  },
  {
    key: "communication_clarity",
    label: "Communication clarity",
    description: "Ability to explain complex thinking in a concise, credible way.",
  },
  {
    key: "client_confidence",
    label: "Client-facing confidence",
    description: "Energy for persuasion, advisory work, stakeholder conversations, and feedback.",
  },
  {
    key: "product_thinking",
    label: "Product thinking",
    description: "Interest in users, adoption barriers, prioritization, and product decisions.",
  },
  {
    key: "technical_curiosity",
    label: "Technical curiosity",
    description: "Curiosity about AI, software, data, and technology-enabled workflows.",
  },
  {
    key: "problem_structure",
    label: "Problem-solving structure",
    description: "Ability to break messy questions into testable hypotheses.",
  },
  {
    key: "leadership_potential",
    label: "Leadership potential",
    description: "Preference for ownership, influence, and coordinating people toward outcomes.",
  },
  {
    key: "operational_execution",
    label: "Operational execution",
    description: "Interest in systems, processes, execution detail, and measurable delivery.",
  },
  {
    key: "creativity_storytelling",
    label: "Creativity and storytelling",
    description: "Energy for positioning, messaging, brand, narrative, and creative judgment.",
  },
  {
    key: "financial_literacy",
    label: "Financial literacy",
    description: "Interest in finance, investing, valuation, markets, and transaction logic.",
  },
  {
    key: "research_intensity",
    label: "Research intensity",
    description: "Willingness to investigate markets, users, competitors, and evidence deeply.",
  },
  {
    key: "risk_tolerance",
    label: "Risk tolerance",
    description: "Comfort with uncertainty, variable outcomes, and higher-stakes choices.",
  },
  {
    key: "entrepreneurial_drive",
    label: "Entrepreneurial drive",
    description: "Interest in startups, building, autonomy, and opportunity creation.",
  },
  {
    key: "social_impact",
    label: "Social impact motivation",
    description: "Motivation to work on mission-driven, climate, healthcare, or policy problems.",
  },
  {
    key: "team_collaboration",
    label: "Team collaboration",
    description: "Preference for working with others, aligning groups, and shared problem solving.",
  },
  {
    key: "autonomy_preference",
    label: "Autonomy preference",
    description: "Desire for independent ownership and room to define the work.",
  },
  {
    key: "detail_orientation",
    label: "Detail orientation",
    description: "Comfort with precision, quality control, and careful execution.",
  },
  {
    key: "pressure_tolerance",
    label: "Pressure tolerance",
    description: "Ability to operate under deadlines, intensity, and visible stakes.",
  },
  {
    key: "user_empathy",
    label: "User empathy",
    description: "Interest in understanding people, behavior, friction, and unmet needs.",
  },
  {
    key: "market_curiosity",
    label: "Market curiosity",
    description: "Curiosity about industries, competitors, trends, customers, and business models.",
  },
  {
    key: "decision_style",
    label: "Decision-making style",
    description: "Ability to make practical decisions with incomplete information.",
  },
  {
    key: "learning_velocity",
    label: "Learning velocity",
    description: "Appetite for steep learning curves, rapid feedback, and skill compounding.",
  },
  {
    key: "stakeholder_management",
    label: "Stakeholder management",
    description: "Ability to influence, coordinate, and communicate with different audiences.",
  },
  {
    key: "presentation_confidence",
    label: "Presentation confidence",
    description: "Comfort presenting recommendations, stories, and evidence to others.",
  },
  {
    key: "business_judgment",
    label: "Business judgment",
    description: "Practical sense for which action is most likely to work in context.",
  },
] as const;

export type TraitKey = (typeof traitDefinitions)[number]["key"];

export type TraitWeightMap = Partial<Record<TraitKey, number>>;

export type CareerPath = {
  id: string;
  title: string;
  family: string;
  iconKey: string;
  summary: string;
  explanation: string;
  bestFor: string[];
  traitWeights: TraitWeightMap;
  simulationIds: string[];
  entryRoles: string[];
  companiesToFollow: string[];
  blockers: string[];
  skillGaps: string[];
  roadmap: {
    thirty: string[];
    ninety: string[];
    twelveMonths: string[];
  };
};

export const careerPaths: CareerPath[] = [
  {
    id: "product_ai_strategy",
    title: "Product Management / AI Product Strategy",
    family: "Technology and product",
    iconKey: "product",
    summary:
      "Best for people who like users, prioritization, AI-enabled products, adoption problems, and cross-functional trade-offs.",
    explanation:
      "This path fits when user empathy, product thinking, technical curiosity, commercial instinct, and structured prioritization appear together.",
    bestFor: [
      "Turning user needs into product decisions",
      "Prioritizing features under constraints",
      "Working with business, design, data, and engineering teams",
    ],
    traitWeights: {
      product_thinking: 1.35,
      user_empathy: 1.15,
      technical_curiosity: 1.05,
      strategic_thinking: 1,
      decision_style: 0.9,
      communication_clarity: 0.8,
      commercial_instinct: 0.75,
      learning_velocity: 0.7,
    },
    simulationIds: ["apple_product_strategy", "microsoft_ai_adoption"],
    entryRoles: ["Associate Product Manager", "AI Product Analyst", "Product Strategy Intern"],
    companiesToFollow: ["Apple", "Microsoft", "Google", "OpenAI", "Stripe"],
    blockers: [
      "Weak metrics discipline can make product recommendations feel subjective.",
      "Low technical curiosity can make AI product roles harder to enter.",
    ],
    skillGaps: [
      "Product analytics",
      "User research synthesis",
      "Technical fluency for AI and software teams",
    ],
    roadmap: {
      thirty: [
        "Complete the Apple-style product strategy simulation.",
        "Write one product teardown focused on adoption barriers and metrics.",
        "Learn activation, retention, and feature prioritization basics.",
      ],
      ninety: [
        "Complete the Microsoft-style AI adoption simulation.",
        "Build a one-page product requirements document for a student AI tool.",
        "Interview two product managers or product interns about daily work.",
      ],
      twelveMonths: [
        "Ship a small product or no-code prototype with usage metrics.",
        "Apply to APM, product strategy, and AI product internships.",
        "Build a portfolio with two product cases and one shipped project.",
      ],
    },
  },
  {
    id: "strategy_consulting",
    title: "Strategy Consulting",
    family: "Consulting and strategy",
    iconKey: "consulting",
    summary:
      "Best for people who enjoy ambiguous business problems, structured thinking, client communication, and recommendations.",
    explanation:
      "This path fits when problem-solving structure, communication clarity, business judgment, and client-facing confidence are strong.",
    bestFor: [
      "Structuring messy business questions",
      "Building clear recommendations from incomplete evidence",
      "Working in client-facing project teams",
    ],
    traitWeights: {
      problem_structure: 1.35,
      strategic_thinking: 1.2,
      communication_clarity: 1.05,
      client_confidence: 1,
      presentation_confidence: 0.95,
      business_judgment: 0.9,
      analytical_depth: 0.75,
      pressure_tolerance: 0.6,
    },
    simulationIds: ["mckinsey_market_entry"],
    entryRoles: ["Business Analyst", "Junior Consultant", "Strategy Analyst"],
    companiesToFollow: ["McKinsey & Company", "BCG", "Bain", "Oliver Wyman"],
    blockers: [
      "Low pressure tolerance can make consulting sprints draining.",
      "Weak presentation confidence can reduce impact in client-facing work.",
    ],
    skillGaps: ["Case structuring", "Slide storytelling", "Client-ready presentation"],
    roadmap: {
      thirty: [
        "Complete the McKinsey-style market entry simulation.",
        "Practice three profitability or market-entry case structures.",
        "Rewrite one messy problem as a hypothesis tree.",
      ],
      ninety: [
        "Run five mock cases with peers or alumni.",
        "Create a three-slide recommendation deck from a public business problem.",
        "Speak with two consulting interns about project cadence and lifestyle.",
      ],
      twelveMonths: [
        "Apply to consulting discovery programs and internships.",
        "Build a portfolio of three concise case write-ups.",
        "Practice fit interviews and structured communication weekly.",
      ],
    },
  },
  {
    id: "venture_startup_investing",
    title: "Venture Capital / Startup Investing",
    family: "Investing and entrepreneurship",
    iconKey: "venture",
    summary:
      "Best for people who like markets, startups, pattern recognition, founder conversations, and ambiguous opportunity assessment.",
    explanation:
      "This path fits when market curiosity, commercial instinct, research intensity, risk tolerance, and entrepreneurial drive combine.",
    bestFor: [
      "Researching markets and competitors",
      "Evaluating startup ideas and founder quality",
      "Building informed opinions with incomplete data",
    ],
    traitWeights: {
      market_curiosity: 1.35,
      commercial_instinct: 1.2,
      research_intensity: 1.05,
      entrepreneurial_drive: 1,
      risk_tolerance: 0.95,
      business_judgment: 0.9,
      communication_clarity: 0.7,
      financial_literacy: 0.65,
    },
    simulationIds: ["blackrock_portfolio_allocation", "goldman_mna"],
    entryRoles: ["VC Scout", "Investment Analyst", "Startup Strategy Intern"],
    companiesToFollow: ["Index Ventures", "Sequoia", "Andreessen Horowitz", "Y Combinator"],
    blockers: [
      "Weak financial literacy can make investment analysis less credible.",
      "Low research intensity can make market theses shallow.",
    ],
    skillGaps: ["Market mapping", "Unit economics", "Investment memo writing"],
    roadmap: {
      thirty: [
        "Write one short market map for an industry you are curious about.",
        "Analyze three startups using problem, market, traction, and team.",
        "Complete the BlackRock-style allocation simulation for investment discipline.",
      ],
      ninety: [
        "Write two investment memos on startups or public companies.",
        "Interview founders or join a university startup club.",
        "Learn basics of TAM, CAC, LTV, gross margin, and funding rounds.",
      ],
      twelveMonths: [
        "Become a student scout, startup operator intern, or campus VC fellow.",
        "Build a public thesis portfolio with five startup analyses.",
        "Apply to VC internships, startup strategy roles, or accelerator programs.",
      ],
    },
  },
  {
    id: "investment_banking_mna",
    title: "Investment Banking / M&A",
    family: "Finance and transactions",
    iconKey: "finance",
    summary:
      "Best for people who like financial reasoning, high-pressure execution, valuation, transactions, and polished recommendations.",
    explanation:
      "This path fits when financial literacy, quantitative reasoning, detail orientation, pressure tolerance, and presentation confidence are strong.",
    bestFor: [
      "Evaluating companies and transactions",
      "Building analytical models and transaction logic",
      "Working intensely on high-stakes deadlines",
    ],
    traitWeights: {
      financial_literacy: 1.35,
      quantitative_reasoning: 1.2,
      detail_orientation: 1.05,
      pressure_tolerance: 1,
      commercial_instinct: 0.9,
      presentation_confidence: 0.8,
      analytical_depth: 0.75,
      business_judgment: 0.7,
    },
    simulationIds: ["goldman_mna", "blackrock_portfolio_allocation"],
    entryRoles: ["M&A Analyst", "Investment Banking Summer Analyst", "Corporate Finance Analyst"],
    companiesToFollow: ["Goldman Sachs", "Morgan Stanley", "J.P. Morgan", "Lazard"],
    blockers: [
      "Weak pressure tolerance can make the lifestyle unsustainable.",
      "Low detail orientation can create avoidable modeling and deck errors.",
    ],
    skillGaps: ["Valuation multiples", "Financial modeling", "M&A process fundamentals"],
    roadmap: {
      thirty: [
        "Complete the Goldman Sachs-style M&A simulation.",
        "Learn the difference between revenue, EBITDA, margin, and valuation multiples.",
        "Build a one-page acquisition rationale for a public deal.",
      ],
      ninety: [
        "Complete a beginner valuation model for one public company.",
        "Practice explaining an M&A recommendation in three minutes.",
        "Network with two banking analysts or finance club alumni.",
      ],
      twelveMonths: [
        "Prepare technical interview basics and market awareness weekly.",
        "Apply to finance insight programs, off-cycle internships, and summer analyst roles.",
        "Build a deal notebook with five transaction summaries.",
      ],
    },
  },
  {
    id: "data_business_intelligence",
    title: "Data Analytics / Business Intelligence",
    family: "Data and analytics",
    iconKey: "data",
    summary:
      "Best for people who enjoy analytical depth, quantitative reasoning, dashboards, metrics, and evidence-led business decisions.",
    explanation:
      "This path fits when quantitative reasoning, analytical depth, technical curiosity, detail orientation, and business judgment are strong.",
    bestFor: [
      "Analyzing behavior and operational data",
      "Finding patterns behind business problems",
      "Creating dashboards and insight narratives",
    ],
    traitWeights: {
      quantitative_reasoning: 1.3,
      analytical_depth: 1.2,
      technical_curiosity: 1,
      detail_orientation: 0.95,
      business_judgment: 0.85,
      problem_structure: 0.75,
      communication_clarity: 0.65,
    },
    simulationIds: ["microsoft_ai_adoption", "amazon_operations"],
    entryRoles: ["Business Analyst", "Data Analyst", "Product Analytics Intern"],
    companiesToFollow: ["Microsoft", "Amazon", "Google", "Datadog", "Snowflake"],
    blockers: [
      "Weak communication can make good analysis hard to act on.",
      "Low technical curiosity can slow SQL, dashboard, and analytics skill-building.",
    ],
    skillGaps: ["SQL basics", "Dashboard design", "Experiment and retention analysis"],
    roadmap: {
      thirty: [
        "Complete the Microsoft-style AI adoption simulation.",
        "Learn activation, retention, cohort, and conversion metrics.",
        "Rebuild one public dashboard and write three insight bullets.",
      ],
      ninety: [
        "Complete one SQL or analytics mini-course.",
        "Create a portfolio dashboard from a public dataset.",
        "Interview a data analyst about stakeholder questions and workflow.",
      ],
      twelveMonths: [
        "Apply to analytics internships and business intelligence roles.",
        "Build three portfolio projects with clear business recommendations.",
        "Practice presenting analytical findings to non-technical audiences.",
      ],
    },
  },
  {
    id: "growth_brand_strategy",
    title: "Growth Marketing / Brand Strategy",
    family: "Marketing and consumer",
    iconKey: "growth",
    summary:
      "Best for people who enjoy consumer insight, storytelling, creative testing, market positioning, and growth channels.",
    explanation:
      "This path fits when creativity, user empathy, market curiosity, communication clarity, and commercial instinct are strong.",
    bestFor: [
      "Understanding why consumers choose products",
      "Turning insight into positioning and campaigns",
      "Testing channels, messages, and growth loops",
    ],
    traitWeights: {
      creativity_storytelling: 1.35,
      user_empathy: 1.05,
      market_curiosity: 1,
      communication_clarity: 0.95,
      commercial_instinct: 0.85,
      presentation_confidence: 0.7,
      stakeholder_management: 0.65,
    },
    simulationIds: ["loreal_brand_launch", "microsoft_ai_adoption"],
    entryRoles: ["Brand Marketing Analyst", "Growth Marketing Intern", "Product Marketing Associate"],
    companiesToFollow: ["L'Oreal", "LVMH", "Meta", "TikTok", "Spotify"],
    blockers: [
      "Weak commercial discipline can make creative ideas hard to prioritize.",
      "Low research intensity can lead to shallow consumer insight.",
    ],
    skillGaps: ["Positioning", "Channel strategy", "Creative testing metrics"],
    roadmap: {
      thirty: [
        "Complete the L'Oreal-style brand launch simulation.",
        "Write one positioning teardown for a Gen Z product.",
        "Learn funnel, conversion, retention, and creative testing basics.",
      ],
      ninety: [
        "Create a mini go-to-market plan for a student product.",
        "Analyze three brands through audience, promise, proof, and channels.",
        "Speak with one brand marketer and one growth marketer.",
      ],
      twelveMonths: [
        "Build a campaign portfolio with performance hypotheses.",
        "Apply to brand, growth, and product marketing internships.",
        "Develop stronger analytics fluency for marketing measurement.",
      ],
    },
  },
  {
    id: "operations_strategy",
    title: "Operations Strategy",
    family: "Operations and systems",
    iconKey: "operations",
    summary:
      "Best for people who enjoy processes, systems, execution plans, bottlenecks, and measurable operational improvement.",
    explanation:
      "This path fits when operational execution, detail orientation, problem structure, quantitative reasoning, and decision-making style are strong.",
    bestFor: [
      "Diagnosing process bottlenecks",
      "Improving delivery, supply chain, and service systems",
      "Turning data into execution plans",
    ],
    traitWeights: {
      operational_execution: 1.35,
      detail_orientation: 1.05,
      problem_structure: 0.95,
      quantitative_reasoning: 0.85,
      decision_style: 0.8,
      stakeholder_management: 0.7,
      pressure_tolerance: 0.65,
    },
    simulationIds: ["amazon_operations", "santander_digital_banking"],
    entryRoles: ["Operations Analyst", "Supply Chain Intern", "Process Improvement Analyst"],
    companiesToFollow: ["Amazon", "Tesla", "Inditex", "DHL", "Maersk"],
    blockers: [
      "Low detail orientation can make execution plans miss operational constraints.",
      "Weak stakeholder management can slow process change.",
    ],
    skillGaps: ["Process mapping", "Operational metrics", "Root-cause analysis"],
    roadmap: {
      thirty: [
        "Complete the Amazon-style operations simulation.",
        "Map the process behind a service you use and identify bottlenecks.",
        "Learn SLA, capacity, throughput, and error-rate basics.",
      ],
      ninety: [
        "Complete one operations analytics project from public data.",
        "Interview someone in supply chain, logistics, or operations strategy.",
        "Write a three-step improvement plan for a local service process.",
      ],
      twelveMonths: [
        "Apply to operations, supply chain, and strategy internships.",
        "Build a portfolio of process maps and improvement cases.",
        "Develop stronger Excel, analytics, and stakeholder communication skills.",
      ],
    },
  },
  {
    id: "fintech_digital_strategy",
    title: "Fintech Strategy",
    family: "Finance and digital product",
    iconKey: "fintech",
    summary:
      "Best for people who like banking, digital products, customer behavior, trust, retention, and financial services innovation.",
    explanation:
      "This path fits when commercial instinct, product thinking, financial literacy, user empathy, and metrics discipline appear together.",
    bestFor: [
      "Improving digital banking journeys",
      "Understanding retention and trust in financial products",
      "Combining finance, product, and customer behavior",
    ],
    traitWeights: {
      product_thinking: 1.1,
      financial_literacy: 1,
      user_empathy: 0.95,
      commercial_instinct: 0.9,
      business_judgment: 0.85,
      technical_curiosity: 0.75,
      detail_orientation: 0.65,
    },
    simulationIds: ["santander_digital_banking", "microsoft_ai_adoption"],
    entryRoles: ["Fintech Strategy Analyst", "Digital Banking Analyst", "Product Strategy Intern"],
    companiesToFollow: ["Santander", "Revolut", "N26", "Stripe", "Adyen"],
    blockers: [
      "Weak regulatory or financial curiosity can limit fintech credibility.",
      "Low user empathy can make retention problems harder to diagnose.",
    ],
    skillGaps: ["Digital banking metrics", "Customer retention", "Basic financial product logic"],
    roadmap: {
      thirty: [
        "Complete the Santander-style digital banking simulation.",
        "Compare two banking apps using onboarding, trust, and retention criteria.",
        "Learn activation, primary-account behavior, and churn metrics.",
      ],
      ninety: [
        "Create a one-page retention strategy for a fintech app.",
        "Speak with a digital banking analyst or fintech product manager.",
        "Complete an AI adoption or product analytics case.",
      ],
      twelveMonths: [
        "Apply to fintech, digital banking, and product strategy internships.",
        "Build a mini portfolio on customer retention and digital financial products.",
        "Develop stronger financial services and regulation awareness.",
      ],
    },
  },
];

export const tagTraitWeights: Record<string, TraitWeightMap> = {
  consulting: {
    problem_structure: 1,
    strategic_thinking: 0.8,
    communication_clarity: 0.6,
    client_confidence: 0.5,
  },
  strategy: {
    strategic_thinking: 1,
    problem_structure: 0.7,
    business_judgment: 0.7,
  },
  business: {
    business_judgment: 0.8,
    commercial_instinct: 0.7,
  },
  finance: {
    financial_literacy: 1,
    quantitative_reasoning: 0.8,
    detail_orientation: 0.5,
  },
  banking: {
    financial_literacy: 1,
    pressure_tolerance: 0.7,
    presentation_confidence: 0.5,
  },
  investing: {
    market_curiosity: 1,
    commercial_instinct: 0.8,
    financial_literacy: 0.7,
  },
  investment: {
    financial_literacy: 1,
    commercial_instinct: 0.7,
    quantitative_reasoning: 0.5,
  },
  vc: {
    market_curiosity: 1,
    entrepreneurial_drive: 0.9,
    research_intensity: 0.7,
    risk_tolerance: 0.6,
  },
  tech: {
    technical_curiosity: 1,
    product_thinking: 0.7,
    learning_velocity: 0.5,
  },
  ai: {
    technical_curiosity: 1,
    product_thinking: 0.7,
    analytical_depth: 0.5,
  },
  product: {
    product_thinking: 1,
    user_empathy: 0.8,
    decision_style: 0.6,
  },
  ux: {
    user_empathy: 1,
    research_intensity: 0.7,
    product_thinking: 0.6,
  },
  data: {
    analytical_depth: 1,
    quantitative_reasoning: 0.9,
    technical_curiosity: 0.6,
  },
  analytics: {
    analytical_depth: 1,
    quantitative_reasoning: 0.8,
    business_judgment: 0.4,
  },
  marketing: {
    creativity_storytelling: 1,
    communication_clarity: 0.7,
    market_curiosity: 0.6,
  },
  brand: {
    creativity_storytelling: 1,
    user_empathy: 0.7,
    presentation_confidence: 0.5,
  },
  consumer: {
    user_empathy: 0.8,
    market_curiosity: 0.7,
    creativity_storytelling: 0.5,
  },
  startups: {
    entrepreneurial_drive: 1,
    risk_tolerance: 0.7,
    market_curiosity: 0.6,
  },
  founder: {
    entrepreneurial_drive: 1,
    leadership_potential: 0.8,
    autonomy_preference: 0.7,
  },
  entrepreneurship: {
    entrepreneurial_drive: 1,
    risk_tolerance: 0.8,
    leadership_potential: 0.7,
  },
  operations: {
    operational_execution: 1,
    detail_orientation: 0.7,
    decision_style: 0.4,
  },
  ops: {
    operational_execution: 1,
    detail_orientation: 0.7,
  },
  logistics: {
    operational_execution: 1,
    quantitative_reasoning: 0.5,
  },
  project_management: {
    stakeholder_management: 0.8,
    operational_execution: 0.8,
    team_collaboration: 0.5,
  },
  leadership: {
    leadership_potential: 1,
    stakeholder_management: 0.7,
    team_collaboration: 0.5,
  },
  management: {
    leadership_potential: 0.8,
    stakeholder_management: 0.7,
  },
  research: {
    research_intensity: 1,
    analytical_depth: 0.8,
  },
  policy: {
    social_impact: 0.8,
    research_intensity: 0.7,
    communication_clarity: 0.5,
  },
  sustainability: {
    social_impact: 1,
    market_curiosity: 0.4,
  },
  impact: {
    social_impact: 1,
    stakeholder_management: 0.4,
  },
  healthcare: {
    social_impact: 0.8,
    analytical_depth: 0.6,
  },
  biotech: {
    technical_curiosity: 0.8,
    analytical_depth: 0.7,
    social_impact: 0.4,
  },
  luxury: {
    creativity_storytelling: 0.8,
    market_curiosity: 0.7,
    commercial_instinct: 0.5,
  },
  fashion: {
    creativity_storytelling: 0.9,
    market_curiosity: 0.5,
  },
  sales: {
    client_confidence: 1,
    communication_clarity: 0.7,
    stakeholder_management: 0.5,
  },
  business_development: {
    client_confidence: 0.9,
    commercial_instinct: 0.8,
    stakeholder_management: 0.6,
  },
  software: {
    technical_curiosity: 1,
    analytical_depth: 0.6,
  },
  compensation: {
    financial_literacy: 0.5,
    commercial_instinct: 0.4,
    pressure_tolerance: 0.3,
  },
  status: {
    pressure_tolerance: 0.4,
    presentation_confidence: 0.4,
  },
  growth: {
    learning_velocity: 1,
    entrepreneurial_drive: 0.4,
  },
  independence: {
    autonomy_preference: 1,
    entrepreneurial_drive: 0.4,
  },
  creative: {
    creativity_storytelling: 1,
    autonomy_preference: 0.4,
  },
  ambition: {
    learning_velocity: 0.8,
    pressure_tolerance: 0.6,
    leadership_potential: 0.5,
  },
  global: {
    market_curiosity: 0.5,
    stakeholder_management: 0.4,
  },
  purpose: {
    social_impact: 1,
  },
  lifestyle: {
    autonomy_preference: 0.4,
  },
  clarity: {
    decision_style: 0.4,
  },
  action_plan: {
    operational_execution: 0.5,
    learning_velocity: 0.4,
  },
};

export const optionTraitWeights: Record<string, TraitWeightMap> = {
  ambiguous: {
    strategic_thinking: 1,
    problem_structure: 0.8,
    risk_tolerance: 0.5,
  },
  clear: {
    detail_orientation: 0.8,
    operational_execution: 0.7,
    quantitative_reasoning: 0.4,
  },
  mix: {
    decision_style: 0.8,
    team_collaboration: 0.5,
  },
  depends_team: {
    stakeholder_management: 0.8,
    team_collaboration: 0.6,
  },
  competitive_fast: {
    pressure_tolerance: 1,
    learning_velocity: 0.7,
    commercial_instinct: 0.4,
  },
  collaborative_supportive: {
    team_collaboration: 1,
    stakeholder_management: 0.6,
  },
  independent_deep_work: {
    analytical_depth: 1,
    autonomy_preference: 0.8,
    research_intensity: 0.6,
  },
  creative_flexible: {
    creativity_storytelling: 1,
    autonomy_preference: 0.7,
  },
  structured_professional: {
    detail_orientation: 0.8,
    operational_execution: 0.7,
    pressure_tolerance: 0.4,
  },
  mission_driven: {
    social_impact: 1,
    stakeholder_management: 0.5,
  },
  money: {
    financial_literacy: 0.7,
    commercial_instinct: 0.5,
  },
  status: {
    pressure_tolerance: 0.5,
    presentation_confidence: 0.5,
  },
  autonomy: {
    autonomy_preference: 1,
    entrepreneurial_drive: 0.4,
  },
  impact: {
    social_impact: 1,
  },
  learning: {
    learning_velocity: 1,
  },
  security: {
    detail_orientation: 0.4,
    operational_execution: 0.4,
  },
  lifestyle: {
    autonomy_preference: 0.4,
  },
  constant_pressure: {
    pressure_tolerance: -0.8,
  },
  too_much_detail: {
    detail_orientation: -0.6,
  },
  too_much_social: {
    client_confidence: -0.5,
    stakeholder_management: -0.4,
  },
  lack_autonomy: {
    autonomy_preference: 0.7,
  },
  slow_pace: {
    learning_velocity: 0.6,
    entrepreneurial_drive: 0.4,
  },
  selling_persuasion: {
    client_confidence: -0.5,
  },
};
