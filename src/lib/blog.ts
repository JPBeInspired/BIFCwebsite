import { BlogPostWithRelations } from '../types/blog';

export const getBlogPosts = async ({
  search,
  page = 1,
  limit = 9
}: {
  search?: string;
  page?: number;
  limit?: number;
} = {}): Promise<{ posts: BlogPostWithRelations[]; total: number }> => {
  try {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit)
    });

    if (search) {
      params.set('search', search);
    }

    const response = await fetch(`/api/blog?${params.toString()}`);
    if (!response.ok) throw new Error('Failed to fetch blog posts');

    return response.json();
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return { posts: [], total: 0 };
  }
};

export const getBlogPost = async (slug: string): Promise<BlogPostWithRelations | null> => {
  try {
    const response = await fetch(`/api/blog/${encodeURIComponent(slug)}`);
    if (!response.ok) throw new Error('Failed to fetch blog post');

    const { post } = await response.json();
    return post as BlogPostWithRelations;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
};

export const getRelatedPosts = async (currentPostId: string): Promise<BlogPostWithRelations[]> => {
  try {
    const response = await fetch(`/api/blog/related?id=${encodeURIComponent(currentPostId)}`);
    if (!response.ok) return [];

    const { relatedPosts } = await response.json();
    return relatedPosts as BlogPostWithRelations[];
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
};
