import { createContext, useContext, useState, ReactNode } from 'react';
import { signIn as apiSignIn, signOut as apiSignOut } from '../lib/cloudflare';

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
    const signedInUser = await apiSignIn(email, password);
    if (!signedInUser?.email) throw new Error('Invalid credentials');
    setUser({ email: signedInUser.email });
  };

  const signOut = async () => {
    await apiSignOut();
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
