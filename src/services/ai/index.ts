
import { textGenerationService } from './textGeneration';
import { chatService } from './chatService';
import neuralNetworkService from './neuralNetworkService';
import { QuantumCoinFeature, AIGenerationResponse } from './types';
import { dataScienceAGI } from '@/lib/quantum/DataScienceAGI';

const aiService = {
  generateText: textGenerationService.generateText,
  
  generateQuantumCoinFunction: async (
    feature: QuantumCoinFeature, 
    context?: string,
    withNeuralAnalysis: boolean = false
  ): Promise<AIGenerationResponse> => {
    const textResponse = await textGenerationService.generateText({
      prompt: `Generate information about QuantumCoin ${feature}`,
      context,
      feature,
      neuralAnalysis: withNeuralAnalysis
    });
    
    // Create a properly typed response with all required fields
    const response: AIGenerationResponse = {
      text: textResponse?.text || `Information about QuantumCoin ${feature}`,
      status: 'success',
      message: textResponse?.message
    };
    
    // Add neural network analysis if requested
    if (withNeuralAnalysis) {
      // Simulate transaction data for analysis
      const mockTransactions = Array(5).fill(0).map((_, i) => ({
        amount: Math.random() * 1000,
        timestamp: Date.now() - (i * 60000 * Math.random()),
        sender: `0x${Math.random().toString(16).slice(2, 12)}`,
        recipient: `0x${Math.random().toString(16).slice(2, 12)}`
      }));
      
      const neuralOutput = await neuralNetworkService.analyzeTransactionPatterns(mockTransactions);
      return {
        ...response,
        neuralOutput
      };
    }
    
    return response;
  },

  generateChatResponse: chatService.generateChatResponse,
  
  // Add neural network functions to AI service
  analyzeTransactionPatterns: neuralNetworkService.analyzeTransactionPatterns,
  trainModel: neuralNetworkService.trainModel,
  analyzeQuantumSecurity: neuralNetworkService.analyzeQuantumSecurity,
  
  // Add new data science and IoT functions
  analyzeDataset: async (data: any[]): Promise<AIGenerationResponse> => {
    try {
      const analysis = await dataScienceAGI.analyzeDataset(data);
      
      return {
        text: `Dataset analysis complete. Found ${analysis.patterns.length} patterns and ${analysis.anomalies.length} anomalies.`,
        status: 'success',
        dataAnalysis: analysis
      };
    } catch (error) {
      console.error("Error analyzing dataset:", error);
      return {
        text: "Failed to analyze dataset",
        status: 'error',
        message: error.message
      };
    }
  },
  
  optimizeCloudResources: async (currentMetrics: any): Promise<AIGenerationResponse> => {
    try {
      const optimizedMetrics = await dataScienceAGI.optimizeCloudResources(currentMetrics);
      
      return {
        text: "Cloud resources optimization complete",
        status: 'success',
        optimizedMetrics
      };
    } catch (error) {
      console.error("Error optimizing cloud resources:", error);
      return {
        text: "Failed to optimize cloud resources",
        status: 'error',
        message: error.message
      };
    }
  }
};

// Export named functions for direct import
export const { generateText } = textGenerationService;
export const generateChatResponse = chatService.generateChatResponse;
export const generateQuantumCoinFunction = aiService.generateQuantumCoinFunction;
export const { 
  analyzeTransactionPatterns, 
  trainModel,
  analyzeQuantumSecurity 
} = neuralNetworkService;

// Export new data science functions
export const analyzeDataset = aiService.analyzeDataset;
export const optimizeCloudResources = aiService.optimizeCloudResources;

export default aiService;
export * from './types';
