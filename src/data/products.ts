import { 
  Globe, 
  Palette, 
  MessageSquare, 
  Dumbbell, 
  Brain, 
  Target, 
  Video, 
  FileText, 
  Building2, 
  Users 
} from 'lucide-react';

// Define Product types
export interface Product {
  id: string;
  name: string;
  hook?: string;
  description: string;
  detailedDescription?: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  forProfessionals: boolean;
  features: Array<{
    title: string;
    description: string;
    icon: any;
  }>;
  specifications?: Array<{
    name: string;
    value: string;
  }>;
  includes?: string[];
  perfectFor?: string[];
  notFor?: string[];
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
  variants?: Array<{
    id: string;
    name: string;
    image: string;
    colorName: string;
  }>;
  straps?: Array<{
    id: string;
    name: string;
    image: string;
    price: string;
  }>;
  gallery?: string[];
  relatedProducts?: string[];
  inStock: boolean;
  rating: number;
  usersCount?: number;
  personas: string[];
  tags: string[];
  checkoutUrl?: string;
}

// Define all products
export const PRODUCTS: { [key: string]: Product } = {
  'website-creation': {
    id: 'website-creation',
    name: 'Professional Landing Page for Personal Trainers',
    hook: 'Transform Your PT Business with a Professional Online Presence – In Minutes',
    description: 'Grow your PT business online with a high-converting, done-for-you landing page. Limited-time offer – $99 for a comprehensive business bundle.',
    detailedDescription: 'In today\'s digital world, standing out online is crucial. Get a conversion-focused landing page that attracts clients – no tech skills required. Our team of expert designers will create a professional, mobile-responsive landing page that showcases your training services, increases client inquiries, and establishes your online credibility – all without the hassle of learning web design or paying thousands to a web developer.',
    price: 99,
    originalPrice: 499,
    category: 'business',
    image: 'https://i.imgur.com/IyR02Mx.png',
    forProfessionals: true,
    rating: 4.9,
    usersCount: 320,
    inStock: true,
    personas: ['trainer'],
    tags: ['new', 'bestseller', 'service'],
    specifications: [
      { name: 'Type', value: 'Digital Service' },
      { name: 'Delivery Time', value: '2-3 business days' },
      { name: 'Updates', value: 'Free minor updates for 30 days' },
      { name: 'Hosting', value: 'Fully hosted solution included' },
      { name: 'Mobile Responsive', value: 'Yes, fully responsive design' },
      { name: 'Support', value: 'Email Support Included' }
    ],
    features: [
      {
        title: 'Professional Landing Page',
        description: 'Converts visitors into leads effectively',
        icon: Globe
      },
      {
        title: 'Social Media Templates',
        description: '1500+ ready to go templates',
        icon: Palette
      },
      {
        title: 'No Tech Setup',
        description: 'Fully handled for you by our team',
        icon: MessageSquare
      },
      {
        title: 'White-Labeled Recipes',
        description: '12 ready-to-share healthy recipes',
        icon: FileText
      }
    ],
    includes: [
      'Professional Landing Page (Value: $199)',
      'Social Media Content Templates (1500+ templates) (Value: $78)',
      'Direct Inquiry Routing System (Value: $149)',
      '12 White-Labeled Healthy Recipes (Value: $73)'
    ],
    perfectFor: [
      'Personal trainers looking to grow their client base online',
      'Fitness professionals without technical web design skills',
      'Trainers who want to establish a professional online presence',
      'Coaches who need to convert more website visitors into clients'
    ],
    notFor: [
      'Those who need a multi-page website with advanced features',
      'Businesses requiring e-commerce functionality',
      'Trainers not ready to establish an online presence'
    ],
    faqs: [
      {
        question: 'How does the process work?',
        answer: 'After purchase, you\'ll complete a simple 5-minute form about your business. Our team will build your professional landing page, and you\'ll start receiving client inquiries directly to your inbox.'
      },
      {
        question: 'Do I need to provide any content?',
        answer: 'We\'ll need basic information about your business and services, but we handle all design, layout, and technical aspects. You\'ll have the opportunity to provide any specific text or imagery you\'d like to include.'
      },
      {
        question: 'Can I customize the landing page?',
        answer: 'Yes! Your landing page will be built according to your branding preferences. We\'ll match your colors, include your logo, and highlight your specific services.'
      },
      {
        question: 'What about hosting and domain costs?',
        answer: 'Hosting is included in the package at no additional cost. If you already have a domain, we can use that. If not, we can help you purchase one (domain costs not included).'
      }
    ],
    variants: [
      {
        id: 'website-creation-basic',
        name: 'Basic Landing Page',
        image: 'https://i.imgur.com/IyR02Mx.png',
        colorName: 'Basic'
      }
    ],
    gallery: [
      'https://i.imgur.com/IyR02Mx.png',
    ],
    relatedProducts: [
      'online-coaching-bundle',
      'pt-business-toolkit'
    ],
    checkoutUrl: 'https://buy.stripe.com/dR69BK9KA3cD8o0cMR'
  },
  'online-coaching-bundle': {
    id: 'online-coaching-bundle',
    name: 'Online Coaching & Social Media Bundle',
    hook: 'Everything You Need to Launch Your Online Coaching Brand — In One Powerful Package',
    description: 'Everything you need to launch your online coaching brand — in one powerful package. Includes a custom website and 1800+ social media templates.',
    detailedDescription: 'The ONLINE COACHING BUNDLE is crafted for fitness professionals who want to establish a powerful online presence. This meticulously designed package combines all the essential elements to create a cohesive brand and effective marketing strategy. With this bundle, you\'ll get a professionally designed website that converts visitors into clients, plus an extensive library of social media templates to maintain consistent, engaging content.',
    price: 299.99,
    originalPrice: 599,
    category: 'business',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1920',
    forProfessionals: true,
    rating: 4.9,
    usersCount: 850,
    inStock: true,
    personas: ['trainer'],
    tags: ['new', 'bestseller'],
    specifications: [
      { name: 'Type', value: 'Digital Bundle' },
      { name: 'Version', value: '2024 Edition' },
      { name: 'Updates', value: 'Free updates for 1 year' },
      { name: 'Templates', value: '1800+ Canva Templates' },
      { name: 'Website', value: '4-page Professional Site' },
      { name: 'Support', value: 'Email + Priority Chat' }
    ],
    features: [
      {
        title: 'Custom Website',
        description: 'Professional 4-page site built for your brand',
        icon: Globe
      },
      {
        title: 'Social Templates',
        description: '1800+ ready-to-use Canva templates',
        icon: Palette
      },
      {
        title: 'Brand Kit Setup',
        description: 'Complete branding package with your colors & style',
        icon: Brain
      },
      {
        title: 'Content Categories',
        description: 'Workout tips, nutrition, transformations & more',
        icon: MessageSquare
      }
    ],
    includes: [
      'Custom 4-page website with your branding',
      '1800+ editable social media templates',
      'Brand kit setup and guidance',
      'Step-by-step setup tutorials',
      'Content strategy training',
      'Lead generation guidance'
    ],
    perfectFor: [
      'Personal Trainers ready to take their coaching business online',
      'Coaches wanting to stand out on social media without the design stress',
      'Fitness professionals who want a website but don\'t know where to start',
      'Anyone tired of winging it with Canva or inconsistent posting'
    ],
    notFor: [
      'Trainers not ready to commit to online coaching',
      'Those who prefer to create everything from scratch',
      'Businesses needing complex e-commerce solutions'
    ]
  },
  'ultimate-beginners-guide': {
    id: 'ultimate-beginners-guide',
    name: 'The Ultimate Beginners Guide',
    hook: 'The most effective programming methods for beginner lifters who want to lose body fat, build lean muscle, & completely transform their physique.',
    description: 'The most effective programming methods for beginner lifters who want to lose body fat, build lean muscle, & completely transform their physique.',
    price: 97,
    originalPrice: 297,
    category: 'programs',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1920',
    forProfessionals: false,
    rating: 4.9,
    usersCount: 120000,
    inStock: true,
    personas: ['individual'],
    tags: ['programs', 'science-backed'],
    features: [
      {
        title: 'Step-by-step Training Program',
        description: 'Full gym and home workouts tailored for beginners',
        icon: Dumbbell
      },
      {
        title: 'Video Exercise Library',
        description: '100+ detailed exercise demonstrations',
        icon: Video
      },
      {
        title: 'Nutrition Framework',
        description: 'Simple, sustainable meal planning guide',
        icon: FileText
      },
      {
        title: 'Progress Tracking',
        description: 'Easy-to-use workout and measurement logs',
        icon: Target
      },
      {
        title: 'Form Mastery',
        description: 'Technique guides for all major exercises',
        icon: Brain
      },
      {
        title: 'Community Support',
        description: 'Access to private support community',
        icon: Users
      }
    ]
  }
};

// Helper function to get products as array
export const getProductsArray = (): Product[] => {
  return Object.values(PRODUCTS);
}; 