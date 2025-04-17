import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { getBlogPosts } from '../lib/blog';
import { BlogPostWithRelations } from '../types/blog';
import BlogCard from '../components/blog/BlogCard';
import BlogSearch from '../components/blog/BlogSearch';
import BlogPagination from '../components/blog/BlogPagination';

export default function Blog() {
  const [posts, setPosts] = useState<BlogPostWithRelations[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const { posts: fetchedPosts, total } = await getBlogPosts({
          search: searchQuery,
          page: currentPage,
          limit: 9
        });

        setPosts(fetchedPosts);
        setTotalPages(Math.ceil(total / 9));
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [searchQuery, currentPage]);

  return (
    <div className="min-h-screen bg-background-main pt-20">
      <Helmet>
        <title>Blog | Be Inspired Fitness</title>
        <meta name="description" content="Expert insights on personal training, fitness business development, and achieving optimal results." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0">
          <div className="relative h-full">
            <img
              src="https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&q=80&w=1920"
              alt="Writing and creating content"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background-main/95 via-background-main/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-background-main via-background-main/50 to-transparent" />
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold text-text-primary mb-6 leading-tight">
              Insights & Resources
            </h1>
            <p className="text-xl text-text-secondary mb-8 max-w-2xl leading-relaxed">
              Expert insights on personal training, fitness business development, and achieving optimal results.
            </p>
            <BlogSearch value={searchQuery} onChange={setSearchQuery} />
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Posts Grid */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-text-secondary">Loading posts...</p>
            </div>
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  featured={index === 0 && currentPage === 1}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-text-secondary">No posts found matching your criteria.</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12">
              <BlogPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}