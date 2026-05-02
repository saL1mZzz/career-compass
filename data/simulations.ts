/**
 * Career Compass - Detailed Career Simulations
 * ------------------------------------------------------------
 * Use this file as hardcoded seed data for the prototype.
 *
 * Legal/credibility note:
 * These cases are written as educational, partner-inspired simulations.
 * Do not use real company logos or claim official partnership unless permission exists.
 * Recommended UI label:
 * "Partner-inspired educational case. Not affiliated with or endorsed by the company."
 */

export type PartnerStatus =
  | "prototype_only"
  | "partner_inspired"
  | "expert_reviewed"
  | "partner_provided";

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export type SimulationTaskType =
  | "single_select"
  | "multi_select"
  | "ranking"
  | "short_answer"
  | "long_answer"
  | "data_selection"
  | "recommendation";

export type SimulationOption = {
  id: string;
  label: string;
  isPreferred?: boolean;
  rationale?: string;
  tags?: string[];
};

export type SimulationTask = {
  id: string;
  stepNumber: number;
  title: string;
  taskType: SimulationTaskType;
  prompt: string;
  context?: string;
  options?: SimulationOption[];
  maxSelections?: number;
  expectedThinking?: string[];
  feedbackRubric: {
    strongAnswer: string;
    averageAnswer: string;
    weakAnswer: string;
  };
  skillWeights: Record<string, number>;
};

export type Simulation = {
  id: string;
  title: string;
  companyLabel: string;
  displayCompany: string;
  partnerStatus: PartnerStatus;
  disclaimer: string;
  industry: string;
  careerPath: string;
  role: string;
  durationMinutes: number;
  difficulty: Difficulty;
  description: string;
  scenario: string;
  userMission: string;
  skillsTested: string[];
  recommendedFor: string[];
  dataRoom: {
    title: string;
    documents: {
      id: string;
      title: string;
      content: string;
    }[];
  };
  tasks: SimulationTask[];
  scoring: {
    dimensions: { id: string; label: string; description: string }[];
    fitUpdateLogic: string;
  };
  finalFeedbackTemplate: {
    strongPerformance: string;
    mediumPerformance: string;
    weakPerformance: string;
    reflectionPrompt: string;
    suggestedNextStep: string;
  };
};

const educationalDisclaimer =
  "Partner-inspired educational case for prototype purposes. Not affiliated with or endorsed by the named company unless an official partnership is confirmed.";

