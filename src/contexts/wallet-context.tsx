import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'sonner';

// Define supported wallet types
export type WalletType = 'metamask' | 'trustwallet' | 'phantom' | 'walletconnect' | null;

interface WalletContextProps {
  currentWallet: WalletType;
  walletAddress: string | null;
  chainId: number | null;
  balance: string | null;
  isConnecting: boolean;
  isConnected: boolean;
  connectWallet: (walletType: WalletType) => Promise<boolean>;
  disconnectWallet: () => void;
  getWalletInfo: () => {
    address: string | null;
    chainId: number | null;
    balance: string | null;
  };
}

const WalletContext = createContext<WalletContextProps>({
  currentWallet: null,
  walletAddress: null,
  chainId: null,
  balance: null,
  isConnecting: false,
  isConnected: false,
  connectWallet: async () => false,
  disconnectWallet: () => {},
  getWalletInfo: () => ({ address: null, chainId: null, balance: null }),
});

export const useWallet = () => useContext(WalletContext);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentWallet, setCurrentWallet] = useState<WalletType>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Check if wallet was previously connected
    const savedWalletType = localStorage.getItem('walletType') as WalletType;
    if (savedWalletType) {
      connectWallet(savedWalletType).catch(console.error);
    }
    
    // Set up event listeners for wallet changes
    const setupWalletListeners = async () => {
      if (window.ethereum) {
        window.ethereum.on('accountsChanged', handleAccountsChanged);
        window.ethereum.on('chainChanged', handleChainChanged);
        window.ethereum.on('disconnect', handleDisconnect);
      }
    };
    
    setupWalletListeners();
    
    return () => {
      // Clean up listeners
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
        window.ethereum.removeListener('disconnect', handleDisconnect);
      }
    };
  }, []);

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      // User disconnected wallet
      disconnectWallet();
    } else {
      // Account changed
      setWalletAddress(accounts[0]);
      updateWalletInfo(accounts[0]);
    }
  };

  const handleChainChanged = (newChainId: string) => {
    // Chain ID is in hex, convert to number
    setChainId(parseInt(newChainId, 16));
    toast.info('Network changed', {
      description: `You're now connected to a different blockchain network.`
    });
  };

  const handleDisconnect = () => {
    disconnectWallet();
  };

  const connectWallet = async (walletType: WalletType): Promise<boolean> => {
    setIsConnecting(true);
    
    try {
      let provider;
      
      switch (walletType) {
        case 'metamask':
          provider = window.ethereum;
          if (!provider) {
            throw new Error('MetaMask is not installed');
          }
          break;
        
        case 'trustwallet':
          provider = window.trustwallet || window.ethereum;
          if (!provider) {
            throw new Error('Trust Wallet is not installed');
          }
          break;
        
        case 'phantom':
          provider = window.phantom?.solana;
          if (!provider) {
            throw new Error('Phantom wallet is not installed');
          }
          // For Phantom, use Solana-specific methods
          const connection = await provider.connect();
          setWalletAddress(connection.publicKey.toString());
          setCurrentWallet('phantom');
          setIsConnected(true);
          localStorage.setItem('walletType', 'phantom');
          
          toast.success('Wallet connected', {
            description: `Connected to Phantom wallet`
          });
          setIsConnecting(false);
          return true;
        
        case 'walletconnect':
          // WalletConnect implementation would go here
          throw new Error('WalletConnect integration coming soon');
        
        default:
          throw new Error('Unsupported wallet type');
      }
      
      // For EVM-compatible wallets (MetaMask, Trust Wallet)
      if (['metamask', 'trustwallet'].includes(walletType)) {
        const accounts = await provider.request({ method: 'eth_requestAccounts' });
        
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setCurrentWallet(walletType);
          setIsConnected(true);
          localStorage.setItem('walletType', walletType);
          
          // Get chain ID
          const chainId = await provider.request({ method: 'eth_chainId' });
          setChainId(parseInt(chainId, 16));
          
          // Get balance
          updateWalletInfo(accounts[0]);
          
          toast.success('Wallet connected', {
            description: `Connected to ${walletType === 'metamask' ? 'MetaMask' : 'Trust Wallet'}`
          });
          
          setIsConnecting(false);
          return true;
        }
      }
      
      setIsConnecting(false);
      return false;
    } catch (error: any) {
      console.error('Error connecting wallet:', error);
      
      toast.error('Connection failed', {
        description: error.message || 'Failed to connect wallet'
      });
      
      setIsConnecting(false);
      return false;
    }
  };

  const updateWalletInfo = async (address: string) => {
    try {
      if (currentWallet === 'phantom') {
        // Phantom/Solana specific balance fetching would go here
        setBalance('0.0 SOL');
        return;
      }

      // For EVM wallets
      if (window.ethereum && address) {
        const balanceHex = await window.ethereum.request({
          method: 'eth_getBalance',
          params: [address, 'latest']
        });
        
        // Convert balance from wei to ether
        const balanceInWei = parseInt(balanceHex, 16);
        const balanceInEther = balanceInWei / 1e18;
        setBalance(balanceInEther.toFixed(4));
      }
    } catch (error) {
      console.error('Error fetching wallet info:', error);
    }
  };

  const disconnectWallet = () => {
    setCurrentWallet(null);
    setWalletAddress(null);
    setChainId(null);
    setBalance(null);
    setIsConnected(false);
    localStorage.removeItem('walletType');
    
    toast.info('Wallet disconnected', {
      description: 'Your wallet has been disconnected'
    });
  };

  const getWalletInfo = () => {
    return {
      address: walletAddress,
      chainId: chainId,
      balance: balance
    };
  };

  const value = {
    currentWallet,
    walletAddress,
    chainId,
    balance,
    isConnecting,
    isConnected,
    connectWallet,
    disconnectWallet,
    getWalletInfo
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};
