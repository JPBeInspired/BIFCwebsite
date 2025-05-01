import React from 'react';

interface FadeInUpProps {
  children: React.ReactNode;
  delay?: number; // delay in milliseconds (e.g., 300 for 0.3s)
}

const FadeInUp: React.FC<FadeInUpProps> = ({ children, delay = 0 }) => {
  const style = {
    animation: `fadeInUp 0.8s ease forwards`,
    animationDelay: `${delay}ms`,
    opacity: 0, // Start hidden until animation plays
  };

  return (
    <div style={style}>
      {children}
    </div>
  );
};

export default FadeInUp;
