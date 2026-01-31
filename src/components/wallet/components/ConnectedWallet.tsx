
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { CheckCircle, Coins, Download, RefreshCw, RotateCw, Send, Wallet, X } from "lucide-react";

interface ConnectedWalletProps {
  selectedWallet: string;
  balances: Record<string, string>;
  onRefreshBalance: () => void;
  onDisconnect: () => void;
  isRefreshing: boolean;
  showLanguageSelector: boolean;
  onToggleLanguageSelector: () => void;
}

export function ConnectedWallet({
  selectedWallet,
  balances,
  onRefreshBalance,
  onDisconnect,
  isRefreshing,
  showLanguageSelector,
  onToggleLanguageSelector
}: ConnectedWalletProps) {
  return (
    <Card className="bg-black/40 border border-purple-500/30 text-white w-full max-w-md hover:border-purple-500/50 transition-all duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center justify-between">
          <div className="flex items-center">
            <Wallet className="mr-2 h-5 w-5 text-purple-400" />
            <span>Connected: {selectedWallet}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-green-500/80 px-2 py-1 rounded-full text-xs flex items-center">
              <CheckCircle className="mr-1 h-3 w-3" /> Active
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <h3 className="text-sm text-gray-400 mb-2 flex items-center">
          <Coins className="mr-1 h-3 w-3" /> Your Balance
        </h3>
        
        <div className="space-y-2">
          {Object.entries(balances).map(([token, amount]) => (
            <HoverCard key={token}>
              <HoverCardTrigger asChild>
                <div className="flex justify-between items-center p-2 bg-black/30 rounded-lg hover:bg-black/50 transition-colors cursor-pointer">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full mr-2 flex items-center justify-center ${
                      token === 'QNTM' ? 'bg-purple-500' : 'bg-gray-700'
                    }`}>
                      {token.charAt(0)}
                    </div>
                    <span>{token}</span>
                  </div>
                  <span className="font-medium">{amount}</span>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="bg-gray-900 border border-purple-500/30 text-white">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Network:</span>
                    <span className="font-medium">{
                      token === 'ETH' ? 'Ethereum' : 
                      token === 'SOL' ? 'Solana' : 
                      token === 'BTC' ? 'Bitcoin' : 
                      token === 'QNTM' ? 'Quantum Network' : 
                      'Tether'
                    }</span>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
        
        <div className="flex items-center justify-between mt-3 mb-2">
          <h4 className="text-sm text-gray-400">Balance</h4>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 text-gray-400 text-xs flex items-center gap-1 hover:text-white"
            onClick={onRefreshBalance}
            disabled={isRefreshing}
          >
            {isRefreshing ? (
              <RotateCw className="h-3 w-3 animate-spin mr-1" />
            ) : (
              <RefreshCw className="h-3 w-3 mr-1" />
            )}
            Refresh
          </Button>
        </div>
        
        <div className="flex gap-2 mt-4">
          <Button className="w-1/2 bg-purple-600 hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
            <Send className="h-4 w-4" />
            Send
          </Button>
          <Button className="w-1/2 bg-purple-600 hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
            <Download className="h-4 w-4" />
            Receive
          </Button>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full mt-3 border-red-500/30 text-red-400 hover:bg-red-950/30 hover:text-red-300 flex items-center justify-center gap-2"
          onClick={onDisconnect}
        >
          <X className="h-4 w-4" />
          Disconnect
        </Button>
      </CardContent>
    </Card>
  );
}
