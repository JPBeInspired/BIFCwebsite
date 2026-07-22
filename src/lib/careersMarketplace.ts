import { CandidatePreview, CareersEmployer, CareersJob } from '../types/careers';

export const ROLE_CATEGORIES = [
  'Personal trainer',
  'Group fitness instructor',
  'Pilates instructor',
  'Strength and conditioning coach',
  'Club manager',
  'Fitness manager',
  'Membership consultant',
  'Online coach'
];

export const ENGAGEMENT_MODELS = [
  'Permanent employee',
  'Part-time employee',
  'Casual employee',
  'Fixed-term employee',
  'Independent contractor',
  'Sole trader or rental model',
  'Revenue-share model',
  'Hybrid arrangement',
  'Internship or placement',
  'Graduate opportunity'
];

export const WORKFLOW_STAGES = [
  'New applicant',
  'Interest awaiting response',
  'Connected',
  'Phone screen',
  'Club interview',
  'Practical audition',
  'Commercial discussion',
  'Compliance',
  'Offer',
  'Accepted',
  'Hired',
  'Talent pool',
  'Unsuccessful',
  'Withdrawn'
];

export const FEATURED_CAREERS_JOBS: CareersJob[] = [
  {
    id: 'bifc-melbourne-pt',
    slug: 'personal-trainer-melbourne-growth-club',
    title: 'Personal Trainer - Growth Club Network',
    employerName: 'Be Inspired Fitness and Coaching',
    employerSlug: 'be-inspired-fitness-and-coaching',
    location: 'Melbourne, VIC',
    state: 'VIC',
    workplaceType: 'Onsite',
    roleCategory: 'Personal trainer',
    engagementModel: 'Sole trader or rental model',
    experienceLevel: 'Early career to experienced',
    compensation: 'Structured rental model with onboarding support',
    summary: 'Build your PT business inside a supported BIFC-managed club environment.',
    description:
      'A BIFC-managed opportunity for trainers who want coaching, business systems, mentoring and a clear pathway to sustainable client growth.',
    benefits: ['BIFC onboarding', 'Business coaching', 'Mentoring sessions', 'Club lead support'],
    requirements: ['Certificate IV in Fitness', 'Current First Aid and CPR', 'Public liability cover before commencement'],
    specialisations: ['General population', 'Strength training', 'Fat loss'],
    postedDate: '2026-07-18',
    closingDate: '2026-08-22',
    featured: true,
    verifiedEmployer: true,
    managementType: 'BIFC Managed',
    matchPercentage: 92,
    matchReasons: ['Matches contractor preference', 'Within preferred travel radius', 'Strength-training focus aligns']
  },
  {
    id: 'summit-strength-coach',
    slug: 'strength-conditioning-coach-sydney',
    title: 'Strength and Conditioning Coach',
    employerName: 'Summit Performance Studio',
    employerSlug: 'summit-performance-studio',
    location: 'Sydney, NSW',
    state: 'NSW',
    workplaceType: 'Onsite',
    roleCategory: 'Strength and conditioning coach',
    engagementModel: 'Part-time employee',
    experienceLevel: '2+ years',
    compensation: '$38-$48 per hour plus development pathway',
    summary: 'Coach small-group strength sessions with a performance-focused studio team.',
    description:
      'A verified external employer opportunity for coaches who enjoy structured programming, member education and small-group delivery.',
    benefits: ['Paid team development', 'Programming support', 'Defined progression pathway'],
    requirements: ['Certificate III or IV in Fitness', 'Current First Aid and CPR', 'Small-group coaching experience'],
    specialisations: ['Strength training', 'Sports performance', 'Mobility'],
    postedDate: '2026-07-16',
    closingDate: '2026-08-18',
    featured: true,
    verifiedEmployer: true,
    managementType: 'BIFC Recruitment Partner',
    matchPercentage: 86,
    matchReasons: ['Required qualification present', 'Availability aligns', 'Relevant strength experience']
  },
  {
    id: 'coastal-pilates-reformer',
    slug: 'reformer-pilates-instructor-brisbane',
    title: 'Reformer Pilates Instructor',
    employerName: 'Coastal Motion Pilates',
    employerSlug: 'coastal-motion-pilates',
    location: 'Brisbane, QLD',
    state: 'QLD',
    workplaceType: 'Hybrid',
    roleCategory: 'Pilates instructor',
    engagementModel: 'Casual employee',
    experienceLevel: 'Qualified instructor',
    compensation: '$45-$60 per class based on experience',
    summary: 'Join a growing Pilates studio with flexible class blocks and member care support.',
    description:
      'A direct employer role for a reformer Pilates instructor seeking regular shifts, a warm studio culture and flexible scheduling.',
    benefits: ['Flexible class blocks', 'Member care team', 'Continuing education allowance'],
    requirements: ['Recognised reformer Pilates qualification', 'Current CPR', 'Weekend availability preferred'],
    specialisations: ['Reformer Pilates', 'Beginners', 'Pre- and post-natal'],
    postedDate: '2026-07-15',
    closingDate: '2026-08-15',
    featured: false,
    verifiedEmployer: true,
    managementType: 'Posted Directly by Employer',
    matchPercentage: 81,
    matchReasons: ['Casual model preference', 'Pilates qualification match', 'Weekend availability useful']
  }
];

