export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  thumbnail_url: string;
  published: boolean;
  published_at: string;
  created_at: string;
}

export type BlogPostWithRelations = BlogPost;