import React, { useState, useEffect, ChangeEvent } from 'react';
import { ArrowRight, BookOpen, Dumbbell, Users, Building2, Download, Brain, 
  User, ChevronDown, Star, Siren as Fire, Clock, Sparkles, Briefcase, 
  Phone, Globe, Palette, MessageSquare, X, Sliders, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product, getProductsArray } from '../data/products';

// Define Product type for better type safety
// Use the imported Product interface

// Combine all products with proper typing
const ALL_PRODUCTS: Product[] = getProductsArray();

const CATEGORIES = [
  { id: 'all', label: 'All Products', icon: <BookOpen className="h-5 w-5" /> },
  { id: 'services', label: 'Services', icon: <Briefcase className="h-5 w-5" /> },
  { id: 'coaching', label: 'Coaching', icon: <Users className="h-5 w-5" /> },
  { id: 'programs', label: 'Programs', icon: <Dumbbell className="h-5 w-5" /> },
  { id: 'business', label: 'For PTs', icon: <Building2 className="h-5 w-5" /> },
  { id: 'resources', label: 'Resources', icon: <Download className="h-5 w-5" /> },
  { id: 'education', label: 'Education', icon: <Brain className="h-5 w-5" /> },
];

const PERSONAS = [
  {
    id: 'trainer',
    title: 'Personal Trainer',
    description: 'Build and scale your fitness business',
    icon: Users,
    categories: ['business', 'education', 'resources']
  },
  {
    id: 'gym-owner',
    title: 'Gym Owner',
    description: 'Recruitment and PT Management',
    icon: Building2,
    categories: ['services', 'business', 'resources']
  },
  {
    id: 'individual',
    title: 'Training for Myself',
    description: 'Personal fitness and wellness',
    icon: User,
    categories: ['programs', 'coaching']
  }
];

const TAGS = [
  { id: 'new', label: 'Recently Added', icon: <Clock className="h-4 w-4" /> },
  { id: 'bestseller', label: 'Bestsellers', icon: <Star className="h-4 w-4" /> },
  { id: 'science-backed', label: 'Science-Backed', icon: <Brain className="h-4 w-4" /> },
  { id: 'limited', label: 'Limited Release', icon: <Fire className="h-4 w-4" /> },
  { id: 'service', label: 'Service', icon: <Phone className="h-4 w-4" /> },
];

const PRICE_RANGES = [
  { id: 'all', label: 'All Prices' },
  { id: 'under-50', label: 'Under $50' },
  { id: '50-100', label: '$50 - $100' },
  { id: '100-200', label: '$100 - $200' },
  { id: 'over-200', label: 'Over $200' },
];

const FORMATS = [
  { id: 'all', label: 'All Formats' },
  { id: 'course', label: 'Online Course' },
  { id: 'ebook', label: 'eBook' },
  { id: 'template', label: 'Templates' },
  { id: 'service', label: 'Service' },
];

// New component for product card in grid layout
interface ProductGridCardProps {
  product: Product;
}

