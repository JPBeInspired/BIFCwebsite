import { useState, ReactNode } from 'react';
import { 
  ArrowLeft, 
  Star, 
  Download, 
  Clock, 
  Users, 
  CheckCircle, 
  XCircle, 
  Package, 
  Edit, 
  Globe, 
  BookOpen, 
  Palette, 
  MessageSquare, 
  Dumbbell, 
  Brain, 
  Target, 
  Video, 
  FileText, 
  Building2, 
  Phone, 
  Calendar,
  Heart,
  ShoppingCart,
  ChevronDown,
  ChevronRight,
  Truck,
  Shield,
  ArrowRight
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { PRODUCTS } from '../data/products';

// ProductImage component for the main product image gallery
interface ProductImageProps {
  images: string[];
  name: string;
}

const ProductImage = ({ images, name }: ProductImageProps) => {
  const [activeImage, setActiveImage] = useState(0);
  
  return (
    <div className="space-y-4">
      {/* Main large image */}
      <div className="relative aspect-square overflow-hidden border border-ui-border">
        <img
          src={images[activeImage]}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Thumbnail images */}
      <div className="flex space-x-2 overflow-x-auto py-2">
        {images.map((image: string, index: number) => (
          <button
            key={index}
            onClick={() => setActiveImage(index)}
            className={`flex-shrink-0 w-20 h-20 border-2 ${
              activeImage === index 
                ? 'border-accent-primary' 
                : 'border-ui-border hover:border-text-secondary'
            }`}
          >
            <img
              src={image}
              alt={`${name} thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

// VariantSelector component for product variants/colors
interface VariantSelectorProps {
  variants: any[];
  activeVariant: string | null;
  setActiveVariant: (id: string) => void;
}

const VariantSelector = ({ variants, activeVariant, setActiveVariant }: VariantSelectorProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-text-secondary uppercase">Variants</h3>
      <div className="flex flex-wrap gap-3">
        {variants.map((variant: any) => (
          <button
            key={variant.id}
            onClick={() => setActiveVariant(variant.id)}
            className={`flex flex-col items-center p-2 border ${
              activeVariant === variant.id 
                ? 'border-accent-primary' 
                : 'border-ui-border hover:border-text-secondary'
            }`}
          >
            <div className="w-14 h-14 overflow-hidden mb-2">
              <img src={variant.image} alt={variant.name} className="w-full h-full object-cover" />
            </div>
            <span className="text-xs text-text-primary">{variant.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// Collapsible section component
interface CollapsibleSectionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

const CollapsibleSection = ({ title, children, defaultOpen = false }: CollapsibleSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="border-b border-ui-border py-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full justify-between items-center text-text-primary"
      >
        <h2 className="text-lg font-bold">{title}</h2>
        <ChevronDown
          className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      
      {isOpen && (
        <div className="mt-4 text-text-secondary">
          {children}
        </div>
      )}
    </div>
  );
};

// Main ProductDetail component
export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = id ? PRODUCTS[id] : undefined;
  
  const [activeVariant, setActiveVariant] = useState(
    product?.variants?.[0]?.id || null
  );
  
  const [quantity, setQuantity] = useState(1);
  
  if (!product) {
    return (
      <div className="min-h-screen bg-background-main pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-3xl font-bold text-text-primary">Product not found</h1>
          <Link
            to="/products"
            className="inline-flex items-center text-accent-primary hover:text-accent-hover mt-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-main">
      {/* Breadcrumb Navigation */}
      <div className="border-b border-ui-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center text-sm text-text-secondary">
            <Link to="/" className="hover:text-accent-primary">Home</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link to="/products" className="hover:text-accent-primary">Products</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-text-primary">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Main Product Section */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left Column - Product Images */}
            <div className="w-full lg:w-1/2">
              <ProductImage 
                images={product.gallery || [product.image]} 
                name={product.name} 
              />
            </div>
            
            {/* Right Column - Product Information */}
            <div className="w-full lg:w-1/2 space-y-8">
              {/* Product Name & Price */}
              <div>
                <h1 className="text-2xl font-bold text-text-primary">{product.name}</h1>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-accent-primary fill-current" />
                    <span className="ml-1 text-text-primary text-sm">{product.rating}</span>
                  </div>
                  <span className="text-text-secondary text-sm">
                    Trusted by {product.usersCount?.toLocaleString() || 0}+ Users
                  </span>
                </div>
                <div className="flex items-baseline gap-4 mt-4">
                  <span className="text-2xl font-bold text-text-primary">${product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <span className="text-sm line-through text-text-secondary">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Product Description */}
              <div className="text-text-secondary text-sm leading-relaxed">
                <p>{product.hook}</p>
              </div>
              
              {/* Variant Selector */}
              {product.variants && (
                <VariantSelector 
                  variants={product.variants} 
                  activeVariant={activeVariant}
                  setActiveVariant={setActiveVariant}
                />
              )}
              
              {/* Quantity Selector */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-text-secondary uppercase">Quantity</h3>
                <div className="flex items-center w-32 border border-ui-border">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-10 flex items-center justify-center text-text-secondary hover:text-text-primary"
                  >
                    -
                  </button>
                  <input 
                    type="text" 
                    value={quantity} 
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (!isNaN(value) && value > 0) {
                        setQuantity(value);
                      }
                    }}
                    className="w-16 h-10 text-center bg-transparent border-x border-ui-border text-text-primary"
                  />
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-10 flex items-center justify-center text-text-secondary hover:text-text-primary"
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                {product.checkoutUrl ? (
                  <a 
                    href={product.checkoutUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-6 py-3 bg-accent-primary text-text-primary hover:bg-accent-hover transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Purchase Now
                  </a>
                ) : (
                  <button className="flex-1 px-6 py-3 bg-accent-primary text-text-primary hover:bg-accent-hover transition-colors flex items-center justify-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    Add to Cart
                  </button>
                )}
                <button className="px-6 py-3 border border-ui-border text-text-primary hover:border-accent-primary hover:text-accent-primary transition-colors flex items-center justify-center">
                  <Heart className="h-5 w-5" />
                </button>
              </div>
              
              {/* Shipping & Returns */}
              <div className="space-y-4 pt-4 border-t border-ui-border">
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-text-secondary" />
                  <div>
                    <h3 className="text-sm font-medium text-text-primary">Free Shipping & Returns</h3>
                    <p className="text-xs text-text-secondary">On all orders over $100</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-text-secondary" />
                  <div>
                    <h3 className="text-sm font-medium text-text-primary">Secure Payment</h3>
                    <p className="text-xs text-text-secondary">All major credit cards accepted</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-text-secondary" />
                  <div>
                    <h3 className="text-sm font-medium text-text-primary">30-Day Warranty</h3>
                    <p className="text-xs text-text-secondary">Money-back guarantee</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Product Details Tabs */}
      <section className="py-10 bg-background-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <CollapsibleSection title="CASE" defaultOpen={true}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  {product.specifications && (
                    <table className="w-full text-sm">
                      <tbody>
                        {product.specifications.map((spec: {name: string, value: string}, index: number) => (
                          <tr key={index} className="border-b border-ui-border">
                            <td className="py-3 font-medium text-text-primary">{spec.name}</td>
                            <td className="py-3 text-text-secondary">{spec.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
                <div className="text-sm leading-relaxed">
                  <p>{product.detailedDescription || product.description}</p>
                </div>
              </div>
            </CollapsibleSection>
            
            <CollapsibleSection title="WHAT'S INCLUDED">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <ul className="space-y-4">
                    {product.includes?.slice(0, Math.ceil((product.includes?.length || 0) / 2)).map((item: string, index: number) => (
                      <li key={index} className="flex items-center gap-4">
                        <CheckCircle className="h-5 w-5 text-accent-primary flex-shrink-0" />
                        <span className="text-text-primary">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <ul className="space-y-4">
                    {product.includes?.slice(Math.ceil((product.includes?.length || 0) / 2)).map((item: string, index: number) => (
                      <li key={index} className="flex items-center gap-4">
                        <CheckCircle className="h-5 w-5 text-accent-primary flex-shrink-0" />
                        <span className="text-text-primary">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CollapsibleSection>
            
            <CollapsibleSection title="FEATURES & FUNCTIONS">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {product.features?.map((feature: {title: string, description: string, icon: any}, index: number) => (
                  <div key={index} className="flex items-start gap-4">
                    <feature.icon className="h-6 w-6 text-accent-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-text-primary mb-1">{feature.title}</h3>
                      <p className="text-sm text-text-secondary">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CollapsibleSection>
            
            <CollapsibleSection title="PERFECT FOR / NOT FOR">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h3 className="font-medium text-text-primary mb-4">Perfect For</h3>
                  <ul className="space-y-3">
                    {product.perfectFor?.map((item: string, index: number) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-accent-primary flex-shrink-0" />
                        <span className="text-text-secondary">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-text-primary mb-4">Not For</h3>
                  <ul className="space-y-3">
                    {product.notFor?.map((item: string, index: number) => (
                      <li key={index} className="flex items-center gap-3">
                        <XCircle className="h-5 w-5 text-alt-coral flex-shrink-0" />
                        <span className="text-text-secondary">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CollapsibleSection>
            
            <CollapsibleSection title="FAQs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {product.faqs?.map((faq: {question: string, answer: string}, index: number) => (
                  <div key={index} className="space-y-2">
                    <h3 className="font-medium text-text-primary">{faq.question}</h3>
                    <p className="text-sm text-text-secondary">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </CollapsibleSection>
          </div>
        </div>
      </section>
      
      {/* Related Products Section */}
      {product.relatedProducts && (
        <section className="py-12 bg-background-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-text-primary">
                Discover the collection
              </h2>
              <Link to="/products" className="text-accent-primary hover:underline flex items-center">
                View all <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {product.relatedProducts.map((relatedId: string) => {
                const relatedProduct = relatedId ? PRODUCTS[relatedId] : undefined;
                if (!relatedProduct) return null;
                return (
                  <Link 
                    key={relatedId} 
                    to={`/products/${relatedId}`}
                    className="group"
                  >
                    <div className="bg-background-card border border-ui-border hover:border-accent-primary transition-colors">
                      <div className="aspect-square overflow-hidden">
                        <img 
                          src={relatedProduct.image} 
                          alt={relatedProduct.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4 text-center">
                        <h3 className="text-text-primary font-medium text-sm mb-1">
                          {relatedProduct.name}
                        </h3>
                        <p className="text-text-secondary text-xs mb-2">
                          {relatedProduct.hook?.substring(0, 60) || relatedProduct.description.substring(0, 60)}...
                        </p>
                        <p className="text-accent-primary font-medium">
                          ${relatedProduct.price}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
      
      {/* Newsletter Section */}
      <section className="py-12 bg-background-main border-t border-ui-border">
        <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl font-bold text-text-primary mb-4">
            Subscribe to our newsletter
          </h2>
          <p className="text-text-secondary mb-6">
            Get updates on new products, special offers, and fitness tips.
          </p>
          <div className="flex">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 px-4 py-3 bg-background-card border-l border-y border-ui-border focus:outline-none focus:border-accent-primary text-text-primary"
            />
            <button className="px-6 py-3 bg-accent-primary text-text-primary hover:bg-accent-hover transition-colors border-r border-y border-accent-primary">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}