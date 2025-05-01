import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Pencil, Trash2, Search, Filter, ArrowLeft, FileText, Briefcase } from 'lucide-react';
import { getUser, getJobListings, unpublishJob } from '../../lib/supabase';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

type ContentType = 'jobs' | 'blog';

export default function Dashboard() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [contentType, setContentType] = useState<ContentType>('jobs');

  useEffect(() => {
    checkAuth();
    fetchJobs();
    fetchPosts();
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

  const fetchJobs = async () => {
    try {
      const data = await getJobListings();
      setJobs(data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast.error('Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_post')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Failed to fetch blog posts');
    }
  };

  const handleUnpublishJob = async (id: string) => {
    if (!window.confirm('Are you sure you want to unpublish this job listing?')) return;

    try {
      await unpublishJob(id);
      toast.success('Job listing unpublished');
      fetchJobs(); // Refresh the job listings
    } catch (error) {
      toast.error('Failed to unpublish job listing');
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;

    try {
      const { error } = await supabase
        .from('blog_post')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Blog post deleted');
      fetchPosts();
    } catch (error) {
      toast.error('Failed to delete blog post');
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || 
                         (filter === 'published' && job.published) ||
                         (filter === 'draft' && !job.published);
    return matchesSearch && matchesFilter;
  });

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || 
                         (filter === 'published' && post.published) ||
                         (filter === 'draft' && !post.published);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background-main">
      {/* Header */}
      <header className="bg-background-section border-b border-ui-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/')}
                className="text-text-secondary hover:text-text-primary transition-colors mr-4"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="text-xl font-bold text-text-primary">Admin Dashboard</h1>
            </div>
            <button
              onClick={() => navigate(contentType === 'jobs' ? '/admin/new-job' : '/admin/new-blog')}
              className="flex items-center px-4 py-2 bg-accent-primary text-text-primary hover:bg-accent-hover transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              {contentType === 'jobs' ? 'Post New Job' : 'Create New Post'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Content Type Selector */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setContentType('jobs')}
            className={`flex items-center px-6 py-3 rounded transition-colors ${
              contentType === 'jobs'
                ? 'bg-accent-primary text-text-primary'
                : 'bg-background-card text-text-secondary hover:bg-background-section'
            }`}
          >
            <Briefcase className="h-5 w-5 mr-2" />
            Job Listings
          </button>
          <button
            onClick={() => setContentType('blog')}
            className={`flex items-center px-6 py-3 rounded transition-colors ${
              contentType === 'blog'
                ? 'bg-accent-primary text-text-primary'
                : 'bg-background-card text-text-secondary hover:bg-background-section'
            }`}
          >
            <FileText className="h-5 w-5 mr-2" />
            Blog Posts
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary h-5 w-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${contentType === 'jobs' ? 'jobs' : 'posts'}...`}
              className="w-full pl-10 pr-4 py-2 bg-background-card border border-ui-border text-text-primary focus:border-accent-primary transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-text-secondary" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 bg-background-card border border-ui-border text-text-primary focus:border-accent-primary transition-colors"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>

        {/* Content List */}
        {contentType === 'jobs' ? (
          <div className="bg-background-card border border-ui-border">
            <table className="w-full">
              <thead>
                <tr className="border-b border-ui-border">
                  <th className="text-left p-4 text-text-secondary font-medium">Title</th>
                  <th className="text-left p-4 text-text-secondary font-medium">Location</th>
                  <th className="text-left p-4 text-text-secondary font-medium">Status</th>
                  <th className="text-left p-4 text-text-secondary font-medium">Published</th>
                  <th className="text-right p-4 text-text-secondary font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.map((job) => (
                  <tr key={job.id} className="border-b border-ui-border">
                    <td className="p-4">
                      <div>
                        <p className="text-text-primary font-medium">{job.title}</p>
                        <p className="text-text-secondary text-sm">{job.club_name}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-text-primary">{job.location}</p>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-sm ${
                        job.published
                          ? 'bg-accent-primary/20 text-accent-primary'
                          : 'bg-text-secondary/20 text-text-secondary'
                      }`}>
                        {job.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="p-4 text-text-secondary">
                      {job.published ? new Date(job.created_at).toLocaleDateString() : '-'}
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => navigate(`/admin/edit-job/${job.id}`)}
                          className="p-2 text-text-secondary hover:text-accent-primary transition-colors"
                          title="Edit"
                        >
                          <Pencil className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleUnpublishJob(job.id)}
                          className="p-2 text-text-secondary hover:text-alt-coral transition-colors"
                          title="Unpublish"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-background-card border border-ui-border">
            <table className="w-full">
              <thead>
                <tr className="border-b border-ui-border">
                  <th className="text-left p-4 text-text-secondary font-medium">Title</th>
                  <th className="text-left p-4 text-text-secondary font-medium">Status</th>
                  <th className="text-left p-4 text-text-secondary font-medium">Published</th>
                  <th className="text-right p-4 text-text-secondary font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.map((post) => (
                  <tr key={post.id} className="border-b border-ui-border">
                    <td className="p-4">
                      <div>
                        <p className="text-text-primary font-medium">{post.title}</p>
                        <p className="text-text-secondary text-sm truncate max-w-md">
                          {post.excerpt}
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-sm ${
                        post.published
                          ? 'bg-accent-primary/20 text-accent-primary'
                          : 'bg-text-secondary/20 text-text-secondary'
                      }`}>
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="p-4 text-text-secondary">
                      {post.published_at ? new Date(post.published_at).toLocaleDateString() : '-'}
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => navigate(`/admin/edit-blog/${post.id}`)}
                          className="p-2 text-text-secondary hover:text-accent-primary transition-colors"
                        >
                          <Pencil className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="p-2 text-text-secondary hover:text-alt-coral transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}