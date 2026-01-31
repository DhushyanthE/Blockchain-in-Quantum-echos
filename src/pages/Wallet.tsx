
import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import WalletConnector from '@/components/wallet/WalletConnector';
import { QuantumAICapabilities } from '@/components/ai/QuantumAICapabilities';
import { useWallet } from '@/contexts/wallet-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet as WalletIcon, Link } from 'lucide-react';
import { toast } from 'sonner';
import { formatCurrency } from '@/lib/utils';

const Wallet: React.FC = () => {
  const { isConnected, walletAddress, currentWallet, balance, chainId } = useWallet();
  const [networkName, setNetworkName] = useState<string>('Unknown Network');
  const [tokenBalances, setTokenBalances] = useState<any[]>([]);

  useEffect(() => {
    // Update network name based on chain ID
    if (chainId) {
      switch (chainId) {
        case 1:
          setNetworkName('Ethereum Mainnet');
          break;
        case 56:
          setNetworkName('Binance Smart Chain');
          break;
        case 137:
          setNetworkName('Polygon');
          break;
        case 42161:
          setNetworkName('Arbitrum One');
          break;
        default:
          setNetworkName(`Chain ID: ${chainId}`);
      }
    }

    // Simulate token balances
    if (isConnected) {
      // In a real implementation, this would be fetched from the blockchain
      setTokenBalances([
        { name: 'Quantum Coin', symbol: 'QNTM', amount: 125.45, value: 18765.75 },
        { name: 'Ethereum', symbol: 'ETH', amount: 1.25, value: 3750.25 },
        { name: 'USD Coin', symbol: 'USDC', amount: 1250.0, value: 1250.0 }
      ]);
      
      toast.info('Wallet data loaded', {
        description: 'Connected to ' + networkName
      });
    }
  }, [isConnected, chainId, currentWallet, networkName]);

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Quantum Wallet</h1>
            <p className="text-gray-300">Securely manage your quantum-resistant assets</p>
          </div>
          <div className="mt-4 md:mt-0">
            <WalletConnector buttonVariant="outline" />
          </div>
        </div>

        {!isConnected ? (
          <div className="flex flex-col items-center justify-center p-12 bg-black/40 backdrop-blur-sm rounded-xl border border-purple-500/20">
            <WalletIcon className="h-16 w-16 text-purple-400 mb-4" />
            <h2 className="text-2xl font-semibold text-white mb-3">Connect Your Wallet</h2>
            <p className="text-gray-300 text-center max-w-md mb-6">
              Connect your wallet to access quantum-secure transactions, view your assets, and interact with decentralized applications.
            </p>
            <WalletConnector />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="col-span-1 lg:col-span-2 space-y-6">
              <Card className="bg-black/70 border-purple-500/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <WalletIcon className="h-5 w-5 text-purple-400" />
                    Wallet Overview
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {networkName} • {walletAddress}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
                      <div className="text-sm text-gray-400 mb-1">Total Balance</div>
                      <div className="text-2xl font-semibold text-white">
                        {formatCurrency(tokenBalances.reduce((sum, token) => sum + token.value, 0))}
                      </div>
                    </div>
                    <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
                      <div className="text-sm text-gray-400 mb-1">Native Token</div>
                      <div className="text-2xl font-semibold text-white">
                        {balance} {currentWallet === 'phantom' ? 'SOL' : 'ETH'}
                      </div>
                    </div>
                    <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
                      <div className="text-sm text-gray-400 mb-1">Security Level</div>
                      <div className="text-2xl font-semibold text-green-400">High</div>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-4">Asset Breakdown</h3>
                  <div className="space-y-3">
                    {tokenBalances.map((token, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg border border-gray-800">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-purple-900/50 rounded-full flex items-center justify-center mr-3">
                            <span className="font-semibold text-purple-300">{token.symbol.substring(0, 2)}</span>
                          </div>
                          <div>
                            <div className="font-medium text-white">{token.name}</div>
                            <div className="text-sm text-gray-400">{token.amount} {token.symbol}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-white">{formatCurrency(token.value)}</div>
                          <div className="text-sm text-green-400">+2.4%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/70 border-purple-500/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Link className="h-5 w-5 text-purple-400" />
                    Recent Transactions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-900/30 rounded-lg border border-gray-800">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-green-900/50 rounded-full flex items-center justify-center mr-3">
                            <span className="text-green-400 text-sm">In</span>
                          </div>
                          <div>
                            <div className="font-medium text-white">Received 15.2 QNTM</div>
                            <div className="text-sm text-gray-400">From: 0x71C...9E3a • 2h ago</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-white">$2,280.00</div>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-gray-900/30 rounded-lg border border-gray-800">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-red-900/50 rounded-full flex items-center justify-center mr-3">
                            <span className="text-red-400 text-sm">Out</span>
                          </div>
                          <div>
                            <div className="font-medium text-white">Sent 0.5 ETH</div>
                            <div className="text-sm text-gray-400">To: 0x3F2...7B1c • 5h ago</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-white">$1,500.25</div>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-gray-900/30 rounded-lg border border-gray-800">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-purple-900/50 rounded-full flex items-center justify-center mr-3">
                            <span className="text-purple-400 text-sm">Swap</span>
                          </div>
                          <div>
                            <div className="font-medium text-white">Swapped 100 USDC for 0.667 QNTM</div>
                            <div className="text-sm text-gray-400">Quantum DEX • 1d ago</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-white">$100.00</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="col-span-1 space-y-6">
              <QuantumAICapabilities />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Wallet;
