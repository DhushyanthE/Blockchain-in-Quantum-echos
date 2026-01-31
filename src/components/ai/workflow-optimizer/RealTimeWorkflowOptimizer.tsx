
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Workflow } from 'lucide-react';
import { WorkflowControls } from './WorkflowControls';
import { WorkflowStepList } from './WorkflowStepList';
import { OptimizationResult } from './OptimizationResult';
import { useWorkflowOptimizer } from './useWorkflowOptimizer';
import { initializeWorkflowSteps } from './initializeWorkflowSteps';

export function RealTimeWorkflowOptimizer() {
  const {
    steps,
    setSteps,
    workflowActive,
    optimizing,
    optimizationResult,
    toggleWorkflow,
    optimizeWorkflow
  } = useWorkflowOptimizer([]);
  
  // Initialize workflow steps
  useEffect(() => {
    const initialSteps = initializeWorkflowSteps();
    setSteps(initialSteps);
  }, [setSteps]);

  return (
    <Card className="bg-black/70 border-purple-500/20 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Workflow className="h-5 w-5 text-purple-400" />
            <span>Real-Time Workflow Optimizer</span>
          </div>
          
          <WorkflowControls 
            workflowActive={workflowActive}
            optimizing={optimizing}
            toggleWorkflow={toggleWorkflow}
            optimizeWorkflow={optimizeWorkflow}
          />
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          {/* Steps visualization */}
          <WorkflowStepList steps={steps} />
          
          {/* Optimization results */}
          <OptimizationResult result={optimizationResult} />
        </div>
      </CardContent>
    </Card>
  );
}
