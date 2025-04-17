import { useState } from 'react';
import { ArrowRight, BookOpen, Dumbbell, Users, Building2, Download, Brain, User, ChevronDown, Star, Siren as Fire, Clock, Sparkles, Briefcase, Phone, Globe, Palette, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import FilterButton from '../components/FilterButton';
import SearchBar from '../components/SearchBar';

// Mock data - replace with actual data fetching
const MOCK_PRODUCTS = [
  {
    id: 'online-coaching-bundle',
    name: 'Online Coaching & Social Media Bundle',
    description: 'Everything you need to launch your online coaching brand — in one powerful package. Includes a custom website and 1800+ social media templates.',
    price: 299.99,
    category: 'business',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1920',
    forProfessionals: true,
    features: ['Custom Website', 'Social Media Templates', 'Brand Kit Setup'],
    inStock: true,
    rating: 4.9,
    personas: ['trainer'],
    tags: ['new', 'bestseller']
  },
  {
    id: 'ultimate-beginners-guide',
    name: 'The Ultimate Beginners Guide',
    description: 'The most effective programming methods for beginner lifters who want to lose body fat, build lean muscle, & completely transform their physique.',
    price: 97,
    category: 'programs',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1920',
    forProfessionals: false,
    features: ['Step-by-step Training Program', 'Video Exercise Library', 'Nutrition Framework'],
    inStock: true,
    rating: 4.9,
    personas: ['individual'],
    tags: ['programs', 'science-backed']
  },
  {
    id: 'pt-recruitment',
    name: 'PT Recruitment Service',
    description: 'Get 5+ qualified personal trainer candidates within 30 days, fully screened and ready to start.',
    price: 750,
    category: 'services',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=1920',
    forProfessionals: true,
    features: ['5+ Candidates', 'Full Screening', 'Contract Preparation'],
    inStock: true,
    rating: 4.9,
    personas: ['gym-owner'],
    tags: ['service']
  },
  {
    id: 'pt-management',
    name: 'Complete PT Management',
    description: 'Full-scale PT department management with zero base cost to your facility.',
    price: 0,
    category: 'services',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1920',
    forProfessionals: true,
    features: ['Full Management', 'Ongoing Support', 'No Base Cost'],
    inStock: true,
    rating: 5.0,
    personas: ['gym-owner'],
    tags: ['service', 'premium']
  },
  {
    id: 'pt-development',
    name: 'PT Development Program',
    description: 'Comprehensive program for developing and managing your PT team, including recruitment and initial training.',
    price: 1499,
    category: 'services',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1920',
    forProfessionals: true,
    features: ['Recruitment', 'Training Program', '3-Month Support'],
    inStock: true,
    rating: 4.8,
    personas: ['gym-owner'],
    tags: ['service']
  }
];

const CATEGORIES = [
  { id: 'all', label: 'All', icon: <BookOpen className="h-5 w-5" /> },
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

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState('all');
  const [format, setFormat] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const handlePersonaSelect = (personaId: string) => {
    setSelectedPersona(personaId);
    const persona = PERSONAS.find(p => p.id === personaId);
    if (persona && persona.categories.length > 0) {
      setActiveCategory(persona.categories[0]);
    }
    
    // Smooth scroll to products section
    document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleTag = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(t => t !== tagId)
        : [...prev, tagId]
    );
  };

  const filteredProducts = MOCK_PRODUCTS.filter(product => {
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
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://i.imgur.com/sjJ3lPF.jpeg"
            alt="The Vault Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background-main via-background-main/90 to-background-main/80" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-text-primary mb-6">
              The Vault
            </h1>
            <p className="text-xl text-text-secondary mb-12 leading-relaxed">
              Tools to Build Your Body, Your Business, or Both.
              Everything here is designed to get you results — whether you're a coach, a gym owner or an average joe.
            </p>
            <div className="flex flex-col gap-8">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
              <div className="flex items-center gap-2 text-text-secondary">
                <ChevronDown className="h-5 w-5 animate-bounce" />
                <span>Select who you are below to see relevant content</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Persona Selection */}
      <section className="bg-background-section py-16 -mt-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PERSONAS.map((persona) => {
              const Icon = persona.icon;
              const isSelected = selectedPersona === persona.id;
              
              return (
                <button
                  key={persona.id}
                  onClick={() => handlePersonaSelect(persona.id)}
                  className={`p-8 border-2 transition-all duration-300 ${
                    isSelected
                      ? 'border-accent-primary bg-background-card'
                      : 'border-ui-border bg-background-card hover:border-accent-primary'
                  }`}
                >
                  <Icon className={`h-12 w-12 mb-4 ${
                    isSelected ? 'text-accent-primary' : 'text-text-secondary'
                  }`} />
                  <h3 className="text-xl font-bold text-text-primary mb-2">
                    {persona.title}
                  </h3>
                  <p className="text-text-secondary">
                    {persona.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Filter Bar (Sticky) */}
      <div className="sticky top-20 bg-background-section border-y border-ui-border z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center gap-4">
            {/* Quick Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2 flex-grow">
              {CATEGORIES.map((category) => (
                <FilterButton
                  key={category.id}
                  label={category.label}
                  icon={category.icon}
                  active={activeCategory === category.id}
                  onClick={() => setActiveCategory(category.id)}
                />
              ))}
            </div>

            {/* Advanced Filters Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-background-card hover:bg-accent-primary transition-colors text-text-secondary hover:text-text-primary"
            >
              <Sparkles className="h-4 w-4" />
              Filters
            </button>
          </div>

          {/* Advanced Filters Panel */}
          {showFilters && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6 py-4 border-t border-ui-border">
              {/* Tags */}
              <div>
                <h3 className="text-sm font-medium text-text-secondary mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {TAGS.map(tag => (
                    <button
                      key={tag.id}
                      onClick={() => toggleTag(tag.id)}
                      className={`flex items-center gap-1 px-3 py-1 text-sm rounded-full transition-colors ${
                        selectedTags.includes(tag.id)
                          ? 'bg-accent-primary text-text-primary'
                          : 'bg-background-card text-text-secondary hover:bg-accent-primary/20'
                      }`}
                    >
                      {tag.icon}
                      {tag.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="text-sm font-medium text-text-secondary mb-3">Price Range</h3>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full bg-background-card border border-ui-border text-text-primary px-3 py-2"
                >
                  {PRICE_RANGES.map(range => (
                    <option key={range.id} value={range.id}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Format */}
              <div>
                <h3 className="text-sm font-medium text-text-secondary mb-3">Format</h3>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="w-full bg-background-card border border-ui-border text-text-primary px-3 py-2"
                >
                  {FORMATS.map(f => (
                    <option key={f.id} value={f.id}>
                      {f.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <section id="products-section" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-text-secondary text-lg">
                No products found matching your criteria. Try adjusting your filters or search terms.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Curated Sections */}
      <section className="py-16 bg-background-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-text-primary mb-8">Popular With Coaches</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {MOCK_PRODUCTS.filter(p => p.personas.includes('trainer')).slice(0, 3).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <h2 className="text-2xl font-bold text-text-primary mb-8">Client-Ready Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MOCK_PRODUCTS.filter(p => p.category === 'programs').slice(0, 3).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}