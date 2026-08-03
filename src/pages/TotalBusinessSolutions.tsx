import { FormEvent, useMemo, useState, type ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Check,
  ChevronRight,
  CircleDollarSign,
  Dumbbell,
  GraduationCap,
  Handshake,
  LineChart,
  MessageSquare,
  Minus,
  Play,
  Plus,
  Smartphone,
  Sparkles,
  Target,
  Users,
  Workflow,
  X,
  type LucideIcon
} from 'lucide-react';
import { BRAND } from '../constants/assets';

type ModuleKey = 'coaching' | 'trainerize' | 'crm' | 'education' | 'payments' | 'mentoring';
type ProblemKey = 'leads' | 'convert' | 'systems' | 'payments' | 'support' | 'plan';
type JourneyKey = 'lead' | 'follow-up' | 'jumpstart' | 'coached' | 'payment' | 'retained' | 'growth';
type PathKey = 'starting' | 'training' | 'scaling';
type DetailKey = 'model' | 'app' | 'crm' | 'education' | 'payments' | 'mentoring';

const modules: Record<ModuleKey, {
  label: string;
  short: string;
  icon: LucideIcon;
  title: string;
  copy: string;
  bullets: string[];
  cta: string;
}> = {
  coaching: {
    label: 'Elite Coaching Model',
    short: 'Structured delivery',
    icon: Dumbbell,
    title: 'Elite Coaching Model: move beyond session-by-session PT.',
    copy: 'A repeatable coaching structure helps trainers create a more predictable week, clearer client expectations and a model that can support more people without simply adding more hours.',
    bullets: ['Recurring coaching access', 'Structured coaching blocks', 'Scalable service rhythm'],
    cta: 'Explore The Model'
  },
  trainerize: {
    label: 'Trainerize',
    short: 'Client delivery',
    icon: Smartphone,
    title: 'Trainerize: professional program delivery.',
    copy: 'Build workouts, track progress, message clients, support habits and deliver coaching through one professional client-facing app.',
    bullets: ['Workout delivery', 'Progress tracking', 'Client messaging'],
    cta: 'Explore Client Delivery'
  },
  crm: {
    label: 'Go High Level',
    short: 'Leads and follow-up',
    icon: Workflow,
    title: 'Go High Level: keep your business organised.',
    copy: 'Capture leads, manage conversations, automate follow-up and book consultations so opportunities do not disappear in text messages or social inboxes.',
    bullets: ['Lead pipeline', 'Automated follow-up', 'Booking pages'],
    cta: 'Show Me The Lead System'
  },
  education: {
    label: 'SKOOL',
    short: 'Education hub',
    icon: GraduationCap,
    title: 'SKOOL: education that gives trainers a path.',
    copy: 'Onboarding, sales, retention, lead generation and business systems are organised into a learning hub trainers can return to as they grow.',
    bullets: ['Onboarding', 'Sales and retention', 'Head coach Q&A'],
    cta: 'See The Learning Path'
  },
  payments: {
    label: 'Debit Success',
    short: 'Payment systems',
    icon: CircleDollarSign,
    title: 'Debit Success: payments handled professionally.',
    copy: 'Direct debit systems help remove awkward payment chasing, track client agreements and reduce the admin that takes trainers away from coaching.',
    bullets: ['Direct debit flow', 'Payment tracking', 'Less manual admin'],
    cta: 'Explore Payments'
  },
  mentoring: {
    label: 'Mentoring',
    short: 'Human support',
    icon: Handshake,
    title: 'Mentoring: the support that makes the system stick.',
    copy: 'BIFC head coaches and managers help trainers turn tools into a working business rhythm through guidance, reviews, workshops and community.',
    bullets: ['Weekly development', 'Manager support', 'Workshops and community'],
    cta: 'See The Support'
  }
};

const problemTiles: Record<ProblemKey, {
  label: string;
  icon: LucideIcon;
  title: string;
  body: string;
  tools: ModuleKey[];
}> = {
  leads: {
    label: 'I need more leads',
    icon: Target,
    title: 'TBS helps you turn leads into conversations, bookings and clients.',
    body: 'Through Go High Level, lead generation education, follow-up systems and mentoring, trainers can manage enquiries properly instead of relying on memory or scattered messages.',
    tools: ['crm', 'education', 'mentoring']
  },
  convert: {
    label: 'I struggle to convert',
    icon: MessageSquare,
    title: 'TBS helps trainers make the next step clearer.',
    body: 'Sales training, consultation structure and CRM follow-up help trainers move from casual conversations to booked Jumpstarts and active coaching clients.',
    tools: ['education', 'crm', 'coaching']
  },
  systems: {
    label: 'I need better systems',
    icon: Workflow,
    title: 'TBS connects the moving parts of a PT business.',
    body: 'Instead of notes, spreadsheets and separate apps, trainers get a connected operating rhythm across leads, programming, payments, learning and support.',
    tools: ['coaching', 'trainerize', 'crm']
  },
  payments: {
    label: 'I hate chasing payments',
    icon: CircleDollarSign,
    title: 'TBS makes payments feel professional, not personal.',
    body: 'Debit Success supports agreements, direct debit and payment tracking so trainers can reduce awkward admin and focus on service delivery.',
    tools: ['payments', 'coaching', 'mentoring']
  },
  support: {
    label: 'I want more support',
    icon: Users,
    title: 'TBS gives trainers a system with people behind it.',
    body: 'Education is supported by mentoring, manager guidance, workshops and community so trainers are not left alone to figure it out.',
    tools: ['mentoring', 'education', 'coaching']
  },
  plan: {
    label: "I'm new and need a plan",
    icon: BookOpen,
    title: 'TBS gives new trainers a business path before they walk into the club.',
    body: 'Onboarding, SKOOL education, Jumpstart structure and mentoring help new trainers start with clarity instead of guesswork.',
    tools: ['education', 'mentoring', 'crm']
  }
};

