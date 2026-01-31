
import { useEffect, useState } from 'react';
import { useWallet as useWalletContext } from '@/contexts/wallet-context';
import { 
  setupAccountChangeListener, 
  setupNetworkChangeListener, 
  isMetaMaskInstalled,
  getQuantumSecurityStatus
} from '@/lib/ethers';

export interface QuantumSecurityStatus {
  isQuantumResistant: boolean;
  securityLevel: 'high' | 'medium' | 'low';
  vulnerabilities: number;
  recommendations: string[];
}

export function useWallet() {
  const walletContext = useWalletContext();
  const [quantumSecurity, setQuantumSecurity] = useState<QuantumSecurityStatus | null>(null);
  
  useEffect(() => {
    if (walletContext.isConnected && walletContext.currentWallet === 'metamask') {
      const removeAccountListener = setupAccountChangeListener((accounts) => {
        if (accounts.length === 0) {
          walletContext.disconnectWallet();
        } else if (accounts[0] !== walletContext.walletAddress) {
          walletContext.connectWallet('metamask');
        }
      });
      
      const removeNetworkListener = setupNetworkChangeListener(() => {
        walletContext.connectWallet('metamask');
      });
      
      // Check quantum security status when wallet is connected
      const checkQuantumSecurity = async () => {
        if (walletContext.walletAddress) {
          try {
            const securityStatus = await getQuantumSecurityStatus(walletContext.walletAddress);
            setQuantumSecurity(securityStatus);
          } catch (error) {
            console.error('Error getting quantum security status:', error);
          }
        }
      };
      
      checkQuantumSecurity();
      
      return () => {
        removeAccountListener();
        removeNetworkListener();
      };
    }
  }, [walletContext.isConnected, walletContext.currentWallet, walletContext.walletAddress]);

  return {
    ...walletContext,
    isMetaMaskInstalled,
    quantumSecurity
  };
}
