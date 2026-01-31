
import { AIGenerationResponse } from './types';
import { generatePresentationResponse, generatePracticalReportResponse, generatePricePredictionResponse, generateValuationResponse, generateInvestmentAnalysisResponse, generateEducationalResponse } from './responses';

export const chatService = {
  generateChatResponse: async (message: string): Promise<AIGenerationResponse> => {
    try {
      console.log('AI Chat request:', message);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      let response = '';
      
      if (message.toLowerCase().includes('presentation') || message.toLowerCase().includes('slides')) {
        response = generatePresentationResponse();
      } else if (message.toLowerCase().includes('practical report')) {
        response = generatePracticalReportResponse();
      } else if (message.toLowerCase().includes('price prediction')) {
        response = generatePricePredictionResponse();
      } else if (message.toLowerCase().includes('valuation')) {
        response = generateValuationResponse();
      } else if (message.toLowerCase().includes('investment analysis')) {
        response = generateInvestmentAnalysisResponse();
      } else if (message.toLowerCase().includes('educational foundation')) {
        response = generateEducationalResponse();
      } else {
        response = "I'm excited to assist you with information about QuantumCoin. Please let me know what specific aspects you'd like to learn more about.";
      }
      
      return {
        text: response,
        status: 'success'
      };
      
    } catch (error) {
      console.error('Error in chat response:', error);
      return {
        text: '',
        status: 'error',
        message: 'Failed to generate chat response. Please try again.'
      };
    }
  }
};
