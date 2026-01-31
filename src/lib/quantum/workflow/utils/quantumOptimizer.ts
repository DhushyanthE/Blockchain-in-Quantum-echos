
/**
 * Utilities for applying quantum optimizations to workflows
 */
import { WorkflowTask } from '../types/WorkflowTypes';

/**
 * Apply quantum speedup to applicable tasks
 * @param tasks The workflow tasks
 */
export function applyQuantumSpeedup(tasks: WorkflowTask[]): void {
  tasks.forEach(task => {
    if (task.quantum) {
      // Quantum tasks get a speedup based on various factors
      const baseSpeedup = 1.5;
      const quantumThreshold = Number(import.meta.env.VITE_QUANTUM_THRESHOLD) || 128;
      const qubits = Number(import.meta.env.VITE_QUANTUM_QUBITS) || 64;
      
      // Calculate speedup based on problem complexity and available qubits
      const complexityFactor = task.priority ? task.priority / 5 : 1;
      const qubitFactor = qubits / quantumThreshold;
      
      // Apply speedup to task duration
      const speedup = baseSpeedup * complexityFactor * qubitFactor;
      task.duration = (task.duration || 0) / speedup;
    }
  });
}