const ProductGridCard = ({ product }: ProductGridCardProps) => {
  // Convert features to display format
  const getFeatureText = (feature: any): string => {
    if (typeof feature === 'string') {
      return feature;
    } else if (feature && feature.title) {
      return feature.title;
    }
    return '';
  };

  const displayFeatures = Array.isArray(product.features) 
    ? product.features.map(getFeatureText)
    : [];

  return (
    <div className="bg-background-card border border-ui-border hover:border-accent-primary transition-all duration-300 flex flex-col rounded-sm overflow-hidden">
      <div className="relative aspect-square overflow-hidden bg-background-main flex items-center justify-center">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
        {product.tags.includes('bestseller') && (
          <div className="absolute top-2 right-2 bg-accent-primary text-text-primary text-xs px-2 py-1 rounded-sm">
            <Star className="h-3 w-3 inline mr-1" />
            Bestseller
          </div>
        )}
        {product.tags.includes('new') && (
          <div className="absolute bottom-2 left-0 bg-accent-primary text-text-primary text-xs px-3 py-1">
            New
          </div>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="text-text-secondary text-sm font-medium uppercase mb-1 tracking-wider">
          {product.category === 'programs' ? 'Program' : 
           product.category === 'services' ? 'Service' : 
           product.category === 'business' ? 'Business Tool' : 
           product.category === 'education' ? 'Education' : 
           product.category}
        </div>
        
        <h3 className="text-text-primary font-bold text-base mb-1 line-clamp-2">
          {product.name}
        </h3>
        
        <div className="text-text-secondary text-xs mb-3">
          {displayFeatures.length > 0 ? displayFeatures[0] : ''}
          {displayFeatures.length > 1 ? ` - ${displayFeatures[1]}` : ''}
        </div>
        
        <div className="mt-auto">
          <div className="flex justify-between items-center">
            <div className="font-bold text-text-primary text-lg">
              ${product.price.toFixed(2)}
            </div>
            <div className="flex items-center text-accent-primary">
              <Star className="h-3 w-3 fill-current" />
              <span className="text-xs ml-1">{product.rating}</span>
            </div>
          </div>
          
          <Link to={`/products/${product.id}`} className="mt-3 block w-full">
            <button className="w-full py-2 text-center text-accent-primary border border-accent-primary hover:bg-accent-primary hover:text-text-primary transition-colors text-sm font-medium">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Filter sidebar component
interface FilterSidebarProps {
  priceRange: string;
  setPriceRange: (range: string) => void;
  selectedTags: string[];
  toggleTag: (tagId: string) => void;
  selectedPersona: string | null;
  setSelectedPersona: (persona: string | null) => void;
}

const FilterSidebar = ({ 
  priceRange, 
  setPriceRange, 
  selectedTags, 
  toggleTag,
  selectedPersona,
  setSelectedPersona
}: FilterSidebarProps) => {
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(1500);
  
  const handleRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setPriceMax(value);
    
    // Set price range category based on slider
    if (value < 50) {
      setPriceRange('under-50');
    } else if (value >= 50 && value <= 100) {
      setPriceRange('50-100');
    } else if (value > 100 && value <= 200) {
      setPriceRange('100-200');
    } else {
      setPriceRange('over-200');
    }
  };

  const FILTER_SECTIONS = [
    {
      title: 'I am a',
      content: (
        <div className="space-y-2">
          {PERSONAS.map(persona => (
            <div 
              key={persona.id} 
              className={`flex items-center p-2 cursor-pointer rounded-sm transition-colors ${
                selectedPersona === persona.id 
                  ? 'bg-accent-primary/10 text-accent-primary' 
                  : 'hover:bg-background-section'
              }`}
              onClick={() => setSelectedPersona(persona.id)}
            >
              <div className="mr-2">
                {React.createElement(persona.icon, { 
                  className: 'h-5 w-5',
                  strokeWidth: 1.5
                })}
              </div>
              <div className="text-sm">{persona.title}</div>
            </div>
          ))}
        </div>
      )
    },
    {
      title: 'Price',
      content: (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>${priceMin.toFixed(2)}</span>
            <span>${priceMax.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0"
            max="1500"
            value={priceMax}
            onChange={handleRangeChange}
            className="w-full accent-accent-primary"
          />
          <div className="text-sm text-text-secondary">
            Selected: {priceRange === 'all' ? 'All Prices' : PRICE_RANGES.find(p => p.id === priceRange)?.label}
          </div>
        </div>
      )
    },
    {
      title: 'Tags',
      content: (
        <div className="flex flex-wrap gap-2">
          {TAGS.map(tag => (
            <button
              key={tag.id}
              onClick={() => toggleTag(tag.id)}
              className={`flex items-center gap-1 px-3 py-1 text-sm rounded-full transition-colors ${
                selectedTags.includes(tag.id)
                  ? 'bg-accent-primary text-text-primary'
                  : 'bg-background-section text-text-secondary hover:bg-accent-primary/20'
              }`}
            >
              {tag.icon}
              {tag.label}
            </button>
          ))}
        </div>
      )
    },
    {
      title: 'Availability',
      content: (
        <div className="space-y-2">
          <div className="flex items-center">
            <input type="checkbox" id="inStock" defaultChecked className="accent-accent-primary h-4 w-4" />
            <label htmlFor="inStock" className="ml-2 text-sm">In Stock</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="preOrder" className="accent-accent-primary h-4 w-4" />
            <label htmlFor="preOrder" className="ml-2 text-sm">Pre-Order</label>
          </div>
        </div>
      )
    },
    {
      title: 'Rating',
      content: (
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map(rating => (
            <div key={rating} className="flex items-center">
              <input 
                type="checkbox" 
                id={`rating-${rating}`} 
                className="accent-accent-primary h-4 w-4" 
                defaultChecked={rating >= 4}
              />
              <label htmlFor={`rating-${rating}`} className="ml-2 text-sm flex items-center">
                {Array(rating).fill(0).map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-accent-primary fill-current" />
                ))}
                {Array(5-rating).fill(0).map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-ui-border" />
                ))}
              </label>
            </div>
          ))}
        </div>
      )
    },
    {
      title: 'Format',
      content: (
        <div className="space-y-2">
          {FORMATS.slice(1).map(format => (
            <div key={format.id} className="flex items-center">
              <input 
                type="checkbox" 
                id={`format-${format.id}`} 
                className="accent-accent-primary h-4 w-4" 
              />
              <label htmlFor={`format-${format.id}`} className="ml-2 text-sm">
                {format.label}
              </label>
            </div>
          ))}
        </div>
      )
    }
  ];
  
  return (
    <div className="w-64 flex-shrink-0 pr-6 border-r border-ui-border">
      {FILTER_SECTIONS.map((section, index) => (
        <div key={index} className="mb-6">
          <h3 className="text-sm font-bold text-text-primary mb-3 pb-2 border-b border-ui-border">{section.title}</h3>
          {section.content}
        </div>
      ))}
      
      <button className="w-full mt-4 py-2 text-center text-accent-primary text-sm font-medium border border-accent-primary hover:bg-accent-primary hover:text-text-primary transition-colors">
        Reset All Filters
      </button>
    </div>
  );
};

