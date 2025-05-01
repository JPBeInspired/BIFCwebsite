import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { getUser, createJobListing, updateJobListing } from '../../lib/supabase';
import toast from 'react-hot-toast';

interface JobFormData {
  title: string;
  location: string;
  club_name: string;
  job_type: string;
  tags: string;
  summary: string;
  headline: string;
  benefits: string;
  requirements: string;
  about_club: string;
  published: boolean;
}

const initialFormData: JobFormData = {
  title: '',
  location: '',
  club_name: '',
  job_type: '',
  tags: '',
  summary: '',
  headline: '',
  benefits: '',
  requirements: '',
  about_club: '',
  published: true
};

export default function JobForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState<JobFormData>(initialFormData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const user = await getUser();
      if (!user || user.email !== 'jakep@beinspired.fitness') {
        navigate('/admin');
      }
    } catch (error) {
      navigate('/admin');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        await updateJobListing(id, formData);
        toast.success('Job listing updated successfully');
      } else {
        await createJobListing(formData);
        toast.success('Job listing created successfully');
      }
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error saving job:', error);
      toast.error(id ? 'Failed to update job listing' : 'Failed to create job listing');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-main pt-20">
      {/* Header */}
      <header className="bg-background-section border-b border-ui-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="text-text-secondary hover:text-text-primary transition-colors mr-4"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="text-xl font-bold text-text-primary">
                {id ? 'Edit Job Listing' : 'Create Job Listing'}
              </h1>
            </div>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex items-center px-4 py-2 bg-accent-primary text-text-primary hover:bg-accent-hover transition-colors disabled:opacity-50"
            >
              <Save className="h-5 w-5 mr-2" />
              {loading ? 'Saving...' : 'Post Job'}
            </button>
          </div>
        </div>
      </header>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-background-card p-6 border border-ui-border">
            <div className="space-y-6">
              <div>
                <label className="block text-text-secondary mb-2">Job Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 bg-background-main border border-ui-border text-text-primary focus:border-accent-primary transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-text-secondary mb-2">Headline</label>
                <input
                  type="text"
                  value={formData.headline}
                  onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                  className="w-full px-4 py-2 bg-background-main border border-ui-border text-text-primary focus:border-accent-primary transition-colors"
                  placeholder="A short, catchy headline for the job listing"
                  required
                />
              </div>

              <div>
                <label className="block text-text-secondary mb-2">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 bg-background-main border border-ui-border text-text-primary focus:border-accent-primary transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-text-secondary mb-2">Club Name</label>
                <input
                  type="text"
                  value={formData.club_name}
                  onChange={(e) => setFormData({ ...formData, club_name: e.target.value })}
                  className="w-full px-4 py-2 bg-background-main border border-ui-border text-text-primary focus:border-accent-primary transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-text-secondary mb-2">Job Type</label>
                <input
                  type="text"
                  value={formData.job_type}
                  onChange={(e) => setFormData({ ...formData, job_type: e.target.value })}
                  className="w-full px-4 py-2 bg-background-main border border-ui-border text-text-primary focus:border-accent-primary transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-text-secondary mb-2">Tags</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full px-4 py-2 bg-background-main border border-ui-border text-text-primary focus:border-accent-primary transition-colors"
                  placeholder="Comma-separated tags"
                  required
                />
              </div>

              <div>
                <label className="block text-text-secondary mb-2">Summary</label>
                <textarea
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full px-4 py-2 bg-background-main border border-ui-border text-text-primary focus:border-accent-primary transition-colors h-32"
                  required
                />
              </div>

              <div>
                <label className="block text-text-secondary mb-2">Benefits</label>
                <textarea
                  value={formData.benefits}
                  onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                  className="w-full px-4 py-2 bg-background-main border border-ui-border text-text-primary focus:border-accent-primary transition-colors h-32"
                  required
                />
              </div>

              <div>
                <label className="block text-text-secondary mb-2">Requirements</label>
                <textarea
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  className="w-full px-4 py-2 bg-background-main border border-ui-border text-text-primary focus:border-accent-primary transition-colors h-32"
                  required
                />
              </div>

              <div>
                <label className="block text-text-secondary mb-2">About Club</label>
                <textarea
                  value={formData.about_club}
                  onChange={(e) => setFormData({ ...formData, about_club: e.target.value })}
                  className="w-full px-4 py-2 bg-background-main border border-ui-border text-text-primary focus:border-accent-primary transition-colors h-32"
                  required
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="h-4 w-4 text-accent-primary border-ui-border focus:ring-accent-primary"
                />
                <label htmlFor="published" className="text-text-secondary">
                  Publish this job listing
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}