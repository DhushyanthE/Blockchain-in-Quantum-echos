import React from 'react';
import { QuantumCircuit } from '@/lib/quantum/workflow/utils/circuitOptimizer';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface CircuitMetricsProps {
  circuit: QuantumCircuit;
  originalCircuit?: QuantumCircuit;
}

export function CircuitMetrics({ circuit, originalCircuit }: CircuitMetricsProps) {
  // Calculate improvement percentages if original circuit is provided
  const depthImprovement = originalCircuit 
    ? ((originalCircuit.depth - circuit.depth) / originalCircuit.depth) * 100
    : 0;

  const gateCountImprovement = originalCircuit 
    ? ((originalCircuit.gates.length - circuit.gates.length) / originalCircuit.gates.length) * 100
    : 0;
  
  const fidelityImprovement = originalCircuit
    ? ((circuit.fidelity - originalCircuit.fidelity) / originalCircuit.fidelity) * 100
    : 0;
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <MetricCard
        label="Circuit Depth"
        value={circuit.depth.toString()}
        improvement={depthImprovement}
        isBetterWhenLower={true}
        className="bg-gradient-to-br from-blue-900/30 to-blue-800/10"
        icon={
          <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
          </svg>
        }
      />
      
      <MetricCard
        label="Gate Count"
        value={circuit.gates.length.toString()}
        improvement={gateCountImprovement}
        isBetterWhenLower={true}
        className="bg-gradient-to-br from-purple-900/30 to-purple-800/10"
        icon={
          <svg className="w-5 h-5 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
        }
      />
      
      <MetricCard
        label="Circuit Fidelity"
        value={`${(circuit.fidelity * 100).toFixed(2)}%`}
        improvement={fidelityImprovement}
        isBetterWhenLower={false}
        className="bg-gradient-to-br from-green-900/30 to-green-800/10"
        icon={
          <svg className="w-5 h-5 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        }
      />
      
      <MetricCard
        label="Circuit Width"
        value={circuit.numQubits.toString()}
        improvement={0}
        hideImprovement={true}
        className="bg-gradient-to-br from-amber-900/30 to-amber-800/10"
        icon={
          <svg className="w-5 h-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="8" y1="6" x2="21" y2="6"></line>
            <line x1="8" y1="12" x2="21" y2="12"></line>
            <line x1="8" y1="18" x2="21" y2="18"></line>
            <line x1="3" y1="6" x2="3.01" y2="6"></line>
            <line x1="3" y1="12" x2="3.01" y2="12"></line>
            <line x1="3" y1="18" x2="3.01" y2="18"></line>
          </svg>
        }
      />
    </div>
  );
}

interface MetricCardProps {
  label: string;
  value: string;
  improvement: number;
  isBetterWhenLower?: boolean;
  hideImprovement?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

function MetricCard({ 
  label, 
  value, 
  improvement, 
  isBetterWhenLower = false,
  hideImprovement = false,
  className = '',
  icon
}: MetricCardProps) {
  // Determine if improvement is positive
  const isPositiveImprovement = isBetterWhenLower ? improvement > 0 : improvement >= 0;
  
  // Get improvement text and color
  const improvementText = isPositiveImprovement 
    ? `+${Math.abs(improvement).toFixed(1)}%` 
    : `-${Math.abs(improvement).toFixed(1)}%`;
  
  const improvementColor = isPositiveImprovement ? 'text-green-400' : 'text-red-400';
  
  // Determine progress variant
  const progressVariant = isPositiveImprovement ? "success" : "danger";

  // Add animation effects
  const pulseEffect = isPositiveImprovement ? 'animate-pulse' : '';
  
  return (
    <Card className={`border-purple-500/20 p-4 quantum-panel transition-all duration-500 hover:shadow-lg ${className}`}>
      <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
        <div className="flex items-center">
          {icon && <span className={`mr-2 ${pulseEffect}`}>{icon}</span>}
          {label}
        </div>
        {!hideImprovement && Math.abs(improvement) > 0.01 && (
          <div className={`text-xs font-medium ${improvementColor} flex items-center`}>
            {isPositiveImprovement ? (
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
            ) : (
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            )}
            {improvementText}
          </div>
        )}
      </div>
      <div className="text-xl font-bold mt-1 mb-2 text-white">{value}</div>
      
      {!hideImprovement && (
        <Progress 
          value={Math.min(100, Math.abs(improvement))} 
          className="h-1 bg-gray-800/50"
          indicatorClassName="bg-green-500" // Use indicatorClassName instead of variant
        />
      )}
    </Card>
  );
}

export function FixCircuitMetrics() {
  // This is a simplified version focusing only on the error
  return (
    <Progress 
      value={75} 
      className="h-2 bg-gray-700" 
      indicatorClassName="bg-green-500" // Use indicatorClassName instead of variant
    />
  );
}
