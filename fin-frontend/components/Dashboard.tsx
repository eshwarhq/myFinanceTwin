import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import {
  TrendingUp,
  Target,
  AlertTriangle,
  MessageCircle,
  User,
  Settings,
  Sparkles,
  Calendar,
  DollarSign,
  PieChart as PieChartIcon,
  X,
  ArrowUp,
  ArrowDown,
  Send,
  HelpCircle,
  CheckCircle,
  CreditCard,
  Building,
  TrendingDown,
  Clock,
  Percent,
  Wallet,
  BarChart3,
  Lightbulb,
  Star,
  Award
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DashboardProps {
  userName: string;
  isFirstTime?: boolean;
  onOnboardingComplete?: () => void;
}

// Coach mark data
const coachMarks = [
  {
    id: 'net-worth',
    title: 'Your Live Net Worth',
    description: 'This is your live net worth. Click this card to ask specific questions about it!',
    position: { top: '20%', left: '25%' }
  },
  {
    id: 'insights',
    title: 'AI Insights',
    description: 'We\'ve already found some insights for you. New ones will appear here automatically.',
    position: { top: '20%', right: '15%' }
  }
];

// Mock data for charts
const netWorthData = [
  { month: 'Jan', value: 45000 },
  { month: 'Feb', value: 47000 },
  { month: 'Mar', value: 46500 },
  { month: 'Apr', value: 49000 },
  { month: 'May', value: 52000 },
  { month: 'Jun', value: 54500 },
];

const goals = [
  { name: 'Emergency Fund', current: 8500, target: 15000, progress: 57 },
  { name: 'Buy a home by 2028', current: 35000, target: 80000, progress: 44 },
  { name: 'Retirement Savings', current: 125000, target: 200000, progress: 63 },
];

// New mock data for expanded modules
const loansData = [
  {
    id: 1,
    type: 'Home Loan',
    principal: 2500000,
    currentBalance: 1850000,
    interestRate: 8.5,
    emiAmount: 25000,
    nextDueDate: '2024-08-15',
    remainingTenure: '12 years 3 months'
  },
  {
    id: 2,
    type: 'Car Loan',
    principal: 800000,
    currentBalance: 320000,
    interestRate: 9.2,
    emiAmount: 18000,
    nextDueDate: '2024-08-20',
    remainingTenure: '1 year 8 months'
  }
];

const creditCardData = [
  {
    id: 1,
    name: 'HDFC Regalia',
    currentBalance: 45000,
    creditLimit: 200000,
    dueDate: '2024-08-10',
    minimumDue: 4500,
    rewardPoints: 12500
  },
  {
    id: 2,
    name: 'ICICI Amazon Pay',
    currentBalance: 18000,
    creditLimit: 150000,
    dueDate: '2024-08-12',
    minimumDue: 1800,
    rewardPoints: 8200
  }
];

const spendingByCategory = [
  { category: 'Groceries', amount: 12000, color: '#34a853' },
  { category: 'Dining', amount: 8500, color: '#fbbc04' },
  { category: 'Shopping', amount: 15000, color: '#ea4335' },
  { category: 'Bills', amount: 22000, color: '#4285f4' },
  { category: 'Entertainment', amount: 6500, color: '#9c27b0' }
];

const recentTransactions = [
  { id: 1, merchant: 'Amazon', date: '2024-08-05', amount: 2499, category: 'Shopping' },
  { id: 2, merchant: 'Swiggy', date: '2024-08-04', amount: 485, category: 'Dining' },
  { id: 3, merchant: 'Metro Station', date: '2024-08-04', amount: 45, category: 'Travel' },
  { id: 4, merchant: 'BigBasket', date: '2024-08-03', amount: 1850, category: 'Groceries' },
  { id: 5, merchant: 'BookMyShow', date: '2024-08-02', amount: 600, category: 'Entertainment' }
];

const investmentPortfolio = [
  {
    id: 1,
    name: 'Reliance Industries',
    quantity: 50,
    currentPrice: 2485,
    totalValue: 124250,
    gainLoss: 12350,
    gainLossPercent: 11.05,
    type: 'stock'
  },
  {
    id: 2,
    name: 'HDFC Bank',
    quantity: 100,
    currentPrice: 1567,
    totalValue: 156700,
    gainLoss: -8900,
    gainLossPercent: -5.37,
    type: 'stock'
  },
  {
    id: 3,
    name: 'SBI Small Cap Fund',
    quantity: 1250,
    currentPrice: 185,
    totalValue: 231250,
    gainLoss: 45680,
    gainLossPercent: 24.6,
    type: 'mutual_fund'
  }
];

const trendingStocks = [
  { name: 'Tesla Inc.', symbol: 'TSLA', change: '+5.8%', rationale: 'Strong Q3 delivery numbers beat estimates' },
  { name: 'NVIDIA Corp.', symbol: 'NVDA', change: '+3.2%', rationale: 'AI chip demand remains robust across sectors' },
  { name: 'Microsoft Corp.', symbol: 'MSFT', change: '+2.1%', rationale: 'Cloud growth accelerating with new AI features' }
];

export function Dashboard({ userName, isFirstTime = false, onOnboardingComplete }: DashboardProps) {
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [timeframe, setTimeframe] = useState('6M');
  const [showCoachMarks, setShowCoachMarks] = useState(isFirstTime);
  const [completedCoachMarks, setCompletedCoachMarks] = useState<string[]>([]);
  const [showWelcomeBanner, setShowWelcomeBanner] = useState(false);
  const [netWorthValue, setNetWorthValue] = useState(0);
  const [isAnimatingValue, setIsAnimatingValue] = useState(isFirstTime);

  // Calculate totals for at-a-glance cards
  const totalLoanBalance = loansData.reduce((sum, loan) => sum + loan.currentBalance, 0);
  const totalLoanPrincipal = loansData.reduce((sum, loan) => sum + loan.principal, 0);
  const loanRepaidPercentage = ((totalLoanPrincipal - totalLoanBalance) / totalLoanPrincipal) * 100;
  const nextEmiDate = loansData.reduce((earliest, loan) => {
    return new Date(loan.nextDueDate) < new Date(earliest) ? loan.nextDueDate : earliest;
  }, loansData[0]?.nextDueDate || '');

  const totalCreditBalance = creditCardData.reduce((sum, card) => sum + card.currentBalance, 0);
  const totalCreditLimit = creditCardData.reduce((sum, card) => sum + card.creditLimit, 0);
  const creditUtilization = (totalCreditBalance / totalCreditLimit) * 100;
  const nextCreditDue = creditCardData.reduce((earliest, card) => {
    return new Date(card.dueDate) < new Date(earliest) ? card.dueDate : earliest;
  }, creditCardData[0]?.dueDate || '');

  const totalInvestmentValue = investmentPortfolio.reduce((sum, investment) => sum + investment.totalValue, 0);
  const totalGainLoss = investmentPortfolio.reduce((sum, investment) => sum + investment.gainLoss, 0);
  const totalGainLossPercent = (totalGainLoss / (totalInvestmentValue - totalGainLoss)) * 100;

  // Animate net worth value on first load
  useEffect(() => {
    if (isAnimatingValue) {
      const targetValue = 54500;
      const duration = 2000;
      const steps = 60;
      const stepValue = targetValue / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        setNetWorthValue(Math.round(stepValue * currentStep));

        if (currentStep >= steps) {
          clearInterval(timer);
          setNetWorthValue(targetValue);
          setIsAnimatingValue(false);

          if (isFirstTime) {
            setTimeout(() => setShowWelcomeBanner(true), 500);
          }
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isAnimatingValue, isFirstTime]);

  const handleCardClick = (cardId: string) => {
    setSelectedCard(cardId);
  };

  const handleCloseCard = () => {
    setSelectedCard(null);
    setChatInput('');
  };

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      setChatInput('');
    }
  };

  const handleCoachMarkComplete = (coachMarkId: string) => {
    setCompletedCoachMarks(prev => [...prev, coachMarkId]);

    if (completedCoachMarks.length + 1 >= coachMarks.length) {
      setTimeout(() => {
        setShowCoachMarks(false);
        onOnboardingComplete?.();
      }, 500);
    }
  };

  const handleWelcomeBannerClose = () => {
    setShowWelcomeBanner(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short'
    });
  };

  return (
    <div className="min-h-screen bg-gray-10">
      {/* Coach Marks Overlay */}
      {showCoachMarks && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl p-8 max-w-md w-full shadow-soft-lg border border-border">
            <div className="text-center mb-6">
              <div className="w-16 h-16 gradient-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-medium mb-2">Welcome to Your Dashboard!</h3>
              <p className="text-muted-foreground">
                Let's take a quick tour of your personalized financial insights.
              </p>
            </div>

            <div className="space-y-4">
              {coachMarks.map((mark) => {
                const isCompleted = completedCoachMarks.includes(mark.id);
                return (
                  <div key={mark.id} className="flex items-start space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${isCompleted ? 'bg-green-600' : 'border-2 border-border'
                      }`}>
                      {isCompleted && <CheckCircle className="w-4 h-4 text-white" />}
                    </div>
                    <div>
                      <h4 className="font-medium">{mark.title}</h4>
                      <p className="text-sm text-muted-foreground">{mark.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Button
              onClick={() => setShowCoachMarks(false)}
              className="w-full mt-6 gradient-accent hover:gradient-accent-hover text-white"
            >
              Start Exploring
            </Button>
          </div>
        </div>
      )}

      {/* Welcome Banner */}
      {showWelcomeBanner && (
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-200">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-blue-900">Your Financial Twin is ready!</p>
                  <p className="text-sm text-blue-700">Ask a question or explore your dashboard to get started.</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleWelcomeBannerClose}
                className="text-blue-700 hover:text-blue-900"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Dashboard Content */}                  {/* Header */}
      <header className="bg-gray-10 mt-0">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-700 text-7xl text-muted-foreground">Hello, <span className="text-gray-600 text-6xl">{userName}</span></p>
            </div>
          </div>
        </div>
      </header>
      { }

      <main className="container mx-auto px-6 py-24 pt-1">
        {!selectedCard ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Net Worth Trend Card */}
            <Card
              id="net-worth-card"
              className="bg-green-100 cursor-pointer hover:shadow-soft-lg transition-all duration-300 hover:scale-[1.02] col-span-1 md:col-span-2"
              onClick={() => handleCardClick('networth')}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <span className='text-black'>Net Worth Trend</span>
                      {isFirstTime && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse ml-2" />
                      )}
                    </CardTitle>
                    <CardDescription className='text-gray-500'>Your financial progress over time</CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-semibold text-green-600">
                      {formatCurrency(isAnimatingValue ? netWorthValue : 54500)}
                    </div>
                    <div className="flex items-center text-sm text-green-600">
                      <ArrowUp className="w-3 h-3 mr-1" />
                      +12.3% this year
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={netWorthData}>
                      <XAxis dataKey="month" axisLine={false} tickLine={false} />
                      <YAxis hide />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#10b981"
                        strokeWidth={3}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Goals Progress Card */}
            <Card
              className="bg-black text-white cursor-pointer transition-all duration-300 hover:bg-zinc-900 hover:shadow-lg hover:scale-[1.02]"
              onClick={() => handleCardClick('goals')}
            >
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Target className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-white" >Goals Progress</span>
                </CardTitle>

                {/* Make description white too */}
                <CardDescription className="text-white mt-1">
                  Track your financial milestones
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {goals.slice(0, 2).map((goal, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white truncate">{goal.name}</span>
                      <span className="text-white text-opacity-80">{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-2 text-gray-100" />
                  </div>
                ))}
                <p className="text-xs text-white text-opacity-50 mt-3">+1 more goal</p>
              </CardContent>
            </Card>


            {/* NEW: Loans & EMI Overview Card */}
            <Card
              className="bg-black cursor-pointer hover:shadow-soft-lg transition-all duration-300 hover:scale-[1.02]"
              onClick={() => handleCardClick('loans')}
            >
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <Building className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className='text-white'>Loans & EMIs</span>
                </CardTitle>
                <CardDescription className='text-white'>Your loan portfolio overview</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className='text-white'>Total Outstanding</span>
                    <span className="text-gray-300 font-medium">{formatCurrency(totalLoanBalance)}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-3">
                    <span className='text-white'>Next EMI Due</span>
                    <span className="text-orange-600">{formatDate(nextEmiDate)}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className='text-white'>Loans Repaid</span>
                      <span className='text-white'>{Math.round(loanRepaidPercentage)}%</span>
                    </div>
                    <Progress value={loanRepaidPercentage} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* NEW: Credit Card Usage Card */}
            <Card
              className="bg-black cursor-pointer hover:shadow-soft-lg transition-all duration-300 hover:scale-[1.02]"
              onClick={() => handleCardClick('credit')}
            >
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-red-600" />
                  </div>
                  <span className='text-white'>Credit Card Usage</span>
                </CardTitle>
                <CardDescription className='text-white mt-3'>Your credit utilization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className='text-white'>Current Balance</span>
                    <span className="text-gray-300 font-medium">{formatCurrency(totalCreditBalance)}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-3">
                    <span className='text-white'>Payment Due</span>
                    <span className="text-orange-600">{formatDate(nextCreditDue)}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className='text-white'>Credit Utilization</span>
                      <span className={creditUtilization > 30 ? 'text-red-600' : 'text-green-600'}>
                        {Math.round(creditUtilization)}%
                      </span>
                    </div>
                    <Progress
                      value={creditUtilization}
                      className="h-2"
                      // @ts-ignore
                      style={{ '--progress-background': creditUtilization > 30 ? '#ef4444' : '#10b981' }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* NEW: Stocks & Investments Card */}
            <Card
              className="bg-black cursor-pointer hover:shadow-soft-lg transition-all duration-300 hover:scale-[1.02]"
              onClick={() => handleCardClick('investments')}
            >
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-indigo-600" />
                  </div>
                  <span className='text-white'>Stocks & Investments</span>
                </CardTitle>
                <CardDescription className='text-white'>Your investment portfolio</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="text-gray-300 text-2xl font-semibold">{formatCurrency(totalInvestmentValue)}</div>
                    <div className="text-gray-300 text-sm text-muted-foreground">Current Value</div>
                  </div>
                  <div className={`flex items-center text-sm ${totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {totalGainLoss >= 0 ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                    Today's Change: {formatCurrency(Math.abs(totalGainLoss))} ({totalGainLossPercent >= 0 ? '+' : ''}{totalGainLossPercent.toFixed(2)}%)
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-black hover:shadow-soft-lg transition-shadow">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-green-600" />
                  </div>
                  <span className='text-white'>This Month</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white text-sm text-muted-foreground">Income</span>
                  <span className="text-gray-300 font-medium text-green-600">+₹4,200</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white text-sm text-muted-foreground">Expenses</span>
                  <span className="text-gray-300 text-white font-medium">₹2,850</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300 text-sm text-muted-foreground">Savings</span>
                  <span className="font-medium text-blue-600">₹1,350</span>
                </div>
              </CardContent>
            </Card>

            {/* Recent Insights */}
            <Card
              id="insights-card"
              className="bg-black cursor-pointer hover:shadow-soft-lg transition-all duration-300 hover:scale-[1.02]"
              onClick={() => handleCardClick('spending')}
            >
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                  </div>
                  <span className='text-white'>Recent Insights</span>
                  {isFirstTime && (
                    <div className="w-2 h-2 bg-orange-600 rounded-full animate-pulse ml-2" />
                  )}
                </CardTitle>
                <CardDescription className='text-white'>AI-powered financial analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-3xl">
                    <div>
                      <p className="text-gray-800 text-sm font-medium">Dining Out Alert</p>
                      <p className="text-gray-800 text-xs text-muted-foreground">35% above average</p>
                    </div>
                    <div className="text-orange-600">
                      <ArrowUp className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-3xl">
                    <div>
                      <p className="text-gray-800 text-sm font-medium">Great Savings</p>
                      <p className="text-gray-800 text-xs text-muted-foreground">12% below budget</p>
                    </div>
                    <div className="text-green-600">
                      <ArrowDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        ) : (
          /* Focused Card View */
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
            <Card className="w-full max-w-7xl max-h-[90vh] overflow-auto shadow-soft-lg">
              <CardHeader className="sticky top-0 bg-card border-b border-border z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      {selectedCard === 'networth' && <><TrendingUp className="w-5 h-5 text-green-600" /><span>Net Worth Analysis</span></>}
                      {selectedCard === 'goals' && <><Target className="w-5 h-5 text-blue-600" /><span>Financial Goals</span></>}
                      {selectedCard === 'spending' && <><AlertTriangle className="w-5 h-5 text-orange-600" /><span>Spending Insights</span></>}
                      {selectedCard === 'loans' && <><Building className="w-5 h-5 text-purple-600" /><span>Loans & EMI Management</span></>}
                      {selectedCard === 'credit' && <><CreditCard className="w-5 h-5 text-red-600" /><span>Credit Card Analysis</span></>}
                      {selectedCard === 'investments' && <><BarChart3 className="w-5 h-5 text-indigo-600" /><span>Investment Portfolio</span></>}
                    </CardTitle>
                    <CardDescription>Detailed view and insights</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleCloseCard}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {selectedCard === 'networth' && (
                  <div className="flex space-x-2 mt-4">
                    {['1M', '6M', '1Y', 'All'].map((period) => (
                      <Button
                        key={period}
                        variant={timeframe === period ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setTimeframe(period)}
                        className={timeframe === period ? 'gradient-accent text-white' : ''}
                      >
                        {period}
                      </Button>
                    ))}
                  </div>
                )}
              </CardHeader>

              <CardContent className="p-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Left Column - Detailed Data */}
                  <div>
                    {selectedCard === 'networth' && (
                      <div>
                        <div className="h-64 mb-8">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={netWorthData}>
                              <XAxis dataKey="month" />
                              <YAxis />
                              <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="text-center p-4 bg-green-50 rounded-lg">
                            <div className="text-2xl font-semibold text-green-600">₹54,500</div>
                            <div className="text-sm text-muted-foreground">Current Net Worth</div>
                          </div>
                          <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <div className="text-2xl font-semibold text-blue-600">+₹9,500</div>
                            <div className="text-sm text-muted-foreground">YTD Growth</div>
                          </div>
                          <div className="text-center p-4 bg-purple-50 rounded-lg">
                            <div className="text-2xl font-semibold text-purple-600">21.1%</div>
                            <div className="text-sm text-muted-foreground">Growth Rate</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedCard === 'goals' && (
                      <div className="space-y-6">
                        {goals.map((goal, index) => (
                          <div key={index} className="p-6 border border-border rounded-lg">
                            <div className="flex justify-between items-center mb-4">
                              <h3 className="font-medium">{goal.name}</h3>
                              <span className="text-2xl font-semibold">{goal.progress}%</span>
                            </div>
                            <Progress value={goal.progress} className="mb-4 h-3" />
                            <div className="flex justify-between text-sm text-muted-foreground">
                              <span>₹{goal.current.toLocaleString()} saved</span>
                              <span>Goal: ₹{goal.target.toLocaleString()}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {selectedCard === 'loans' && (
                      <div className="space-y-6">
                        <h3 className="text-lg font-medium mb-4">Active Loans</h3>
                        {loansData.map((loan) => (
                          <div key={loan.id} className="p-6 border border-border rounded-lg">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h4 className="font-medium">{loan.type}</h4>
                                <p className="text-sm text-muted-foreground">Principal: {formatCurrency(loan.principal)}</p>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-semibold">{formatCurrency(loan.currentBalance)}</div>
                                <div className="text-sm text-muted-foreground">Outstanding</div>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">Interest Rate:</span>
                                <span className="ml-2 font-medium">{loan.interestRate}%</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">EMI Amount:</span>
                                <span className="ml-2 font-medium">{formatCurrency(loan.emiAmount)}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Next Due:</span>
                                <span className="ml-2 font-medium">{formatDate(loan.nextDueDate)}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Remaining:</span>
                                <span className="ml-2 font-medium">{loan.remainingTenure}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {selectedCard === 'credit' && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium mb-4">Spending by Category</h3>
                          <div className="h-64 mb-6">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={spendingByCategory}
                                  cx="50%"
                                  cy="50%"
                                  outerRadius={80}
                                  dataKey="amount"
                                  label={({ category, amount }) => `${category}: ₹${amount}`}
                                >
                                  {spendingByCategory.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                  ))}
                                </Pie>
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium mb-4">Recent Transactions</h3>
                          <div className="space-y-3">
                            {recentTransactions.map((transaction) => (
                              <div key={transaction.id} className="flex justify-between items-center p-3 border border-border rounded-lg">
                                <div>
                                  <p className="font-medium">{transaction.merchant}</p>
                                  <p className="text-sm text-muted-foreground">{transaction.category} • {transaction.date}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium">₹{transaction.amount}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedCard === 'investments' && (
                      <div>
                        <h3 className="text-lg font-medium mb-4">Portfolio Holdings</h3>
                        <div className="space-y-4">
                          {investmentPortfolio.map((investment) => (
                            <div key={investment.id} className="p-4 border border-border rounded-lg">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h4 className="font-medium">{investment.name}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {investment.quantity} {investment.type === 'stock' ? 'shares' : 'units'} × ₹{investment.currentPrice}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <div className="font-medium">{formatCurrency(investment.totalValue)}</div>
                                  <div className={`text-sm ${investment.gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {investment.gainLoss >= 0 ? '+' : ''}{formatCurrency(investment.gainLoss)} ({investment.gainLossPercent >= 0 ? '+' : ''}{investment.gainLossPercent.toFixed(2)}%)
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedCard === 'spending' && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="p-6 border border-orange-200 bg-orange-50 rounded-lg">
                            <h3 className="font-medium text-orange-800 mb-2">Dining Out Alert</h3>
                            <p className="text-sm text-orange-700 mb-4">
                              Your dining expenses are 35% higher than usual this month.
                            </p>
                            <div className="text-2xl font-semibold text-orange-600">₹456</div>
                            <div className="text-sm text-orange-600">vs ₹338 average</div>
                          </div>

                          <div className="p-6 border border-green-200 bg-green-50 rounded-lg">
                            <h3 className="font-medium text-green-800 mb-2">Great Savings!</h3>
                            <p className="text-sm text-green-700 mb-4">
                              You're spending 12% less on groceries while maintaining your budget.
                            </p>
                            <div className="text-2xl font-semibold text-green-600">₹298</div>
                            <div className="text-sm text-green-600">vs ₹339 average</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column - AI Insights & Recommendations */}
                  <div>
                    <h3 className="text-lg font-medium mb-6 flex items-center">
                      <Lightbulb className="w-5 h-5 mr-2 text-yellow-600" />
                      {selectedCard === 'loans' && 'AI-Powered Recommendations'}
                      {selectedCard === 'credit' && 'Smart Recommendations'}
                      {selectedCard === 'investments' && 'Market Opportunities & Insights'}
                      {(selectedCard === 'networth' || selectedCard === 'goals' || selectedCard === 'spending') && 'AI Insights'}
                    </h3>

                    <div className="space-y-6">
                      {selectedCard === 'loans' && (
                        <>
                          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="flex items-start space-x-3">
                              <Star className="w-5 h-5 text-blue-600 mt-0.5" />
                              <div>
                                <h4 className="font-medium text-blue-800 mb-2">Refinancing Opportunity</h4>
                                <p className="text-sm text-blue-700">
                                  Based on your credit score of 785, you may be eligible for these lower-interest refinancing options.
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                            <div className="flex items-start space-x-3">
                              <Award className="w-5 h-5 text-green-600 mt-0.5" />
                              <div>
                                <h4 className="font-medium text-green-800 mb-2">Pre-payment Insight</h4>
                                <p className="text-sm text-green-700">
                                  Pre-paying an extra ₹5,000/month on your car loan could save you ₹45,000 in interest.
                                </p>
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      {selectedCard === 'credit' && (
                        <>
                          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                            <div className="flex items-start space-x-3">
                              <Clock className="w-5 h-5 text-yellow-600 mt-0.5" />
                              <div>
                                <h4 className="font-medium text-yellow-800 mb-2">Expiring Rewards</h4>
                                <p className="text-sm text-yellow-700">
                                  You have 500 reward points expiring next week. Here's where you can use them.
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                            <div className="flex items-start space-x-3">
                              <TrendingUp className="w-5 h-5 text-orange-600 mt-0.5" />
                              <div>
                                <h4 className="font-medium text-orange-800 mb-2">Spending Pattern</h4>
                                <p className="text-sm text-orange-700">
                                  Your spending on dining is up 20% this month compared to last.
                                </p>
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      {selectedCard === 'investments' && (
                        <>
                          <div>
                            <h4 className="font-medium mb-3">Trending Stocks to Consider:</h4>
                            <div className="space-y-3">
                              {trendingStocks.map((stock, index) => (
                                <div key={index} className="p-3 border border-border rounded-lg">
                                  <div className="flex justify-between items-start mb-2">
                                    <div>
                                      <p className="font-medium">{stock.name}</p>
                                      <p className="text-sm text-muted-foreground">{stock.symbol}</p>
                                    </div>
                                    <div className="text-green-600 font-medium text-sm">{stock.change}</div>
                                  </div>
                                  <p className="text-xs text-muted-foreground">{stock.rationale}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                            <div className="flex items-start space-x-3">
                              <PieChartIcon className="w-5 h-5 text-purple-600 mt-0.5" />
                              <div>
                                <h4 className="font-medium text-purple-800 mb-2">Portfolio Insight</h4>
                                <p className="text-sm text-purple-700">
                                  Your portfolio has a high concentration in the tech sector. Consider diversifying with these top-rated funds in other sectors.
                                </p>
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      {(selectedCard === 'networth' || selectedCard === 'goals' || selectedCard === 'spending') && (
                        <>
                          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="flex items-start space-x-3">
                              <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
                              <div>
                                <h4 className="font-medium text-blue-800 mb-2">Financial Health Score</h4>
                                <p className="text-sm text-blue-700">
                                  Your financial health score has improved by 12 points this quarter. Keep up the great work!
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                            <div className="flex items-start space-x-3">
                              <Target className="w-5 h-5 text-green-600 mt-0.5" />
                              <div>
                                <h4 className="font-medium text-green-800 mb-2">Goal Achievement</h4>
                                <p className="text-sm text-green-700">
                                  You're on track to meet your emergency fund goal 3 months ahead of schedule.
                                </p>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>

              {/* Contextual Chat Bar */}
              <div className="sticky bottom-0 bg-card border-t border-border p-4">
                <div className="flex items-center space-x-4 bg-muted/50 rounded-xl p-3">
                  <Input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder={
                      selectedCard === 'networth' ? 'Ask a question about your net worth...' :
                        selectedCard === 'goals' ? 'Ask about your financial goals...' :
                          selectedCard === 'loans' ? 'Ask about your loans, EMIs, or refinancing options...' :
                            selectedCard === 'credit' ? 'Ask about your spending, recent transactions, or rewards...' :
                              selectedCard === 'investments' ? 'Ask about your portfolio, a specific stock, or market trends...' :
                                'Ask about your spending patterns...'
                    }
                    className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button
                    size="sm"
                    onClick={handleSendMessage}
                    disabled={!chatInput.trim()}
                    className="gradient-accent hover:gradient-accent-hover text-white"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
        {/* Header */}
        <footer className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-white/40 backdrop-blur-md border border-border shadow-xl rounded-2xl px-6 py-3 flex items-center space-x-80">
          <div className="flex items-center space-x-2">
            {/* <div className="w-8 h-8 gradient-accent rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div> */}
            <h1 className="text-base font-semibold">Hi {userName}</h1>
          </div>

          <div className="flex items-center space-x-3 ml-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/chat')}>
              <MessageCircle className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="w-5 h-5" />
            </Button>
          </div>
        </footer>
      </main>
    </div>
  );
}