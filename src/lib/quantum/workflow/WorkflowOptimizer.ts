
/**
 * Workflow Optimizer
 * Optimizes quantum workflows by managing dependencies and execution order
 */

import { WorkflowTask, WorkflowOptimizationResult } from './types/WorkflowTypes';
import { calculateSequentialExecutionTime, calculateParallelExecutionTime, estimateTaskDuration } from './utils/executionUtils';
import { optimizeTaskOrder } from './utils/dependencyGraph';
import { applyQuantumSpeedup } from './utils/quantumOptimizer';

export class WorkflowOptimizer {
  /**
   * Optimize a workflow by analyzing dependencies and finding an optimal execution order
   * @param tasks The tasks in the workflow
   * @returns The optimization result
   */
  public optimizeWorkflow(tasks: WorkflowTask[]): WorkflowOptimizationResult {
    // Clone tasks to avoid modifying the original
    const workingTasks = JSON.parse(JSON.stringify(tasks)) as WorkflowTask[];
    
    // Calculate the original sequential execution time
    const originalExecutionTime = calculateSequentialExecutionTime(workingTasks);
    
    // Optimize task order and parallelization
    const optimizedTasks = optimizeTaskOrder(workingTasks);
    
    // Apply quantum speedup where applicable
    applyQuantumSpeedup(optimizedTasks);
    
    // Calculate optimized execution time
    const executionTime = calculateParallelExecutionTime(optimizedTasks);
    
    // Calculate parallelization factor
    const parallelizationFactor = originalExecutionTime / executionTime;
    
    // Calculate quantum speedup
    const quantumTasks = optimizedTasks.filter(task => task.quantum);
    const quantumExecutionTime = quantumTasks.reduce((sum, task) => sum + (task.duration || 0), 0);
    const quantumSpeedup = quantumTasks.length > 0 ? 
      calculateSequentialExecutionTime(quantumTasks) / quantumExecutionTime : 1;
    
    return {
      originalExecutionTime,
      optimizedExecutionTime: executionTime,
      timeReduction: originalExecutionTime - executionTime,
      timeReductionPercentage: 100 * (originalExecutionTime - executionTime) / originalExecutionTime,
      parallelizationFactor,
      quantumSpeedup,
      optimizedTasks
    };
  }
}

// Export a singleton instance for easy access
export const workflowOptimizer = new WorkflowOptimizer();
