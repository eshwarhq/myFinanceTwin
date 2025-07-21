import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { 
  Search, 
  Building2, 
  CreditCard, 
  PiggyBank,
  Lock,
  Brain,
  Eye,
  Sparkles,
  Check
} from 'lucide-react';

interface ConnectAccountsProps {
  onAccountsConnected: (accounts: string[]) => void;
  userName: string;
}

// Mock financial institutions data
const popularInstitutions = [
  { id: 'chase', name: 'Chase', logo: '🏦', type: 'bank' },
  { id: 'bofa', name: 'Bank of America', logo: '🏛️', type: 'bank' },
  { id: 'wells-fargo', name: 'Wells Fargo', logo: '🏦', type: 'bank' },
  { id: 'amex', name: 'American Express', logo: '💳', type: 'credit' },
  { id: 'discover', name: 'Discover', logo: '💳', type: 'credit' },
  { id: 'fidelity', name: 'Fidelity', logo: '📈', type: 'investment' },
  { id: 'schwab', name: 'Charles Schwab', logo: '📊', type: 'investment' },
  { id: 'vanguard', name: 'Vanguard', logo: '📈', type: 'investment' },
  { id: 'paypal', name: 'PayPal', logo: '💰', type: 'payment' },
];

export function ConnectAccounts({ onAccountsConnected, userName }: ConnectAccountsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);

  const filteredInstitutions = popularInstitutions.filter(institution =>
    institution.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInstitutionSelect = (institutionId: string) => {
    if (selectedAccounts.includes(institutionId)) {
      setSelectedAccounts(prev => prev.filter(id => id !== institutionId));
    } else {
      setSelectedAccounts(prev => [...prev, institutionId]);
    }
  };

  const handleConnect = async () => {
    if (selectedAccounts.length === 0) return;
    
    setIsConnecting(true);
    // Simulate connection process
    await new Promise(resolve => setTimeout(resolve, 2000));
    onAccountsConnected(selectedAccounts);
  };

  const getInstitutionsByType = (type: string) => {
    return filteredInstitutions.filter(inst => inst.type === type);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="mb-4">Welcome, {userName}! Let's activate your personalized dashboard.</h1>
          
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            To create live simulations, our platform securely pulls structured financial data via Fi MCP. 
            Your data stays yours, encrypted end-to-end.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for your bank or institution"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 border-border focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* Institution Categories */}
        <div className="space-y-8 mb-12">
          {/* Banks */}
          {getInstitutionsByType('bank').length > 0 && (
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Building2 className="w-5 h-5 text-blue-600" />
                <h3 className="font-medium">Banks</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {getInstitutionsByType('bank').map((institution) => (
                  <Card 
                    key={institution.id}
                    className={`cursor-pointer transition-all hover:shadow-soft-lg ${
                      selectedAccounts.includes(institution.id) 
                        ? 'ring-2 ring-primary bg-primary/5' 
                        : 'hover:scale-[1.02]'
                    }`}
                    onClick={() => handleInstitutionSelect(institution.id)}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl mb-2">{institution.logo}</div>
                      <p className="text-sm font-medium">{institution.name}</p>
                      {selectedAccounts.includes(institution.id) && (
                        <div className="mt-2">
                          <Check className="w-4 h-4 text-primary mx-auto" />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Credit Cards */}
          {getInstitutionsByType('credit').length > 0 && (
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <CreditCard className="w-5 h-5 text-purple-600" />
                <h3 className="font-medium">Credit Cards</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {getInstitutionsByType('credit').map((institution) => (
                  <Card 
                    key={institution.id}
                    className={`cursor-pointer transition-all hover:shadow-soft-lg ${
                      selectedAccounts.includes(institution.id) 
                        ? 'ring-2 ring-primary bg-primary/5' 
                        : 'hover:scale-[1.02]'
                    }`}
                    onClick={() => handleInstitutionSelect(institution.id)}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl mb-2">{institution.logo}</div>
                      <p className="text-sm font-medium">{institution.name}</p>
                      {selectedAccounts.includes(institution.id) && (
                        <div className="mt-2">
                          <Check className="w-4 h-4 text-primary mx-auto" />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Investments */}
          {getInstitutionsByType('investment').length > 0 && (
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <PiggyBank className="w-5 h-5 text-green-600" />
                <h3 className="font-medium">Investments</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {getInstitutionsByType('investment').map((institution) => (
                  <Card 
                    key={institution.id}
                    className={`cursor-pointer transition-all hover:shadow-soft-lg ${
                      selectedAccounts.includes(institution.id) 
                        ? 'ring-2 ring-primary bg-primary/5' 
                        : 'hover:scale-[1.02]'
                    }`}
                    onClick={() => handleInstitutionSelect(institution.id)}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl mb-2">{institution.logo}</div>
                      <p className="text-sm font-medium">{institution.name}</p>
                      {selectedAccounts.includes(institution.id) && (
                        <div className="mt-2">
                          <Check className="w-4 h-4 text-primary mx-auto" />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Connect Button */}
        {selectedAccounts.length > 0 && (
          <div className="text-center mb-8">
            <Button 
              onClick={handleConnect}
              disabled={isConnecting}
              size="lg"
              className="gradient-accent hover:gradient-accent-hover text-white px-8 h-12"
            >
              {isConnecting ? (
                'Connecting...'
              ) : (
                `Connect ${selectedAccounts.length} Account${selectedAccounts.length !== 1 ? 's' : ''}`
              )}
            </Button>
          </div>
        )}

        {/* Trust Reinforcement */}
        <div className="bg-muted/30 rounded-2xl p-6">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <Lock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium mb-1">Zero-trust privacy architecture</h4>
                <p className="text-sm text-muted-foreground">
                  Bank-level encryption with end-to-end security
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h4 className="font-medium mb-1">Your data is never used to train our models</h4>
                <p className="text-sm text-muted-foreground">
                  Your financial information stays completely private
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium mb-1">Full transparency and revocable access</h4>
                <p className="text-sm text-muted-foreground">
                  You can disconnect accounts anytime with one click
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}