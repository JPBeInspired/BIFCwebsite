import { Clock, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { BlogPostWithRelations } from '../../types/blog';

interface BlogCardProps {
  post: BlogPostWithRelations;
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  const readingTime = Math.ceil(post.content.length / 1500);
  
  return (
    <article className={`group bg-background-card border border-ui-border hover:border-accent-primary transition-all duration-300 ${
      featured ? 'col-span-2 grid grid-cols-2 gap-8' : ''
    }`}>
      <Link 
        to={`/blog/${post.slug}`}
        className={`block overflow-hidden ${featured ? 'h-full' : 'aspect-video'}`}
      >
        <img
          src={post.thumbnail_url}
          alt={post.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
      </Link>
      
      <div className="p-6 flex flex-col">
        <Link 
          to={`/blog/${post.slug}`} 
          className="block group-hover:text-accent-primary transition-colors"
        >
          <h2 className={`font-bold text-text-primary mb-3 ${featured ? 'text-3xl' : 'text-xl'}`}>
            {post.title}
          </h2>
        </Link>

        <p className="text-text-secondary mb-6 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="mt-auto flex items-center gap-6 text-sm text-text-secondary">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{format(new Date(post.published_at), 'MMM d, yyyy')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{readingTime} min read</span>
          </div>
        </div>
      </div>
    </article>
  );
}