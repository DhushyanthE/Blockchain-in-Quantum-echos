
import { useState, useEffect } from 'react';
import { workflowOptimizer, WorkflowTask } from '@/lib/quantum/WorkflowOptimizer';
import { toast } from 'sonner';

export function useWorkflowOptimizer(initialSteps: WorkflowTask[]) {
  const [workflowActive, setWorkflowActive] = useState(false);
  const [optimizing, setOptimizing] = useState(false);
  const [optimizationResult, setOptimizationResult] = useState<any>(null);
  const [steps, setSteps] = useState<WorkflowTask[]>(initialSteps);

  // Toggle workflow active state
  const toggleWorkflow = () => {
    if (!workflowActive) {
      setWorkflowActive(true);
      simulateWorkflowProgress();
      toast.info("Workflow started");
    } else {
      setWorkflowActive(false);
      toast.info("Workflow paused");
    }
  };
  
  // Simulate workflow step progress
  const simulateWorkflowProgress = () => {
    // Reset all steps to initial state if starting over
    setSteps(prev => prev.map(step => ({
      ...step,
      status: step.id === 'data-collection' ? 'running' : 'idle',
      progress: 0
    })));
  };

  // Simulate workflow optimization
  const optimizeWorkflow = () => {
    setOptimizing(true);
    
    // Convert steps to workflow tasks
    const tasks = steps.map(step => ({
      id: step.id,
      name: step.name,
      status: step.status,
      progress: step.progress,
      description: step.description,
      dependsOn: step.dependsOn,
      duration: Math.random() * 100 + 50, // Random duration for simulation
      quantum: ['quantum-processing', 'ai-optimization'].includes(step.id), // Mark quantum steps
      priority: Math.floor(Math.random() * 5) + 1 // Random priority for simulation
    }));
    
    // Optimize workflow
    try {
      const result = workflowOptimizer.optimizeWorkflow(tasks);
      setOptimizationResult(result);
      
      toast.success("Workflow optimized", {
        description: `Reduced execution time by ${result.timeReductionPercentage.toFixed(1)}%`
      });
    } catch (error) {
      console.error("Error optimizing workflow:", error);
      toast.error("Failed to optimize workflow");
    } finally {
      setOptimizing(false);
    }
  };

  // Monitor and update workflow progress
  useEffect(() => {
    if (!workflowActive) return;
    
    const interval = setInterval(() => {
      setSteps(prevSteps => {
        // Find the currently running step, if any
        const runningStepIndex = prevSteps.findIndex(step => step.status === 'running');
        
        // If no running step or all completed
        if (runningStepIndex === -1) {
          // Find the next step to run
          const nextStepIndex = prevSteps.findIndex(step => step.status === 'idle');
          if (nextStepIndex === -1) {
            // All steps completed
            clearInterval(interval);
            toast.success("Workflow completed successfully");
            setWorkflowActive(false);
            return prevSteps;
          }
          
          // Check if dependencies are met
          const nextStep = prevSteps[nextStepIndex];
          if (nextStep.dependsOn && nextStep.dependsOn.length > 0) {
            const dependenciesMet = nextStep.dependsOn.every(depId => 
              prevSteps.find(s => s.id === depId)?.status === 'completed'
            );
            
            if (!dependenciesMet) {
              // Dependencies not met, find another step
              const alternateStepIndex = prevSteps.findIndex(step => 
                step.status === 'idle' && 
                (!step.dependsOn || step.dependsOn.every(depId => 
                  prevSteps.find(s => s.id === depId)?.status === 'completed'
                ))
              );
              
              if (alternateStepIndex === -1) return prevSteps; // No eligible steps
              
              // Start the alternate step
              const newSteps = [...prevSteps];
              newSteps[alternateStepIndex] = {
                ...newSteps[alternateStepIndex],
                status: 'running',
                progress: 5 // Start with a small amount of progress
              };
              return newSteps;
            }
          }
          
          // Start the next step
          const newSteps = [...prevSteps];
          newSteps[nextStepIndex] = {
            ...newSteps[nextStepIndex],
            status: 'running',
            progress: 5 // Start with a small amount of progress
          };
          return newSteps;
        }
        
        // Update the running step
        const newSteps = [...prevSteps];
        const currentStep = newSteps[runningStepIndex];
        const progressIncrease = Math.random() * 15 + 5; // 5-20% increase
        
        if (currentStep.progress + progressIncrease >= 100) {
          // Step completed
          newSteps[runningStepIndex] = {
            ...currentStep,
            status: 'completed',
            progress: 100
          };
          
          // Show toast for step completion
          toast.info(`Step completed: ${currentStep.name}`);
        } else {
          // Update progress
          newSteps[runningStepIndex] = {
            ...currentStep,
            progress: currentStep.progress + progressIncrease
          };
        }
        
        return newSteps;
      });
    }, 1500); // Update every 1.5 seconds
    
    return () => clearInterval(interval);
  }, [workflowActive]);

  return {
    steps,
    setSteps,
    workflowActive,
    optimizing,
    optimizationResult,
    toggleWorkflow,
    optimizeWorkflow
  };
}
