import { Helmet } from 'react-helmet-async';
import { motion, useAnimation } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { ArrowDown, CheckCircle, ArrowRight, Package, Dumbbell, Palette, FileText, Target } from 'lucide-react';

export default function PTStarterPack() {
  const [showStickyButton, setShowStickyButton] = useState(false);
  const [shakeButton, setShakeButton] = useState(false);
  const [shakeCount, setShakeCount] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const heroCTARef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
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

  return (
    <>
      <Helmet>
        <title>Personal Trainer Starter Pack - The Ultimate PT Business Templates</title>
        <meta 
          name="description" 
          content="Launch your PT business with confidence using 20+ professionally designed, editable Canva templates. The ultimate toolkit for new and experienced Personal Trainers."
        />
      </Helmet>

      <div className="min-h-screen bg-background-main">

        {/* Hero Section */}
        <section ref={heroSectionRef} className="relative min-h-screen flex items-center">
          <div className="absolute inset-0">
            <div className="relative h-full">
              <img
                src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1920"
                alt="Personal Trainer with Client"
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
                  ✨ 20+ Pro Templates for Personal Trainers
                </motion.span>
                <h1 className="text-5xl md:text-7xl font-bold text-text-primary mb-6 leading-tight">
                  The Ultimate Starter Pack for Personal Trainers
                </h1>
                <p className="text-xl text-text-secondary mb-8 max-w-2xl leading-relaxed">
                  Launch your PT business with confidence and professionalism using 20+ ready-to-use Canva templates.
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
                        One-time payment • No Canva Pro required • Instant use
                      </span>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      className="mb-6"
                    >
                      <a
                        href="https://buy.stripe.com/6oE7tCe0Q6oPaw84gm"
                        className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-teal-400 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300 ease-in-out hover:ring-2 hover:ring-offset-2 hover:ring-teal-400"
                      >
                        Download the Starter Pack – $39.99
                      </a>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                className="w-full md:w-1/2 flex justify-center items-center"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="relative w-full max-w-md">
                  {/* Trusted by badge */}
                  <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="absolute -top-14 right-0 z-30 bg-gradient-to-r from-amber-400/90 to-amber-500/90 text-gray-900 px-4 py-2 rounded-full shadow-lg backdrop-blur-sm"
                  >
                    <div className="flex items-center">
                      <span className="text-sm font-semibold">Trusted by 100+ Trainers</span>
                      <div className="ml-2 flex">
                        <span className="text-xs">⭐⭐⭐⭐⭐</span>
                      </div>
                    </div>
                  </motion.div>
                
                  {/* Collage of images */}
                  <div className="relative h-[450px] sm:h-[500px] w-full">
                    {/* Image 1 */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="absolute top-0 left-0 z-20 w-4/5 transform rotate-[-3deg] hover:rotate-[-1deg] transition-all duration-300"
                    >
                      <img 
                        src="https://i.imgur.com/nOXf3RT.png" 
                        alt="PT Starter Pack Template" 
                        className="w-full h-auto rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      />
                    </motion.div>
                    
                    {/* Image 2 */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      className="absolute top-16 -right-5 z-10 w-3/5 transform rotate-[5deg] hover:rotate-[3deg] transition-all duration-300"
                    >
                      <img 
                        src="https://i.imgur.com/NGamAGW.png" 
                        alt="PT Starter Pack Template" 
                        className="w-full h-auto rounded-xl shadow-lg hover:shadow-xl transition-all duration-300" 
                      />
                    </motion.div>
                    
                    {/* Image 3 */}
                    <motion.div
                      initial={{ opacity: 0, y: 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      className="absolute top-32 left-10 z-30 w-3/5 transform rotate-[2deg] hover:rotate-[0deg] transition-all duration-300"
                    >
                      <img 
                        src="https://i.imgur.com/hMYbAmi.png" 
                        alt="PT Starter Pack Template" 
                        className="w-full h-auto rounded-xl shadow-lg hover:shadow-xl transition-all duration-300" 
                      />
                    </motion.div>
                    
                    {/* Image 4 */}
                    <motion.div
                      initial={{ opacity: 0, y: 35 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                      className="absolute top-48 -right-2 z-20 w-1/2 transform rotate-[-3deg] hover:rotate-[-1deg] transition-all duration-300"
                    >
                      <img 
                        src="https://i.imgur.com/kWcHlcx.png" 
                        alt="PT Starter Pack Template" 
                        className="w-full h-auto rounded-xl shadow-lg hover:shadow-xl transition-all duration-300" 
                      />
                    </motion.div>
                    
                    {/* Image 5 */}
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                      className="absolute top-64 left-0 z-10 w-3/5 transform rotate-[4deg] hover:rotate-[2deg] transition-all duration-300"
                    >
                      <img 
                        src="https://i.imgur.com/nxesBTW.png" 
                        alt="PT Starter Pack Template" 
                        className="w-full h-auto rounded-xl shadow-lg hover:shadow-xl transition-all duration-300" 
                      />
                    </motion.div>
                    
                    {/* Image 6 */}
                    <motion.div
                      initial={{ opacity: 0, y: 45 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                      className="absolute top-72 -right-4 z-30 w-3/5 transform rotate-[-5deg] hover:rotate-[-3deg] transition-all duration-300"
                    >
                      <img 
                        src="https://i.imgur.com/4vEnQzG.png" 
                        alt="PT Starter Pack Template" 
                        className="w-full h-auto rounded-xl shadow-lg hover:shadow-xl transition-all duration-300" 
                      />
                    </motion.div>
                    
                    {/* Image 7 */}
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9, duration: 0.5 }}
                      className="absolute top-96 left-5 z-20 w-2/5 transform rotate-[-2deg] hover:rotate-[0deg] transition-all duration-300"
                    >
                      <img 
                        src="https://i.imgur.com/bltP0f3.png" 
                        alt="PT Starter Pack Template" 
                        className="w-full h-auto rounded-xl shadow-lg hover:shadow-xl transition-all duration-300" 
                      />
                    </motion.div>
                  </div>
                  
                  {/* Caption */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="text-center mt-4 text-sm text-text-secondary"
                  >
                    Includes editable Canva templates: client forms, programs, social media posts & more
                  </motion.div>
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

        {/* What's Inside Section */}
        <section id="whats-inside" className="py-20 bg-background-section">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16" 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-text-primary">
                What's Inside <span className="text-blue-500">The PT Starter Pack</span>
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Everything you need to launch, streamline, and scale your PT business — in less time, with more confidence, and zero guesswork.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
              {[
                {
                  icon: <FileText className="h-10 w-10 text-blue-500" />,
                  title: "Client Onboarding & Admin Tools",
                  description: "Onboard clients with professionalism and save hours on manual setup.",
                  colorClasses: {
                    iconBg: "bg-blue-500/10",
                    badgeText: "text-blue-500",
                    badgeBg: "bg-blue-500/10",
                    hoverColor: "hover:text-blue-500",
                    hoverBorder: "hover:border-blue-400"
                  },
                  items: [
                    { text: "Welcome Pack Template", badge: "🔥 Most Popular" },
                    { text: "Goodbye Pack Template", badge: "" },
                    { text: "Professional Contract Template", badge: "✅ Client Favourite" },
                    { text: "Invoice Template", badge: "" },
                    { text: "Services & Pricing Sheet", badge: "" },
                    { text: "Business Card Design", badge: "" },
                    { text: "PAR-Q Form", badge: "" },
                    { text: "Client Questionnaire", badge: "" }
                  ]
                },
                {
                  icon: <Dumbbell className="h-10 w-10 text-emerald-500" />,
                  title: "Training Program Templates",
                  description: "Pre-built training docs you can customise and reuse with every client.",
                  colorClasses: {
                    iconBg: "bg-emerald-500/10",
                    badgeText: "text-emerald-500",
                    badgeBg: "bg-emerald-500/10",
                    hoverColor: "hover:text-emerald-500",
                    hoverBorder: "hover:border-emerald-400"
                  },
                  items: [
                    { text: "Workout Program for Men", badge: "" },
                    { text: "Workout Program for Women", badge: "" },
                    { text: "Printable Program Options", badge: "" },
                    { text: "Exercise Demonstration Cards", badge: "✅ Client Favourite" }
                  ]
                },
                {
                  icon: <Palette className="h-10 w-10 text-purple-500" />,
                  title: "Social Media Content",
                  description: "Fill your feed with scroll-stopping content – without starting from scratch.",
                  colorClasses: {
                    iconBg: "bg-purple-500/10",
                    badgeText: "text-purple-500",
                    badgeBg: "bg-purple-500/10",
                    hoverColor: "hover:text-purple-500",
                    hoverBorder: "hover:border-purple-400"
                  },
                  items: [
                    { text: "Instagram Reels Templates", badge: "" },
                    { text: "Instagram Posts (Square & Portrait)", badge: "🔥 Most Popular" },
                    { text: "Instagram Stories", badge: "" },
                    { text: "Instagram Story Covers", badge: "" },
                    { text: "Promotional Content Templates", badge: "" }
                  ]
                },
                {
                  icon: <Target className="h-10 w-10 text-amber-500" />,
                  title: "Tracking & Goal Tools",
                  description: "Help clients stay motivated with powerful tracking & progress tools.",
                  colorClasses: {
                    iconBg: "bg-amber-500/10",
                    badgeText: "text-amber-500",
                    badgeBg: "bg-amber-500/10",
                    hoverColor: "hover:text-amber-500",
                    hoverBorder: "hover:border-amber-400"
                  },
                  items: [
                    { text: "Weight Loss Tracker", badge: "✅ Client Favourite" },
                    { text: "Client Progress Dashboard", badge: "" },
                    { text: "Goal Setting Worksheet", badge: "" },
                    { text: "Measurement Tracking Form", badge: "" }
                  ]
                }
              ].map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className={`p-8 bg-background-card rounded-2xl border border-ui-border shadow-md hover:shadow-xl transition-all duration-300 ${category.colorClasses.hoverBorder}`}
                >
                  <div className="flex items-center mb-4">
                    <div className={`mr-4 p-3 rounded-xl ${category.colorClasses.iconBg}`}>
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-text-primary">{category.title}</h3>
                      <p className="text-sm text-text-secondary mt-1">{category.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-3 mt-6">
                    {category.items.map((item, idx) => (
                      <li key={idx} className="flex items-start group">
                        <CheckCircle className={`h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0 group-hover:text-${index === 0 ? 'blue' : index === 1 ? 'emerald' : index === 2 ? 'purple' : 'amber'}-500 transition-colors`} />
                        <div>
                          <span className="text-text-secondary">{item.text}</span>
                          {item.badge && (
                            <span className={`ml-2 inline-block text-xs font-medium ${category.colorClasses.badgeText} ${category.colorClasses.badgeBg} px-2 py-1 rounded-full`}>
                              {item.badge}
                            </span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-4xl mx-auto bg-background-card rounded-2xl p-6 border border-ui-border shadow-md text-center"
            >
              <div className="flex justify-center mb-4 text-amber-400 text-2xl">
                ★★★★★
              </div>
              <p className="text-lg text-text-secondary italic mb-4">
                "Everything I needed was right here – I felt like a real business from day one."
              </p>
              <p className="text-sm font-medium text-blue-400">
                — Sarah D., New Personal Trainer
              </p>
            </motion.div>
          </div>
        </section>

        {/* Who It's For Section */}
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
                Who It's <span className="text-blue-500">Perfect For</span>
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Designed specifically for fitness professionals at every stage of their business journey.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                {
                  title: "New Trainers",
                  description: "Just starting your PT business in a commercial or private gym"
                },
                {
                  title: "Experienced PTs",
                  description: "Looking to refresh your brand, documents, and digital presence"
                },
                {
                  title: "Solo Trainers",
                  description: "Who want to save time, look polished, and focus more on training"
                },
                {
                  title: "Gym Managers",
                  description: "Helping trainers onboard quickly and professionally"
                }
              ].map((persona, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 bg-background-card rounded-xl border border-ui-border shadow-md hover:border-blue-400 hover:shadow-xl transition-all duration-300"
                >
                  <h3 className="text-xl font-bold mb-3 text-text-primary">{persona.title}</h3>
                  <p className="text-text-secondary">{persona.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mid-page CTA Section */}
        <section id="cta-pt-starter" className="py-12 md:py-16 lg:py-20 bg-gradient-to-r from-blue-600 to-cyan-500">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
                Ready to Launch Your PT Business Like a Pro?
              </h2>
              <p className="text-lg md:text-xl text-blue-50 mb-10 max-w-3xl mx-auto">
                Get instant access to 20+ professional templates built for trainers who want to save time, look polished, and grow faster.
              </p>

              <motion.div
                whileInView={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, repeatDelay: 1, duration: 2, ease: 'easeInOut' }}
                viewport={{ once: false }}
                className="mb-6"
              >
                <a
                  href="https://buy.stripe.com/6oE7tCe0Q6oPaw84gm"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-teal-400 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300 ease-in-out hover:ring-2 hover:ring-offset-2 hover:ring-teal-400"
                >
                  Download the Starter Pack – $39.99
                </a>
              </motion.div>

              <p className="text-sm text-blue-100 font-medium">
                One-time payment • Instant access • No Canva Pro required
              </p>
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-background-section">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16" 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-text-primary">
                How It <span className="text-blue-500">Works</span>
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Simple, fast, and ready to use in minutes. No complicated setup required.
              </p>
            </motion.div>

            <div className="flex flex-col md:flex-row gap-10 max-w-4xl mx-auto">
              {[
                {
                  number: "1",
                  title: "Open the PDF",
                  description: "After purchase, you'll receive a PDF with all template links"
                },
                {
                  number: "2",
                  title: "Click on any template",
                  description: "You'll be taken directly to the Canva editor"
                },
                {
                  number: "3",
                  title: "Customize & use",
                  description: "Edit with your branding and content, then download or share"
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="flex-1 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-text-primary">{step.title}</h3>
                  <p className="text-text-secondary max-w-xs mx-auto">{step.description}</p>
                  {index < 2 && (
                    <div className="hidden md:block mt-8 text-2xl text-blue-400">
                      <ArrowRight className="mx-auto" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-6 mt-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex items-center px-6 py-3 bg-background-card rounded-full border border-ui-border shadow-md"
              >
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-text-primary font-medium">No Canva Pro needed</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-center px-6 py-3 bg-background-card rounded-full border border-ui-border shadow-md"
              >
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-text-primary font-medium">Use on unlimited clients</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center px-6 py-3 bg-background-card rounded-full border border-ui-border shadow-md"
              >
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-text-primary font-medium">Instant digital access</span>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Trainers Love It Section */}
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
                Why Trainers <span className="text-blue-500">Love It</span>
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                The PT Starter Pack is designed to solve the biggest challenges personal trainers face.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[
                {
                  title: "Saves dozens of hours",
                  description: "No more creating documents from scratch. Everything you need is ready to customize."
                },
                {
                  title: "Looks professional & trustworthy",
                  description: "Make your business look as good as your training skills with premium design templates."
                },
                {
                  title: "Smoother client onboarding",
                  description: "Create a seamless experience from first contact to signed contract with professional materials."
                },
                {
                  title: "More time for actual training",
                  description: "Spend less time on admin and design work, more time doing what you do best — changing lives."
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="flex p-6 bg-background-card rounded-xl border border-ui-border shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="mr-4 flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-text-primary">{benefit.title}</h3>
                    <p className="text-text-secondary">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
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
                Launch Your PT Business with Professional Templates
              </h2>
              
              <p className="text-xl md:text-2xl mb-8 text-blue-50 leading-relaxed">
                Get instant access to the complete PT Starter Pack. One-time payment. Unlimited use.
              </p>
              
              <motion.div
                className="mb-10 inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full py-3 px-6"
                animate={{ 
                  boxShadow: ['0px 0px 0px rgba(255, 255, 255, 0)', '0px 0px 15px rgba(255, 255, 255, 0.3)', '0px 0px 0px rgba(255, 255, 255, 0)']
                }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              >
                <p className="font-medium text-sm md:text-base">
                  ⏳ Limited time offer • 🔒 250+ PTs already using these templates
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
                  href="https://buy.stripe.com/6oE7tCe0Q6oPaw84gm"
                  className="block w-full sm:w-auto sm:inline-block px-10 py-5 bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 text-xl font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300 ease-in-out hover:ring-4 hover:ring-white/30"
                >
                  ⚡ Download the Starter Pack – $39.99
                </a>
              </motion.div>
              
              <div className="space-y-4 text-blue-50 max-w-lg mx-auto">
                <p className="text-sm">
                  After payment, you'll receive instant access to all templates. No waiting, start using right away.
                </p>
                
                <div className="flex items-center justify-center space-x-1 text-sm">
                  <span>⭐⭐⭐⭐⭐</span>
                  <span className="font-medium">4.8/5 based on 250+ trainer reviews</span>
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
                href="https://buy.stripe.com/6oE7tCe0Q6oPaw84gm"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300 ease-in-out hover:ring-2 hover:ring-teal-400"
              >
                Get Instant Access – $39.99
              </a>
            </motion.div>
          </div>
        )}
        
      </div>
    </>
  );
} 