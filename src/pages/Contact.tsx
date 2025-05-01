import { useState } from 'react';
import { ArrowRight, Users, Briefcase, MessageSquare, Dumbbell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { submitContactForm } from '../lib/contact';
import toast from 'react-hot-toast';

const CONTACT_TYPES = [
  {
    id: 'trainer',
    label: 'Personal Trainer',
    icon: Users
  },
  {
    id: 'gym-owner',
    label: 'Gym Owner',
    icon: Briefcase
  },
  {
    id: 'general',
    label: 'General Public',
    icon: MessageSquare
  }
];

const HELP_OPTIONS = {
  trainer: [
    { value: 'product', label: 'Product Question' },
    { value: 'coaching', label: 'Coaching or Services' },
    { value: 'career', label: 'Career Opportunities' },
    { value: 'support', label: 'Support' },
    { value: 'other', label: 'Something Else' }
  ],
  'gym-owner': [
    { value: 'recruitment', label: 'PT Recruitment' },
    { value: 'management', label: 'PT Management' },
    { value: 'partnership', label: 'Business Partnership' },
    { value: 'support', label: 'Support' },
    { value: 'other', label: 'Something Else' }
  ],
  general: [
    { value: 'product', label: 'Product Question' },
    { value: 'training', label: 'Personal Training' },
    { value: 'feedback', label: 'Feedback' },
    { value: 'other', label: 'Something Else' }
  ]
};

const QUICK_LINKS = [
  {
    title: 'Interested in Coaching?',
    description: 'Explore our coaching services and programs',
    icon: Users,
    link: '/products',
    color: 'text-accent-primary'
  },
  {
    title: 'Interested in PT Management or recruitment',
    description: 'See what we offer',
    icon: Briefcase,
    link: '/products',
    color: 'text-alt-purple'
  },
  {
    title: 'Ready to get fit?',
    description: 'Find out more',
    icon: Dumbbell,
    link: '/products',
    color: 'text-alt-purple'
  }
];

export default function Contact() {
  const [contactType, setContactType] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    helpType: '',
    message: '',
    businessName: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await submitContactForm({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        source: `${contactType}${formData.helpType ? ` - ${formData.helpType}` : ''}`,
        business_name: formData.businessName
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        helpType: '',
        message: '',
        businessName: ''
      });
      setContactType('');

      toast.success('Message sent successfully! We\'ll be in touch soon.');
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-main pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0">
          <div className="relative h-full">
            <img
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=1920"
              alt="Team discussion"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background-main/95 via-background-main/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-background-main via-background-main/50 to-transparent" />
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold text-text-primary mb-6 leading-tight">
              Have a Question? Let's Talk.
            </h1>
            <p className="text-xl text-text-secondary mb-8 max-w-2xl leading-relaxed">
              Whether you're a coach, gym owner, or just starting your journey — we're here for you.
              From product questions to partnership opportunities, we'll get back to you within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="enquiry-form" className="py-16 bg-background-section scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Who are you? */}
                <div>
                  <label className="block text-text-secondary mb-4">Who are you?</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {CONTACT_TYPES.map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setContactType(type.id)}
                        className={`p-4 flex flex-col items-center justify-center border transition-colors ${
                          contactType === type.id
                            ? 'border-accent-primary bg-background-card'
                            : 'border-ui-border hover:border-accent-primary'
                        }`}
                      >
                        <type.icon className={`h-6 w-6 mb-2 ${
                          contactType === type.id ? 'text-accent-primary' : 'text-text-secondary'
                        }`} />
                        <span className="text-text-primary text-sm">{type.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* How can we help? */}
                {contactType && (
                  <div>
                    <label htmlFor="helpType" className="block text-text-secondary mb-2">
                      How can we help?
                    </label>
                    <select
                      id="helpType"
                      value={formData.helpType}
                      onChange={(e) => setFormData({ ...formData, helpType: e.target.value })}
                      className="w-full p-4 bg-background-card border border-ui-border text-text-primary focus:border-accent-primary transition-colors"
                      required
                    >
                      <option value="">Select an option</option>
                      {HELP_OPTIONS[contactType as keyof typeof HELP_OPTIONS].map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Contact Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1">
                    <label htmlFor="name" className="block text-text-secondary mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-4 bg-background-card border border-ui-border text-text-primary focus:border-accent-primary transition-colors"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="md:col-span-1">
                    <label htmlFor="email" className="block text-text-secondary mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-4 bg-background-card border border-ui-border text-text-primary focus:border-accent-primary transition-colors"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div className="md:col-span-1">
                    <label htmlFor="phone" className="block text-text-secondary mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-4 bg-background-card border border-ui-border text-text-primary focus:border-accent-primary transition-colors"
                      placeholder="Your phone number"
                      required
                    />
                  </div>
                </div>

                {/* Conditional Fields */}
                {formData.helpType === 'partnership' && (
                  <div>
                    <label htmlFor="businessName" className="block text-text-secondary mb-2">
                      Business Name
                    </label>
                    <input
                      type="text"
                      id="businessName"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full p-4 bg-background-card border border-ui-border text-text-primary focus:border-accent-primary transition-colors"
                      placeholder="Your business name"
                    />
                  </div>
                )}

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-text-secondary mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-4 bg-background-card border border-ui-border text-text-primary focus:border-accent-primary transition-colors h-32"
                    placeholder="How can we help you?"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-accent-primary text-text-primary hover:bg-accent-hover transition-colors flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : (
                    <>
                      Send Message
                      <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Quick Links */}
            <div className="space-y-12">
              <div className="grid grid-cols-1 gap-6">
                {QUICK_LINKS.map((link, index) => (
                  <Link
                    key={index}
                    to={link.link}
                    className="p-6 bg-background-card border border-ui-border hover:border-accent-primary transition-colors group"
                  >
                    <div className="flex items-start gap-4">
                      <link.icon className={`h-8 w-8 ${link.color}`} />
                      <div>
                        <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-accent-primary transition-colors">
                          {link.title}
                        </h3>
                        <p className="text-text-secondary">
                          {link.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Response Time */}
              <div className="bg-accent-primary/10 p-6 border border-accent-primary">
                <h3 className="text-lg font-bold text-accent-primary mb-2">
                  Fast Response Guaranteed
                </h3>
                <p className="text-text-secondary">
                  We reply to all messages within 24-48 hours during business days.
                  You're talking to real people who understand fitness and business.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}