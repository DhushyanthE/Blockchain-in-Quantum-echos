
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "../ui/button";
import { Logo } from './Logo';
import { useTranslationContext } from '@/contexts/TranslationContext';
import { WalletAddress } from '../wallet/WalletAddress';
import { useWallet } from '@/contexts/wallet-context';
import { Home, Wallet, LineChart, BrainCircuit, Menu, X } from 'lucide-react';

export function AppNavigation() {
  const { t } = useTranslationContext();
  const { walletAddress } = useWallet();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', label: t('navigation', 'home'), icon: <Home className="h-5 w-5" /> },
    { path: '/wallet', label: t('navigation', 'wallet'), icon: <Wallet className="h-5 w-5" /> },
    { path: '/crypto-market', label: t('navigation', 'cryptoMarket'), icon: <LineChart className="h-5 w-5" /> },
    { path: '/quantum-ai', label: t('navigation', 'quantumAI'), icon: <BrainCircuit className="h-5 w-5" /> }
  ];

  return (
    <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-purple-500/20">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Logo />
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2 ml-4">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive(item.path) ? "default" : "ghost"}
                  className={`flex items-center ${
                    isActive(item.path) 
                      ? 'bg-purple-600 text-white hover:bg-purple-700 hover:text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  {item.icon}
                  <span className="ml-2">{item.label}</span>
                </Button>
              </Link>
            ))}
          </nav>

          {/* Wallet Address (Desktop) */}
          <div className="hidden md:flex items-center">
            <WalletAddress address={walletAddress} />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-400"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900/95 border-b border-purple-500/20">
          <div className="container mx-auto px-4 py-3 space-y-2">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button
                  variant={isActive(item.path) ? "default" : "ghost"}
                  className={`w-full justify-start ${
                    isActive(item.path) 
                      ? 'bg-purple-600 text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  {item.icon}
                  <span className="ml-2">{item.label}</span>
                </Button>
              </Link>
            ))}
            
            {/* Wallet Address (Mobile) */}
            <div className="pt-2 border-t border-gray-800">
              <WalletAddress address={walletAddress} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