export const CAREERS_EMPLOYERS: CareersEmployer[] = [
  {
    id: 'bifc',
    slug: 'be-inspired-fitness-and-coaching',
    name: 'Be Inspired Fitness and Coaching',
    type: 'PT management and recruitment',
    location: 'National',
    description:
      'BIFC-managed clubs, recruitment partnerships and trainer development pathways across Australia.',
    verified: true,
    relationship: 'BIFC Managed',
    support: ['Recruiter support', 'Trainer development', 'Business systems', 'Placement tracking'],
    activeJobs: ['bifc-melbourne-pt']
  },
  {
    id: 'summit',
    slug: 'summit-performance-studio',
    name: 'Summit Performance Studio',
    type: 'Performance studio',
    location: 'Sydney, NSW',
    description:
      'Small-group and performance coaching studio with structured programming and coach mentoring.',
    verified: true,
    relationship: 'BIFC Recruitment Partner',
    support: ['Programming support', 'Paid development', 'Mentoring'],
    activeJobs: ['summit-strength-coach']
  },
  {
    id: 'coastal',
    slug: 'coastal-motion-pilates',
    name: 'Coastal Motion Pilates',
    type: 'Pilates studio',
    location: 'Brisbane, QLD',
    description:
      'Boutique Pilates team offering flexible class blocks and a supportive member-care model.',
    verified: true,
    relationship: 'Verified Employer',
    support: ['Flexible scheduling', 'Studio onboarding', 'Education allowance'],
    activeJobs: ['coastal-pilates-reformer']
  }
];

export const LIMITED_CANDIDATE_PREVIEWS: CandidatePreview[] = [
  {
    id: 'candidate-preview-1',
    firstName: 'Amelia',
    surnameInitial: 'R',
    headline: 'Certified PT focused on strength, beginners and habit-building',
    broadArea: 'Inner North Melbourne',
    distance: 'Approx. 8 km from workplace',
    summary: 'Early-career trainer with strong member rapport and evening availability.',
    experienceLevel: '1-2 years',
    specialisations: ['Strength training', 'Beginners', 'Fat loss'],
    availability: 'Weekday evenings and Saturday mornings',
    preferredModel: 'Rental or hybrid arrangement',
    lastActive: 'Active this week',
    matchPercentage: 92,
    matchReasons: ['Within travel radius', 'Contractor preference aligns', 'Required qualification declared']
  },
  {
    id: 'candidate-preview-2',
    firstName: 'Marcus',
    surnameInitial: 'T',
    headline: 'Group coach and S&C specialist',
    broadArea: 'Eastern Sydney',
    distance: 'Approx. 12 km from workplace',
    summary: 'Performance-minded coach with small-group delivery and sports experience.',
    experienceLevel: '3-5 years',
    specialisations: ['Sports performance', 'Strength training', 'Mobility'],
    availability: 'Mornings and selected evenings',
    preferredModel: 'Part-time employee',
    lastActive: 'Active today',
    matchPercentage: 86,
    matchReasons: ['Availability aligns', 'Strength experience preferred', 'Employee model preference']
  }
];

export function filterCareersJobs(
  jobs: CareersJob[],
  filters: { search?: string; state?: string; engagementModel?: string; category?: string }
) {
  const search = filters.search?.trim().toLowerCase();

  return jobs.filter(job => {
    const searchMatch =
      !search ||
      [job.title, job.employerName, job.location, job.summary, job.roleCategory]
        .join(' ')
        .toLowerCase()
        .includes(search);
    const stateMatch = !filters.state || filters.state === 'all' || job.state === filters.state;
    const modelMatch =
      !filters.engagementModel || filters.engagementModel === 'all' || job.engagementModel === filters.engagementModel;
    const categoryMatch = !filters.category || filters.category === 'all' || job.roleCategory === filters.category;

    return searchMatch && stateMatch && modelMatch && categoryMatch;
  });
}
