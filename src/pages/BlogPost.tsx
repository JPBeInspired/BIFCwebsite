import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { format } from 'date-fns';
import { ArrowLeft, Calendar, Clock, Share2, Facebook, Twitter, Linkedin, Link as LinkIcon, User } from 'lucide-react';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton } from 'react-share';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { getBlogPost, getRelatedPosts } from '../lib/blog';
import { BlogPostWithRelations } from '../types/blog';
import BlogCard from '../components/blog/BlogCard';

interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPostWithRelations | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostWithRelations[]>([]);
  const [loading, setLoading] = useState(true);
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const [tableOfContents, setTableOfContents] = useState<TableOfContentsItem[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        if (!slug) return;
        const fetchedPost = await getBlogPost(slug);
        setPost(fetchedPost);

        if (fetchedPost) {
          // Extract headings from content
          const headings = fetchedPost.content.match(/#{2,3}\s+.+/g) || [];
          const toc = headings.map(heading => {
            const level = heading.match(/#{2,3}/)?.[0].length || 2;
            const title = heading.replace(/#{2,3}\s+/, '');
            const id = title.toLowerCase().replace(/[^\w]+/g, '-');
            return { id, title, level };
          });
          setTableOfContents(toc);

          const related = await getRelatedPosts(fetchedPost.id);
          setRelatedPosts(related);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowShareTooltip(true);
    setTimeout(() => setShowShareTooltip(false), 2000);
  };

  // Custom components for ReactMarkdown
  const components = {
    h2: ({ node, ...props }) => {
      const id = props.children.toString().toLowerCase().replace(/[^\w]+/g, '-');
      return <h2 id={id} className="text-3xl font-bold mb-4 mt-8 scroll-mt-24" {...props} />;
    },
    h3: ({ node, ...props }) => {
      const id = props.children.toString().toLowerCase().replace(/[^\w]+/g, '-');
      return <h3 id={id} className="text-2xl font-bold mb-4 mt-6 scroll-mt-24" {...props} />;
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background-main pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-background-card rounded w-1/4"></div>
            <div className="h-16 bg-background-card rounded w-3/4"></div>
            <div className="h-96 bg-background-card rounded"></div>
            <div className="space-y-4">
              <div className="h-4 bg-background-card rounded w-full"></div>
              <div className="h-4 bg-background-card rounded w-5/6"></div>
              <div className="h-4 bg-background-card rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background-main pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-3xl font-bold text-text-primary">Post not found</h1>
          <Link
            to="/blog"
            className="inline-flex items-center text-accent-primary hover:text-accent-hover mt-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const readingTime = Math.ceil(post.content.length / 1500);
  const publishDate = new Date(post.published_at).toISOString();
  const modifiedDate = new Date(post.created_at).toISOString();
  const shareUrl = `https://beinspired.fitness/blog/${post.slug}`;

  // Structured data for Google
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": shareUrl
    },
    "headline": post.title,
    "description": post.excerpt,
    "image": post.thumbnail_url,
    "datePublished": publishDate,
    "dateModified": modifiedDate,
    "publisher": {
      "@type": "Organization",
      "name": "Be Inspired Fitness",
      "logo": {
        "@type": "ImageObject",
        "url": "https://i.imgur.com/BbTeAmk.png"
      }
    },
    "author": {
      "@type": "Organization",
      "name": "Be Inspired Fitness"
    }
  };

  return (
    <div className="min-h-screen bg-background-main pt-20">
      <Helmet>
        <title>{post.title} | Be Inspired Fitness Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.thumbnail_url} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:site_name" content="Be Inspired Fitness" />
        <meta property="article:published_time" content={publishDate} />
        <meta property="article:modified_time" content={modifiedDate} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.thumbnail_url} />
        <link rel="canonical" href={shareUrl} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <article className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/blog"
            className="inline-flex items-center text-text-secondary hover:text-accent-primary mb-8 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Blog
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-8">
              {/* Hero Section */}
              <header className="mb-12">
                <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-8 leading-tight">
                  {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-text-secondary mb-8">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    <time dateTime={publishDate}>
                      {format(new Date(post.published_at), 'MMMM d, yyyy')}
                    </time>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    <span>{readingTime} min read</span>
                  </div>
                </div>

                <div className="relative aspect-video mb-8">
                  <img
                    src={post.thumbnail_url}
                    alt={post.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                <div className="flex items-center justify-between border-y border-ui-border py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-background-card rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-text-secondary" />
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">Be Inspired Fitness</p>
                      <p className="text-sm text-text-secondary">Expert Fitness & Business Education</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <FacebookShareButton url={shareUrl} quote={post.title}>
                      <Facebook className="h-5 w-5 text-text-secondary hover:text-accent-primary transition-colors" />
                    </FacebookShareButton>
                    <TwitterShareButton url={shareUrl} title={post.title}>
                      <Twitter className="h-5 w-5 text-text-secondary hover:text-accent-primary transition-colors" />
                    </TwitterShareButton>
                    <LinkedinShareButton url={shareUrl} title={post.title}>
                      <Linkedin className="h-5 w-5 text-text-secondary hover:text-accent-primary transition-colors" />
                    </LinkedinShareButton>
                    <button 
                      onClick={copyToClipboard}
                      className="relative"
                      aria-label="Copy link"
                    >
                      <LinkIcon className="h-5 w-5 text-text-secondary hover:text-accent-primary transition-colors" />
                      {showShareTooltip && (
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-accent-primary text-text-primary text-xs px-2 py-1 rounded">
                          Copied!
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </header>

              {/* Content */}
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-xl text-text-secondary mb-8 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <ReactMarkdown
                  className="text-text-secondary leading-relaxed"
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={components}
                >
                  {post.content}
                </ReactMarkdown>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-8">
              {/* Author Card */}
              <div className="bg-background-card p-6 rounded-lg border border-ui-border">
                <h2 className="text-lg font-bold text-text-primary mb-4">About the Author</h2>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-background-section rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-text-primary">Be Inspired Fitness</h3>
                    <p className="text-sm text-text-secondary">Expert Fitness & Business Education</p>
                  </div>
                </div>
                <p className="text-text-secondary text-sm">
                  Helping Personal Trainers grow thriving businesses, and empowering everyday athletes with real science, real support, and real results.
                </p>
              </div>

              {/* Table of Contents */}
              {tableOfContents.length > 0 && (
                <div className="bg-background-card p-6 rounded-lg border border-ui-border sticky top-24">
                  <h2 className="text-lg font-bold text-text-primary mb-4">Quick Navigation</h2>
                  <nav className="space-y-2">
                    {tableOfContents.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`block text-text-secondary hover:text-accent-primary transition-colors ${
                          item.level === 3 ? 'pl-4' : ''
                        }`}
                      >
                        {item.title}
                      </a>
                    ))}
                  </nav>
                </div>
              )}

              {/* Share Card */}
              <div className="bg-background-card p-6 rounded-lg border border-ui-border">
                <h2 className="text-lg font-bold text-text-primary mb-4">Share this Article</h2>
                <div className="flex items-center gap-4">
                  <FacebookShareButton url={shareUrl} quote={post.title}>
                    <div className="w-10 h-10 rounded bg-background-section flex items-center justify-center hover:bg-accent-primary/10 transition-colors">
                      <Facebook className="h-5 w-5 text-text-secondary hover:text-accent-primary transition-colors" />
                    </div>
                  </FacebookShareButton>
                  <TwitterShareButton url={shareUrl} title={post.title}>
                    <div className="w-10 h-10 rounded bg-background-section flex items-center justify-center hover:bg-accent-primary/10 transition-colors">
                      <Twitter className="h-5 w-5 text-text-secondary hover:text-accent-primary transition-colors" />
                    </div>
                  </TwitterShareButton>
                  <LinkedinShareButton url={shareUrl} title={post.title}>
                    <div className="w-10 h-10 rounded bg-background-section flex items-center justify-center hover:bg-accent-primary/10 transition-colors">
                      <Linkedin className="h-5 w-5 text-text-secondary hover:text-accent-primary transition-colors" />
                    </div>
                  </LinkedinShareButton>
                  <button 
                    onClick={copyToClipboard}
                    className="relative w-10 h-10 rounded bg-background-section flex items-center justify-center hover:bg-accent-primary/10 transition-colors"
                  >
                    <LinkIcon className="h-5 w-5 text-text-secondary hover:text-accent-primary transition-colors" />
                    {showShareTooltip && (
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-accent-primary text-text-primary text-xs px-2 py-1 rounded">
                        Copied!
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-background-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-text-primary mb-12">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}