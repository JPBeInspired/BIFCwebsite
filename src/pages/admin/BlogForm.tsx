import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Eye, Image as ImageIcon } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import slugify from 'slugify';
import toast from 'react-hot-toast';

interface BlogFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail_url: string;
  meta_title: string;
  meta_description: string;
  published: boolean;
}

const initialFormData: BlogFormData = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  thumbnail_url: '',
  meta_title: '',
  meta_description: '',
  published: false,
};

const quillModules = {
  toolbar: [
    [{ header: [2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['blockquote', 'code-block'],
    ['link', 'image'],
    ['clean'],
  ],
};

const quillFormats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'list',
  'bullet',
  'blockquote',
  'code-block',
  'link',
  'image',
];

export default function BlogForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState<BlogFormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    checkAuth();
    if (id) {
      fetchPost();
    }
  }, [id]);

  const checkAuth = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || user.email !== 'jakep@beinspired.fitness') {
        navigate('/admin');
      }
    } catch (error) {
      navigate('/admin');
    }
  };

  const fetchPost = async () => {
    try {
      const { data: post, error } = await supabase
        .from('blog_post')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (post) {
        setFormData(post);
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      toast.error('Failed to fetch post');
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData({
      ...formData,
      title,
      slug: slugify(title, { lower: true, strict: true }),
      meta_title: title,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const postData = {
        ...formData,
        published_at: formData.published ? new Date().toISOString() : null,
      };

      if (id) {
        const { error } = await supabase
          .from('blog_post')
          .update(postData)
          .eq('id', id);

        if (error) throw error;
        toast.success('Post updated successfully');
      } else {
        const { error } = await supabase
          .from('blog_post')
          .insert([postData]);

        if (error) throw error;
        toast.success('Post created successfully');
      }

      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error saving post:', error);
      toast.error(id ? 'Failed to update post' : 'Failed to create post');
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
                {id ? 'Edit Blog Post' : 'Create Blog Post'}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setPreview(!preview)}
                className="flex items-center px-4 py-2 border border-ui-border text-text-primary hover:bg-background-card transition-colors"
              >
                <Eye className="h-5 w-5 mr-2" />
                {preview ? 'Edit' : 'Preview'}
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center px-4 py-2 bg-accent-primary text-text-primary hover:bg-accent-hover transition-colors disabled:opacity-50"
              >
                <Save className="h-5 w-5 mr-2" />
                {loading ? 'Saving...' : 'Publish Post'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Form */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {preview ? (
          <div className="prose prose-lg prose-invert max-w-none">
            <h1 className="text-4xl font-bold mb-6">{formData.title}</h1>
            <div className="mb-8">
              <img
                src={formData.thumbnail_url}
                alt={formData.title}
                className="w-full rounded-lg"
              />
            </div>
            <div className="text-text-secondary mb-8">{formData.excerpt}</div>
            <div dangerouslySetInnerHTML={{ __html: formData.content }} />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Blog Basics */}
            <div className="bg-background-card p-6 border border-ui-border">
              <h2 className="text-xl font-bold text-text-primary mb-6">Blog Basics</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-text-secondary mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={handleTitleChange}
                    className="w-full px-4 py-3 bg-background-main border border-ui-border text-text-primary focus:border-accent-primary transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-text-secondary mb-2">Slug</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-4 py-3 bg-background-main border border-ui-border text-text-primary focus:border-accent-primary transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-text-secondary mb-2">Excerpt</label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    className="w-full px-4 py-3 bg-background-main border border-ui-border text-text-primary focus:border-accent-primary transition-colors h-32"
                    required
                  />
                </div>

                <div>
                  <label className="block text-text-secondary mb-2">Thumbnail URL</label>
                  <div className="flex gap-4">
                    <input
                      type="url"
                      value={formData.thumbnail_url}
                      onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                      className="flex-1 px-4 py-3 bg-background-main border border-ui-border text-text-primary focus:border-accent-primary transition-colors"
                      required
                    />
                    {formData.thumbnail_url && (
                      <div className="relative w-16 h-16 bg-background-main border border-ui-border rounded overflow-hidden">
                        <img
                          src={formData.thumbnail_url}
                          alt="Thumbnail preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* SEO & Meta */}
            <div className="bg-background-card p-6 border border-ui-border">
              <h2 className="text-xl font-bold text-text-primary mb-6">SEO & Meta</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-text-secondary mb-2">Meta Title</label>
                  <input
                    type="text"
                    value={formData.meta_title}
                    onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                    className="w-full px-4 py-3 bg-background-main border border-ui-border text-text-primary focus:border-accent-primary transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-text-secondary mb-2">Meta Description</label>
                  <textarea
                    value={formData.meta_description}
                    onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                    className="w-full px-4 py-3 bg-background-main border border-ui-border text-text-primary focus:border-accent-primary transition-colors h-32"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="bg-background-card p-6 border border-ui-border">
              <h2 className="text-xl font-bold text-text-primary mb-6">Content</h2>
              <div className="prose-editor">
                <ReactQuill
                  value={formData.content}
                  onChange={(content) => setFormData({ ...formData, content })}
                  modules={quillModules}
                  formats={quillFormats}
                  theme="snow"
                />
              </div>
            </div>

            {/* Publishing */}
            <div className="bg-background-card p-6 border border-ui-border">
              <h2 className="text-xl font-bold text-text-primary mb-6">Publishing</h2>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="h-4 w-4 text-accent-primary border-ui-border focus:ring-accent-primary"
                />
                <label htmlFor="published" className="text-text-secondary">
                  Publish this post
                </label>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}