const chaosBullets = [
  ['Leads are easy to lose', 'Leads are tracked'],
  ['Sessions depend on client availability', 'Clients are coached through a system'],
  ['Payments can become awkward', 'Payments are professionally managed'],
  ['Follow-up is manual', 'Follow-up has a process'],
  ['Growth feels unclear', 'Education gives trainers a plan']
];

const journeySteps: Record<JourneyKey, {
  title: string;
  what: string;
  tool: string;
  why: string;
}> = {
  lead: {
    title: 'Lead appears',
    what: 'A new enquiry is captured instead of sitting in a text thread or inbox.',
    tool: 'Go High Level',
    why: 'New opportunities are easier to track, prioritise and follow up.'
  },
  'follow-up': {
    title: 'Follow-up happens',
    what: 'The trainer has a next step and can stay in contact without relying on memory.',
    tool: 'Go High Level + SKOOL',
    why: 'Consistent follow-up creates more conversations and fewer missed opportunities.'
  },
  jumpstart: {
    title: 'Jumpstart is booked',
    what: 'A prospective client moves into a structured first experience.',
    tool: 'Elite Coaching Model',
    why: 'The client sees professionalism early, not a casual session-by-session offer.'
  },
  coached: {
    title: 'Client gets coached',
    what: 'Programming, progress and communication live in a professional delivery system.',
    tool: 'Trainerize',
    why: 'Clients know what to do between sessions and trainers can support more effectively.'
  },
  payment: {
    title: 'Payment runs',
    what: 'The agreement and direct debit flow are handled through a proper system.',
    tool: 'Debit Success',
    why: 'Less awkward admin means more focus on service and retention.'
  },
  retained: {
    title: 'Client is retained',
    what: 'Habits, accountability, programming and communication keep the client engaged.',
    tool: 'Trainerize + Mentoring',
    why: 'Retention improves when clients feel coached, not just trained.'
  },
  growth: {
    title: 'Trainer grows',
    what: 'The trainer reviews, learns and improves with support.',
    tool: 'SKOOL + Mentoring',
    why: 'Growth becomes a rhythm rather than a guessing game.'
  }
};

const pathContent: Record<PathKey, {
  label: string;
  message: string;
  cta: string;
  items: string[];
}> = {
  starting: {
    label: "I'm just starting",
    message: 'Start with a plan before you walk into the club.',
    cta: 'Start With Support',
    items: ['Onboarding', 'SKOOL', 'Jumpstart Program', 'Mentoring', 'Business setup']
  },
  training: {
    label: "I'm already training clients",
    message: 'Professionalise the way you manage clients, leads and payments.',
    cta: 'Improve My Systems',
    items: ['Trainerize', 'Go High Level', 'Debit Success', 'Retention support']
  },
  scaling: {
    label: 'I want to grow or scale',
    message: 'Move from session-by-session training to a more scalable coaching model.',
    cta: 'Explore Growth Support',
    items: ['Elite Coaching Model', 'CRM automations', 'Lead systems', 'Business mentoring']
  }
};

