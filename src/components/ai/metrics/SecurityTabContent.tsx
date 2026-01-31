
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { SecurityMetric } from './types';

export interface SecurityTabContentProps {
  securityMetrics: SecurityMetric[];
  isLoading: boolean;
}

export const SecurityTabContent: React.FC<SecurityTabContentProps> = ({ securityMetrics, isLoading }) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-24 w-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {securityMetrics.map((metric, index) => (
        <div key={index} className="bg-gray-800/50 rounded-md p-3 border border-gray-700">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-200 font-medium">{metric.algorithm}</span>
            <Badge variant={metric.isQuantumResistant ? "default" : "destructive"} className={metric.isQuantumResistant ? "bg-green-600" : ""}>
              {metric.isQuantumResistant ? 'Quantum Resistant' : 'Vulnerable'}
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-gray-400">Key Size:</div>
            <div className="text-gray-300">{metric.keySize} bits</div>
            
            <div className="text-gray-400">Security Score:</div>
            <div className={metric.resistanceScore > 90 ? "text-green-400" : metric.resistanceScore > 80 ? "text-yellow-400" : "text-red-400"}>
              {metric.resistanceScore.toFixed(1)}%
            </div>
            
            <div className="text-gray-400">Qubits to Break:</div>
            <div className="text-gray-300">{metric.qubitEstimate.toLocaleString()}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
