import { createContext, useContext, useState, ReactNode } from 'react';

interface PromotionalContextType {
  message: string;
  code: string;
  isVisible: boolean;
  isEnabled: boolean;
  showPromotion: (message: string, code: string) => void;
  hidePromotion: () => void;
  togglePromotion: (enabled: boolean) => void;
}

const PromotionalContext = createContext<PromotionalContextType | undefined>(undefined);

export function PromotionalProvider({ children }: { children: ReactNode }) {
  const [promotionalData, setPromotionalData] = useState({
    message: '',
    code: '',
    isVisible: false,
    isEnabled: true,
  });

  const showPromotion = (message: string, code: string) => {
    setPromotionalData(prev => ({ ...prev, message, code, isVisible: true }));
  };

  const hidePromotion = () => {
    setPromotionalData(prev => ({ ...prev, isVisible: false }));
  };

  const togglePromotion = (enabled: boolean) => {
    setPromotionalData(prev => ({ ...prev, isEnabled: enabled }));
  };

  return (
    <PromotionalContext.Provider
      value={{
        ...promotionalData,
        showPromotion,
        hidePromotion,
        togglePromotion,
      }}
    >
      {children}
    </PromotionalContext.Provider>
  );
}

export function usePromotional() {
  const context = useContext(PromotionalContext);
  if (context === undefined) {
    throw new Error('usePromotional must be used within a PromotionalProvider');
  }
  return context;
}