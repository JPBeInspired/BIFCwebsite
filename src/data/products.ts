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
  'pt-starter-pack': {
    id: 'pt-starter-pack',
    name: 'Personal Trainer Starter Pack',
    hook: 'The ultimate toolkit to launch your PT business with confidence and professionalism.',
    description: 'The PT Starter Pack is an all-in-one digital bundle featuring 20+ professionally designed, fully editable Canva templates tailored for new and experienced Personal Trainers.',
    detailedDescription: 'The PT Starter Pack is an all-in-one digital bundle featuring 20+ professionally designed, fully editable Canva templates tailored for new and experienced Personal Trainers. These templates are built to help you streamline onboarding, automate client management, showcase your services, and instantly upgrade your brand. From service pricing sheets to social media content, client forms, and done-for-you training programs — it\'s everything you need to start strong and grow faster.',
    price: 39.99,
    category: 'business',
    image: 'https://i.imgur.com/nOXf3RT.png',
    forProfessionals: true,
    rating: 4.8,
    usersCount: 250,
    inStock: true,
    personas: ['trainer'],
    tags: ['new', 'business', 'templates'],
    specifications: [
      { name: 'Type', value: 'Digital Bundle' },
      { name: 'Format', value: 'Canva Templates' },
      { name: 'Templates', value: '20+ Professional Templates' },
      { name: 'Customization', value: 'Fully Editable in Canva' },
      { name: 'Delivery', value: 'Instant Download' },
      { name: 'Support', value: 'Email Support Included' }
    ],
    features: [
      {
        title: 'Client Onboarding Tools',
        description: 'Welcome packs, contracts, invoices & more',
        icon: FileText
      },
      {
        title: 'Training Program Templates',
        description: 'Ready-to-use workout programs for clients',
        icon: Dumbbell
      },
      {
        title: 'Social Media Templates',
        description: 'Professional IG posts, reels & stories',
        icon: Palette
      },
      {
        title: 'Tracking & Goal Tools',
        description: 'Client progress tracking made simple',
        icon: Target
      }
    ],
    includes: [
      'Client Onboarding Pack (Welcome Pack, Goodbye Pack, Contract, Invoice)',
      'Services & Pricing Sheet Template',
      'Business Card Template',
      'Client Forms (PAR-Q, Questionnaire)',
      'Workout Program Templates (Male & Female versions)',
      'Social Media Templates (IG Posts, Reels, Stories)',
      'Weight Loss Tracker Template'
    ],
    perfectFor: [
      'New Personal Trainers just starting their business',
      'Aspiring coaches looking to fast-track their setup',
      'Solo PTs who want to save time and look polished',
      'Experienced PTs who want to refresh their brand',
      'Fitness business managers helping trainers onboard'
    ],
    notFor: [
      'Trainers who prefer creating everything from scratch',
      'Those not using Canva for their design work',
      'Businesses needing completely custom branding'
    ],
    faqs: [
      {
        question: 'How does the product work?',
        answer: 'Open the PDF and click on any template button. You\'ll be taken to a Canva preview page — no Canva Pro required. Click "Use Template", customize with your brand, and you\'re done.'
      },
      {
        question: 'Do I need Canva Pro to use these templates?',
        answer: 'No, you can use these templates with a free Canva account. Some premium Canva elements may require a Canva Pro subscription if you want to customize further.'
      },
      {
        question: 'Can I reuse the templates for multiple clients?',
        answer: 'Yes! The templates can be reused again and again for different clients or promotions, giving you endless value.'
      },
      {
        question: 'Can I resell this product?',
        answer: 'This pack can be resold or bundled as part of a PT coaching course, mentorship offer, or onboarding toolkit for gym chains.'
      }
    ],
    gallery: [
      'https://i.imgur.com/nOXf3RT.png',
      'https://i.imgur.com/NGamAGW.png',
      'https://i.imgur.com/hMYbAmi.png',
      'https://i.imgur.com/kWcHlcx.png',
      'https://i.imgur.com/nxesBTW.png',
      'https://i.imgur.com/4vEnQzG.png',
      'https://i.imgur.com/bltP0f3.png',
      'https://i.imgur.com/1g7LVJF.png'      
    ],
    relatedProducts: [
      'website-creation',
      'online-coaching-bundle'
    ],
    checkoutUrl: 'https://buy.stripe.com/pt-starter-pack'
  },
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
      'pt-business-toolkit',
      'pt-starter-pack'
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
    ],
    relatedProducts: [
      'website-creation',
      'pt-starter-pack'
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