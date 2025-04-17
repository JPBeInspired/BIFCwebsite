import { ArrowLeft, Star, Download, Clock, Users, CheckCircle, XCircle, Package, Edit, Globe, BookOpen, Palette, MessageSquare, Dumbbell, Brain, Target, Video, FileText, Building2, Phone, Calendar } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const PRODUCTS = {
  'online-coaching-bundle': {
    id: 'online-coaching-bundle',
    name: 'Online Coaching & Social Media Bundle',
    hook: 'Everything You Need to Launch Your Online Coaching Brand — In One Powerful Package',
    price: 299.99,
    originalPrice: 599,
    rating: 4.9,
    usersCount: 850,
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1920',
    description: 'In 2024 and beyond, your digital presence is your storefront. This bundle gives you everything you need to build a professional online coaching business that stands out and converts followers into paying clients.',
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
    faqs: [
      {
        question: 'Do I need design experience?',
        answer: 'Not at all! Our templates are designed to be easily customized in Canva, even if you\'ve never used it before. We also provide step-by-step tutorials for everything.'
      },
      {
        question: 'What\'s included in the website?',
        answer: 'You get a professionally designed 4-page website including Home, About, Services, and Contact pages. The site is mobile-friendly, optimized for lead generation, and includes contact forms and call-to-action buttons.'
      },
      {
        question: 'Can I use my own branding?',
        answer: 'Absolutely! We\'ll help you set up your brand kit with your colors, fonts, and logo across both your website and social media templates. If you don\'t have branding yet, we\'ll help you create it.'
      },
      {
        question: 'Do I need to pay for hosting?',
        answer: 'Yes, you\'ll need to cover your own hosting and domain costs. We recommend providers and help you get set up, but these costs are not included in the bundle.'
      }
    ]
  },
  'ultimate-beginners-guide': {
    id: 'ultimate-beginners-guide',
    name: 'The Ultimate Beginners Guide',
    hook: 'The most effective programming methods for beginner lifters who want to lose body fat, build lean muscle, & completely transform their physique.',
    price: 97,
    originalPrice: 297,
    rating: 4.9,
    usersCount: 120000,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1920',
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
    ],
    courses: [
      {
        name: 'Fundamentals of Training',
        lessons: 12,
        includes: [
          'Basic exercise principles',
          'Proper form and technique',
          'Workout structure basics',
          'Recovery essentials',
          'Progress tracking methods'
        ]
      },
      {
        name: 'Nutrition Basics',
        lessons: 8,
        includes: [
          'Calorie and macro basics',
          'Meal planning templates',
          'Shopping guides',
          'Simple recipe collection',
          'Supplement guidance'
        ]
      },
      {
        name: 'Mindset & Habits',
        lessons: 6,
        includes: [
          'Goal setting framework',
          'Habit building strategies',
          'Motivation techniques',
          'Progress tracking tools',
          'Success mindset training'
        ]
      }
    ],
    perfectFor: [
      'The newbie in the gym (less than 6 months)',
      'The busy professional with no time to waste',
      'The serial dieter who needs real structure',
      'Anyone who feels lost or intimidated in the gym'
    ],
    notFor: [
      'Advanced lifters looking for specialization',
      'People who won\'t follow a structured routine',
      'Those looking for quick fixes'
    ],
    faqs: [
      {
        question: 'Do I need a gym membership?',
        answer: 'While a gym membership is ideal, we provide both gym and home workout variations for all exercises. You\'ll need minimal equipment for the home version - mainly dumbbells and resistance bands.'
      },
      {
        question: 'How much time do I need?',
        answer: 'The program is designed for 3-4 workouts per week, each lasting 45-60 minutes. It\'s specifically structured to be time-efficient while delivering maximum results.'
      },
      {
        question: 'What if I\'ve never worked out before?',
        answer: 'This program is specifically designed for beginners! We start with the basics and progressively build your knowledge and strength. Every exercise includes detailed form videos and scaling options.'
      },
      {
        question: 'Will this help me lose weight?',
        answer: 'Yes! The program combines proper training with nutrition guidance to help you achieve sustainable fat loss while building lean muscle. We focus on creating lasting habits rather than quick fixes.'
      }
    ]
  },
  'pt-recruitment': {
    id: 'pt-recruitment',
    name: 'PT Recruitment Service',
    hook: 'Get 5+ qualified personal trainer candidates within 30 days, fully screened and ready to start.',
    price: 750,
    rating: 4.9,
    usersCount: 150,
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=1920',
    description: 'Our recruitment service takes the hassle out of finding qualified personal trainers. We handle everything from sourcing to screening, ensuring you get the best candidates for your facility.',
    features: [
      {
        title: '5+ Qualified Candidates',
        description: 'Minimum of 5 pre-screened candidates within 30 days',
        icon: Users
      },
      {
        title: 'Full Screening Process',
        description: 'Background checks, qualification verification, and interviews',
        icon: CheckCircle
      },
      {
        title: 'Contract Preparation',
        description: 'All employment documentation prepared and ready',
        icon: Building2
      }
    ],
    process: [
      {
        title: 'Initial Consultation',
        description: 'We discuss your needs, culture, and requirements'
      },
      {
        title: 'Candidate Search',
        description: 'Active headhunting and advertising across our networks'
      },
      {
        title: 'Screening & Verification',
        description: 'thorough background checks and qualification verification'
      },
      {
        title: 'Interviews',
        description: 'We conduct initial interviews and assessments'
      },
      {
        title: 'Final Selection',
        description: 'You interview the best candidates and make your choice'
      }
    ],
    includes: [
      'Job market analysis and salary benchmarking',
      'Custom job descriptions and advertising',
      'Initial candidate screening and interviews',
      'Background and reference checks',
      'Contract preparation and negotiation support'
    ],
    faqs: [
      {
        question: 'What if I need candidates faster than 30 days?',
        answer: 'While we aim to provide candidates within 30 days, we can expedite the process for urgent needs. Contact us to discuss rush options.'
      },
      {
        question: 'What happens if a candidate doesn\'t work out?',
        answer: 'We offer a 60-day replacement guarantee. If a placed candidate leaves within this period, we\'ll find a replacement at no additional cost.'
      },
      {
        question: 'Do you handle international recruitment?',
        answer: 'Yes, we can recruit internationally, though this may require additional time and costs for visa processing and relocation.'
      }
    ]
  },
  'pt-management': {
    id: 'pt-management',
    name: 'Complete PT Management',
    hook: 'Full-scale PT department management with zero base cost to your facility.',
    price: 0,
    rating: 5.0,
    usersCount: 75,
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1920',
    description: 'Transform your PT department with our complete management solution. We handle everything from recruitment to ongoing development, operating on a revenue-share model that ensures our success is tied to yours.',
    features: [
      {
        title: 'Full Department Management',
        description: 'Complete oversight of your PT operations',
        icon: Building2
      },
      {
        title: 'Ongoing Support & Training',
        description: '24/7 support and regular development programs',
        icon: Phone
      },
      {
        title: 'Performance Tracking',
        description: 'Detailed analytics and KPI monitoring',
        icon: CheckCircle
      }
    ],
    process: [
      {
        title: 'Department Audit',
        description: 'Comprehensive review of current operations'
      },
      {
        title: 'Strategy Development',
        description: 'Custom plan creation based on your goals'
      },
      {
        title: 'Team Assembly',
        description: 'Recruitment and onboarding of qualified trainers'
      },
      {
        title: 'Systems Implementation',
        description: 'Setting up processes and tracking systems'
      },
      {
        title: 'Ongoing Management',
        description: 'Daily operations and continuous improvement'
      }
    ],
    includes: [
      'Recruitment and onboarding of all trainers',
      'Ongoing training and development programs',
      'Performance monitoring and management',
      'Marketing and sales support',
      'Client satisfaction tracking',
      'Regular reporting and analytics'
    ],
    faqs: [
      {
        question: 'How does the no-cost model work?',
        answer: 'We operate on a revenue-share model, taking a percentage of PT revenue instead of charging a base fee. This aligns our success with yours.'
      },
      {
        question: 'What happens to our existing trainers?',
        answer: 'We\'re happy to assess and potentially retain existing trainers who meet our quality standards and wish to stay.'
      },
      {
        question: 'How long does implementation take?',
        answer: 'Initial setup typically takes 4-6 weeks, with full optimization achieved within 3 months.'
      }
    ]
  },
  'pt-development': {
    id: 'pt-development',
    name: 'PT Development Program',
    hook: 'A comprehensive solution for gyms wanting to build and manage their own PT team.',
    price: 1499,
    rating: 4.8,
    usersCount: 120,
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1920',
    description: 'The perfect middle ground between full management and basic recruitment. We help you set up and train your PT team, providing three months of support to ensure success.',
    features: [
      {
        title: 'Initial Recruitment',
        description: 'Finding and hiring your core PT team',
        icon: Users
      },
      {
        title: 'Training Program',
        description: 'Comprehensive staff development system',
        icon: Calendar
      },
      {
        title: '3-Month Support',
        description: 'Ongoing guidance and troubleshooting',
        icon: Clock
      }
    ],
    process: [
      {
        title: 'Needs Analysis',
        description: 'Understanding your specific requirements'
      },
      {
        title: 'Team Recruitment',
        description: 'Finding and hiring qualified trainers'
      },
      {
        title: 'Systems Setup',
        description: 'Implementing management and tracking tools'
      },
      {
        title: 'Team Training',
        description: 'Comprehensive development program'
      },
      {
        title: 'Ongoing Support',
        description: '3 months of guidance and optimization'
      }
    ],
    includes: [
      'Initial recruitment of up to 5 trainers',
      'Management systems and procedures',
      'Staff training and development program',
      'Performance tracking tools',
      'Three months of dedicated support',
      'Marketing and sales materials'
    ],
    faqs: [
      {
        question: 'Can we expand the team after initial setup?',
        answer: 'Yes, we can help you recruit additional trainers as needed, though this may incur additional costs.'
      },
      {
        question: 'What happens after the 3-month support period?',
        answer: 'You can either continue with a maintenance support package or manage independently using our established systems.'
      },
      {
        question: 'Is this suitable for new gyms?',
        answer: 'Absolutely! This program is perfect for both new gyms and established facilities looking to improve their PT operations.'
      }
    ]
  }
};