const detailTabs: Record<DetailKey, {
  label: string;
  title: string;
  sentence: string;
  benefits: string[];
  example: string;
  visual: ReactNode;
}> = {
  model: {
    label: 'Coaching Model',
    title: 'The Elite Coaching Model creates structure.',
    sentence: 'It helps trainers stop relying only on ad hoc sessions and build a more professional coaching rhythm.',
    benefits: ['Recurring coaching access', 'More predictable work week', 'Clearer client expectations'],
    example: 'A trainer can set coaching blocks and support more clients without their calendar becoming chaos.',
    visual: <CalendarMockup />
  },
  app: {
    label: 'Client App',
    title: 'Trainerize keeps delivery visible.',
    sentence: 'Clients can see workouts, messages, habits and progress without needing everything explained manually.',
    benefits: ['Deliver programs', 'Track progress', 'Message clients'],
    example: 'A client who misses a session still has their program, habits and accountability inside the app.',
    visual: <PhoneMockup />
  },
  crm: {
    label: 'CRM',
    title: 'Go High Level keeps leads moving.',
    sentence: 'It helps trainers organise contacts, follow-ups, bookings and communication.',
    benefits: ['Track leads and contacts', 'Automate follow-up', 'Manage bookings'],
    example: 'A member you spoke to three months ago can still receive helpful follow-ups instead of disappearing from your pipeline.',
    visual: <PipelineMockup />
  },
  education: {
    label: 'Education',
    title: 'SKOOL turns learning into a pathway.',
    sentence: 'Education is organised around the real stages of building a PT business.',
    benefits: ['Onboarding', 'Sales training', 'Retention and business systems'],
    example: 'A new trainer can work through the foundations before their first serious client conversation.',
    visual: <LearningMockup />
  },
  payments: {
    label: 'Payments',
    title: 'Debit Success makes payments professional.',
    sentence: 'Payment systems help reduce awkward chasing and messy admin.',
    benefits: ['Direct debit agreements', 'Payment tracking', 'Less manual follow-up'],
    example: 'The trainer can focus on coaching while the payment flow runs through a clear system.',
    visual: <PaymentMockup />
  },
  mentoring: {
    label: 'Mentoring',
    title: 'Mentoring keeps the system human.',
    sentence: 'Support from experienced people helps trainers apply the tools instead of just having access to them.',
    benefits: ['Weekly development', 'Manager support', 'Workshops and community'],
    example: 'A trainer can review their business rhythm, get guidance and make better decisions each week.',
    visual: <MentoringMockup />
  }
};

const proofStats = [
  ['15+ years', 'Industry experience supporting trainers.'],
  ['Thousands of trainers', 'Systems shaped by working with trainers across clubs.'],
  ['Ongoing support', 'Head coaches and managers help trainers keep improving.']
];

const faqItems = [
  ['How does the Elite Coaching Model work?', 'It gives trainers a repeatable service structure so client delivery, scheduling and support are not built from scratch every week.'],
  ['What is Trainerize used for?', 'Trainerize supports workout delivery, habit tracking, client messaging, progress visibility and accountability between sessions.'],
  ['What does Go High Level do?', 'Go High Level helps organise leads, contacts, automations, booking links and follow-up so trainers can manage opportunities professionally.'],
  ['What is included in SKOOL?', 'SKOOL houses onboarding, sales, lead generation, Jumpstart, retention, business systems, workshops and head coach Q&A resources.'],
  ['How does Debit Success help?', 'It supports direct debit agreements and payment tracking so trainers can reduce awkward payment chasing.'],
  ['Is TBS for new or experienced trainers?', 'Both. New trainers get a clearer starting plan, and experienced trainers can tighten their systems, delivery and growth rhythm.'],
  ['What happens after I enquire?', 'A real team member will speak with you about your goals, experience and whether TBS is the right fit.']
];

