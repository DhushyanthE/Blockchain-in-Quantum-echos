
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { ArrowDown } from 'lucide-react';
import { WorkflowTask } from '@/lib/quantum/WorkflowOptimizer';

interface WorkflowStepProps {
  step: WorkflowTask;
}

export function WorkflowStep({ step }: WorkflowStepProps) {
  return (
    <div className="bg-black/40 border border-purple-500/10 rounded-lg p-3">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
            step.status === 'completed' ? 'bg-green-500/20' : 
            step.status === 'running' ? 'bg-blue-500/20' : 'bg-gray-800'
          }`}>
            {step.icon}
          </div>
          <span className="text-sm font-medium">{step.name}</span>
        </div>
        <span className="text-xs bg-black/60 rounded-full px-2 py-0.5 text-gray-400">
          {step.status === 'completed' ? '100%' : 
           step.status === 'running' ? `${Math.floor(step.progress)}%` : 
           'Pending'}
        </span>
      </div>
      
      <Progress
        value={step.progress}
        className="h-1.5 bg-gray-800"
        indicatorClassName={`${
          step.status === 'completed' ? 'bg-green-500' : 
          step.status === 'running' ? 'bg-blue-500' : 'bg-gray-700'
        }`}
      />
      
      <div className="flex justify-between mt-1.5">
        <span className="text-xs text-gray-400">{step.description}</span>
        {step.dependsOn && step.dependsOn.length > 0 && (
          <span className="text-xs text-gray-500 flex items-center">
            <ArrowDown className="h-3 w-3 mr-1" />
            Depends on: {step.dependsOn.join(', ')}
          </span>
        )}
      </div>
    </div>
  );
}
