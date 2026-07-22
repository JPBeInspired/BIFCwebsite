import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { getUser } from '../../lib/cloudflare';
import toast from 'react-hot-toast';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleContinue = async () => {
    setLoading(true);

    try {
      const user = await getUser();

      if (!user) {
        throw new Error('Cloudflare Access session not found');
      }

      navigate('/admin/dashboard');
      toast.success('Access verified');
    } catch (error) {
      toast.error('Sign in through Cloudflare Access to continue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-main flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Lock className="h-12 w-12 text-accent-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-text-primary">Admin Login</h2>
          <p className="text-text-secondary mt-2">Access is managed through Cloudflare</p>
        </div>

        <div className="bg-background-card p-8 border border-ui-border">
          <button
            type="button"
            onClick={handleContinue}
            disabled={loading}
            className="w-full py-3 bg-accent-primary text-text-primary hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Checking access...' : 'Continue to Dashboard'}
          </button>
        </div>
      </div>
    </div>
  );
}
