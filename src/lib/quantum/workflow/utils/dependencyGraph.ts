
/**
 * Utilities for managing task dependencies and optimizing task order
 */
import { WorkflowTask } from '../types/WorkflowTypes';

/**
 * Optimize the order of tasks to maximize parallelization
 * @param tasks The workflow tasks
 * @returns The optimized tasks with updated order
 */
export function optimizeTaskOrder(tasks: WorkflowTask[]): WorkflowTask[] {
  // Build dependency graph
  const taskMap = new Map<string, WorkflowTask>();
  const dependencyGraph = new Map<string, Set<string>>();
  const reverseDependencyGraph = new Map<string, Set<string>>();
  
  // Initialize maps
  tasks.forEach(task => {
    taskMap.set(task.id, task);
    dependencyGraph.set(task.id, new Set<string>());
    reverseDependencyGraph.set(task.id, new Set<string>());
  });
  
  // Populate dependency graphs
  tasks.forEach(task => {
    if (task.dependsOn) {
      task.dependsOn.forEach(depId => {
        if (taskMap.has(depId)) {
          dependencyGraph.get(task.id)?.add(depId);
          reverseDependencyGraph.get(depId)?.add(task.id);
        }
      });
    }
  });
  
  // Find tasks with no dependencies (roots)
  const roots = Array.from(taskMap.keys()).filter(id => 
    dependencyGraph.get(id)?.size === 0
  );
  
  // Order tasks using a topological sort
  const visited = new Set<string>();
  const result: WorkflowTask[] = [];
  
  // Sort roots by priority (higher priority first)
  roots.sort((a, b) => 
    (taskMap.get(b)?.priority || 0) - (taskMap.get(a)?.priority || 0)
  );
  
  // Process each root
  roots.forEach(root => {
    visitTask(root, taskMap, dependencyGraph, reverseDependencyGraph, visited, result);
  });
  
  // Handle cycles and ensure all tasks are included
  tasks.forEach(task => {
    if (!visited.has(task.id)) {
      result.push(task);
    }
  });
  
  return result;
}

/**
 * Visit a task in the dependency graph (topological sort)
 */
function visitTask(
  taskId: string,
  taskMap: Map<string, WorkflowTask>,
  dependencyGraph: Map<string, Set<string>>,
  reverseDependencyGraph: Map<string, Set<string>>,
  visited: Set<string>,
  result: WorkflowTask[]
): void {
  if (visited.has(taskId)) return;
  visited.add(taskId);
  
  // Process all dependencies first
  const dependencies = dependencyGraph.get(taskId) || new Set<string>();
  Array.from(dependencies).forEach(depId => {
    visitTask(depId, taskMap, dependencyGraph, reverseDependencyGraph, visited, result);
  });
  
  // Add this task to the result
  const task = taskMap.get(taskId);
  if (task) {
    result.push(task);
  }
}
