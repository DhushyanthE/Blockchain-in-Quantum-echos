
import { QuantumTask, QuantumWorkflowState } from './types';

/**
 * Manages the task queue for quantum workflow operations
 */
export class TaskQueueManager {
  private state: QuantumWorkflowState;

  constructor(initialState: QuantumWorkflowState) {
    this.state = { ...initialState };
  }

  /**
   * Get the current state
   */
  getState(): QuantumWorkflowState {
    return { ...this.state };
  }

  /**
   * Set the state
   */
  setState(newState: Partial<QuantumWorkflowState>): void {
    this.state = { ...this.state, ...newState };
  }

  /**
   * Add a task to the processing queue
   */
  addTask(task: QuantumTask): string {
    // Add task to tasks map
    this.state.tasks = {
      ...this.state.tasks,
      [task.id]: task
    };

    // Add task ID to processing queue based on priority
    const { processingQueue } = this.state;
    
    // Insert at the right position based on priority
    let inserted = false;
    for (let i = 0; i < processingQueue.length; i++) {
      const existingTask = this.state.tasks[processingQueue[i]];
      if (task.priority > existingTask.priority) {
        processingQueue.splice(i, 0, task.id);
        inserted = true;
        break;
      }
    }
    
    // If not inserted, add to end
    if (!inserted) {
      processingQueue.push(task.id);
    }
    
    this.state.processingQueue = [...processingQueue];
    return task.id;
  }

  /**
   * Get the next task from the processing queue
   */
  getNextTask(): QuantumTask | null {
    if (this.state.processingQueue.length === 0) {
      return null;
    }

    const taskId = this.state.processingQueue[0];
    const task = this.state.tasks[taskId];
    
    if (!task) {
      this.state.processingQueue = this.state.processingQueue.slice(1);
      return null;
    }
    
    // Update task status and starting time
    const updatedTask: QuantumTask = {
      ...task,
      status: 'processing',
      startTime: Date.now()
    };
    
    this.state.tasks = {
      ...this.state.tasks,
      [taskId]: updatedTask
    };
    
    // Remove from processing queue and set as active
    this.state.processingQueue = this.state.processingQueue.slice(1);
    this.state.activeTaskId = taskId;
    
    return updatedTask;
  }

  /**
   * Mark task as completed
   */
  completeTask(taskId: string, result: any): void {
    const task = this.state.tasks[taskId];
    if (!task) {
      return;
    }
    
    const updatedTask: QuantumTask = {
      ...task,
      status: 'completed',
      result,
      completedAt: Date.now()
    };
    
    this.state.tasks = {
      ...this.state.tasks,
      [taskId]: updatedTask
    };
    
    // Add to completed tasks
    this.state.completedTasks = [...this.state.completedTasks, taskId];
    
    // Clear active task
    this.state.activeTaskId = null;
  }

  /**
   * Mark task as failed
   */
  failTask(taskId: string, error: string): void {
    const task = this.state.tasks[taskId];
    if (!task) {
      return;
    }
    
    const updatedTask: QuantumTask = {
      ...task,
      status: 'failed',
      error,
      completedAt: Date.now()
    };
    
    this.state.tasks = {
      ...this.state.tasks,
      [taskId]: updatedTask
    };
    
    // Clear active task
    this.state.activeTaskId = null;
  }

  /**
   * Get a task by ID
   */
  getTask(taskId: string): QuantumTask | null {
    return this.state.tasks[taskId] || null;
  }

  /**
   * Clear all tasks
   */
  clearTasks(): void {
    this.state.tasks = {};
    this.state.processingQueue = [];
    this.state.completedTasks = [];
    this.state.activeTaskId = null;
  }

  /**
   * Get all tasks in priority order
   */
  getAllTasksSorted(): QuantumTask[] {
    return Object.values(this.state.tasks).sort((a, b) => b.priority - a.priority);
  }
}
