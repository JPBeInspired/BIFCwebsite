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
        {job.matchPercentage && (
          <span className="ml-auto text-sm font-bold text-accent-primary">{job.matchPercentage}% match preview</span>
        )}
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
          content="Create one BIFC fitness career profile, find suitable roles, and control which employers receive your information."
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
              Build your career in fitness
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-text-secondary">
              Find personal training, coaching, management and fitness-industry opportunities across Australia.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <PrimaryLink to="/careers/jobs">Find Fitness Jobs</PrimaryLink>
              <SecondaryLink to="/careers/register">Create Your Career Profile</SecondaryLink>
              <SecondaryLink to="/careers/employers">Find Fitness Professionals</SecondaryLink>
            </div>
          </div>
          <div className="border border-ui-border bg-background-card/95 p-6">
            <h2 className="text-2xl font-bold text-text-primary">Search fitness roles</h2>
            <div className="mt-6 grid gap-4">
              <label className="grid gap-2 text-sm font-semibold text-text-secondary">
                Keyword or role
                <input className="border border-ui-border bg-background-main px-4 py-3 text-text-primary" placeholder="Personal trainer, manager, Pilates" />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-text-secondary">
                Location
                <input className="border border-ui-border bg-background-main px-4 py-3 text-text-primary" placeholder="Melbourne, Sydney, Brisbane" />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-text-secondary">
                Distance
                <select className="border border-ui-border bg-background-main px-4 py-3 text-text-primary">
                  <option>Within 10 km</option>
                  <option>Within 25 km</option>
                  <option>Within 50 km</option>
                  <option>Remote or relocation</option>
                </select>
              </label>
              <PrimaryLink to="/careers/jobs">Search jobs</PrimaryLink>
            </div>
          </div>
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
              'BIFC keeps the candidate relationship visible and attributable.'
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
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="text-4xl font-bold text-text-primary">BIFC recruitment experience, built into the platform</h2>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-text-secondary">
                BIFC Careers is owned and operated by Be Inspired Fitness and Coaching. It supports BIFC-managed opportunities, verified employer roles and recruitment partner workflows while keeping candidate ownership centralised inside BIFC.
              </p>
            </div>
            <div className="border border-accent-primary bg-accent-primary/10 p-6">
              <h3 className="text-2xl font-bold text-text-primary">Build your fitness team</h3>
              <p className="mt-3 text-text-secondary">Advertise your opportunity and discover fitness professionals who may suit your team.</p>
              <div className="mt-6">
                <PrimaryLink to="/careers/employers/register">Post a Job</PrimaryLink>
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
        title="Join the BIFC Careers talent network"
        intro="This foundation form records the required consent model. Production launch requires final Australian legal and privacy review before accepting live candidates."
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
        intro="Create your employer account, start your dashboard immediately, and keep candidate contact details protected until the proper interest and disclosure workflow is complete."
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
            <input name="password" type="password" className="border border-ui-border bg-background-main px-4 py-3 text-text-primary" required />
          </label>
          <button disabled={status === 'submitting'} className="mt-6 w-full bg-accent-primary px-6 py-3 font-semibold text-background-main disabled:opacity-60">
            {status === 'submitting' ? 'Signing in...' : 'Continue'}
          </button>
          {message && <p className="mt-4 text-sm text-red-300" role="status">{message}</p>}
          <p className="mt-4 text-sm text-text-secondary">Employer access starts immediately. Candidate contact details remain unavailable until candidate-approved disclosure.</p>
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
          <h2 className="text-2xl font-bold text-text-primary">{isCandidate ? 'Candidate commitments' : 'Employer obligations'}</h2>
          <div className="mt-6 space-y-4 text-text-secondary">
            {(isCandidate
              ? [
                  'You are joining the broader BIFC Careers talent network.',
                  'BIFC may contact you about BIFC-managed and suitable third-party fitness opportunities.',
                  'Employer disclosure is controlled through the platform process.',
                  'Optional marketing consent must be separate and not preselected.'
                ]
              : [
                  'Employer accounts require BIFC approval before publishing jobs or viewing candidate previews.',
                  'Candidate previews are limited and cannot be exported.',
                  'Interest requests do not reveal direct contact details.',
                  'Candidate information may only be used for the approved role workflow.'
                ]).map(item => (
              <p key={item} className="flex gap-3">
                <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-accent-primary" />
                <span>{item}</span>
              </p>
            ))}
          </div>
        </div>
        <form onSubmit={handleSubmit} className="border border-ui-border bg-background-card p-8">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold text-text-secondary">
              {isCandidate ? 'First name' : 'Trading name'}
              <input name={isCandidate ? 'first_name' : 'trading_name'} className="border border-ui-border bg-background-main px-4 py-3 text-text-primary" required />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-text-secondary">
              {isCandidate ? 'Surname' : 'ABN'}
              <input name={isCandidate ? 'surname' : 'abn'} className="border border-ui-border bg-background-main px-4 py-3 text-text-primary" required={isCandidate} />
            </label>
            {!isCandidate && (
              <>
                <label className="grid gap-2 text-sm font-semibold text-text-secondary">
                  Legal business name
                  <input name="legal_business_name" className="border border-ui-border bg-background-main px-4 py-3 text-text-primary" required />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-text-secondary">
                  Main contact
                  <input name="contact_name" className="border border-ui-border bg-background-main px-4 py-3 text-text-primary" required />
                </label>
              </>
            )}
            <label className="grid gap-2 text-sm font-semibold text-text-secondary">
              Email
              <input name="email" type="email" className="border border-ui-border bg-background-main px-4 py-3 text-text-primary" required />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-text-secondary">
              Mobile
              <input name="mobile" type="tel" className="border border-ui-border bg-background-main px-4 py-3 text-text-primary" />
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
                  Suburb
                  <input name="suburb" className="border border-ui-border bg-background-main px-4 py-3 text-text-primary" />
                </label>
              </>
            )}
          </div>
          <label className="mt-5 flex gap-3 text-sm text-text-secondary">
            <input name="accepted_terms" type="checkbox" className="mt-1" required />
            <span>I accept the current BIFC Careers collection notice, terms and privacy acknowledgement. Final wording requires Australian legal review before production launch.</span>
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
        intro="Dashboard foundations are built around server-side role checks, limited disclosure, BIFC visibility and audit trails."
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
          {role === 'employer' && <CandidatePreviewPanel />}
          {role === 'candidate' && <DisclosurePanel />}
          {role === 'admin' && <AdminOpsPanel />}
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

