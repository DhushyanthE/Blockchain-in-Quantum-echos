
import React from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Play } from 'lucide-react';

interface TrainingProgressProps {
  isTraining: boolean;
  currentEpoch: number;
  totalEpochs: number;
  trainingProgress: number;
  trainingMetrics: {
    accuracy: number;
    loss: number;
    fidelity: number;
    quantumAdvantage: number;
  };
  onStartTraining: () => void;
}

export function TrainingProgress({
  isTraining,
  currentEpoch,
  totalEpochs,
  trainingProgress,
  trainingMetrics,
  onStartTraining
}: TrainingProgressProps) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-1">
        <div className="text-sm font-medium">Progress</div>
        <div className="text-xs text-gray-400">
          Epoch {currentEpoch}/{totalEpochs}
        </div>
      </div>
      
      <div className="mb-4">
        <Progress value={trainingProgress} className="h-2" />
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="bg-gray-900/40 p-3 rounded-lg border border-gray-800 text-center">
          <div className="text-xs text-gray-400 mb-1">Accuracy</div>
          <div className="text-xl font-bold text-white">{(trainingMetrics.accuracy * 100).toFixed(1)}%</div>
        </div>
        <div className="bg-gray-900/40 p-3 rounded-lg border border-gray-800 text-center">
          <div className="text-xs text-gray-400 mb-1">Loss</div>
          <div className="text-xl font-bold text-white">{trainingMetrics.loss.toFixed(4)}</div>
        </div>
      </div>
      
      {!isTraining && currentEpoch === 0 ? (
        <Button 
          onClick={onStartTraining} 
          className="w-full bg-purple-600 hover:bg-purple-700"
          disabled={isTraining}
        >
          <Play className="h-4 w-4 mr-2" />
          Start Training
        </Button>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-900/40 p-3 rounded-lg border border-gray-800">
            <div className="text-xs text-gray-400 mb-1">Quantum Fidelity</div>
            <div className="text-sm text-white">{(trainingMetrics.fidelity * 100).toFixed(1)}%</div>
          </div>
          <div className="bg-gray-900/40 p-3 rounded-lg border border-gray-800">
            <div className="text-xs text-gray-400 mb-1">Quantum Advantage</div>
            <div className="text-sm text-white">{trainingMetrics.quantumAdvantage.toFixed(1)}x</div>
          </div>
        </div>
      )}
    </div>
  );
}
