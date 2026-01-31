
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain } from 'lucide-react';
import { toast } from 'sonner';
import { ModelSelector } from './training/ModelSelector';
import { TrainingProgress } from './training/TrainingProgress';
import { DetailsTabs } from './training/DetailsTabs';
import { MODEL_OPTIONS } from './training/constants';

export function QuantumAITraining() {
  const [isTraining, setIsTraining] = useState(false);
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [totalEpochs, setTotalEpochs] = useState(100);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [trainingMetrics, setTrainingMetrics] = useState({
    accuracy: 0,
    loss: 1.0,
    fidelity: 0.85,
    quantumAdvantage: 0
  });
  const [selectedModel, setSelectedModel] = useState('quantum-neural');
  const [activeTab, setActiveTab] = useState('metrics');
  
  // Simulated training function
  const startTraining = () => {
    if (isTraining) return;
    
    setIsTraining(true);
    setCurrentEpoch(0);
    setTrainingProgress(0);
    setTrainingMetrics({
      accuracy: 0,
      loss: 1.0,
      fidelity: 0.85,
      quantumAdvantage: 0
    });
    
    toast.info("Quantum AI training started", {
      description: "Initializing quantum circuits and neural networks"
    });
    
    // Simulate training epochs
    const intervalId = setInterval(() => {
      setCurrentEpoch(prev => {
        const next = prev + 1;
        
        // Update progress
        const progress = Math.round((next / totalEpochs) * 100);
        setTrainingProgress(progress);
        
        // Update metrics with simulated improvements
        setTrainingMetrics(prev => ({
          accuracy: Math.min(0.95, prev.accuracy + (0.95 / totalEpochs)),
          loss: Math.max(0.05, prev.loss - (0.95 / totalEpochs)),
          fidelity: Math.min(0.98, prev.fidelity + (0.15 / totalEpochs)),
          quantumAdvantage: Math.min(32, prev.quantumAdvantage + (32 / totalEpochs))
        }));
        
        // Complete training when reaching total epochs
        if (next >= totalEpochs) {
          clearInterval(intervalId);
          setIsTraining(false);
          toast.success("Quantum AI model training complete", {
            description: "Model ready for inference with quantum advantage"
          });
        }
        
        return next;
      });
    }, 200);
  };

  return (
    <Card className="bg-black/70 border-purple-500/20 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-400" />
          <span>Quantum AI Training</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Model Selection Component */}
        <ModelSelector 
          models={MODEL_OPTIONS}
          selectedModel={selectedModel}
          onModelSelect={setSelectedModel}
        />
        
        {/* Training Progress Component */}
        <TrainingProgress
          isTraining={isTraining}
          currentEpoch={currentEpoch}
          totalEpochs={totalEpochs}
          trainingProgress={trainingProgress}
          trainingMetrics={trainingMetrics}
          onStartTraining={startTraining}
        />
        
        {/* Detailed Training Information Tabs */}
        <DetailsTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          trainingMetrics={trainingMetrics}
        />
      </CardContent>
    </Card>
  );
}
