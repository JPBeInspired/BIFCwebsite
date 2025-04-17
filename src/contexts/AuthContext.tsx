import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  user: { email: string } | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [loading] = useState(false);

  const signIn = async (email: string, password: string) => {
    if (email === 'admin@beinspired.fitness' && password === 'Beinspired1!') {
      setUser({ email });
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const signOut = async () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}