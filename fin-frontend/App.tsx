import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { Homepage } from './components/Homepage';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { ConnectAccounts } from './components/ConnectAccounts';
import { BuildingTwin } from './components/BuildingTwin';
import { Dashboard } from './components/Dashboard';
import { Chat } from './components/Chat';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [connectedAccounts, setConnectedAccounts] = useState<string[]>([]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setUserName('Alex');
    setIsFirstTime(false);
  };

  const handleSignup = () => {
    setIsAuthenticated(true);
    setUserName('Alex');
    setIsFirstTime(true);
  };

  const handleAccountsConnected = (accounts: string[]) => {
    setConnectedAccounts(accounts);
  };

  const handleOnboardingComplete = () => {
    setIsFirstTime(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserName('');
    setIsFirstTime(true);
    setConnectedAccounts([]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />

        <Route path="/login" element={
          <Login onLogin={handleLogin} />
        } />

        <Route path="/signup" element={
          <Signup onSignup={handleSignup} />
        } />

        <Route path="/connect-accounts" element={
          isAuthenticated ? (
            <ConnectAccounts onAccountsConnected={handleAccountsConnected} userName={userName} />
          ) : (
            <Navigate to="/" />
          )
        } />

        <Route path="/building-twin" element={
          isAuthenticated && connectedAccounts.length > 0 ? (
            <BuildingTwin connectedAccounts={connectedAccounts} onComplete={() => { }} />
          ) : (
            <Navigate to="/" />
          )
        } />

        <Route path="/dashboard" element={
          isAuthenticated ? (
            <Dashboard
              userName={userName}
              isFirstTime={isFirstTime}
              onOnboardingComplete={handleOnboardingComplete}
            />
          ) : (
            <Navigate to="/" />
          )
        } />

        <Route path="/chat" element={
          isAuthenticated ? (
            <Chat userName={userName} />
          ) : (
            <Navigate to="/" />
          )
        } />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