export default function ProductDetail() {
  const { id } = useParams();
  const product = PRODUCTS[id as keyof typeof PRODUCTS];

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
    <div className="min-h-screen bg-background-main pt-20">
      {/* Hero Section */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/products"
            className="inline-flex items-center text-text-secondary hover:text-accent-primary mb-8 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Products
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="relative aspect-video overflow-hidden bg-background-card">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Info */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-accent-primary fill-current" />
                  <span className="ml-1 text-text-primary">{product.rating}</span>
                </div>
                <span className="text-text-secondary">
                  Trusted by {product.usersCount.toLocaleString()}+ Users
                </span>
              </div>

              <h1 className="text-4xl font-bold text-text-primary mb-4">
                {product.name}
              </h1>
              <p className="text-xl text-text-secondary mb-8">
                {product.hook}
              </p>

              <div className="mb-8">
                {product.price > 0 ? (
                  <div className="flex items-center gap-4">
                    <span className="text-4xl font-bold text-accent-primary">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <>
                        <span className="text-xl line-through text-text-secondary">
                          ${product.originalPrice}
                        </span>
                        <span className="bg-alt-coral px-3 py-1 text-text-primary text-sm font-medium">
                          Limited Time Offer
                        </span>
                      </>
                    )}
                  </div>
                ) : (
                  <span className="text-xl text-accent-primary font-medium">
                    Contact for Pricing
                  </span>
                )}
                <p className="text-text-secondary mt-2">
                  {product.price > 0 ? 'One-time payment • Lifetime access • 30-day guarantee' : 'Flexible payment options available'}
                </p>
              </div>

              <div className="flex gap-4">
                <button className="px-8 py-4 bg-accent-primary text-text-primary hover:bg-accent-hover transition-colors">
                  {product.price > 0 ? 'Get Instant Access' : 'Enquire Now'}
                </button>
                <button className="px-8 py-4 border-2 border-text-primary text-text-primary hover:bg-text-primary hover:text-background-main transition-colors">
                  {product.price > 0 ? 'Watch Demo' : 'Book a Call'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Inside Section */}
      <section className="py-16 bg-background-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text-primary mb-12">
            What's Inside
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {product.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-background-card p-6"
              >
                <feature.icon className="h-6 w-6 text-accent-primary flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-text-primary mb-2">{feature.title}</h3>
                  <p className="text-text-secondary">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      {product.courses && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-text-primary mb-12">
              Included Courses
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {product.courses.map((course, index) => (
                <div key={index} className="bg-background-card border border-ui-border p-6">
                  <h3 className="text-xl font-bold text-text-primary mb-2">
                    {course.name}
                  </h3>
                  <p className="text-text-secondary mb-4">
                    {course.lessons} video lessons
                  </p>
                  <ul className="space-y-2">
                    {course.includes.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-text-secondary">
                        <CheckCircle className="h-4 w-4 text-accent-primary flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process Section */}
      {product.process && (
        <section className="py-16 bg-background-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-text-primary mb-12">
              Our Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              {product.process.map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-background-card p-6 h-full">
                    <span className="text-5xl font-bold text-accent-primary/20 absolute top-4 right-4">
                      {index + 1}
                    </span>
                    <h3 className="text-xl font-bold text-text-primary mb-2">
                      {step.title}
                    </h3>
                    <p className="text-text-secondary relative z-10">
                      {step.description}
                    </p>
                  </div>
                  {index < product.process.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 right-0 w-full h-px bg-ui-border -mr-4 transform translate-x-1/2" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Service Details Section */}
      {product.description && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-text-primary mb-8">
                  Service Details
                </h2>
                <div className="prose prose-invert">
                  <p className="text-text-secondary mb-6">
                    {product.description}
                  </p>
                  <ul className="space-y-4">
                    {product.includes.map((item, index) => (
                      <li key={index} className="flex items-center gap-4">
                        <CheckCircle className="h-6 w-6 text-accent-primary flex-shrink-0" />
                        <span className="text-text-primary">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Enquiry Form */}
              <div className="bg-background-card p-8">
                <h3 className="text-2xl font-bold text-text-primary mb-6">
                  Request More Information
                </h3>
                <form className="space-y-6">
                  <div>
                    <label className="block text-text-secondary mb-2">Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-background-main border border-ui-border text-text-primary"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-text-secondary mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-background-main border border-ui-border text-text-primary"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-text-secondary mb-2">Phone</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 bg-background-main border border-ui-border text-text-primary"
                      placeholder="Your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-text-secondary mb-2">Message</label>
                    <textarea
                      className="w-full px-4 py-3 bg-background-main border border-ui-border text-text-primary h-32"
                      placeholder="Tell us about your needs..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-accent-primary text-text-primary hover:bg-accent-hover transition-colors"
                  >
                    Send Enquiry
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Who It's For Section */}
      {product.perfectFor && (
        <section className="py-16 bg-background-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-text-primary mb-8">
                  Perfect For
                </h2>
                <div className="space-y-6">
                  {product.perfectFor.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <CheckCircle className="h-6 w-6 text-accent-primary flex-shrink-0" />
                      <span className="text-text-primary">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-text-primary mb-8">
                  Not For
                </h2>
                <div className="space-y-6">
                  {product.notFor.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <XCircle className="h-6 w-6 text-alt-coral flex-shrink-0" />
                      <span className="text-text-secondary">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQs Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text-primary mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {product.faqs.map((faq, index) => (
              <div key={index} className="bg-background-card p-6">
                <h3 className="text-xl font-bold text-text-primary mb-4">
                  {faq.question}
                </h3>
                <p className="text-text-secondary">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Money Back Guarantee */}
      {product.price > 0 && (
        <section className="py-16 bg-background-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-text-primary mb-6">
                30-Day Money-Back Guarantee
              </h2>
              <p className="text-text-secondary mb-8">
                If you're not completely satisfied with your purchase, simply let us know within 30 days for a full refund. No questions asked.
              </p>
              <button className="px-8 py-4 bg-accent-primary text-text-primary hover:bg-accent-hover transition-colors">
                Get Started Risk-Free
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}