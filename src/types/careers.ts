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
}