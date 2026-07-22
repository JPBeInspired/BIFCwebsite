import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Building2,
  CheckCircle,
  EyeOff,
  FileText,
  Lock,
  Mail,
  MapPin,
  MessageSquare,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Users
} from 'lucide-react';
import { CareersRouteMode } from '../types/careers';
import {
  CAREERS_EMPLOYERS,
  ENGAGEMENT_MODELS,
  FEATURED_CAREERS_JOBS,
  LIMITED_CANDIDATE_PREVIEWS,
  ROLE_CATEGORIES,
  WORKFLOW_STAGES,
  filterCareersJobs
} from '../lib/careersMarketplace';
import {
  approveCandidateDisclosure,
  createEmployerMarketplaceJob,
  getCareersDashboard,
  registerCareersCandidate,
  registerCareersEmployer,
  signIn,
  submitEmployerInterest
} from '../lib/cloudflare';

interface CareersProps {
  mode?: CareersRouteMode;
}

const STATES = ['all', 'VIC', 'NSW', 'QLD', 'WA', 'SA', 'ACT', 'TAS', 'NT'];
const ROLE_STEPS = ['Job Details', 'Job Ad', 'Review'];

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 border border-accent-primary/40 bg-accent-primary/10 px-3 py-1 text-sm font-semibold text-accent-primary">
      {children}
    </span>
  );
}

function PrimaryLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center justify-center gap-2 bg-accent-primary px-6 py-3 font-semibold text-background-main hover:bg-accent-hover transition-colors"
    >
      {children}
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}

function SecondaryLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center justify-center gap-2 border border-ui-border px-6 py-3 font-semibold text-text-primary hover:border-accent-primary hover:text-accent-primary transition-colors"
    >
      {children}
    </Link>
  );
}

