import { createClient } from '@supabase/supabase-js';
import { BlogPost, BlogPostWithRelations } from '../types/blog';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

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
    let query = supabase
      .from('blog_post')
      .select('*', { count: 'exact' })
      .eq('published', true)
      .order('published_at', { ascending: false });

    if (search) {
      query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
    }

    const { data: posts, count, error } = await query
      .range((page - 1) * limit, page * limit - 1);

    if (error) throw error;

    return {
      posts: posts as BlogPostWithRelations[],
      total: count || 0
    };
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return { posts: [], total: 0 };
  }
};

export const getBlogPost = async (slug: string): Promise<BlogPostWithRelations | null> => {
  try {
    const { data: post, error } = await supabase
      .from('blog_post')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (error) throw error;

    return post as BlogPostWithRelations;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
};

export const getRelatedPosts = async (
  currentPostId: string,
  limit = 3
): Promise<BlogPostWithRelations[]> => {
  try {
    const { data: posts, error } = await supabase
      .from('blog_post')
      .select('*')
      .eq('published', true)
      .neq('id', currentPostId)
      .order('published_at', { ascending: false })
      .limit(limit);

    if (error) throw error;

    return posts as BlogPostWithRelations[];
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
};