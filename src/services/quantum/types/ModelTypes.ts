
export interface TrainedQuantumModel {
  weights: number[][];
  biases: number[][];
  metrics?: {
    accuracy: number;
    loss: number;
    fidelity: number;
    robustness: number;
  };
  config: {
    layers: number[];
    activations: string[];
  };
  finalMetrics: {
    loss: number;
    accuracy: number;
    fidelity: number;
    robustness: number;
    quantumResistance: number;
  };
}

export interface ModelPrediction {
  result: number[];
  confidence: number;
  executionTime: number;
}
