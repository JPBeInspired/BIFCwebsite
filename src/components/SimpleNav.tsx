import { Link } from 'react-router-dom';
import { BRAND } from '../constants/assets';

export default function SimpleNav() {
  return (
    <nav className="fixed w-full z-50 bg-background-main/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center">
            <img 
              src={BRAND.LOGO} 
              alt={BRAND.LOGO_TEXT}
              className="h-12 w-auto"
            />
          </Link>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium tracking-wider text-text-primary hover:text-accent-primary transition-colors"
          >
            Click here to view our full website
          </a>
        </div>
      </div>
    </nav>
  );
} 