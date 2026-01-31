
import React from 'react';
import { WorkflowStep } from './WorkflowStep';
import { WorkflowTask } from '@/lib/quantum/WorkflowOptimizer';

interface WorkflowStepListProps {
  steps: WorkflowTask[];
}

export function WorkflowStepList({ steps }: WorkflowStepListProps) {
  return (
    <div className="space-y-3">
      {steps.map((step) => (
        <WorkflowStep key={step.id} step={step} />
      ))}
    </div>
  );
}
