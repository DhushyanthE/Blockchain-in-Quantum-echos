
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Cpu, Zap, Network, ShieldCheck, Database } from 'lucide-react';
import { agiModule } from '@/lib/quantum/AGIModule';
import { superAIModule } from '@/lib/quantum/SuperAIModule';
import { toast } from 'sonner';

export function QuantumAICapabilities() {
  const [agiCapabilities, setAgiCapabilities] = useState<any[]>([]);
  const [superAICapabilities, setSuperAICapabilities] = useState<any[]>([]);
  const [agiMetrics, setAgiMetrics] = useState<any>({});
  const [superAIMetrics, setSuperAIMetrics] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCapabilities = async () => {
      try {
        // Load AGI capabilities
        const agiCaps = agiModule.getCapabilities();
        setAgiCapabilities(agiCaps);
        
        // Load Super AI capabilities
        const superCaps = superAIModule.getCapabilities();
        setSuperAICapabilities(superCaps);
        
        // Load metrics
        setAgiMetrics(agiModule.getMetrics());
        setSuperAIMetrics(superAIModule.getMetrics());
        
        setIsLoading(false);
        
        // Simulate AGI processing to showcase capabilities
        await agiModule.processInput({
          operation: "capabilities_demonstration",
          complexity: "high"
        });
        
        toast.success("Quantum AGI analysis complete", {
          description: "Neural networks optimized for blockchain integration"
        });
      } catch (error) {
        console.error("Error loading AI capabilities:", error);
        setIsLoading(false);
      }
    };
    
    loadCapabilities();
  }, []);

  // Function to get an icon based on capability name
  const getCapabilityIcon = (name: string | undefined) => {
    // Add null check to prevent error when name is undefined
    if (!name) {
      return <Zap className="h-4 w-4 text-orange-400" />; // Default icon
    }
    
    const lowerName = name.toLowerCase();
    
    if (lowerName.includes('neural') || lowerName.includes('learning')) {
      return <Brain className="h-4 w-4 text-blue-400" />;
    } else if (lowerName.includes('quantum')) {
      return <Cpu className="h-4 w-4 text-purple-400" />;
    } else if (lowerName.includes('pattern') || lowerName.includes('recognition')) {
      return <Network className="h-4 w-4 text-green-400" />;
    } else if (lowerName.includes('blockchain') || lowerName.includes('security')) {
      return <ShieldCheck className="h-4 w-4 text-yellow-400" />;
    } else if (lowerName.includes('data') || lowerName.includes('knowledge')) {
      return <Database className="h-4 w-4 text-teal-400" />;
    } else {
      return <Zap className="h-4 w-4 text-orange-400" />;
    }
  };

  // Helper function to safely format numbers with toFixed
  const safeToFixed = (value: any, decimals: number = 2) => {
    if (value === undefined || value === null || isNaN(value)) {
      return '0';
    }
    return Number(value).toFixed(decimals);
  };

  return (
    <Card className="bg-black/70 border-purple-500/20 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-400" />
          <span>Quantum Intelligence Capabilities</span>
          <Badge className="ml-auto text-xs bg-gradient-to-r from-purple-600 to-blue-600">
            AGI + Super AI Integration
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin h-8 w-8 border-4 border-t-purple-500 border-purple-500/30 rounded-full"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* AGI Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-gray-900/40 rounded-lg p-3 border border-purple-500/10">
                <div className="text-xs text-gray-400 mb-1">AGI Cognitive Capacity</div>
                <div className="text-xl font-semibold text-white">{safeToFixed(agiMetrics.cognitiveCapacity)}</div>
                <Progress value={(agiMetrics.cognitiveCapacity || 0) * 10} className="h-1 mt-2" />
              </div>
              <div className="bg-gray-900/40 rounded-lg p-3 border border-purple-500/10">
                <div className="text-xs text-gray-400 mb-1">Quantum Advantage</div>
                <div className="text-xl font-semibold text-white">{safeToFixed((agiMetrics.quantumAdvantage || 0) * 100, 1)}%</div>
                <Progress value={(agiMetrics.quantumAdvantage || 0) * 100} className="h-1 mt-2" />
              </div>
              <div className="bg-gray-900/40 rounded-lg p-3 border border-purple-500/10">
                <div className="text-xs text-gray-400 mb-1">Super AI IQ</div>
                <div className="text-xl font-semibold text-white">{Math.round(superAIMetrics.intelligenceQuotient || 0)}</div>
                <Progress value={((superAIMetrics.intelligenceQuotient || 0) / 300) * 100} className="h-1 mt-2" />
              </div>
              <div className="bg-gray-900/40 rounded-lg p-3 border border-purple-500/10">
                <div className="text-xs text-gray-400 mb-1">Processing Capacity</div>
                <div className="text-xl font-semibold text-white">{Math.round((superAIMetrics.processingCapacity || 0) / 1000)} TFLOPS</div>
                <Progress value={((superAIMetrics.processingCapacity || 0) / 20000) * 100} className="h-1 mt-2" />
              </div>
            </div>
            
            {/* AGI Capabilities */}
            <div>
              <h3 className="text-sm font-medium mb-3 flex items-center">
                <Brain className="h-4 w-4 mr-2 text-blue-400" />
                Artificial General Intelligence
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {agiCapabilities.slice(0, 4).map((capability) => (
                  <div key={capability.id} className="flex items-start gap-3 bg-gray-900/40 p-3 rounded-lg border border-blue-500/10">
                    {getCapabilityIcon(capability.name)}
                    <div>
                      <h4 className="text-sm font-medium">{capability.name}</h4>
                      <p className="text-xs text-gray-400 mt-1">{capability.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="text-xs text-gray-500">Success Rate:</div>
                        <Progress value={(capability.probabilityOfSuccess || 0) * 100} className="h-1 flex-1" />
                        <div className="text-xs text-gray-300">{Math.round((capability.probabilityOfSuccess || 0) * 100)}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Super AI Capabilities */}
            <div>
              <h3 className="text-sm font-medium mb-3 flex items-center">
                <Zap className="h-4 w-4 mr-2 text-yellow-400" />
                Artificial Superintelligence
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {superAICapabilities.slice(0, 4).map((capability) => (
                  <div key={capability.id} className="flex items-start gap-3 bg-gray-900/40 p-3 rounded-lg border border-yellow-500/10">
                    {getCapabilityIcon(capability.name)}
                    <div>
                      <h4 className="text-sm font-medium">{capability.name}</h4>
                      <p className="text-xs text-gray-400 mt-1">{capability.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="text-xs text-gray-500">Power Level:</div>
                        <Progress 
                          value={(capability.powerLevel || 0) * 10} 
                          className="h-1 flex-1 bg-gray-800" 
                        />
                        <div className="text-xs text-gray-300">{safeToFixed(capability.powerLevel || 0, 1)}/10</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Blockchain Integration - Removed apply function from Quantum coin section */}
            <div className="bg-gray-900/40 p-4 rounded-lg border border-purple-500/10">
              <h3 className="text-sm font-medium mb-2 flex items-center">
                <Database className="h-4 w-4 mr-2 text-purple-400" />
                Quantum Blockchain Integration
              </h3>
              <p className="text-xs text-gray-400 mb-3">
                AGI and Super AI capabilities are integrated with quantum-resistant blockchain technologies 
                to enable self-optimizing networks, quantum-secured transactions, and advanced neural 
                prediction systems.
              </p>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-black/30 rounded-md p-2 text-center">
                  <div className="text-xs text-gray-400 mb-1">Quantum Security</div>
                  <div className="text-sm font-medium text-white">
                    {Math.round((superAIMetrics.systemStability || 0) * 100)}%
                  </div>
                </div>
                <div className="bg-black/30 rounded-md p-2 text-center">
                  <div className="text-xs text-gray-400 mb-1">Neural Density</div>
                  <div className="text-sm font-medium text-white">
                    {Math.round(((agiMetrics.cognitiveCapacity || 0) * 24.5))}K
                  </div>
                </div>
                <div className="bg-black/30 rounded-md p-2 text-center">
                  <div className="text-xs text-gray-400 mb-1">Self-Improvement</div>
                  <div className="text-sm font-medium text-white">
                    {safeToFixed(superAIMetrics.selfImprovementRate || 0, 1)}%/day
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
