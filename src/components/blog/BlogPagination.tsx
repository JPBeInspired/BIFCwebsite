import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function BlogPagination({
  currentPage,
  totalPages,
  onPageChange
}: BlogPaginationProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 text-text-secondary hover:text-accent-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 flex items-center justify-center transition-colors ${
            currentPage === page
              ? 'bg-accent-primary text-text-primary'
              : 'text-text-secondary hover:text-accent-primary'
          }`}
        >
          {page}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 text-text-secondary hover:text-accent-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
}