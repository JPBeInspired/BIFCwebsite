import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import SimpleNav from './components/SimpleNav';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import ServiceDetail from './pages/ServiceDetail';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Careers from './pages/Careers';
import JobDetail from './pages/JobDetail';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import JobForm from './pages/admin/JobForm';
import BlogForm from './pages/admin/BlogForm';
import { PromotionalProvider, usePromotional } from './contexts/PromotionalContext';
import { ContentProvider } from './contexts/ContentContext';
import PromotionalBanner from './components/PromotionalBanner';
import ScrollToTop from './components/ScrollToTop';
import WebsiteCreation from './pages/websitecreation';
import WebsiteCreationPaymentConfirmation from './pages/websitecreationpaymentconfirmation';
import PTStarterPack from './pages/PTStarterPack';
import PTIntroOffer from './pages/PTIntroOffer';

function AppContent() {
  const { showPromotion, togglePromotion } = usePromotional();
  const location = useLocation();

  useEffect(() => {
    showPromotion('Use code', 'BIFC50');
    togglePromotion(false);
  }, [showPromotion, togglePromotion]);

  // Determine which navigation to show
  const isPTIntroOffer = location.pathname.toLowerCase() === '/ptintrooffer';
  const Navigation = isPTIntroOffer ? SimpleNav : Navbar;

  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen bg-background-main">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/service/:id" element={<ServiceDetail />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/careers" element={<Careers />} />
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
          </Routes>
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