function LegalPlaceholder({ title }: { title: string }) {
  return (
    <>
      <Helmet>
        <title>{title} | BIFC Careers</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <CareersHeader
        eyebrow="Legal review required"
        title={title}
        intro="Placeholder content only. Final wording must be reviewed by Australian legal and privacy advisers before production use."
      />
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 text-text-secondary sm:px-6 lg:px-8">
          <p>
            This page marks the required policy surface for BIFC Careers. The implementation records policy versions and acceptances, but this placeholder must not be treated as final legal wording.
          </p>
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
      {mode === 'login' && <Login />}
      {mode === 'candidate' && <CandidateDashboard />}
      {mode === 'employer' && <EmployerDashboard />}
      {mode === 'admin' && <AdminDashboard />}
      {mode === 'privacy' && <LegalPlaceholder title="BIFC Careers Privacy Notice" />}
      {mode === 'terms' && <LegalPlaceholder title="BIFC Careers Platform Terms" />}
      {mode === 'candidateTerms' && <LegalPlaceholder title="BIFC Careers Candidate Terms" />}
      {mode === 'employerTerms' && <LegalPlaceholder title="BIFC Careers Employer Terms" />}
      {mode === 'collectionNotice' && <LegalPlaceholder title="BIFC Careers Collection Notice" />}
    </div>
  );
}
