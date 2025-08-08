
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
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [expandedExplanations, setExpandedExplanations] = useState<Set<string>>(new Set());
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchStream = async (messageId: string, history: any, message: string) => {
    console.log(":::::::::::", messageId, message, history);
    const response = await fetch('http://localhost:5000/api/streamChat',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history, message }),
      });
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (reader) {
      let streamed = '';
      const newMessage: Message = {
        id: messageId + '-ai',
        type: 'ai',
        content: '',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, newMessage]);

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        streamed += decoder.decode(value);

        setMessages(prev =>
          prev.map(msg =>
            msg.id === newMessage.id ? { ...msg, content: streamed } : msg
          )
        );
      }
    }
  };

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

    const lowerCasePrompt = inputValue.toLowerCase();

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Intercept special prompt without API
    if (lowerCasePrompt.includes('protected') || lowerCasePrompt.includes('disaster')) {
      const response: Message = {
        id: `${userMessage.id}-ai`,
        type: 'ai',
        content: "🛡️ You’ve allocated ₹5,00,000 for emergencies, ₹1,200 for insurance, and ₹800 for medical expenses. You’re decently protected, but consider beefing up that health fund, warrior. 🧬",
        timestamp: new Date(),
        hasExplanation: true,
        explanation: "This is based on your categorized budget for emergency, insurance, and medical. Ideally, your emergency fund should cover 3-6 months of essential expenses."
      };
      setMessages(prev => [...prev, response]);
      return;
    }

    if (lowerCasePrompt.includes('enjoy') || lowerCasePrompt.includes('month-end')) {
      const response: Message = {
        id: `${userMessage.id}-ai`,
        type: 'ai',
        content: "🎉 You’ve got ₹2,33,000 for travel, ₹41,500 for dining, and ₹7000 for subscriptions. Go enjoy, but don’t go full YOLO unless you got a backup plan. 😎",
        timestamp: new Date(),
        hasExplanation: true,
        explanation: "These values are derived from your Enjoyment Funds allocation. If you stay within this, your finances won’t ghost you next month."
      };
      setMessages(prev => [...prev, response]);
      return;
    }

    // Default behavior: Call backend for other queries
    const history = messages.map(msg => ({
      role: msg.type === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    // fetchStream(userMessage.id, history, inputValue);
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
      {/* Chat Messages */}
      <div className="flex-1 ml-0 mr-3 px-0 py-6">
        <ScrollArea className="h-auto" ref={scrollAreaRef}>
          <div className="space-y-6 pb-6">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start space-x-3 max-w-2xl ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.type === 'user'
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
                  <div className={`rounded-2xl px-4 py-3 ${message.type === 'user'
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
                          <div className="mt-3 p-3 bg-muted/50 rounded-3xl border-l-2 border-primary">
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
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all duration-300 ${isListening
                  ? 'bg-red-100 text-red-600'
                  : 'hover:bg-muted text-muted-foreground hover:text-primary'
                  }`}>
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
