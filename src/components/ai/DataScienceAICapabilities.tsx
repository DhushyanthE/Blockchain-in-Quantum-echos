import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Database, Cpu, Cloud, BarChart3, Settings, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { dataScienceAGI } from '@/lib/quantum/DataScienceAGI';
import { superAIModule } from '@/lib/quantum/SuperAIModule';
import { toast } from 'sonner';

export function DataScienceAICapabilities() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [metrics, setMetrics] = useState(() => dataScienceAGI.getMetrics());
  const [iotDevices, setIotDevices] = useState([]);
  
  // Generate sample IoT devices for demonstration
  useEffect(() => {
    const sampleDevices = Array(8).fill(0).map((_, i) => ({
      id: `device-${i+1}`,
      type: ['sensor', 'controller', 'hub', 'gateway'][Math.floor(Math.random() * 4)],
      connectionStatus: Math.random() > 0.3 ? 'online' : 'offline',
      firmware: `v${Math.floor(Math.random() * 3 + 1)}.${Math.floor(Math.random() * 10)}`,
      security: 0.4 + Math.random() * 0.5,
      reliability: 0.5 + Math.random() * 0.4,
      data: {
        temperature: 15 + Math.random() * 25,
        humidity: 30 + Math.random() * 50,
        lastUpdate: Date.now() - Math.random() * 3600000
      }
    }));
    
    setIotDevices(sampleDevices);
  }, []);
  
  // Analyze a sample dataset
  const handleRunAnalysis = async () => {
    try {
      setIsAnalyzing(true);
      
      // Generate random data for demonstration
      const sampleData = Array(100).fill(0).map((_, i) => ({
        timestamp: Date.now() - (i * 1000 * 60),
        cpuLoad: Math.random() * 0.8 + 0.1,
        memoryUsage: Math.random() * 0.7 + 0.2,
        networkTraffic: Math.random() * 1000,
        temperature: 20 + Math.random() * 20,
        failures: Math.random() > 0.9 ? 1 : 0
      }));
      
      // Run the analysis
      const results = await dataScienceAGI.analyzeDataset(sampleData);
      setAnalysisResults(results);
      setMetrics(dataScienceAGI.getMetrics());
      
      toast.success("Analysis complete", {
        description: `Found ${results.patterns.length} patterns and ${results.anomalies.length} anomalies`
      });
    } catch (error) {
      console.error("Analysis error:", error);
      toast.error("Analysis failed", { description: "An error occurred during data analysis" });
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  // Optimize IoT network
  const handleOptimizeIoT = async () => {
    try {
      setIsOptimizing(true);
      
      // Run the optimization
      const results = await superAIModule.optimizeIoTNetwork(iotDevices);
      // Since optimizedDevices doesn't exist in the return type, we'll keep the same devices
      // and just update their properties based on the optimization results
      
      // Update the IoT devices with optimization results
      const updatedDevices = [...iotDevices].map(device => ({
        ...device,
        efficiency: results.deviceEfficiency || 0.85,
        powerConsumption: results.powerConsumption || 0.7,
        dataRate: results.dataTransmissionRate || 0.8
      }));
      
      setIotDevices(updatedDevices);
      
      toast.success("IoT optimization complete", {
        description: `Network optimization score: ${(results.optimizationScore * 100).toFixed(1)}%`
      });
    } catch (error) {
      console.error("IoT optimization error:", error);
      toast.error("Optimization failed", { description: "An error occurred during IoT optimization" });
    } finally {
      setIsOptimizing(false);
    }
  };

  return (
    <Card className="bg-black/70 border-purple-500/20 shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2 text-white">
            <Database className="h-5 w-5 text-blue-400" />
            <span>Data Science & IoT Intelligence</span>
          </CardTitle>
          
          <div className="flex items-center gap-3">
            <Badge 
              variant="outline" 
              className="bg-purple-900/30 text-purple-400 border-purple-500/50"
            >
              Quantum Enhanced
            </Badge>
            <Badge 
              variant="outline" 
              className="bg-blue-900/30 text-blue-400 border-blue-500/50"
            >
              {(metrics.processingCapacity * 100).toFixed(1)}% Capacity
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Data Science Analysis */}
          <div className="bg-gray-900/40 rounded-xl p-4 border border-gray-800">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-white flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-400" />
                <span>Data Science Analysis</span>
              </h3>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleRunAnalysis}
                disabled={isAnalyzing}
                className="bg-blue-900/20 hover:bg-blue-900/40 text-blue-400 border-blue-500/30"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-4 h-4 mr-2 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Activity className="h-4 w-4 mr-2" />
                    Run Analysis
                  </>
                )}
              </Button>
            </div>
            
            <div className="space-y-3">
              <div className="text-sm text-gray-300">
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gray-900/40 p-3 rounded-lg border border-gray-800">
                    <div className="text-gray-400 mb-1">Model Accuracy</div>
                    <div className="text-lg font-semibold text-white">
                      {(metrics.modelAccuracy * 100).toFixed(1)}%
                    </div>
                  </div>
                  <div className="bg-gray-900/40 p-3 rounded-lg border border-gray-800">
                    <div className="text-gray-400 mb-1">AI Enhancement</div>
                    <div className="text-lg font-semibold text-white">
                      {metrics.quantumEnhanced ? 'Quantum Active' : 'Standard'}
                    </div>
                  </div>
                </div>
              </div>
              
              {analysisResults && (
                <div className="mt-4 space-y-3">
                  <div className="bg-gray-900/40 p-3 rounded-lg border border-gray-800">
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Key Insights</h4>
                    <ul className="list-disc list-inside text-xs text-gray-400 space-y-1">
                      {analysisResults.recommendations.map((rec, i) => (
                        <li key={i}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-gray-900/40 p-3 rounded-lg border border-gray-800">
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Detected Patterns</h4>
                    <div className="space-y-2">
                      {analysisResults.patterns.map((pattern, i) => (
                        <div key={i} className="text-xs">
                          <div className="flex justify-between">
                            <span className="text-white">{pattern.patternType}</span>
                            <span className="text-blue-400">{(pattern.confidence * 100).toFixed(0)}%</span>
                          </div>
                          <div className="text-gray-400">{pattern.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* IoT Intelligence */}
          <div className="bg-gray-900/40 rounded-xl p-4 border border-gray-800">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-white flex items-center gap-2">
                <Cpu className="h-5 w-5 text-green-400" />
                <span>IoT Network Intelligence</span>
              </h3>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleOptimizeIoT}
                disabled={isOptimizing}
                className="bg-green-900/20 hover:bg-green-900/40 text-green-400 border-green-500/30"
              >
                {isOptimizing ? (
                  <>
                    <div className="w-4 h-4 mr-2 rounded-full border-2 border-green-400 border-t-transparent animate-spin" />
                    Optimizing...
                  </>
                ) : (
                  <>
                    <Settings className="h-4 w-4 mr-2" />
                    Optimize Network
                  </>
                )}
              </Button>
            </div>
            
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-900/40 p-3 rounded-lg border border-gray-800">
                  <div className="text-gray-400 mb-1">Devices</div>
                  <div className="text-lg font-semibold text-white">
                    {iotDevices.length} 
                    <span className="text-xs text-gray-400 ml-1">total</span>
                  </div>
                </div>
                <div className="bg-gray-900/40 p-3 rounded-lg border border-gray-800">
                  <div className="text-gray-400 mb-1">Online Rate</div>
                  <div className="text-lg font-semibold text-white">
                    {((iotDevices.filter(d => d.connectionStatus === 'online').length / 
                      Math.max(1, iotDevices.length)) * 100).toFixed(1)}% 
                  </div>
                </div>
              </div>
              
              <div className="mt-2">
                <h4 className="text-sm font-medium text-gray-300 mb-2">Device Network</h4>
                <div className="bg-gray-900/40 p-1 rounded-lg border border-gray-800 grid grid-cols-4 gap-1">
                  {iotDevices.map((device, i) => (
                    <div 
                      key={i} 
                      className={`p-2 rounded text-center text-xs ${
                        device.connectionStatus === 'online' 
                          ? 'bg-green-900/20 text-green-400' 
                          : 'bg-red-900/20 text-red-400'
                      }`}
                    >
                      <Cpu className="h-3 w-3 mx-auto mb-1" />
                      <div className="truncate">{device.id}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gray-900/40 p-3 rounded-lg border border-gray-800">
                <h4 className="text-sm font-medium text-gray-300 mb-2">Network Metrics</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="text-gray-400">Avg. Security</div>
                    <div className="text-white">
                      {(iotDevices.reduce((sum, d) => sum + d.security, 0) / 
                       Math.max(1, iotDevices.length) * 100).toFixed(1)}%
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400">Avg. Reliability</div>
                    <div className="text-white">
                      {(iotDevices.reduce((sum, d) => sum + d.reliability, 0) / 
                       Math.max(1, iotDevices.length) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Cloud Computing Intelligence */}
          <div className="bg-gray-900/40 rounded-xl p-4 border border-gray-800">
            <div className="flex items-center gap-2 mb-3">
              <Cloud className="h-5 w-5 text-indigo-400" />
              <h3 className="text-lg font-medium text-white">Cloud Computing Intelligence</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-gray-900/40 p-3 rounded-lg border border-gray-800">
                <div className="text-gray-400 mb-1">Resource Efficiency</div>
                <div className="text-lg font-semibold text-white">87.4%</div>
              </div>
              <div className="bg-gray-900/40 p-3 rounded-lg border border-gray-800">
                <div className="text-gray-400 mb-1">Cost Optimization</div>
                <div className="text-lg font-semibold text-white">23.8%</div>
              </div>
            </div>
            
            <div className="bg-gray-900/40 p-3 rounded-lg border border-gray-800">
              <h4 className="text-sm font-medium text-gray-300 mb-2">Intelligent Scaling</h4>
              <div className="h-10 bg-gray-900/70 rounded-md relative overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-indigo-500/30"
                  style={{ width: '78%' }}
                ></div>
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-xs text-white">
                  Dynamic resource allocation active
                </div>
              </div>
            </div>
          </div>
          
          {/* Real-time Workflow */}
          <div className="bg-gray-900/40 rounded-xl p-4 border border-gray-800">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="h-5 w-5 text-yellow-400" />
              <h3 className="text-lg font-medium text-white">Real-time Workflow Status</h3>
            </div>
            
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-900/40 p-3 rounded-lg border border-gray-800">
                  <div className="text-gray-400 mb-1">Current Throughput</div>
                  <div className="text-lg font-semibold text-white">5.4K/s</div>
                </div>
                <div className="bg-gray-900/40 p-3 rounded-lg border border-gray-800">
                  <div className="text-gray-400 mb-1">Average Latency</div>
                  <div className="text-lg font-semibold text-white">28ms</div>
                </div>
              </div>
              
              <div className="bg-gray-900/40 p-3 rounded-lg border border-gray-800">
                <h4 className="text-sm font-medium text-gray-300 mb-2">Workflow Steps</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white">Data Collection</span>
                    <Badge variant="secondary" className="text-xs bg-green-900/30 text-green-400">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white">Real-time Analysis</span>
                    <Badge variant="secondary" className="text-xs bg-green-900/30 text-green-400">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white">Quantum Processing</span>
                    <Badge variant="secondary" className="text-xs bg-green-900/30 text-green-400">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white">Result Distribution</span>
                    <Badge variant="secondary" className="text-xs bg-blue-900/30 text-blue-400">Idle</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
