
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { WalletSelector } from "./components/WalletSelector";
import { ConnectedWallet } from "./components/ConnectedWallet";
import { LanguagePicker } from "./components/LanguagePicker";
import { toast } from "sonner";

interface WalletProps {
  onConnect: (walletType: string) => void;
  selectedWallet: string | null;
}

export function WalletConnect({ onConnect, selectedWallet }: WalletProps) {
  const [open, setOpen] = useState(false);
  const [balances, setBalances] = useState({
    QNTM: "25000.00",
    ETH: "1.2345",
    BTC: "0.0821",
    SOL: "45.678",
    USDT: "5000.00"
  });
  const [showBalances, setShowBalances] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedWalletType, setSelectedWalletType] = useState<string | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  const handleConnect = async (walletType: string) => {
    setConnectionStatus('connecting');
    setSelectedWalletType(walletType);
    
    try {
      onConnect(walletType);
      setOpen(false);
      setConnectionStatus('connected');
      
      setTimeout(() => {
        setShowBalances(true);
        toast.success(`Connected successfully`);
      }, 500);
    } catch (error) {
      console.error("Wallet connection error:", error);
      setConnectionStatus('disconnected');
      toast.error("Failed to connect wallet");
    }
  };

  const handleDisconnect = () => {
    setConnectionStatus('disconnected');
    setShowBalances(false);
    setSelectedWalletType(null);
    onConnect('');
    toast.success("Disconnected successfully");
  };

  const handleRefreshBalance = () => {
    setIsRefreshing(true);
    
    setTimeout(() => {
      setBalances(prev => ({
        ...prev,
        QNTM: (parseFloat(prev.QNTM) + (Math.random() * 10 - 5)).toFixed(2),
        ETH: (parseFloat(prev.ETH) + (Math.random() * 0.05 - 0.025)).toFixed(4),
        BTC: (parseFloat(prev.BTC) + (Math.random() * 0.005 - 0.0025)).toFixed(4),
        SOL: (parseFloat(prev.SOL) + (Math.random() * 0.5 - 0.25)).toFixed(3),
        USDT: (parseFloat(prev.USDT) + (Math.random() * 10 - 5)).toFixed(2)
      }));
      setIsRefreshing(false);
      toast.success("Balance refreshed successfully");
    }, 1500);
  };

  if (!selectedWallet) {
    return (
      <>
        <Button 
          onClick={() => setOpen(true)}
          className="bg-black/40 hover:bg-black/60 text-white border border-purple-500/30 transition-all duration-300 hover:scale-105"
        >
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </Button>

        <WalletSelector
          isOpen={open}
          onClose={() => setOpen(false)}
          onConnect={handleConnect}
          selectedWalletType={selectedWalletType}
          connectionStatus={connectionStatus}
        />
      </>
    );
  }

  return (
    <>
      <ConnectedWallet
        selectedWallet={selectedWallet}
        balances={balances}
        onRefreshBalance={handleRefreshBalance}
        onDisconnect={handleDisconnect}
        isRefreshing={isRefreshing}
        showLanguageSelector={showLanguageSelector}
        onToggleLanguageSelector={() => setShowLanguageSelector(!showLanguageSelector)}
      />
      
      <LanguagePicker
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        showSelector={showLanguageSelector}
        onToggleSelector={() => setShowLanguageSelector(!showLanguageSelector)}
      />
    </>
  );
}
