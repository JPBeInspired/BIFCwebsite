import { Helmet } from 'react-helmet-async';
import ProductDetail from '../ProductDetail';

export default function PTDevelopment() {
  return (
    <>
      <Helmet>
        <title>PT Development Program | Be Inspired Fitness</title>
        <meta name="description" content="A comprehensive solution for gyms wanting to build and manage their own PT team. Get three months of support to ensure success with our proven development program." />
        <meta name="keywords" content="PT development, trainer education, fitness business development, gym management, personal trainer training" />
        <link rel="canonical" href="https://beinspired.fitness/products/pt-development" />
        
        {/* Open Graph */}
        <meta property="og:title" content="PT Development Program | Be Inspired Fitness" />
        <meta property="og:description" content="Build and manage your own PT team with our comprehensive development program." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4" />
        <meta property="og:url" content="https://beinspired.fitness/products/pt-development" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PT Development Program | Be Inspired Fitness" />
        <meta name="twitter:description" content="Build and manage your own PT team with our comprehensive development program." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4" />
      </Helmet>
      
      <ProductDetail id="pt-development" />
    </>
  );
}