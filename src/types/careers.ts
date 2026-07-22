export interface JobListing {
  id: string;
  title: string;
  slug: string;
  location: {
    suburb: string;
    state: string;
  };
  club: {
    name: string;
    brand: string;
  };
  description: string;
  employmentType: 'rent-based' | 'employed' | 'contractor';
  tags: string[];
  published: string;
  featured: boolean;
}

export interface JobFilter {
  state?: string;
  brand?: string;
  employmentType?: string;
  search?: string;
  location?: string;
  distance?: string;
  category?: string;
  experience?: string;
  workplace?: string;
  bifcManaged?: boolean;
  featured?: boolean;
}

export type CareersRouteMode =
  | 'home'
  | 'jobs'
  | 'employers'
  | 'talent'
  | 'register'
  | 'employerRegister'
  | 'login'
  | 'candidate'
  | 'employer'
  | 'admin'
  | 'privacy'
  | 'terms'
  | 'candidateTerms'
  | 'employerTerms'
  | 'collectionNotice';

export type JobManagementType =
  | 'BIFC Managed'
  | 'Posted Directly by Employer'
  | 'BIFC Recruitment Partner';

export interface CareersJob {
  id: string;
  slug: string;
  title: string;
  employerName: string;
  employerSlug: string;
  location: string;
  state: string;
  workplaceType: 'Onsite' | 'Hybrid' | 'Remote';
  roleCategory: string;
  engagementModel: string;
  experienceLevel: string;
  compensation: string;
  summary: string;
  description: string;
  benefits: string[];
  requirements: string[];
  specialisations: string[];
  postedDate: string;
  closingDate: string;
  featured: boolean;
  verifiedEmployer: boolean;
  managementType: JobManagementType;
  matchPercentage?: number;
  matchReasons?: string[];
}

export interface CareersEmployer {
  id: string;
  slug: string;
  name: string;
  type: string;
  location: string;
  description: string;
  verified: boolean;
  relationship: 'BIFC Recruitment Partner' | 'Verified Employer' | 'BIFC Managed';
  support: string[];
  activeJobs: string[];
}

export interface CandidatePreview {
  id: string;
  firstName: string;
  surnameInitial: string;
  headline: string;
  broadArea: string;
  distance: string;
  summary: string;
  experienceLevel: string;
  specialisations: string[];
  availability: string;
  preferredModel: string;
  lastActive: string;
  matchPercentage: number;
  matchReasons: string[];
}
