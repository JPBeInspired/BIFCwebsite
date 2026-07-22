import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { BRAND } from '../constants/assets';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => href === '/careers' ? location.pathname.startsWith('/careers') : location.pathname === href;

  return (
    <nav
      className={`fixed w-full z-50 border-b transition-all duration-300 ${
        isScrolled 
          ? 'border-ui-border bg-background-section shadow-xl shadow-ui-shadow/20'
          : 'border-transparent bg-gradient-to-b from-background-main/90 to-transparent backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-[4.5rem] items-center justify-between md:h-20">
          <Link
            to="/"
            onClick={handleLogoClick}
            className="flex items-center"
          >
            <img 
              src={BRAND.LOGO} 
              alt={BRAND.LOGO_TEXT}
              width="170"
              height="96"
              decoding="async"
              onError={(event) => {
                event.currentTarget.style.display = 'none';
                event.currentTarget.nextElementSibling?.classList.remove('sr-only');
              }}
              className="h-[3.75rem] w-auto"
            />
            <span className="sr-only text-lg font-bold leading-tight tracking-wider text-text-primary">
              BE<br />INSPIRED
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium tracking-wider transition-colors ${
                  isActive(item.href)
                    ? 'text-accent-primary'
                    : 'text-text-primary hover:text-accent-primary'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/careers/login"
              className="border border-ui-border px-4 py-2 text-sm font-semibold text-text-primary transition-colors hover:border-accent-primary hover:text-accent-primary"
            >
              Sign in
            </Link>
            <Link
              to="/careers/register"
              className="bg-accent-primary px-4 py-2 text-sm font-semibold text-background-main transition-colors hover:bg-accent-hover"
            >
              Create profile
            </Link>
            <Link
              to="/careers/employers/register"
              className="border border-accent-primary px-4 py-2 text-sm font-semibold text-accent-primary transition-colors hover:bg-accent-primary hover:text-background-main"
            >
              Post a job
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isOpen}
              className="p-2 text-text-primary hover:text-accent-primary transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden bg-background-section border-t border-ui-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-accent-primary bg-background-card'
                      : 'text-text-primary hover:bg-background-card hover:text-accent-primary'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="grid gap-2 border-t border-ui-border px-3 pt-3">
                <Link
                  to="/careers/login"
                  className="border border-ui-border px-3 py-2 text-center text-base font-semibold text-text-primary transition-colors hover:border-accent-primary hover:text-accent-primary"
                  onClick={() => setIsOpen(false)}
                >
                  Sign in
                </Link>
                <Link
                  to="/careers/register"
                  className="bg-accent-primary px-3 py-2 text-center text-base font-semibold text-background-main transition-colors hover:bg-accent-hover"
                  onClick={() => setIsOpen(false)}
                >
                  Create profile
                </Link>
                <Link
                  to="/careers/employers/register"
                  className="border border-accent-primary px-3 py-2 text-center text-base font-semibold text-accent-primary transition-colors hover:bg-accent-primary hover:text-background-main"
                  onClick={() => setIsOpen(false)}
                >
                  Post a job
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
