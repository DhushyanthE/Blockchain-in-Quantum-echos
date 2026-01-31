
import { Database, Cpu, Network, Bot, CheckCircle } from 'lucide-react';
import { WorkflowTask } from '@/lib/quantum/WorkflowOptimizer';
import React from 'react';

export function initializeWorkflowSteps(): WorkflowTask[] {
  return [
    {
      id: 'data-collection',
      name: 'Data Collection',
      status: 'idle',
      progress: 0,
      description: 'Collecting blockchain transaction data',
      icon: React.createElement(Database, { className: "h-4 w-4" })
    },
    {
      id: 'quantum-processing',
      name: 'Quantum Processing',
      status: 'idle',
      progress: 0,
      description: 'Processing data through quantum circuits',
      icon: React.createElement(Cpu, { className: "h-4 w-4" }),
      dependsOn: ['data-collection']
    },
    {
      id: 'ml-analysis',
      name: 'ML Analysis',
      status: 'idle',
      progress: 0,
      description: 'Machine learning pattern detection',
      icon: React.createElement(Network, { className: "h-4 w-4" }),
      dependsOn: ['quantum-processing']
    },
    {
      id: 'ai-optimization',
      name: 'AI Optimization',
      status: 'idle',
      progress: 0,
      description: 'Neural networks optimizing parameters',
      icon: React.createElement(Bot, { className: "h-4 w-4" }),
      dependsOn: ['ml-analysis']
    },
    {
      id: 'validation',
      name: 'Result Validation',
      status: 'idle',
      progress: 0,
      description: 'Validating optimization results',
      icon: React.createElement(CheckCircle, { className: "h-4 w-4" }),
      dependsOn: ['ai-optimization']
    }
  ];
}
