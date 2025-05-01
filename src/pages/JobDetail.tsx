import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, MapPin, Building2, Users, Star, Upload, ArrowRight } from 'lucide-react';
import { supabase, uploadResume, submitJobApplication } from '../lib/supabase';
import FileUpload from '../components/FileUpload';
import toast from 'react-hot-toast';

export default function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    cover_letter: '',
    resume_file: null as File | null
  });

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      const { data, error } = await supabase
        .from('job_listings')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setJob(data);
    } catch (error) {
      console.error('Error fetching job:', error);
      toast.error('Failed to load job details');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.resume_file) {
      toast.error('Please upload your resume');
      return;
    }

    setSubmitting(true);

    try {
      // Upload resume file
      const resumeUrl = await uploadResume(formData.resume_file);

      // Submit application
      await submitJobApplication({
        job_id: id!,
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        resume_file_url: resumeUrl,
        cover_letter: formData.cover_letter
      });

      toast.success('Application submitted successfully! We\'ll be in touch soon.');
      setSubmitted(true);
      
      // Reset form
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        cover_letter: '',
        resume_file: null
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background-main pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-text-secondary">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-background-main pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-3xl font-bold text-text-primary">Job not found</h1>
          <Link
            to="/careers"
            className="inline-flex items-center text-accent-primary hover:text-accent-hover mt-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Careers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-main pt-20">
      <Helmet>
        <title>{`${job.title} | Be Inspired Fitness Careers`}</title>
        <meta name="description" content={job.headline} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/careers"
            className="inline-flex items-center text-text-secondary hover:text-accent-primary mb-8 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Careers
          </Link>

          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold text-text-primary mb-4">
              {job.title}
            </h1>
            <p className="text-xl text-accent-primary mb-8">
              {job.headline}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
              <div className="flex items-center gap-2 text-text-secondary">
                <MapPin className="h-5 w-5 text-accent-primary" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary">
                <Building2 className="h-5 w-5 text-accent-primary" />
                <span>{job.club_name}</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary">
                <Users className="h-5 w-5 text-accent-primary" />
                <span>{job.job_type}</span>
              </div>
            </div>

            {/* Summary */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-text-primary mb-6">Overview</h2>
              <div className="space-y-4">
                {job.summary.split('\n').map((point: string, index: number) => (
                  point.trim() && (
                    <p key={index} className="text-text-secondary">
                      {point.trim()}
                    </p>
                  )
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-text-primary mb-6">Requirements</h2>
              <div className="space-y-2">
                {job.requirements.split('\n').map((req: string, index: number) => (
                  req.trim() && (
                    <p key={index} className="text-text-secondary">
                      {req.trim()}
                    </p>
                  )
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-text-primary mb-6">Benefits</h2>
              <div className="space-y-2">
                {job.benefits.split('\n').map((benefit: string, index: number) => (
                  benefit.trim() && (
                    <p key={index} className="text-text-secondary">
                      {benefit.trim()}
                    </p>
                  )
                ))}
              </div>
            </div>

            {/* About the Club */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-text-primary mb-6">About {job.club_name}</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-text-secondary">{job.about_club}</p>
              </div>
            </div>

            {/* Application Form */}
            <div className="bg-background-card border border-ui-border p-8">
              {submitted ? (
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-text-primary mb-4">
                    Application Submitted Successfully!
                  </h3>
                  <p className="text-text-secondary mb-8">
                    Thank you for your interest. Our team will review your application and get back to you soon.
                  </p>
                  <div className="space-y-6">
                    <a
                      href="https://meetings.hubspot.com/brenden-clark"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-accent-primary text-text-primary hover:bg-accent-hover transition-colors py-6 px-8 text-xl font-bold"
                    >
                      Fast-track Your Application
                      <ArrowRight className="inline-block ml-2 h-6 w-6" />
                    </a>
                    <p className="text-lg text-accent-primary">
                      Want to speed up the process? Book a quick chat with our recruitment team!
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-text-primary mb-6">Apply for This Position</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-text-secondary mb-2">Full Name</label>
                      <input
                        type="text"
                        value={formData.full_name}
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                        className="w-full px-4 py-3 bg-background-main border border-ui-border text-text-primary focus:border-accent-primary transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-text-secondary mb-2">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-background-main border border-ui-border text-text-primary focus:border-accent-primary transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-text-secondary mb-2">Phone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-background-main border border-ui-border text-text-primary focus:border-accent-primary transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-text-secondary mb-2">Resume</label>
                      <FileUpload
                        onFileSelect={(file) => setFormData({ ...formData, resume_file: file })}
                      />
                    </div>
                    <div>
                      <label className="block text-text-secondary mb-2">Cover Letter (Optional)</label>
                      <textarea
                        value={formData.cover_letter}
                        onChange={(e) => setFormData({ ...formData, cover_letter: e.target.value })}
                        className="w-full px-4 py-3 bg-background-main border border-ui-border text-text-primary focus:border-accent-primary transition-colors h-32"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full px-6 py-4 bg-accent-primary text-text-primary hover:bg-accent-hover transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Upload className="h-5 w-5" />
                      {submitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}