import { useState, useEffect } from 'react';
import { Check, Sparkles } from 'lucide-react';

interface BuildingTwinProps {
  onComplete: () => void;
  connectedAccounts: string[];
}

const buildingSteps = [
  { id: 'connecting', text: 'Securely connecting accounts...', duration: 2000 },
  { id: 'analyzing', text: 'Analyzing spending patterns...', duration: 3000 },
  { id: 'forecasting', text: 'Forecasting net worth trajectory...', duration: 2500 },
  { id: 'aligning', text: 'Aligning goals and progress...', duration: 2000 },
  { id: 'preparing', text: 'Preparing your dashboard...', duration: 1500 }
];

export function BuildingTwin({ onComplete, connectedAccounts }: BuildingTwinProps) {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep >= buildingSteps.length) {
      // All steps completed, wait a moment then proceed
      setTimeout(() => {
        onComplete();
      }, 1000);
      return;
    }

    const step = buildingSteps[currentStep];
    const timer = setTimeout(() => {
      setCompletedSteps(prev => [...prev, step.id]);
      setCurrentStep(prev => prev + 1);
    }, step.duration);

    return () => clearTimeout(timer);
  }, [currentStep, onComplete]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl text-center">
        {/* Header */}
        <div className="mb-12">
          <h1 className="mb-4">Building your Financial Twin...</h1>
          <p className="text-muted-foreground">
            We're analyzing your financial footprint across {connectedAccounts.length} connected account{connectedAccounts.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Central Animation */}
        <div className="mb-12 relative">
          <div className="flex justify-center mb-8">
            {/* Central Orb */}
            <div className="relative">
              <div className="w-24 h-24 gradient-accent rounded-full flex items-center justify-center animate-pulse">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
              
              {/* Animated rings */}
              <div className="absolute inset-0 w-24 h-24 border-2 border-primary/20 rounded-full animate-pulse-ring" />
              <div className="absolute inset-0 w-24 h-24 border-2 border-primary/10 rounded-full animate-pulse-ring" style={{ animationDelay: '0.5s' }} />
            </div>
          </div>

          {/* Data Flow Animation */}
          <div className="relative h-32">
            {/* Account nodes */}
            {[...Array(Math.min(connectedAccounts.length, 4))].map((_, index) => {
              const angle = (index * 90) - 45; // Distribute around circle
              const radius = 80;
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;
              
              return (
                <div
                  key={index}
                  className="absolute w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                  }}
                >
                  <div className="w-4 h-4 bg-blue-600 rounded-sm" />
                </div>
              );
            })}

            {/* Animated data points */}
            {currentStep > 0 && [...Array(6)].map((_, index) => (
              <div
                key={index}
                className="absolute w-2 h-2 bg-primary rounded-full opacity-60"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  animation: `float 2s ease-in-out infinite`,
                  animationDelay: `${index * 0.3}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* Progress Checklist */}
        <div className="space-y-4">
          {buildingSteps.map((step, index) => {
            const isCompleted = completedSteps.includes(step.id);
            const isCurrent = index === currentStep && !isCompleted;
            
            return (
              <div
                key={step.id}
                className={`flex items-center justify-center space-x-3 p-4 rounded-xl transition-all duration-500 ${
                  isCompleted 
                    ? 'bg-green-50 text-green-800' 
                    : isCurrent 
                    ? 'bg-blue-50 text-blue-800 animate-pulse' 
                    : 'text-muted-foreground'
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-green-600 text-white' 
                    : isCurrent 
                    ? 'bg-blue-600 text-white' 
                    : 'border-2 border-muted-foreground'
                }`}>
                  {isCompleted ? (
                    <Check className="w-3 h-3" />
                  ) : isCurrent ? (
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  ) : (
                    <div className="w-2 h-2 bg-muted-foreground rounded-full" />
                  )}
                </div>
                <span className={`${isCompleted || isCurrent ? 'font-medium' : ''}`}>
                  {step.text}
                </span>
              </div>
            );
          })}
        </div>

        {/* Progress Indicator */}
        <div className="mt-8">
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div 
              className="h-full gradient-accent transition-all duration-1000 ease-out"
              style={{ 
                width: `${(completedSteps.length / buildingSteps.length) * 100}%` 
              }}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {Math.round((completedSteps.length / buildingSteps.length) * 100)}% complete
          </p>
        </div>

        {/* Completion Message */}
        {completedSteps.length === buildingSteps.length && (
          <div className="mt-8 p-6 bg-green-50 rounded-2xl border border-green-200">
            <div className="flex items-center justify-center space-x-2 text-green-800">
              <Check className="w-6 h-6" />
              <span className="font-medium">Your Financial Twin is ready!</span>
            </div>
            <p className="text-sm text-green-700 mt-2">
              Redirecting you to your personalized dashboard...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}