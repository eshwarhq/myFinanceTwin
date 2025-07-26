import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { ArrowLeft, Sparkles, Shield, Lock, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SignupProps {
  onSignup: () => void;
}

export function Signup({ onSignup }: SignupProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !agreedToTerms) return;

    try {
      setIsLoading(true);

      const payload = { ...formData, agreedToTerms }; // ⬅️ include it if needed by backend

      const res1 = await fetch('http://localhost:5000/api/health', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      console.log(res1)

      const res = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorMsg = await res.text();
        throw new Error(errorMsg || 'Signup failed');
      }

      // optional fake delay for UX
      await new Promise(resolve => setTimeout(resolve, 1000));

      setIsLoading(false);
      onSignup(); // 🥳 All good, proceed
    } catch (error) {
      console.error('Signup error:', error);
      setIsLoading(false); // Don’t leave it spinning forever on error
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6 -ml-2"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        {/* Signup Card */}
        <Card className="shadow-soft-lg border-border/50">
          <CardHeader className="text-center pb-8">
            <div className="w-12 h-12 gradient-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-2xl">Create Your Secure Financial Twin</CardTitle>
            <CardDescription>
              Get started with personalized AI financial guidance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left Column - Form */}
              <div className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your full name"
                      required
                      className="h-12 border-border focus:border-primary transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter your email"
                      required
                      className="h-12 border-border focus:border-primary transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Create a secure password"
                      required
                      className="h-12 border-border focus:border-primary transition-colors"
                    />
                  </div>

                  <div className="flex items-start space-x-3 pt-4">
                    <Checkbox
                      id="terms"
                      checked={agreedToTerms}
                      onCheckedChange={(checked: boolean) => setAgreedToTerms(checked as boolean)}
                      className="mt-1"
                    />
                    <Label htmlFor="terms" className="text-sm leading-relaxed">
                      I agree to the<a href="#" className="text-primary hover:underline">T&C</a>{' '}
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading || !agreedToTerms}
                    className="rounded-3xl w-full h-12 gradient-accent hover:gradient-accent-hover text-white border-0 shadow-soft mt-6"
                  >
                    {isLoading ? 'Creating Your Account...' : 'Create My Secure Account'}
                  </Button>
                </form>

                <div className="text-center pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <button
                      onClick={() => navigate('/login')}
                      className="text-primary hover:underline font-medium"
                    >
                      Sign in here
                    </button>
                  </p>
                </div>
              </div>

              {/* Right Column - Privacy Promises */}
              <div className="lg:border-l lg:border-border lg:pl-12">
                <h3 className="text-3xl font-medium mb-6 text-center lg:text-left">Our Privacy Promise To You</h3>

                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-3xl flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">You Are in Control</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        You have full transparency and can revoke data access at any time. Your financial data remains under your complete control.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-50 rounded-3xl flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Zero-Trust Security</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Your data is always yours, encrypted end-to-end. We never store raw data; each query uses ephemeral snapshots from Fi MCP.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-50 rounded-3xl flex items-center justify-center flex-shrink-0">
                      <Lock className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Your Data is Not Our Product</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        We will never use your personal data to train our AI models. Your financial information stays private and secure.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-muted/50 rounded-3xl">
                  <p className="text-xs text-muted-foreground text-center">
                    🔒 Bank-level encryption • 🛡️ SOC 2 Type II compliant • 🔐 Zero-knowledge architecture
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}