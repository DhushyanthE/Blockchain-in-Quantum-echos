import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CryptoPrice } from "@/services/cryptoApiService";
import { AdvancedAIPredictor } from "@/ai/AdvancedAIPredictor";
import { AIPrediction, MarketData } from "@/types/market";
import cryptoApiService from "@/services/cryptoApiService";
import { AgentOrchestrator } from "@/ai/AgentOrchestrator";
import {
  Loader2,
  TrendingUp,
  TrendingDown,
  Shield,
  Activity,
  Zap,
  Brain,
} from "lucide-react";

interface QuantumAnalysisDashboardProps {
  selectedToken: string;
  tokens: CryptoPrice[];
}

interface QuantumInsight {
  title: string;
  value: string;
  type: "positive" | "negative" | "neutral";
  description: string;
}

export function QuantumAnalysisDashboard({
  selectedToken,
  tokens,
}: QuantumAnalysisDashboardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [prediction, setPrediction] = useState<AIPrediction | null>(null);
  const [insights, setInsights] = useState<QuantumInsight[]>([]);
  const [riskLevel, setRiskLevel] = useState<number>(0);

  useEffect(() => {
    const analyzeToken = async () => {
      setIsLoading(true);
      try {
        const token = tokens.find((t) => t.symbol === selectedToken);
        if (!token) return;

        const marketData: MarketData = cryptoApiService.toMarketData(token);

        const aiPredictor = new AdvancedAIPredictor();
        const prediction = await aiPredictor.generatePrediction(marketData);
        setPrediction(prediction);

        generateQuantumInsights(prediction, token);

        const calculatedRisk = calculateRiskLevel(token, prediction);
        setRiskLevel(calculatedRisk);

        // 🔥 Run Agentic orchestration for AI strategy suggestions
        const init = async () => {
          const results = await AgentOrchestrator();
          console.log("Agentic Results:", results);
        };
        init();
      } catch (error) {
        console.error("Error analyzing token:", error);
      } finally {
        setIsLoading(false);
      }
    };

    analyzeToken();
  }, [selectedToken, tokens]);

  const generateQuantumInsights = (prediction: AIPrediction, token: CryptoPrice) => {
    const insights: QuantumInsight[] = [
      {
        title: "Price Movement",
        value: prediction.direction === "up" ? "Bullish" : "Bearish",
        type: prediction.direction === "up" ? "positive" : "negative",
        description: `Quantum analysis indicates a ${(prediction.magnitude * 100).toFixed(
          2
        )}% ${prediction.direction === "up" ? "increase" : "decrease"} within ${
          prediction.timeframe
        }.`,
      },
      {
        title: "Volatility",
        value:
          Math.abs(token.change24h) > 10
            ? "High"
            : Math.abs(token.change24h) > 5
            ? "Medium"
            : "Low",
        type:
          Math.abs(token.change24h) > 10
            ? "negative"
            : Math.abs(token.change24h) > 5
            ? "neutral"
            : "positive",
        description: `${Math.abs(token.change24h).toFixed(
          1
        )}% 24h change indicates ${
          Math.abs(token.change24h) > 10
            ? "significant"
            : Math.abs(token.change24h) > 5
            ? "moderate"
            : "minimal"
        } volatility.`,
      },
      {
        title: "Market Sentiment",
        value:
          prediction.confidence > 0.75
            ? prediction.direction === "up"
              ? "Very Positive"
              : "Very Negative"
            : prediction.confidence > 0.6
            ? prediction.direction === "up"
              ? "Positive"
              : "Negative"
            : "Neutral",
        type: prediction.direction === "up" ? "positive" : "negative",
        description: `Sentiment confidence: ${(prediction.confidence * 100).toFixed(
          0
        )}%.`,
      },
    ];

    setInsights(insights);
  };

  const calculateRiskLevel = (token: CryptoPrice, prediction: AIPrediction) => {
    const volatilityFactor = Math.min(Math.abs(token.change24h) * 2, 50);
    const confidenceFactor = (1 - prediction.confidence) * 30;
    const priceFactor = token.price < 1 ? 20 : token.price < 10 ? 15 : 10;
    return Math.min(Math.round(volatilityFactor + confidenceFactor + priceFactor), 100);
  };

  if (isLoading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* AI Insights */}
        <Card className="bg-gray-900/50 border-purple-500/20">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Brain className="h-5 w-5 text-purple-400 mr-2" />
              <h3 className="text-lg font-medium text-white">
                Quantum AI Analysis — {selectedToken}
              </h3>
            </div>
            <div className="space-y-4">
              {insights.map((insight, index) => (
                <div key={index} className="bg-gray-800/80 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-sm text-gray-400">{insight.title}</div>
                    <div
                      className={`px-2 py-0.5 text-xs rounded-full ${
                        insight.type === "positive"
                          ? "bg-green-900/50 text-green-400"
                          : insight.type === "negative"
                          ? "bg-red-900/50 text-red-400"
                          : "bg-blue-900/50 text-blue-400"
                      }`}
                    >
                      {insight.value}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {insight.description}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Risk Assessment */}
        <Card className="bg-gray-900/50 border-purple-500/20">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Shield className="h-5 w-5 text-purple-400 mr-2" />
              <h3 className="text-lg font-medium text-white">Risk Assessment</h3>
            </div>
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-400">Risk Level</span>
                <span
                  className={`text-sm font-medium ${
                    riskLevel > 75
                      ? "text-red-500"
                      : riskLevel > 50
                      ? "text-yellow-500"
                      : riskLevel > 25
                      ? "text-blue-500"
                      : "text-green-500"
                  }`}
                >
                  {riskLevel > 75
                    ? "High"
                    : riskLevel > 50
                    ? "Medium"
                    : riskLevel > 25
                    ? "Low"
                    : "Very Low"}
                </span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    riskLevel > 75
                      ? "bg-red-500"
                      : riskLevel > 50
                      ? "bg-yellow-500"
                      : riskLevel > 25
                      ? "bg-blue-500"
                      : "bg-green-500"
                  }`}
                  style={{ width: `${riskLevel}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Investment Recommendation */}
      <Card className="bg-gray-900/50 border-purple-500/20">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <Activity className="h-5 w-5 text-purple-400 mr-2" />
            <h3 className="text-lg font-medium text-white">
              Investment Recommendation
            </h3>
          </div>

          {prediction && (
            <div className="bg-gray-800/80 p-4 rounded-lg mb-4">
              <div
                className={`text-lg font-medium mb-2 ${
                  prediction.direction === "up" && prediction.confidence > 0.7
                    ? "text-green-500"
                    : prediction.direction === "down" &&
                      prediction.confidence > 0.7
                    ? "text-red-500"
                    : "text-gray-300"
                }`}
              >
                {prediction.direction === "up" && prediction.confidence > 0.7
                  ? "Buy / Accumulate"
                  : prediction.direction === "down" &&
                    prediction.confidence > 0.7
                  ? "Sell / Reduce Exposure"
                  : "Hold / Monitor"}
              </div>
              <p className="text-gray-300">
                {prediction.direction === "up" && prediction.confidence > 0.7
                  ? `Strong bullish signals for ${selectedToken}.`
                  : prediction.direction === "down" &&
                    prediction.confidence > 0.7
                  ? `Bearish trend detected for ${selectedToken}.`
                  : `Mixed signals for ${selectedToken}. Monitor closely.`}
              </p>
              <div className="mt-3">
                <div className="text-sm text-gray-400">Timeframe:</div>
                <div className="text-sm text-gray-300">
                  {prediction.timeframe}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-6 pt-4 border-t border-gray-700 flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center">
          <Zap className="h-3 w-3 text-purple-400 mr-1" />
          <span>Quantum AI Analysis powered by Agentic Neural Framework</span>
        </div>
        <span>Last updated: {new Date().toLocaleTimeString()}</span>
      </div>
    </div>
  );
}
