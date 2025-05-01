import { X } from 'lucide-react';
import { usePromotional } from '../contexts/PromotionalContext';
import { useLocation } from 'react-router-dom';

export default function PromotionalBanner() {
  const { message, code, isVisible, isEnabled, hidePromotion } = usePromotional();
  const location = useLocation();

  // Don't show on home page
  if (!isVisible || !isEnabled || location.pathname === '/') return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-accent-primary text-text-primary py-3 z-50">
      <div className="relative">
        <div className="promotional-scroll flex items-center justify-center text-center">
          <p className="text-sm md:text-base font-medium">
            {message} <span className="font-bold bg-text-primary text-background-main px-2 py-1 mx-1">{code}</span>
          </p>
        </div>
        <button
          onClick={hidePromotion}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-primary hover:opacity-75 transition-opacity"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}