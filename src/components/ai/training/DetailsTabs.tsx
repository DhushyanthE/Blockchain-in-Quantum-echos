
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface DetailsTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  trainingMetrics: {
    accuracy: number;
    loss: number;
    fidelity: number;
    quantumAdvantage: number;
  };
}

export function DetailsTabs({
  activeTab,
  setActiveTab,
  trainingMetrics
}: DetailsTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid grid-cols-2">
        <TabsTrigger value="metrics" className="data-[state=active]:bg-purple-900/30">
          Metrics
        </TabsTrigger>
        <TabsTrigger value="circuit" className="data-[state=active]:bg-purple-900/30">
          Circuit
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="metrics" className="space-y-4 mt-4">
        <div className="bg-gray-900/40 p-3 rounded-lg border border-gray-800">
          <h4 className="text-sm font-medium text-gray-300 mb-2">Training Metrics</h4>
          <table className="w-full text-xs">
            <tbody>
              <tr>
                <td className="py-1 text-gray-400">Accuracy</td>
                <td className="py-1 text-right text-white">{(trainingMetrics.accuracy * 100).toFixed(2)}%</td>
              </tr>
              <tr>
                <td className="py-1 text-gray-400">Loss</td>
                <td className="py-1 text-right text-white">{trainingMetrics.loss.toFixed(4)}</td>
              </tr>
              <tr>
                <td className="py-1 text-gray-400">Quantum Fidelity</td>
                <td className="py-1 text-right text-white">{(trainingMetrics.fidelity * 100).toFixed(2)}%</td>
              </tr>
              <tr>
                <td className="py-1 text-gray-400">Quantum Advantage</td>
                <td className="py-1 text-right text-white">{trainingMetrics.quantumAdvantage.toFixed(2)}x</td>
              </tr>
              <tr>
                <td className="py-1 text-gray-400">Learning Rate</td>
                <td className="py-1 text-right text-white">0.001</td>
              </tr>
              <tr>
                <td className="py-1 text-gray-400">Optimizer</td>
                <td className="py-1 text-right text-white">Quantum Adam</td>
              </tr>
              <tr>
                <td className="py-1 text-gray-400">Batch Size</td>
                <td className="py-1 text-right text-white">32</td>
              </tr>
            </tbody>
          </table>
        </div>
      </TabsContent>
      
      <TabsContent value="circuit" className="space-y-4 mt-4">
        <div className="bg-gray-900/40 p-3 rounded-lg border border-gray-800">
          <h4 className="text-sm font-medium text-gray-300 mb-2">Quantum Circuit</h4>
          
          <div className="circuit-visualization h-20 w-full relative">
            {/* Horizontal wires */}
            {[0, 1, 2].map((i) => (
              <div 
                key={i}
                className="circuit-wire absolute left-0 right-0" 
                style={{ top: `${10 + i * 20}px` }}
              />
            ))}
            
            {/* Quantum gates */}
            {[
              { top: 5, left: 30, type: 'H', qubit: 0 },
              { top: 25, left: 80, type: 'X', qubit: 1 },
              { top: 45, left: 30, type: 'H', qubit: 2 },
              { top: 5, left: 130, type: 'CNOT', qubit: 0, target: 1 },
              { top: 25, left: 180, type: 'Z', qubit: 1 },
              { top: 45, left: 230, type: 'H', qubit: 2 },
            ].map((gate, i) => (
              <div 
                key={i} 
                className="absolute quantum-gate bg-purple-900/50 border border-purple-500 w-8 h-8 flex items-center justify-center text-xs font-bold rounded"
                style={{ 
                  top: `${gate.top}px`, 
                  left: `${gate.left}px`
                }}
              >
                {gate.type}
              </div>
            ))}
            
            {/* CNOT connectors */}
            <div className="absolute w-1 bg-purple-500 h-20 left-[134px] top-[10px]" />
            <div className="absolute w-2 h-2 bg-purple-500 rounded-full left-[133px] top-[30px]" />
          </div>
          
          <div className="mt-3 text-xs text-gray-400">
            Quantum circuit with 3 qubits, featuring Hadamard, X, Z gates and CNOT entanglements
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
