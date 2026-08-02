import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
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
  Minus,
  Play,
  Smartphone,
  Sparkles,
  Workflow,
  X,
  type LucideIcon
} from 'lucide-react';
import { BRAND } from '../constants/assets';

const sectionLinks = [
  { id: 'overview', label: 'Overview' },
  { id: 'included', label: "What's Included" },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'results', label: 'Results' },
  { id: 'faq', label: 'FAQ' },
  { id: 'enquire', label: 'Enquire' }
];

const chaosCards = [
  'Missed follow-up',
  'Unpaid invoice',
  'Empty calendar slot',
  'Lead forgotten',
  'Client cancelled',
  'Program not sent'
];

const modules = [
  {
    title: 'Elite Coaching Model',
    icon: Dumbbell,
    copy: 'A repeatable delivery model that helps trainers coach with structure instead of living session to session.'
  },
  {
    title: 'Trainerize',
    icon: Smartphone,
    copy: 'Workout delivery, habits, messaging and accountability in one client-facing coaching app.'
  },
  {
    title: 'Go High Level',
    icon: Workflow,
    copy: 'Lead capture, follow-up, bookings, automations and CRM visibility for the full sales journey.'
  },
  {
    title: 'SKOOL',
    icon: GraduationCap,
    copy: 'Structured education, onboarding and business training that trainers can keep returning to.'
  },
  {
    title: 'Debit Success',
    icon: CircleDollarSign,
    copy: 'Professional direct debit systems that keep payments organised and reduce awkward admin.'
  },
  {
    title: 'Mentoring',
    icon: Handshake,
    copy: 'Ongoing guidance from people who understand how PT businesses actually work inside clubs.'
  }
];

const comparisonRows = [
  ['Paid per session', 'Recurring coaching access'],
  ['Client controls schedule', 'Trainer sets coaching blocks'],
  ['Cancellations hurt income', 'More predictable revenue'],
  ['Hard to scale', 'Supports more clients without more hours'],
  ['Burnout risk', 'More structured work week']
];

const crmStages = ['New lead', 'Contacted', 'Jumpstart booked', 'Follow-up sent', 'Converted'];

const skoolTiles = [
  ['Onboarding', 'Know exactly what to do before the first client conversation.'],
  ['Sales', 'Build confidence around offers, consults and conversions.'],
  ['Lead Generation', 'Create a repeatable rhythm for finding new opportunities.'],
  ['Jumpstart Program', 'Turn early client momentum into stronger retention.'],
  ['Retention', 'Keep clients engaged beyond the first rush of motivation.'],
  ['Head Coach Q&A', 'Get practical answers from experienced leaders.'],
  ['Business Systems', 'Operate with structure instead of scattered notes.'],
  ['Workshops', 'Learn with peers and sharpen skills in real time.']
];

const timeline = [
  ['Enquire', 'Tell us where your PT business is now.'],
  ['Speak with BIFC', 'We learn your goals, club context and biggest gaps.'],
  ['Get introduced to TBS', 'See how the system fits your coaching model.'],
  ['Complete onboarding', 'Set up your tools, workflow and delivery plan.'],
  ['Launch in club', 'Start with clear structure and support.'],
  ['Build leads', 'Use CRM follow-up and simple sales rhythms.'],
  ['Service clients', 'Deliver coaching through the connected client system.'],
  ['Grow with support', 'Use mentoring, education and reviews to improve.']
];

const includedRows = [
  ['Elite Coaching Model', 'Predictable structure and scalable coaching'],
  ['Trainerize', 'Program delivery and client accountability'],
  ['Go High Level', 'Leads, follow-ups, automations and marketing'],
  ['SKOOL', 'Education, onboarding and business training'],
  ['Debit Success', 'Direct debit and payment management'],
  ['Mentoring', 'Ongoing trainer development and support']
];

