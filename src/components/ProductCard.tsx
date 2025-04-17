import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const productLink = product.category === 'services' 
    ? `/products/service/${product.id}`
    : `/products/${product.id}`;

  return (
    <div className="group bg-background-card border border-ui-border hover:border-accent-primary transition-all duration-300">
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        {product.forProfessionals && (
          <div className="absolute top-4 right-4 bg-accent-primary px-3 py-1 text-sm font-medium text-text-primary">
            For PTs
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-text-primary group-hover:text-accent-primary transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-accent-primary fill-current" />
            <span className="ml-1 text-text-secondary">{product.rating}</span>
          </div>
        </div>
        <p className="text-text-secondary mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-accent-primary">
            {product.price === 0 ? 'Contact Us' : `$${product.price}`}
          </span>
          <Link
            to={productLink}
            className="inline-flex items-center text-text-primary hover:text-accent-primary transition-colors"
          >
            View Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}