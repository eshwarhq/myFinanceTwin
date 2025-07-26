import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Mic,
  Sparkles,
  MessageSquare,
  TrendingUp,
  Search,
  Puzzle,
  Download,
  Shield,
  Check,
  DollarSign,
  Volume2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Homepage() {
  const navigate = useNavigate();
  const [chatInput, setChatInput] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const coreFeatures = [
    {
      icon: MessageSquare,
      title: "Dynamic Future Simulations",
      description: "Forecast net worth, EMIs, and investment growth with live charts."
    },
    {
      icon: TrendingUp,
      title: "Goal-based Coaching",
      description: "Set milestones (e.g., \"Buy a home by 2028\") and track progress."
    },
    {
      icon: Search,
      title: "Anomaly Detection",
      description: "Spot unusual spending or investment behavior in real time."
    },
    {
      icon: Puzzle,
      title: "Explainable Insights",
      description: "Tap \"How?\" to see transparent calculations and reasoning."
    },
    {
      icon: Download,
      title: "Exportable Reports",
      description: "Download summaries as PDF or JSON for your records."
    },
    {
      icon: Shield,
      title: "Zero-Trust Privacy Controls",
      description: "Full transparency, revocable access, and audit logs."
    }
  ];

  const securityPromises = [
    "We use a Zero-trust privacy architecture.",
    "No raw data is stored. Each query fetches ephemeral snapshots, encrypted throughout.",
    "You get Explainable AI, not black-box answers. Every insight includes a \"How did I calculate this?\" panel."
  ];

  const languages = ["English", "हिन्दी", "বাংলা"];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Layer 1: Soft flowing diagonal gradient */}
        <div className="absolute top-0 left-0 w-[150%] h-[150%] bg-gradient-to-br from-blue-100 via-cyan-100 to-blue-200 transform -rotate-12 opacity-5 blur-2xl" />

        {/* Layer 2: Abstract blob top-left */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-tr from-cyan-200 via-blue-100 to-cyan-100 transform rotate-45 scale-125 rounded-[60%] blur-[80px] opacity-20 animate-float" style={{ animationDelay: '2s' }} />

        {/* Layer 3: Abstract blob bottom-right */}
        <div className="absolute bottom-10 right-10 w-[30rem] h-[30rem] bg-gradient-to-br from-blue-100 via-cyan-100 to-blue-200 rounded-[50%] blur-[120px] opacity-15 animate-float" style={{ animationDelay: '4s' }} />

        {/* Layer 4: Curved organic strip near center */}
        <div className="absolute top-[35%] left-[25%] w-[50rem] h-[20rem] bg-gradient-to-r from-cyan-50 via-blue-100 to-cyan-200 skew-y-6 rounded-[30%] blur-[100px] opacity-10 animate-float" style={{ animationDelay: '1s' }} />

        {/* Layer 5: Subtle background light wash */}
        <div className="absolute inset-0 bg-gradient-radial from-blue-50 via-cyan-50 to-transparent opacity-10" />
      </div>


      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-glass border-b border-border/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-accent rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-medium">MyFinance Twin AI</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#features"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById('features');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }} className="text-secondary-foreground hover:text-primary transition-colors">Features</a>
              <a href="#security"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById('security');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }} className="text-secondary-foreground hover:text-primary transition-colors">Security</a>
              <Button
                onClick={() => navigate('/login')}
                className="rounded-2xl gradient-accent hover:gradient-accent-hover text-white border-0 shadow-soft"
              >
                Sign In
              </Button>
            </div>

            <Button
              onClick={() => navigate('/login')}
              className="rounded-full md:hidden gradient-accent hover:gradient-accent-hover text-white border-0 shadow-soft"
            >
              Sign In
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="mb-6 max-w-3xl mx-auto text-5xl font-medium">
            AI That Understands Your Finances <br />
            Not Just Anyone's.
          </h1>

          <h2 className="mb-12 text-muted-foreground max-w-2xl text-base mx-auto">
            MyFinance Twin AI is your intelligent financial co-pilot that simulates your future, spots anomalies, and guides you to better decisions.
          </h2>

          {/* Chat Input Bar */}
          <div className="max-w-2xl mx-auto">
            <div
              className={`relative bg-card border-2 rounded-full p-4 shadow-soft-lg transition-all duration-300 ${isHovered ? 'border-primary shadow-lg' : 'border-border'
                }`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <Input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask me anything about your finances..."
                    className="border-0 bg-transparent ml-4 text-lg p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && chatInput.trim()) {
                        navigate('/signup');
                      }
                    }}
                  />
                </div>
                <button className="p-2 hover:bg-muted rounded-full transition-colors group">
                  <Mic className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                </button>
              </div>

              {isHovered && (
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 pointer-events-none" />
              )}
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              Start your conversation to create your personalized financial twin
            </p>
          </div>
        </div>
      </section>

      {/* Section 1: Core Features Showcase */}
      <section id="features" className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="mb-4">A Co-pilot for Your Entire Financial Life</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-card rounded-2xl p-8 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:scale-[1.02] border border-border/50"
                >
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                    <IconComponent className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 2: Security & Trust */}
      <section id="security" className="bg-muted/30 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Column */}
              <div>
                <p className="text-sm text-primary font-medium mb-2 uppercase tracking-wide">
                  Not just a chatbot.
                </p>
                <h2 className="mb-6">A Financial Twin.</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Where others give generic tips, MyFinance Twin AI embeds your actual data to simulate the future and coach you dynamically. It merges real-time, unified financial data with best-in-class reasoning to feel like your second brain—not an app.
                </p>
              </div>

              {/* Right Column */}
              <div>
                <h3 className="mb-8">Your Data Stays Yours. Period.</h3>
                <div className="space-y-6">
                  {securityPromises.map((promise, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {promise}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Voice & Language */}
      <section className="relative py-20 overflow-hidden">
        {/* Soundwave Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5" />
          {/* Abstract soundwave lines */}
          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1200 400">
            <defs>
              <linearGradient id="soundwave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1a73e8" />
                <stop offset="100%" stopColor="#4fc3f7" />
              </linearGradient>
            </defs>
            {/* Soundwave bars */}
            {[...Array(60)].map((_, i) => {
              const height = Math.sin(i * 0.3) * 40 + 80;
              const x = (i * 20) + 50;
              return (
                <rect
                  key={i}
                  x={x}
                  y={200 - height / 2}
                  width="8"
                  height={height}
                  fill="url(#soundwave-gradient)"
                  opacity="0.6"
                  className="animate-pulse"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              );
            })}
          </svg>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-6">A Voice-First, Multilingual Experience</h2>
            <p className="text-muted-foreground text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
              Talk to your finances naturally. Ask complex questions in English, Hindi, or your preferred regional language, anywhere, anytime.
            </p>

            {/* Language Pills */}
            <div className="flex justify-center items-center space-x-4 mb-8">
              <Volume2 className="w-6 h-6 text-primary" />
              <div className="flex space-x-3">
                {languages.map((language, index) => (
                  <div
                    key={index}
                    className="px-6 py-3 bg-card rounded-full border border-border shadow-soft text-sm font-medium hover:shadow-soft-lg transition-shadow"
                  >
                    {language}
                  </div>
                ))}
                <div className="px-6 py-3 bg-muted rounded-full border border-border text-sm text-muted-foreground">
                  +12 more
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Original Features Preview Section - Now acts as final CTA */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="mb-4">Ready to Meet Your Financial Twin?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of users who have transformed their financial decision-making with AI-powered insights.
            </p>
          </div>

          {/* Original Features Preview Section - Now acts as final CTA */}
          <section className="container mx-auto px-6 py-20">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="mb-4">Ready to Meet Your Financial Twin?</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Join thousands of users who have transformed their financial decision-making with AI-powered insights.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: 'Intelligent Analysis',
                    icon: (
                      <div className="w-6 h-6 flex items-center justify-center">
                        <Sparkles className="w-full h-full text-blue-600" />
                      </div>
                    ),
                    cardBg: 'bg-blue-200',
                    iconBg: 'bg-blue-100',
                    text: 'Advanced AI that understands your unique financial patterns and provides personalized insights.'
                  },
                  {
                    title: 'Future Simulation',
                    icon: (
                      <div className="w-6 h-6 bg-green-600 rounded-full" />
                    ),
                    cardBg: 'bg-green-200',
                    iconBg: 'bg-green-100',
                    text: 'Visualize different financial scenarios and their long-term impact on your goals.'
                  },
                  {
                    title: 'Anomaly Detection',
                    icon: (
                      <div className="w-6 h-6 bg-purple-600" />
                    ),
                    cardBg: 'bg-purple-200',
                    iconBg: 'bg-purple-100',
                    text: 'Automatically spot unusual spending patterns and potential financial risks.'
                  }
                ].map(({ title, icon, cardBg, iconBg, text }) => (
                  <div
                    key={title}
                    className={`rounded-2xl p-8 transition-shadow shadow-soft hover:shadow-soft-lg ${cardBg}`}
                  >
                    {/* Optional icon box
                      <div
                        className={`w-12 h-12 ${iconBg} rounded-full flex items-center justify-center mb-4`}
                      >
                        {icon}
                      </div>
                    */}
                    <h3 className="text-xl mb-3 text-left">{title}</h3>
                    <p className="text-sm text-muted-foreground text-left">{text}</p>
                  </div>
                ))}
              </div>


            </div>
          </section>


          {/* Final CTA */}
          <div className="text-center mt-16">
            <Button
              onClick={() => navigate('/signup')}
              size="lg"
              className="rounded-full gradient-accent hover:gradient-accent-hover text-white border-0 shadow-soft-lg px-8 h-14 text-lg"
            >
              Create Your Financial Twin
            </Button>
            <p className="mt-4 text-sm text-muted-foreground">
              Free to start • No credit card required • 5-minute setup
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}