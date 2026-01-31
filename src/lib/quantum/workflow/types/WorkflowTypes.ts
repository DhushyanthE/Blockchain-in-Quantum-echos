
/**
 * Types for the Workflow Optimizer
 */

export interface WorkflowTask {
  id: string;
  name: string;
  status: 'idle' | 'running' | 'completed' | 'failed';
  progress: number;
  description: string;
  dependsOn?: string[];
  duration?: number;
  quantum?: boolean;
  priority?: number;
  icon?: React.ReactElement;
}

// Alias for compatibility with components using WorkflowStep
export type WorkflowStep = WorkflowTask;

export interface WorkflowOptimizationResult {
  originalExecutionTime: number;
  optimizedExecutionTime: number;
  timeReduction: number;
  timeReductionPercentage: number;
  parallelizationFactor: number;
  quantumSpeedup: number;
  optimizedTasks: WorkflowTask[];
}