function CareersHeader({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  return (
    <section className="border-b border-ui-border bg-background-section pt-32 pb-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-accent-primary">{eyebrow}</p>
        <h1 className="max-w-4xl text-4xl font-bold text-text-primary md:text-6xl">{title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-text-secondary">{intro}</p>
      </div>
    </section>
  );
}

function JobCard({ job }: { job: (typeof FEATURED_CAREERS_JOBS)[number] }) {
  return (
    <article className="border border-ui-border bg-background-card p-6 transition-colors hover:border-accent-primary">
      <div className="mb-4 flex flex-wrap gap-2">
        <Badge>{job.managementType}</Badge>
        {job.verifiedEmployer && <Badge>Verified Employer</Badge>}
        {job.featured && <Badge>Featured</Badge>}
      </div>
      <h2 className="text-2xl font-bold text-text-primary">{job.title}</h2>
      <div className="mt-4 grid gap-3 text-sm text-text-secondary sm:grid-cols-2">
        <span className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-accent-primary" />
          {job.employerName}
        </span>
        <span className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-accent-primary" />
          {job.location}
        </span>
        <span className="flex items-center gap-2">
          <Briefcase className="h-4 w-4 text-accent-primary" />
          {job.engagementModel}
        </span>
        <span className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-accent-primary" />
          {job.experienceLevel}
        </span>
      </div>
      <p className="mt-5 text-text-secondary">{job.summary}</p>
      <p className="mt-4 font-semibold text-accent-primary">{job.compensation}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {job.specialisations.slice(0, 3).map(item => (
          <span key={item} className="bg-background-section px-3 py-1 text-sm text-text-secondary">
            {item}
          </span>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <PrimaryLink to={`/careers/jobs/${job.slug}`}>View role</PrimaryLink>
        <button className="text-sm font-semibold text-text-secondary hover:text-accent-primary">Save job</button>
      </div>
    </article>
  );
}

function CareersHome() {
  return (
    <>
      <Helmet>
        <title>BIFC Careers | Australia's Fitness Career Network</title>
        <meta
          name="description"
          content="Create a private BIFC fitness career profile, browse relevant roles, and control when employers receive your details."
        />
        <link rel="canonical" href="https://www.beinspiredfitnessandcoaching.com/careers" />
      </Helmet>
      <section className="relative overflow-hidden border-b border-ui-border bg-background-main pt-32">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=1600"
            srcSet="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=75&w=800 800w, https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=1600 1600w"
            sizes="100vw"
            alt="Fitness professionals coaching in a gym"
            className="h-full w-full object-cover opacity-30"
            width="1600"
            height="900"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background-main via-background-main/90 to-background-main/60" />
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pb-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div>
            <Badge>Australia's Fitness Career Network</Badge>
            <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-tight text-text-primary md:text-7xl">
              Your next fitness role can find you
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-text-secondary">
              Create one private career profile, discover relevant fitness opportunities and hear from verified employers. You control when your personal details are shared.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <PrimaryLink to="/careers/register">Create my free profile</PrimaryLink>
              <SecondaryLink to="/careers/jobs">Browse fitness jobs</SecondaryLink>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm text-text-secondary">
              <span>Free to join</span>
              <span>Private by default</span>
              <span>Complete it at your own pace</span>
              <Link to="/careers/login" className="font-semibold text-accent-primary hover:text-accent-hover">Already have a profile? Sign in</Link>
            </div>
            <p className="mt-8 text-sm text-text-secondary">
              Hiring? <Link to="/careers/employers" className="font-semibold text-accent-primary hover:text-accent-hover">Find fitness professionals</Link>
            </p>
          </div>
          <div className="border border-ui-border bg-background-card/95 p-6">
            <h2 className="text-2xl font-bold text-text-primary">Why create a profile?</h2>
            <div className="mt-6 grid gap-4">
              {[
                'Create one profile instead of repeatedly applying from scratch.',
                'Be considered for relevant fitness roles, even when you are not actively job hunting.',
                'Keep your identity and contact details hidden until you choose to share them.',
                'Update or withdraw your profile when your goals change.'
              ].map(item => (
                <p key={item} className="flex gap-3 text-text-secondary">
                  <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-accent-primary" />
                  <span>{item}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-ui-border bg-background-section py-8">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
          {[
            ['Private by default', 'Employers see limited previews first.'],
            ['Fitness specialist', 'Built for coaches, trainers, managers and studios.'],
            ['Human support', 'BIFC can help connect the right people to the right roles.'],
            ['You stay in control', 'Choose when your details are shared.']
          ].map(([title, body]) => (
            <div key={title} className="border border-ui-border bg-background-card p-5">
              <p className="font-bold text-text-primary">{title}</p>
              <p className="mt-2 text-sm text-text-secondary">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-background-section py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-primary">Featured jobs</p>
              <h2 className="mt-3 text-4xl font-bold text-text-primary">Current fitness opportunities</h2>
            </div>
            <SecondaryLink to="/careers/jobs">View all jobs</SecondaryLink>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {FEATURED_CAREERS_JOBS.map(job => <JobCard key={job.id} job={job} />)}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <ProcessBlock
            title="How it works for fitness professionals"
            steps={[
              'Create your BIFC career profile.',
              'Find and receive suitable opportunities.',
              'Control which employers receive your information.',
              'Connect and progress through the recruitment process.'
            ]}
          />
          <ProcessBlock
            title="How it works for employers"
            steps={[
              'Create your employer profile.',
              'Advertise a fitness-industry opportunity.',
              'Review applicants and matched profile previews.',
              'Invite suitable professionals to consider the role.'
            ]}
          />
        </div>
      </section>

      <section className="border-y border-ui-border bg-background-section py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <ShieldCheck className="h-12 w-12 text-accent-primary" />
            <h2 className="mt-5 text-4xl font-bold text-text-primary">Candidate privacy and control</h2>
            <p className="mt-5 text-lg leading-relaxed text-text-secondary">
              Your information is not shared with an employer until you choose to share it.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              'Employers see limited previews only.',
              'Direct contact details stay hidden by default.',
              'Each disclosure is tied to a specific employer and role.',
              'You can update or withdraw your profile at any time.'
            ].map(item => (
              <div key={item} className="border border-ui-border bg-background-card p-5">
                <CheckCircle className="mb-4 h-6 w-6 text-accent-primary" />
                <p className="text-text-secondary">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-primary">Candidate FAQ</p>
            <h2 className="mt-3 text-4xl font-bold text-text-primary">Before you create a profile</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {[
              ['Does it cost anything?', 'No. Candidate profiles are free to create.'],
              ['Can employers see my contact details?', 'No. Employers receive limited previews first and only receive contact details after you approve disclosure for a specific opportunity.'],
              ['Can I join if I am already employed?', 'Yes. You can keep your profile private and only consider suitable opportunities.'],
              ['Can I change or remove my profile?', 'Yes. You can update your details or ask BIFC to withdraw your profile when your circumstances change.']
            ].map(([question, answer]) => (
              <div key={question} className="border border-ui-border bg-background-card p-6">
                <h3 className="text-xl font-bold text-text-primary">{question}</h3>
                <p className="mt-3 text-text-secondary">{answer}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 border border-accent-primary bg-accent-primary/10 p-8">
            <h2 className="text-3xl font-bold text-text-primary">Ready for your next opportunity?</h2>
            <p className="mt-3 text-text-secondary">Create one private profile and decide when employers receive your details.</p>
            <div className="mt-6">
              <PrimaryLink to="/careers/register">Create my free profile</PrimaryLink>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="text-4xl font-bold text-text-primary">Fitness recruitment support, built around your control</h2>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-text-secondary">
                BIFC Careers is owned and operated by Be Inspired Fitness and Coaching. Your profile stays under your control while BIFC helps you discover suitable roles and manage employer disclosure through a clear approval process.
              </p>
            </div>
            <div className="border border-accent-primary bg-accent-primary/10 p-6">
              <h3 className="text-2xl font-bold text-text-primary">Build your fitness team</h3>
              <p className="mt-3 text-text-secondary">Advertise your opportunity and discover fitness professionals who may suit your team.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <PrimaryLink to="/careers/employers/register">Post a Job</PrimaryLink>
                <SecondaryLink to="/careers/login">Employer sign in</SecondaryLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ProcessBlock({ title, steps }: { title: string; steps: string[] }) {
  return (
    <div className="border border-ui-border bg-background-card p-8">
      <h2 className="text-3xl font-bold text-text-primary">{title}</h2>
      <ol className="mt-8 space-y-5">
        {steps.map((step, index) => (
          <li key={step} className="flex gap-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-accent-primary font-bold text-background-main">
              {index + 1}
            </span>
            <span className="text-text-secondary">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function CareersJobs() {
  const [filters, setFilters] = useState({ search: '', state: 'all', engagementModel: 'all', category: 'all' });
  const jobs = useMemo(() => filterCareersJobs(FEATURED_CAREERS_JOBS, filters), [filters]);

  return (
    <>
      <Helmet>
        <title>Fitness Jobs | BIFC Careers</title>
        <meta name="description" content="Search BIFC Careers fitness jobs across Australia." />
        <link rel="canonical" href="https://www.beinspiredfitnessandcoaching.com/careers/jobs" />
      </Helmet>
      <CareersHeader
        eyebrow="Fitness jobs"
        title="Find fitness-industry opportunities across Australia"
        intro="Search roles by location, category, engagement model and BIFC management status. Every job should disclose how the opportunity works."
      />
      <section className="border-b border-ui-border bg-background-main py-8">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
          <label className="relative md:col-span-2">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-secondary" />
            <input
              value={filters.search}
              onChange={event => setFilters({ ...filters, search: event.target.value })}
              className="w-full border border-ui-border bg-background-card py-3 pl-12 pr-4 text-text-primary"
              placeholder="Keyword, role or employer"
            />
          </label>
          <select
            value={filters.state}
            onChange={event => setFilters({ ...filters, state: event.target.value })}
            className="border border-ui-border bg-background-card px-4 py-3 text-text-primary"
            aria-label="State"
          >
            {STATES.map(state => <option key={state} value={state}>{state === 'all' ? 'All states' : state}</option>)}
          </select>
          <select
            value={filters.category}
            onChange={event => setFilters({ ...filters, category: event.target.value })}
            className="border border-ui-border bg-background-card px-4 py-3 text-text-primary"
            aria-label="Role category"
          >
            <option value="all">All role categories</option>
            {ROLE_CATEGORIES.map(category => <option key={category}>{category}</option>)}
          </select>
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center gap-3 text-text-secondary">
            <SlidersHorizontal className="h-5 w-5 text-accent-primary" />
            Showing {jobs.length} curated marketplace roles
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {jobs.map(job => <JobCard key={job.id} job={job} />)}
          </div>
        </div>
      </section>
    </>
  );
}

function Employers() {
  return (
    <>
      <Helmet>
        <title>Fitness Employers | BIFC Careers</title>
        <meta name="description" content="Browse verified BIFC Careers employers and recruitment partners." />
      </Helmet>
      <CareersHeader
        eyebrow="Employers"
        title="Verified fitness employers and BIFC recruitment partners"
        intro="Employer profiles show culture, support, locations and current roles. Private employer analytics are never shown publicly."
      />
      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          {CAREERS_EMPLOYERS.map(employer => (
            <article key={employer.id} className="border border-ui-border bg-background-card p-6">
              <Badge>{employer.relationship}</Badge>
              <h2 className="mt-5 text-2xl font-bold text-text-primary">{employer.name}</h2>
              <p className="mt-2 text-accent-primary">{employer.type}</p>
              <p className="mt-4 text-text-secondary">{employer.description}</p>
              <div className="mt-5 space-y-2">
                {employer.support.map(item => (
                  <p key={item} className="flex items-center gap-2 text-sm text-text-secondary">
                    <BadgeCheck className="h-4 w-4 text-accent-primary" />
                    {item}
                  </p>
                ))}
              </div>
              <div className="mt-6">
                <SecondaryLink to={`/careers/employers/${employer.slug}`}>View employer profile</SecondaryLink>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function Talent() {
  return (
    <>
      <Helmet>
        <title>Join the BIFC Talent Network | BIFC Careers</title>
        <meta name="description" content="Create one BIFC career profile and control how employers can discover you." />
      </Helmet>
      <CareersHeader
        eyebrow="Talent network"
        title="Create one fitness career profile and discover opportunities that match your goals"
        intro="BIFC can support you across BIFC-managed roles and suitable third-party opportunities, while employers only receive information you approve."
      />
      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          {[
            ['Profile control', 'Choose employer discovery, BIFC-only, visible on application or hidden visibility.'],
            ['Opportunity matching', 'Receive explainable job matches based on location, qualifications, preferences and availability.'],
            ['Disclosure approval', 'Review exactly what will be shared before any employer receives private information.']
          ].map(([title, body]) => (
            <div key={title} className="border border-ui-border bg-background-card p-8">
              <Lock className="mb-5 h-10 w-10 text-accent-primary" />
              <h2 className="text-2xl font-bold text-text-primary">{title}</h2>
              <p className="mt-4 text-text-secondary">{body}</p>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
          <PrimaryLink to="/careers/register">Create your career profile</PrimaryLink>
        </div>
      </section>
    </>
  );
}

function Register() {
  return (
    <>
      <Helmet>
        <title>Register | BIFC Careers</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <CareersHeader
        eyebrow="Registration"
        title="Create your private fitness career profile"
        intro="Start with a few basic details. You can complete the rest of your profile later."
      />
      <FormShell type="candidate" />
    </>
  );
}

function EmployerRegister() {
  return (
    <>
      <Helmet>
        <title>Employer Registration | BIFC Careers</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <CareersHeader
        eyebrow="Employer registration"
        title="Advertise your opportunity through BIFC Careers"
        intro="Create your employer account, post fitness job ads and keep candidate contact details protected until the proper interest and disclosure workflow is complete."
      />
      <FormShell type="employer" />
    </>
  );
}

function Login() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setStatus('submitting');
    setMessage('');

    try {
      const user = await signIn(String(form.get('email') || ''), String(form.get('password') || ''));

      if (user?.employer_id) {
        navigate('/careers/employer');
        return;
      }

      if (user?.candidate_id) {
        navigate('/careers/candidate');
        return;
      }

      navigate('/careers');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Sign in failed.');
    }
  };

  return (
    <>
      <Helmet>
        <title>Login | BIFC Careers</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <CareersHeader
        eyebrow="Secure access"
        title="Sign in to BIFC Careers"
        intro="Use the password you created during registration. Candidate information remains protected behind server-side workflow checks."
      />
      <section className="py-16">
        <form onSubmit={handleSubmit} className="mx-auto max-w-xl border border-ui-border bg-background-card p-8">
          <label className="grid gap-2 text-sm font-semibold text-text-secondary">
            Email
            <input name="email" type="email" className="border border-ui-border bg-background-main px-4 py-3 text-text-primary" required />
          </label>
          <label className="mt-4 grid gap-2 text-sm font-semibold text-text-secondary">
            Password
            <input name="password" type="password" autoComplete="current-password" className="border border-ui-border bg-background-main px-4 py-3 text-text-primary" required />
          </label>
          <div className="mt-3 text-right">
            <Link to="/careers/forgot-password" className="text-sm font-semibold text-accent-primary hover:text-accent-hover">
              Forgot password?
            </Link>
          </div>
          <button disabled={status === 'submitting'} className="mt-6 w-full bg-accent-primary px-6 py-3 font-semibold text-background-main disabled:opacity-60">
            {status === 'submitting' ? 'Signing in...' : 'Continue'}
          </button>
          {message && <p className="mt-4 text-sm text-red-300" role="status">{message}</p>}
          <p className="mt-4 text-sm text-text-secondary">Employer access starts immediately. Candidate contact details remain unavailable until candidate-approved disclosure.</p>
          <div className="mt-6 grid gap-3 border-t border-ui-border pt-6 sm:grid-cols-2">
            <SecondaryLink to="/careers/register">Create candidate profile</SecondaryLink>
            <SecondaryLink to="/careers/employers/register">Create employer account</SecondaryLink>
          </div>
        </form>
      </section>
    </>
  );
}

function ForgotPassword() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <Helmet>
        <title>Reset Password | BIFC Careers</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <CareersHeader
        eyebrow="Account recovery"
        title="Reset your BIFC Careers password"
        intro="Enter the email connected to your profile and BIFC support will help you regain access."
      />
      <section className="py-16">
        <form
          onSubmit={event => {
            event.preventDefault();
            setSubmitted(true);
          }}
          className="mx-auto max-w-xl border border-ui-border bg-background-card p-8"
        >
          <label className="grid gap-2 text-sm font-semibold text-text-secondary">
            Email
            <input name="email" type="email" autoComplete="email" className="border border-ui-border bg-background-main px-4 py-3 text-text-primary" required />
          </label>
          <button className="mt-6 w-full bg-accent-primary px-6 py-3 font-semibold text-background-main">
            Request password help
          </button>
          {submitted && (
            <p className="mt-4 text-sm text-accent-primary" role="status">
              Thanks. Please email support@beinspiredfitnessandcoaching.com from the same address so BIFC can verify and reset your access.
            </p>
          )}
          <p className="mt-4 text-sm text-text-secondary">
            For your security, account access requests are checked before a password is reset.
          </p>
        </form>
      </section>
    </>
  );
}

function FormShell({ type }: { type: 'candidate' | 'employer' }) {
  const isCandidate = type === 'candidate';
  const navigate = useNavigate();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setStatus('submitting');
    setMessage('');

    try {
      if (isCandidate) {
        await registerCareersCandidate({
          first_name: String(form.get('first_name') || ''),
          surname: String(form.get('surname') || ''),
          email: String(form.get('email') || ''),
          mobile: String(form.get('mobile') || ''),
          state: String(form.get('state') || ''),
          suburb: String(form.get('suburb') || ''),
          career_status: 'open_to_suitable_opportunities',
          password: String(form.get('password') || ''),
          accepted_terms: form.get('accepted_terms') === 'on'
        });
        setMessage('Candidate account created.');
        navigate('/careers/candidate');
      } else {
        const tradingName = String(form.get('trading_name') || '');
        await registerCareersEmployer({
          trading_name: tradingName,
          legal_business_name: String(form.get('legal_business_name') || tradingName),
          abn: String(form.get('abn') || ''),
          contact_email: String(form.get('email') || ''),
          contact_name: String(form.get('contact_name') || ''),
          contact_title: 'Owner',
          employer_type: 'Fitness employer',
          password: String(form.get('password') || ''),
          accepted_terms: form.get('accepted_terms') === 'on'
        });
        setMessage('Employer account created.');
        navigate('/careers/employer');
      }

      setStatus('success');
      event.currentTarget.reset();
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Registration failed. Please try again.');
    }
  };

  return (
    <section className="py-16">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div className="border border-ui-border bg-background-card p-8">
          <h2 className="text-2xl font-bold text-text-primary">{isCandidate ? 'Privacy summary' : 'Employer access'}</h2>
          <div className="mt-6 space-y-4 text-text-secondary">
            {(isCandidate
              ? [
                  'BIFC uses your information to operate your career profile and identify relevant fitness opportunities.',
                  'Employers initially see only a limited profile preview.',
                  'Your contact details are shared only when you approve disclosure for a specific opportunity.',
                  'You can update or withdraw your profile when your goals change.'
                ]
              : [
                  'Employer accounts can access the dashboard immediately after sign-up.',
                  'Candidate previews are limited and cannot be exported or used outside the approved role workflow.',
                  'Interest requests do not reveal direct contact details.',
                  'Candidate information may only be used for the approved role workflow.'
                ]).map(item => (
              <p key={item} className="flex gap-3">
                <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-accent-primary" />
                <span>{item}</span>
              </p>
            ))}
          </div>
          <div className="mt-6 grid gap-2 border-t border-ui-border pt-6 text-sm">
            <Link to="/careers/collection-notice" className="font-semibold text-accent-primary hover:text-accent-hover">Collection notice</Link>
            <Link to="/careers/privacy" className="font-semibold text-accent-primary hover:text-accent-hover">Privacy notice</Link>
            <Link to={isCandidate ? '/careers/candidate-terms' : '/careers/employer-terms'} className="font-semibold text-accent-primary hover:text-accent-hover">
              {isCandidate ? 'Candidate terms' : 'Employer terms'}
            </Link>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="border border-ui-border bg-background-card p-8">
          <h2 className="mb-5 text-2xl font-bold text-text-primary">
            {isCandidate ? 'Start your profile' : 'Create employer account'}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold text-text-secondary">
              {isCandidate ? 'First name' : 'Trading name'}
              <input name={isCandidate ? 'first_name' : 'trading_name'} autoComplete={isCandidate ? 'given-name' : 'organization'} className="border border-ui-border bg-background-main px-4 py-3 text-text-primary" required />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-text-secondary">
              {isCandidate ? 'Surname' : 'ABN'}
              <input name={isCandidate ? 'surname' : 'abn'} autoComplete={isCandidate ? 'family-name' : 'off'} className="border border-ui-border bg-background-main px-4 py-3 text-text-primary" required={isCandidate} />
            </label>
            {!isCandidate && (
              <>
                <label className="grid gap-2 text-sm font-semibold text-text-secondary">
                  Legal business name
                  <input name="legal_business_name" autoComplete="organization" className="border border-ui-border bg-background-main px-4 py-3 text-text-primary" required />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-text-secondary">
                  Main contact
                  <input name="contact_name" autoComplete="name" className="border border-ui-border bg-background-main px-4 py-3 text-text-primary" required />
                </label>
              </>
            )}
            <label className="grid gap-2 text-sm font-semibold text-text-secondary">
              Email
              <input name="email" type="email" autoComplete="email" className="border border-ui-border bg-background-main px-4 py-3 text-text-primary" required />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-text-secondary">
              Mobile <span className="font-normal text-text-secondary">(optional)</span>
              <input name="mobile" type="tel" autoComplete="tel" className="border border-ui-border bg-background-main px-4 py-3 text-text-primary" />
              <span className="text-xs font-normal text-text-secondary">Helpful if BIFC needs to confirm a suitable opportunity with you.</span>
            </label>
            <label className="grid gap-2 text-sm font-semibold text-text-secondary">
              Password
              <input name="password" type="password" minLength={10} autoComplete="new-password" className="border border-ui-border bg-background-main px-4 py-3 text-text-primary" required />
            </label>
            {isCandidate && (
              <>
                <label className="grid gap-2 text-sm font-semibold text-text-secondary">
                  State
                  <select name="state" className="border border-ui-border bg-background-main px-4 py-3 text-text-primary">
                    {STATES.filter(state => state !== 'all').map(state => <option key={state}>{state}</option>)}
                  </select>
                </label>
                <label className="grid gap-2 text-sm font-semibold text-text-secondary">
                  Suburb <span className="font-normal text-text-secondary">(optional)</span>
                  <input name="suburb" autoComplete="address-level2" className="border border-ui-border bg-background-main px-4 py-3 text-text-primary" />
                </label>
              </>
            )}
          </div>
          <label className="mt-5 flex gap-3 text-sm text-text-secondary">
            <input name="accepted_terms" type="checkbox" className="mt-1" required />
            <span>
              I have read and accept the BIFC Careers{' '}
              <Link to="/careers/collection-notice" className="font-semibold text-accent-primary hover:text-accent-hover">collection notice</Link>,{' '}
              <Link to="/careers/privacy" className="font-semibold text-accent-primary hover:text-accent-hover">privacy notice</Link> and{' '}
              <Link to={isCandidate ? '/careers/candidate-terms' : '/careers/employer-terms'} className="font-semibold text-accent-primary hover:text-accent-hover">
                {isCandidate ? 'candidate terms' : 'employer terms'}
              </Link>.
            </span>
          </label>
          <button type="submit" disabled={status === 'submitting'} className="mt-6 bg-accent-primary px-6 py-3 font-semibold text-background-main disabled:opacity-60">
            {status === 'submitting' ? 'Submitting...' : isCandidate ? 'Start profile' : 'Submit employer registration'}
          </button>
          {message && (
            <p className={`mt-4 text-sm ${status === 'error' ? 'text-red-300' : 'text-accent-primary'}`} role="status">
              {message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

function CandidateDashboard() {
  return <Dashboard title="Candidate dashboard" role="candidate" />;
}

function EmployerDashboard() {
  return <Dashboard title="Employer dashboard" role="employer" />;
}

function AdminDashboard() {
  return <Dashboard title="BIFC recruitment admin" role="admin" />;
}

function Dashboard({ title, role }: { title: string; role: 'candidate' | 'employer' | 'admin' }) {
  const fallbackCards = useMemo(
    () =>
      role === 'candidate'
        ? ['Profile completion 64%', '2 employer interest requests', '3 recommended jobs', '1 qualification expiry alert']
        : role === 'employer'
          ? ['2 active jobs', '6 matched previews', '3 interests awaiting response', 'No candidate exports available']
          : ['18 active candidates', '4 self-registered employers', '3 jobs awaiting review', '25 audit events today'],
    [role]
  );
  const [cards, setCards] = useState(fallbackCards);

  useEffect(() => {
    getCareersDashboard(role)
      .then(data => setCards(data.cards.length ? data.cards : fallbackCards))
      .catch(() => setCards(fallbackCards));
  }, [fallbackCards, role]);

  return (
    <>
      <Helmet>
        <title>{title} | BIFC Careers</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <CareersHeader
        eyebrow="Protected workspace"
        title={title}
        intro="Your workspace keeps candidate disclosure, employer interest and profile activity behind the right access checks."
      />
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-4">
            {cards.map(card => (
              <div key={card} className="border border-ui-border bg-background-card p-5">
                <p className="font-semibold text-text-primary">{card}</p>
              </div>
            ))}
          </div>
          {role === 'employer' && (
            <div className="mt-8 border border-accent-primary bg-accent-primary/10 p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-text-primary">Create a fitness job ad</h2>
                  <p className="mt-2 text-text-secondary">Add the job details, write the ad, and send it to BIFC for review.</p>
                </div>
                <PrimaryLink to="/careers/employer/jobs/new">Start job ad</PrimaryLink>
              </div>
            </div>
          )}
          {role === 'employer' && <CandidatePreviewPanel />}
          {role === 'candidate' && <DisclosurePanel />}
          {role === 'admin' && <AdminOpsPanel />}
        </div>
      </section>
    </>
  );
}

type JobDraft = {
  title: string;
  location: string;
  workplace_type: string;
  engagement_model: string;
  role_category: string;
  experience_level: string;
  pay_type: string;
  pay_min: string;
  pay_max: string;
  pay_shown: boolean;
  compensation_summary: string;
  ad_package: string;
  description: string;
  summary: string;
  selling_points: string[];
  brand_name: string;
  video_url: string;
  application_questions: string[];
};

const INITIAL_JOB_DRAFT: JobDraft = {
  title: '',
  location: '',
  workplace_type: 'onsite',
  engagement_model: 'Full-time',
  role_category: 'Personal Training',
  experience_level: 'Open',
  pay_type: 'annual',
  pay_min: '',
  pay_max: '',
  pay_shown: true,
  compensation_summary: '',
  ad_package: 'free_listing',
  description: '',
  summary: '',
  selling_points: ['', '', ''],
  brand_name: 'BIFC',
  video_url: '',
  application_questions: [
    'Do you hold current Australian work rights?',
    'What fitness qualifications do you currently hold?',
    'When would you be available to start?'
  ]
};

function EmployerJobPost() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<JobDraft>(INITIAL_JOB_DRAFT);
  const [status, setStatus] = useState<'idle' | 'saving' | 'submitted' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const updateDraft = (patch: Partial<JobDraft>) => setDraft(current => ({ ...current, ...patch }));

  const payload = (action: 'draft' | 'submit') => ({
    ...draft,
    action,
    pay_min: draft.pay_min ? Number(draft.pay_min) : null,
    pay_max: draft.pay_max ? Number(draft.pay_max) : null,
    responsibilities: draft.selling_points.filter(Boolean).join('\n'),
    required_qualifications: draft.application_questions.filter(Boolean).join('\n'),
    ad_package: 'free_listing',
    support_and_onboarding: 'Free marketplace listing'
  });

  const saveJob = async (action: 'draft' | 'submit') => {
    setStatus('saving');
    setMessage('');

    try {
      await createEmployerMarketplaceJob(payload(action));
      setStatus(action === 'submit' ? 'submitted' : 'idle');
      setMessage(action === 'submit' ? 'Job ad submitted for BIFC review.' : 'Draft saved.');
      if (action === 'submit') {
        setTimeout(() => navigate('/careers/employer'), 900);
      }
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Unable to save this job ad.');
    }
  };

  const writeWithTemplate = () => {
    const title = draft.title || 'Fitness Coach';
    const location = draft.location || 'your club';
    updateDraft({
      summary: `Join a growing fitness team in ${location} and help members build confidence through structured coaching, accountability and great service.`,
      description: `This ${title} role is for a coach who can build trust quickly, keep members moving safely, and contribute to a professional training floor. The right person will communicate clearly, care about member outcomes, and bring steady energy to the team in ${location}.`,
      selling_points: ['Supportive team and onboarding', 'Opportunity to grow your client base', 'Member-focused coaching environment']
    });
  };

  return (
    <>
      <Helmet>
        <title>Create a Fitness Job Ad | BIFC Careers</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <section className="border-b border-ui-border bg-background-section pt-32 pb-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-primary">BIFC employer workspace</p>
          <h1 className="mt-4 text-4xl font-bold text-text-primary md:text-6xl">Create a fitness job ad</h1>
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {ROLE_STEPS.map((label, index) => (
              <button
                key={label}
                type="button"
                onClick={() => setStep(index)}
                className={`border px-4 py-3 text-left font-semibold transition-colors ${index <= step ? 'border-accent-primary bg-accent-primary/10 text-accent-primary' : 'border-ui-border text-text-secondary'}`}
              >
                <span className="block text-xs uppercase tracking-[0.14em]">Step {index + 1}</span>
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
          <div className="border border-ui-border bg-background-card p-6">
            {step === 0 && (
              <div className="grid gap-5">
                <h2 className="text-3xl font-bold text-text-primary">Job details</h2>
                <label className="grid gap-2 text-sm font-semibold text-text-secondary">
                  Job title
                  <input value={draft.title} onChange={event => updateDraft({ title: event.target.value })} className="border border-ui-border bg-background-main px-4 py-3 text-text-primary" placeholder="e.g. Personal Trainer" />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-text-secondary">
                  Club or work location
                  <input value={draft.location} onChange={event => updateDraft({ location: event.target.value })} className="border border-ui-border bg-background-main px-4 py-3 text-text-primary" placeholder="e.g. Coburg, VIC" />
                </label>
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="grid gap-2 text-sm font-semibold text-text-secondary">
                    Delivery model
                    <select value={draft.workplace_type} onChange={event => updateDraft({ workplace_type: event.target.value })} className="border border-ui-border bg-background-main px-4 py-3 text-text-primary">
                      <option value="onsite">On-site</option>
                      <option value="hybrid">Hybrid</option>
                      <option value="remote">Remote</option>
                    </select>
                  </label>
                  <label className="grid gap-2 text-sm font-semibold text-text-secondary">
                    Engagement model
                    <select value={draft.engagement_model} onChange={event => updateDraft({ engagement_model: event.target.value })} className="border border-ui-border bg-background-main px-4 py-3 text-text-primary">
                      {ENGAGEMENT_MODELS.map(model => <option key={model}>{model}</option>)}
                    </select>
                  </label>
                  <label className="grid gap-2 text-sm font-semibold text-text-secondary">
                    Role category
                    <select value={draft.role_category} onChange={event => updateDraft({ role_category: event.target.value })} className="border border-ui-border bg-background-main px-4 py-3 text-text-primary">
                      {ROLE_CATEGORIES.map(category => <option key={category}>{category}</option>)}
                    </select>
                  </label>
                  <label className="grid gap-2 text-sm font-semibold text-text-secondary">
                    Candidate experience
                    <select value={draft.experience_level} onChange={event => updateDraft({ experience_level: event.target.value })} className="border border-ui-border bg-background-main px-4 py-3 text-text-primary">
                      {['Open', 'Entry level', 'Experienced', 'Manager', 'Senior'].map(level => <option key={level}>{level}</option>)}
                    </select>
                  </label>
                </div>
                <div className="grid gap-4 md:grid-cols-4">
                  <label className="grid gap-2 text-sm font-semibold text-text-secondary">
                    Pay rhythm
                    <select value={draft.pay_type} onChange={event => updateDraft({ pay_type: event.target.value })} className="border border-ui-border bg-background-main px-4 py-3 text-text-primary">
                      <option value="hourly">Hourly</option>
                      <option value="monthly">Monthly</option>
                      <option value="annual">Annually</option>
                    </select>
                  </label>
                  <label className="grid gap-2 text-sm font-semibold text-text-secondary">
                    Lower guide
                    <input value={draft.pay_min} onChange={event => updateDraft({ pay_min: event.target.value })} inputMode="numeric" className="border border-ui-border bg-background-main px-4 py-3 text-text-primary" />
                  </label>
                  <label className="grid gap-2 text-sm font-semibold text-text-secondary">
                    Upper guide
                    <input value={draft.pay_max} onChange={event => updateDraft({ pay_max: event.target.value })} inputMode="numeric" className="border border-ui-border bg-background-main px-4 py-3 text-text-primary" />
                  </label>
                  <label className="grid gap-2 text-sm font-semibold text-text-secondary">
                    Display pay guide
                    <select value={draft.pay_shown ? 'yes' : 'no'} onChange={event => updateDraft({ pay_shown: event.target.value === 'yes' })} className="border border-ui-border bg-background-main px-4 py-3 text-text-primary">
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </label>
                </div>
                <label className="grid gap-2 text-sm font-semibold text-text-secondary">
                  Public pay note
                  <input value={draft.compensation_summary} onChange={event => updateDraft({ compensation_summary: event.target.value })} className="border border-ui-border bg-background-main px-4 py-3 text-text-primary" placeholder="e.g. $70,000 + bonus" />
                </label>
              </div>
            )}
            {step === 1 && (
              <div className="grid gap-5">
                <div className="flex flex-wrap items-center justify-between gap-4 bg-accent-primary/10 p-5">
                  <p className="font-semibold text-text-primary">Draft a practical job ad from your job details.</p>
                  <button type="button" onClick={writeWithTemplate} className="bg-accent-primary px-5 py-3 font-semibold text-background-main">Draft job ad</button>
                </div>
                <label className="grid gap-2 text-sm font-semibold text-text-secondary">
                  Job description
                  <textarea value={draft.description} onChange={event => updateDraft({ description: event.target.value })} rows={10} className="border border-ui-border bg-background-main px-4 py-3 text-text-primary" />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-text-secondary">
                  Short marketplace summary
                  <textarea value={draft.summary} onChange={event => updateDraft({ summary: event.target.value })} rows={4} className="border border-ui-border bg-background-main px-4 py-3 text-text-primary" />
                </label>
                <div className="grid gap-3">
                  <p className="font-semibold text-text-secondary">Why this role is worth considering</p>
                  {draft.selling_points.map((point, index) => (
                    <input
                      key={index}
                      value={point}
                      onChange={event => {
                        const next = [...draft.selling_points];
                        next[index] = event.target.value;
                        updateDraft({ selling_points: next });
                      }}
                      className="border border-ui-border bg-background-main px-4 py-3 text-text-primary"
                      placeholder={`Selling point ${index + 1}`}
                    />
                  ))}
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="grid gap-2 text-sm font-semibold text-text-secondary">
                    Employer brand
                    <input value={draft.brand_name} onChange={event => updateDraft({ brand_name: event.target.value })} className="border border-ui-border bg-background-main px-4 py-3 text-text-primary" />
                  </label>
                  <label className="grid gap-2 text-sm font-semibold text-text-secondary">
                    Video link
                    <input value={draft.video_url} onChange={event => updateDraft({ video_url: event.target.value })} className="border border-ui-border bg-background-main px-4 py-3 text-text-primary" placeholder="https://youtube.com/..." />
                  </label>
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="grid gap-5">
                <h2 className="text-3xl font-bold text-text-primary">Candidate fit checks</h2>
                <div className="grid gap-3">
                  {draft.application_questions.map((question, index) => (
                    <label key={index} className="grid gap-2 text-sm font-semibold text-text-secondary">
                      Fit check {index + 1}
                      <input
                        value={question}
                        onChange={event => {
                          const next = [...draft.application_questions];
                          next[index] = event.target.value;
                          updateDraft({ application_questions: next });
                        }}
                        className="border border-ui-border bg-background-main px-4 py-3 text-text-primary"
                      />
                    </label>
                  ))}
                  <button type="button" onClick={() => updateDraft({ application_questions: [...draft.application_questions, ''] })} className="border border-ui-border px-5 py-3 font-semibold text-text-primary">Add a fit check</button>
                </div>
                <div className="border border-ui-border bg-background-main p-5">
                  <h3 className="text-2xl font-bold text-text-primary">Review</h3>
                  <dl className="mt-4 grid gap-3 text-sm text-text-secondary md:grid-cols-2">
                    <div><dt className="font-semibold text-text-primary">Job</dt><dd>{draft.title || 'Untitled job draft'}</dd></div>
                    <div><dt className="font-semibold text-text-primary">Location</dt><dd>{draft.location || 'Not set'}</dd></div>
                    <div><dt className="font-semibold text-text-primary">Engagement</dt><dd>{draft.engagement_model}</dd></div>
                    <div><dt className="font-semibold text-text-primary">Listing</dt><dd>Free marketplace listing</dd></div>
                  </dl>
                </div>
              </div>
            )}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-ui-border pt-6">
              <button type="button" onClick={() => setStep(Math.max(0, step - 1))} className="border border-ui-border px-5 py-3 font-semibold text-text-primary">Back</button>
              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={() => void saveJob('draft')} disabled={status === 'saving'} className="px-5 py-3 font-semibold text-text-secondary disabled:opacity-60">Save draft</button>
                {step < ROLE_STEPS.length - 1 ? (
                  <button type="button" onClick={() => setStep(step + 1)} className="bg-accent-primary px-6 py-3 font-semibold text-background-main">Continue</button>
                ) : (
                  <button type="button" onClick={() => void saveJob('submit')} disabled={status === 'saving'} className="bg-accent-primary px-6 py-3 font-semibold text-background-main disabled:opacity-60">Submit for review</button>
                )}
              </div>
            </div>
            {message && <p className={`mt-4 text-sm ${status === 'error' ? 'text-red-300' : 'text-accent-primary'}`} role="status">{message}</p>}
          </div>
          <aside className="h-fit border border-ui-border bg-background-card p-5">
            <h2 className="text-xl font-bold text-text-primary">Marketplace preview</h2>
            <div className="mt-5 border border-ui-border bg-background-main p-5">
              <Badge>Free listing</Badge>
              <h3 className="mt-4 text-2xl font-bold text-text-primary">{draft.title || 'Job title'}</h3>
              <p className="mt-2 text-text-secondary">{draft.brand_name || 'Your brand'} · {draft.location || 'Location'}</p>
              <p className="mt-4 text-text-secondary">{draft.summary || 'The candidate-facing summary will appear here.'}</p>
              {draft.compensation_summary && <p className="mt-4 font-semibold text-accent-primary">{draft.compensation_summary}</p>}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function CandidatePreviewPanel() {
  return (
    <div className="mt-10">
      <h2 className="text-3xl font-bold text-text-primary">Limited matched candidate previews</h2>
      <p className="mt-3 text-text-secondary">No email, phone, resume, full surname or exact home suburb is included in these cards.</p>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {LIMITED_CANDIDATE_PREVIEWS.map(candidate => (
          <article key={candidate.id} className="border border-ui-border bg-background-card p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold text-text-primary">{candidate.firstName} {candidate.surnameInitial}.</h3>
                <p className="mt-1 text-accent-primary">{candidate.headline}</p>
              </div>
              <span className="text-2xl font-bold text-accent-primary">{candidate.matchPercentage}%</span>
            </div>
            <p className="mt-4 text-text-secondary">{candidate.summary}</p>
            <div className="mt-4 grid gap-2 text-sm text-text-secondary">
              <span>{candidate.broadArea} - {candidate.distance}</span>
              <span>{candidate.availability}</span>
              <span>{candidate.preferredModel}</span>
              <span>{candidate.lastActive}</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {candidate.specialisations.map(item => <span key={item} className="bg-background-section px-3 py-1 text-sm text-text-secondary">{item}</span>)}
            </div>
            <button
              onClick={() => {
                void submitEmployerInterest({
                  employer_id: 'demo-employer',
                  job_id: 'demo-job',
                  candidate_id: candidate.id,
                  requested_by_user_id: 'demo-user',
                  message: 'This candidate may suit our active role.'
                }).catch(() => undefined);
              }}
              className="mt-6 w-full bg-accent-primary px-5 py-3 font-semibold text-background-main"
            >
              This person may be a good fit
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}

function DisclosurePanel() {
  return (
    <div className="mt-10 border border-accent-primary bg-accent-primary/10 p-8">
      <h2 className="text-3xl font-bold text-text-primary">Disclosure approval example</h2>
      <p className="mt-3 text-text-secondary">
        Candidate approval is specific to Summit Performance Studio and the Strength and Conditioning Coach role.
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {['Full name', 'Professional headline', 'Career summary', 'Relevant employment history', 'Qualifications', 'General availability'].map(item => (
          <label key={item} className="flex gap-3 border border-ui-border bg-background-card p-4 text-text-secondary">
            <input type="checkbox" defaultChecked />
            <span>{item}</span>
          </label>
        ))}
      </div>
      <button
        onClick={() => {
          void approveCandidateDisclosure({
            candidate_id: 'demo-candidate',
            employer_id: 'demo-employer',
            job_id: 'demo-job',
            approved_fields: ['Full name', 'Professional headline', 'Career summary', 'Relevant employment history', 'Qualifications', 'General availability']
          }).catch(() => undefined);
        }}
        className="mt-6 bg-accent-primary px-6 py-3 font-semibold text-background-main"
      >
        Approve selected information
      </button>
    </div>
  );
}

function AdminOpsPanel() {
  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-2">
      <div className="border border-ui-border bg-background-card p-6">
        <h2 className="text-2xl font-bold text-text-primary">Recruitment pipeline</h2>
        <div className="mt-5 grid gap-2">
          {WORKFLOW_STAGES.map(stage => <p key={stage} className="border border-ui-border bg-background-main px-4 py-2 text-text-secondary">{stage}</p>)}
        </div>
      </div>
      <div className="border border-ui-border bg-background-card p-6">
        <h2 className="text-2xl font-bold text-text-primary">Audit-first operations</h2>
        <p className="mt-4 text-text-secondary">
          Admin access, candidate preview views, interest requests, disclosure approvals, document access and placement records are modelled as immutable audit events.
        </p>
      </div>
    </div>
  );
}

const LEGAL_PAGE_COPY: Record<string, { eyebrow: string; intro: string; sections: Array<[string, string]> }> = {
  privacy: {
    eyebrow: 'Privacy',
    intro: 'This notice explains how BIFC Careers handles information provided by candidates and employers using the careers platform.',
    sections: [
      ['Information we collect', 'BIFC Careers collects account details, profile information, career preferences, role activity and employer workflow records needed to operate the platform.'],
      ['How we use it', 'We use this information to maintain accounts, surface relevant opportunities, manage employer interest, support candidate disclosure approvals and keep audit records.'],
      ['Candidate control', 'Employers initially receive limited previews. Contact details and identifying information are shared only through the approved disclosure workflow.'],
      ['Questions', 'For privacy questions or access requests, contact support@beinspiredfitnessandcoaching.com.']
    ]
  },
  terms: {
    eyebrow: 'Platform terms',
    intro: 'These terms set the baseline rules for using BIFC Careers.',
    sections: [
      ['Use of the platform', 'Candidates and employers must provide accurate information and use BIFC Careers only for genuine fitness-industry career and recruitment activity.'],
      ['Candidate information', 'Candidate data may not be exported, copied or used outside the approved role workflow.'],
      ['Availability', 'BIFC may update, pause or moderate platform access to protect candidates, employers and the integrity of the service.'],
      ['Support', 'Questions about platform access can be sent to support@beinspiredfitnessandcoaching.com.']
    ]
  },
  candidateTerms: {
    eyebrow: 'Candidate terms',
    intro: 'These terms apply when you create or use a BIFC Careers candidate profile.',
    sections: [
      ['Your profile', 'You are responsible for keeping your profile accurate and can update or withdraw your information when your goals change.'],
      ['Employer disclosure', 'Employers receive limited previews first. You choose when additional details are shared for a specific opportunity.'],
      ['Opportunities', 'BIFC may contact you about roles that appear relevant to your preferences, qualifications, location or availability.'],
      ['Contact', 'Candidate support is available at support@beinspiredfitnessandcoaching.com.']
    ]
  },
  employerTerms: {
    eyebrow: 'Employer terms',
    intro: 'These terms apply when an employer creates an account, posts roles or reviews candidate previews through BIFC Careers.',
    sections: [
      ['Employer use', 'Employers must use BIFC Careers only for genuine hiring activity and provide accurate role and organisation information.'],
      ['Candidate data', 'Candidate previews are confidential, limited and must not be exported, scraped or used outside the approved role workflow.'],
      ['Disclosure', 'Direct candidate contact details are available only when a candidate approves disclosure for a specific opportunity.'],
      ['Moderation', 'BIFC may review, edit, pause or remove employer access, job ads or interest requests to protect candidates and platform integrity.']
    ]
  },
  collectionNotice: {
    eyebrow: 'Collection notice',
    intro: 'This collection notice summarises what BIFC Careers collects at registration and why.',
    sections: [
      ['Why we collect information', 'BIFC collects your details to create your account, operate your profile, identify relevant opportunities and manage candidate-employer workflows.'],
      ['What employers see', 'Employers initially see limited information only. Your contact details are not shared until you approve disclosure for a specific opportunity.'],
      ['Optional information', 'Some fields, such as phone and suburb, help BIFC understand fit and availability but can be completed later where marked optional.'],
      ['Access and correction', 'You can ask to access, correct or withdraw your profile by contacting support@beinspiredfitnessandcoaching.com.']
    ]
  }
};

function LegalContent({ title, page }: { title: string; page: keyof typeof LEGAL_PAGE_COPY }) {
  const content = LEGAL_PAGE_COPY[page];

  return (
    <>
      <Helmet>
        <title>{title} | BIFC Careers</title>
      </Helmet>
      <CareersHeader
        eyebrow={content.eyebrow}
        title={title}
        intro={content.intro}
      />
      <section className="py-16">
        <div className="mx-auto grid max-w-4xl gap-5 px-4 sm:px-6 lg:px-8">
          {content.sections.map(([heading, body]) => (
            <section key={heading} className="border border-ui-border bg-background-card p-6">
              <h2 className="text-2xl font-bold text-text-primary">{heading}</h2>
              <p className="mt-3 text-text-secondary">{body}</p>
            </section>
          ))}
        </div>
      </section>
    </>
  );
}

export default function Careers({ mode = 'home' }: CareersProps) {
  return (
    <div className="min-h-screen bg-background-main">
      {mode === 'home' && <CareersHome />}
      {mode === 'jobs' && <CareersJobs />}
      {mode === 'employers' && <Employers />}
      {mode === 'talent' && <Talent />}
      {mode === 'register' && <Register />}
      {mode === 'employerRegister' && <EmployerRegister />}
      {mode === 'employerJobPost' && <EmployerJobPost />}
      {mode === 'login' && <Login />}
      {mode === 'forgotPassword' && <ForgotPassword />}
      {mode === 'candidate' && <CandidateDashboard />}
      {mode === 'employer' && <EmployerDashboard />}
      {mode === 'admin' && <AdminDashboard />}
      {mode === 'privacy' && <LegalContent title="BIFC Careers Privacy Notice" page="privacy" />}
      {mode === 'terms' && <LegalContent title="BIFC Careers Platform Terms" page="terms" />}
      {mode === 'candidateTerms' && <LegalContent title="BIFC Careers Candidate Terms" page="candidateTerms" />}
      {mode === 'employerTerms' && <LegalContent title="BIFC Careers Employer Terms" page="employerTerms" />}
      {mode === 'collectionNotice' && <LegalContent title="BIFC Careers Collection Notice" page="collectionNotice" />}
    </div>
  );
}
