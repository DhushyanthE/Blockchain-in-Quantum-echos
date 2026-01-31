
export interface TradeSignal {
  type: 'BUY' | 'SELL';
  symbol: string;
  price: number;
  confidence: number;
  timestamp: number;
}
