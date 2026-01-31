
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { FidelityMetric } from './types';

export interface FidelityTabContentProps {
  fidelityMetrics: FidelityMetric[];
  isLoading: boolean;
}

export const FidelityTabContent: React.FC<FidelityTabContentProps> = ({ fidelityMetrics, isLoading }) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-6 w-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {fidelityMetrics.map((metric, index) => (
        <div key={index} className="space-y-1">
          <div className="flex justify-between">
            <div className="text-gray-200">{metric.name}</div>
            <div className={metric.value >= metric.threshold ? 'text-green-400' : 'text-yellow-400'}>
              {metric.value.toFixed(1)}%
            </div>
          </div>
          <Progress 
            value={metric.value} 
            max={100}
            className="h-2 bg-gray-700"
            indicatorClassName={
              metric.value >= metric.threshold 
                ? "bg-gradient-to-r from-green-500 to-emerald-400" 
                : "bg-gradient-to-r from-yellow-500 to-orange-400"
            }
          />
          <p className="text-xs text-gray-400 mt-1">{metric.description}</p>
        </div>
      ))}
    </div>
  );
};
