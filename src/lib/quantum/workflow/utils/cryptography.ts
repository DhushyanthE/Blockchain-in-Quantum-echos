
/**
 * Quantum cryptography utility functions
 */

/**
 * Generate a quantum-resistant hash for given input
 */
export function generateQuantumResistantHash(input: any): string {
  // Simple hash simulation - in production this would use proper quantum-resistant algorithms
  const str = typeof input === 'string' ? input : JSON.stringify(input);
  let hash = 0;
  
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // Use more complex hash representation
  return Array(8)
    .fill(0)
    .map((_, i) => {
      const value = (hash >> (i * 4)) & 0xF;
      return value.toString(16);
    })
    .join('') + 
    Math.random().toString(16).substring(2, 10);
}

/**
 * Evaluate quantum resistance of cryptographic algorithms
 */
export function evaluateQuantumResistance(
  algorithm: string, 
  keySize: number
): {
  isQuantumResistant: boolean;
  recommendedKeySize: number;
  estimatedQubitsCrack: number;
  vulnerabilityScore: number;
} {
  // Default values
  let isResistant = false;
  let recommendedSize = keySize;
  let qubitsRequired = 0;
  
  // Evaluate based on algorithm type
  switch(algorithm.toLowerCase()) {
    // Quantum-vulnerable algorithms
    case 'rsa':
    case 'dsa':
    case 'ecdsa':
    case 'ecdh':
      isResistant = false;
      recommendedSize = 0; // Not quantum resistant regardless of key size
      qubitsRequired = algorithm.toLowerCase().includes('ec') 
        ? keySize * 3  // Elliptic curve
        : keySize * 2; // RSA/DSA
      break;
    
    // Quantum-resistant algorithms
    case 'dilithium':
    case 'kyber':
    case 'falcon':
    case 'sphincs+':
    case 'lattice':
    case 'sike':
    case 'mceliece':
      isResistant = true;
      recommendedSize = keySize >= 256 ? keySize : 256;
      qubitsRequired = keySize * 100; // Much harder to break with quantum algorithms
      break;
      
    // Default case
    default:
      isResistant = false;
      recommendedSize = 384;
      qubitsRequired = keySize * 4;
  }
  
  // Calculate vulnerability score (0-1, higher is more vulnerable)
  const vulnerabilityScore = isResistant 
    ? 0.1 + (0.2 * (1 - Math.min(1, keySize / recommendedSize)))
    : 0.5 + (0.5 * (1 - Math.min(1, keySize / 2048)));
  
  return {
    isQuantumResistant: isResistant,
    recommendedKeySize: recommendedSize,
    estimatedQubitsCrack: qubitsRequired,
    vulnerabilityScore
  };
}

/**
 * Convert bits array to hexadecimal string
 * Used in quantum key distribution for compact representation
 */
export function bitsToHex(bits: number[]): string {
  let hex = '';
  for (let i = 0; i < bits.length; i += 4) {
    let value = 0;
    for (let j = 0; j < 4 && i + j < bits.length; j++) {
      value = (value << 1) | (bits[i + j] & 1);
    }
    hex += value.toString(16);
  }
  return hex;
}

/**
 * Calculate entanglement score between two bit arrays
 * Used for measuring quantum entanglement quality
 */
export function calculateEntanglementScore(bitsA: number[], bitsB: number[]): number {
  // Ensure arrays have same length
  if (bitsA.length !== bitsB.length || bitsA.length === 0) {
    return 0;
  }
  
  // Calculate correlation
  let matchingBits = 0;
  for (let i = 0; i < bitsA.length; i++) {
    if (bitsA[i] === bitsB[i]) matchingBits++;
  }
  
  // Calculate base score from matching ratio
  const baseScore = matchingBits / bitsA.length;
  
  // Add quantum noise simulation for realistic entanglement imperfections
  const noiseLevel = Math.random() * 0.1; // 0-10% noise
  
  // Final entanglement score (higher is better, max 1.0)
  return Math.min(1.0, baseScore * (1 - noiseLevel) + 0.1);
}
