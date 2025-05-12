import { Helmet } from 'react-helmet-async';
import { motion, useAnimation } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { ArrowDown, CheckCircle, Dumbbell, User, Target, Clock, Users, HeartPulse } from 'lucide-react';

export default function PTIntroOffer() {
  const [showStickyButton, setShowStickyButton] = useState(false);
  const [shakeButton, setShakeButton] = useState(false);
  const [shakeCount, setShakeCount] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [spotsRemaining, setSpotsRemaining] = useState(12);
  const [progress, setProgress] = useState(40); // 40% filled (8/20 spots taken)
  const heroCTARef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const ctaControls = useAnimation();
  const progressBarControls = useAnimation();

  // Simulate spots countdown
  useEffect(() => {
    // Calculate the time for each spot to be taken over 7 days
    const totalDuration = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
    const decrementInterval = totalDuration / 12; // Time per spot
    
    const interval = setInterval(() => {
      setSpotsRemaining(prevSpots => {
        if (prevSpots <= 1) {
          // Reset to 12 spots when we reach 0
          return 12;
        }
        return prevSpots - 1;
      });
    }, decrementInterval);
    
    return () => clearInterval(interval);
  }, []);

  // Update progress bar based on spots remaining
  useEffect(() => {
    const newProgress = ((20 - spotsRemaining) / 20) * 100;
    setProgress(newProgress);
    
    // Animate the progress bar
    progressBarControls.start({
      width: `${newProgress}%`,
      transition: { duration: 1, ease: "easeOut" }
    });
    
    // Add pulse animation when close to selling out
    if (spotsRemaining <= 3) {
      progressBarControls.start({
        width: `${newProgress}%`,
        boxShadow: ['0px 0px 0px rgba(255, 100, 100, 0.5)', '0px 0px 20px rgba(255, 100, 100, 0.8)', '0px 0px 0px rgba(255, 100, 100, 0.5)'],
        transition: { 
          width: { duration: 1, ease: "easeOut" },
          boxShadow: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
        }
      });
    }
  }, [spotsRemaining, progressBarControls]);

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
          transition: { duration: 1, repeat: 2, repeatType: 'reverse' },
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
      ctaControls.start({
        scale: [1, 1.1, 1],
        transition: { duration: 0.8 },
      });
    }
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  // Status text based on spots remaining
  const getStatusText = () => {
    if (spotsRemaining <= 3) {
      return `⚠️ Hurry! Only ${spotsRemaining} spots left!`;
    } else {
      return `Only ${spotsRemaining} spots remaining`;
    }
  };

  return (
    <>
      <Helmet>
        <title>3 x Online Personal Training Coaching Sesssions – Only $49 | Be Inspired Fitness</title>
        <meta
          name="description"
          content="Claim 3 x 30-minute Online PT Coaching Sessions for just $49 (normally $199). Limited to the first 20 people. No commitment, no upsells. Spend 3 sessions with an expert online coach — discuss your goals, training questions, nutrition, your current program, and anything else you need to move forward with confidence."
        />
      </Helmet>
      <div className="min-h-screen bg-background-main">
        {/* Hero Section */}
        <section ref={heroSectionRef} className="relative min-h-screen flex items-center" id="intro-pt-offer">
          <div className="absolute inset-0">
            <div className="relative h-full">
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1920"
                alt="Personal Training Session"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background-main/95 via-background-main/80 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-background-main via-background-main/50 to-transparent" />
            </div>
          </div>
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 gap-12 items-center">
              <motion.div className="pt-20 lg:pt-0 max-w-2xl mx-auto" {...fadeIn}>
                <motion.span
                  className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-gradient-to-r from-accent-primary to-accent-hover text-white rounded-full text-sm font-semibold shadow-md"
                  animate={{
                    boxShadow: [
                      '0px 4px 12px rgba(0,180,216,0.3)',
                      '0px 8px 24px rgba(0,180,216,0.5)',
                      '0px 4px 12px rgba(0,180,216,0.3)',
                    ],
                  }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                  whileHover={{ scale: 1.05 }}
                  role="button"
                  onClick={scrollToCTA}
                >
                  <span className="animate-pulse h-2 w-2 bg-white rounded-full"></span>
                  🚨 Only 20 Spots Available
                </motion.span>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-text-primary mb-6 leading-tight">
                  🔥 3 Online PT coaching sessions for $49 – Normally $199
                </h1>
                <p className="text-xl text-text-secondary mb-8 max-w-2xl leading-relaxed">
                  Start your fitness journey with expert support – no hidden fees, no commitment.
                </p>
                <div className="flex flex-col sm:flex-row gap-6">
                  <motion.div
                    ref={heroCTARef}
                    animate={ctaControls}
                    whileInView={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, repeatDelay: 1, duration: 2, ease: 'easeInOut' }}
                    viewport={{ once: false }}
                  >
                    <a
                      href="https://buy.stripe.com/4gw29ie0Q7sTdIk4go"
                      className="inline-flex items-center justify-center px-12 py-6 text-2xl font-bold text-white bg-gradient-to-r from-blue-500 to-teal-400 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300 ease-in-out hover:ring-2 hover:ring-offset-2 hover:ring-teal-400"
                    >
                      Claim My 3 Coaching Sessions NOW – $49
                    </a>
                  </motion.div>
                </div>
                <p className="text-base text-accent-primary mt-6 font-semibold">
                  This limited-time offer ends when all 20 spots are gone.
                </p>
                
                {/* Progress Bar */}
                <div className="mt-4 mb-6 max-w-sm">
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="text-text-secondary">Spots Filling Fast</span>
                    <span className={`font-medium ${spotsRemaining <= 3 ? 'text-red-400 animate-pulse' : 'text-accent-primary'}`}>
                      {getStatusText()}
                    </span>
                  </div>
                  <div className="w-full bg-background-card rounded-full h-2.5 mb-1">
                    <motion.div 
                      className="bg-accent-primary h-2.5 rounded-full"
                      initial={{ width: `${progress}%` }}
                      animate={progressBarControls}
                    />
                  </div>
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
        {/* What's Included */}
        <section className="py-16 px-6 sm:px-12 bg-background-section text-text-primary text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 leading-tight animate-fadeInUp">
              Here's What You'll Get
            </h2>
            <div className="text-left max-w-xl mx-auto space-y-6">
              {[ 
                { icon: <CheckCircle className="text-accent-primary w-7 h-7 mr-3 inline" />, text: '3 x 30-minute 1:1 Online coaching sessions with a certified personal trainer' },
                { icon: <CheckCircle className="text-accent-primary w-7 h-7 mr-3 inline" />, text: 'Tailored and customised support personal to you' },
                { icon: <CheckCircle className="text-accent-primary w-7 h-7 mr-3 inline" />, text: 'Expert advice on technique, training, nutrition and motivation' },
                { icon: <CheckCircle className="text-accent-primary w-7 h-7 mr-3 inline" />, text: 'No upsells or hidden extras' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start text-lg">
                  {item.icon}
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Who It's Perfect For */}
        <section className="py-16 px-6 bg-background-main text-text-primary">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 leading-tight text-center">
              Is This Right For You?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { icon: <User className="text-accent-primary w-7 h-7 mb-2" />, text: 'New to the gym or unsure where to start' },
                { icon: <Dumbbell className="text-accent-primary w-7 h-7 mb-2" />, text: 'Looking for nutritional advice' },
                { icon: <Target className="text-accent-primary w-7 h-7 mb-2" />, text: 'Struggling with motivation' },
                { icon: <Clock className="text-accent-primary w-7 h-7 mb-2" />, text: 'Want to learn proper technique and structure' },
                { icon: <Users className="text-accent-primary w-7 h-7 mb-2" />, text: 'Struggling with acheiving your goals' },
                { icon: <HeartPulse className="text-accent-primary w-7 h-7 mb-2" />, text: 'Want to improve your health, fitness, or lifestyle with expert support' },

              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 bg-background-section rounded-xl p-6 shadow-md">
                  {item.icon}
                  <span className="text-lg">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Mid-Page CTA Section */}
        <section className="py-16 px-4 bg-background-main text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-background-main/95 via-background-main/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-background-main via-background-main/50 to-transparent" />
          </div>
          <div className="relative max-w-2xl mx-auto z-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg mb-8 text-accent-primary font-semibold">Only 20 spots available. Don't miss your chance to claim this exclusive intro offer!</p>
            <a
              href="https://buy.stripe.com/4gw29ie0Q7sTdIk4go"
              className="inline-flex items-center justify-center px-12 py-6 text-2xl font-bold text-white bg-gradient-to-r from-blue-500 to-teal-400 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300 ease-in-out hover:ring-2 hover:ring-offset-2 hover:ring-teal-400"
            >
              Claim My 3 Coaching Sessions NOW – $49
            </a>
          </div>
        </section>
        {/* How It Works */}
        <section className="py-16 px-6 bg-background-section text-text-primary">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 leading-tight text-center">
              How It Works
            </h2>
            <div className="flex flex-col md:flex-row gap-8 justify-center items-start">
              {[
                { num: 1, title: 'Purchase your $49 intro pack', desc: 'Secure your spot with our limited-time Stripe checkout.' },
                { num: 2, title: 'Complete a quick form after checkout', desc: 'Tell us your goals and preferences.' },
                { num: 3, title: `We'll match you with a certified PT to schedule your coaching sessions`, desc: 'All our coaches are fully qualified and insured.' },
              ].map((item, idx) => (
                <div key={idx} className="flex-1 bg-background-main rounded-xl p-6 shadow-md flex flex-col items-center text-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-accent-primary text-background-main text-2xl font-bold mb-4">
                    {item.num}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-text-secondary">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center text-accent-primary font-medium">
              All our coaches are fully qualified and insured.
            </div>
          </div>
        </section>
        {/* Social Proof Section */}
        <section className="py-16 px-6 bg-background-main text-text-primary">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 leading-tight">
              Trusted by Over 5000 Clients
            </h2>
            <p className="text-lg md:text-xl mb-12 text-secondary max-w-3xl mx-auto">
              Real feedback from clients who have transformed their fitness with our online PT coaching sessions.
            </p>
            
            {/* Infinite Scroll Testimonial Container */}
            <div className="relative w-full overflow-hidden">
              <div className="flex animate-scroll">
                {/* First set of testimonials */}
                {[
                  {
                    name: "Jess P.",
                    location: "Sydney",
                    quote: [
                      "I was nervous to try PT, but this intro offer made it easy.",
                      "My trainer was amazing and I felt supported",
                      "from day one!"
                    ],
                    result: "Lost 5kg in 8 weeks"
                  },
                  {
                    name: "Mark L.",
                    location: "Melbourne",
                    quote: [
                      "I got great advice on how to improve my technique",
                      "and get more out of my training in the 3 coaching sessions.",
                      "No pressure, no sales pitch – just great coaching."
                    ],
                    result: "Fixed running form"
                  },
                  {
                    name: "Sophia R.",
                    location: "Brisbane",
                    quote: [
                      "The online format was surprisingly effective.",
                      "My trainer spotted form issues I'd never noticed",
                      "and gave me simple fixes that made a huge difference."
                    ],
                    result: "Pain-free workouts"
                  },
                  {
                    name: "James T.",
                    location: "Perth",
                    quote: [
                      "These sessions were exactly what I needed",
                      "to get started with a proper routine.",
                      "The trainer adapted everything to my small apartment setup."
                    ],
                    result: "Consistent routine"
                  },
                  {
                    name: "Emma K.",
                    location: "Adelaide",
                    quote: [
                      "I was skeptical about online training,",
                      "but the quality of coaching was exceptional.",
                      "I've now signed up for regular sessions."
                    ],
                    result: "Full PT client"
                  },
                  {
                    name: "Daniel W.",
                    location: "Gold Coast",
                    quote: [
                      "The 3-session format was perfect to test",
                      "if online PT would work for me.",
                      "Turns out it's more effective than in-person sessions I've had before."
                    ],
                    result: "Better results"
                  }
                ].map((testimonial, index) => (
                  <motion.div
                    key={`first-${index}`}
                    className="min-w-[125px] md:min-w-[150px] bg-background-section rounded-xl shadow-md hover:shadow-lg p-8 flex flex-col mx-3 h-[280px]"
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <div className="flex text-yellow-400 mb-4">
                      ★★★★★
                    </div>
                    <p className="text-text-primary text-left text-lg italic mb-6 flex-grow">
                      {testimonial.quote.map((line, i) => (
                        <span key={i} className="block">{line}</span>
                      ))}
                    </p>
                    <div className="flex items-center mt-auto">
                      <div className="w-12 h-12 rounded-full bg-accent-primary flex items-center justify-center text-background-main text-xl font-bold">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div className="ml-4 text-left">
                        <p className="font-semibold text-text-primary">{testimonial.name} <span className="font-normal text-text-secondary"> • {testimonial.location}</span></p>
                        <p className="text-sm font-medium text-accent-highlight">{testimonial.result}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {/* Duplicate set for seamless loop */}
                {[
                  {
                    name: "Jess P.",
                    location: "Sydney",
                    quote: [
                      "I was nervous to try PT, but this intro offer made it easy.",
                      "My trainer was amazing and I felt supported",
                      "from day one!"
                    ],
                    result: "Lost 5kg in 8 weeks"
                  },
                  {
                    name: "Mark L.",
                    location: "Melbourne",
                    quote: [
                      "I got great advice on how to improve my technique",
                      "and get more out of my training in the 3 sessions.",
                      "No pressure, no sales pitch – just great coaching."
                    ],
                    result: "Fixed running form"
                  },
                  {
                    name: "Sophia R.",
                    location: "Brisbane",
                    quote: [
                      "The online format was surprisingly effective.",
                      "My trainer spotted form issues I'd never noticed",
                      "and gave me simple fixes that made a huge difference."
                    ],
                    result: "Pain-free workouts"
                  },
                  {
                    name: "James T.",
                    location: "Perth",
                    quote: [
                      "These sessions were exactly what I needed",
                      "to get started with a proper routine.",
                      "The trainer adapted everything to my small apartment setup."
                    ],
                    result: "Consistent routine"
                  },
                  {
                    name: "Emma K.",
                    location: "Adelaide",
                    quote: [
                      "I was skeptical about online training,",
                      "but the quality of coaching was exceptional.",
                      "I've now signed up for regular sessions."
                    ],
                    result: "Full PT client"
                  },
                  {
                    name: "Daniel W.",
                    location: "Gold Coast",
                    quote: [
                      "The 3-session format was perfect to test",
                      "if online PT would work for me.",
                      "Turns out it's more effective than in-person sessions I've had before."
                    ],
                    result: "Better results"
                  }
                ].map((testimonial, index) => (
                  <motion.div
                    key={`second-${index}`}
                    className="min-w-[125px] md:min-w-[150px] bg-background-section rounded-xl shadow-md hover:shadow-lg p-8 flex flex-col mx-3 h-[280px]"
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <div className="flex text-yellow-400 mb-4">
                      ★★★★★
                    </div>
                    <p className="text-text-primary text-left text-lg italic mb-6 flex-grow">
                      {testimonial.quote.map((line, i) => (
                        <span key={i} className="block">{line}</span>
                      ))}
                    </p>
                    <div className="flex items-center mt-auto">
                      <div className="w-12 h-12 rounded-full bg-accent-primary flex items-center justify-center text-background-main text-xl font-bold">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div className="ml-4 text-left">
                        <p className="font-semibold text-text-primary">{testimonial.name} <span className="font-normal text-text-secondary"> • {testimonial.location}</span></p>
                        <p className="text-sm font-medium text-accent-highlight">{testimonial.result}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* FAQ Section */}
        <section className="py-16 px-6 bg-background-section text-text-primary">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 leading-tight text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: 'Is this really only $49?',
                  a: 'Yes! This is a genuine, limited-time offer for new clients. You get 3 x 30-minute coaching sessions for just $49 (normally $199).',
                },
                {
                  q: 'Will I be pressured to buy more coaching sessions?',
                  a: 'Nope. This is a no-obligation, risk-free intro offer. It is up to you if you want to continue with a PT after the 3 coaching sessions.',
                },
                {
                  q: 'How quickly can I start?',
                  a: "You'll be matched with a trainer and can usually book your first session within a few days of purchase.",
                },
                {
                  q: 'Can I choose my trainer?',
                  a: "We'll do our best to match you with a trainer who fits your goals and preferences. You can always request a change if needed.",
                },
                {
                  q: 'Do I need gym access?',
                  a: 'No – we have trainers who can work with you in a gym, outdoors, or even at home, depending on your needs.',
                },
              ].map((item, idx) => (
                <div key={idx} className="bg-background-main rounded-xl p-6 shadow-md">
                  <h3 className="text-lg font-bold mb-2">{item.q}</h3>
                  <p className="text-text-secondary">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Urgency CTA Section */}
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
                Ready to Take the First Step?
              </h2>
              <p className="text-xl md:text-2xl mb-8 text-blue-50 leading-relaxed">
                Only 20 spots available. Once they're gone, they're gone.
              </p>
              
              <motion.div
                className="mb-10 inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full py-3 px-6"
                animate={{ 
                  boxShadow: ['0px 0px 0px rgba(255, 255, 255, 0)', '0px 0px 15px rgba(255, 255, 255, 0.3)', '0px 0px 0px rgba(255, 255, 255, 0)']
                }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              >
                <p className="font-medium text-sm md:text-base">
                  ⏳ Only {spotsRemaining} spots left at this price • 🔒 Limited time offer
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
                  href="https://buy.stripe.com/4gw29ie0Q7sTdIk4go"
                  className="block w-full sm:w-auto sm:inline-block px-10 py-5 bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 text-xl font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300 ease-in-out hover:ring-4 hover:ring-white/30"
                >
                  ⚡ Claim My 3 Online PT Coaching Sessions NOW
                </a>
              </motion.div>
              
              <div className="space-y-4 text-blue-50 max-w-lg mx-auto">
                <p className="text-sm">
                  After payment, you'll receive your session booking details. No ongoing commitment required.
                </p>
                
                <div className="flex items-center justify-center space-x-1 text-sm">
                  <span>⭐⭐⭐⭐⭐</span>
                  <span className="font-medium">4.8/5 based on 5000+ client reviews</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        {/* Business Info - small print */}
        <div className="mt-8 text-xs text-blue-100 text-center opacity-80 select-none">
          <div>Be Inspired Fitenss and Coaching PTY LTD</div>
          <div>ABN 93 153 967 483</div>
          <div>84 Pier Street, Altona, VIC 3018</div>
          <div>0428 187 895</div>
          <div className="flex justify-center gap-4 mt-2">
            <a href="https://www.facebook.com/BeInspiredFitnessAndCoaching" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" className="inline h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.593 0 0 .593 0 1.326v21.348C0 23.406.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.406 24 22.674V1.326C24 .593 23.406 0 22.675 0"/></svg>
            </a>
            <a href="https://www.instagram.com/beinspiredfitnessandcoaching/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" className="inline h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.668-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
          </div>
        </div>
        {/* Mobile Sticky CTA Button */}
        {showStickyButton && (
          <div className={`fixed bottom-4 left-0 right-0 px-4 sm:hidden z-50 animate-fadeInUpSmall ${shakeButton ? 'animate-shakeSmall' : ''}`}>
            <motion.div
              animate={{
                boxShadow: [
                  '0px 4px 8px rgba(0, 180, 216, 0.1)',
                  '0px 8px 24px rgba(0, 180, 216, 0.4)',
                  '0px 4px 8px rgba(0, 180, 216, 0.1)',
                ],
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
                href="https://buy.stripe.com/4gw29ie0Q7sTdIk4go"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300 ease-in-out hover:ring-2 hover:ring-teal-400"
              >
                Claim My 3 PT Sessions NOW – $49
              </a>
            </motion.div>
          </div>
        )}
      </div>
    </>
  );
} 