// Collection header component
interface CollectionHeaderProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const CollectionHeader = ({ activeCategory, setActiveCategory }: CollectionHeaderProps) => {
  return (
    <div className="mb-8">
      <div className="h-48 relative mb-8">
        <img 
          src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&q=80&w=1920" 
          alt="Collection header" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center bg-background-main/60">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl font-bold text-text-primary">
              {activeCategory === 'all' 
                ? 'The Vault' 
                : CATEGORIES.find(c => c.id === activeCategory)?.label || 'The Vault'}
            </h1>
            <p className="text-lg text-text-secondary mt-2 max-w-xl">
              Tools to Build Your Body, Your Business, or Both. Everything here is designed to get you results.
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex gap-4 border-b border-ui-border pb-4">
        {CATEGORIES.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
              activeCategory === category.id
                ? 'text-accent-primary border-b-2 border-accent-primary -mb-px'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {category.icon}
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
};

// Product count and sort controls
interface ProductControlsProps {
  totalProducts: number;
}

const ProductControls = ({ totalProducts }: ProductControlsProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="text-sm text-text-secondary">
        {totalProducts} products
      </div>
      
      <div className="flex items-center">
        <label className="text-sm text-text-secondary mr-2">Sort by:</label>
        <select className="bg-background-card border border-ui-border text-sm p-2 text-text-primary">
          <option>Featured</option>
          <option>Newest</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Best Selling</option>
          <option>Rating</option>
        </select>
      </div>
    </div>
  );
};

// Main Products component with redesigned layout
export default function Products() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string>('all');
  const [format, setFormat] = useState<string>('all');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);

  const toggleTag = (tagId: string): void => {
    setSelectedTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(t => t !== tagId)
        : [...prev, tagId]
    );
  };

  const filteredProducts = ALL_PRODUCTS.filter(product => {
    // Search filter
    const matchesSearch = searchQuery === '' || 
                         product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());

    // Category filter - show all products if 'all' is selected
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;

    // Persona filter
    const matchesPersona = !selectedPersona || product.personas.includes(selectedPersona);

    // Tags filter
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => product.tags.includes(tag));

    // Price range filter
    let matchesPrice = true;
    if (priceRange !== 'all') {
      switch (priceRange) {
        case 'under-50':
          matchesPrice = product.price < 50;
          break;
        case '50-100':
          matchesPrice = product.price >= 50 && product.price <= 100;
          break;
        case '100-200':
          matchesPrice = product.price > 100 && product.price <= 200;
          break;
        case 'over-200':
          matchesPrice = product.price > 200;
          break;
      }
    }
    
    return matchesSearch && matchesCategory && matchesPersona && matchesTags && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-background-main pt-20">
      {/* Search bar in header - this would be in your global header component */}
      <div className="sticky top-0 z-50 bg-background-main border-b border-ui-border py-4 hidden">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="w-full max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-background-section border border-ui-border rounded-sm pl-10 pr-4 py-2 text-text-primary focus:outline-none focus:border-accent-primary"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile filters button */}
      <div className="lg:hidden fixed bottom-4 right-4 z-40">
        <button 
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          className="flex items-center gap-2 bg-accent-primary text-text-primary px-4 py-3 rounded-full shadow-lg"
        >
          <Sliders className="h-5 w-5" />
          {mobileFiltersOpen ? 'Close Filters' : 'Filters'}
        </button>
      </div>

      {/* Mobile filters sidebar */}
      {mobileFiltersOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-background-main/90 overflow-auto">
          <div className="fixed top-0 right-0 h-full w-full max-w-xs bg-background-card shadow-xl p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-text-primary">Filters</h2>
              <button onClick={() => setMobileFiltersOpen(false)}>
                <X className="h-6 w-6 text-text-secondary" />
              </button>
            </div>
            
            <FilterSidebar 
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedTags={selectedTags}
              toggleTag={toggleTag}
              selectedPersona={selectedPersona}
              setSelectedPersona={setSelectedPersona}
            />
            
            <div className="pt-6 mt-6 border-t border-ui-border">
              <button 
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full py-3 bg-accent-primary text-text-primary font-medium"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-10">
        {/* Collection Header */}
        <CollectionHeader 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
        />
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Desktop only */}
          <div className="hidden lg:block">
            <FilterSidebar 
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedTags={selectedTags}
              toggleTag={toggleTag}
              selectedPersona={selectedPersona}
              setSelectedPersona={setSelectedPersona}
            />
          </div>
          
          {/* Main Content Area */}
          <div className="flex-1">
            <ProductControls totalProducts={filteredProducts.length} />
            
            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductGridCard key={product.id} product={product} />
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-text-secondary text-lg">
                  No products found matching your criteria. Try adjusting your filters or search terms.
                </p>
              </div>
            )}
            
            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex items-center gap-2">
                <button className="w-10 h-10 flex items-center justify-center border border-ui-border bg-background-card text-text-secondary hover:border-accent-primary hover:text-accent-primary transition-colors">
                  <ChevronUp className="h-5 w-5 rotate-90" />
                </button>
                
                {[1, 2, 3].map(page => (
                  <button 
                    key={page}
                    className={`w-10 h-10 flex items-center justify-center border transition-colors ${
                      page === 1 
                        ? 'border-accent-primary bg-accent-primary text-text-primary' 
                        : 'border-ui-border bg-background-card text-text-secondary hover:border-accent-primary hover:text-accent-primary'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button className="w-10 h-10 flex items-center justify-center border border-ui-border bg-background-card text-text-secondary hover:border-accent-primary hover:text-accent-primary transition-colors">
                  <ChevronDown className="h-5 w-5 rotate-90" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Newsletter Section */}
      <section className="bg-background-section py-16 mt-16 border-t border-ui-border">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Get notified about new products
            </h2>
            <p className="text-text-secondary mb-8">
              Sign up to our newsletter to receive updates about new releases, discounts and special offers.
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 px-4 py-3 border border-ui-border bg-background-card text-text-primary focus:outline-none focus:border-accent-primary"
              />
              <button className="bg-accent-primary text-text-primary px-6 py-3 font-medium hover:bg-accent-hover transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products Carousel */}
      <section className="py-16 bg-background-main">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-text-primary mb-8">Featured Collections</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.slice(1, 5).map(category => (
              <div 
                key={category.id}
                className="aspect-square relative group overflow-hidden cursor-pointer"
              >
                <img 
                  src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=1920"
                  alt={category.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-main/90 to-transparent flex items-end p-6">
                  <div>
                    <h3 className="text-xl font-bold text-text-primary">{category.label}</h3>
                    <button className="mt-2 text-accent-primary text-sm font-medium flex items-center group-hover:underline">
                      Explore Collection
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Recently Viewed */}
      <section className="py-16 bg-background-section border-t border-ui-border">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-text-primary mb-8">Recently Viewed</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ALL_PRODUCTS.slice(0, 4).map(product => (
              <ProductGridCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer - This would be your global footer */}
      <footer className="bg-background-main border-t border-ui-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-lg font-bold text-text-primary mb-4">Categories</h3>
              <ul className="space-y-2">
                {CATEGORIES.map(category => (
                  <li key={category.id}>
                    <a href="#" className="text-text-secondary hover:text-accent-primary transition-colors">
                      {category.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-text-primary mb-4">For</h3>
              <ul className="space-y-2">
                {PERSONAS.map(persona => (
                  <li key={persona.id}>
                    <a href="#" className="text-text-secondary hover:text-accent-primary transition-colors">
                      {persona.title}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#" className="text-text-secondary hover:text-accent-primary transition-colors">
                    Corporate
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-text-primary mb-4">Customer Service</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-text-secondary hover:text-accent-primary transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-text-secondary hover:text-accent-primary transition-colors">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#" className="text-text-secondary hover:text-accent-primary transition-colors">
                    Shipping & Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="text-text-secondary hover:text-accent-primary transition-colors">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="text-text-secondary hover:text-accent-primary transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-text-primary mb-4">About Us</h3>
              <p className="text-text-secondary mb-4">
                We help fitness professionals and enthusiasts achieve their goals with science-backed resources and tools.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="text-text-secondary hover:text-accent-primary transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                  </svg>
                </a>
                <a href="#" className="text-text-secondary hover:text-accent-primary transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.668-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" className="text-text-secondary hover:text-accent-primary transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                  </svg>
                </a>
                <a href="#" className="text-text-secondary hover:text-accent-primary transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-ui-border flex flex-col md:flex-row justify-between items-center">
            <p className="text-text-secondary text-sm mb-4 md:mb-0">
              © 2025 The Vault. All rights reserved.
            </p>
            
            <div className="flex items-center gap-4">
              <a href="#" className="text-text-secondary hover:text-accent-primary transition-colors text-sm">
                Sitemap
              </a>
              <a href="#" className="text-text-secondary hover:text-accent-primary transition-colors text-sm">
                Accessibility
              </a>
              <a href="#" className="text-text-secondary hover:text-accent-primary transition-colors text-sm">
                Cookie Settings
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}