const faqs = [
  {
    question: 'Is TBS only for brand-new trainers?',
    answer: 'No. It is useful for new trainers who need structure from day one, and experienced trainers who want cleaner systems, stronger follow-up and more predictable service delivery.'
  },
  {
    question: 'Do I need to already understand the software?',
    answer: 'No. The point of TBS is to make the system usable. BIFC supports trainers through the setup, onboarding and ongoing application of each tool.'
  },
  {
    question: 'Does this replace mentoring?',
    answer: 'No. TBS combines software, education, payment systems and mentoring so trainers have both the tools and the human support to use them properly.'
  },
  {
    question: 'Can this work inside a fitness club?',
    answer: 'Yes. The system is designed around the real PT environment: leads, consultations, service delivery, retention, payments and weekly business rhythm.'
  }
];

const supportPhotos = [
  {
    src: 'https://images.unsplash.com/photo-1571019613914-85f342c6a11e?auto=format&fit=crop&q=80&w=900',
    alt: 'Coach guiding a client through strength training',
    quote: 'Weekly guidance keeps the system practical, not theoretical.'
  },
  {
    src: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=900',
    alt: 'Fitness coach leading a training session',
    quote: 'Trainers learn how to coach, sell, follow up and retain.'
  },
  {
    src: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&q=80&w=900',
    alt: 'Trainer reviewing programming with a client in gym',
    quote: 'The human layer turns tools into habits.'
  }
];

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

function Callout({ title, copy }: { title: string; copy: string }) {
  return (
    <div className="border-l-4 border-accent-primary bg-accent-primary/10 p-6">
      <h3 className="text-xl font-bold text-text-primary">{title}</h3>
      <p className="mt-3 leading-7 text-text-secondary">{copy}</p>
    </div>
  );
}

