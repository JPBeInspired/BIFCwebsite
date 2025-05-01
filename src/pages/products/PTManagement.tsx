import { Helmet } from 'react-helmet-async';
import ProductDetail from '../ProductDetail';

export default function PTManagement() {
  return (
    <>
      <Helmet>
        <title>Complete PT Management Service | Be Inspired Fitness</title>
        <meta name="description" content="Full-scale PT department management with zero base cost. Transform your PT operations with our complete management solution, operating on a revenue-share model." />
        <meta name="keywords" content="PT management, personal trainer management, gym operations, fitness business management, PT department" />
        <link rel="canonical" href="https://beinspired.fitness/products/pt-management" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Complete PT Management Service | Be Inspired Fitness" />
        <meta property="og:description" content="Full-scale PT department management with zero base cost. Transform your PT operations." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1600880292203-757bb62b4baf" />
        <meta property="og:url" content="https://beinspired.fitness/products/pt-management" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Complete PT Management Service | Be Inspired Fitness" />
        <meta name="twitter:description" content="Full-scale PT department management with zero base cost. Transform your PT operations." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1600880292203-757bb62b4baf" />
      </Helmet>
      
      <ProductDetail id="pt-management" />
    </>
  );
}