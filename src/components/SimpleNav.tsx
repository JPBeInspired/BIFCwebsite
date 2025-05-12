import { Link } from 'react-router-dom';
import { BRAND } from '../constants/assets';

interface SimpleNavProps {
  bgColor?: string;
  textColor?: string;
  hoverColor?: string;
}

export default function SimpleNav({ 
  bgColor = "bg-white/90", 
  textColor = "text-gray-900", 
  hoverColor = "hover:text-pink-500" 
}: SimpleNavProps) {
  return (
    <nav className={`fixed w-full z-50 ${bgColor} backdrop-blur-sm border-b border-gray-200/50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center">
            <img 
              src={BRAND.LOGO} 
              alt={BRAND.LOGO_TEXT}
              className="h-12 w-auto"
            />
          </Link>
          <Link
            to="/"
            className={`text-sm font-medium tracking-wider ${textColor} ${hoverColor} transition-colors`}
          >
            Click here to view our full website
          </Link>
        </div>
      </div>
    </nav>
  );
} 