export default function TotalBusinessSolutions() {
  const [activeSection, setActiveSection] = useState('overview');
  const [clients, setClients] = useState(20);
  const [hours, setHours] = useState(18);
  const [struggle, setStruggle] = useState('lead management');
  const [usesCrm, setUsesCrm] = useState('No');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0.01 }
    );

    sectionLinks.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const impactMessage = useMemo(() => {
    const scaleHint = clients > 30 || hours < 16
      ? 'Your answers point toward scalability: you want more clients without simply adding more hours.'
      : 'Your answers point toward consistency: you want a cleaner weekly structure that is easier to repeat.';
    const crmHint = usesCrm === 'No'
      ? ' Because you are not using a CRM yet, lead follow-up and retention systems are likely a major opportunity.'
      : ' Because you already use a CRM, the opportunity is making your tools work together with your coaching model.';

    return `${scaleHint} Your biggest opportunity is ${struggle}. TBS is designed to support this through structured onboarding, CRM automations, professional service delivery, payment systems and ongoing mentoring.${crmHint}`;
  }, [clients, hours, struggle, usesCrm]);

  return (
    <div className="min-h-screen bg-background-main text-text-primary">
      <Helmet>
        <title>Total Business Solutions | Be Inspired Fitness and Coaching</title>
        <meta
          name="description"
          content="Total Business Solutions gives BIFC trainers the coaching model, software, education, payment systems and mentoring to build a real PT business from day one."
        />
        <link rel="canonical" href="https://www.beinspiredfitnessandcoaching.com/total-business-solutions" />
      </Helmet>

      <section id="overview" className="relative flex min-h-[92vh] items-center overflow-hidden pt-24">
        <div className="absolute inset-0">
          <video
            className="h-full w-full scale-[1.04] object-cover motion-safe:animate-[tbsSlowZoom_9s_ease-out_forwards]"
            autoPlay
            muted
            loop
            playsInline
            poster={BRAND.HERO_IMAGE}
          >
            <source src="https://videos.pexels.com/video-files/5319759/5319759-uhd_2560_1440_25fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-background-main via-background-main/80 to-background-main/20" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background-main to-transparent" />
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 pb-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="mb-4 text-sm font-semibold uppercase text-accent-primary">Total Business Solutions by BIFC</p>
            <h1 className="max-w-4xl text-5xl font-bold leading-[1.02] text-text-primary md:text-7xl">
              The Business System Behind Successful Personal Trainers
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-8 text-text-secondary">
              Total Business Solutions gives BIFC trainers the coaching model, software, education, payment systems and mentoring to build a real PT business from day one.
            </p>
            <motion.div
              className="mt-9 flex flex-col gap-4 sm:flex-row"
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.25 }}
            >
              <a href="#enquire" className="inline-flex items-center justify-center bg-accent-primary px-8 py-4 font-semibold text-background-main transition hover:bg-accent-hover">
                Enquire About TBS
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a href="#included" className="inline-flex items-center justify-center border border-text-primary px-8 py-4 font-semibold text-text-primary transition hover:bg-text-primary hover:text-background-main">
                See What Is Included
              </a>
            </motion.div>
            <p className="mt-5 text-sm text-text-secondary">Built from 15+ years supporting trainers across fitness clubs.</p>
          </motion.div>

          <motion.div
            className="hidden border border-ui-border bg-background-section/70 p-5 shadow-2xl shadow-black/30 backdrop-blur lg:block"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="aspect-video overflow-hidden bg-background-card">
              <img
                src="https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&q=80&w=1200"
                alt="Personal trainer coaching a client inside a fitness club"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 border-t border-ui-border text-center">
              {['Software', 'Education', 'Mentoring'].map((item) => (
                <div key={item} className="p-4 text-sm font-semibold text-text-secondary">
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <a href="#problem" className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 text-sm text-text-secondary transition hover:text-accent-primary">
          Explore the system
          <ArrowDown className="h-4 w-4 animate-pulse" />
        </a>
      </section>

      <nav className="sticky top-[4.5rem] z-40 border-y border-ui-border bg-background-main/95 backdrop-blur md:top-20">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 sm:px-6 lg:px-8">
          {sectionLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-semibold transition ${
                activeSection === link.id ? 'border-accent-primary text-accent-primary' : 'border-transparent text-text-secondary hover:text-text-primary'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>

      <section id="problem" className="overflow-hidden bg-background-section py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionHeading
              eyebrow="The Problem"
              title="Most trainers are taught how to coach, not how to operate a business."
              copy="Great coaching matters. But without lead follow-up, payment systems, structured service delivery and a weekly business rhythm, talented PTs can still end up overwhelmed."
            />
            <div className="mt-8">
              <Callout
                title="Built to solve the business side of PT"
                copy="Not just programming. Not just mentoring. TBS combines the systems trainers need to operate professionally from first lead to long-term client."
              />
            </div>
          </div>

          <div className="relative min-h-[430px] border border-ui-border bg-background-main p-6">
            <div className="absolute left-1/2 top-1/2 h-56 w-40 -translate-x-1/2 -translate-y-1/2 border border-ui-border bg-background-card p-4 shadow-xl shadow-black/30">
              <div className="mx-auto mb-4 h-2 w-14 bg-ui-divider" />
              <div className="space-y-3">
                <div className="h-12 bg-background-section" />
                <div className="h-16 bg-background-section" />
                <div className="h-10 bg-background-section" />
              </div>
            </div>
            {chaosCards.map((card, index) => (
              <motion.div
                key={card}
                className="absolute border border-ui-border bg-background-card px-4 py-3 text-sm font-semibold text-text-primary shadow-lg shadow-black/20"
                style={{
                  left: `${index % 2 === 0 ? 4 + index * 4 : 54 + index * 3}%`,
                  top: `${12 + (index % 3) * 26}%`
                }}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
              >
                {card}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="included" className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,180,216,0.18),transparent_45%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Product Reveal"
            title="TBS organises the moving parts into one connected business system."
            copy="Each tool has a job. Together, they support the trainer journey from lead management to coaching delivery, payment flow, education and ongoing development."
            align="center"
          />

          <div className="relative mt-16 grid gap-4 lg:grid-cols-[1fr_260px_1fr] lg:items-center">
            <div className="grid gap-4">
              {modules.slice(0, 3).map((module) => <ModuleCard key={module.title} module={module} />)}
            </div>
            <div className="flex h-64 items-center justify-center border border-accent-primary bg-background-main text-center shadow-2xl shadow-accent-primary/10">
              <div>
                <img src={BRAND.LOGO} alt={BRAND.LOGO_TEXT} className="mx-auto mb-4 h-20 w-auto object-contain" />
                <p className="text-4xl font-bold text-text-primary">TBS</p>
                <p className="mt-2 text-sm uppercase text-accent-primary">One integrated system</p>
              </div>
            </div>
            <div className="grid gap-4">
              {modules.slice(3).map((module) => <ModuleCard key={module.title} module={module} />)}
            </div>
          </div>

          <div className="mt-16 overflow-x-auto border border-ui-border bg-background-section">
            <table className="w-full min-w-[720px] text-left">
              <thead className="bg-background-card text-sm uppercase text-text-secondary">
                <tr>
                  <th className="sticky left-0 bg-background-card p-4">Feature</th>
                  <th className="p-4">What It Helps With</th>
                </tr>
              </thead>
              <tbody>
                {includedRows.map(([feature, help]) => (
                  <tr key={feature} className="border-t border-ui-border">
                    <td className="sticky left-0 bg-background-section p-4 font-semibold text-text-primary">{feature}</td>
                    <td className="p-4 text-text-secondary">{help}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-background-section py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <SectionHeading
              eyebrow="Elite Coaching Model"
              title="Move from scattered sessions to structured coaching blocks."
              copy="The Elite Coaching Model gives trainers a delivery structure that can support more clients, better service and a more predictable week."
            />
            <div className="overflow-hidden border border-ui-border">
              <div className="grid grid-cols-2 bg-background-card text-sm font-bold uppercase">
                <div className="p-4 text-text-secondary">Traditional PT</div>
                <div className="border-l border-accent-primary bg-accent-primary/15 p-4 text-accent-primary">Elite Coaching Model</div>
              </div>
              {comparisonRows.map(([traditional, elite]) => (
                <div key={traditional} className="grid grid-cols-2 border-t border-ui-border">
                  <div className="flex items-center gap-3 p-4 text-text-secondary">
                    <Minus className="h-4 w-4 text-alt-amber" />
                    {traditional}
                  </div>
                  <div className="flex items-center gap-3 border-l border-ui-border bg-accent-primary/5 p-4 text-text-primary">
                    <Check className="h-4 w-4 text-accent-highlight" />
                    {elite}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <SectionHeading
              eyebrow="Trainerize"
              title="Client coaching stays visible, trackable and easy to follow."
              copy="Programs, habits, progress and messaging live where the client can actually use them."
            />
            <div className="mt-8 grid gap-3">
              {['Workout delivery', 'Progress tracking', 'Client messaging', 'Nutrition support'].map((label) => (
                <div key={label} className="flex items-center gap-3 border border-ui-border bg-background-section p-4">
                  <BadgeCheck className="h-5 w-5 text-accent-primary" />
                  <span className="font-semibold">{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative min-h-[520px]">
            <div className="sticky top-40 mx-auto h-[520px] w-64 border-8 border-ui-border bg-background-card p-4 shadow-2xl shadow-black/40">
              <div className="mb-4 h-2 w-20 bg-ui-divider" />
              <div className="space-y-4">
                <div className="h-28 bg-accent-primary/20 p-4">
                  <Dumbbell className="h-8 w-8 text-accent-primary" />
                  <p className="mt-4 text-sm font-semibold">Week 1 Strength Plan</p>
                </div>
                <div className="h-20 bg-background-section p-4 text-sm text-text-secondary">Habit streak: 6 days</div>
                <div className="h-28 bg-background-section p-4">
                  <LineChart className="h-8 w-8 text-accent-highlight" />
                  <p className="mt-4 text-sm text-text-secondary">Progress trending up</p>
                </div>
              </div>
            </div>
            {['Workout', 'Messages', 'Habits', 'Progress'].map((item, index) => (
              <motion.div
                key={item}
                className="absolute hidden border border-ui-border bg-background-section px-5 py-4 shadow-xl shadow-black/20 md:block"
                style={{
                  left: index % 2 === 0 ? '5%' : '66%',
                  top: `${10 + index * 19}%`
                }}
                initial={{ opacity: 0, x: index % 2 === 0 ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background-section py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <SectionHeading
            eyebrow="Go High Level CRM"
            title="A business command centre for leads, follow-up and conversion."
            copy="A lead should not disappear because a trainer got busy. TBS uses CRM structure to make the next step clear."
          />
          <div className="border border-ui-border bg-background-main p-5">
            <div className="mb-4 flex items-center gap-2 border-b border-ui-border pb-4">
              <span className="h-3 w-3 bg-alt-coral" />
              <span className="h-3 w-3 bg-alt-amber" />
              <span className="h-3 w-3 bg-accent-highlight" />
              <span className="ml-4 text-sm text-text-secondary">Lead pipeline</span>
            </div>
            <div className="grid gap-4 md:grid-cols-5">
              {crmStages.map((stage, index) => (
                <div key={stage} className="relative min-h-32 border border-ui-border bg-background-card p-4">
                  <p className="text-sm font-semibold text-text-primary">{stage}</p>
                  <div className="mt-6 h-12 bg-accent-primary/15" />
                  {index < crmStages.length - 1 && <ChevronRight className="absolute -right-4 top-1/2 z-10 hidden h-6 w-6 text-accent-primary md:block" />}
                </div>
              ))}
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {['SMS/email history', 'Booking page', 'Automation flow'].map((item) => (
                <div key={item} className="border border-accent-primary/30 bg-accent-primary/10 p-4 text-sm font-semibold">{item}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="SKOOL"
            title="A learning hub that gives trainers a clear path to progress."
            copy="Before Day One, First Client, Growth and Retention are treated as stages, not random videos."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {skoolTiles.map(([title, copy]) => (
              <div key={title} className="group border border-ui-border bg-background-section p-5 transition duration-300 hover:-translate-y-1 hover:border-accent-primary">
                <BookOpen className="h-6 w-6 text-accent-primary" />
                <h3 className="mt-4 text-lg font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-text-secondary">{copy}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 border border-ui-border bg-background-section p-5">
            <div className="grid gap-4 text-sm font-semibold text-text-secondary md:grid-cols-4">
              {['Before Day One', 'First Client', 'Growth', 'Retention'].map((stage, index) => (
                <div key={stage} className="relative">
                  <div className="mb-3 h-2 bg-background-card">
                    <div className="h-2 bg-accent-primary" style={{ width: `${(index + 1) * 25}%` }} />
                  </div>
                  {stage}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-text-primary py-24 text-background-main">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase text-accent-primary">Debit Success</p>
            <h2 className="text-3xl font-bold leading-tight md:text-5xl">Payments handled professionally.</h2>
            <p className="mt-5 text-lg leading-8 text-gray-700">A clean payment flow helps trainers spend less energy chasing money and more energy servicing clients.</p>
            <div className="mt-8 border-l-4 border-accent-primary bg-background-main/5 p-6">
              <p className="text-xl font-bold">No more awkward payment chasing. No more messy admin.</p>
            </div>
          </div>
          <div className="grid gap-3">
            {['Client signs agreement', 'Direct debit starts', 'Payments tracked', 'Trainer gets paid', 'Less admin'].map((step, index) => (
              <div key={step} className="flex items-center gap-4 bg-white p-4 shadow-sm">
                <span className="flex h-10 w-10 items-center justify-center bg-accent-primary font-bold text-background-main">{index + 1}</span>
                <span className="font-semibold">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background-section py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Mentoring"
            title="The human support that makes the system stick."
            copy="Software only helps when people know how to use it. BIFC mentoring keeps the business rhythm grounded in real coaching conversations."
            align="center"
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {supportPhotos.map((photo, index) => (
              <motion.figure
                key={photo.src}
                className="relative overflow-hidden border border-ui-border bg-background-main"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <img src={photo.src} alt={photo.alt} className="h-80 w-full object-cover" loading="lazy" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background-main to-transparent p-5 text-sm font-semibold text-text-primary">
                  {photo.quote}
                </figcaption>
              </motion.figure>
            ))}
          </div>
          <div className="mt-10 grid gap-3 md:grid-cols-5">
            {['Weekly development', 'Head coach guidance', 'Regional manager support', 'Workshops', 'Community'].map((format) => (
              <div key={format} className="border border-ui-border bg-background-main p-4 text-center text-sm font-semibold text-text-secondary">
                {format}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="How It Works"
            title="A clear path from enquiry to a supported PT business."
            copy="The journey is designed to reduce uncertainty and give trainers a sequence they can follow."
          />
          <div className="mt-12 overflow-x-auto pb-4">
            <div className="flex min-w-[980px] gap-4">
              {timeline.map(([title, copy], index) => (
                <div key={title} className="min-w-56 border border-ui-border bg-background-section p-5">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center bg-accent-primary text-lg font-bold text-background-main">{index + 1}</div>
                  <h3 className="font-bold text-text-primary">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-text-secondary">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="results" className="bg-background-section py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
          <div>
            <SectionHeading
              eyebrow="Business Impact"
              title="What Would More Structure Change For Your PT Business?"
              copy="This is not a pricing calculator. It helps identify where structure would likely create the biggest difference."
            />
            <div className="mt-8 grid gap-5">
              <label className="grid gap-2">
                <span className="font-semibold">How many clients do you want?</span>
                <input type="range" min="5" max="60" value={clients} onChange={(event) => setClients(Number(event.target.value))} />
                <span className="text-sm text-text-secondary">{clients} clients</span>
              </label>
              <label className="grid gap-2">
                <span className="font-semibold">How many hours do you want to coach each week?</span>
                <input type="range" min="5" max="45" value={hours} onChange={(event) => setHours(Number(event.target.value))} />
                <span className="text-sm text-text-secondary">{hours} coaching hours</span>
              </label>
              <label className="grid gap-2">
                <span className="font-semibold">What do you struggle with most?</span>
                <select className="border border-ui-border bg-background-main p-4 text-text-primary" value={struggle} onChange={(event) => setStruggle(event.target.value)}>
                  <option>lead management</option>
                  <option>client retention</option>
                  <option>payment admin</option>
                  <option>weekly structure</option>
                  <option>program delivery</option>
                </select>
              </label>
              <label className="grid gap-2">
                <span className="font-semibold">Are you currently using a CRM?</span>
                <select className="border border-ui-border bg-background-main p-4 text-text-primary" value={usesCrm} onChange={(event) => setUsesCrm(event.target.value)}>
                  <option>No</option>
                  <option>Yes</option>
                </select>
              </label>
            </div>
          </div>
          <div className="self-start border border-accent-primary bg-background-main p-7">
            <Sparkles className="h-9 w-9 text-accent-primary" />
            <h3 className="mt-5 text-2xl font-bold">Your likely opportunity</h3>
            <p className="mt-4 leading-8 text-text-secondary">{impactMessage}</p>
            <a href="#enquire" className="mt-7 inline-flex items-center bg-accent-primary px-6 py-3 font-semibold text-background-main transition hover:bg-accent-hover">
              Talk to BIFC About Your PT Business
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            <Callout
              title="From first lead to long-term client"
              copy="TBS supports the full journey: lead generation, follow-up, sales, service delivery, payments and retention."
            />
            <div className="relative border border-ui-border bg-background-section p-6 lg:col-span-2">
              <div className="aspect-video bg-background-card">
                <img
                  src="https://images.unsplash.com/photo-1581009137042-c552e485697a?auto=format&fit=crop&q=80&w=1400"
                  alt="Trainer coaching in a gym with video play overlay"
                  className="h-full w-full object-cover opacity-80"
                  loading="lazy"
                />
              </div>
              <button className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-accent-primary text-background-main transition hover:scale-[1.02]" aria-label="Play TBS explainer video">
                <Play className="h-8 w-8 fill-current" />
              </button>
              <p className="mt-4 text-sm text-text-secondary">Explainer video placeholder with captions-ready frame.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="bg-background-section py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="FAQ" title="Questions trainers usually ask before they enquire." align="center" />
          <div className="mt-10 divide-y divide-ui-border border border-ui-border bg-background-main">
            {faqs.map((faq) => (
              <details key={faq.question} className="group p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold">
                  {faq.question}
                  <span className="text-accent-primary group-open:rotate-45 transition"><X className="h-5 w-5" /></span>
                </summary>
                <p className="mt-4 leading-7 text-text-secondary">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="enquire" className="pb-28 pt-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div className="min-h-[520px] bg-background-section">
            <img
              src="https://images.unsplash.com/photo-1584466977773-e625c37cdd50?auto=format&fit=crop&q=80&w=1200"
              alt="Confident trainer coaching a client in a fitness club"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="border border-ui-border bg-background-section p-7 md:p-10">
            <SectionHeading
              eyebrow="Enquire"
              title="Ready To Build Your PT Business With The Right Systems Behind You?"
              copy="Total Business Solutions is designed for trainers who want more than guesswork. Enquire today and our team will walk you through how BIFC supports trainers with systems, education, software and mentoring."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <input className="border border-ui-border bg-background-main p-4 text-text-primary" placeholder="Name" aria-label="Name" />
              <input className="border border-ui-border bg-background-main p-4 text-text-primary" placeholder="Email" aria-label="Email" />
              <input className="border border-ui-border bg-background-main p-4 text-text-primary" placeholder="Phone" aria-label="Phone" />
              <input className="border border-ui-border bg-background-main p-4 text-text-primary" placeholder="Club or location" aria-label="Club or location" />
              <textarea className="min-h-32 border border-ui-border bg-background-main p-4 text-text-primary sm:col-span-2" placeholder="Tell us what you want help with" aria-label="Tell us what you want help with" />
            </div>
            <Link to="/contact" className="mt-6 inline-flex items-center bg-accent-primary px-7 py-4 font-semibold text-background-main transition hover:bg-accent-hover">
              Start The Conversation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ui-border bg-background-main/95 p-3 shadow-2xl shadow-black/40 backdrop-blur md:hidden">
        <a href="#enquire" className="flex items-center justify-between bg-accent-primary px-4 py-3 font-semibold text-background-main">
          Interested in TBS?
          <span className="inline-flex items-center gap-2">Enquire <ArrowRight className="h-4 w-4" /></span>
        </a>
      </div>
    </div>
  );
}

function ModuleCard({ module }: { module: { title: string; copy: string; icon: LucideIcon } }) {
  const Icon = module.icon;

  return (
    <div className="group border border-ui-border bg-background-section p-5 transition duration-300 hover:-translate-y-1 hover:border-accent-primary hover:bg-background-card">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-accent-primary/15 text-accent-primary">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-bold text-text-primary">{module.title}</h3>
          <p className="mt-2 text-sm leading-6 text-text-secondary opacity-90 transition group-hover:opacity-100">{module.copy}</p>
        </div>
      </div>
    </div>
  );
}
