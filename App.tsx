import { useState } from 'react';
import { Homepage } from './components/Homepage';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { ConnectAccounts } from './components/ConnectAccounts';
import { BuildingTwin } from './components/BuildingTwin';
import { Dashboard } from './components/Dashboard';
import { Chat } from './components/Chat';

export type Page = 'home' | 'login' | 'signup' | 'connect-accounts' | 'building-twin' | 'dashboard' | 'chat';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [connectedAccounts, setConnectedAccounts] = useState<string[]>([]);

  const handleNavigation = (page: Page) => {
    setCurrentPage(page);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setUserName('Alex'); // Mock user name
    setIsFirstTime(false); // Existing user
    setCurrentPage('dashboard');
  };

  const handleSignup = () => {
    setIsAuthenticated(true);
    setUserName('Alex'); // Mock user name
    setIsFirstTime(true); // New user
    setCurrentPage('connect-accounts'); // Go to onboarding flow
  };

  const handleAccountsConnected = (accounts: string[]) => {
    setConnectedAccounts(accounts);
    setCurrentPage('building-twin');
  };

  const handleTwinBuilt = () => {
    setCurrentPage('dashboard');
  };

  const handleOnboardingComplete = () => {
    setIsFirstTime(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserName('');
    setIsFirstTime(true);
    setConnectedAccounts([]);
    setCurrentPage('home');
  };

  // Render the appropriate page
  switch (currentPage) {
    case 'home':
      return <Homepage onNavigate={handleNavigation} />;
    
    case 'login':
      return <Login onNavigate={handleNavigation} onLogin={handleLogin} />;
    
    case 'signup':
      return <Signup onNavigate={handleNavigation} onSignup={handleSignup} />;
    
    case 'connect-accounts':
      if (!isAuthenticated) {
        return <Homepage onNavigate={handleNavigation} />;
      }
      return <ConnectAccounts onAccountsConnected={handleAccountsConnected} userName={userName} />;
    
    case 'building-twin':
      if (!isAuthenticated || connectedAccounts.length === 0) {
        return <Homepage onNavigate={handleNavigation} />;
      }
      return <BuildingTwin onComplete={handleTwinBuilt} connectedAccounts={connectedAccounts} />;
    
    case 'dashboard':
      if (!isAuthenticated) {
        return <Homepage onNavigate={handleNavigation} />;
      }
      return <Dashboard 
        onNavigate={handleNavigation} 
        userName={userName} 
        isFirstTime={isFirstTime}
        onOnboardingComplete={handleOnboardingComplete}
      />;
    
    case 'chat':
      if (!isAuthenticated) {
        return <Homepage onNavigate={handleNavigation} />;
      }
      return <Chat onNavigate={handleNavigation} userName={userName} />;
    
    default:
      return <Homepage onNavigate={handleNavigation} />;
  }
}