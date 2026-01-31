
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  Cpu, 
  Layers, 
  Network, 
  Zap, 
  Gauge, 
  Lock, 
  Wifi
} from 'lucide-react';

export function QuantumSpecs3D() {
  const [activeTab, setActiveTab] = useState('architecture');
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  
  const specs = {
    architecture: [
      { name: 'Quantum Processing Units', value: 1024, max: 1024, unit: 'QPUs', icon: <Cpu className="h-4 w-4" /> },
      { name: 'Memory Coherence', value: 99.2, max: 100, unit: '%', icon: <Layers className="h-4 w-4" /> },
      { name: 'Entanglement Distance', value: 352, max: 500, unit: 'km', icon: <Network className="h-4 w-4" /> },
      { name: 'Qubit Fidelity', value: 97.8, max: 100, unit: '%', icon: <Gauge className="h-4 w-4" /> }
    ],
    security: [
      { name: 'Quantum Resistant Encryption', value: 256, max: 256, unit: 'bits', icon: <Shield className="h-4 w-4" /> },
      { name: 'Post-Quantum Security', value: 99.7, max: 100, unit: '%', icon: <Lock className="h-4 w-4" /> },
      { name: 'Frequency Isolation', value: 87.5, max: 100, unit: '%', icon: <Wifi className="h-4 w-4" /> },
      { name: 'Energy Efficiency', value: 92.3, max: 100, unit: '%', icon: <Zap className="h-4 w-4" /> }
    ],
    performance: [
      { name: 'Transaction Speed', value: 8720, max: 10000, unit: 'TPS', icon: <Gauge className="h-4 w-4" /> },
      { name: 'Latency', value: 42, max: 100, unit: 'ms', icon: <Network className="h-4 w-4" /> },
      { name: 'Network Uptime', value: 99.982, max: 100, unit: '%', icon: <Wifi className="h-4 w-4" /> },
      { name: 'Throughput', value: 785, max: 1000, unit: 'MB/s', icon: <Zap className="h-4 w-4" /> }
    ]
  };
  
  type SpecCategory = 'architecture' | 'security' | 'performance';
  
  const getColorForValue = (value: number, max: number) => {
    const percentage = value / max;
    if (percentage > 0.9) return 'bg-green-600';
    if (percentage > 0.7) return 'bg-blue-600';
    if (percentage > 0.5) return 'bg-yellow-600';
    return 'bg-red-600';
  };
  
  const renderSpecCard = (spec: { name: string; value: number; max: number; unit: string; icon: JSX.Element }, isSelected: boolean) => {
    const percentage = (spec.value / spec.max) * 100;
    
    return (
      <div 
        className={`bg-black/40 border ${isSelected ? 'border-purple-500' : 'border-gray-800'} rounded-lg p-4 transition-all duration-300 hover:border-purple-500/50 cursor-pointer ${isSelected ? 'transform scale-105' : ''}`}
        onClick={() => setSelectedFeature(spec.name)}
      >
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center">
            <div className="p-1.5 rounded-full bg-purple-900/40 mr-2">
              {spec.icon}
            </div>
            <h4 className="font-medium text-white">{spec.name}</h4>
          </div>
          <Badge variant="outline" className={`${getColorForValue(spec.value, spec.max).replace('bg-', 'bg-opacity-20 border-')}`}>
            {spec.value} {spec.unit}
          </Badge>
        </div>
        
        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Performance</span>
            <span>{Math.round(percentage)}%</span>
          </div>
          <Progress 
            value={percentage} 
            className="h-1.5 bg-gray-800" 
            indicatorClassName={`${getColorForValue(spec.value, spec.max)}`}
          />
        </div>
        
        {isSelected && (
          <div className="mt-3 text-xs text-gray-400 animate-fade-in">
            {getSpecDescription(spec.name)}
          </div>
        )}
      </div>
    );
  };
  
  const getSpecDescription = (name: string) => {
    const descriptions: { [key: string]: string } = {
      'Quantum Processing Units': 'High-density QPU array with fully coherent quantum gates and multi-dimensional entanglement capabilities.',
      'Memory Coherence': 'Quantum state preservation across the memory subsystem with error correction and entanglement fidelity.',
      'Entanglement Distance': 'Maximum distance for stable quantum entanglement with guaranteed state preservation across network links.',
      'Qubit Fidelity': 'Accuracy of qubit states after multiple gate operations, including error correction mechanisms.',
      'Quantum Resistant Encryption': 'Post-quantum cryptographic algorithms resistant to attacks from both classical and quantum computers.',
      'Post-Quantum Security': 'Protection level against attacks from theoretical future quantum computers with >5000 qubits.',
      'Frequency Isolation': 'Protection against frequency analysis and side-channel attacks through quantum noise injection.',
      'Energy Efficiency': 'Power consumption optimization compared to classical systems performing equivalent security functions.',
      'Transaction Speed': 'Number of verified transactions processed per second under network load conditions.',
      'Latency': 'Average time for transaction confirmation across the quantum-secured network.',
      'Network Uptime': 'Percentage of guaranteed network availability including during quantum state recalibration.',
      'Throughput': 'Data processing capability under optimal network conditions with quantum acceleration.'
    };
    
    return descriptions[name] || 'Advanced quantum technology providing next-generation capabilities.';
  };
  
  return (
    <Card className="bg-black/70 border-purple-500/20 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-white flex items-center gap-2">
          <Cpu className="h-5 w-5 text-purple-400" />
          Quantum Core Specifications
          <Badge variant="outline" className="ml-auto bg-purple-900/30 text-purple-300 text-xs">
            QNTM-CORE
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs 
          value={activeTab} 
          onValueChange={(value) => {
            setActiveTab(value as SpecCategory);
            setSelectedFeature(null);
          }} 
          className="space-y-4"
        >
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="architecture" className="data-[state=active]:bg-purple-900/30">
              <Cpu className="h-4 w-4 mr-2" />
              Architecture
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-purple-900/30">
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="performance" className="data-[state=active]:bg-purple-900/30">
              <Gauge className="h-4 w-4 mr-2" />
              Performance
            </TabsTrigger>
          </TabsList>
          
          {(['architecture', 'security', 'performance'] as const).map((category) => (
            <TabsContent key={category} value={category} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {specs[category].map((spec) => (
                  <div key={spec.name} className="animate-fade-in">
                    {renderSpecCard(spec, selectedFeature === spec.name)}
                  </div>
                ))}
              </div>
              
              {/* 3D visualization teaser for the specs */}
              <div className="bg-black/40 border border-gray-800 rounded-lg p-4 mt-4">
                <h4 className="font-medium text-white mb-3 flex items-center">
                  <Layers className="h-4 w-4 mr-2 text-purple-400" />
                  Quantum Core Architecture Visualization
                </h4>
                <div className="h-36 bg-black/60 rounded-md relative overflow-hidden">
                  {/* Simulated 3D visualization with CSS */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-24 h-24">
                      <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full animate-pulse"></div>
                      <div className="absolute inset-2 border-2 border-blue-500/40 rounded-full" style={{animationDelay: '0.5s'}}></div>
                      <div className="absolute inset-4 border border-green-500/50 rounded-full" style={{animationDelay: '1s'}}></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-3 w-3 bg-purple-500 rounded-full animate-ping"></div>
                      </div>
                    </div>
                    
                    {/* Connection lines */}
                    <div className="absolute top-1/4 left-1/4 h-1 w-16 bg-purple-500/30 transform rotate-45"></div>
                    <div className="absolute bottom-1/4 right-1/4 h-1 w-16 bg-blue-500/30 transform -rotate-45"></div>
                  </div>
                  
                  {/* Nodes */}
                  <div className="absolute top-1/4 left-1/4 h-3 w-3 bg-purple-500/80 rounded-full"></div>
                  <div className="absolute bottom-1/4 right-1/4 h-3 w-3 bg-blue-500/80 rounded-full"></div>
                  
                  {/* Grid lines for depth perception */}
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(138, 43, 226, .1) 25%, rgba(138, 43, 226, .1) 26%, transparent 27%, transparent 74%, rgba(138, 43, 226, .1) 75%, rgba(138, 43, 226, .1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(138, 43, 226, .1) 25%, rgba(138, 43, 226, .1) 26%, transparent 27%, transparent 74%, rgba(138, 43, 226, .1) 75%, rgba(138, 43, 226, .1) 76%, transparent 77%, transparent)',
                    backgroundSize: '30px 30px'
                  }}></div>
                </div>
                <div className="text-xs text-gray-400 mt-2 text-center">
                  Interactive 3D visualization available in the Quantum Core Explorer
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
