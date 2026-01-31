
/**
 * IoT security utilities for quantum-resistant security
 */

import { IoTDeviceConfig, IoTSecurityEvaluation, IoTSecurityLevel } from './types';
import { evaluateQuantumResistance } from '../cryptography';
import { QUANTUM_CONFIG } from '../../../../../config/env';

/**
 * Calculate firmware age based on version string
 */
export function calculateFirmwareAge(version: string): number {
  const versionParts = version.split('.');
  if (versionParts.length < 2) return 5;
  
  const majorVersion = parseInt(versionParts[0]);
  const minorVersion = parseInt(versionParts[1]);
  
  // Simulate firmware age based on version numbers
  return Math.max(0, 10 - majorVersion - minorVersion / 10);
}

/**
 * Evaluate IoT device security against quantum threats
 */
export function evaluateIoTDeviceSecurity(
  deviceConfig: IoTDeviceConfig
): IoTSecurityEvaluation {
  // Evaluate security level
  const securityEvaluation = evaluateQuantumResistance(
    deviceConfig.securityLevel === IoTSecurityLevel.QUANTUM_RESISTANT ? 'kyber' : 'ecdsa',
    deviceConfig.securityLevel === IoTSecurityLevel.STANDARD ? 128 : 256
  );
  
  // Generate recommended upgrades
  const recommendedUpgrades: string[] = [];
  
  if (!securityEvaluation.isQuantumResistant) {
    recommendedUpgrades.push('Upgrade to quantum-resistant cryptography (Kyber, Dilithium)');
  }
  
  if (deviceConfig.securityLevel !== IoTSecurityLevel.QUANTUM_RESISTANT) {
    recommendedUpgrades.push('Implement post-quantum firmware update');
  }
  
  if (deviceConfig.transmitFrequency < 60) {
    recommendedUpgrades.push('Reduce transmission frequency to minimize exposure');
  }
  
  // Calculate estimated upgrade cost
  const baseUpgradeCost = 10; // base cost per device
  const securityUpgradeCost = deviceConfig.securityLevel === IoTSecurityLevel.STANDARD ? 15 : 5;
  const firmwareAge = calculateFirmwareAge(deviceConfig.firmwareVersion);
  const firmwareUpgradeCost = firmwareAge * 2;
  
  const estimatedUpgradeCost = baseUpgradeCost + securityUpgradeCost + firmwareUpgradeCost;
  
  return {
    isQuantumResistant: securityEvaluation.isQuantumResistant,
    vulnerabilityScore: securityEvaluation.vulnerabilityScore,
    recommendedUpgrades,
    estimatedUpgradeCost
  };
}
