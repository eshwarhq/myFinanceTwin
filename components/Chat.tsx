import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { 
  ArrowLeft, 
  Mic, 
  Send, 
  User, 
  Bot, 
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ChatProps {
  userName: string;
}

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  hasExplanation?: boolean;
  explanation?: string;
}

export function Chat({ userName }: ChatProps) {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: `Hello ${userName}! I'm your financial twin AI. I can analyze your spending patterns, help with budgeting, answer questions about your investments, and simulate future financial scenarios. What would you like to explore today?`,
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [expandedExplanations, setExpandedExplanations] = useState<Set<string>>(new Set());
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const mockResponses = [
    {
      content: "Based on your spending patterns, I notice you've spent $456 on dining out this month, which is 35% above your usual average of $338. This represents about 12% of your monthly income.",
      hasExplanation: true,
      explanation: "I calculated this by analyzing your transaction history from the past 6 months. Your average monthly dining expenses were $338 ± $45. This month's $456 represents a $118 increase (35% above average). Relative to your $3,800 monthly income, this is 12% of your total earnings."
    },
    {
      content: "Your emergency fund goal is progressing well! You currently have $8,500 saved toward your $15,000 target. At your current savings rate of approximately $400/month, you'll reach your goal in about 16 months.",
      hasExplanation: true,
      explanation: "Target: $15,000 | Current: $8,500 | Remaining: $6,500. Based on your last 3 months of savings deposits averaging $400/month: $6,500 ÷ $400 = 16.25 months to completion."
    },
    {
      content: "Your investment portfolio has grown 8.4% this month, outperforming the S&P 500's 6.2% return. Your current allocation of 65% stocks, 25% bonds, and 10% cash aligns well with your moderate risk tolerance.",
      hasExplanation: true,
      explanation: "Portfolio value start of month: $39,100 | Current: $42,350 | Gain: $3,250 (8.4%). S&P 500 benchmark return: 6.2%. Your allocation percentages are calculated from total portfolio value: Stocks $27,528 (65%), Bonds $10,588 (25%), Cash $4,235 (10%)."
    }
  ];

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: randomResponse.content,
        timestamp: new Date(),
        hasExplanation: randomResponse.hasExplanation,
        explanation: randomResponse.explanation,
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const handleVoiceInput = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    setIsListening(true);
    
    // Simulate voice input
    setTimeout(() => {
      setInputValue("How much did I spend on groceries this month?");
      setIsListening(false);
      inputRef.current?.focus();
    }, 2000);
  };

  const toggleExplanation = (messageId: string) => {
    const newExpanded = new Set(expandedExplanations);
    if (newExpanded.has(messageId)) {
      newExpanded.delete(messageId);
    } else {
      newExpanded.add(messageId);
    }
    setExpandedExplanations(newExpanded);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-soft sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/dashboard')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
              <div className="w-8 h-8 gradient-accent rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-medium">Financial AI Chat</h1>
                <p className="text-sm text-muted-foreground">Your intelligent financial co-pilot</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 container mx-auto px-6 py-6">
        <ScrollArea className="h-[calc(100vh-200px)]" ref={scrollAreaRef}>
          <div className="space-y-6 pb-6">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start space-x-3 max-w-2xl ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === 'user' 
                      ? 'bg-muted' 
                      : 'gradient-accent'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div className={`rounded-2xl px-4 py-3 ${
                    message.type === 'user'
                      ? 'bg-muted text-foreground'
                      : 'bg-card border border-primary/20 text-foreground'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    
                    {/* Explanation Button */}
                    {message.hasExplanation && (
                      <div className="mt-3">
                        <button
                          onClick={() => toggleExplanation(message.id)}
                          className="flex items-center space-x-2 text-xs text-primary hover:text-primary/80 transition-colors"
                        >
                          <span>How did I calculate this?</span>
                          {expandedExplanations.has(message.id) ? (
                            <ChevronUp className="w-3 h-3" />
                          ) : (
                            <ChevronDown className="w-3 h-3" />
                          )}
                        </button>
                        
                        {/* Expanded Explanation */}
                        {expandedExplanations.has(message.id) && (
                          <div className="mt-3 p-3 bg-muted/50 rounded-lg border-l-2 border-primary">
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {message.explanation}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="text-xs text-muted-foreground mt-2">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Input Area */}
      <div className="bg-card border-t border-border p-6">
        <div className="container mx-auto">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me about your finances..."
                className="pr-12 h-12 border-border focus:border-primary transition-colors"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
              />
              
              {/* Voice Input Button */}
              <button
                onClick={handleVoiceInput}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-all duration-300 ${
                  isListening 
                    ? 'bg-red-100 text-red-600' 
                    : 'hover:bg-muted text-muted-foreground hover:text-primary'
                }`}
              >
                {isListening ? (
                  <div className="relative">
                    <div className="w-5 h-5 bg-red-600 rounded-full animate-pulse" />
                    <div className="absolute inset-0 w-5 h-5 bg-red-600 rounded-full animate-pulse-ring" />
                    <div className="absolute -inset-1 w-7 h-7 border-2 border-red-300 rounded-full animate-sound-wave" />
                  </div>
                ) : (
                  <Mic className="w-5 h-5" />
                )}
              </button>
            </div>
            
            <Button 
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="gradient-accent hover:gradient-accent-hover text-white h-12 px-6"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}