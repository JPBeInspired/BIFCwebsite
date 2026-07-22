import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import SimpleNav from './components/SimpleNav';
import Home from './pages/Home';
import { PromotionalProvider, usePromotional } from './contexts/PromotionalContext';
import { ContentProvider } from './contexts/ContentContext';
import PromotionalBanner from './components/PromotionalBanner';
import ScrollToTop from './components/ScrollToTop';

const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Careers = lazy(() => import('./pages/Careers'));
const JobDetail = lazy(() => import('./pages/JobDetail'));
const AdminLogin = lazy(() => import('./pages/admin/Login'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const JobForm = lazy(() => import('./pages/admin/JobForm'));
const BlogForm = lazy(() => import('./pages/admin/BlogForm'));
const WebsiteCreation = lazy(() => import('./pages/websitecreation'));
const WebsiteCreationPaymentConfirmation = lazy(() => import('./pages/websitecreationpaymentconfirmation'));
const PTStarterPack = lazy(() => import('./pages/PTStarterPack'));
const PTIntroOffer = lazy(() => import('./pages/PTIntroOffer'));
const PTIntroOfferF = lazy(() => import('./pages/PTIntroOfferPlum'));
const TestPage = lazy(() => import('./pages/TestPage'));

function AppContent() {
  const { showPromotion, togglePromotion } = usePromotional();
  const location = useLocation();

  useEffect(() => {
    showPromotion('Use code', 'BIFC50');
    togglePromotion(false);
  }, [showPromotion, togglePromotion]);

  // Determine which navigation to show
  const isPTIntroOffer = location.pathname.toLowerCase() === '/ptintrooffer' || location.pathname.toLowerCase() === '/ptintroofferf';
  
  // Get color scheme based on route
  const getNavColors = () => {
    if (location.pathname.toLowerCase() === '/ptintrooffer') {
      return {
        bgColor: "bg-background-main/90",
        textColor: "text-text-primary",
        hoverColor: "hover:text-accent-primary"
      };
    } else if (location.pathname.toLowerCase() === '/ptintroofferf') {
      return {
        bgColor: "bg-rose-50/90",
        textColor: "text-gray-900",
        hoverColor: "hover:text-pink-500"
      };
    }
    return {
      bgColor: "bg-background-main/90",
      textColor: "text-text-primary",
      hoverColor: "hover:text-accent-primary"
    };
  };

  const Navigation = isPTIntroOffer ? () => <SimpleNav {...getNavColors()} /> : Navbar;

  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen bg-background-main">
        <Navigation />
        <main id="main-content">
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/careers/jobs" element={<Careers mode="jobs" />} />
              <Route path="/careers/employers" element={<Careers mode="employers" />} />
              <Route path="/careers/employers/:slug" element={<Careers mode="employers" />} />
              <Route path="/careers/talent" element={<Careers mode="talent" />} />
              <Route path="/careers/register" element={<Careers mode="register" />} />
              <Route path="/careers/employers/register" element={<Careers mode="employerRegister" />} />
              <Route path="/careers/login" element={<Careers mode="login" />} />
              <Route path="/careers/candidate" element={<Careers mode="candidate" />} />
              <Route path="/careers/employer" element={<Careers mode="employer" />} />
              <Route path="/careers/admin" element={<Careers mode="admin" />} />
              <Route path="/careers/privacy" element={<Careers mode="privacy" />} />
              <Route path="/careers/terms" element={<Careers mode="terms" />} />
              <Route path="/careers/candidate-terms" element={<Careers mode="candidateTerms" />} />
              <Route path="/careers/employer-terms" element={<Careers mode="employerTerms" />} />
              <Route path="/careers/collection-notice" element={<Careers mode="collectionNotice" />} />
              <Route path="/careers/jobs/:id" element={<JobDetail />} />
              <Route path="/careers/:id" element={<JobDetail />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/new-job" element={<JobForm />} />
              <Route path="/admin/edit-job/:id" element={<JobForm />} />
              <Route path="/admin/new-blog" element={<BlogForm />} />
              <Route path="/admin/edit-blog/:id" element={<BlogForm />} />
              <Route path="/websitecreation" element={<WebsiteCreation />} />
              <Route path="/websitecreation/payment-confirmation" element={<WebsiteCreationPaymentConfirmation />} />
              <Route path="/pt-starter-pack" element={<PTStarterPack />} />
              <Route path="/ptintrooffer" element={<PTIntroOffer />} />
              <Route path="/ptintroofferf" element={<PTIntroOfferF />} />
              <Route path="/test" element={<TestPage />} />
            </Routes>
          </Suspense>
        </main>
        <PromotionalBanner />
        <Toaster position="top-right" />
      </div>
    </>
  );
}

function App() {
  return (
    <HelmetProvider>
      <ContentProvider>
        <PromotionalProvider>
          <Router>
            <AppContent />
          </Router>
        </PromotionalProvider>
      </ContentProvider>
    </HelmetProvider>
  );
}

export default App;
