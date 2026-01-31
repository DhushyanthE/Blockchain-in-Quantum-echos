/**
 * Manages task subscriptions for the Real-Time Quantum Processor
 */
import { QuantumTask } from '../workflow/types';
import { TaskUpdateCallback } from './types';
import { quantumWorkflowHandler } from '../QuantumWorkflowHandler';

export interface Task {
  id: string;
  type: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  parameters: any; // Required property
  startTime: number; // Required property
  // ... other properties
}

export class TaskSubscriptionManager {
  private taskSubscriptions: Map<string, Set<TaskUpdateCallback>> = new Map();

  // Subscribe to task updates
  public subscribeToTask(
    taskId: string, 
    callback: TaskUpdateCallback
  ): () => void {
    if (!this.taskSubscriptions.has(taskId)) {
      this.taskSubscriptions.set(taskId, new Set());
    }
    
    this.taskSubscriptions.get(taskId)!.add(callback);
    
    // Return unsubscribe function
    return () => {
      const subscribers = this.taskSubscriptions.get(taskId);
      if (subscribers) {
        subscribers.delete(callback);
        if (subscribers.size === 0) {
          this.taskSubscriptions.delete(taskId);
        }
      }
    };
  }

  // Notify task subscribers of updates
  public notifyTaskSubscribers(taskId: string): void {
    const handlerTask = quantumWorkflowHandler.getTask(taskId);
    if (!handlerTask) return;
    
    // Convert from QuantumWorkflowHandler.QuantumTask to workflow/types.QuantumTask
    const task: QuantumTask = {
      id: handlerTask.id,
      type: handlerTask.type as any, // Convert the type
      status: handlerTask.status === 'pending' ? 'queued' : handlerTask.status as any, // Map 'pending' to 'queued'
      priority: handlerTask.priority,
      data: handlerTask.parameters || {}, // Map parameters to data
      result: handlerTask.result,
      error: handlerTask.error || undefined, // Handle potential null or missing error
      createdAt: Date.now(),
      startTime: handlerTask.startTime || undefined, // Use undefined if not available
      completedAt: undefined // Set as undefined since it's not available in the handler task
    };
    
    const subscribers = this.taskSubscriptions.get(taskId);
    if (subscribers) {
      subscribers.forEach(callback => {
        try {
          callback(task);
        } catch (error) {
          console.error('Error in task subscription callback:', error);
        }
      });
    }
  }

  // Check if a task has subscribers
  public hasSubscribers(taskId: string): boolean {
    return this.taskSubscriptions.has(taskId) && 
           this.taskSubscriptions.get(taskId)!.size > 0;
  }
}
