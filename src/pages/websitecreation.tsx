import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';

export default function WebsiteCreation() {
  const [showStickyButton, setShowStickyButton] = useState(false);
  const [shakeButton, setShakeButton] = useState(false);
  const [shakeCount, setShakeCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowStickyButton(true);
      } else {
        setShowStickyButton(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (showStickyButton && shakeCount < 3) {
      interval = setInterval(() => {
        setShakeButton(true);
        setTimeout(() => setShakeButton(false), 1000);
        setShakeCount((prev) => prev + 1);
      }, 20000);
    }
    return () => clearInterval(interval);
  }, [showStickyButton, shakeCount]);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <>
      <Helmet>
        <title>Professional Landing Pages for Personal Trainers - Only $99</title>
        <meta 
          name="description" 
          content="Grow your PT business online with a high-converting, done-for-you landing page. Limited-time offer – $99 for a comprehensive business bundle. Get started today!"
        />
      </Helmet>

      <div className="min-h-screen bg-background-main">

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center">
          <div className="absolute inset-0">
            <div className="relative h-full">
              <img
                src="https://i.imgur.com/YatocAG.jpeg"
                alt="Hero Background"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background-main/95 via-background-main/80 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-background-main via-background-main/50 to-transparent" />
            </div>
          </div>

          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div className="pt-20 lg:pt-0" {...fadeIn}>
                <span className="inline-block px-4 py-2 mb-6 bg-accent-hover text-text-primary rounded-full text-sm font-semibold">
                  Limited-Time Offer — Secure Yours Today
                </span>
                <h1 className="text-5xl md:text-7xl font-bold text-text-primary mb-6 leading-tight">
                  Transform Your PT Business with a Professional Online Presence – In Minutes
                </h1>
                <p className="text-xl text-text-secondary mb-8 max-w-2xl leading-relaxed">
                  Get a conversion-focused landing page that attracts clients – no tech skills required.
                </p>
                <div className="flex flex-col sm:flex-row gap-6">
                  <a 
                    href="https://buy.stripe.com/dR69BK9KA3cD8o0cMR"
                    className="hidden sm:inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-text-primary bg-accent-primary hover:bg-accent-hover transition-colors duration-300 rounded-none group"
                  >
                    Get Your Pro Landing Page – $99 (Normally $499)
                  </a>
                </div>
              </motion.div>

              <motion.div
                className="w-full md:w-1/2 flex justify-center items-center"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="relative w-full max-w-md h-[600px] overflow-hidden rounded-lg shadow-2xl border border-ui-border bg-background-card">
                  <img 
                    src="https://i.imgur.com/NtRdOYH.png"
                    alt="Website Landing Page Preview"
                    className="absolute top-0 left-0 w-full animate-scrollImage"
                  />
                </div>
              </motion.div>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-text-primary animate-bounce">
            <ArrowDown className="h-8 w-8" />
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-20 bg-background-section">
          <div className="container mx-auto px-4">
            <motion.div className="text-center mb-16" {...fadeIn}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-text-primary">
                Why Most Personal Trainers Struggle to Get Clients Online
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                In today's digital world, standing out online is crucial. But most trainers face common obstacles that hold them back from reaching their full potential.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: 'Limited Online Presence', description: 'Difficulty standing out in a crowded digital space' },
                { title: 'No Marketing Expertise', description: 'Lack of knowledge in digital marketing strategies' },
                { title: 'Lack of Professional Materials', description: 'Missing high-quality content and templates' },
                { title: 'Time Constraints', description: 'Too busy training clients to focus on online growth' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="p-6 bg-background-card rounded-lg border border-ui-border shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <h3 className="text-xl font-semibold mb-4 text-text-primary">{item.title}</h3>
                  <p className="text-text-secondary">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div className="text-center mb-16" {...fadeIn}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-text-primary">
                An Easy, Affordable Way to Boost Your Business
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: 'Professional Landing Page', description: 'Converts visitors into leads effectively' },
                { title: 'Built-in Scarcity', description: 'Urgency elements that drive action' },
                { title: 'No Tech Setup', description: 'Fully handled for you by our team' },
                { title: 'Bonus Templates', description: 'White-labeled social media content' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="p-6 bg-background-card rounded-lg border border-ui-border shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <h3 className="text-xl font-semibold mb-4 text-text-primary">{item.title}</h3>
                  <p className="text-text-secondary">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* What's Included Section */}
        <section className="py-16 px-6 sm:px-12 bg-background-section text-text-primary text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-8 leading-tight animate-fadeInUp">
              What's Included for Only $99
            </h2>
            <p className="text-lg text-text-secondary mb-10 animate-fadeInUp delay-100">
              Everything you need to launch or upgrade your personal training business — without spending thousands or wasting months on trial and error. We've bundled the highest-value tools and resources into one powerful $99 package, designed to help you get clients faster, build your brand, and stand out online.
            </p>

            <div className="text-left max-w-2xl mx-auto space-y-6">
              {[
                { title: 'Professional Landing Page', value: '$199', extra: '' },
                { title: 'Social Media Content Templates (+1500 ready to go templates)', value: '$151', extra: '' },
                { title: 'Direct Inquiry Routing System', value: '$149', extra: '' },
              ].map((item, index) => (
                <div key={index} className={`flex items-start space-x-4 animate-fadeInUp delay-${(index + 2) * 100}`}>
                  <span className="text-green-400 text-2xl">✅</span>
                  <div>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="text-text-secondary">{item.extra ? `${item.extra} (Value: ${item.value})` : `(Value: ${item.value})`}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 animate-fadeInUp delay-700">
              <p className="text-2xl font-bold mb-4">
                Total Value: <span className="line-through text-text-secondary">$499</span> → Get It Today for <span className="text-green-400">$99</span>
              </p>
              <a 
                href="https://buy.stripe.com/dR69BK9KA3cD8o0cMR" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hidden sm:inline-block px-8 py-4 text-lg font-bold text-white bg-green-500 hover:bg-green-600 rounded-full transition"
              >
                Secure My Page for $99
              </a>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div className="text-center mb-16" {...fadeIn}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-text-primary">
                Getting Your Page is Simple
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { step: '1', title: 'Complete a 5-minute form', description: 'Tell us about your business' },
                { step: '2', title: 'We build your pro landing page', description: 'Our team handles everything' },
                { step: '3', title: 'Start receiving client inquiries', description: 'Direct to your inbox' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className="w-12 h-12 bg-accent-primary rounded-full flex items-center justify-center text-text-primary text-xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-text-primary">{item.title}</h3>
                  <p className="text-text-secondary">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-background-section text-text-primary">
          <div className="container mx-auto px-4 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Hear From Our Trainers
              </h2>
              <p className="text-lg mb-12 text-text-secondary">
                Real results from trainers who trusted us to grow their business online.
              </p>

              {/* Two Vimeo Testimonials Side by Side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {/* First Testimonial */}
                <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-2xl shadow-2xl">
                  <iframe
                    src="https://player.vimeo.com/video/1079668784?autoplay=0&muted=1&autopause=0&playsinline=1"
                    className="absolute top-0 left-0 w-full h-full rounded-2xl"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                    allowFullScreen
                    title="Honestly getting my landing page done was a game changer"
                  ></iframe>
                </div>
                
                {/* Second Testimonial */}
                <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-2xl shadow-2xl">
                  <iframe
                    src="https://player.vimeo.com/video/1079673295?autoplay=0&muted=1&autopause=0&playsinline=1"
                    className="absolute top-0 left-0 w-full h-full rounded-2xl"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                    allowFullScreen
                    title="I didn't know anything about websites but this made"
                  ></iframe>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-accent-primary text-text-primary">
          <div className="container mx-auto px-4 text-center">
            <motion.div className="max-w-3xl mx-auto" {...fadeIn}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Grow Your PT Business?
              </h2>
              <p className="text-xl mb-8">
                Don't miss out – get your professional landing page for just $99 while this limited-time pricing lasts.
              </p>
              <a 
                href="https://buy.stripe.com/dR69BK9KA3cD8o0cMR"
                className="inline-block px-8 py-4 bg-text-primary text-background-main rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
              >
                Get My Landing Page Today
              </a>
              <div className="mt-4">
                <a 
                  href="/websitecreation/payment-confirmation"
                  className="inline-block text-accent-primary underline"
                >
                  Test Payment Confirmation Page
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mobile Sticky CTA Button */}
        {showStickyButton && (
          <div className={`fixed bottom-4 left-0 right-0 px-4 sm:hidden z-50 animate-fadeInUpSmall ${shakeButton ? 'animate-shakeSmall' : ''}`}>
            <a
              href="https://buy.stripe.com/dR69BK9KA3cD8o0cMR"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-full shadow-lg transition"
            >
              Secure My Page for $99
            </a>
          </div>
        )}
        
      </div>
    </>
  );
}