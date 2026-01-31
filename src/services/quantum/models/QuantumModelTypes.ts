
/**
 * Type definitions for quantum deep learning models
 */

export interface QuantumModelConfig {
  layers: number[];              // Number of neurons in each layer
  activations: string[];         // Activation function for each layer
  learningRate: number;          // Learning rate for optimization
  epochs: number;                // Number of training epochs
  batchSize: number;             // Batch size for training
  quantumLayers?: number;        // Number of quantum layers (optional)
  quantumActivation?: string;    // Type of quantum activation function
}

export interface QuantumTrainingMetrics {
  epoch: number;                 // Current epoch
  loss: number;                  // Training loss
  accuracy: number;              // Training accuracy
  fidelity: number;              // Quantum fidelity score
  quantumCoherence: number;      // Quantum coherence measurement
}

export interface TrainedQuantumModel {
  weights: number[][];           // Model weights
  biases: number[][];            // Model biases
  metrics: QuantumTrainingMetrics[]; // Training metrics history
  finalMetrics: {                // Final model metrics
    loss: number;
    accuracy: number;
    fidelity: number;
    robustness: number;
    quantumResistance: number;
  };
  config: QuantumModelConfig;    // Model configuration
}

export interface QuantumInferenceResult {
  predictions: number[];         // Raw model predictions
  classes?: string[];            // Predicted classes (if classification)
  confidences: number[];         // Confidence scores
  processingTime: number;        // Time taken for inference
  quantumAdvantage: number;      // Quantum advantage score (0-1)
}

export interface QuantumSecurityMetrics {
  quantumResistanceScore: number;     // Resistance to quantum attacks (0-1)
  encryptionStrength: number;         // Strength of quantum encryption
  vulnerabilityScore: number;         // Model vulnerability score
  privacyPreservationScore: number;   // Privacy preservation score
  tamperResistanceScore: number;      // Resistance to tampering
}
