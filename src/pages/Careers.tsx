import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, MapPin, Building2, Users, Star, ArrowRight, Brain, Trophy, Target, Video, FileText, Dumbbell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import DynamicCounter from '../components/DynamicCounter';
import { getPublicJobListings } from '../lib/supabase';
import { JobFilter } from '../types/careers';
import toast from 'react-hot-toast';

const STATES = [
  { value: 'all', label: 'All Locations' },
  { value: 'nsw', label: 'New South Wales' },
  { value: 'vic', label: 'Victoria' },
  { value: 'qld', label: 'Queensland' },
  { value: 'wa', label: 'Western Australia' },
  { value: 'sa', label: 'South Australia' },
];

const EMPLOYMENT_TYPES = [
  { value: 'all', label: 'All Types' },
  { value: 'rent-based', label: 'Rent-Based' },
  { value: 'employed', label: 'Employed' },
  { value: 'contractor', label: 'Contractor' },
];

const BENEFITS = [
  {
    title: 'Ongoing Education',
    description: 'Regular workshops, certifications, and skill development programs.',
    icon: Brain
  },
  {
    title: 'Career Growth',
    description: 'Clear pathways for advancement and leadership opportunities.',
    icon: Target
  },
  {
    title: 'Business Support',
    description: 'Full marketing, sales, and business development coaching.',
    icon: Trophy
  },
  {
    title: 'Premium Network',
    description: "Access to Australia's leading gym brands and facilities.",
    icon: Star
  }
];

export default function Careers() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<JobFilter>({
    state: 'all',
    employmentType: 'all',
    search: ''
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const data = await getPublicJobListings();
      setJobs(data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast.error('Failed to load job listings');
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = !filters.search || 
      job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      job.location.toLowerCase().includes(filters.search.toLowerCase());

    const matchesState = filters.state === 'all' || 
      job.location.toLowerCase().includes(filters.state.toLowerCase());

    const matchesType = filters.employmentType === 'all' || 
      job.job_type.toLowerCase() === filters.employmentType.toLowerCase();

    return matchesSearch && matchesState && matchesType;
  });

  return (
    <div className="min-h-screen bg-background-main pt-20">
      <Helmet>
        <title>Careers | Be Inspired Fitness</title>
        <meta name="description" content="Join a community of driven Personal Trainers building a career with purpose. Explore the latest job opportunities across Australia with Be Inspired Fitness." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0">
          <div className="relative h-full">
            <img
              src="https://i.imgur.com/OudFHZd.jpeg"
              alt="Personal trainers working together"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background-main/95 via-background-main/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-background-main via-background-main/50 to-transparent" />
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold text-text-primary mb-6 leading-tight">
              Work With Be Inspired
            </h1>
            <p className="text-xl text-text-secondary mb-8 max-w-2xl leading-relaxed">
              Join a community of driven Personal Trainers building a career with purpose. 
              Explore the latest job opportunities across Australia.
            </p>
            <div className="flex flex-wrap gap-6">
              <a
                href="#jobs-section"
                className="inline-flex items-center px-8 py-4 bg-accent-primary text-text-primary hover:bg-accent-hover transition-colors group"
              >
                View Open Positions
                <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/contact#enquiry-form"
                className="inline-flex items-center px-8 py-4 border-2 border-text-primary text-text-primary hover:bg-text-primary hover:text-background-main transition-colors"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="sticky top-20 bg-background-section border-y border-ui-border z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary h-5 w-5" />
              <input
                type="text"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                placeholder="Search by location or job title..."
                className="w-full pl-12 pr-4 py-3 bg-background-card border border-ui-border text-text-primary focus:border-accent-primary transition-colors"
              />
            </div>
            <select
              value={filters.state}
              onChange={(e) => setFilters({ ...filters, state: e.target.value })}
              className="px-4 py-3 bg-background-card border border-ui-border text-text-primary focus:border-accent-primary transition-colors"
            >
              {STATES.map(state => (
                <option key={state.value} value={state.value}>
                  {state.label}
                </option>
              ))}
            </select>
            <select
              value={filters.employmentType}
              onChange={(e) => setFilters({ ...filters, employmentType: e.target.value })}
              className="px-4 py-3 bg-background-card border border-ui-border text-text-primary focus:border-accent-primary transition-colors"
            >
              {EMPLOYMENT_TYPES.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section id="jobs-section" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-text-secondary">Loading jobs...</p>
            </div>
          ) : filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredJobs.map(job => (
                <Link
                  key={job.id}
                  to={`/careers/${job.id}`}
                  className="group relative bg-background-card border border-ui-border hover:border-accent-primary transition-all duration-300 p-8 rounded-xl hover:shadow-lg"
                >
                  {/* Listed X days ago */}
                  <div className="absolute top-4 right-4 text-sm text-text-secondary bg-background-section px-3 py-1 rounded-full">
                    Listed {formatDistanceToNow(new Date(job.created_at))} ago
                  </div>

                  {/* Title and Location Info */}
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-text-primary group-hover:text-accent-primary transition-colors mb-2">
                      {job.title}
                    </h2>
                    <div className="flex flex-wrap gap-6 text-text-secondary mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-accent-primary" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-accent-primary" />
                        <span>{job.club_name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-accent-primary" />
                        <span>{job.job_type}</span>
                      </div>
                    </div>
                    <p className="text-lg text-accent-primary italic">
                      {job.headline}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {job.tags.split(',').map((tag: string, index: number) => (
                      <span
                        key={index}
                        className={`px-3 py-1 text-sm rounded-full ${
                          tag.trim().toLowerCase() === 'pt' 
                            ? 'bg-[#003340] text-accent-primary'
                            : 'bg-background-section text-text-secondary'
                        }`}
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center text-accent-primary group-hover:text-accent-hover transition-colors">
                    View Position
                    <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-text-secondary">No jobs found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-24 bg-background-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-primary mb-6">
              Why Trainers Choose Be Inspired
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              We've helped over 10,000 trainers launch successful careers across Australia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {BENEFITS.map((benefit, index) => (
              <div key={index} className="bg-background-card p-8 border border-ui-border">
                <benefit.icon className="h-12 w-12 text-accent-primary mb-6" />
                <h3 className="text-xl font-bold text-text-primary mb-4">
                  {benefit.title}
                </h3>
                <p className="text-text-secondary">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <DynamicCounter baseValue={9536} minIncrease={1} maxIncrease={5} />
              <p className="text-text-secondary mt-2">Personal Trainers Supported</p>
            </div>
            <div>
              <span className="text-3xl font-bold text-accent-primary">98%</span>
              <p className="text-text-secondary mt-2">Satisfaction Rate</p>
            </div>
            <div>
              <span className="text-3xl font-bold text-accent-primary">24/7</span>
              <p className="text-text-secondary mt-2">Expert Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-text-primary mb-6">
            Don't See Your Role Listed?
          </h2>
          <p className="text-xl text-text-secondary mb-12 max-w-2xl mx-auto">
            We're always looking for talented trainers. Get in touch with us and we'll be in touch when the right role opens up.
          </p>
          <a
            href="/contact#enquiry-form"
            className="px-8 py-4 bg-accent-primary text-text-primary hover:bg-accent-hover transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
}