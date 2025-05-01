import { ArrowLeft, Star, Users, CheckCircle, XCircle, Phone, Calendar, Clock, Building2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';

// Mock data - replace with actual data fetching
const SERVICES = {
'pt-recruitment': {
    id: 'pt-recruitment',
    name: 'PT Recruitment Service',
    hook: 'Get 5+ qualified personal trainer candidates within 30 days, fully screened and ready to start.',
    price: 449.99,
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
        title: 'Filtering',
        description: 'We filter out any candidates that may not be suitable for you',
        icon: CheckCircle
      },
      {
        title: 'Speed to market',
        description: 'We help you find the right candidates quicker thanks to our database',
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
        title: 'Verification',
        description: 'thorough background checks and qualification verification'
      },
      {
        title: 'Screening',
        description: 'We will determine if this candidate meets your criteria'
      },
      {
        title: 'Hand over',
        description: 'You interview the best candidates and make your choice'
      }
    ],
    includes: [
      'Tailored consultation to understand your club’s needs and culture',
      'Active headhunting from our national trainer network',
      'Initial candidate screening',
      'Shortlisted candidates delivered directly to your inbox',
      'Stress-free recruitment'
    ],
    faqs: [
      {
        question: 'What if I need candidates faster than 30 days?',
        answer: 'While we aim to provide candidates within 30 days, we can expedite the process for urgent needs. Contact us to discuss rush options.'
      },
      {
        question: 'What happens if a candidate doesn\'t work out?',
        answer: 'You have 30 days from the time of purchasing this service to continually receive leads'
      },
      {
        question: 'Do you handle international recruitment?',
        answer: 'Not at the moment, we are only handling Australian based recruitment.'
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

export default function ServiceDetail() {
  const { id } = useParams();
  const service = SERVICES[id as keyof typeof SERVICES];
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);

  if (!service) {
    return (
      <div className="min-h-screen bg-background-main pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-3xl font-bold text-text-primary">Service not found</h1>
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
            {/* Service Image */}
            <div className="relative aspect-video overflow-hidden bg-background-card">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Service Info */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-accent-primary fill-current" />
                  <span className="ml-1 text-text-primary">{service.rating}</span>
                </div>
                <span className="text-text-secondary">
                  Trusted by {service.usersCount}+ Facilities
                </span>
              </div>

              <h1 className="text-4xl font-bold text-text-primary mb-4">
                {service.name}
              </h1>
              <p className="text-xl text-text-secondary mb-8">
                {service.hook}
              </p>

              <div className="mb-8">
                {service.price > 0 ? (
                  <div className="flex items-center gap-4">
                    <span className="text-4xl font-bold text-accent-primary">
                      ${service.price}
                    </span>
                  </div>
                ) : (
                  <span className="text-xl text-accent-primary font-medium">
                    Contact for Pricing
                  </span>
                )}
                <p className="text-text-secondary mt-2">
                  Flexible payment options available
                </p>
              </div>

<div className="flex gap-4">
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-accent-primary text-text-primary hover:bg-accent-hover transition-colors"
                >
                  Enquire Now
                </Link>
                <a 
                  href="https://buy.stripe.com/dR66pye0Q8wX0VycMQ"
                  className="px-8 py-4 border-2 border-text-primary text-text-primary hover:bg-text-primary hover:text-background-main transition-colors inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get started
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-16 bg-background-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text-primary mb-12">
            What's Included
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {service.features.map((feature, index) => (
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

      {/* Process Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text-primary mb-12">
            Our Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {service.process.map((step, index) => (
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
                {index < service.process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 right-0 w-full h-px bg-ui-border -mr-4 transform translate-x-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Details Section */}
           <section className="py-16 bg-background-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-text-primary mb-8">
                Service Details
              </h2>
              <div className="prose prose-invert">
                <p className="text-text-secondary mb-6">
                  {service.description}
                </p>
                <ul className="space-y-4">
                  {service.includes.map((item, index) => (
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
              <p className="text-text-secondary mb-8">
                Interested in learning more about our {service.name}? Visit our contact page to get in touch with our team and receive personalized assistance.
              </p>
              <Link
                to="/contact"
                className="w-full inline-flex items-center justify-center px-8 py-4 bg-accent-primary text-text-primary hover:bg-accent-hover transition-colors group"
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text-primary mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {service.faqs.map((faq, index) => (
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

{/* CTA Section */}
      <section className="py-16 bg-background-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-text-primary mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
              Take the first step towards optimizing your PT operations. Our team is ready to help you achieve your goals.
            </p>
            <div className="flex justify-center gap-4">
<Link
                  to="/contact"
                  className="px-8 py-4 bg-accent-primary text-text-primary hover:bg-accent-hover transition-colors"
                >
                  Enquire Now
                </Link>
              <a 
                href="https://buy.stripe.com/dR66pye0Q8wX0VycMQ"
                className="px-8 py-4 border-2 border-text-primary text-text-primary hover:bg-text-primary hover:text-background-main transition-colors inline-block"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get started
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}