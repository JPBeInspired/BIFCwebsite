import { Helmet } from 'react-helmet-async';
import { motion, useAnimation } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';

export default function WebsiteCreation() {
  const [showStickyButton, setShowStickyButton] = useState(false);
  const [shakeButton, setShakeButton] = useState(false);
  const [shakeCount, setShakeCount] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const heroCTARef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const testimonialContainerRef = useRef<HTMLDivElement>(null);
  const ctaControls = useAnimation();

  // Track user interaction
  useEffect(() => {
    const handleInteraction = () => setHasInteracted(true);
    window.addEventListener('scroll', handleInteraction);
    window.addEventListener('click', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);
    
    return () => {
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  // Auto-bounce CTA if no interaction after 5 seconds
  useEffect(() => {
    if (!hasInteracted) {
      const timeoutId = setTimeout(() => {
        ctaControls.start({
          y: [0, -15, 0],
          transition: { duration: 1, repeat: 2, repeatType: "reverse" }
        });
      }, 5000);
      
      return () => clearTimeout(timeoutId);
    }
  }, [hasInteracted, ctaControls]);

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

  const scrollToCTA = () => {
    if (heroCTARef.current) {
      heroCTARef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Highlight the CTA with animation
      ctaControls.start({
        scale: [1, 1.1, 1],
        transition: { duration: 0.8 }
      });
    }
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  // Auto-scroll testimonials
  useEffect(() => {
    const scrollContainer = testimonialContainerRef.current;
    let autoScrollInterval: NodeJS.Timeout;

    const startAutoScroll = () => {
      if (scrollContainer) {
        autoScrollInterval = setInterval(() => {
          if (scrollContainer) {
            // Check if we're at the end, if so, return to start
            if (scrollContainer.scrollLeft + scrollContainer.offsetWidth >= scrollContainer.scrollWidth - 50) {
              scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
              scrollContainer.scrollBy({ left: 350, behavior: 'smooth' });
            }
          }
        }, 5000); // Scroll every 5 seconds
      }
    };

    // Start auto-scrolling
    startAutoScroll();

    // Pause auto-scroll on user interaction
    const pauseAutoScroll = () => {
      clearInterval(autoScrollInterval);
      // Restart after 10 seconds of inactivity
      setTimeout(startAutoScroll, 10000);
    };

    // Add event listeners for user interaction
    if (scrollContainer) {
      scrollContainer.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
      scrollContainer.addEventListener('mouseleave', startAutoScroll);
      scrollContainer.addEventListener('touchstart', pauseAutoScroll, { passive: true });
    }

    // Cleanup
    return () => {
      clearInterval(autoScrollInterval);
      if (scrollContainer) {
        scrollContainer.removeEventListener('mouseenter', () => clearInterval(autoScrollInterval));
        scrollContainer.removeEventListener('mouseleave', startAutoScroll);
        scrollContainer.removeEventListener('touchstart', pauseAutoScroll);
      }
    };
  }, []);

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
        <section ref={heroSectionRef} className="relative min-h-screen flex items-center">
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
                <motion.span 
                  className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-full text-sm font-semibold shadow-md"
                  animate={{ 
                    boxShadow: ['0px 4px 12px rgba(14, 165, 233, 0.3)', '0px 8px 24px rgba(14, 165, 233, 0.5)', '0px 4px 12px rgba(14, 165, 233, 0.3)']
                  }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                  whileHover={{ scale: 1.05 }}
                  role="button"
                  onClick={scrollToCTA}
                >
                  <span className="animate-pulse h-2 w-2 bg-white rounded-full"></span>
                  ✨ Limited-Time Offer — Secure Yours Today
                </motion.span>
                <h1 className="text-5xl md:text-7xl font-bold text-text-primary mb-6 leading-tight">
                  Transform Your PT Business with a Professional Online Presence – In Minutes
                </h1>
                <p className="text-xl text-text-secondary mb-8 max-w-2xl leading-relaxed">
                  Get a conversion-focused landing page that attracts clients – no tech skills required.
                </p>
                <div className="flex flex-col sm:flex-row gap-6">
                  <motion.div
                    ref={heroCTARef}
                    animate={ctaControls}
                    whileInView={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, repeatDelay: 1, duration: 2, ease: 'easeInOut' }}
                    viewport={{ once: false }}
                  >
                    <div className="flex items-center justify-center mb-2">
                      <span className="animate-pulse h-2 w-2 bg-teal-400 rounded-full mr-2"></span>
                      <span className="text-sm text-teal-300 uppercase font-medium tracking-wide">
                        Limited Offer Ends Soon ✨
                      </span>
                    </div>
                    <a 
                      href="https://buy.stripe.com/dR69BK9KA3cD8o0cMR"
                      className="hidden sm:inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-teal-400 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300 ease-in-out hover:ring-2 hover:ring-offset-2 hover:ring-teal-400"
                    >
                      Get Your Pro Landing Page – $99 (Normally $499)
                    </a>
                  </motion.div>
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

          <div 
            onClick={scrollToCTA}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-text-primary animate-bounce cursor-pointer hover:text-accent-primary transition-colors"
          >
            <ArrowDown className="h-8 w-8" />
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-20 bg-background-section">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16" 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-text-primary leading-tight">
                Here's Why Most PTs Stay Broke Online <br/><span className="text-red-500">(And What You Can Do About It)</span>
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                The harsh reality? Most personal trainers are losing thousands in potential income every month. Let's face the painful truths holding you back:
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {[
                { 
                  emoji: "😓", 
                  title: "Drowning in the Sea of Sameness", 
                  description: "You're competing with hundreds of trainers who all look identical online. Without a standout presence, potential clients scroll right past you—choosing someone who simply looks more professional."
                },
                { 
                  emoji: "🚫", 
                  title: "The 'Post and Pray' Trap", 
                  description: "You're spending hours creating content but seeing minimal results. Without a conversion-focused funnel, you're just shouting into the void while paying clients slip through your fingers."
                },
                { 
                  emoji: "⏰", 
                  title: "Time-Poor and Overwhelmed", 
                  description: "Between client sessions, admin work, and life, you have zero bandwidth to learn complex marketing. Every day without a proper online system costs you $200-500 in missed opportunities."
                },
                { 
                  emoji: "📉", 
                  title: "Inconsistent Income Cycle", 
                  description: "You're riding the feast-or-famine rollercoaster. One month you're fully booked, the next you're scrambling. Without a reliable lead system, you're stuck in perpetual financial anxiety."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="p-6 bg-background-card rounded-2xl border border-ui-border shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="text-4xl mb-4">{item.emoji}</div>
                  <h3 className="text-xl font-bold mb-3 text-text-primary">{item.title}</h3>
                  <p className="text-text-secondary">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16" 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-text-primary">
                Turn Your PT Skills Into Sales — <span className="text-blue-500">Without Funnels, Fancy Tools, or Wasted Hours</span>
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Stop struggling with complicated tech. Our simple system delivers the results of premium marketing without the premium price tag or headaches.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-10">
              {[
                { 
                  emoji: "🚀", 
                  title: "Look Like a 6-Figure Business", 
                  description: "Even if you're just starting out, you'll instantly appear more professional than 90% of your competition. Clients choose trainers who look trustworthy online."
                },
                { 
                  emoji: "⏱️", 
                  title: "From Zero to Booked in 48hrs", 
                  description: "No waiting months for results. Your page goes live fast, starts collecting leads immediately, and channels them directly to your inbox."
                },
                { 
                  emoji: "💰", 
                  title: "Convert Browsers to Buyers", 
                  description: "Our landing pages are built with proven psychology triggers that turn curious visitors into paying clients. Each element is conversion-optimized."
                },
                { 
                  emoji: "📱", 
                  title: "Zero Tech Skills Required", 
                  description: "We handle everything. You fill out one simple form, and we build, launch, and optimize your entire online presence. No learning curves."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    background: "linear-gradient(to bottom right, var(--background-card), var(--background-card) 80%, rgba(59, 130, 246, 0.1))"
                  }}
                  className="p-8 bg-background-card rounded-2xl border border-ui-border shadow-md hover:border-blue-300 transition-all duration-300"
                >
                  <div className="text-4xl mb-5">{item.emoji}</div>
                  <h3 className="text-xl font-bold mb-3 text-text-primary">{item.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{item.description}</p>
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
                <motion.div 
                  key={index} 
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  <span className="text-green-400 text-2xl">✅</span>
                  <div>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="text-text-secondary">{item.extra ? `${item.extra} (Value: ${item.value})` : `(Value: ${item.value})`}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 animate-fadeInUp delay-700">
              <p className="text-2xl font-bold mb-4">
                Total Value: <span className="line-through text-text-secondary">$499</span> → Get It Today for <span className="text-green-400">$99</span>
              </p>
              <motion.div
                whileInView={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, repeatDelay: 1, duration: 2, ease: 'easeInOut' }}
                viewport={{ once: false }}
              >
                <div className="flex items-center justify-center mb-2">
                  <span className="animate-pulse h-2 w-2 bg-teal-400 rounded-full mr-2"></span>
                  <span className="text-sm text-teal-300 uppercase font-medium tracking-wide">
                    Limited Offer Ends Soon ✨
                  </span>
                </div>
                <a 
                  href="https://buy.stripe.com/dR69BK9KA3cD8o0cMR" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hidden sm:inline-block px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-500 to-teal-400 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300 ease-in-out hover:ring-2 hover:ring-offset-2 hover:ring-teal-400"
                >
                  Secure My Page for $99
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-12" 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-text-primary">
                How It Works — <span className="text-blue-500">Simple. Fast. Yours to Grow</span>
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                We build your online presence. You control the traffic.
              </p>
            </motion.div>

            <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto mb-12">
              {[
                { 
                  emoji: "📝", 
                  title: "Complete a 5-minute form", 
                  description: "Tell us about your business needs and target audience so we can customize your page."
                },
                { 
                  emoji: "🛠️", 
                  title: "We build your pro landing page", 
                  description: "Fully designed, mobile-friendly, and hosted with your own unique URL."
                },
                { 
                  emoji: "📤", 
                  title: "Share with your audience", 
                  description: "Connect to social media or existing marketing channels and start collecting inquiries."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex-1 p-6 flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: index * 0.2, ease: "easeOut" }}
                >
                  <div className="text-4xl mb-5">{item.emoji}</div>
                  <h3 className="text-xl font-bold mb-3 text-text-primary">{item.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{item.description}</p>
                  {index < 2 && (
                    <div className="hidden md:block mt-8 text-2xl text-blue-400">→</div>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div
              className="text-center px-6 py-4 bg-blue-50 rounded-xl max-w-3xl mx-auto border border-blue-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <p className="text-blue-800 font-medium">
                <span className="font-bold">What Happens Next:</span> After submitting your form, you'll receive your completed page within 72 hours — ready to launch and share.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-background-section text-text-primary">
          <div className="container mx-auto px-4 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-primary">
                What Trainers Are Saying About Their New Landing Page
              </h2>
              <p className="text-lg md:text-xl mb-12 text-secondary max-w-3xl mx-auto">
                Real feedback from coaches who used our service to launch their online presence — fast.
              </p>

              {/* Testimonial Carousel */}
              <div className="relative max-w-7xl mx-auto">
                {/* Left Arrow */}
                <motion.button 
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:translate-x-0 z-10 bg-card/80 rounded-full p-2 shadow-md hover:bg-card transition-all hidden md:block"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (testimonialContainerRef.current) {
                      testimonialContainerRef.current.scrollBy({ left: -350, behavior: 'smooth' });
                    }
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>

                {/* Scrollable Testimonial Container */}
                <div 
                  id="testimonialContainer"
                  ref={testimonialContainerRef}
                  className="flex overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide gap-6"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {[
                    {
                      name: "Alex M.",
                      gym: "Coastal Fit",
                      quote: "I had zero idea how to build a landing page. They built mine in 3 days and I booked 4 clients the same week.",
                      result: "4 clients in week 1"
                    },
                    {
                      name: "Jamie T.",
                      gym: "StrongHer Coaching",
                      quote: "This saved me hours. I finally have something that looks pro and gets attention online.",
                      result: "Built in 72 hours"
                    },
                    {
                      name: "Marco R.",
                      gym: "Elevate Training",
                      quote: "Clients are saying my new page looks amazing. It's converting better than my old site.",
                      result: "Double conversion rate"
                    },
                    {
                      name: "Sarah K.",
                      gym: "Peak Performance",
                      quote: "The process was so easy. Filled out the form and boom—professional page ready to go that actually converts!",
                      result: "6 new clients"
                    },
                    {
                      name: "David L.",
                      gym: "FitLife Training",
                      quote: "Before this, I was struggling to get clients online. Now I have a waitlist for the first time ever.",
                      result: "Waitlist created"
                    },
                    {
                      name: "Olivia P.",
                      gym: "CoreStrong Fitness",
                      quote: "Worth every penny. I look as professional as trainers charging twice what I do.",
                      result: "Raised rates by 20%"
                    },
                    {
                      name: "Jason M.",
                      gym: "Elite Athletics",
                      quote: "My page stands out from all the other trainers in my area now. It actually brings people in.",
                      result: "Local market leader"
                    },
                    {
                      name: "Emma R.",
                      gym: "FitWithEmma",
                      quote: "I was skeptical at $99, but this has already paid for itself 10x over. Wish I'd done it sooner!",
                      result: "10x ROI in first month"
                    },
                    {
                      name: "Mike T.",
                      gym: "Strength Solutions",
                      quote: "Overnight, my online presence went from amateur to pro. The inquiries started coming in immediately.",
                      result: "5 inquiries in 24 hours"
                    },
                    {
                      name: "Tanya W.",
                      gym: "Sculpt Studio",
                      quote: "Finally have a page that shows what I'm actually capable of. Clients can see my value before we even talk.",
                      result: "Higher quality leads"
                    },
                    {
                      name: "Chris B.",
                      gym: "PowerMoves PT",
                      quote: "The form was simple, their team was responsive, and my page was ready faster than promised.",
                      result: "Delivered in 48 hours"
                    },
                    {
                      name: "Leila J.",
                      gym: "Transform Fitness",
                      quote: "As someone who hates tech, this was the easiest way to finally get my business online professionally.",
                      result: "Zero tech headaches"
                    },
                    {
                      name: "Ryan D.",
                      gym: "Results-Driven Fitness",
                      quote: "My Instagram followers actually convert to paying clients now that I have somewhere professional to send them.",
                      result: "Social media conversion"
                    }
                  ].map((testimonial, index) => (
                    <motion.div
                      key={index}
                      className="min-w-[300px] md:min-w-[350px] bg-card rounded-xl shadow-md hover:shadow-lg p-6 flex flex-col snap-center"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <div className="flex text-alt-amber mb-3">
                        ★★★★★
                      </div>
                      <p className="text-primary text-left text-lg italic mb-4 flex-grow">"{testimonial.quote}"</p>
                      <div className="flex items-center mt-2">
                        <div className="w-10 h-10 rounded-full bg-accent-primary flex items-center justify-center text-primary font-bold">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div className="ml-3 text-left">
                          <p className="font-semibold text-primary">{testimonial.name} <span className="font-normal text-secondary"> • {testimonial.gym}</span></p>
                          <p className="text-sm font-medium text-accent-highlight">{testimonial.result}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Right Arrow */}
                <motion.button 
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-0 z-10 bg-card/80 rounded-full p-2 shadow-md hover:bg-card transition-all hidden md:block"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (testimonialContainerRef.current) {
                      testimonialContainerRef.current.scrollBy({ left: 350, behavior: 'smooth' });
                    }
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>

                {/* Scroll Indicator */}
                <div className="flex justify-center mt-4 space-x-1">
                  <span className="text-sm text-secondary">Swipe to see more</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-24 md:py-32 bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div 
              className="max-w-2xl mx-auto" 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-5 leading-tight">
                Still Scrolling? Your Competitors Are Already Collecting Leads
              </h2>
              
              <p className="text-xl md:text-2xl mb-8 text-blue-50 leading-relaxed">
                We'll build your pro landing page for just $99 — fully done-for-you, live in 72 hours. No tech. No stress.
              </p>
              
              <motion.div
                className="mb-10 inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full py-3 px-6"
                animate={{ 
                  boxShadow: ['0px 0px 0px rgba(255, 255, 255, 0)', '0px 0px 15px rgba(255, 255, 255, 0.3)', '0px 0px 0px rgba(255, 255, 255, 0)']
                }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              >
                <p className="font-medium text-sm md:text-base">
                  ⏳ Only 3 spots left at this price • 🔒 100+ PTs have already launched with us
                </p>
              </motion.div>
              
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ 
                  repeat: Infinity, 
                  repeatDelay: 15, 
                  duration: 0.8, 
                  ease: "easeInOut" 
                }}
                className="mb-8 max-w-xl mx-auto"
                whileHover={{ scale: 1 }}
              >
                <a 
                  href="https://buy.stripe.com/dR69BK9KA3cD8o0cMR"
                  className="block w-full sm:w-auto sm:inline-block px-10 py-5 bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 text-xl font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300 ease-in-out hover:ring-4 hover:ring-white/30"
                >
                  ⚡ Lock In My $99 Landing Page
                </a>
              </motion.div>
              
              <div className="space-y-4 text-blue-50 max-w-lg mx-auto">
                <p className="text-sm">
                  After payment, you'll get a form to complete your order. Your page goes live in 72 hours.
                </p>
                
                <div className="flex items-center justify-center space-x-1 text-sm">
                  <span>⭐⭐⭐⭐⭐</span>
                  <span className="font-medium">4.9/5 based on 100+ trainer reviews</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mobile Sticky CTA Button */}
        {showStickyButton && (
          <div className={`fixed bottom-4 left-0 right-0 px-4 sm:hidden z-50 animate-fadeInUpSmall ${shakeButton ? 'animate-shakeSmall' : ''}`}>
            <motion.div
              animate={{ 
                boxShadow: ['0px 4px 8px rgba(0, 0, 0, 0.1)', '0px 8px 24px rgba(59, 130, 246, 0.4)', '0px 4px 8px rgba(0, 0, 0, 0.1)']
              }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            >
              <div className="flex items-center justify-center bg-white/20 backdrop-blur-sm py-1 rounded-t-lg mb-1">
                <span className="animate-ping h-2 w-2 bg-red-500 rounded-full mr-2 opacity-75"></span>
                <span className="text-xs text-white uppercase font-bold tracking-wider">
                  Limited Time Offer ✨
                </span>
              </div>
              <a
                href="https://buy.stripe.com/dR69BK9KA3cD8o0cMR"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300 ease-in-out hover:ring-2 hover:ring-teal-400"
              >
                Secure My Page for $99
              </a>
            </motion.div>
          </div>
        )}
        
      </div>
    </>
  );
}