export default function TotalBusinessSolutions() {
  const [selectedProblem, setSelectedProblem] = useState<ProblemKey>('leads');
  const [activeModule, setActiveModule] = useState<ModuleKey>('crm');
  const [systemMode, setSystemMode] = useState<'without' | 'with'>('with');
  const [activeJourney, setActiveJourney] = useState<JourneyKey>('lead');
  const [activePath, setActivePath] = useState<PathKey>('starting');
  const [activeDetail, setActiveDetail] = useState<DetailKey>('crm');
  const [submitted, setSubmitted] = useState(false);

  const selectedProblemData = problemTiles[selectedProblem];
  const activeModuleData = modules[activeModule];
  const activeJourneyData = journeySteps[activeJourney];
  const activePathData = pathContent[activePath];
  const activeDetailData = detailTabs[activeDetail];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const activateModule = (module: ModuleKey) => {
    setActiveModule(module);
    window.setTimeout(() => scrollTo('system'), 50);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background-main text-text-primary">
      <Helmet>
        <title>Total Business Solutions | Be Inspired Fitness and Coaching</title>
        <meta
          name="description"
          content="Total Business Solutions gives BIFC trainers the systems, software, education and mentoring to build a professional PT business from day one."
        />
        <link rel="canonical" href="https://www.beinspiredfitnessandcoaching.com/total-business-solutions" />
      </Helmet>

      <section id="overview" className="relative flex min-h-[88vh] items-center overflow-hidden pt-24">
        <div className="absolute inset-0">
          <video
            className="h-full w-full object-cover motion-safe:animate-[tbsSlowZoom_9s_ease-out_forwards]"
            autoPlay
            muted
            loop
            playsInline
            poster={BRAND.HERO_IMAGE}
          >
            <source src="https://videos.pexels.com/video-files/5319759/5319759-uhd_2560_1440_25fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-background-main via-background-main/80 to-background-main/15" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background-main to-transparent" />
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 pb-20 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
          <div>
            <motion.p
              className="mb-4 text-sm font-semibold uppercase text-accent-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45 }}
            >
              For Personal Trainers
            </motion.p>
            <motion.h1
              className="max-w-4xl text-4xl font-bold leading-[1.03] text-text-primary md:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08 }}
            >
              Most PTs Don't Fail Because They Can't Coach.
              <span className="mt-3 block text-accent-primary">They Fail Because No One Taught Them Business.</span>
            </motion.h1>
            <motion.p
              className="mt-6 max-w-2xl text-lg leading-8 text-text-secondary md:text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.65, delay: 0.18 }}
            >
              Total Business Solutions gives BIFC trainers the systems, software, education and mentoring to build a professional PT business from day one.
            </motion.p>
            <motion.div
              className="mt-9 flex flex-col gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.28 }}
            >
              <button onClick={() => scrollTo('problem')} className="inline-flex items-center justify-center bg-accent-primary px-8 py-4 font-semibold text-background-main transition hover:scale-[1.02] hover:bg-accent-hover">
                Find My Business Gap
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button onClick={() => scrollTo('system')} className="inline-flex items-center justify-center border border-text-primary px-8 py-4 font-semibold text-text-primary transition hover:bg-text-primary hover:text-background-main">
                See The System
              </button>
            </motion.div>
            <p className="mt-5 text-sm text-text-secondary">Built from 15+ years supporting trainers inside fitness clubs.</p>
          </div>

          <motion.button
            type="button"
            className="relative hidden aspect-[4/5] overflow-hidden border border-ui-border bg-background-section text-left shadow-2xl shadow-black/30 lg:block"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            aria-label="Play TBS explainer video"
          >
            <img
              src="https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&q=80&w=1200"
              alt="Trainer actively coaching a client inside a fitness club"
              className="h-full w-full object-cover"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-background-main via-transparent to-transparent" />
            <span className="absolute bottom-6 left-6 right-6 flex items-center justify-between border border-ui-border bg-background-main/85 p-4 backdrop-blur">
              <span>
                <span className="block text-sm font-semibold text-text-primary">See how TBS works</span>
                <span className="mt-1 block text-xs text-text-secondary">Explainer video placeholder</span>
              </span>
              <span className="flex h-12 w-12 items-center justify-center bg-accent-primary text-background-main">
                <Play className="h-5 w-5 fill-current" />
              </span>
            </span>
          </motion.button>
        </div>

        <button onClick={() => scrollTo('impact')} className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 text-sm text-text-secondary transition hover:text-accent-primary">
          Explore the system
          <ArrowDown className="h-4 w-4" />
        </button>
      </section>

      <section id="impact" className="border-y border-ui-border bg-background-section">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-4 text-sm sm:px-6 lg:px-8">
          <span className="font-semibold text-text-primary">TBS helps trainers with:</span>
          <ImpactLink label="Leads" onClick={() => activateModule('crm')} />
          <ImpactLink label="Sales" onClick={() => activateModule('education')} />
          <ImpactLink label="Programming" onClick={() => activateModule('trainerize')} />
          <ImpactLink label="Payments" onClick={() => activateModule('payments')} />
          <ImpactLink label="Retention" onClick={() => activateModule('coaching')} />
          <ImpactLink label="Support" onClick={() => activateModule('mentoring')} />
        </div>
      </section>

      <section id="problem" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Business Gap"
            title="What's Holding Your PT Business Back?"
            copy="Choose the one that sounds most like you."
            align="center"
          />
          <div className="mt-12 grid gap-3 md:grid-cols-3">
            {(Object.entries(problemTiles) as Array<[ProblemKey, typeof problemTiles[ProblemKey]]>).map(([key, item]) => {
              const Icon = item.icon;
              const selected = selectedProblem === key;

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedProblem(key)}
                  className={`group flex min-h-32 items-center gap-4 border p-5 text-left transition duration-300 hover:-translate-y-1 ${
                    selected ? 'border-accent-primary bg-accent-primary text-background-main' : 'border-ui-border bg-background-section hover:border-accent-primary'
                  }`}
                >
                  <Icon className={`h-7 w-7 ${selected ? 'text-background-main' : 'text-accent-primary'}`} />
                  <span className="text-lg font-bold">{item.label}</span>
                </button>
              );
            })}
          </div>

          <motion.div
            key={selectedProblem}
            className="mt-6 grid gap-8 border-t-4 border-accent-primary bg-background-section p-6 md:grid-cols-[1fr_360px]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div>
              <h3 className="text-2xl font-bold text-text-primary">{selectedProblemData.title}</h3>
              <p className="mt-4 leading-8 text-text-secondary">{selectedProblemData.body}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {selectedProblemData.tools.map((tool) => (
                  <button key={tool} onClick={() => activateModule(tool)} className="border border-ui-border px-3 py-2 text-sm font-semibold text-accent-primary transition hover:border-accent-primary">
                    {modules[tool].label}
                  </button>
                ))}
              </div>
            </div>
            <PipelineMini />
          </motion.div>
        </div>
      </section>

      <section id="system" className="bg-background-section py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="System Reveal"
            title="One System. Six Parts. Built To Help Trainers Succeed."
            copy="TBS connects the business side and coaching side of personal training, so trainers can manage the full client journey from lead to long-term result."
            align="center"
          />
          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_440px] lg:items-center">
            <div className="relative mx-auto grid w-full max-w-2xl grid-cols-2 gap-3 md:grid-cols-3">
              <div className="col-span-2 flex min-h-36 items-center justify-center border border-accent-primary bg-background-main md:col-span-3">
                <div className="text-center">
                  <p className="text-5xl font-bold text-text-primary">TBS</p>
                  <p className="mt-2 text-sm uppercase text-accent-primary">Integrated business system</p>
                </div>
              </div>
              {(Object.entries(modules) as Array<[ModuleKey, typeof modules[ModuleKey]]>).map(([key, module]) => {
                const Icon = module.icon;
                const selected = activeModule === key;

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveModule(key)}
                    className={`min-h-36 border p-4 text-left transition duration-300 hover:-translate-y-1 ${
                      selected ? 'scale-[1.02] border-accent-primary bg-accent-primary/15' : 'border-ui-border bg-background-main hover:border-accent-primary'
                    }`}
                  >
                    <Icon className="h-7 w-7 text-accent-primary" />
                    <p className="mt-4 font-bold text-text-primary">{module.label}</p>
                    <p className="mt-1 text-sm text-text-secondary">{module.short}</p>
                  </button>
                );
              })}
            </div>

            <motion.div
              key={activeModule}
              className="border border-ui-border bg-background-main p-6"
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-sm font-semibold uppercase text-accent-primary">{activeModuleData.label}</p>
              <h3 className="mt-3 text-2xl font-bold text-text-primary">{activeModuleData.title}</h3>
              <p className="mt-4 leading-7 text-text-secondary">{activeModuleData.copy}</p>
              <div className="mt-6 grid gap-2">
                {activeModuleData.bullets.map((bullet) => (
                  <div key={bullet} className="flex items-center gap-3 text-sm text-text-secondary">
                    <Check className="h-4 w-4 text-accent-highlight" />
                    {bullet}
                  </div>
                ))}
              </div>
              <div className="mt-7">
                <SystemVisual module={activeModule} />
              </div>
              <button onClick={() => scrollTo('details')} className="mt-7 inline-flex items-center bg-accent-primary px-5 py-3 font-semibold text-background-main transition hover:bg-accent-hover">
                {activeModuleData.cta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="compare" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Before And After"
            title="From Guesswork To A Real Business System"
            align="center"
          />
          <div className="mt-10 flex justify-center">
            <div className="grid grid-cols-2 border border-ui-border">
              <button onClick={() => setSystemMode('without')} className={`px-6 py-3 font-semibold ${systemMode === 'without' ? 'bg-text-primary text-background-main' : 'bg-background-section text-text-secondary'}`}>
                Without TBS
              </button>
              <button onClick={() => setSystemMode('with')} className={`px-6 py-3 font-semibold ${systemMode === 'with' ? 'bg-accent-primary text-background-main' : 'bg-background-section text-text-secondary'}`}>
                With TBS
              </button>
            </div>
          </div>
          <motion.div
            key={systemMode}
            className="mt-10 grid gap-8 border border-ui-border bg-background-section p-6 lg:grid-cols-[1fr_1fr]"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="min-h-96 border border-ui-border bg-background-main p-5">
              {systemMode === 'without' ? <ChaosVisual /> : <SystemCleanVisual />}
            </div>
            <div className="self-center">
              <h3 className="text-3xl font-bold">{systemMode === 'without' ? 'The business feels scattered.' : 'The business has a rhythm.'}</h3>
              <div className="mt-7 grid gap-4">
                {chaosBullets.map(([without, withTbs]) => (
                  <div key={without} className="flex items-center gap-3 border-b border-ui-border pb-4">
                    {systemMode === 'without' ? <X className="h-5 w-5 text-alt-coral" /> : <Check className="h-5 w-5 text-accent-highlight" />}
                    <span className="text-text-secondary">{systemMode === 'without' ? without : withTbs}</span>
                  </div>
                ))}
              </div>
              {systemMode === 'with' && (
                <button onClick={() => scrollTo('enquire')} className="mt-8 inline-flex items-center bg-accent-primary px-6 py-3 font-semibold text-background-main">
                  Enquire About The System
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="journey" className="bg-background-section py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Client Journey"
            title="How TBS Supports The Full PT Business Journey"
            copy="Click a step to see what happens, which tool supports it and why it matters."
            align="center"
          />
          <div className="mt-12 overflow-x-auto pb-2">
            <div className="flex min-w-[960px] items-start">
              {(Object.entries(journeySteps) as Array<[JourneyKey, typeof journeySteps[JourneyKey]]>).map(([key, step], index) => {
                const selected = activeJourney === key;

                return (
                  <button key={key} onClick={() => setActiveJourney(key)} className="group relative flex min-w-36 flex-1 flex-col items-center text-center">
                    <span className={`z-10 flex h-12 w-12 items-center justify-center border text-sm font-bold transition ${selected ? 'border-accent-primary bg-accent-primary text-background-main' : 'border-ui-border bg-background-main text-text-secondary group-hover:border-accent-primary'}`}>
                      {index + 1}
                    </span>
                    {index < Object.keys(journeySteps).length - 1 && <span className="absolute left-1/2 top-6 h-px w-full bg-ui-border" />}
                    <span className={`mt-4 max-w-28 text-sm font-semibold ${selected ? 'text-accent-primary' : 'text-text-secondary'}`}>{step.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <motion.div
            key={activeJourney}
            className="mt-10 grid gap-6 border border-ui-border bg-background-main p-6 md:grid-cols-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <InfoBlock label="What happens" value={activeJourneyData.what} />
            <InfoBlock label="Tool" value={activeJourneyData.tool} highlight />
            <InfoBlock label="Why it matters" value={activeJourneyData.why} />
          </motion.div>
        </div>
      </section>

      <section id="pathway" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Choose Your Path"
            title="Where Are You In Your PT Career?"
            align="center"
          />
          <div className="mt-10 grid gap-3 md:grid-cols-3">
            {(Object.entries(pathContent) as Array<[PathKey, typeof pathContent[PathKey]]>).map(([key, path]) => (
              <button
                key={key}
                onClick={() => setActivePath(key)}
                className={`min-h-36 border p-6 text-left text-2xl font-bold transition hover:-translate-y-1 ${
                  activePath === key ? 'border-accent-primary bg-accent-primary text-background-main' : 'border-ui-border bg-background-section text-text-primary'
                }`}
              >
                {path.label}
              </button>
            ))}
          </div>
          <motion.div key={activePath} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 grid gap-8 border border-ui-border bg-background-section p-6 md:grid-cols-[1fr_1fr]">
            <div>
              <h3 className="text-3xl font-bold">{activePathData.message}</h3>
              <button onClick={() => scrollTo('enquire')} className="mt-7 inline-flex items-center border border-accent-primary px-6 py-3 font-semibold text-accent-primary transition hover:bg-accent-primary hover:text-background-main">
                {activePathData.cta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {activePathData.items.map((item) => (
                <div key={item} className="border border-ui-border bg-background-main p-4 font-semibold text-text-secondary">{item}</div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="details" className="bg-background-section py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Inside TBS"
            title="What's Included Inside TBS"
            copy="The detail is here when you want it, without turning the page into a manual."
            align="center"
          />
          <div className="mt-10 flex gap-2 overflow-x-auto border-b border-ui-border">
            {(Object.entries(detailTabs) as Array<[DetailKey, typeof detailTabs[DetailKey]]>).map(([key, tab]) => (
              <button key={key} onClick={() => setActiveDetail(key)} className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-semibold transition ${activeDetail === key ? 'border-accent-primary text-accent-primary' : 'border-transparent text-text-secondary hover:text-text-primary'}`}>
                {tab.label}
              </button>
            ))}
          </div>
          <motion.div key={activeDetail} className="mt-8 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <div>
              <h3 className="text-3xl font-bold">{activeDetailData.title}</h3>
              <p className="mt-4 leading-8 text-text-secondary">{activeDetailData.sentence}</p>
              <div className="mt-6 grid gap-3">
                {activeDetailData.benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3 border-b border-ui-border pb-3 text-text-secondary">
                    <Check className="h-4 w-4 text-accent-highlight" />
                    {benefit}
                  </div>
                ))}
              </div>
              <div className="mt-7 border-l-4 border-accent-primary bg-accent-primary/10 p-5">
                <p className="font-semibold text-text-primary">Real life example</p>
                <p className="mt-2 leading-7 text-text-secondary">{activeDetailData.example}</p>
              </div>
            </div>
            <div className="border border-ui-border bg-background-main p-6">{activeDetailData.visual}</div>
          </motion.div>
        </div>
      </section>

      <section id="proof" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Proof"
            title="Built From Real Fitness Industry Experience"
            align="center"
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {proofStats.map(([stat, copy]) => (
              <div key={stat} className="border-t border-ui-border py-8">
                <p className="text-4xl font-bold text-accent-primary">{stat}</p>
                <p className="mt-3 leading-7 text-text-secondary">{copy}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
            <div className="min-h-96 bg-background-section">
              <img src="https://images.unsplash.com/photo-1571019613914-85f342c6a11e?auto=format&fit=crop&q=80&w=900" alt="Trainer working with client during a coaching session" className="h-full w-full object-cover" loading="lazy" />
            </div>
            <div className="flex items-center border border-ui-border bg-background-section p-8">
              <blockquote>
                <p className="text-3xl font-bold leading-tight text-text-primary">Before BIFC, I knew how to train people but didn't know how to run the business side. TBS gave me structure.</p>
                <footer className="mt-6 text-text-secondary">Trainer testimonial placeholder</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="bg-background-section py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Detail Library"
            title="Want The Detail? Open What Matters To You."
            align="center"
          />
          <div className="mt-10 divide-y divide-ui-border border-y border-ui-border">
            {faqItems.map(([question, answer]) => (
              <details key={question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold">
                  {question}
                  <Plus className="h-5 w-5 text-accent-primary transition group-open:rotate-45" />
                </summary>
                <p className="mt-4 leading-7 text-text-secondary">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="enquire" className="pb-28 pt-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <SectionHeading
              eyebrow="Enquire"
              title="Ready To Build Your PT Business With The Right Systems Behind You?"
              copy="Enquire about Total Business Solutions and speak with the Be Inspired Fitness and Coaching team about your goals, experience and next step."
            />
            <div className="mt-8 grid gap-3">
              {['No online purchase required', 'Speak with a real team member', 'Learn whether TBS is the right fit'].map((item) => (
                <div key={item} className="flex items-center gap-3 text-text-secondary">
                  <BadgeCheck className="h-5 w-5 text-accent-highlight" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <form onSubmit={handleSubmit} className="border border-ui-border bg-background-section p-6 md:p-8">
            {submitted ? (
              <div className="flex min-h-96 flex-col justify-center">
                <Sparkles className="h-10 w-10 text-accent-primary" />
                <h3 className="mt-5 text-3xl font-bold">Thanks. Our team will be in touch.</h3>
                <p className="mt-4 leading-7 text-text-secondary">We will talk through your PT goals and how TBS may support you.</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                <input className="border border-ui-border bg-background-main p-4 text-text-primary" placeholder="Name" aria-label="Name" required />
                <input className="border border-ui-border bg-background-main p-4 text-text-primary" placeholder="Email" type="email" aria-label="Email" required />
                <input className="border border-ui-border bg-background-main p-4 text-text-primary" placeholder="Phone" aria-label="Phone" />
                <input className="border border-ui-border bg-background-main p-4 text-text-primary" placeholder="Location" aria-label="Location" />
                <select className="border border-ui-border bg-background-main p-4 text-text-primary" aria-label="Are you currently qualified?">
                  <option>Are you currently qualified?</option>
                  <option>Yes</option>
                  <option>No</option>
                  <option>Currently studying</option>
                </select>
                <select className="border border-ui-border bg-background-main p-4 text-text-primary" aria-label="Are you currently training clients?">
                  <option>Are you currently training clients?</option>
                  <option>Yes</option>
                  <option>No</option>
                  <option>About to start</option>
                </select>
                <select className="border border-ui-border bg-background-main p-4 text-text-primary sm:col-span-2" aria-label="What do you need most help with?">
                  <option>What do you need most help with?</option>
                  <option>Leads</option>
                  <option>Sales</option>
                  <option>Programming</option>
                  <option>Payments</option>
                  <option>Retention</option>
                  <option>Support</option>
                </select>
                <textarea className="min-h-32 border border-ui-border bg-background-main p-4 text-text-primary sm:col-span-2" placeholder="Message" aria-label="Message" />
                <button type="submit" className="inline-flex items-center justify-center bg-accent-primary px-7 py-4 font-semibold text-background-main transition hover:bg-accent-hover sm:col-span-2">
                  Enquire About TBS
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            )}
          </form>
        </div>
      </section>

      <button onClick={() => scrollTo('enquire')} className="fixed bottom-5 right-5 z-40 hidden bg-accent-primary px-5 py-3 text-sm font-semibold text-background-main shadow-xl shadow-black/30 transition hover:scale-[1.02] md:inline-flex">
        Enquire About TBS
      </button>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ui-border bg-background-main/95 p-3 shadow-2xl shadow-black/40 backdrop-blur md:hidden">
        <button onClick={() => scrollTo('enquire')} className="flex w-full items-center justify-between bg-accent-primary px-4 py-3 font-semibold text-background-main">
          Interested in TBS?
          <span className="inline-flex items-center gap-2">Enquire <ArrowRight className="h-4 w-4" /></span>
        </button>
      </div>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  copy,
  align = 'left'
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  align?: 'left' | 'center';
}) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <p className="mb-3 text-sm font-semibold uppercase text-accent-primary">{eyebrow}</p>
      <h2 className="text-3xl font-bold leading-tight text-text-primary md:text-5xl">{title}</h2>
      {copy && <p className="mt-5 text-lg leading-8 text-text-secondary">{copy}</p>}
    </div>
  );
}

function ImpactLink({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="text-text-secondary transition hover:text-accent-primary">
      {label}
    </button>
  );
}

function PipelineMini() {
  return (
    <div className="border border-ui-border bg-background-main p-4">
      <div className="mb-4 flex items-center justify-between text-xs text-text-secondary">
        <span>CRM pipeline</span>
        <span>Live lead view</span>
      </div>
      <div className="grid gap-2">
        {['New lead', 'Booked', 'Follow-up'].map((stage, index) => (
          <div key={stage} className="flex items-center gap-3 bg-background-section p-3">
            <span className="flex h-7 w-7 items-center justify-center bg-accent-primary text-xs font-bold text-background-main">{index + 1}</span>
            <span className="text-sm font-semibold text-text-secondary">{stage}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function InfoBlock({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase text-accent-primary">{label}</p>
      <p className={`mt-3 leading-7 ${highlight ? 'font-bold text-text-primary' : 'text-text-secondary'}`}>{value}</p>
    </div>
  );
}

function SystemVisual({ module }: { module: ModuleKey }) {
  const visuals: Record<ModuleKey, ReactNode> = {
    coaching: <CalendarMockup />,
    trainerize: <PhoneMockup />,
    crm: <PipelineMockup />,
    education: <LearningMockup />,
    payments: <PaymentMockup />,
    mentoring: <MentoringMockup />
  };

  return <div className="min-h-52">{visuals[module]}</div>;
}

function CalendarMockup() {
  return (
    <div className="grid grid-cols-5 gap-2">
      {Array.from({ length: 15 }).map((_, index) => (
        <div key={index} className={`h-12 border border-ui-border ${index % 4 === 0 ? 'bg-accent-primary/30' : 'bg-background-section'}`} />
      ))}
    </div>
  );
}

function PhoneMockup() {
  return (
    <div className="mx-auto w-52 border-8 border-ui-border bg-background-card p-4">
      <div className="mb-4 h-2 w-16 bg-ui-divider" />
      <div className="h-24 bg-accent-primary/20 p-4">
        <Dumbbell className="h-7 w-7 text-accent-primary" />
      </div>
      <div className="mt-3 h-14 bg-background-section" />
      <div className="mt-3 h-20 bg-background-section p-4">
        <LineChart className="h-6 w-6 text-accent-highlight" />
      </div>
    </div>
  );
}

function PipelineMockup() {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {['New', 'Booked', 'Converted'].map((stage) => (
        <div key={stage} className="min-h-32 border border-ui-border bg-background-section p-4">
          <p className="text-sm font-bold text-text-primary">{stage}</p>
          <div className="mt-5 h-12 bg-accent-primary/15" />
        </div>
      ))}
    </div>
  );
}

function LearningMockup() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {['Onboarding', 'Sales', 'Retention', 'Workshops'].map((tile) => (
        <div key={tile} className="border border-ui-border bg-background-section p-5">
          <BookOpen className="h-6 w-6 text-accent-primary" />
          <p className="mt-4 font-semibold">{tile}</p>
        </div>
      ))}
    </div>
  );
}

function PaymentMockup() {
  return (
    <div className="grid gap-2">
      {['Agreement', 'Direct debit', 'Tracked', 'Paid'].map((step, index) => (
        <div key={step} className="flex items-center gap-3 bg-background-section p-3">
          <span className="h-2 flex-1 bg-accent-primary" style={{ opacity: 0.35 + index * 0.18 }} />
          <span className="w-28 text-sm text-text-secondary">{step}</span>
        </div>
      ))}
    </div>
  );
}

function MentoringMockup() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {['Weekly', 'Manager', 'Community'].map((item) => (
        <div key={item} className="border border-ui-border bg-background-section p-5 text-center">
          <Users className="mx-auto h-7 w-7 text-accent-primary" />
          <p className="mt-4 font-semibold">{item}</p>
        </div>
      ))}
    </div>
  );
}

function ChaosVisual() {
  return (
    <div className="relative h-full min-h-80">
      {['Unanswered DM', 'Invoice?', 'Reschedule', 'Program notes', 'Lead from May'].map((item, index) => (
        <div
          key={item}
          className="absolute border border-ui-border bg-background-card px-4 py-3 text-sm font-semibold text-text-secondary shadow-xl"
          style={{
            left: `${8 + (index % 3) * 27}%`,
            top: `${12 + (index % 2) * 34 + index * 4}%`
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
}

function SystemCleanVisual() {
  return (
    <div className="grid h-full min-h-80 content-center gap-3">
      {['Lead captured', 'Consult booked', 'Program delivered', 'Payment tracked', 'Review scheduled'].map((item, index) => (
        <div key={item} className="flex items-center gap-3 border border-ui-border bg-background-card p-4">
          <span className="flex h-8 w-8 items-center justify-center bg-accent-primary text-sm font-bold text-background-main">{index + 1}</span>
          <span className="font-semibold text-text-secondary">{item}</span>
        </div>
      ))}
    </div>
  );
}
