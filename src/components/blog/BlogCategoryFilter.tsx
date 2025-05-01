import { BlogCategory } from '../../types/blog';

interface BlogCategoryFilterProps {
  categories: BlogCategory[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function BlogCategoryFilter({
  categories,
  activeCategory,
  onCategoryChange
}: BlogCategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-4">
      <button
        onClick={() => onCategoryChange('all')}
        className={`px-6 py-3 transition-colors ${
          activeCategory === 'all'
            ? 'bg-accent-primary text-text-primary'
            : 'bg-background-card text-text-secondary hover:bg-background-section'
        }`}
      >
        All Posts
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.slug)}
          className={`px-6 py-3 transition-colors ${
            activeCategory === category.slug
              ? 'bg-accent-primary text-text-primary'
              : 'bg-background-card text-text-secondary hover:bg-background-section'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}