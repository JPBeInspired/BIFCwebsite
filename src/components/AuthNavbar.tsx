import { Link, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { BRAND } from '../constants/assets';

export default function AuthNavbar() {
  const location = useLocation();
  const isRegister = location.pathname.includes('/register');

  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-ui-border bg-background-main/95 backdrop-blur-sm">
      <div className="mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between px-5 sm:px-6 md:h-20 lg:px-8">
        <Link to="/careers" className="flex min-h-11 items-center" aria-label="BIFC Careers home">
          <img
            src={BRAND.LOGO}
            alt={BRAND.LOGO_TEXT}
            width="170"
            height="96"
            decoding="async"
            className="h-14 w-auto md:h-[4.25rem]"
          />
        </Link>

        <div className="flex items-center gap-3 text-sm">
          <Link
            to="/careers/jobs"
            className="hidden min-h-11 items-center px-2 font-semibold text-text-secondary transition-colors hover:text-accent-primary sm:flex"
          >
            Browse jobs
          </Link>
          <span className="hidden text-text-muted md:inline">
            {isRegister ? 'Already registered?' : 'Need an account?'}
          </span>
          <Link
            to={isRegister ? '/careers/login' : '/careers/register'}
            className="inline-flex min-h-11 items-center gap-2 border border-ui-border px-3 font-semibold text-text-primary transition-colors hover:border-accent-primary hover:text-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-background-main"
          >
            {isRegister ? 'Sign in' : 'Create profile'}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
