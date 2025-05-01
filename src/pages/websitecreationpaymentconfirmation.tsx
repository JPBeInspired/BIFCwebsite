import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { useEffect } from 'react';

export default function WebsiteCreationPaymentConfirmation() {
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

  return (
    <>
      <Helmet>
        <title>Payment Confirmed - Complete Your Website Setup</title>
        <meta 
          name="description" 
          content="Thank you for your payment. Let's complete your website setup by gathering some information about your preferences."
        />
      </Helmet>

      <div className="bg-background-main py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Success Confirmation Section */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            
            <h1 className="text-3xl font-bold text-text-primary mb-4">
              Payment Successful!
            </h1>
            
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Thank you for purchasing our website creation package. Your transaction has been processed successfully.
            </p>
          </motion.div>

          {/* Next Steps Section */}
          <motion.div 
            className="bg-background-card p-6 rounded-lg border border-ui-border shadow-sm mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-xl font-bold text-text-primary mb-3">
              Next Steps: Complete Your Website Information
            </h2>
            
            <p className="text-text-secondary mb-4">
              To create your perfect landing page, we need to gather some information about your business, branding preferences, and content requirements. Please complete the form below.
            </p>
          </motion.div>

          {/* Form Section - Simple and Reliable */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-xl font-bold text-text-primary mb-4 text-center">
              Please Complete Your Website Information Form
            </h2>
            
            <div className="bg-white rounded-lg shadow-sm">
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
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <p className="text-sm text-text-secondary">
              Having trouble with the form? Contact our support team at <a href="mailto:contact@beinspired.fitness" className="text-accent-primary hover:underline">contact@beinspired.fitness</a>
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
}