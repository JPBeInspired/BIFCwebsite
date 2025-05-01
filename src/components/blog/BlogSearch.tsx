import { Search } from 'lucide-react';

interface BlogSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function BlogSearch({ value, onChange }: BlogSearchProps) {
  return (
    <div className="relative w-full max-w-2xl">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary h-5 w-5" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search articles..."
        className="w-full pl-12 pr-6 py-4 bg-background-card border border-ui-border text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent-primary transition-colors"
      />
    </div>
  );
}