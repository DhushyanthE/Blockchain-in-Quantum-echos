
import React from "react";
import { BrainCircuit, Coins, ArrowRight } from "lucide-react";
import { Activity } from "lucide-react";
import { AnalysisCard } from "./analysis/AnalysisCard";
import { AnalysisControls } from "./analysis/AnalysisControls";
import { SecurityAnalysisSection } from "./analysis/SecurityAnalysisSection";
import { AnalysisFooter } from "./analysis/AnalysisFooter";
import { useQuantumAnalysis } from "./analysis/useQuantumAnalysis";

export function QuantumAIAnalysis() {
  const {
    isLoading,
    analysis,
    currentPrice,
    priceChange,
    lastUpdated,
    aiConfidence,
    securityAnalysis,
    neuralNetworkActive,
    generateAnalysis,
    toggleNeuralNetwork
  } = useQuantumAnalysis();

  return (
    <AnalysisCard title="QuantumAI Market Analysis">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
          <BrainCircuit className="h-6 w-6 text-purple-400" /> 
          QuantumAI Market Analysis
        </h3>
        <AnalysisControls
          isLoading={isLoading}
          currentPrice={currentPrice}
          priceChange={priceChange}
          neuralNetworkActive={neuralNetworkActive}
          onRefresh={generateAnalysis}
          onToggleNeuralNetwork={toggleNeuralNetwork}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-gray-800/50 p-4 rounded-lg border border-purple-500/10">
            <h4 className="text-purple-400 font-medium mb-2 flex items-center gap-2">
              <Coins className="h-4 w-4" />
              Market Trend
            </h4>
            <p className="text-gray-300">{analysis.marketTrend}</p>
          </div>
          
          <div className="bg-gray-800/50 p-4 rounded-lg border border-purple-500/10">
            <h4 className="text-purple-400 font-medium mb-2 flex items-center gap-2">
              <ArrowRight className="h-4 w-4" />
              Token Prediction
            </h4>
            <p className="text-gray-300">{analysis.tokenPrediction}</p>
          </div>
          
          <SecurityAnalysisSection securityAnalysis={securityAnalysis} />
        </div>
        
        <div className="space-y-6">
          <div className="bg-gray-800/50 p-4 rounded-lg border border-purple-500/10">
            <h4 className="text-purple-400 font-medium mb-2">Risk Assessment</h4>
            <p className="text-gray-300">{analysis.riskAssessment}</p>
          </div>
          
          <div className="bg-gray-800/50 p-4 rounded-lg border border-purple-500/10">
            <h4 className="text-purple-400 font-medium mb-2">Investment Recommendation</h4>
            <p className="text-gray-300">{analysis.recommendation}</p>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center bg-gray-800/50 p-3 rounded-lg border border-purple-500/10">
              <div className="text-gray-400 text-sm flex items-center">
                <BrainCircuit className="h-4 w-4 mr-1.5 text-purple-400" />
                AI confidence level
              </div>
              <div className="flex items-center gap-1">
                <div className="h-2 w-24 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500" style={{width: `${aiConfidence}%`}}></div>
                </div>
                <span className="text-purple-400 text-sm">{aiConfidence}%</span>
              </div>
            </div>
            
            {neuralNetworkActive && (
              <div className="bg-gray-800/50 p-3 rounded-lg border border-purple-500/10">
                <div className="text-xs text-gray-300">
                  <div className="flex items-center gap-1.5 text-purple-300 mb-2">
                    <Activity className="h-3.5 w-3.5" />
                    <span className="font-medium">Neural Network Analysis Active</span>
                  </div>
                  <p className="text-gray-400">
                    Utilizing multi-layer perceptron with 3 hidden layers and ReLU activation functions.
                    Quantum resistance verification through lattice-based cryptography methods.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <AnalysisFooter isLoading={isLoading} lastUpdated={lastUpdated} />
    </AnalysisCard>
  );
}
