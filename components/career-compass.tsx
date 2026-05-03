"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { animate, motion, useInView, type Variants } from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Brain,
  BriefcaseBusiness,
  Building2,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  ClipboardCheck,
  Clock3,
  Compass,
  Database,
  FileText,
  Filter,
  Fingerprint,
  Flag,
  GraduationCap,
  Home,
  Lightbulb,
  LockKeyhole,
  Mail,
  Map,
  Network,
  PieChart as PieChartIcon,
  PlayCircle,
  RefreshCcw,
  Rocket,
  Route,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { allQuestions, type Question } from "@/data/questions";
import { simulations, type Simulation } from "@/data/simulations";
import { careerPaths } from "@/data/careers";
import {
  getCareerById,
  getCareerDiscoveryQuestions,
  isQuestionAnswered,
  scoreAssessment,
  type AssessmentAnswers,
  type AssessmentAnswerValue,
  type CareerMatch,
  type CareerProfile,
  type TraitScore,
} from "@/lib/scoring";
import {
  loadAssessmentAnswers,
  loadCareerProfile,
  loadRoadmapProgress,
  resetCareerCompassStorage,
  saveAssessmentAnswers,
  saveCareerProfile,
  saveRoadmapProgress,
} from "@/lib/storage";
import { cn } from "@/lib/utils";

type DemoPage =
  | "landing"
  | "home"
  | "discovery"
  | "results"
  | "map"
  | "simulations"
  | "simulation-detail"
  | "runner"
  | "feedback"
  | "roadmap"
  | "pricing"
  | "waitlist";

type BrandMeta = {
  brand: string;
  logo: string;
  accent: string;
  soft: string;
};

const brandMeta: Record<string, BrandMeta> = {
  apple_product_strategy: {
    brand: "Apple",
    logo: "/brand/apple.png",
    accent: "#111827",
    soft: "#f4f4f5",
  },
  microsoft_ai_adoption: {
    brand: "Microsoft",
    logo: "/brand/microsoft.jpg",
    accent: "#2563eb",
    soft: "#eaf4ff",
  },
  goldman_mna: {
    brand: "Goldman Sachs",
    logo: "/brand/goldman.png",
    accent: "#6f9dcc",
    soft: "#eaf3fb",
  },
  santander_digital_banking: {
    brand: "Santander",
    logo: "/brand/santander.svg",
    accent: "#e01f26",
    soft: "#fff0f0",
  },
  mckinsey_market_entry: {
    brand: "McKinsey & Company",
    logo: "/brand/mckinsey.png",
    accent: "#0b2536",
    soft: "#edf6fb",
  },
  loreal_brand_launch: {
    brand: "L'Oreal",
    logo: "/brand/loreal.png",
    accent: "#111111",
    soft: "#f7f2ec",
  },
  blackrock_portfolio_allocation: {
    brand: "BlackRock",
    logo: "/brand/blackrock.jpg",
    accent: "#171717",
    soft: "#f4f4f5",
  },
  amazon_operations: {
    brand: "Amazon",
    logo: "/brand/amazon.png",
    accent: "#f59e0b",
    soft: "#fff7ed",
  },
};

const fallbackMeta: BrandMeta = {
  brand: "Partner Case",
  logo: "/brand/career-compass-logo.png",
  accent: "#0f766e",
  soft: "#ecfeff",
};

const productPalette = {
  navy: "#071827",
  blue: "#2563eb",
  teal: "#0f9f9a",
  green: "#16a34a",
  amber: "#f59e0b",
  coral: "#f9736b",
  violet: "#7c3aed",
  slate: "#475569",
};

const fadeUp: Variants = {
  hidden: { opacity: 1, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

const slideInLeft: Variants = {
  hidden: { opacity: 1, x: -24 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const slideInRight: Variants = {
  hidden: { opacity: 1, x: 24 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 1, scale: 0.985 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.03,
    },
  },
};

const cardHover = {
  y: -6,
  scale: 1.01,
  transition: { duration: 0.18, ease: "easeOut" as const },
};

const careerIconMap: Record<string, LucideIcon> = {
  product: Brain,
  consulting: Network,
  venture: Rocket,
  finance: BarChart3,
  data: Database,
  growth: Sparkles,
  operations: ClipboardCheck,
  fintech: ShieldCheck,
};

const appNavItems: { id: DemoPage; label: string; icon: LucideIcon }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "discovery", label: "Career Discovery", icon: Compass },
  { id: "map", label: "Career Map", icon: Map },
  { id: "simulations", label: "Simulations", icon: BriefcaseBusiness },
  { id: "roadmap", label: "Roadmap", icon: Route },
  { id: "results", label: "Profile / Results", icon: Fingerprint },
];

const trustCards = [
  {
    title: "Explainable recommendations",
    text: "Every recommendation is tied to answers, traits, and simulation evidence.",
    icon: BadgeCheck,
  },
  {
    title: "AI supports, you decide",
    text: "Career Compass guides structured reflection without pretending to choose for you.",
    icon: Brain,
  },
  {
    title: "Real work before commitment",
    text: "Company-style simulations reveal what the job actually feels like.",
    icon: GraduationCap,
  },
  {
    title: "Private by default",
    text: "Assessment answers and reports stay local in this prototype unless the user shares them.",
    icon: LockKeyhole,
  },
];

const routeSteps = [
  {
    title: "Assessment completed",
    text: "Answers from the provided question bank are converted into trait evidence.",
    icon: ClipboardCheck,
  },
  {
    title: "Profile generated",
    text: "Career Compass identifies strengths, weak signals, and dominant profile type.",
    icon: Fingerprint,
  },
  {
    title: "Best-fit path identified",
    text: "Specific paths are ranked by weighted trait fit, not generic labels.",
    icon: Target,
  },
  {
    title: "Skill gaps identified",
    text: "The map highlights blockers and the first gaps to fix.",
    icon: Wrench,
  },
  {
    title: "Simulations recommended",
    text: "Company cases are matched to the recommended path.",
    icon: PlayCircle,
  },
  {
    title: "Roadmap built",
    text: "30-day, 90-day, and 12-month actions translate insight into motion.",
    icon: Flag,
  },
];

function getMeta(simulation: Simulation) {
  return brandMeta[simulation.id] ?? fallbackMeta;
}

function statusLabel(status: Simulation["partnerStatus"]) {
  if (status === "partner_provided") return "Partner provided";
  if (status === "expert_reviewed") return "Expert reviewed";
  return "Partner-inspired";
}

function useAnimatedNumber(target: number, active = true) {
  const [value, setValue] = useState(target);

  useEffect(() => {
    if (!active) return;
    const controls = animate(0, target, {
      duration: 1,
      ease: "easeOut",
      onUpdate: (latest) => setValue(Math.round(latest)),
    });
    return () => controls.stop();
  }, [active, target]);

  return value;
}

function CountUp({
  value,
  suffix = "",
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const number = useAnimatedNumber(value, inView);

  return (
    <span ref={ref} className={className}>
      {number}
      {suffix}
    </span>
  );
}

function ProgressBar({
  value,
  color = productPalette.blue,
  className,
}: {
  value: number;
  color?: string;
  className?: string;
}) {
  return (
    <div className={cn("h-2 overflow-hidden rounded-full bg-slate-100", className)}>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}

function CareerCompassMark({ compact = false }: { compact?: boolean }) {
  return (
    <button
      type="button"
      className="flex items-center gap-3 rounded-lg text-left"
      aria-label="Career Compass home"
    >
      <span className="relative flex size-11 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-white">
        <Image
          src="/brand/career-compass-logo.png"
          alt=""
          width={44}
          height={44}
          className="h-full w-full object-cover"
          priority
        />
      </span>
      {!compact ? (
        <span>
          <span className="block text-[15px] font-semibold text-slate-950">Career Compass</span>
          <span className="block text-xs text-slate-500">Evidence-based career navigation</span>
        </span>
      ) : null}
    </button>
  );
}

function PrimaryButton({
  children,
  onClick,
  variant = "dark",
  icon: Icon = ArrowRight,
  className,
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "dark" | "light" | "outline" | "teal";
  icon?: LucideIcon;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : { y: -2, scale: 1.01 }}
      whileTap={disabled ? undefined : { scale: 0.99 }}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-colors disabled:pointer-events-none disabled:opacity-45",
        variant === "dark" &&
          "bg-slate-950 text-white shadow-[0_18px_42px_rgba(7,24,39,0.18)] hover:bg-slate-800",
        variant === "teal" &&
          "bg-teal-700 text-white shadow-[0_18px_42px_rgba(15,159,154,0.18)] hover:bg-teal-800",
        variant === "light" &&
          "border border-slate-200 bg-white text-slate-950 shadow-[0_10px_30px_rgba(15,23,42,0.08)] hover:border-slate-300",
        variant === "outline" &&
          "border border-slate-300 bg-transparent text-slate-950 hover:bg-white",
        className,
      )}
    >
      <span>{children}</span>
      <Icon className="size-4" />
    </motion.button>
  );
}

function PageTitle({
  label,
  title,
  text,
}: {
  label: string;
  title: string;
  text?: string;
}) {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="show" className="mb-8">
      <motion.p variants={fadeUp} className="text-sm font-semibold text-teal-700">
        {label}
      </motion.p>
      <motion.h1 variants={fadeUp} className="mt-2 text-4xl font-semibold text-slate-950 xl:text-5xl">
        {title}
      </motion.h1>
      {text ? (
        <motion.p variants={fadeUp} className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
          {text}
        </motion.p>
      ) : null}
    </motion.div>
  );
}

function SectionHeader({
  label,
  title,
  text,
  align = "left",
}: {
  label: string;
  title: string;
  text?: string;
  align?: "left" | "center";
}) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.28 }}
      className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}
    >
      <motion.p variants={fadeUp} className="text-sm font-semibold text-teal-700">
        {label}
      </motion.p>
      <motion.h2
        variants={fadeUp}
        className="mt-3 text-4xl font-semibold leading-[1.08] text-slate-950 md:text-5xl"
      >
        {title}
      </motion.h2>
      {text ? (
        <motion.p variants={fadeUp} className="mt-4 text-lg leading-8 text-slate-600">
          {text}
        </motion.p>
      ) : null}
    </motion.div>
  );
}

function getRecommendedSimulations(profile: CareerProfile | null, limit = 5) {
  const ids = profile?.recommendedSimulationIds ?? [];
  const recommended = ids
    .map((id) => simulations.find((simulation) => simulation.id === id))
    .filter(Boolean) as Simulation[];
  const remaining = simulations.filter((simulation) => !ids.includes(simulation.id));
  return [...recommended, ...remaining].slice(0, limit);
}

function getSimulationsForMatch(match: CareerMatch) {
  return match.simulationIds
    .map((id) => simulations.find((simulation) => simulation.id === id))
    .filter(Boolean) as Simulation[];
}

