
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CheckCircle } from 'lucide-react';
import { useWallet } from '@/contexts/wallet-context';
import { formatAddress } from '@/lib/utils';

interface WalletInfoProps {
  onDisconnect: () => void;
}

const WalletInfo: React.FC<WalletInfoProps> = ({ onDisconnect }) => {
  const { walletAddress, currentWallet, balance, chainId } = useWallet();
  const [copied, setCopied] = useState(false);

  const formatWalletName = (type: string | null) => {
    if (!type) return 'Wallet';
    switch (type) {
      case 'metamask':
        return 'MetaMask';
      case 'trustwallet':
        return 'Trust Wallet';
      case 'phantom':
        return 'Phantom';
      case 'walletconnect':
        return 'WalletConnect';
      default:
        return 'Wallet';
    }
  };

  const getNetworkName = (id: number | null) => {
    if (!id) return 'Unknown';
    
    switch (id) {
      case 1:
        return 'Ethereum Mainnet';
      case 56:
        return 'BSC';
      case 137:
        return 'Polygon';
      case 42161:
        return 'Arbitrum';
      case 10:
        return 'Optimism';
      case 43114:
        return 'Avalanche';
      case 42220:
        return 'Celo';
      default:
        return `Chain ID: ${id}`;
    }
  };
  
  const copyAddress = async () => {
    if (walletAddress) {
      await navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="bg-purple-900/20 hover:bg-purple-900/30 text-white border-purple-500/30">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-green-500 animate-pulse"></div>
            <span className="hidden md:inline">{formatWalletName(currentWallet)}: </span>
            <span>{formatAddress(walletAddress)}</span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60 bg-gray-900/95 border-purple-500/20 text-white p-4 space-y-3">
        <div>
          <div className="text-xs text-gray-400">Connected to</div>
          <div className="font-semibold flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            {formatWalletName(currentWallet)}
          </div>
        </div>
        
        <div>
          <div className="text-xs text-gray-400">Address</div>
          <div className="font-mono text-sm flex items-center gap-2">
            <span className="truncate">{walletAddress}</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={copyAddress}
            >
              {copied ? '✓' : 'Copy'}
            </Button>
          </div>
        </div>
        
        <div>
          <div className="text-xs text-gray-400">Balance</div>
          <div className="font-semibold">{balance || '0.0000'} {currentWallet === 'phantom' ? 'SOL' : 'ETH'}</div>
        </div>
        
        <div>
          <div className="text-xs text-gray-400">Network</div>
          <div className="font-semibold">{getNetworkName(chainId)}</div>
        </div>
        
        <DropdownMenuItem 
          className="w-full justify-center mt-2 bg-red-900/20 text-red-300 hover:bg-red-900/40 hover:text-red-200 cursor-pointer"
          onClick={onDisconnect}
        >
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WalletInfo;
