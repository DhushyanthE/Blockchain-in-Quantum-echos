
/**
 * Re-export all quantum utility functions
 */

export * from './simulation';
export * from './cryptography';
// Explicitly re-export to avoid ambiguity
export { 
  quantumNeuralLayer,
  quantumForwardPass,
  generateQuantumEmbeddings
} from './neuralNetworks';
export * from './fidelityModel';
export * from './circuitOptimizer';
export * from './blockchainOptimizer';
export * from './quantumAI';
export * from './quantumDataScience';
export * from './quantumCloud';
export * from './iot'; // Updated to use the new IoT module
