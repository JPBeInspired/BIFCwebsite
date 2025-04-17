import { Helmet } from 'react-helmet-async';
import ProductDetail from '../ProductDetail';

export default function PTRecruitment() {
  return (
    <>
      <Helmet>
        <title>PT Recruitment Service | Be Inspired Fitness</title>
        <meta name="description" content="Get 5+ qualified personal trainer candidates within 30 days. Our PT recruitment service handles everything from sourcing to screening, ensuring you get the best candidates for your facility." />
        <meta name="keywords" content="PT recruitment, personal trainer hiring, gym staffing, fitness recruitment, personal trainer jobs" />
        <link rel="canonical" href="https://beinspired.fitness/products/pt-recruitment" />
        
        {/* Open Graph */}
        <meta property="og:title" content="PT Recruitment Service | Be Inspired Fitness" />
        <meta property="og:description" content="Get 5+ qualified personal trainer candidates within 30 days. Full screening and preparation included." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1521791136064-7986c2920216" />
        <meta property="og:url" content="https://beinspired.fitness/products/pt-recruitment" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PT Recruitment Service | Be Inspired Fitness" />
        <meta name="twitter:description" content="Get 5+ qualified personal trainer candidates within 30 days. Full screening and preparation included." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1521791136064-7986c2920216" />
      </Helmet>
      
      <ProductDetail id="pt-recruitment" />
    </>
  );
}