function EmptyState({
  title,
  text,
  onStart,
  icon: Icon = Compass,
}: {
  title: string;
  text: string;
  onStart: () => void;
  icon?: LucideIcon;
}) {
  return (
    <motion.section
      initial={{ opacity: 1, y: 18, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-lg border border-slate-200 bg-white p-10 shadow-[0_24px_80px_rgba(15,23,42,0.08)]"
    >
      <div className="grid gap-8 xl:grid-cols-[0.75fr_1.25fr] xl:items-center">
        <div>
          <span className="flex size-16 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
            <Icon className="size-8" />
          </span>
          <h2 className="mt-6 max-w-xl text-4xl font-semibold leading-tight text-slate-950">
            {title}
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">{text}</p>
          <PrimaryButton onClick={onStart} className="mt-8" icon={Compass}>
            Start Career Discovery
          </PrimaryButton>
        </div>
        <div className="rounded-lg border border-slate-200 bg-[#f8fafc] p-5">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Profile", "locked until assessment", Fingerprint],
              ["Career Map", "needs answer evidence", Map],
              ["Roadmap", "built from top path", Route],
            ].map(([label, copy, IconItem]) => {
              const TypedIcon = IconItem as LucideIcon;
              return (
                <div key={label as string} className="rounded-lg border border-slate-200 bg-white p-5">
                  <TypedIcon className="size-6 text-slate-400" />
                  <p className="mt-5 font-semibold text-slate-950">{label as string}</p>
                  <p className="mt-2 text-sm text-slate-500">{copy as string}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function LandingPage({
  onStart,
  onOpenSimulation,
}: {
  onStart: () => void;
  onOpenSimulation: (simulation: Simulation) => void;
}) {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f6f8fb] text-slate-950">
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-slate-200/70 bg-white/82 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-[1240px] items-center justify-between px-6">
          <div onClick={onStart} className="cursor-pointer">
            <CareerCompassMark />
          </div>
          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 lg:flex">
            <a href="#problem" className="hover:text-slate-950">
              Problem
            </a>
            <a href="#solution" className="hover:text-slate-950">
              System
            </a>
            <a href="#company-simulations" className="hover:text-slate-950">
              Simulations
            </a>
            <a href="#career-map-preview" className="hover:text-slate-950">
              Career Map
            </a>
          </nav>
          <PrimaryButton onClick={onStart} icon={Compass}>
            Start Career Discovery
          </PrimaryButton>
        </div>
      </header>

      <section className="relative mx-auto grid min-h-screen max-w-[1320px] grid-cols-1 items-center gap-12 px-6 pb-16 pt-32 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div variants={staggerContainer} initial="hidden" animate="show" className="max-w-2xl">
          <motion.div
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 rounded-lg border border-teal-200 bg-white px-3 py-2 text-sm font-medium text-teal-800 shadow-sm"
          >
            <Sparkles className="size-4" />
            Evidence-based career navigation for students
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="text-6xl font-semibold leading-[0.97] text-slate-950 md:text-7xl"
          >
            Don&apos;t just choose a career. Test it.
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-7 text-xl leading-9 text-slate-600">
            Career Compass helps students answer structured discovery questions, generate a career
            profile, test real job tasks, and build a roadmap based on evidence.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <PrimaryButton onClick={onStart} icon={ArrowRight}>
              Start my Career Discovery
            </PrimaryButton>
            <PrimaryButton
              onClick={() =>
                document.getElementById("company-simulations")?.scrollIntoView({ behavior: "smooth" })
              }
              variant="light"
              icon={BriefcaseBusiness}
            >
              Explore simulations
            </PrimaryButton>
          </motion.div>
          <motion.div variants={fadeUp} className="mt-10 grid max-w-xl grid-cols-3 gap-3">
            <MiniMetric icon={Fingerprint} label="Profile" value="28 traits" />
            <MiniMetric icon={Target} label="Path ranking" value="Specific" />
            <MiniMetric icon={Route} label="Roadmap" value="12 months" />
          </motion.div>
        </motion.div>

        <motion.div variants={slideInRight} initial="hidden" animate="show" className="relative">
          <DashboardPreview onOpenSimulation={onOpenSimulation} />
        </motion.div>
      </section>

      <ProblemSection />
      <SolutionSection />
      <CompanySimulationsSection simulations={simulations} onOpenSimulation={onOpenSimulation} />
      <CareerMapPreviewSection />
      <TrustSection />

      <section className="mx-auto max-w-[1240px] px-6 py-28">
        <motion.div
          initial={{ opacity: 1, y: 24, scale: 0.99 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden rounded-lg border border-slate-200 bg-slate-950 p-12 text-center text-white shadow-[0_24px_90px_rgba(7,24,39,0.24)]"
        >
          <p className="text-sm font-semibold text-teal-300">Career Compass</p>
          <h2 className="mx-auto mt-4 max-w-4xl text-5xl font-semibold leading-[1.06]">
            Find your best-fit career path through evidence-based testing.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Answer the assessment, unlock your profile, click a matched simulation, and turn your
            result into a 30-day, 90-day, and 12-month plan.
          </p>
          <div className="mt-9 flex justify-center">
            <PrimaryButton onClick={onStart} variant="light" icon={Compass}>
              Start Career Discovery
            </PrimaryButton>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

function MiniMetric({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={cardHover}
      className="rounded-lg border border-slate-200 bg-white p-4 shadow-[0_12px_34px_rgba(15,23,42,0.06)]"
    >
      <div className="flex items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-lg bg-slate-950 text-white">
          <Icon className="size-4" />
        </span>
        <div>
          <p className="text-xs text-slate-500">{label}</p>
          <p className="text-lg font-semibold text-slate-950">{value}</p>
        </div>
      </div>
    </motion.div>
  );
}

function DashboardPreview({ onOpenSimulation }: { onOpenSimulation: (simulation: Simulation) => void }) {
  const previewSims = simulations.slice(0, 4);

  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
      className="relative rounded-lg border border-slate-200 bg-white p-4 shadow-[0_34px_90px_rgba(15,23,42,0.16)]"
    >
      <div className="rounded-lg border border-slate-200 bg-[#f8fafc] p-5">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-slate-950 text-white">
              <Compass className="size-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-950">Career evidence room</p>
              <p className="text-xs text-slate-500">Student decision: internship direction</p>
            </div>
          </div>
          <div className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
            Live map
          </div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="mt-5 grid grid-cols-[0.9fr_1.1fr] gap-4"
        >
          <motion.div variants={fadeUp} className="rounded-lg border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Career confidence score</p>
            <div className="mt-4 flex items-end gap-3">
              <CountUp value={84} suffix="%" className="text-5xl font-semibold text-slate-950" />
              <span className="pb-2 text-sm font-medium text-emerald-600">after assessment</span>
            </div>
            <ProgressBar value={84} className="mt-5" color={productPalette.teal} />
            <div className="mt-5 h-24">
              <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 320, height: 96 }}>
                <AreaChart
                  data={[
                    { stage: "Start", score: 42 },
                    { stage: "Answers", score: 61 },
                    { stage: "Profile", score: 74 },
                    { stage: "Simulation", score: 84 },
                  ]}
                >
                  <defs>
                    <linearGradient id="confidencePreview" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={productPalette.teal} stopOpacity={0.34} />
                      <stop offset="100%" stopColor={productPalette.teal} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke={productPalette.teal}
                    fill="url(#confidencePreview)"
                    strokeWidth={3}
                    isAnimationActive
                    animationDuration={1300}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="rounded-lg border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-950">Recommended paths</p>
              <Map className="size-4 text-slate-400" />
            </div>
            <div className="mt-4 space-y-4">
              {careerPaths.slice(0, 3).map((item, index) => (
                <div key={item.id}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-medium text-slate-700">{item.title.split("/")[0].trim()}</span>
                    <span className="font-semibold text-slate-950">{[88, 81, 74][index]}%</span>
                  </div>
                  <ProgressBar
                    value={[88, 81, 74][index]}
                    color={[productPalette.blue, productPalette.teal, productPalette.amber][index]}
                  />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="col-span-2 grid grid-cols-4 gap-3">
            {previewSims.map((simulation) => {
              const meta = getMeta(simulation);
              return (
                <motion.button
                  type="button"
                  key={simulation.id}
                  onClick={() => onOpenSimulation(simulation)}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group rounded-lg border border-slate-200 bg-white p-4 text-left shadow-sm"
                >
                  <div className="flex h-12 items-center justify-center rounded-lg bg-slate-50 p-2">
                    <Image
                      src={meta.logo}
                      alt={`${meta.brand} logo`}
                      width={140}
                      height={52}
                      className="max-h-9 w-auto object-contain"
                    />
                  </div>
                  <p className="mt-3 text-sm font-semibold text-slate-950">{meta.brand}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">{simulation.careerPath}</p>
                </motion.button>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function ProblemSection() {
  const cards = [
    {
      title: "Advice is noisy",
      text: "Students hear too many opinions and too little structured evidence.",
      icon: Zap,
      color: productPalette.amber,
    },
    {
      title: "Profiles are shallow",
      text: "Most tools stop at generic strengths instead of specific career-relevant dimensions.",
      icon: Fingerprint,
      color: productPalette.coral,
    },
    {
      title: "Careers stay untested",
      text: "Students choose paths without trying the tasks that define the work.",
      icon: PlayCircle,
      color: productPalette.blue,
    },
  ];

  return (
    <section id="problem" className="mx-auto max-w-[1240px] px-6 py-28">
      <SectionHeader
        label="The problem"
        title="Students are drowning in advice, but still choosing in the dark."
        text="Career Compass turns career uncertainty into an evidence trail: answers, profile, path ranking, simulations, and roadmap."
      />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.24 }}
        className="mt-12 grid gap-4 md:grid-cols-3"
      >
        {cards.map((card) => (
          <motion.article
            key={card.title}
            variants={fadeUp}
            whileHover={cardHover}
            className="rounded-lg border border-slate-200 bg-white p-7 shadow-[0_18px_52px_rgba(15,23,42,0.07)]"
          >
            <span
              className="flex size-12 items-center justify-center rounded-lg text-white"
              style={{ backgroundColor: card.color }}
            >
              <card.icon className="size-5" />
            </span>
            <h3 className="mt-6 text-2xl font-semibold text-slate-950">{card.title}</h3>
            <p className="mt-3 leading-7 text-slate-600">{card.text}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

function SolutionSection() {
  return (
    <section id="solution" className="border-y border-slate-200 bg-white py-28">
      <div className="mx-auto max-w-[1240px] px-6">
        <SectionHeader
          label="The system"
          title="A guided journey from assessment to roadmap."
          text="Question-bank answers become trait scores. Trait scores become career matches. Career matches unlock simulations and a practical plan."
          align="center"
        />
        <CareerRoute compact />
      </div>
    </section>
  );
}

function CompanySimulationsSection({
  simulations: simulationList,
  onOpenSimulation,
}: {
  simulations: Simulation[];
  onOpenSimulation: (simulation: Simulation) => void;
}) {
  return (
    <section id="company-simulations" className="mx-auto max-w-[1240px] px-6 py-28">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <SectionHeader
          label="Company simulations"
          title="Test careers through real company-style cases."
          text="Each card is powered by the supplied simulation TypeScript data and provided logo assets."
        />
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900 lg:max-w-sm">
          Partner-inspired educational cases. Not affiliated with or endorsed by the named company
          unless an official partnership is confirmed.
        </div>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.12 }}
        className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4"
      >
        {simulationList.map((simulation) => (
          <SimulationCard
            key={simulation.id}
            simulation={simulation}
            onOpen={() => onOpenSimulation(simulation)}
          />
        ))}
      </motion.div>
    </section>
  );
}

function CareerMapPreviewSection() {
  return (
    <section id="career-map-preview" className="border-y border-slate-200 bg-white py-28">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-10 px-6 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeader
          label="Career Map"
          title="A living navigation system, not a generic dashboard."
          text="The map shows specific path fit, supporting traits, risks, skill gaps, simulations, and route progress."
        />
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="rounded-lg border border-slate-200 bg-[#f8fafc] p-5 shadow-[0_22px_70px_rgba(15,23,42,0.08)]"
        >
          <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-3">
              {careerPaths.slice(0, 4).map((career, index) => {
                const Icon = careerIconMap[career.iconKey] ?? Compass;
                const score = [88, 81, 75, 72][index];
                return (
                  <motion.div
                    key={career.id}
                    whileHover={{ x: 4 }}
                    className="rounded-lg border border-slate-200 bg-white p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="flex size-9 items-center justify-center rounded-lg bg-slate-950 text-white">
                          <Icon className="size-4" />
                        </span>
                        <p className="font-semibold text-slate-950">{career.title}</p>
                      </div>
                      <p className="text-sm font-semibold text-teal-700">{score}%</p>
                    </div>
                    <ProgressBar value={score} color={index === 0 ? productPalette.blue : productPalette.teal} className="mt-3" />
                    <p className="mt-3 text-xs leading-5 text-slate-500">{career.summary}</p>
                  </motion.div>
                );
              })}
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-5">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 420, height: 256 }}>
                  <RadarChart
                    data={[
                      { skill: "Product thinking", value: 88 },
                      { skill: "Commercial instinct", value: 82 },
                      { skill: "Market curiosity", value: 76 },
                      { skill: "Communication clarity", value: 74 },
                      { skill: "Quant reasoning", value: 70 },
                      { skill: "Risk tolerance", value: 64 },
                    ]}
                  >
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="skill" tick={{ fill: "#64748b", fontSize: 11 }} />
                    <Radar
                      dataKey="value"
                      stroke={productPalette.blue}
                      fill={productPalette.blue}
                      fillOpacity={0.18}
                      strokeWidth={2}
                      isAnimationActive
                      animationDuration={1200}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <PrimaryButton variant="light" icon={PlayCircle}>
                  Test top path
                </PrimaryButton>
                <PrimaryButton variant="outline" icon={Wrench}>
                  View gaps
                </PrimaryButton>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TrustSection() {
  return (
    <section className="mx-auto max-w-[1240px] px-6 py-28">
      <SectionHeader
        label="Trust"
        title="Built for career decisions that need evidence."
        text="Recommendations stay interpretable, simulations stay educational, and the user controls what gets shared."
        align="center"
      />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.24 }}
        className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4"
      >
        {trustCards.map((card) => (
          <motion.article
            key={card.title}
            variants={fadeUp}
            whileHover={cardHover}
            className="rounded-lg border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]"
          >
            <div className="flex size-11 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
              <card.icon className="size-5" />
            </div>
            <h3 className="mt-5 text-lg font-semibold text-slate-950">{card.title}</h3>
            <p className="mt-2 leading-6 text-slate-600">{card.text}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

function AppShell({
  page,
  setPage,
  children,
  profile,
  selectedSimulation,
}: {
  page: DemoPage;
  setPage: (page: DemoPage) => void;
  children: React.ReactNode;
  profile: CareerProfile | null;
  selectedSimulation: Simulation;
}) {
  const completed = Boolean(profile?.completed);
  const topMatch = profile?.matches[0];

  return (
    <div className="min-h-screen bg-[#f6f8fb] text-slate-950 lg:grid lg:grid-cols-[280px_1fr]">
      <aside className="sticky top-0 z-40 border-b border-slate-200 bg-white/92 px-4 py-4 backdrop-blur-xl lg:h-screen lg:border-b-0 lg:border-r lg:px-5 lg:py-6">
        <div className="flex items-center justify-between lg:block">
          <div onClick={() => setPage("landing")} className="cursor-pointer">
            <CareerCompassMark />
          </div>
          <button
            type="button"
            onClick={() => setPage("discovery")}
            className="rounded-lg border border-slate-200 p-2 text-slate-600 lg:hidden"
          >
            <Compass className="size-5" />
          </button>
        </div>

        <nav className="mt-5 flex gap-2 overflow-x-auto pb-1 lg:mt-9 lg:block lg:space-y-2 lg:overflow-visible lg:pb-0">
          {appNavItems.map((item) => {
            const active = page === item.id;
            return (
              <button
                type="button"
                key={item.id}
                onClick={() => setPage(item.id)}
                className={cn(
                  "flex min-w-max items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors lg:w-full",
                  active
                    ? "bg-slate-950 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
                )}
              >
                <item.icon className="size-4" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <motion.div
          animate={{ opacity: [0.92, 1, 0.92] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="mt-8 hidden rounded-lg border border-teal-200 bg-teal-50 p-4 lg:block"
        >
          <p className="text-sm font-semibold text-teal-900">
            {completed ? "Next best action" : "Locked until discovery"}
          </p>
          <p className="mt-2 text-sm leading-6 text-teal-800">
            {completed
              ? `Test ${topMatch?.title ?? "your top path"} through ${getMeta(selectedSimulation).brand}.`
              : "Complete Career Discovery to unlock your path ranking, map, simulations, and roadmap."}
          </p>
          <button
            type="button"
            onClick={() => setPage(completed ? "simulations" : "discovery")}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-teal-700 px-3 py-2 text-sm font-semibold text-white"
          >
            {completed ? "Open simulations" : "Start assessment"}
            <ArrowRight className="size-4" />
          </button>
        </motion.div>
      </aside>

      <div className="min-w-0">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/86 backdrop-blur-xl">
          <div className="flex min-h-20 flex-col gap-3 px-6 py-4 xl:flex-row xl:items-center xl:justify-between xl:px-8">
            <div>
              <p className="text-sm text-slate-500">Current journey</p>
              <p className="text-base font-semibold text-slate-950">
                {completed
                  ? `${profile?.dominantProfileType} -> ${topMatch?.title}`
                  : "Complete Career Discovery to generate your evidence profile"}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-lg border border-slate-200 bg-white px-4 py-2">
                <p className="text-xs text-slate-500">Assessment</p>
                <p className="text-sm font-semibold text-slate-950">
                  {profile?.answeredCount ?? 0}/{profile?.totalQuestions ?? 14} questions
                </p>
              </div>
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2">
                <p className="text-xs text-emerald-700">Career confidence</p>
                <p className="text-sm font-semibold text-emerald-900">
                  {completed ? `${profile?.careerConfidence}%` : "Locked"}
                </p>
              </div>
              <PrimaryButton
                onClick={() => setPage(completed ? "simulations" : "discovery")}
                icon={completed ? PlayCircle : Compass}
              >
                {completed ? "Recommended simulations" : "Start discovery"}
              </PrimaryButton>
            </div>
          </div>
        </header>
        <motion.main
          key={page}
          initial={{ opacity: 1, y: 14, scale: 0.995 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="px-6 py-8 xl:px-8"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}

function HomeDashboardPage({
  profile,
  setPage,
  onOpenSimulation,
}: {
  profile: CareerProfile | null;
  setPage: (page: DemoPage) => void;
  onOpenSimulation: (simulation: Simulation) => void;
}) {
  if (!profile?.completed) {
    return (
      <div>
        <PageTitle
          label="Home"
          title="Your career navigation system is waiting for evidence."
          text="The dashboard becomes personalized after the Career Discovery assessment."
        />
        <EmptyState
          title="Complete your Career Discovery test to unlock your personalized career profile."
          text="Career Compass will generate specific career matches, top strengths, weak areas, recommended simulations, and a roadmap from your answers."
          onStart={() => setPage("discovery")}
          icon={Compass}
        />
      </div>
    );
  }

  const topMatch = profile.matches[0];
  const recommended = getRecommendedSimulations(profile, 3);

  return (
    <div>
      <PageTitle
        label="Home"
        title="Your personalized career command center"
        text="Every card is now powered by your assessment answers, trait evidence, and top career recommendation."
      />
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <motion.section variants={fadeUp} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
            <div>
              <p className="text-sm text-slate-500">Main recommended path</p>
              <h2 className="mt-2 max-w-3xl text-4xl font-semibold leading-tight text-slate-950">
                {topMatch.title}
              </h2>
              <p className="mt-4 max-w-3xl leading-8 text-slate-600">{topMatch.explanation}</p>
            </div>
            <div className="rounded-lg border border-teal-200 bg-teal-50 p-5 text-center">
              <CountUp value={topMatch.score} suffix="%" className="text-5xl font-semibold text-teal-950" />
              <p className="mt-2 text-sm font-semibold text-teal-700">career match</p>
            </div>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {profile.topStrengths.slice(0, 3).map((trait) => (
              <SignalCard key={trait.key} trait={trait} icon={Sparkles} tone="strength" />
            ))}
          </div>
        </motion.section>

        <motion.section variants={fadeUp} className="rounded-lg border border-amber-200 bg-amber-50 p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-amber-900">Next best action</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                Complete a matched simulation
              </h2>
            </div>
            <PlayCircle className="size-6 text-amber-700" />
          </div>
          <p className="mt-4 leading-7 text-amber-900">
            Start with {recommended[0] ? getMeta(recommended[0]).brand : "your top"} because it maps
            directly to {topMatch.title.toLowerCase()}.
          </p>
          {recommended[0] ? (
            <div className="mt-6 rounded-lg border border-amber-200 bg-white p-4">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-24 items-center justify-center rounded-lg bg-slate-50 p-3">
                  <Image
                    src={getMeta(recommended[0]).logo}
                    alt=""
                    width={140}
                    height={56}
                    className="max-h-10 w-auto object-contain"
                  />
                </div>
                <div>
                  <p className="font-semibold text-slate-950">{recommended[0].title}</p>
                  <p className="text-sm text-slate-500">
                    {recommended[0].durationMinutes} min · {recommended[0].difficulty}
                  </p>
                </div>
              </div>
            </div>
          ) : null}
          <PrimaryButton onClick={() => setPage("simulations")} className="mt-6 w-full" icon={PlayCircle}>
            Open recommended simulations
          </PrimaryButton>
        </motion.section>

        <motion.section variants={fadeUp} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-950">Career fit ranking</h2>
            <Target className="size-5 text-slate-400" />
          </div>
          <div className="mt-6 space-y-5">
            {profile.matches.slice(0, 5).map((match, index) => (
              <div key={match.careerId}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium text-slate-700">
                    {index + 1}. {match.title}
                  </span>
                  <span className="font-semibold text-slate-950">{match.score}%</span>
                </div>
                <ProgressBar
                  value={match.score}
                  color={[productPalette.blue, productPalette.teal, productPalette.amber, productPalette.coral, productPalette.green][index]}
                />
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section variants={fadeUp} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-950">Matched simulations</h2>
            <BriefcaseBusiness className="size-5 text-slate-400" />
          </div>
          <div className="mt-5 grid gap-3">
            {recommended.map((simulation) => (
              <CompactSimulationButton
                key={simulation.id}
                simulation={simulation}
                onOpen={() => onOpenSimulation(simulation)}
              />
            ))}
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}

function SignalCard({
  trait,
  icon: Icon,
  tone,
}: {
  trait: TraitScore;
  icon: LucideIcon;
  tone: "strength" | "gap";
}) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={cardHover}
      className={cn(
        "rounded-lg border p-4",
        tone === "strength" ? "border-emerald-200 bg-emerald-50" : "border-amber-200 bg-amber-50",
      )}
    >
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "flex size-10 items-center justify-center rounded-lg",
            tone === "strength" ? "bg-emerald-600 text-white" : "bg-amber-600 text-white",
          )}
        >
          <Icon className="size-5" />
        </span>
        <span className="text-2xl font-semibold text-slate-950">{trait.score}</span>
      </div>
      <p className="mt-4 font-semibold text-slate-950">{trait.label}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">{trait.description}</p>
    </motion.div>
  );
}

function CareerDiscoveryPage({
  questions,
  answers,
  profile,
  onAnswer,
  onComplete,
  onReset,
}: {
  questions: Question[];
  answers: AssessmentAnswers;
  profile: CareerProfile;
  onAnswer: (questionId: string, value: AssessmentAnswerValue) => void;
  onComplete: () => void;
  onReset: () => void;
}) {
  const firstUnansweredIndex = questions.findIndex((question) => !isQuestionAnswered(question, answers[question.id]));
  const firstUnanswered = firstUnansweredIndex === -1 ? questions.length - 1 : Math.max(0, firstUnansweredIndex);
  const [started, setStarted] = useState(profile.answeredCount > 0);
  const [index, setIndex] = useState(firstUnanswered);
  const question = questions[index];
  const currentAnswer = answers[question.id];
  const answered = isQuestionAnswered(question, currentAnswer);
  const progress = Math.round((profile.answeredCount / questions.length) * 100);
  const assessmentStarted = started || profile.completed;

  if (!assessmentStarted) {
    return (
      <div>
        <PageTitle
          label="Career Discovery"
          title="Find your best-fit career path through evidence-based testing."
          text="This assessment uses your provided question bank and maps each answer into career-relevant traits, path recommendations, simulations, and a roadmap."
        />
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid gap-5 xl:grid-cols-[0.88fr_1.12fr]"
        >
          <motion.div variants={slideInLeft} className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
            <span className="flex size-14 items-center justify-center rounded-lg bg-slate-950 text-white">
              <Compass className="size-7" />
            </span>
            <h2 className="mt-6 text-4xl font-semibold leading-tight text-slate-950">
              A guided career test that produces a profile, not a personality label.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              You will answer {questions.length} structured questions across interests, skills,
              work style, motivation, pressure tolerance, risk appetite, daily tasks, and preferred
              environment.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryButton onClick={() => setStarted(true)} icon={ArrowRight}>
                Start Career Discovery
              </PrimaryButton>
              {profile.answeredCount > 0 ? (
                <PrimaryButton onClick={() => setStarted(true)} variant="light" icon={RefreshCcw}>
                  Resume assessment
                </PrimaryButton>
              ) : null}
            </div>
          </motion.div>
          <motion.div variants={slideInRight} className="rounded-lg border border-slate-200 bg-slate-950 p-8 text-white shadow-sm">
            <h2 className="text-2xl font-semibold">What this unlocks</h2>
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {[
                ["Dominant profile type", Fingerprint],
                ["Specific career path ranking", Target],
                ["Skill gaps and blockers", Wrench],
                ["Matched simulations", PlayCircle],
                ["30, 90, 12-month roadmap", Route],
                ["Local progress save", LockKeyhole],
              ].map(([label, Icon]) => {
                const TypedIcon = Icon as LucideIcon;
                return (
                  <motion.div key={label as string} variants={fadeUp} className="rounded-lg border border-white/10 bg-white/8 p-5">
                    <TypedIcon className="size-5 text-teal-300" />
                    <p className="mt-4 font-semibold">{label as string}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.section>
      </div>
    );
  }

  if (profile.completed) {
    return (
      <div>
        <PageTitle
          label="Career Discovery complete"
          title="Your personalized profile has been generated."
          text="Career Compass used the question bank answers to rank your best-fit paths and build your next steps."
        />
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="rounded-lg border border-emerald-200 bg-emerald-50 p-8 shadow-sm"
        >
          <motion.div variants={fadeUp} className="flex flex-col justify-between gap-6 xl:flex-row xl:items-center">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex size-12 items-center justify-center rounded-lg bg-emerald-600 text-white">
                  <CheckCircle2 className="size-6" />
                </span>
                <p className="text-sm font-semibold text-emerald-800">Assessment saved locally</p>
              </div>
              <h2 className="mt-5 text-4xl font-semibold text-slate-950">
                {profile.dominantProfileType}
              </h2>
              <p className="mt-4 max-w-4xl text-lg leading-8 text-emerald-950">{profile.summary}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <PrimaryButton onClick={onComplete} icon={Fingerprint}>
                View Profile / Results
              </PrimaryButton>
              <PrimaryButton onClick={onReset} variant="light" icon={RefreshCcw}>
                Reset assessment
              </PrimaryButton>
            </div>
          </motion.div>
        </motion.section>
      </div>
    );
  }

  return (
    <div>
      <PageTitle
        label="Career Discovery"
        title="Build your evidence profile"
        text="Each answer contributes to career-relevant traits and weighted path recommendations."
      />
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid gap-5 xl:grid-cols-[0.72fr_1.28fr]">
        <motion.aside variants={slideInLeft} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-950">Assessment progress</h2>
            <span className="rounded-lg bg-teal-50 px-3 py-1.5 text-sm font-semibold text-teal-700">
              {progress}%
            </span>
          </div>
          <ProgressBar value={progress} color={productPalette.teal} className="mt-5" />
          <div className="mt-6 space-y-2">
            {questions.map((item, questionIndex) => {
              const itemAnswered = isQuestionAnswered(item, answers[item.id]);
              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setIndex(questionIndex)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm transition-colors",
                    index === questionIndex
                      ? "bg-slate-950 text-white"
                      : itemAnswered
                        ? "bg-emerald-50 text-emerald-900"
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100",
                  )}
                >
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-white/20 text-xs font-semibold">
                    {itemAnswered ? <Check className="size-3.5" /> : questionIndex + 1}
                  </span>
                  <span className="line-clamp-2">{item.prompt}</span>
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={onReset}
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-950"
          >
            <RefreshCcw className="size-4" />
            Reset assessment
          </button>
        </motion.aside>

        <motion.section variants={scaleIn} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 md:flex-row md:items-start">
            <div>
              <p className="text-sm font-semibold text-teal-700">
                Question {index + 1} of {questions.length} · {question.section.replace("_", " ")}
              </p>
              <h2 className="mt-3 max-w-4xl text-3xl font-semibold leading-tight text-slate-950">
                {question.prompt}
              </h2>
              {question.helperText ? (
                <p className="mt-3 max-w-3xl leading-7 text-slate-500">{question.helperText}</p>
              ) : null}
            </div>
            <span className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-600">
              {question.type.replace("_", " ")}
            </span>
          </div>

          <div className="mt-7">
            <QuestionInput question={question} value={currentAnswer} onChange={(value) => onAnswer(question.id, value)} />
          </div>

          {question.whyWeAsk ? (
            <div className="mt-7 rounded-lg border border-blue-100 bg-blue-50 p-4">
              <div className="flex items-start gap-3">
                <Lightbulb className="mt-0.5 size-5 shrink-0 text-blue-700" />
                <div>
                  <p className="text-sm font-semibold text-blue-950">Why we ask</p>
                  <p className="mt-1 text-sm leading-6 text-blue-900">{question.whyWeAsk}</p>
                </div>
              </div>
            </div>
          ) : null}

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-5">
            <PrimaryButton
              onClick={() => setIndex(Math.max(0, index - 1))}
              variant="light"
              icon={ArrowRight}
              disabled={index === 0}
              className="[&>svg]:rotate-180"
            >
              Back
            </PrimaryButton>
            <div className="flex gap-3">
              <PrimaryButton
                onClick={() => {
                  if (index < questions.length - 1) setIndex(index + 1);
                }}
                variant="light"
                icon={ArrowRight}
                disabled={!answered || index === questions.length - 1}
              >
                Next
              </PrimaryButton>
              <PrimaryButton onClick={onComplete} icon={Sparkles} disabled={!profile.completed}>
                Generate result
              </PrimaryButton>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}

function QuestionInput({
  question,
  value,
  onChange,
}: {
  question: Question;
  value: AssessmentAnswerValue | undefined;
  onChange: (value: AssessmentAnswerValue) => void;
}) {
  if (question.type === "scale") {
    const numericValue = typeof value === "number" ? value : question.min ?? 0;
    return (
      <div className="rounded-lg border border-slate-200 bg-[#f8fafc] p-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">Your answer</p>
            <p className="mt-1 text-5xl font-semibold text-slate-950">{numericValue}</p>
          </div>
          <p className="text-sm text-slate-500">
            {question.min ?? 0} to {question.max ?? 100}
          </p>
        </div>
        <input
          type="range"
          min={question.min ?? 0}
          max={question.max ?? 100}
          step={question.step ?? 1}
          value={numericValue}
          onChange={(event) => onChange(Number(event.target.value))}
          className="mt-7 w-full accent-teal-700"
        />
      </div>
    );
  }

  if (question.type === "long_text" || question.type === "short_text" || question.type === "reflection") {
    return (
      <textarea
        value={typeof value === "string" ? value : ""}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-44 w-full rounded-lg border border-slate-200 bg-[#f8fafc] p-4 text-sm leading-7 outline-none transition-colors focus:border-blue-400"
        placeholder="Write a few honest sentences. Career Compass will use keywords as weak evidence signals."
      />
    );
  }

  const selected = Array.isArray(value) ? value : typeof value === "string" ? [value] : [];
  const isMulti = question.type === "multi_select" || question.type === "ranking";
  const maxSelections =
    question.id === "onboarding_career_areas" ? 4 : question.id === "profile_values" ? 5 : 8;

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid gap-3 md:grid-cols-2">
      {question.options?.map((option) => {
        const active = selected.includes(option.id);
        const rank = selected.indexOf(option.id) + 1;
        return (
          <motion.button
            type="button"
            variants={fadeUp}
            whileHover={{ y: -3 }}
            key={option.id}
            onClick={() => {
              if (!isMulti) {
                onChange(option.id);
                return;
              }
              if (active) {
                onChange(selected.filter((id) => id !== option.id));
                return;
              }
              if (selected.length >= maxSelections) return;
              onChange([...selected, option.id]);
            }}
            className={cn(
              "rounded-lg border p-4 text-left transition-colors",
              active ? "border-blue-500 bg-blue-50" : "border-slate-200 bg-white hover:border-slate-300",
            )}
          >
            <div className="flex items-start gap-3">
              <span
                className={cn(
                  "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg border text-xs font-semibold",
                  active
                    ? "border-blue-500 bg-blue-600 text-white"
                    : "border-slate-300 bg-slate-50 text-transparent",
                )}
              >
                {question.type === "ranking" && active ? rank : <Check className="size-3.5" />}
              </span>
              <div>
                <p className="font-semibold text-slate-900">{option.label}</p>
                {option.tags?.length ? (
                  <p className="mt-2 text-xs text-slate-500">
                    Signals: {option.tags.slice(0, 4).join(", ")}
                  </p>
                ) : null}
              </div>
            </div>
          </motion.button>
        );
      })}
    </motion.div>
  );
}

function ResultsPage({
  profile,
  setPage,
  onOpenSimulation,
  onReset,
}: {
  profile: CareerProfile | null;
  setPage: (page: DemoPage) => void;
  onOpenSimulation: (simulation: Simulation) => void;
  onReset: () => void;
}) {
  if (!profile?.completed) {
    return (
      <div>
        <PageTitle
          label="Profile / Results"
          title="Your assessment result is not generated yet."
          text="Complete Career Discovery to unlock a specific profile type, career ranking, skill gaps, and roadmap."
        />
        <EmptyState
          title="Your personalized profile is locked."
          text="Answer the assessment to generate a dominant profile type and path recommendations from your own evidence."
          onStart={() => setPage("discovery")}
          icon={Fingerprint}
        />
      </div>
    );
  }

  const topMatch = profile.matches[0];
  const recommended = getRecommendedSimulations(profile, 4);

  return (
    <div>
      <PageTitle
        label="Profile / Results"
        title={profile.dominantProfileType}
        text={profile.dominantProfileDescription}
      />
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid gap-5">
        <motion.section variants={fadeUp} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-sm font-semibold text-teal-700">Main recommended path</p>
              <h2 className="mt-2 text-4xl font-semibold text-slate-950">{topMatch.title}</h2>
              <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-600">{topMatch.explanation}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <PrimaryButton onClick={() => setPage("map")} icon={Map}>
                  Explore Career Map
                </PrimaryButton>
                <PrimaryButton onClick={() => setPage("roadmap")} variant="light" icon={Route}>
                  View roadmap
                </PrimaryButton>
                <PrimaryButton onClick={onReset} variant="outline" icon={RefreshCcw}>
                  Reset assessment
                </PrimaryButton>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <ScoreTile label="Career match" value={topMatch.score} icon={Target} color={productPalette.blue} />
              <ScoreTile label="Confidence" value={profile.careerConfidence} icon={BadgeCheck} color={productPalette.teal} />
              <ScoreTile label="Strength signals" value={profile.topStrengths.length} icon={Sparkles} color={productPalette.green} />
              <ScoreTile label="Gaps to fix" value={profile.weakAreas.length} icon={Wrench} color={productPalette.amber} />
            </div>
          </div>
        </motion.section>

        <div className="grid gap-5 xl:grid-cols-2">
          <motion.section variants={fadeUp} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-950">Top strengths</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {profile.topStrengths.slice(0, 4).map((trait) => (
                <SignalCard key={trait.key} trait={trait} icon={Trophy} tone="strength" />
              ))}
            </div>
          </motion.section>
          <motion.section variants={fadeUp} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-950">Weak areas and blockers</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {profile.weakAreas.slice(0, 4).map((trait) => (
                <SignalCard key={trait.key} trait={trait} icon={AlertTriangle} tone="gap" />
              ))}
            </div>
          </motion.section>
        </div>

        <motion.section variants={fadeUp} className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-950">Trait breakdown</h2>
            <div className="mt-5 space-y-4">
              {profile.traitScores.slice(0, 10).map((trait, index) => (
                <div key={trait.key}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-medium text-slate-700">{trait.label}</span>
                    <span className="font-semibold text-slate-950">{trait.score}</span>
                  </div>
                  <ProgressBar
                    value={trait.score}
                    color={[productPalette.blue, productPalette.teal, productPalette.violet, productPalette.green][index % 4]}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-950">Career fit ranking</h2>
            <div className="mt-5 space-y-3">
              {profile.matches.slice(0, 5).map((match, index) => (
                <RecommendedPathRow key={match.careerId} match={match} index={index} onOpen={() => setPage("map")} />
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section variants={fadeUp} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-950">Recommended simulations</h2>
            <BriefcaseBusiness className="size-5 text-slate-400" />
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {recommended.map((simulation) => (
              <SimulationCard
                key={simulation.id}
                simulation={simulation}
                recommended
                onOpen={() => onOpenSimulation(simulation)}
              />
            ))}
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}

function ScoreTile({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: number;
  icon: LucideIcon;
  color: string;
}) {
  return (
    <motion.div whileHover={cardHover} className="rounded-lg border border-slate-200 bg-[#f8fafc] p-5">
      <div className="flex items-center justify-between">
        <span className="flex size-10 items-center justify-center rounded-lg text-white" style={{ backgroundColor: color }}>
          <Icon className="size-5" />
        </span>
        <CountUp value={value} suffix={value > 20 ? "%" : ""} className="text-3xl font-semibold text-slate-950" />
      </div>
      <p className="mt-4 text-sm font-semibold text-slate-700">{label}</p>
    </motion.div>
  );
}

function RecommendedPathRow({
  match,
  index,
  onOpen,
}: {
  match: CareerMatch;
  index: number;
  onOpen: () => void;
}) {
  const career = getCareerById(match.careerId);
  const Icon = career ? careerIconMap[career.iconKey] ?? Compass : Compass;
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      whileHover={{ x: 4 }}
      className="w-full rounded-lg border border-slate-200 bg-[#f8fafc] p-4 text-left transition-colors hover:border-slate-300"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-lg bg-slate-950 text-white">
            <Icon className="size-5" />
          </span>
          <div>
            <p className="font-semibold text-slate-950">
              {index + 1}. {match.title}
            </p>
            <p className="mt-1 text-sm text-slate-500">{match.family}</p>
          </div>
        </div>
        <span className="text-2xl font-semibold text-slate-950">{match.score}%</span>
      </div>
      <ProgressBar value={match.score} color={[productPalette.blue, productPalette.teal, productPalette.amber][index % 3]} className="mt-4" />
    </motion.button>
  );
}

function CareerMapPage({
  profile,
  setPage,
  onOpenSimulation,
}: {
  profile: CareerProfile | null;
  setPage: (page: DemoPage) => void;
  onOpenSimulation: (simulation: Simulation) => void;
}) {
  const [selectedCareerId, setSelectedCareerId] = useState(profile?.matches[0]?.careerId ?? "");

  if (!profile?.completed) {
    return (
      <div>
        <PageTitle
          label="Career Map"
          title="The Career Map unlocks after Career Discovery."
          text="The map needs answer evidence to rank paths, draw trait signals, and recommend simulations."
        />
        <EmptyState
          title="Complete Career Discovery to unlock your living Career Map."
          text="Your map will show specific path fit, supporting strengths, blockers, skill gaps, route progress, and matched company simulations."
          onStart={() => setPage("discovery")}
          icon={Map}
        />
      </div>
    );
  }

  const activeCareerId = selectedCareerId || profile.matches[0]?.careerId || "";
  const selectedMatch =
    profile.matches.find((match) => match.careerId === activeCareerId) ?? profile.matches[0];
  const selectedCareer = getCareerById(selectedMatch.careerId);
  const SelectedIcon = selectedCareer ? careerIconMap[selectedCareer.iconKey] ?? Compass : Compass;
  const radarData = selectedMatch.supportingTraits
    .concat(selectedMatch.gaps)
    .slice(0, 6)
    .map((trait) => ({ trait: trait.label.replace(" and ", " & "), value: trait.score }));
  const industryData = buildIndustryData(profile);
  const simulationsForCareer = getSimulationsForMatch(selectedMatch);

  return (
    <div>
      <PageTitle
        label="Career Map"
        title="Your living career navigation system"
        text="Click a path to see why it fits, what could block you, which simulations matter, and what to do next."
      />
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid gap-5">
        <motion.section
          variants={fadeUp}
          className="overflow-hidden rounded-lg border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_24px_90px_rgba(7,24,39,0.20)]"
        >
          <div className="flex flex-col justify-between gap-6 xl:flex-row xl:items-center">
            <div>
              <p className="text-sm font-semibold text-teal-300">Top recommended route</p>
              <h2 className="mt-3 text-4xl font-semibold leading-tight">{profile.matches[0].title}</h2>
              <p className="mt-4 max-w-4xl leading-8 text-slate-300">{profile.matches[0].explanation}</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/8 p-5 text-center">
              <CountUp value={profile.matches[0].score} suffix="%" className="text-6xl font-semibold" />
              <p className="mt-2 text-sm font-semibold text-teal-200">career fit</p>
            </div>
          </div>
          <CareerRoute compact />
        </motion.section>

        <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
          <motion.section variants={slideInLeft} className="space-y-4">
            {profile.matches.slice(0, 6).map((match, index) => (
              <RecommendedPathCard
                key={match.careerId}
                match={match}
                active={match.careerId === selectedMatch.careerId}
                index={index}
                onClick={() => setSelectedCareerId(match.careerId)}
              />
            ))}
          </motion.section>

          <motion.section variants={slideInRight} className="grid gap-5">
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="flex size-12 items-center justify-center rounded-lg bg-slate-950 text-white">
                      <SelectedIcon className="size-6" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-teal-700">Path detail panel</p>
                      <h2 className="text-2xl font-semibold text-slate-950">{selectedMatch.title}</h2>
                    </div>
                  </div>
                  <p className="mt-5 leading-8 text-slate-600">{selectedMatch.explanation}</p>
                </div>
                <div className="rounded-lg bg-teal-50 p-5 text-center">
                  <CountUp value={selectedMatch.score} suffix="%" className="text-5xl font-semibold text-teal-950" />
                  <p className="mt-2 text-sm font-semibold text-teal-700">fit score</p>
                </div>
              </div>

              <div className="mt-7 grid gap-4 md:grid-cols-3">
                <DetailBlock
                  title="Supporting strengths"
                  icon={Trophy}
                  items={selectedMatch.supportingTraits.slice(0, 3).map((trait) => trait.label)}
                  tone="green"
                />
                <DetailBlock
                  title="Possible blockers"
                  icon={AlertTriangle}
                  items={selectedMatch.blockers.slice(0, 3)}
                  tone="amber"
                />
                <DetailBlock
                  title="Skill gaps"
                  icon={Wrench}
                  items={selectedMatch.skillGaps.slice(0, 3)}
                  tone="blue"
                />
              </div>
            </div>

            <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-slate-950">Trait shape</h2>
                  <BarChart3 className="size-5 text-slate-400" />
                </div>
                <div className="mt-4 h-72">
                  <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 420, height: 288 }}>
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="#e2e8f0" />
                      <PolarAngleAxis dataKey="trait" tick={{ fill: "#64748b", fontSize: 11 }} />
                      <Radar
                        dataKey="value"
                        stroke={productPalette.blue}
                        fill={productPalette.blue}
                        fillOpacity={0.2}
                        strokeWidth={3}
                        isAnimationActive
                        animationDuration={1100}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <IndustryInterestChart data={industryData} />
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-950">Relevant simulations</h2>
                <PlayCircle className="size-5 text-slate-400" />
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {simulationsForCareer.map((simulation) => (
                  <CompactSimulationButton
                    key={simulation.id}
                    simulation={simulation}
                    onOpen={() => onOpenSimulation(simulation)}
                  />
                ))}
              </div>
              <div className="mt-6 rounded-lg border border-teal-200 bg-teal-50 p-5">
                <p className="text-sm font-semibold text-teal-900">Suggested next action</p>
                <p className="mt-2 leading-7 text-teal-900">{selectedMatch.roadmap.thirty[0]}</p>
                <PrimaryButton onClick={() => setPage("roadmap")} className="mt-4" variant="teal" icon={Route}>
                  Open personalized roadmap
                </PrimaryButton>
              </div>
            </div>
          </motion.section>
        </div>
      </motion.div>
    </div>
  );
}

function RecommendedPathCard({
  match,
  active,
  index,
  onClick,
}: {
  match: CareerMatch;
  active: boolean;
  index: number;
  onClick: () => void;
}) {
  const career = getCareerById(match.careerId);
  const Icon = career ? careerIconMap[career.iconKey] ?? Compass : Compass;
  const color = [productPalette.blue, productPalette.teal, productPalette.amber, productPalette.coral][index % 4];

  return (
    <motion.button
      type="button"
      variants={fadeUp}
      onClick={onClick}
      whileHover={{ x: 4, y: -2 }}
      className={cn(
        "w-full rounded-lg border bg-white p-5 text-left shadow-sm transition-all",
        active ? "border-blue-400 shadow-[0_22px_64px_rgba(37,99,235,0.16)]" : "border-slate-200",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-lg text-white" style={{ backgroundColor: color }}>
            <Icon className="size-6" />
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-500">Recommended path {index + 1}</p>
            <h2 className="mt-1 text-xl font-semibold text-slate-950">{match.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Strong fit with {match.supportingTraits.slice(0, 3).map((trait) => trait.label.toLowerCase()).join(", ")}.
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-3xl font-semibold text-slate-950">{match.score}%</p>
          <p className="text-xs text-slate-500">fit</p>
        </div>
      </div>
      <ProgressBar value={match.score} color={color} className="mt-4" />
    </motion.button>
  );
}

function DetailBlock({
  title,
  icon: Icon,
  items,
  tone,
}: {
  title: string;
  icon: LucideIcon;
  items: string[];
  tone: "green" | "amber" | "blue";
}) {
  const colorClass =
    tone === "green"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : tone === "amber"
        ? "bg-amber-50 text-amber-700 border-amber-200"
        : "bg-blue-50 text-blue-700 border-blue-200";
  return (
    <div className={cn("rounded-lg border p-4", colorClass)}>
      <div className="flex items-center gap-2">
        <Icon className="size-5" />
        <h3 className="font-semibold">{title}</h3>
      </div>
      <ul className="mt-3 space-y-2 text-sm leading-6">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <CircleDot className="mt-1 size-3 shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function buildIndustryData(profile: CareerProfile) {
  const total = profile.matches.slice(0, 5).reduce((sum, match) => sum + match.score, 0);
  return profile.matches.slice(0, 5).map((match, index) => ({
    name: match.family,
    value: Math.round((match.score / total) * 100),
    color: [productPalette.blue, productPalette.teal, productPalette.amber, productPalette.coral, productPalette.green][index],
  }));
}

function IndustryInterestChart({ data }: { data: { name: string; value: number; color: string }[] }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-950">Industry interest</h2>
        <PieChartIcon className="size-5 text-slate-400" />
      </div>
      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 420, height: 256 }}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={58}
              outerRadius={88}
              paddingAngle={4}
              isAnimationActive
              animationDuration={1100}
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: 8,
                border: "1px solid #e2e8f0",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 space-y-2">
        {data.map((entry) => (
          <div key={entry.name} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-slate-600">
              <span className="size-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
              {entry.name}
            </span>
            <span className="font-semibold text-slate-950">{entry.value}%</span>
          </div>
        ))}
      </div>
      <p className="mt-4 rounded-lg bg-slate-50 p-3 text-sm leading-6 text-slate-600">
        Interpretation: your strongest industry pull is where your highest career-fit paths cluster,
        so simulations should test those domains first.
      </p>
    </div>
  );
}

function CareerRoute({ compact = false }: { compact?: boolean }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className={cn("mt-12 grid gap-3", compact ? "lg:grid-cols-6" : "lg:grid-cols-6")}
    >
      {routeSteps.map((step, index) => (
        <motion.div key={step.title} variants={fadeUp} className="relative">
          <motion.div
            whileHover={cardHover}
            className={cn(
              "h-full rounded-lg border p-4 text-center shadow-sm",
              compact
                ? "border-slate-200 bg-white text-slate-950"
                : "border-white/10 bg-white/8 text-white",
            )}
          >
            <motion.div
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ repeat: Infinity, duration: 2.6, delay: index * 0.18 }}
              className={cn(
                "mx-auto flex size-12 items-center justify-center rounded-lg",
                compact ? "bg-slate-950 text-white" : "bg-teal-300 text-slate-950",
              )}
            >
              <step.icon className="size-5" />
            </motion.div>
            <p className="mt-4 text-sm font-semibold">{step.title}</p>
            {!compact ? <p className="mt-2 text-xs leading-5 text-slate-300">{step.text}</p> : null}
          </motion.div>
          {index < routeSteps.length - 1 ? (
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className={cn(
                "absolute left-[calc(100%-6px)] top-1/2 hidden h-px w-5 origin-left lg:block",
                compact ? "bg-slate-300" : "bg-teal-300/60",
              )}
            />
          ) : null}
        </motion.div>
      ))}
    </motion.div>
  );
}

function SimulationHubPage({
  profile,
  setPage,
  onOpenSimulation,
}: {
  profile: CareerProfile | null;
  setPage: (page: DemoPage) => void;
  onOpenSimulation: (simulation: Simulation) => void;
}) {
  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState("All");
  const industries = ["All", ...Array.from(new Set(simulations.map((simulation) => simulation.industry.split("/")[0].trim())))];
  const recommendedIds = profile?.recommendedSimulationIds ?? [];
  const orderedSimulations = [
    ...recommendedIds
      .map((id) => simulations.find((simulation) => simulation.id === id))
      .filter(Boolean),
    ...simulations.filter((simulation) => !recommendedIds.includes(simulation.id)),
  ] as Simulation[];
  const filtered = orderedSimulations.filter((simulation) => {
    const meta = getMeta(simulation);
    const matchesQuery = `${meta.brand} ${simulation.title} ${simulation.careerPath} ${simulation.skillsTested.join(" ")}`
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchesIndustry = industry === "All" || simulation.industry.includes(industry);
    return matchesQuery && matchesIndustry;
  });

  if (!profile?.completed) {
    return (
      <div>
        <PageTitle
          label="Simulations"
          title="Company simulations become personalized after Career Discovery."
          text="You can browse the library, but recommended simulations need a generated career profile."
        />
        <EmptyState
          title="Complete Career Discovery to unlock matched simulations."
          text="Your recommended cases will be connected to the career path that best fits your answers."
          onStart={() => setPage("discovery")}
          icon={BriefcaseBusiness}
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {simulations.slice(0, 4).map((simulation) => (
            <SimulationCard key={simulation.id} simulation={simulation} onOpen={() => onOpenSimulation(simulation)} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageTitle
        label="Simulations"
        title="Recommended company-style simulations"
        text={`Your first recommendations are matched to ${profile.matches[0].title}. Complete them to update your evidence profile.`}
      />
      <motion.section variants={fadeUp} initial="hidden" animate="show" className="mb-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 xl:grid-cols-[1fr_auto]">
          <label className="flex items-center gap-3 rounded-lg border border-slate-200 bg-[#f8fafc] px-4 py-3">
            <Search className="size-5 text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by company, role, skill, or industry"
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </label>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700">
              <Filter className="size-4" />
              Filters
            </span>
            {industries.slice(0, 6).map((item) => (
              <button
                type="button"
                key={item}
                onClick={() => setIndustry(item)}
                className={cn(
                  "rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
                  industry === item
                    ? "border-slate-950 bg-slate-950 text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300",
                )}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </motion.section>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4"
      >
        {filtered.map((simulation) => (
          <SimulationCard
            key={simulation.id}
            simulation={simulation}
            recommended={recommendedIds.includes(simulation.id)}
            onOpen={() => onOpenSimulation(simulation)}
          />
        ))}
      </motion.div>
    </div>
  );
}

function SimulationCard({
  simulation,
  onOpen,
  recommended,
}: {
  simulation: Simulation;
  onOpen: () => void;
  recommended?: boolean;
}) {
  const meta = getMeta(simulation);

  return (
    <motion.button
      type="button"
      variants={fadeUp}
      whileHover={{
        y: -7,
        scale: 1.01,
        borderColor: meta.accent,
        transition: { duration: 0.18 },
      }}
      whileTap={{ scale: 0.99 }}
      onClick={onOpen}
      className="group flex min-h-[330px] flex-col overflow-hidden rounded-lg border border-slate-200 bg-white p-5 text-left shadow-[0_18px_48px_rgba(15,23,42,0.07)] transition-colors"
    >
      <div
        className="flex h-24 items-center justify-center rounded-lg border border-slate-100 p-4 transition-colors group-hover:border-transparent"
        style={{ backgroundColor: meta.soft }}
      >
        <Image
          src={meta.logo}
          alt={`${meta.brand} logo`}
          width={220}
          height={92}
          className="max-h-16 w-auto object-contain"
        />
      </div>
      <div className="mt-5 flex items-center justify-between gap-3">
        <p className="text-lg font-semibold text-slate-950">{meta.brand}</p>
        <span
          className={cn(
            "rounded-lg px-2.5 py-1 text-xs font-medium",
            recommended ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600",
          )}
        >
          {recommended ? "Recommended" : statusLabel(simulation.partnerStatus)}
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-600">{simulation.title}</p>
      <div className="mt-auto pt-5">
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-500">
          <span className="rounded-lg bg-slate-50 px-3 py-2">{simulation.durationMinutes} min</span>
          <span className="rounded-lg bg-slate-50 px-3 py-2">{simulation.difficulty}</span>
          <span className="col-span-2 rounded-lg bg-slate-50 px-3 py-2">{simulation.careerPath}</span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {simulation.skillsTested.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-600"
            >
              {skill}
            </span>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between text-sm font-semibold text-slate-950">
          <span>Start simulation</span>
          <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </motion.button>
  );
}

function CompactSimulationButton({
  simulation,
  onOpen,
}: {
  simulation: Simulation;
  onOpen: () => void;
}) {
  const meta = getMeta(simulation);
  return (
    <motion.button
      type="button"
      whileHover={{ x: 4 }}
      onClick={onOpen}
      className="flex items-center gap-4 rounded-lg border border-slate-200 bg-[#f8fafc] p-4 text-left transition-colors hover:border-slate-300"
    >
      <span className="flex h-14 w-24 shrink-0 items-center justify-center rounded-lg bg-white p-3">
        <Image src={meta.logo} alt="" width={120} height={48} className="max-h-9 w-auto object-contain" />
      </span>
      <span className="min-w-0">
        <span className="block font-semibold text-slate-950">{simulation.title}</span>
        <span className="mt-1 block text-sm text-slate-500">
          {simulation.durationMinutes} min · {simulation.difficulty} · {simulation.careerPath}
        </span>
      </span>
    </motion.button>
  );
}

function SimulationDetailPage({
  simulation,
  setPage,
}: {
  simulation: Simulation;
  setPage: (page: DemoPage) => void;
}) {
  const meta = getMeta(simulation);

  return (
    <div>
      <PageTitle
        label="Simulation detail"
        title={simulation.title}
        text={simulation.description}
      />
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid gap-5 xl:grid-cols-[0.75fr_1.25fr]">
        <motion.section variants={slideInLeft} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex h-32 items-center justify-center rounded-lg p-6" style={{ backgroundColor: meta.soft }}>
            <Image src={meta.logo} alt={`${meta.brand} logo`} width={260} height={110} className="max-h-24 w-auto object-contain" />
          </div>
          <div className="mt-6">
            <p className="text-sm font-semibold text-slate-500">{meta.brand}</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">{simulation.role}</h2>
            <p className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm leading-6 text-amber-900">
              {simulation.disclaimer}
            </p>
          </div>
          <motion.div variants={staggerContainer} className="mt-6 grid grid-cols-2 gap-3">
            {[
              [Clock3, `${simulation.durationMinutes} minutes`],
              [BarChart3, simulation.difficulty],
              [BriefcaseBusiness, simulation.industry],
              [BadgeCheck, statusLabel(simulation.partnerStatus)],
            ].map(([Icon, label]) => {
              const TypedIcon = Icon as LucideIcon;
              return (
                <motion.div key={label as string} variants={fadeUp} className="rounded-lg border border-slate-200 bg-[#f8fafc] p-4">
                  <TypedIcon className="size-5 text-teal-700" />
                  <p className="mt-3 text-sm font-semibold text-slate-950">{label as string}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.section>

        <motion.section variants={slideInRight} className="grid gap-5">
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-950">Case context</h2>
            <p className="mt-4 leading-8 text-slate-600">{simulation.scenario}</p>
            <div className="mt-6 rounded-lg bg-slate-950 p-5 text-white">
              <p className="text-sm text-teal-300">Your mission</p>
              <p className="mt-2 leading-7">{simulation.userMission}</p>
            </div>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-950">Tasks</h2>
              <div className="mt-5 space-y-3">
                {simulation.tasks.map((task) => (
                  <div key={task.id} className="flex items-start gap-3 rounded-lg bg-slate-50 p-3">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-white text-sm font-semibold text-slate-700">
                      {task.stepNumber}
                    </span>
                    <p className="text-sm font-medium text-slate-700">{task.title}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-950">Skills tested</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {simulation.skillsTested.map((skill) => (
                  <span key={skill} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                    {skill}
                  </span>
                ))}
              </div>
              <PrimaryButton onClick={() => setPage("runner")} className="mt-6 w-full" icon={PlayCircle}>
                Start simulation
              </PrimaryButton>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}

function SimulationRunnerPage({
  simulation,
  setPage,
}: {
  simulation: Simulation;
  setPage: (page: DemoPage) => void;
}) {
  const [taskIndex, setTaskIndex] = useState(0);
  const [taskAnswers, setTaskAnswers] = useState<Record<string, string | string[]>>({});
  const task = simulation.tasks[taskIndex];
  const progress = ((taskIndex + 1) / simulation.tasks.length) * 100;
  const meta = getMeta(simulation);
  const selectedAnswer = taskAnswers[task.id];
  const isMultiTask = task.taskType === "multi_select" || task.taskType === "data_selection" || task.taskType === "ranking";
  const maxSelections = task.maxSelections ?? task.options?.length ?? 1;
  const selectedOptionIds = Array.isArray(selectedAnswer)
    ? selectedAnswer
    : typeof selectedAnswer === "string" && task.options
      ? [selectedAnswer]
      : [];
  const hasTaskAnswer = Array.isArray(selectedAnswer)
    ? selectedAnswer.length > 0
    : typeof selectedAnswer === "string"
      ? selectedAnswer.trim().length > 0
      : false;

  function setTaskAnswer(answer: string | string[]) {
    setTaskAnswers((current) => ({ ...current, [task.id]: answer }));
  }

  function toggleOption(optionId: string) {
    if (!isMultiTask) {
      setTaskAnswer(optionId);
      return;
    }

    const currentlySelected = selectedOptionIds.includes(optionId);
    if (currentlySelected) {
      setTaskAnswer(selectedOptionIds.filter((id) => id !== optionId));
      return;
    }

    if (selectedOptionIds.length >= maxSelections) return;
    setTaskAnswer([...selectedOptionIds, optionId]);
  }

  function nextTask() {
    if (taskIndex < simulation.tasks.length - 1) {
      setTaskIndex(taskIndex + 1);
    } else {
      setPage("feedback");
    }
  }

  return (
    <div>
      <PageTitle
        label="Simulation runner"
        title={`${meta.brand} case environment`}
        text="A professional case workspace with task steps, working documents, manager context, and structured decisions."
      />
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid gap-5 xl:grid-cols-[260px_minmax(0,1fr)_360px]">
        <motion.aside variants={slideInLeft} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-200 pb-5">
            <div className="flex size-12 items-center justify-center rounded-lg p-2" style={{ backgroundColor: meta.soft }}>
              <Image src={meta.logo} alt="" width={92} height={42} className="max-h-8 w-auto object-contain" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-950">{simulation.role}</p>
              <p className="text-xs text-slate-500">{simulation.durationMinutes} min estimate</p>
            </div>
          </div>
          <div className="mt-5">
            <div className="mb-2 flex justify-between text-sm text-slate-500">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <ProgressBar value={progress} color={meta.accent} />
          </div>
          <div className="mt-6 space-y-2">
            {simulation.tasks.map((item, index) => (
              <button
                type="button"
                key={item.id}
                onClick={() => setTaskIndex(index)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm transition-colors",
                  index === taskIndex ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-700 hover:bg-slate-100",
                )}
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-white/16 text-xs font-semibold">
                  {index < taskIndex ? <Check className="size-3.5" /> : index + 1}
                </span>
                {item.title}
              </button>
            ))}
          </div>
        </motion.aside>

        <motion.section variants={scaleIn} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="text-sm font-semibold text-teal-700">Task {task.stepNumber}</p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-950">{task.title}</h2>
            </div>
            <span className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-600">
              {task.taskType.replace("_", " ")}
            </span>
          </div>
          <p className="mt-6 text-lg leading-8 text-slate-700">{task.prompt}</p>
          {task.context ? <p className="mt-3 leading-7 text-slate-500">{task.context}</p> : null}
          {task.options && isMultiTask ? (
            <div className="mt-5 inline-flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-800">
              <CheckCircle2 className="size-4" />
              Select up to {maxSelections}. Selected {selectedOptionIds.length}.
            </div>
          ) : null}
          <div className="mt-8 space-y-3">
            {task.options ? (
              task.options.map((option) => {
                const active = selectedOptionIds.includes(option.id);
                const rank = selectedOptionIds.indexOf(option.id) + 1;
                const disabledByLimit = isMultiTask && !active && selectedOptionIds.length >= maxSelections;

                return (
                  <motion.button
                    type="button"
                    key={option.id}
                    onClick={() => toggleOption(option.id)}
                    whileHover={disabledByLimit ? undefined : { x: 4 }}
                    disabled={disabledByLimit}
                    className={cn(
                      "w-full rounded-lg border p-4 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-55",
                      active
                        ? "border-blue-500 bg-blue-50"
                        : "border-slate-200 bg-[#f8fafc] hover:border-slate-300",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "flex size-6 shrink-0 items-center justify-center rounded-lg border text-xs font-semibold",
                          active
                            ? "border-blue-500 bg-blue-600 text-white"
                            : "border-slate-300 bg-white text-transparent",
                        )}
                      >
                        {task.taskType === "ranking" && active ? rank : <Check className="size-3.5" />}
                      </span>
                      <span className="font-medium text-slate-800">{option.label}</span>
                    </div>
                  </motion.button>
                );
              })
            ) : (
              <textarea
                className="min-h-44 w-full rounded-lg border border-slate-200 bg-[#f8fafc] p-4 text-sm outline-none transition-colors focus:border-blue-400"
                placeholder="Write your recommendation..."
                value={typeof selectedAnswer === "string" ? selectedAnswer : ""}
                onChange={(event) => setTaskAnswer(event.target.value)}
              />
            )}
          </div>
          {task.expectedThinking?.length ? (
            <details className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
              <summary className="cursor-pointer text-sm font-semibold text-slate-950">
                What professionals consider
              </summary>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                {task.expectedThinking.map((thought) => (
                  <li key={thought} className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-teal-700" />
                    {thought}
                  </li>
                ))}
              </ul>
            </details>
          ) : null}
          <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-5">
            <p className="text-sm text-slate-500">
              {taskIndex + 1} of {simulation.tasks.length} tasks
            </p>
            <PrimaryButton
              onClick={nextTask}
              icon={taskIndex === simulation.tasks.length - 1 ? Trophy : ArrowRight}
              disabled={!hasTaskAnswer}
            >
              {taskIndex === simulation.tasks.length - 1 ? "Finish case" : "Next task"}
            </PrimaryButton>
          </div>
        </motion.section>

        <motion.aside variants={slideInRight} className="space-y-4">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-950">Data room</h2>
              <Database className="size-5 text-slate-400" />
            </div>
            <motion.div variants={staggerContainer} initial="hidden" animate="show" className="mt-5 space-y-3">
              {simulation.dataRoom.documents.map((document) => (
                <motion.div key={document.id} variants={fadeUp} className="rounded-lg border border-slate-200 bg-[#f8fafc] p-4">
                  <div className="flex items-center gap-2">
                    <FileText className="size-4 text-teal-700" />
                    <p className="text-sm font-semibold text-slate-950">{document.title}</p>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{document.content}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <Mail className="size-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-slate-950">Manager email</h2>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Please keep the recommendation practical. We need the first decision backed by the
              available evidence, not a perfect answer.
            </p>
          </div>
        </motion.aside>
      </motion.div>
    </div>
  );
}

function SimulationFeedbackPage({
  simulation,
  profile,
  setPage,
}: {
  simulation: Simulation;
  profile: CareerProfile | null;
  setPage: (page: DemoPage) => void;
}) {
  const meta = getMeta(simulation);
  const topMatch = profile?.matches[0];

  return (
    <div>
      <PageTitle
        label="Simulation feedback"
        title="Results dashboard"
        text="The case result strengthens or challenges your assessment-driven recommendation."
      />
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid gap-5">
        <motion.section variants={fadeUp} className="grid gap-5 xl:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Overall result</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950">Strong fit signal</h2>
            <p className="mt-4 leading-7 text-slate-600">{simulation.finalFeedbackTemplate.strongPerformance}</p>
          </div>
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-6 shadow-sm">
            <p className="text-sm text-emerald-700">Career fit update</p>
            <div className="mt-2 flex items-end gap-2">
              <CountUp value={Math.min(96, (topMatch?.score ?? 84) + 5)} suffix="%" className="text-5xl font-semibold text-emerald-950" />
              <span className="pb-2 text-sm font-semibold text-emerald-700">+5 evidence</span>
            </div>
            <ProgressBar value={Math.min(96, (topMatch?.score ?? 84) + 5)} color={productPalette.green} className="mt-5" />
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
            <p className="text-sm text-teal-300">Simulation score</p>
            <div className="mt-2 flex items-end gap-2">
              <CountUp value={88} suffix="/100" className="text-5xl font-semibold" />
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-300">
              Strongest signals: prioritization, commercial judgment, and recommendation clarity.
            </p>
          </div>
        </motion.section>

        <motion.section variants={fadeUp} className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr_1fr]">
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-950">Skill radar</h2>
            <div className="mt-5 h-72">
              <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 360, height: 288 }}>
                <RadarChart
                  data={[
                    { skill: "Product thinking", value: 91 },
                    { skill: "Commercial instinct", value: 86 },
                    { skill: "Decision style", value: 80 },
                    { skill: "User empathy", value: 84 },
                    { skill: "Metrics", value: 76 },
                    { skill: "Communication", value: 82 },
                  ]}
                >
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="skill" tick={{ fill: "#64748b", fontSize: 11 }} />
                  <Radar dataKey="value" stroke={meta.accent} fill={meta.accent} fillOpacity={0.2} strokeWidth={3} isAnimationActive animationDuration={1100} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-950">Skill breakdown</h2>
            <div className="mt-5 h-72">
              <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 520, height: 288 }}>
                <BarChart
                  data={[
                    { skill: "Segmentation", score: 92 },
                    { skill: "Prioritization", score: 84 },
                    { skill: "Product thinking", score: 88 },
                    { skill: "Communication", score: 79 },
                    { skill: "Metrics", score: 76 },
                  ]}
                  layout="vertical"
                  margin={{ left: 24 }}
                >
                  <CartesianGrid stroke="#e2e8f0" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} hide />
                  <YAxis type="category" dataKey="skill" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} width={116} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0" }} />
                  <Bar dataKey="score" fill={productPalette.blue} radius={[0, 6, 6, 0]} isAnimationActive animationDuration={1200} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-950">Next steps</h2>
            <div className="mt-5 space-y-3">
              {[
                simulation.finalFeedbackTemplate.reflectionPrompt,
                simulation.finalFeedbackTemplate.suggestedNextStep,
                "Add this evidence to your Career Map and roadmap.",
              ].map((item) => (
                <div key={item} className="flex gap-3 rounded-lg bg-slate-50 p-3 text-sm leading-6 text-slate-700">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
          <PrimaryButton onClick={() => setPage("map")} icon={Map}>
            View Career Map
          </PrimaryButton>
          <PrimaryButton onClick={() => setPage("roadmap")} variant="light" icon={Route}>
            Update roadmap
          </PrimaryButton>
        </motion.div>
      </motion.div>
    </div>
  );
}

function RoadmapPage({ profile, setPage }: { profile: CareerProfile | null; setPage: (page: DemoPage) => void }) {
  const [completed, setCompleted] = useState<string[]>(() => loadRoadmapProgress());

  useEffect(() => {
    saveRoadmapProgress(completed);
  }, [completed]);

  if (!profile?.completed) {
    return (
      <div>
        <PageTitle
          label="Roadmap"
          title="Your roadmap is built from your recommended path."
          text="Complete the assessment to receive a 30-day, 90-day, and 12-month plan."
        />
        <EmptyState
          title="Complete Career Discovery to generate your personalized roadmap."
          text="The roadmap will include skills to learn, simulations to complete, projects to build, companies to follow, and target roles."
          onStart={() => setPage("discovery")}
          icon={Route}
        />
      </div>
    );
  }

  const topMatch = profile.matches[0];
  const periods = [
    {
      id: "30",
      title: "30-day plan",
      subtitle: "Build foundations and test the first path",
      icon: Flag,
      color: productPalette.blue,
      tasks: topMatch.roadmap.thirty,
    },
    {
      id: "90",
      title: "90-day plan",
      subtitle: "Create portfolio evidence and talk to professionals",
      icon: Route,
      color: productPalette.teal,
      tasks: topMatch.roadmap.ninety,
    },
    {
      id: "12",
      title: "12-month plan",
      subtitle: "Build track record and apply with proof",
      icon: Trophy,
      color: productPalette.green,
      tasks: topMatch.roadmap.twelveMonths,
    },
  ];

  return (
    <div>
      <PageTitle
        label="Roadmap"
        title={`Your roadmap for ${topMatch.title}`}
        text="A personalized action plan with milestones, status states, simulations, resources, and skills to improve."
      />
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid gap-5">
        <motion.section variants={fadeUp} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-center">
            <div>
              <p className="text-sm font-semibold text-teal-700">Roadmap priorities</p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-950">From evidence to application readiness</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {topMatch.entryRoles.map((role) => (
                <span key={role} className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700">
                  {role}
                </span>
              ))}
            </div>
          </div>
        </motion.section>

        <div className="grid gap-5 xl:grid-cols-3">
          {periods.map((period) => (
            <motion.section key={period.id} variants={fadeUp} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold" style={{ color: period.color }}>
                    {period.title}
                  </p>
                  <h2 className="mt-1 text-2xl font-semibold text-slate-950">{period.subtitle}</h2>
                </div>
                <span className="flex size-10 items-center justify-center rounded-lg text-white" style={{ backgroundColor: period.color }}>
                  <period.icon className="size-5" />
                </span>
              </div>
              <div className="mt-6 space-y-3">
                {period.tasks.map((task, index) => {
                  const id = `${period.id}-${index}`;
                  const done = completed.includes(id);
                  return (
                    <motion.button
                      type="button"
                      key={id}
                      layout
                      onClick={() =>
                        setCompleted((current) =>
                          current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
                        )
                      }
                      whileHover={{ x: 3 }}
                      className={cn(
                        "w-full rounded-lg border p-4 text-left transition-colors",
                        done ? "border-emerald-200 bg-emerald-50" : "border-slate-200 bg-[#f8fafc]",
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={cn(
                            "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-lg border",
                            done ? "border-emerald-500 bg-emerald-600 text-white" : "border-slate-300 bg-white text-transparent",
                          )}
                        >
                          <Check className="size-3.5" />
                        </span>
                        <div>
                          <p className={cn("text-sm font-semibold", done ? "text-emerald-950" : "text-slate-800")}>
                            {task}
                          </p>
                          <p className="mt-2 text-xs text-slate-500">
                            Skill targeted · {topMatch.gaps[index % topMatch.gaps.length]?.label ?? "career evidence"} · high priority
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.section>
          ))}
        </div>

        <motion.section variants={fadeUp} className="grid gap-5 xl:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-950">Companies to follow</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {topMatch.companiesToFollow.map((company) => (
                <span key={company} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700">
                  <Building2 className="size-4" />
                  {company}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-950">Skills to improve first</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {topMatch.skillGaps.map((gap) => (
                <span key={gap} className="inline-flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-900">
                  <Wrench className="size-4" />
                  {gap}
                </span>
              ))}
            </div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}

function PricingPage({ setPage }: { setPage: (page: DemoPage) => void }) {
  const plans = [
    {
      name: "Free",
      price: "EUR 0",
      text: "Start the map and complete starter simulations.",
      items: ["Career profile", "Initial Career Map", "Two simulations", "Basic roadmap"],
      featured: false,
    },
    {
      name: "Premium Report",
      price: "EUR 9.99",
      text: "Export a polished report for decisions and advising.",
      items: ["Full Career Passport", "Before vs after evidence", "Detailed feedback", "PDF report export"],
      featured: true,
    },
    {
      name: "Premium + Human Review",
      price: "EUR 24.99",
      text: "Add expert review for applications and next steps.",
      items: ["Everything in Premium", "Human review", "Roadmap refinement", "Advisor-ready summary"],
      featured: false,
    },
  ];

  return (
    <div>
      <PageTitle
        label="Pricing"
        title="Simple pricing for student confidence."
        text="Clean tiers for a prototype that can become university, advisor, or direct-to-student revenue."
      />
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid gap-5 xl:grid-cols-3">
        {plans.map((plan) => (
          <motion.section
            key={plan.name}
            variants={fadeUp}
            whileHover={{ y: -8, scale: 1.01 }}
            className={cn(
              "rounded-lg border bg-white p-7 shadow-sm",
              plan.featured
                ? "border-blue-300 shadow-[0_24px_70px_rgba(37,99,235,0.14)]"
                : "border-slate-200",
            )}
          >
            {plan.featured ? (
              <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-700">
                Featured
              </span>
            ) : null}
            <h2 className="mt-5 text-2xl font-semibold text-slate-950">{plan.name}</h2>
            <p className="mt-4 text-5xl font-semibold text-slate-950">{plan.price}</p>
            <p className="mt-4 leading-7 text-slate-600">{plan.text}</p>
            <div className="mt-6 space-y-3">
              {plan.items.map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="size-5 text-emerald-600" />
                  {item}
                </div>
              ))}
            </div>
            <PrimaryButton
              onClick={() => setPage("waitlist")}
              className="mt-8 w-full"
              variant={plan.featured ? "dark" : "light"}
              icon={ArrowRight}
            >
              Join waitlist
            </PrimaryButton>
          </motion.section>
        ))}
      </motion.div>
    </div>
  );
}

function WaitlistConfirmationPage({ setPage }: { setPage: (page: DemoPage) => void }) {
  return (
    <div className="flex min-h-[calc(100vh-160px)] items-center justify-center">
      <motion.section
        initial={{ opacity: 1, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-3xl rounded-lg border border-slate-200 bg-white p-10 text-center shadow-[0_24px_80px_rgba(15,23,42,0.12)]"
      >
        <div className="mx-auto flex size-16 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
          <CheckCircle2 className="size-8" />
        </div>
        <p className="mt-6 text-sm font-semibold text-teal-700">Waitlist confirmation</p>
        <h1 className="mt-3 text-5xl font-semibold text-slate-950">You&apos;re on the list.</h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-slate-600">
          Career Compass will send early access for the premium report, human review, and university
          pilot workflow.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <PrimaryButton onClick={() => setPage("home")} icon={Home}>
            Back to dashboard
          </PrimaryButton>
          <PrimaryButton onClick={() => setPage("simulations")} variant="light" icon={BriefcaseBusiness}>
            Explore cases
          </PrimaryButton>
        </div>
      </motion.section>
    </div>
  );
}

export function CareerCompassExperience() {
  const questions = useMemo(() => getCareerDiscoveryQuestions(allQuestions), []);
  const [page, setPage] = useState<DemoPage>("landing");
  const [answers, setAnswers] = useState<AssessmentAnswers>({});
  const [hydrated, setHydrated] = useState(false);
  const [storedProfile, setStoredProfile] = useState<CareerProfile | null>(null);
  const [selectedSimulation, setSelectedSimulation] = useState<Simulation>(simulations[0]);

  useEffect(() => {
    let cancelled = false;

    queueMicrotask(() => {
      if (cancelled) return;
      const loadedAnswers = loadAssessmentAnswers();
      const loadedProfile = loadCareerProfile();
      setAnswers(loadedAnswers);
      setStoredProfile(loadedProfile);
      if (loadedProfile?.recommendedSimulationIds[0]) {
        const firstRecommended = simulations.find(
          (simulation) => simulation.id === loadedProfile.recommendedSimulationIds[0],
        );
        if (firstRecommended) setSelectedSimulation(firstRecommended);
      }
      setHydrated(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const liveProfile = useMemo(() => scoreAssessment(answers, questions), [answers, questions]);
  const profile = liveProfile.completed ? liveProfile : storedProfile?.completed ? storedProfile : liveProfile;

  useEffect(() => {
    if (!hydrated) return;
    saveAssessmentAnswers(answers);
    if (liveProfile.completed) {
      saveCareerProfile(liveProfile);
    }
  }, [answers, hydrated, liveProfile]);

  function setAnswer(questionId: string, value: AssessmentAnswerValue) {
    setAnswers((current) => ({ ...current, [questionId]: value }));
  }

  function completeAssessment() {
    const result = scoreAssessment(answers, questions);
    if (result.completed) {
      saveCareerProfile(result);
      setStoredProfile(result);
      const firstRecommended = simulations.find((simulation) => simulation.id === result.recommendedSimulationIds[0]);
      if (firstRecommended) setSelectedSimulation(firstRecommended);
      setPage("results");
    }
  }

  function resetAssessment() {
    resetCareerCompassStorage();
    setAnswers({});
    setStoredProfile(null);
    setPage("discovery");
  }

  function openSimulation(simulation: Simulation) {
    setSelectedSimulation(simulation);
    setPage("simulation-detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderAppContent() {
    switch (page) {
      case "home":
        return (
          <HomeDashboardPage
            profile={profile}
            setPage={setPage}
            onOpenSimulation={openSimulation}
          />
        );
      case "discovery":
        return (
          <CareerDiscoveryPage
            questions={questions}
            answers={answers}
            profile={liveProfile}
            onAnswer={setAnswer}
            onComplete={completeAssessment}
            onReset={resetAssessment}
          />
        );
      case "results":
        return (
          <ResultsPage
            profile={profile}
            setPage={setPage}
            onOpenSimulation={openSimulation}
            onReset={resetAssessment}
          />
        );
      case "map":
        return <CareerMapPage profile={profile} setPage={setPage} onOpenSimulation={openSimulation} />;
      case "simulations":
        return <SimulationHubPage profile={profile} setPage={setPage} onOpenSimulation={openSimulation} />;
      case "simulation-detail":
        return <SimulationDetailPage simulation={selectedSimulation} setPage={setPage} />;
      case "runner":
        return <SimulationRunnerPage simulation={selectedSimulation} setPage={setPage} />;
      case "feedback":
        return <SimulationFeedbackPage simulation={selectedSimulation} profile={profile} setPage={setPage} />;
      case "roadmap":
        return <RoadmapPage profile={profile} setPage={setPage} />;
      case "pricing":
        return <PricingPage setPage={setPage} />;
      case "waitlist":
        return <WaitlistConfirmationPage setPage={setPage} />;
      default:
        return <HomeDashboardPage profile={profile} setPage={setPage} onOpenSimulation={openSimulation} />;
    }
  }

  if (page === "landing") {
    return (
      <LandingPage
        onStart={() => setPage(profile.completed ? "home" : "discovery")}
        onOpenSimulation={openSimulation}
      />
    );
  }

  return (
    <AppShell page={page} setPage={setPage} profile={profile} selectedSimulation={selectedSimulation}>
      {renderAppContent()}
    </AppShell>
  );
}
