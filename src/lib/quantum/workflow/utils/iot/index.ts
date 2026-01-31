
/**
 * Quantum IoT Integration utilities for IoT device simulation and quantum security
 * 
 * This file serves as the main entry point for the Quantum IoT integration module,
 * re-exporting all the necessary components from individual files.
 */

// Re-export all types
export * from './types';

// Re-export all functionality
export * from './sensorSimulation';
export * from './securityUtils';
export * from './dataPackets';
export * from './verification';

// Module structure:
// - types.ts: Contains all type definitions for IoT devices and sensors
// - sensorSimulation.ts: Functions for simulating IoT sensor readings
// - securityUtils.ts: Security evaluation and utilities for IoT devices
// - dataPackets.ts: Creation and management of secure IoT data packets
// - verification.ts: Quantum verification of IoT transactions
