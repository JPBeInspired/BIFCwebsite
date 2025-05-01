import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function WebsiteCreationPaymentConfirmation() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Ensure the GHL embed script loads properly
  useEffect(() => {
    // Create and append the script element
    const script = document.createElement('script');
    script.src = 'https://link.msgsndr.com/js/form_embed.js';
    script.async = true;
    script.defer = true;
    
    // Add the script to the document body
    document.body.appendChild(script);
    
    console.log('Script added to body');

    // Cleanup function to remove the script when component unmounts
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
        console.log('Script removed from body');
      }
    };
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: (delay: number) => ({ duration: 0.6, delay })
  };

  return (
    <>
      <Helmet>
        <title>Payment Confirmed - Complete Your Website Setup</title>
        <meta 
          name="description" 
          content="Thank you for your payment. Let's complete your website setup by gathering some information about your preferences."
        />
      </Helmet>

      <div className="bg-background-main py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Success Confirmation Section */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-6">
              <CheckCircle className="h-20 w-20 text-accent-highlight" />
            </div>
            
            <h1 className="text-4xl font-bold text-primary mb-4">
              ✅ Payment Successful!
            </h1>
            
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              Thank you for purchasing your $99 Personal Trainer Landing Page. Your transaction has been successfully processed and your digital journey begins now.
            </p>
          </motion.div>

          {/* Next Steps Section */}
          <motion.div 
            className="bg-card p-8 rounded-xl border border-ui-border shadow-md mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-primary mb-4">
              🚀 Next Step: Complete Your Website Information
            </h2>
            
            <p className="text-secondary mb-6">
              To begin building your custom landing page, we need a few key details about your personal training business. This helps us design a page that looks, feels, and performs exactly how you want it.
            </p>

            <div className="bg-accent-primary/10 rounded-lg p-4 mb-6 border-l-4 border-accent-primary">
              <p className="font-medium text-primary">
                👉 Please complete the Website Information Form below. It only takes 5 minutes.
              </p>
            </div>
            
            <p className="text-secondary">
              Once submitted, our team will begin creating your site immediately.
            </p>
          </motion.div>

          {/* What's Included Section */}
          <motion.div 
            className="bg-card p-8 rounded-xl border border-ui-border shadow-md mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-primary mb-6">
              🧰 What's Included in Your $99 Package:
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Professionally designed, mobile-first PT landing page',
                'Fully optimised for mobile and desktop users',
                'Direct inquiry form routed to your email or phone',
                'White-labeled marketing templates',
                'Instagram content templates',
                'Client workout templates',
                '1 free round of revisions',
                '3 business day turnaround',
                'Ongoing support if needed'
              ].map((item, index) => {
                return (
                  <div key={index} className="flex items-start">
                    <span className="text-accent-highlight text-lg mr-2">✓</span>
                    <span className="text-primary">{item}</span>
                  </div>
                );
              })}
            </div>
            
            <p className="mt-6 text-secondary italic">
              This package is normally valued at $499, but you've unlocked our limited-time $99 offer — so let's make the most of it.
            </p>
          </motion.div>

          {/* What Happens Next Section */}
          <motion.div 
            className="bg-card p-8 rounded-xl border border-ui-border shadow-md mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-primary mb-6">
              📅 What Happens Next:
            </h2>
            
            <ol className="list-none space-y-4">
              {[
                'Fill out the form below with your content and preferences',
                'We\'ll design your page and deliver a preview within 3 business days',
                'You can then request changes (if needed)',
                'Once approved, your website is fully yours — no subscriptions, no hidden fees'
              ].map((step, index) => (
                <li key={index} className="flex items-start">
                  <span className="bg-accent-primary text-primary rounded-full h-6 w-6 flex items-center justify-center font-bold mr-3 flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-primary">{step}</span>
                </li>
              ))}
            </ol>
          </motion.div>

          {/* FAQ Section */}
          <motion.div 
            className="bg-card p-8 rounded-xl border border-ui-border shadow-md mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-primary mb-6">
              🧠 Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              {[
                {
                  question: "I'm not great with tech — can I still do this?",
                  answer: "Yes! This is 100% done-for-you. No tech knowledge is required. Just complete the form, and we handle everything else."
                },
                {
                  question: "What if I'm not sure what content to include?",
                  answer: "The form includes helpful tips and examples to guide you. Just give us your best effort — we'll polish and structure it."
                },
                {
                  question: "Can I update the website later?",
                  answer: "Absolutely. You'll get one free revision after delivery, and we offer optional support if you'd like help in the future."
                },
                {
                  question: "Do I need a domain?",
                  answer: "If you have one, great. If not, we can launch it on a temporary domain or help guide you to set one up."
                }
              ].map((faq, index) => (
                <div key={index} className="border border-ui-border rounded-lg overflow-hidden">
                  <button
                    className="w-full px-6 py-4 flex justify-between items-center focus:outline-none bg-card hover:bg-background-main"
                    onClick={() => toggleFaq(index)}
                  >
                    <span className="font-semibold text-left text-primary">{faq.question}</span>
                    {openFaq === index ? (
                      <ChevronUp className="h-5 w-5 text-secondary" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-secondary" />
                    )}
                  </button>
                  
                  <div 
                    className={`px-6 py-4 bg-background-main text-secondary transition-all duration-300 ${
                      openFaq === index ? 'block' : 'hidden'
                    }`}
                  >
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form Section */}
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-primary mb-4">
                Ready to Get Started?
              </h2>
              
              <p className="text-secondary mb-6">
                Complete the form below or click the link below to provide all the information we need to create your landing page.
              </p>
              
              <a 
                href="https://api.leadconnectorhq.com/widget/form/gomZJiCN73VLmQX9y6Hu" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300 ease-in-out hover:ring-2 hover:ring-offset-2 hover:ring-teal-400"
              >
                Complete Website Information Form
              </a>
            </div>
            
            <div className="bg-background-card rounded-lg shadow-md overflow-hidden">
              {/* Simple iframe with fixed height */}
              <iframe
                src="https://api.leadconnectorhq.com/widget/form/gomZJiCN73VLmQX9y6Hu"
                style={{
                  width: "100%",
                  height: "2800px",
                  border: "none",
                  display: "block"
                }}
                id="inline-gomZJiCN73VLmQX9y6Hu" 
                title="$99 Website package"
                allow="camera; microphone; autoplay; encrypted-media; fullscreen"
              ></iframe>
            </div>
          </motion.div>
          
          {/* Support Information */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <p className="text-secondary">
              Having trouble with the form? Contact our support team at <a href="mailto:contact@beinspired.fitness" className="text-accent-primary hover:underline">contact@beinspired.fitness</a>
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
}