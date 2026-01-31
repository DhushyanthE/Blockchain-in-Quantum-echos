
/**
 * IoT data packet creation and management
 */

import { IoTDeviceConfig, IoTSensorReading, SecureIoTDataPacket, IoTSecurityLevel } from './types';
import { generateQuantumResistantHash } from '../cryptography';

/**
 * Simple hash function for classical signature simulation
 */
function simpleHash(data: string): string {
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  
  // Convert to hex string
  return (hash >>> 0).toString(16).padStart(8, '0');
}

/**
 * Create a secure IoT data packet with quantum-resistant signatures
 */
export function createSecureIoTPacket(
  deviceConfig: IoTDeviceConfig,
  readings: IoTSensorReading[]
): SecureIoTDataPacket {
  const timestamp = Date.now();
  
  // Create packet data
  const packetData = {
    deviceId: deviceConfig.id,
    readings,
    timestamp,
    batteryLevel: deviceConfig.batteryLevel - Math.random() * 0.1 // Simulate battery drain
  };
  
  // Determine encryption strength based on security level
  let encryptionStrength = 128; // bits
  let signatureMethod: 'classical' | 'quantum-resistant' = 'classical';
  
  switch (deviceConfig.securityLevel) {
    case IoTSecurityLevel.STANDARD:
      encryptionStrength = 128;
      signatureMethod = 'classical';
      break;
    case IoTSecurityLevel.ENHANCED:
      encryptionStrength = 256;
      signatureMethod = 'classical';
      break;
    case IoTSecurityLevel.QUANTUM_RESISTANT:
      encryptionStrength = 384;
      signatureMethod = 'quantum-resistant';
      break;
  }
  
  // Generate hash for the data
  const hash = signatureMethod === 'quantum-resistant'
    ? generateQuantumResistantHash(packetData)
    : simpleHash(JSON.stringify(packetData));
  
  return {
    ...packetData,
    hash,
    signatureMethod,
    encryptionStrength
  };
}
