
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { QuantumSecurityAnalysis } from "@/services/aiService"; 

export interface QuantumAnalysis {
  marketTrend: string;
  tokenPrediction: string;
  riskAssessment: string;
  recommendation: string;
}

interface AnalysisResult {
  analysis: QuantumAnalysis;
  prices?: {
    price: number;
    change24h: number;
  };
  aiConfidence: number;
  securityAnalysis: QuantumSecurityAnalysis;
}

// Mock function to generate analysis
const generateAnalysis = async (useNeuralNetwork: boolean): Promise<AnalysisResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock analysis data
  return {
    analysis: {
      marketTrend: "Bullish trend detected with increasing volume across exchanges.",
      tokenPrediction: "Quantum coin projected to increase 15-20% within next 72 hours.",
      riskAssessment: "Medium volatility with strong fundamentals supporting price discovery.",
      recommendation: "Consider accumulating on dips below $1.20 with stop-loss at $0.95."
    },
    prices: {
      price: 1.24 + (Math.random() * 0.1 - 0.05),
      change24h: 3.5 + (Math.random() * 2 - 1)
    },
    aiConfidence: useNeuralNetwork ? 92 : 85,
    securityAnalysis: {
      resistanceScore: 0.87,
      vulnerabilities: [
        "Legacy key derivation in older wallets",
        "Potential side-channel exposure"
      ],
      recommendations: [
        "Upgrade to quantum-resistant wallet",
        "Use post-quantum signatures for large transactions"
      ],
      quantumSafeAlgorithms: ["Dilithium", "Falcon-512", "NTRU-HRSS"]
    }
  };
};

export function useQuantumAnalysis() {
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<QuantumAnalysis>({
    marketTrend: "Analyzing market conditions...",
    tokenPrediction: "Generating Quantum coin price predictions...",
    riskAssessment: "Calculating risk factors...",
    recommendation: "Preparing investment recommendations...",
  });
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [priceChange, setPriceChange] = useState<number>(0);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [aiConfidence, setAiConfidence] = useState<number>(85);
  const [securityAnalysis, setSecurityAnalysis] = useState<QuantumSecurityAnalysis | null>(null);
  const [neuralNetworkActive, setNeuralNetworkActive] = useState(true);

  const fetchAnalysis = async () => {
    setIsLoading(true);
    try {
      const result = await generateAnalysis(neuralNetworkActive);
      
      if (result.prices) {
        setCurrentPrice(result.prices.price);
        setPriceChange(result.prices.change24h);
      }
      
      setAnalysis(result.analysis);
      setAiConfidence(result.aiConfidence);
      setSecurityAnalysis(result.securityAnalysis);
      setLastUpdated(new Date());
      
      toast.success("Quantum AI analysis completed");
    } catch (error) {
      // Error already handled by the service
      console.error("Error fetching analysis:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalysis();
    const intervalId = setInterval(fetchAnalysis, 120000);
    return () => clearInterval(intervalId);
  }, [neuralNetworkActive]);

  const toggleNeuralNetwork = () => {
    setNeuralNetworkActive(!neuralNetworkActive);
    toast.info(
      neuralNetworkActive 
        ? "Neural network enhancement disabled" 
        : "Neural network enhancement activated"
    );
  };

  return {
    isLoading,
    analysis,
    currentPrice,
    priceChange,
    lastUpdated,
    aiConfidence,
    securityAnalysis,
    neuralNetworkActive,
    generateAnalysis: fetchAnalysis,
    toggleNeuralNetwork
  };
}
