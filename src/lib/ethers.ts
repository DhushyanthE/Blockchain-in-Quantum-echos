
import { toast } from "sonner";

/**
 * Check if MetaMask is installed
 * @returns boolean indicating if MetaMask is available
 */
export function isMetaMaskInstalled(): boolean {
  return window.ethereum && window.ethereum.isMetaMask;
}

/**
 * Connect to the specified wallet type
 * @param walletType The type of wallet to connect to
 * @returns The wallet address if successful, null otherwise
 */
export async function connectWallet(walletType: string): Promise<string | null> {
  try {
    // Handle MetaMask connection
    if (walletType === 'metamask') {
      if (!isMetaMaskInstalled()) {
        toast.error("MetaMask is not installed. Please install MetaMask extension.");
        return null;
      }
      
      try {
        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        return accounts[0];
      } catch (error: any) {
        if (error.code === 4001) {
          // User rejected the request
          toast.error("Connection rejected. Please approve the connection request in MetaMask.");
        } else {
          toast.error(`MetaMask connection error: ${error.message || "Unknown error"}`);
        }
        return null;
      }
    }
    
    // Mock wallets for other wallet types that aren't implemented yet
    const mockWallets = {
      phantom: 'DYw8jCTfwHNRJhhmFcbXvVDTqWMEVFBX6ZKUmG5CNSKK',
      trust: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      walletconnect: '0x8F8526dbfd6E38E3D8307702cA8469Bae6C56C15'
    };
    
    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check for wallet provider existence
    if (!hasWalletProvider(walletType)) {
      throw new Error(`${walletType} provider not found. Please install the wallet extension.`);
    }
    
    // Get the mock address for non-MetaMask wallet types
    return mockWallets[walletType as keyof typeof mockWallets] || null;
  } catch (error) {
    console.error("Wallet connection error:", error);
    throw error;
  }
}

/**
 * Get the wallet address for the specified wallet type
 * @param walletType The type of wallet to get the address for
 * @returns The wallet address if available, null otherwise
 */
export async function getWalletAddress(walletType: string): Promise<string | null> {
  if (walletType === 'metamask' && isMetaMaskInstalled()) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      return accounts[0] || null;
    } catch (error) {
      console.error("Error getting MetaMask accounts:", error);
      return null;
    }
  }
  
  // Mock implementation for other wallet types
  const mockWallets = {
    phantom: 'DYw8jCTfwHNRJhhmFcbXvVDTqWMEVFBX6ZKUmG5CNSKK',
    trust: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    walletconnect: '0x8F8526dbfd6E38E3D8307702cA8469Bae6C56C15'
  };
  
  return mockWallets[walletType as keyof typeof mockWallets] || null;
}

/**
 * Check if the wallet provider is available
 * @param walletType The type of wallet to check
 * @returns True if the provider is available, false otherwise
 */
export function hasWalletProvider(walletType: string): boolean {
  if (walletType === 'metamask') {
    return isMetaMaskInstalled();
  }
  
  // For other wallet types, simulate availability (90% available)
  return Math.random() > 0.1;
}

/**
 * Get the balance for the specified wallet address
 * @param address The wallet address to get the balance for
 * @returns The wallet balance
 */
export async function getWalletBalance(address: string): Promise<number> {
  if (isMetaMaskInstalled() && address) {
    try {
      // Request balance from MetaMask
      const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [address, 'latest']
      });
      
      // Convert from wei to ether (division by 10^18)
      return parseInt(balance, 16) / 1e18;
    } catch (error) {
      console.error("Error getting balance:", error);
      // Return mock balance on error
      return Math.floor(Math.random() * 900) + 100;
    }
  }
  
  // Return mock balance for non-MetaMask or no address
  return Math.floor(Math.random() * 900) + 100;
}

/**
 * Listen for account changes
 * @param callback Function to call when accounts change
 * @returns Cleanup function
 */
export function setupAccountChangeListener(callback: (accounts: string[]) => void): () => void {
  if (!isMetaMaskInstalled()) return () => {};
  
  const handleAccountsChanged = (accounts: string[]) => {
    callback(accounts);
  };
  
  window.ethereum.on('accountsChanged', handleAccountsChanged);
  
  return () => {
    window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
  };
}

/**
 * Listen for network changes
 * @param callback Function to call when network changes
 * @returns Cleanup function
 */
export function setupNetworkChangeListener(callback: (chainId: string) => void): () => void {
  if (!isMetaMaskInstalled()) return () => {};
  
  const handleChainChanged = (chainId: string) => {
    callback(chainId);
  };
  
  window.ethereum.on('chainChanged', handleChainChanged);
  
  return () => {
    window.ethereum.removeListener('chainChanged', handleChainChanged);
  };
}

/**
 * Analyzes wallet address for quantum security vulnerabilities
 * @param address The wallet address to check
 * @returns Quantum security status information
 */
export async function getQuantumSecurityStatus(address: string): Promise<{
  isQuantumResistant: boolean;
  securityLevel: 'high' | 'medium' | 'low';
  vulnerabilities: number;
  recommendations: string[];
}> {
  // In a real implementation, this would analyze the wallet's transaction history,
  // check key derivation methods, and assess signature algorithms for quantum resistance
  
  console.log(`Analyzing quantum security for address: ${address}`);
  
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Determine security level based on address characteristics
  // This is a simplified simulation - in reality would require deeper analysis
  const addressCharacteristics = {
    // Calculate entropy based on address pattern - simulation only
    entropyScore: Math.random(),
    // Check if using a quantum-resistant derivation path - simulation only
    usesQuantumResistantPath: Math.random() > 0.3,
    // Check transaction patterns for potential exposure - simulation only
    exposureScore: Math.random()
  };
  
  // Calculate overall quantum resistance score
  const resistanceScore = 
    addressCharacteristics.entropyScore * 0.3 + 
    (addressCharacteristics.usesQuantumResistantPath ? 0.4 : 0) +
    (1 - addressCharacteristics.exposureScore) * 0.3;
  
  // Determine security level
  let securityLevel: 'high' | 'medium' | 'low';
  if (resistanceScore > 0.7) {
    securityLevel = 'high';
  } else if (resistanceScore > 0.4) {
    securityLevel = 'medium';
  } else {
    securityLevel = 'low';
  }
  
  // Calculate number of vulnerabilities based on security level
  const vulnerabilities = securityLevel === 'high' ? 0 : 
                          securityLevel === 'medium' ? Math.floor(Math.random() * 2) + 1 : 
                          Math.floor(Math.random() * 3) + 2;
  
  // Provide recommendations based on security level
  const recommendations = [];
  if (securityLevel !== 'high') {
    recommendations.push('Consider upgrading to a wallet with post-quantum cryptography support');
    
    if (!addressCharacteristics.usesQuantumResistantPath) {
      recommendations.push('Use a quantum-resistant key derivation path');
    }
    
    if (addressCharacteristics.exposureScore > 0.5) {
      recommendations.push('Reduce public key exposure by using new addresses for transactions');
    }
    
    if (vulnerabilities > 2) {
      recommendations.push('Transfer funds to a quantum-resistant wallet solution');
    }
  } else {
    recommendations.push('Continue monitoring advances in quantum computing security');
  }
  
  return {
    isQuantumResistant: securityLevel === 'high',
    securityLevel,
    vulnerabilities,
    recommendations
  };
}