export const simulations: Simulation[] = [
  {
    id: "apple_product_strategy",
    title: "Apple-style Product Strategy Simulation",
    companyLabel: "Apple-style",
    displayCompany: "Global Technology Company",
    partnerStatus: "partner_inspired",
    disclaimer: educationalDisclaimer,
    industry: "Technology",
    careerPath: "Product Strategy / Product Management",
    role: "Product Strategy Intern",
    durationMinutes: 18,
    difficulty: "Intermediate",
    description:
      "Test whether you enjoy product strategy by prioritizing a student adoption strategy for a new productivity device.",
    scenario:
      "A global technology company is exploring how to increase adoption of a premium productivity device among university students. Awareness is high, but adoption is lower than expected because students perceive the product as expensive and not clearly necessary for daily academic work.",
    userMission:
      "Identify the best student segment, diagnose adoption barriers, prioritize product or pricing features, and recommend a go-to-market plan.",
    skillsTested: [
      "User segmentation",
      "Product thinking",
      "Prioritization",
      "Strategic communication",
      "Commercial judgment"
    ],
    recommendedFor: [
      "Students interested in product management",
      "Students considering technology careers",
      "Students who like user problems and business strategy"
    ],
    dataRoom: {
      title: "Student Device Adoption Data Room",
      documents: [
        {
          id: "market_snapshot",
          title: "Market snapshot",
          content:
            "University students increasingly use tablets, laptops, AI tools, and note-taking apps. However, device adoption is strongly influenced by price, academic use case, peer visibility, and compatibility with existing workflows."
        },
        {
          id: "student_segments",
          title: "Student segments",
          content:
            "Potential segments include business students, design students, engineering students, medical students, remote learners, and student creators. Design and medical students show high use-case intensity, while business students show high willingness to pay but lower device necessity."
        },
        {
          id: "survey_results",
          title: "Student survey highlights",
          content:
            "Top barriers: price, uncertainty about daily use, overlap with existing laptop, lack of student bundle, unclear productivity advantage. Top motivators: note-taking, portability, creative work, AI-enhanced productivity, status, ecosystem integration."
        },
        {
          id: "competitor_note",
          title: "Competitor note",
          content:
            "Competitors offer student discounts, bundled accessories, and aggressive back-to-school campaigns. Some cheaper alternatives win on price but lose on ecosystem and premium perception."
        }
      ]
    },
    tasks: [
      {
        id: "apple_task_segment",
        stepNumber: 1,
        title: "Choose the first target segment",
        taskType: "single_select",
        prompt: "Which student segment should the company prioritize first?",
        context:
          "The company wants a segment with strong need, clear use case, and realistic willingness to pay.",
        options: [
          {
            id: "business_students",
            label: "Business students",
            rationale:
              "They may have willingness to pay and status motivation, but the device need may be less intense.",
            tags: ["medium"]
          },
          {
            id: "design_students",
            label: "Design students",
            isPreferred: true,
            rationale:
              "Strong use-case intensity for creative work, visual tasks, portability, and premium tools.",
            tags: ["strong"]
          },
          {
            id: "engineering_students",
            label: "Engineering students",
            rationale:
              "Potentially attractive, but heavy technical work may still require laptops or specialized tools.",
            tags: ["medium"]
          },
          {
            id: "remote_learners",
            label: "Remote learners",
            rationale:
              "Broad segment, but less specific and harder to activate with a premium device message.",
            tags: ["weak"]
          }
        ],
        expectedThinking: [
          "Prioritize segments based on intensity of use case.",
          "Avoid choosing only the largest segment.",
          "Connect segment to daily workflow and willingness to pay."
        ],
        feedbackRubric: {
          strongAnswer:
            "Chooses a segment with high use-case intensity and clear adoption triggers, such as design students.",
          averageAnswer:
            "Chooses a plausible segment but does not clearly explain why the product is necessary for them.",
          weakAnswer:
            "Chooses a broad or prestigious segment without linking it to daily usage behavior."
        },
        skillWeights: {
          "User segmentation": 0.35,
          "Product thinking": 0.25,
          "Commercial judgment": 0.25,
          "Strategic communication": 0.15
        }
      },
      {
        id: "apple_task_barriers",
        stepNumber: 2,
        title: "Identify adoption barriers",
        taskType: "multi_select",
        prompt: "Which 3 barriers should the product team investigate first?",
        maxSelections: 3,
        options: [
          {
            id: "price",
            label: "Students perceive the device as too expensive",
            isPreferred: true,
            rationale: "Price is a primary student adoption barrier."
          },
          {
            id: "unclear_use_case",
            label: "Students do not see why they need it daily",
            isPreferred: true,
            rationale: "Daily use-case clarity is critical for adoption."
          },
          {
            id: "accessory_bundle",
            label: "Important accessories are sold separately",
            isPreferred: true,
            rationale: "Bundles can change perceived value and reduce friction."
          },
          {
            id: "brand_unknown",
            label: "Students do not know the brand",
            rationale: "Weak in this scenario because awareness is already high."
          },
          {
            id: "too_many_colors",
            label: "There are too many color options",
            rationale: "Unlikely to be a core adoption barrier."
          }
        ],
        expectedThinking: [
          "Separate awareness from conversion.",
          "Focus on price, daily utility, and adoption friction.",
          "Avoid cosmetic explanations unless evidence supports them."
        ],
        feedbackRubric: {
          strongAnswer:
            "Identifies price, unclear use case, and bundle/accessory friction as the highest-priority barriers.",
          averageAnswer:
            "Identifies some relevant barriers but misses the difference between awareness and adoption.",
          weakAnswer:
            "Focuses on low-impact factors that do not explain low adoption."
        },
        skillWeights: {
          "Product thinking": 0.35,
          "User segmentation": 0.2,
          "Prioritization": 0.3,
          "Commercial judgment": 0.15
        }
      },
      {
        id: "apple_task_gtm",
        stepNumber: 3,
        title: "Recommend a go-to-market plan",
        taskType: "recommendation",
        prompt:
          "Write a 3–4 sentence recommendation for how the company should increase student adoption.",
        expectedThinking: [
          "Start with a focused segment.",
          "Bundle product value around a clear use case.",
          "Use campus ambassadors, student pricing, and workflow demos.",
          "Define success metrics."
        ],
        feedbackRubric: {
          strongAnswer:
            "Recommends a focused launch with student pricing, use-case demos, targeted segment activation, and adoption metrics.",
          averageAnswer:
            "Provides a general marketing recommendation without clear prioritization or measurement.",
          weakAnswer:
            "Suggests broad advertising without addressing the actual adoption barriers."
        },
        skillWeights: {
          "Strategic communication": 0.35,
          "Product thinking": 0.25,
          "Commercial judgment": 0.25,
          "Prioritization": 0.15
        }
      }
    ],
    scoring: {
      dimensions: [
        {
          id: "segmentation",
          label: "Segmentation",
          description: "Ability to choose a target user based on need and adoption likelihood."
        },
        {
          id: "product_thinking",
          label: "Product thinking",
          description: "Ability to connect user pain, product value, and adoption barriers."
        },
        {
          id: "gtm",
          label: "Go-to-market logic",
          description: "Ability to design a practical launch strategy."
        }
      ],
      fitUpdateLogic:
        "Increase product strategy fit if the user identifies real user barriers, prioritizes clearly, and reports high enjoyment."
    },
    finalFeedbackTemplate: {
      strongPerformance:
        "You showed strong product strategy instincts because you connected user needs, adoption barriers, and a focused launch plan.",
      mediumPerformance:
        "You showed potential for product strategy, especially if you continue building prioritization and user segmentation skills.",
      weakPerformance:
        "This simulation suggests product strategy may require more practice, especially in connecting user insight to business action.",
      reflectionPrompt:
        "Did you enjoy thinking about users, adoption barriers, and product trade-offs?",
      suggestedNextStep:
        "Try one more product simulation, then speak with a product manager or product intern about their daily work."
    }
  },
  {
    id: "microsoft_ai_adoption",
    title: "Microsoft-style AI Adoption Simulation",
    companyLabel: "Microsoft-style",
    displayCompany: "Global Software Company",
    partnerStatus: "partner_inspired",
    disclaimer: educationalDisclaimer,
    industry: "Technology / AI",
    careerPath: "Growth Strategy / Product Strategy",
    role: "AI Growth Strategy Analyst",
    durationMinutes: 20,
    difficulty: "Intermediate",
    description:
      "Test whether you enjoy AI product growth by increasing student usage of an AI productivity tool.",
    scenario:
      "A global software company launched an AI productivity assistant for students. Sign-ups are strong after promotional campaigns, but weekly active usage is low. The company needs to understand whether the issue is onboarding, unclear use cases, weak habit formation, or lack of trust.",
    userMission:
      "Diagnose the adoption problem, choose the right metrics, prioritize product improvements, and recommend a student growth strategy.",
    skillsTested: [
      "Product analytics",
      "Growth strategy",
      "AI use-case thinking",
      "Prioritization",
      "Metrics reasoning"
    ],
    recommendedFor: [
      "Students interested in AI",
      "Students considering product growth",
      "Students who like data-informed decisions"
    ],
    dataRoom: {
      title: "AI Student Adoption Data Room",
      documents: [
        {
          id: "usage_metrics",
          title: "Usage metrics",
          content:
            "100,000 student sign-ups in three months. Only 28% activate a core feature in week one. Weekly active usage drops to 14% by week four. Students who use the tool three times in the first week are 4x more likely to continue."
        },
        {
          id: "student_feedback",
          title: "Student feedback",
          content:
            "Students say the tool is impressive but not always integrated into their study routine. Some worry about academic integrity. Others do not know which tasks are appropriate for AI assistance."
        },
        {
          id: "feature_list",
          title: "Current features",
          content:
            "Summarization, essay brainstorming, study planning, calendar suggestions, slide generation, and quiz creation. Most students only try summarization once."
        },
        {
          id: "trust_note",
          title: "Trust note",
          content:
            "University policies on AI use are inconsistent. Students want clearer guidance on acceptable use and citation."
        }
      ]
    },
    tasks: [
      {
        id: "ms_task_metric",
        stepNumber: 1,
        title: "Choose the most important metric",
        taskType: "multi_select",
        prompt: "Which 3 metrics matter most to understand adoption quality?",
        maxSelections: 3,
        options: [
          {
            id: "daily_active_users",
            label: "Daily active users",
            isPreferred: true,
            rationale: "Measures actual recurring usage."
          },
          {
            id: "feature_activation_rate",
            label: "Feature activation rate",
            isPreferred: true,
            rationale: "Shows whether students experience core value."
          },
          {
            id: "week_4_retention",
            label: "Week 4 retention",
            isPreferred: true,
            rationale: "Shows whether usage becomes a habit."
          },
          {
            id: "total_signups",
            label: "Total sign-ups",
            rationale: "Useful, but weaker because sign-ups do not prove value."
          },
          {
            id: "social_impressions",
            label: "Social media impressions",
            rationale: "Measures awareness, not adoption quality."
          }
        ],
        expectedThinking: [
          "Distinguish awareness from activation and retention.",
          "Focus on usage behavior, not vanity metrics.",
          "Understand the adoption funnel."
        ],
        feedbackRubric: {
          strongAnswer:
            "Prioritizes activation, recurring usage, and retention as the key signals.",
          averageAnswer:
            "Includes at least one usage metric but relies too much on sign-ups or impressions.",
          weakAnswer:
            "Focuses mainly on awareness metrics and misses the adoption problem."
        },
        skillWeights: {
          "Metrics reasoning": 0.4,
          "Product analytics": 0.3,
          "Growth strategy": 0.2,
          "Prioritization": 0.1
        }
      },
      {
        id: "ms_task_barrier",
        stepNumber: 2,
        title: "Diagnose the barrier",
        taskType: "single_select",
        prompt: "What is the most likely core adoption barrier?",
        options: [
          {
            id: "low_awareness",
            label: "Students do not know the product exists",
            rationale: "Less likely because sign-ups are already strong."
          },
          {
            id: "unclear_use_case",
            label: "Students do not know how to use it in their daily workflow",
            isPreferred: true,
            rationale: "Best answer because usage drops after initial curiosity."
          },
          {
            id: "bad_interface",
            label: "The interface is visually unattractive",
            rationale: "Possible, but not supported by the provided data."
          },
          {
            id: "too_expensive",
            label: "The tool is too expensive",
            rationale: "No pricing data suggests this is the main barrier."
          }
        ],
        expectedThinking: [
          "Interpret usage drop-off.",
          "Connect qualitative feedback with quantitative activation data.",
          "Avoid unsupported assumptions."
        ],
        feedbackRubric: {
          strongAnswer:
            "Identifies unclear workflow integration and use-case education as the core issue.",
          averageAnswer:
            "Identifies a plausible barrier but does not connect it to the data.",
          weakAnswer:
            "Chooses a barrier contradicted or unsupported by the data."
        },
        skillWeights: {
          "AI use-case thinking": 0.3,
          "Product analytics": 0.3,
          "Growth strategy": 0.25,
          "Prioritization": 0.15
        }
      },
      {
        id: "ms_task_strategy",
        stepNumber: 3,
        title: "Recommend a growth strategy",
        taskType: "recommendation",
        prompt:
          "Write a short recommendation to increase weekly active usage among students.",
        expectedThinking: [
          "Create use-case-based onboarding.",
          "Add academic integrity guidance.",
          "Trigger habit formation in the first week.",
          "Measure activation and retention."
        ],
        feedbackRubric: {
          strongAnswer:
            "Recommends use-case onboarding, trust guidance, first-week habit loops, and retention metrics.",
          averageAnswer:
            "Suggests useful improvements but lacks a clear growth mechanism or metric.",
          weakAnswer:
            "Suggests more advertising despite the usage problem being post-sign-up."
        },
        skillWeights: {
          "Growth strategy": 0.35,
          "AI use-case thinking": 0.25,
          "Metrics reasoning": 0.2,
          "Strategic communication": 0.2
        }
      }
    ],
    scoring: {
      dimensions: [
        {
          id: "growth_logic",
          label: "Growth logic",
          description: "Ability to move from sign-ups to activation and retention."
        },
        {
          id: "ai_use_case",
          label: "AI use-case thinking",
          description: "Ability to identify where AI fits into real workflows."
        },
        {
          id: "metrics",
          label: "Metrics reasoning",
          description: "Ability to choose metrics that reveal product value."
        }
      ],
      fitUpdateLogic:
        "Increase growth/product strategy fit if the user focuses on activation, trust, and retention instead of vanity metrics."
    },
    finalFeedbackTemplate: {
      strongPerformance:
        "You showed strong AI product growth instincts by diagnosing the gap between sign-ups and actual usage.",
      mediumPerformance:
        "You showed potential in AI product strategy, but should practice connecting metrics to user behavior.",
      weakPerformance:
        "This path may require more practice in product analytics and adoption logic.",
      reflectionPrompt:
        "Did you enjoy diagnosing why people adopt or abandon a digital product?",
      suggestedNextStep:
        "Try a product analytics mini-course or complete another product growth simulation."
    }
  },
  {
    id: "goldman_mna",
    title: "Goldman Sachs-style M&A Simulation",
    companyLabel: "Goldman Sachs-style",
    displayCompany: "Tier-One Investment Bank",
    partnerStatus: "partner_inspired",
    disclaimer: educationalDisclaimer,
    industry: "Finance / Investment Banking",
    careerPath: "Investment Banking",
    role: "M&A Analyst",
    durationMinutes: 22,
    difficulty: "Intermediate",
    description:
      "Test whether you enjoy investment banking by evaluating whether a luxury group should explore an acquisition.",
    scenario:
      "A global luxury group is considering acquiring a fast-growing skincare brand popular among Gen Z consumers. The brand has strong revenue growth and social media traction, but profitability and customer retention are uncertain.",
    userMission:
      "Assess the acquisition rationale, select key diligence data, identify deal risks, and recommend whether the deal team should explore the transaction.",
    skillsTested: [
      "Financial reasoning",
      "Commercial judgment",
      "Risk analysis",
      "Data selection",
      "Recommendation clarity"
    ],
    recommendedFor: [
      "Students considering investment banking",
      "Students interested in mergers and acquisitions",
      "Students who like finance and strategic transactions"
    ],
    dataRoom: {
      title: "Luxury Skincare Acquisition Data Room",
      documents: [
        {
          id: "company_overview",
          title: "Target company overview",
          content:
            "The target is a premium skincare brand founded six years ago. It grew through direct-to-consumer channels and influencer marketing. It is popular among Gen Z consumers and recently entered selected retail partnerships."
        },
        {
          id: "financial_summary",
          title: "Financial summary",
          content:
            "Revenue grew from €28m to €95m over three years. Gross margin is 62%. EBITDA margin is 7%, below larger beauty peers. Marketing spend is high at 32% of revenue."
        },
        {
          id: "market_snapshot",
          title: "Market snapshot",
          content:
            "The premium skincare market is growing at 8% annually. Gen Z consumers value authenticity, ingredient transparency, and creator-led brands."
        },
        {
          id: "risk_note",
          title: "Risk note",
          content:
            "Management has not yet proven repeat purchase rates outside its core online community. Growth may depend heavily on paid social media and founder personality."
        },
        {
          id: "valuation_note",
          title: "Valuation note",
          content:
            "Comparable fast-growth beauty brands have traded at 3.0x–5.5x revenue depending on growth, margin profile, retention, and brand strength."
        }
      ]
    },
    tasks: [
      {
        id: "gs_task_rationale",
        stepNumber: 1,
        title: "Identify the strategic rationale",
        taskType: "multi_select",
        prompt: "Which 2 strategic reasons best explain why the luxury group may want this acquisition?",
        maxSelections: 2,
        options: [
          {
            id: "gen_z_access",
            label: "Access Gen Z consumers",
            isPreferred: true,
            rationale: "The target has strong Gen Z relevance."
          },
          {
            id: "digital_capabilities",
            label: "Acquire direct-to-consumer and creator-led marketing capabilities",
            isPreferred: true,
            rationale: "The brand grew through digital channels and social media."
          },
          {
            id: "cost_cutting",
            label: "Reduce manufacturing costs",
            rationale: "Not supported by the case."
          },
          {
            id: "debt_refinancing",
            label: "Refinance debt",
            rationale: "Not a strategic acquisition rationale here."
          }
        ],
        expectedThinking: [
          "Connect acquisition rationale to growth and capabilities.",
          "Avoid generic financial engineering explanations.",
          "Understand strategic buyer logic."
        ],
        feedbackRubric: {
          strongAnswer:
            "Identifies Gen Z access and digital capabilities as the main strategic rationales.",
          averageAnswer:
            "Identifies one strong rationale but includes one unsupported rationale.",
          weakAnswer:
            "Focuses on cost or debt explanations not supported by the case."
        },
        skillWeights: {
          "Commercial judgment": 0.35,
          "Strategic reasoning": 0.3,
          "Risk analysis": 0.15,
          "Recommendation clarity": 0.2
        }
      },
      {
        id: "gs_task_data",
        stepNumber: 2,
        title: "Select diligence data",
        taskType: "data_selection",
        prompt: "You can request 5 data points. Which ones matter most before recommending next steps?",
        maxSelections: 5,
        options: [
          {
            id: "revenue_growth",
            label: "Revenue growth by channel",
            isPreferred: true,
            rationale: "Shows quality and source of growth."
          },
          {
            id: "gross_margin",
            label: "Gross margin and EBITDA margin trend",
            isPreferred: true,
            rationale: "Shows profitability quality."
          },
          {
            id: "repeat_purchase",
            label: "Repeat purchase rate",
            isPreferred: true,
            rationale: "Tests whether demand is loyal or hype-driven."
          },
          {
            id: "cac_ltv",
            label: "Customer acquisition cost and lifetime value",
            isPreferred: true,
            rationale: "Critical for direct-to-consumer economics."
          },
          {
            id: "valuation_multiples",
            label: "Comparable valuation multiples",
            isPreferred: true,
            rationale: "Needed for valuation risk."
          },
          {
            id: "office_location",
            label: "Office location",
            rationale: "Not central to transaction assessment."
          },
          {
            id: "brand_colors",
            label: "Brand color palette",
            rationale: "Interesting for marketing but not core diligence."
          }
        ],
        expectedThinking: [
          "Focus on growth quality, profitability, retention, and valuation.",
          "Avoid superficial brand data.",
          "Think like a deal analyst."
        ],
        feedbackRubric: {
          strongAnswer:
            "Chooses growth, margins, retention, unit economics, and valuation data.",
          averageAnswer:
            "Chooses some important data but misses retention or valuation.",
          weakAnswer:
            "Chooses surface-level information that does not answer deal quality."
        },
        skillWeights: {
          "Financial reasoning": 0.35,
          "Data selection": 0.3,
          "Risk analysis": 0.2,
          "Commercial judgment": 0.15
        }
      },
      {
        id: "gs_task_risks",
        stepNumber: 3,
        title: "Rank the main risks",
        taskType: "ranking",
        prompt: "Rank the top 3 risks that could make this acquisition fail.",
        options: [
          {
            id: "overvaluation",
            label: "Overvaluation",
            isPreferred: true,
            rationale: "Fast growth can lead to excessive valuation."
          },
          {
            id: "weak_retention",
            label: "Weak customer retention",
            isPreferred: true,
            rationale: "Growth may not be durable."
          },
          {
            id: "founder_dependency",
            label: "Founder or influencer dependency",
            isPreferred: true,
            rationale: "Brand strength may rely on a small number of personalities."
          },
          {
            id: "office_design",
            label: "Office design",
            rationale: "Not a core M&A risk."
          }
        ],
        expectedThinking: [
          "Prioritize deal risks that affect valuation and integration.",
          "Separate real commercial risk from noise.",
          "Think about durability of growth."
        ],
        feedbackRubric: {
          strongAnswer:
            "Ranks overvaluation, weak retention, and founder dependency as critical risks.",
          averageAnswer:
            "Identifies some deal risks but misses why they affect transaction value.",
          weakAnswer:
            "Focuses on low-impact operational details."
        },
        skillWeights: {
          "Risk analysis": 0.4,
          "Financial reasoning": 0.25,
          "Commercial judgment": 0.2,
          "Recommendation clarity": 0.15
        }
      },
      {
        id: "gs_task_recommendation",
        stepNumber: 4,
        title: "Make the recommendation",
        taskType: "recommendation",
        prompt:
          "Should the deal team pursue the acquisition, explore with caution, monitor, or pass? Explain in 3–4 sentences.",
        expectedThinking: [
          "Give a clear recommendation.",
          "Balance strategic attractiveness with diligence risk.",
          "Mention specific diligence conditions.",
          "Avoid absolute certainty."
        ],
        feedbackRubric: {
          strongAnswer:
            "Recommends exploring with caution, subject to retention, margin, unit economics, and valuation diligence.",
          averageAnswer:
            "Gives a reasonable recommendation but lacks specific diligence conditions.",
          weakAnswer:
            "Says yes or no without balancing opportunity and risk."
        },
        skillWeights: {
          "Recommendation clarity": 0.35,
          "Financial reasoning": 0.25,
          "Risk analysis": 0.25,
          "Commercial judgment": 0.15
        }
      }
    ],
    scoring: {
      dimensions: [
        {
          id: "deal_logic",
          label: "Deal logic",
          description: "Ability to connect strategic rationale, numbers, and risk."
        },
        {
          id: "finance",
          label: "Financial reasoning",
          description: "Ability to identify relevant financial diligence questions."
        },
        {
          id: "risk",
          label: "Risk judgment",
          description: "Ability to identify what could break the investment case."
        }
      ],
      fitUpdateLogic:
        "Increase banking fit if the user selects relevant financial data, identifies transaction risks, writes a clear recommendation, and reports interest in the work."
    },
    finalFeedbackTemplate: {
      strongPerformance:
        "You showed strong investment banking fit because you connected strategic rationale, financial diligence, valuation risk, and recommendation logic.",
      mediumPerformance:
        "You showed potential for investment banking, but should strengthen financial analysis and deal-risk prioritization.",
      weakPerformance:
        "This simulation suggests investment banking may require more practice, especially in financial reasoning and risk judgment.",
      reflectionPrompt:
        "Did you enjoy evaluating a deal and balancing upside against risk?",
      suggestedNextStep:
        "Practice one beginner M&A case and learn basic valuation multiples."
    }
  },
  {
    id: "santander_digital_banking",
    title: "Santander-style Digital Banking Simulation",
    companyLabel: "Santander-style",
    displayCompany: "European Banking Group",
    partnerStatus: "partner_inspired",
    disclaimer: educationalDisclaimer,
    industry: "Banking / Digital Strategy",
    careerPath: "Digital Banking Strategy",
    role: "Digital Strategy Analyst",
    durationMinutes: 18,
    difficulty: "Beginner",
    description:
      "Test whether you enjoy digital banking strategy by reducing churn among young mobile banking users.",
    scenario:
      "A large European bank is losing young customers after account opening. Many students open accounts for promotions but stop using the app after the first month. The bank wants to increase engagement, retention, and primary-account usage.",
    userMission:
      "Diagnose churn drivers, prioritize mobile app improvements, choose success metrics, and recommend a retention strategy.",
    skillsTested: [
      "Customer analysis",
      "Digital strategy",
      "Product prioritization",
      "Metrics thinking",
      "Banking logic"
    ],
    recommendedFor: [
      "Students interested in banking",
      "Students interested in fintech",
      "Students who like customer and product problems"
    ],
    dataRoom: {
      title: "Young Customer Banking Data Room",
      documents: [
        {
          id: "customer_metrics",
          title: "Customer metrics",
          content:
            "40% of student accounts become inactive after 60 days. Only 22% of new student users set up recurring transfers or card payments. Users who create a budget goal are 3x more likely to remain active."
        },
        {
          id: "survey",
          title: "Student survey",
          content:
            "Students say the app is functional but not part of their daily life. They want spending visibility, easy transfers, rewards, and fewer confusing banking terms."
        },
        {
          id: "competitor",
          title: "Fintech competitor note",
          content:
            "Fintech competitors win on onboarding speed, spending insights, notifications, and social payments."
        }
      ]
    },
    tasks: [
      {
        id: "santander_task_churn",
        stepNumber: 1,
        title: "Diagnose churn",
        taskType: "single_select",
        prompt: "What is the most likely reason young users become inactive?",
        options: [
          {
            id: "no_habit",
            label: "They do not build a daily banking habit",
            isPreferred: true,
            rationale: "Low recurring activity suggests weak habit formation."
          },
          {
            id: "no_awareness",
            label: "They do not know the bank exists",
            rationale: "They already opened accounts, so awareness is not the core issue."
          },
          {
            id: "too_many_branches",
            label: "There are too many physical branches",
            rationale: "Not relevant to mobile app churn."
          },
          {
            id: "logo_color",
            label: "They dislike the logo color",
            rationale: "Unsupported by data."
          }
        ],
        expectedThinking: [
          "Identify retention, not acquisition, as the issue.",
          "Connect behavior to habit formation.",
          "Avoid awareness explanations when users already signed up."
        ],
        feedbackRubric: {
          strongAnswer:
            "Identifies weak habit formation and lack of daily value as the churn driver.",
          averageAnswer:
            "Identifies an app issue but does not connect it to recurring usage.",
          weakAnswer:
            "Focuses on unrelated brand or awareness issues."
        },
        skillWeights: {
          "Customer analysis": 0.35,
          "Digital strategy": 0.25,
          "Metrics thinking": 0.25,
          "Banking logic": 0.15
        }
      },
      {
        id: "santander_task_features",
        stepNumber: 2,
        title: "Prioritize features",
        taskType: "ranking",
        prompt: "Rank the top 3 features to improve young customer retention.",
        options: [
          {
            id: "budgeting_tool",
            label: "Simple budgeting and spending insights",
            isPreferred: true,
            rationale: "Directly creates recurring daily value."
          },
          {
            id: "faster_onboarding",
            label: "Faster onboarding and account setup",
            isPreferred: true,
            rationale: "Reduces early friction."
          },
          {
            id: "cashback_rewards",
            label: "Student cashback rewards",
            isPreferred: true,
            rationale: "Can increase card usage and engagement."
          },
          {
            id: "premium_card_design",
            label: "Premium card design",
            rationale: "May help perception but less likely to solve retention."
          },
          {
            id: "crypto_trading",
            label: "Crypto trading",
            rationale: "Potentially attractive but risky and not clearly linked to core banking retention."
          }
        ],
        expectedThinking: [
          "Prioritize features linked to habit, value, and early activation.",
          "Avoid shiny features with unclear retention impact.",
          "Think like a digital banking strategist."
        ],
        feedbackRubric: {
          strongAnswer:
            "Prioritizes budgeting, onboarding, and rewards as retention-oriented features.",
          averageAnswer:
            "Chooses some plausible features but includes shiny distractions.",
          weakAnswer:
            "Prioritizes brand or speculative features over retention drivers."
        },
        skillWeights: {
          "Product prioritization": 0.35,
          "Customer analysis": 0.25,
          "Digital strategy": 0.25,
          "Metrics thinking": 0.15
        }
      },
      {
        id: "santander_task_metrics",
        stepNumber: 3,
        title: "Choose success metrics",
        taskType: "multi_select",
        prompt: "Which 4 metrics should the bank track after launching improvements?",
        maxSelections: 4,
        options: [
          {
            id: "day_30_active",
            label: "30-day active users",
            isPreferred: true,
            rationale: "Tracks early retention."
          },
          {
            id: "recurring_payments",
            label: "Recurring payments or transfers set up",
            isPreferred: true,
            rationale: "Indicates primary-account behavior."
          },
          {
            id: "card_usage",
            label: "Monthly card transactions",
            isPreferred: true,
            rationale: "Shows real daily usage."
          },
          {
            id: "budget_tool_activation",
            label: "Budgeting tool activation",
            isPreferred: true,
            rationale: "Measures feature adoption tied to retention."
          },
          {
            id: "press_mentions",
            label: "Press mentions",
            rationale: "Brand awareness metric, not retention."
          }
        ],
        expectedThinking: [
          "Choose retention and engagement metrics.",
          "Measure behavior, not publicity.",
          "Connect metrics to strategic objective."
        ],
        feedbackRubric: {
          strongAnswer:
            "Chooses active usage, recurring behaviors, card usage, and feature activation.",
          averageAnswer:
            "Chooses some engagement metrics but includes awareness metrics.",
          weakAnswer:
            "Chooses metrics that do not reveal whether churn improved."
        },
        skillWeights: {
          "Metrics thinking": 0.4,
          "Digital strategy": 0.25,
          "Banking logic": 0.2,
          "Customer analysis": 0.15
        }
      },
      {
        id: "santander_task_recommendation",
        stepNumber: 4,
        title: "Recommend the retention strategy",
        taskType: "recommendation",
        prompt:
          "Write a short recommendation to reduce churn among young banking users.",
        expectedThinking: [
          "Focus on onboarding, daily value, and habit formation.",
          "Mention student-relevant features.",
          "Use measurable retention metrics."
        ],
        feedbackRubric: {
          strongAnswer:
            "Recommends a retention strategy built around faster onboarding, budgeting insights, rewards, and behavior metrics.",
          averageAnswer:
            "Gives useful ideas but lacks clear prioritization or metrics.",
          weakAnswer:
            "Focuses on broad marketing without solving usage and retention."
        },
        skillWeights: {
          "Strategic communication": 0.3,
          "Digital strategy": 0.3,
          "Customer analysis": 0.2,
          "Metrics thinking": 0.2
        }
      }
    ],
    scoring: {
      dimensions: [
        {
          id: "customer_retention",
          label: "Customer retention thinking",
          description: "Ability to diagnose why users stop using a service."
        },
        {
          id: "digital_product",
          label: "Digital product strategy",
          description: "Ability to prioritize app improvements around user behavior."
        },
        {
          id: "metrics",
          label: "Metrics thinking",
          description: "Ability to choose behavioral success metrics."
        }
      ],
      fitUpdateLogic:
        "Increase digital banking fit if the user focuses on retention, primary-account behavior, and customer value."
    },
    finalFeedbackTemplate: {
      strongPerformance:
        "You showed strong digital banking strategy fit because you diagnosed retention issues and prioritized practical engagement features.",
      mediumPerformance:
        "You showed potential for digital banking or fintech strategy, especially if you strengthen metrics thinking.",
      weakPerformance:
        "This simulation suggests digital banking strategy may require more practice in customer behavior and retention logic.",
      reflectionPrompt:
        "Did you enjoy solving a customer retention and mobile app strategy problem?",
      suggestedNextStep:
        "Try a fintech product case or speak with someone in digital banking or product strategy."
    }
  },
  {
    id: "mckinsey_market_entry",
    title: "McKinsey-style Market Entry Simulation",
    companyLabel: "McKinsey-style",
    displayCompany: "Global Strategy Consultancy",
    partnerStatus: "partner_inspired",
    disclaimer: educationalDisclaimer,
    industry: "Consulting",
    careerPath: "Strategy Consulting",
    role: "Junior Consultant",
    durationMinutes: 20,
    difficulty: "Beginner",
    description:
      "Test whether you enjoy consulting by structuring a market entry and performance problem.",
    scenario:
      "A premium coffee chain is losing student customers near university campuses despite rising demand for coffee. The CEO wants to understand the root cause and decide how to recover growth.",
    userMission:
      "Structure the problem, select the right data, diagnose the root cause, and recommend actions.",
    skillsTested: [
      "Problem structuring",
      "Hypothesis thinking",
      "Data selection",
      "Business judgment",
      "Recommendation clarity"
    ],
    recommendedFor: [
      "Students considering consulting",
      "Students who like ambiguous business problems",
      "Students who enjoy structured recommendations"
    ],
    dataRoom: {
      title: "Coffee Chain Performance Data Room",
      documents: [
        {
          id: "sales",
          title: "Sales trend",
          content:
            "Campus-area stores declined 12% year-over-year, while overall city coffee demand increased 7%. Decline is strongest during class break hours."
        },
        {
          id: "operations",
          title: "Operations note",
          content:
            "Average wait time during 10-minute class breaks is 9 minutes. Competitors near campus average 4 minutes."
        },
        {
          id: "pricing",
          title: "Pricing note",
          content:
            "The chain charges 15% more than campus competitors. Students mention price, but complaints focus more on waiting time."
        },
        {
          id: "survey",
          title: "Student survey",
          content:
            "Students like the coffee quality but say they cannot risk missing class. Many choose faster alternatives even when quality is lower."
        }
      ]
    },
    tasks: [
      {
        id: "mck_task_hypotheses",
        stepNumber: 1,
        title: "Structure possible causes",
        taskType: "multi_select",
        prompt: "Which 3 hypotheses would you test first?",
        maxSelections: 3,
        options: [
          {
            id: "service_speed",
            label: "Service is too slow during class breaks",
            isPreferred: true,
            rationale: "Strongly supported by wait-time and survey data."
          },
          {
            id: "price",
            label: "Prices are too high for students",
            isPreferred: true,
            rationale: "Relevant, although likely secondary to speed."
          },
          {
            id: "competitors",
            label: "Competitors offer faster alternatives",
            isPreferred: true,
            rationale: "Competitor speed creates substitution."
          },
          {
            id: "coffee_no_demand",
            label: "Students no longer drink coffee",
            rationale: "Contradicted by rising demand."
          },
          {
            id: "weather",
            label: "Weather changed",
            rationale: "No evidence in the case."
          }
        ],
        expectedThinking: [
          "Use a hypothesis tree.",
          "Prioritize hypotheses supported by evidence.",
          "Avoid explanations contradicted by the data."
        ],
        feedbackRubric: {
          strongAnswer:
            "Focuses on speed, price, and competitor convenience as the most testable hypotheses.",
          averageAnswer:
            "Identifies some relevant issues but includes unsupported explanations.",
          weakAnswer:
            "Misses service speed despite strong evidence."
        },
        skillWeights: {
          "Problem structuring": 0.35,
          "Hypothesis thinking": 0.3,
          "Business judgment": 0.2,
          "Data selection": 0.15
        }
      },
      {
        id: "mck_task_data",
        stepNumber: 2,
        title: "Choose data to investigate",
        taskType: "data_selection",
        prompt: "Which 4 data points would help diagnose the root cause fastest?",
        maxSelections: 4,
        options: [
          {
            id: "wait_time_by_hour",
            label: "Average wait time by hour",
            isPreferred: true,
            rationale: "Directly tests the speed hypothesis."
          },
          {
            id: "sales_by_hour",
            label: "Sales by hour and store",
            isPreferred: true,
            rationale: "Shows where and when demand is lost."
          },
          {
            id: "competitor_wait",
            label: "Competitor wait times",
            isPreferred: true,
            rationale: "Measures relative convenience."
          },
          {
            id: "student_price_sensitivity",
            label: "Student price sensitivity",
            isPreferred: true,
            rationale: "Tests whether price contributes to churn."
          },
          {
            id: "employee_favorite_drinks",
            label: "Employee favorite drinks",
            rationale: "Interesting but not diagnostic."
          }
        ],
        expectedThinking: [
          "Request data linked directly to hypotheses.",
          "Avoid collecting data for curiosity only.",
          "Think about speed, demand, and competition."
        ],
        feedbackRubric: {
          strongAnswer:
            "Selects data that tests wait time, sales timing, competitor convenience, and price sensitivity.",
          averageAnswer:
            "Selects some relevant data but misses competitor or hourly analysis.",
          weakAnswer:
            "Selects data that does not diagnose the problem."
        },
        skillWeights: {
          "Data selection": 0.35,
          "Business judgment": 0.25,
          "Hypothesis thinking": 0.25,
          "Problem structuring": 0.15
        }
      },
      {
        id: "mck_task_actions",
        stepNumber: 3,
        title: "Recommend actions",
        taskType: "recommendation",
        prompt:
          "Recommend 3 actions the coffee chain should test first. Explain why.",
        expectedThinking: [
          "Reduce wait time during breaks.",
          "Introduce preorder or express pickup.",
          "Create student bundles or off-peak offers.",
          "Measure sales recovery and wait time."
        ],
        feedbackRubric: {
          strongAnswer:
            "Recommends operational fixes and student-specific offers directly linked to the root cause.",
          averageAnswer:
            "Suggests plausible actions but lacks prioritization or testing logic.",
          weakAnswer:
            "Suggests broad branding or expansion without solving the immediate issue."
        },
        skillWeights: {
          "Recommendation clarity": 0.35,
          "Business judgment": 0.3,
          "Problem structuring": 0.2,
          "Hypothesis thinking": 0.15
        }
      }
    ],
    scoring: {
      dimensions: [
        {
          id: "structure",
          label: "Problem structuring",
          description: "Ability to break an ambiguous business problem into testable hypotheses."
        },
        {
          id: "data",
          label: "Data selection",
          description: "Ability to choose data that directly tests hypotheses."
        },
        {
          id: "recommendation",
          label: "Recommendation clarity",
          description: "Ability to translate analysis into action."
        }
      ],
      fitUpdateLogic:
        "Increase consulting fit if the user structures the problem clearly, chooses diagnostic data, and enjoys ambiguity."
    },
    finalFeedbackTemplate: {
      strongPerformance:
        "You showed strong consulting fit because you structured the problem, selected diagnostic data, and built a practical recommendation.",
      mediumPerformance:
        "You showed potential for consulting, but should practice prioritizing the highest-impact causes faster.",
      weakPerformance:
        "This simulation suggests consulting may require more practice in structuring ambiguity and linking data to action.",
      reflectionPrompt:
        "Did you enjoy turning a messy business problem into a structured recommendation?",
      suggestedNextStep:
        "Try one more market entry or profitability case and speak with a consulting intern."
    }
  },
  {
    id: "loreal_brand_launch",
    title: "L'Oréal-style Brand Launch Simulation",
    companyLabel: "L'Oréal-style",
    displayCompany: "Global Beauty Company",
    partnerStatus: "partner_inspired",
    disclaimer: educationalDisclaimer,
    industry: "Marketing / Consumer Goods",
    careerPath: "Brand Marketing",
    role: "Brand Marketing Analyst",
    durationMinutes: 18,
    difficulty: "Beginner",
    description:
      "Test whether you enjoy brand marketing by launching a skincare product for Gen Z students in Spain.",
    scenario:
      "A global beauty company wants to launch an affordable skincare product for Gen Z university students in Spain. The market is crowded, and students are skeptical of overhyped beauty claims.",
    userMission:
      "Define the target segment, select the positioning, choose the channel mix, and create a launch message.",
    skillsTested: [
      "Consumer insight",
      "Brand positioning",
      "Creative judgment",
      "Channel prioritization",
      "Marketing communication"
    ],
    recommendedFor: [
      "Students interested in marketing",
      "Students interested in beauty, luxury, or consumer brands",
      "Students who enjoy consumer psychology and storytelling"
    ],
    dataRoom: {
      title: "Gen Z Skincare Launch Data Room",
      documents: [
        {
          id: "consumer_insight",
          title: "Consumer insight",
          content:
            "Students want affordable, simple routines with credible ingredients. They distrust exaggerated claims and prefer brands that feel transparent and practical."
        },
        {
          id: "channel_note",
          title: "Channel note",
          content:
            "TikTok drives awareness, but peer recommendations and dermatologist-backed education increase trust. Campus sampling performs well when linked to routines."
        },
        {
          id: "competitor_note",
          title: "Competitor note",
          content:
            "Competitors emphasize either low price or clinical credibility. Few brands successfully combine affordability, science-backed claims, and student-specific routines."
        }
      ]
    },
    tasks: [
      {
        id: "loreal_task_segment",
        stepNumber: 1,
        title: "Choose the target segment",
        taskType: "single_select",
        prompt: "Which segment should the launch target first?",
        options: [
          {
            id: "busy_students",
            label: "Busy university students who want simple skincare routines",
            isPreferred: true,
            rationale: "Matches affordability, simplicity, and routine need."
          },
          {
            id: "anti_aging",
            label: "Older consumers seeking luxury anti-aging products",
            rationale: "Does not match the Gen Z student launch."
          },
          {
            id: "professional_makeup_artists",
            label: "Professional makeup artists",
            rationale: "Too narrow and not aligned with the student brief."
          },
          {
            id: "everyone",
            label: "Everyone who buys skincare",
            rationale: "Too broad to create a sharp positioning."
          }
        ],
        expectedThinking: [
          "Avoid targeting everyone.",
          "Match segment to product promise.",
          "Prioritize a clear use case."
        ],
        feedbackRubric: {
          strongAnswer:
            "Chooses busy university students seeking simple, credible routines.",
          averageAnswer:
            "Chooses a plausible youth segment but lacks a clear use case.",
          weakAnswer:
            "Chooses a broad or unrelated target."
        },
        skillWeights: {
          "Consumer insight": 0.35,
          "Brand positioning": 0.25,
          "Channel prioritization": 0.15,
          "Marketing communication": 0.25
        }
      },
      {
        id: "loreal_task_positioning",
        stepNumber: 2,
        title: "Select the positioning",
        taskType: "single_select",
        prompt: "Which positioning is strongest for this product?",
        options: [
          {
            id: "science_student",
            label: "Affordable science-backed skincare for student routines",
            isPreferred: true,
            rationale: "Combines credibility, affordability, and target-specific use."
          },
          {
            id: "luxury_anti_aging",
            label: "Luxury anti-aging skincare for mature skin",
            rationale: "Wrong target and wrong price positioning."
          },
          {
            id: "celebrity_hype",
            label: "Celebrity-led viral skincare",
            rationale: "Could drive awareness but may increase skepticism."
          },
          {
            id: "medical_only",
            label: "Prescription-level medical skincare",
            rationale: "May overclaim and not match consumer context."
          }
        ],
        expectedThinking: [
          "Match positioning to insight.",
          "Avoid overclaiming.",
          "Balance credibility and accessibility."
        ],
        feedbackRubric: {
          strongAnswer:
            "Chooses a positioning that combines affordability, science, and student relevance.",
          averageAnswer:
            "Chooses a catchy positioning but does not address trust or affordability.",
          weakAnswer:
            "Chooses a positioning for the wrong target."
        },
        skillWeights: {
          "Brand positioning": 0.4,
          "Consumer insight": 0.25,
          "Creative judgment": 0.2,
          "Marketing communication": 0.15
        }
      },
      {
        id: "loreal_task_channels",
        stepNumber: 3,
        title: "Choose the launch channels",
        taskType: "multi_select",
        prompt: "Choose 3 launch channels that best match the strategy.",
        maxSelections: 3,
        options: [
          {
            id: "tiktok_education",
            label: "TikTok educational content",
            isPreferred: true,
            rationale: "High reach with educational trust angle."
          },
          {
            id: "campus_sampling",
            label: "Campus sampling and routine cards",
            isPreferred: true,
            rationale: "Creates trial in the target context."
          },
          {
            id: "derm_creator",
            label: "Dermatologist or science-led creator partnerships",
            isPreferred: true,
            rationale: "Builds credibility and reduces skepticism."
          },
          {
            id: "tv_ads",
            label: "Prime-time TV ads",
            rationale: "Expensive and less student-targeted."
          },
          {
            id: "luxury_gala",
            label: "Luxury gala launch event",
            rationale: "Wrong positioning and inefficient for student segment."
          }
        ],
        expectedThinking: [
          "Choose channels that create awareness, trust, and trial.",
          "Avoid expensive broad channels for a focused student launch.",
          "Connect channels to target behavior."
        ],
        feedbackRubric: {
          strongAnswer:
            "Chooses TikTok education, campus sampling, and credible creators.",
          averageAnswer:
            "Chooses some relevant channels but lacks trust or trial logic.",
          weakAnswer:
            "Chooses broad prestige channels that do not fit the student market."
        },
        skillWeights: {
          "Channel prioritization": 0.35,
          "Consumer insight": 0.25,
          "Creative judgment": 0.2,
          "Marketing communication": 0.2
        }
      },
      {
        id: "loreal_task_message",
        stepNumber: 4,
        title: "Create the launch message",
        taskType: "short_answer",
        prompt:
          "Write one launch message for the product in one sentence.",
        expectedThinking: [
          "Make it simple.",
          "Avoid exaggerated claims.",
          "Mention routine, credibility, or affordability.",
          "Fit the student audience."
        ],
        feedbackRubric: {
          strongAnswer:
            "Creates a clear, credible message focused on simple student routines and science-backed affordability.",
          averageAnswer:
            "Creates a catchy message but lacks credibility or target specificity.",
          weakAnswer:
            "Creates a vague or exaggerated message."
        },
        skillWeights: {
          "Marketing communication": 0.4,
          "Creative judgment": 0.3,
          "Brand positioning": 0.2,
          "Consumer insight": 0.1
        }
      }
    ],
    scoring: {
      dimensions: [
        {
          id: "consumer",
          label: "Consumer insight",
          description: "Ability to understand target customer needs and skepticism."
        },
        {
          id: "positioning",
          label: "Brand positioning",
          description: "Ability to create a focused and credible market position."
        },
        {
          id: "channels",
          label: "Channel strategy",
          description: "Ability to select channels that match the audience and objective."
        }
      ],
      fitUpdateLogic:
        "Increase marketing fit if the user shows consumer insight, credible positioning, and enjoyment of messaging work."
    },
    finalFeedbackTemplate: {
      strongPerformance:
        "You showed strong brand marketing fit because you understood the consumer, built credible positioning, and chose channels linked to trust and trial.",
      mediumPerformance:
        "You showed potential in brand marketing, but should strengthen positioning discipline and channel logic.",
      weakPerformance:
        "This simulation suggests brand marketing may require more practice in consumer insight and message clarity.",
      reflectionPrompt:
        "Did you enjoy turning consumer insight into a brand launch strategy?",
      suggestedNextStep:
        "Try another consumer-brand case or analyze a recent Gen Z product launch."
    }
  },
  {
    id: "blackrock_portfolio_allocation",
    title: "BlackRock-style Portfolio Allocation Simulation",
    companyLabel: "BlackRock-style",
    displayCompany: "Global Asset Manager",
    partnerStatus: "partner_inspired",
    disclaimer: educationalDisclaimer,
    industry: "Asset Management",
    careerPath: "Asset Management / Investment Strategy",
    role: "Investment Strategy Analyst",
    durationMinutes: 20,
    difficulty: "Intermediate",
    description:
      "Test whether you enjoy asset management by allocating a student-focused investment portfolio under changing market conditions.",
    scenario:
      "A client wants to invest for a 7-year horizon with moderate risk tolerance. Inflation is falling, interest rates may decline, equity markets are expensive, and the client wants exposure to technology without taking excessive concentration risk.",
    userMission:
      "Assess the macro context, choose asset allocation, identify risks, and explain the portfolio recommendation.",
    skillsTested: [
      "Market reasoning",
      "Risk management",
      "Portfolio thinking",
      "Client communication",
      "Quantitative judgment"
    ],
    recommendedFor: [
      "Students interested in investment management",
      "Students who like markets and macroeconomics",
      "Students considering finance but not necessarily banking"
    ],
    dataRoom: {
      title: "Portfolio Allocation Data Room",
      documents: [
        {
          id: "macro",
          title: "Macro view",
          content:
            "Inflation has moderated but remains above target. Central banks may cut rates within the next year if growth slows. Bond yields are attractive compared with recent years."
        },
        {
          id: "equities",
          title: "Equity market note",
          content:
            "Equity indices have performed strongly, led by large technology companies. Valuations are above historical averages in some segments."
        },
        {
          id: "client",
          title: "Client profile",
          content:
            "Investment horizon: 7 years. Risk tolerance: moderate. Goal: long-term growth with controlled downside. Preference: some technology exposure but no speculative concentration."
        }
      ]
    },
    tasks: [
      {
        id: "blk_task_allocation",
        stepNumber: 1,
        title: "Choose an asset allocation",
        taskType: "single_select",
        prompt: "Which portfolio allocation best fits the client?",
        options: [
          {
            id: "balanced",
            label: "60% global equities, 30% bonds, 10% alternatives/cash",
            isPreferred: true,
            rationale:
              "Balanced growth exposure with downside control and diversification."
          },
          {
            id: "all_tech",
            label: "100% technology equities",
            rationale:
              "Too concentrated for a moderate-risk client."
          },
          {
            id: "all_cash",
            label: "100% cash",
            rationale:
              "Too conservative for a 7-year growth objective."
          },
          {
            id: "crypto_heavy",
            label: "50% crypto, 50% technology equities",
            rationale:
              "Too speculative and concentrated for the client profile."
          }
        ],
        expectedThinking: [
          "Match allocation to horizon and risk tolerance.",
          "Diversify growth exposure.",
          "Avoid concentration risk."
        ],
        feedbackRubric: {
          strongAnswer:
            "Chooses a diversified allocation matching moderate risk and long-term growth.",
          averageAnswer:
            "Chooses some growth exposure but with excessive or insufficient risk.",
          weakAnswer:
            "Ignores client risk tolerance or time horizon."
        },
        skillWeights: {
          "Portfolio thinking": 0.35,
          "Risk management": 0.3,
          "Market reasoning": 0.2,
          "Client communication": 0.15
        }
      },
      {
        id: "blk_task_risks",
        stepNumber: 2,
        title: "Identify key risks",
        taskType: "multi_select",
        prompt: "Which 3 risks should be highlighted to the client?",
        maxSelections: 3,
        options: [
          {
            id: "equity_valuation",
            label: "Equity valuation risk",
            isPreferred: true,
            rationale: "Markets are expensive in some segments."
          },
          {
            id: "rate_uncertainty",
            label: "Interest rate uncertainty",
            isPreferred: true,
            rationale: "Rate path affects bonds and equities."
          },
          {
            id: "tech_concentration",
            label: "Technology concentration risk",
            isPreferred: true,
            rationale: "Client wants tech exposure but not excessive concentration."
          },
          {
            id: "office_location",
            label: "Asset manager office location",
            rationale: "Not relevant to portfolio risk."
          }
        ],
        expectedThinking: [
          "Highlight market risks linked to the allocation.",
          "Match risk explanation to client preferences.",
          "Avoid irrelevant operational details."
        ],
        feedbackRubric: {
          strongAnswer:
            "Identifies equity valuation, rate uncertainty, and technology concentration as key risks.",
          averageAnswer:
            "Identifies some risks but misses concentration or rates.",
          weakAnswer:
            "Identifies risks unrelated to the portfolio."
        },
        skillWeights: {
          "Risk management": 0.4,
          "Market reasoning": 0.25,
          "Portfolio thinking": 0.2,
          "Client communication": 0.15
        }
      },
      {
        id: "blk_task_client_explanation",
        stepNumber: 3,
        title: "Explain the recommendation",
        taskType: "recommendation",
        prompt:
          "Write a short client-friendly explanation of your portfolio recommendation.",
        expectedThinking: [
          "Avoid jargon.",
          "Explain risk-return trade-off.",
          "Mention diversification.",
          "Connect to client goals."
        ],
        feedbackRubric: {
          strongAnswer:
            "Explains allocation clearly in terms of growth, diversification, downside control, and client goals.",
          averageAnswer:
            "Explains the portfolio but uses jargon or lacks client framing.",
          weakAnswer:
            "Gives a technical answer without connecting to the client's objective."
        },
        skillWeights: {
          "Client communication": 0.4,
          "Portfolio thinking": 0.25,
          "Risk management": 0.2,
          "Market reasoning": 0.15
        }
      }
    ],
    scoring: {
      dimensions: [
        {
          id: "allocation",
          label: "Portfolio allocation",
          description: "Ability to match assets to risk tolerance and horizon."
        },
        {
          id: "risk",
          label: "Risk management",
          description: "Ability to identify and communicate investment risks."
        },
        {
          id: "client",
          label: "Client communication",
          description: "Ability to explain finance clearly to a client."
        }
      ],
      fitUpdateLogic:
        "Increase asset management fit if the user balances risk and return, avoids concentration, and enjoys market reasoning."
    },
    finalFeedbackTemplate: {
      strongPerformance:
        "You showed strong asset management fit because you balanced growth, risk, diversification, and client communication.",
      mediumPerformance:
        "You showed potential in investment strategy, but should practice market reasoning and portfolio trade-offs.",
      weakPerformance:
        "This simulation suggests asset management may require more practice in risk-return thinking.",
      reflectionPrompt:
        "Did you enjoy thinking about markets, risk, and long-term allocation decisions?",
      suggestedNextStep:
        "Try a beginner portfolio construction exercise and follow weekly market commentary."
    }
  },
  {
    id: "amazon_operations",
    title: "Amazon-style Operations Simulation",
    companyLabel: "Amazon-style",
    displayCompany: "Global E-commerce Company",
    partnerStatus: "partner_inspired",
    disclaimer: educationalDisclaimer,
    industry: "Operations / E-commerce",
    careerPath: "Operations Strategy",
    role: "Operations Analyst",
    durationMinutes: 18,
    difficulty: "Beginner",
    description:
      "Test whether you enjoy operations by reducing delivery delays in a high-volume e-commerce network.",
    scenario:
      "A global e-commerce company is facing late deliveries in one urban region. Order volume is growing, but customer satisfaction is declining because delivery promises are not consistently met.",
    userMission:
      "Diagnose bottlenecks, choose operational data, prioritize fixes, and recommend an execution plan.",
    skillsTested: [
      "Process thinking",
      "Operations analysis",
      "Prioritization",
      "Data selection",
      "Execution planning"
    ],
    recommendedFor: [
      "Students interested in operations",
      "Students who like systems and process improvement",
      "Students considering supply chain or logistics"
    ],
    dataRoom: {
      title: "Delivery Performance Data Room",
      documents: [
        {
          id: "delivery_metrics",
          title: "Delivery metrics",
          content:
            "Late delivery rate increased from 6% to 14% over two months. Delays are concentrated in two neighborhoods and during evening delivery windows."
        },
        {
          id: "warehouse_note",
          title: "Warehouse note",
          content:
            "Warehouse picking time is stable. Packing time increased slightly but not enough to explain most delays."
        },
        {
          id: "driver_note",
          title: "Driver note",
          content:
            "Drivers report route congestion, parking difficulty, and unrealistic route density during peak hours."
        },
        {
          id: "customer_note",
          title: "Customer feedback",
          content:
            "Customers complain mostly about inaccurate delivery windows and lack of updates."
        }
      ]
    },
    tasks: [
      {
        id: "amazon_task_bottleneck",
        stepNumber: 1,
        title: "Identify the bottleneck",
        taskType: "single_select",
        prompt: "Where is the most likely bottleneck?",
        options: [
          {
            id: "last_mile",
            label: "Last-mile delivery routing",
            isPreferred: true,
            rationale:
              "Delays are concentrated by location and time window, with driver feedback pointing to route issues."
          },
          {
            id: "warehouse_picking",
            label: "Warehouse picking",
            rationale: "Picking time is stable."
          },
          {
            id: "customer_payment",
            label: "Customer payment processing",
            rationale: "No evidence of payment bottlenecks."
          },
          {
            id: "website_design",
            label: "Website design",
            rationale: "Not linked to late deliveries."
          }
        ],
        expectedThinking: [
          "Localize the bottleneck.",
          "Use operational evidence.",
          "Avoid blaming upstream processes if data does not support it."
        ],
        feedbackRubric: {
          strongAnswer:
            "Identifies last-mile routing as the likely bottleneck using location, time, and driver evidence.",
          averageAnswer:
            "Identifies delivery operations broadly but not the specific bottleneck.",
          weakAnswer:
            "Chooses a bottleneck unsupported by data."
        },
        skillWeights: {
          "Operations analysis": 0.35,
          "Process thinking": 0.3,
          "Data selection": 0.2,
          "Prioritization": 0.15
        }
      },
      {
        id: "amazon_task_data",
        stepNumber: 2,
        title: "Choose operational data",
        taskType: "multi_select",
        prompt: "Which 4 data points should you inspect next?",
        maxSelections: 4,
        options: [
          {
            id: "route_density",
            label: "Packages per route by time window",
            isPreferred: true,
            rationale: "Tests route overload."
          },
          {
            id: "traffic_by_zone",
            label: "Traffic and parking delays by zone",
            isPreferred: true,
            rationale: "Tests location-specific delay causes."
          },
          {
            id: "driver_capacity",
            label: "Driver capacity by shift",
            isPreferred: true,
            rationale: "Shows whether staffing matches demand."
          },
          {
            id: "promise_accuracy",
            label: "Promised vs actual delivery window",
            isPreferred: true,
            rationale: "Measures customer promise reliability."
          },
          {
            id: "brand_awareness",
            label: "Brand awareness",
            rationale: "Not related to operational delay."
          }
        ],
        expectedThinking: [
          "Choose data that diagnoses capacity, routing, and promise accuracy.",
          "Connect data to operational action.",
          "Avoid marketing metrics."
        ],
        feedbackRubric: {
          strongAnswer:
            "Chooses route density, traffic/parking, driver capacity, and delivery promise accuracy.",
          averageAnswer:
            "Chooses some operational data but misses promise accuracy or capacity.",
          weakAnswer:
            "Chooses non-operational data."
        },
        skillWeights: {
          "Data selection": 0.35,
          "Operations analysis": 0.3,
          "Execution planning": 0.2,
          "Prioritization": 0.15
        }
      },
      {
        id: "amazon_task_plan",
        stepNumber: 3,
        title: "Recommend an execution plan",
        taskType: "recommendation",
        prompt:
          "Recommend three actions to reduce late deliveries in the region.",
        expectedThinking: [
          "Rebalance route density.",
          "Adjust delivery windows in difficult zones.",
          "Add peak-hour capacity.",
          "Improve customer notifications.",
          "Measure late delivery rate and promise accuracy."
        ],
        feedbackRubric: {
          strongAnswer:
            "Recommends route rebalancing, peak capacity adjustment, realistic delivery windows, and better customer updates.",
          averageAnswer:
            "Provides plausible fixes but lacks prioritization or metrics.",
          weakAnswer:
            "Suggests broad improvements without addressing the bottleneck."
        },
        skillWeights: {
          "Execution planning": 0.35,
          "Operations analysis": 0.25,
          "Prioritization": 0.25,
          "Process thinking": 0.15
        }
      }
    ],
    scoring: {
      dimensions: [
        {
          id: "process",
          label: "Process thinking",
          description: "Ability to understand how work flows through a system."
        },
        {
          id: "operations",
          label: "Operations analysis",
          description: "Ability to find bottlenecks using operational evidence."
        },
        {
          id: "execution",
          label: "Execution planning",
          description: "Ability to translate diagnosis into practical fixes."
        }
      ],
      fitUpdateLogic:
        "Increase operations fit if the user enjoys diagnosing process bottlenecks and creating practical execution plans."
    },
    finalFeedbackTemplate: {
      strongPerformance:
        "You showed strong operations strategy fit because you diagnosed the bottleneck and proposed practical execution fixes.",
      mediumPerformance:
        "You showed potential for operations, but should practice using process data to prioritize actions.",
      weakPerformance:
        "This simulation suggests operations may require more practice in systems thinking and bottleneck diagnosis.",
      reflectionPrompt:
        "Did you enjoy solving a process and execution problem?",
      suggestedNextStep:
        "Try a supply chain case or map the process behind a service you use every day."
    }
  }
];

export default simulations;
