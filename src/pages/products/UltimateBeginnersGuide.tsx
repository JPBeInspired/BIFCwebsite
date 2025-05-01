import { Helmet } from 'react-helmet-async';
import ProductDetail from '../ProductDetail';

export default function UltimateBeginnersGuide() {
  return (
    <>
      <Helmet>
        <title>Ultimate Beginners Guide | Be Inspired Fitness</title>
        <meta name="description" content="The most effective programming methods for beginner lifters. Transform your physique with our comprehensive guide to losing body fat and building lean muscle." />
        <meta name="keywords" content="fitness guide, beginner workout, weight loss program, muscle building, fitness transformation" />
        <link rel="canonical" href="https://beinspired.fitness/products/ultimate-beginners-guide" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Ultimate Beginners Guide | Be Inspired Fitness" />
        <meta property="og:description" content="Transform your physique with the most effective programming methods for beginner lifters." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1534438327276-14e5300c3a48" />
        <meta property="og:url" content="https://beinspired.fitness/products/ultimate-beginners-guide" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ultimate Beginners Guide | Be Inspired Fitness" />
        <meta name="twitter:description" content="Transform your physique with the most effective programming methods for beginner lifters." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1534438327276-14e5300c3a48" />
      </Helmet>
      
      <ProductDetail id="ultimate-beginners-guide" />
    </>
  );
}