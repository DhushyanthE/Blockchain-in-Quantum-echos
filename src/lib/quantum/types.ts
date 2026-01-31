
export interface QuantumKeyPair {
  publicKey: string;
  privateKey: string;
  entropy?: string;
  quantumResistant: boolean;
  createdAt: number;
  keyId: string;
}

export interface QuantumSignature {
  signature: string;
  keyId: string;
  timestamp: number;
  algorithm: string;
  hash: string;
}

export interface QuantumKeyDistribution {
  sharedKey: string;
  keyLength: number;
  errorRate: number;
  secure: boolean;
  participants: string[];
  createdAt: number;
  keyId: string;
}

export interface KeyRotationPolicy {
  intervalMs: number;
  onMembershipChange: boolean;
  onSecurityEvent: boolean;
  minimumEntropy?: number;
}

export interface HierarchicalGroup {
  groupId: string;
  name: string;
  adminIds: string[];
  memberIds: string[];
  subgroups: { groupId: string; name: string }[];
  encryptedGroupKey: string;
  keyRotationPolicy: KeyRotationPolicy;
  createdAt: number;
  lastKeyRotation: number;
  parentGroupId?: string;
}

// Updated MPQKDParticipant interface to include joinedAt and pairwiseChannels
export interface MPQKDParticipant {
  id: string;
  name: string;
  role: 'coordinator' | 'member' | 'auditor' | 'observer';
  addedBy: string;
  addedAt: number;
  lastActive?: number;
  publicKey?: string;
  joinedAt: number;
  status: 'active' | 'inactive' | 'removed';
  pairwiseChannels: {
    participantId: string;
    channelId: string;
    established: boolean;
    lastRefreshed: number;
    qberRate: number;
  }[];
}

// Updated MPQKDAuditEvent with securityImpact
export interface MPQKDAuditEvent {
  id?: string;
  groupId?: string;
  eventType: 'key-rotation' | 'member-add' | 'member-remove' | 'security-event' | 'message-sent' | 'group-creation' | 'participant-added' | 'security-alert';
  initiatedBy?: string;
  participantId?: string;
  timestamp: number;
  details: string;
  securityImpact: 'none' | 'low' | 'medium' | 'high';
}

// Updated MPQKDKeyGenerationEvent with securityMetrics
export interface MPQKDKeyGenerationEvent {
  id?: string;
  groupId?: string;
  timestamp: number;
  reason: 'scheduled' | 'membership-change' | 'security-event' | 'manual' | 'creation' | 'scheduled-rotation';
  initiatedBy?: string;
  keyId: string;
  rotationNumber?: number;
  securityMetrics: {
    entropy: number;
    qberAverage: number;
    detectedInterference: boolean;
  };
}

// Updated MPQKDMessage with encrypted content properties
export interface MPQKDMessage {
  id: string;
  groupId: string;
  senderId: string;
  content?: string; // Original content
  encryptedContent: string; // Encrypted content
  encrypted: boolean;
  encryptionKeyId: string;
  recipients: string[];
  timestamp: number;
  read?: Record<string, number>;
  readReceipts: {
    participantId: string;
    readAt: number;
  }[];
}

// New MPQKDAccessControl interface
export interface MPQKDAccessControl {
  accessPolicy: 'all-members' | 'role-based' | 'hierarchical';
  rolePermissions: Record<string, string[]>;
  temporaryAccess: {
    participantId: string;
    capabilities: string[];
    expiresAt: number;
  }[];
  hierarchicalRules?: {
    levelCount: number;
    inheritanceModel: 'strict' | 'relaxed';
  };
}

export interface AdvancedMPQKDGroup {
  id: string;
  name: string;
  description: string;
  coordinatorId: string;
  topology: 'star' | 'mesh' | 'tree';
  securityLevel: 'standard' | 'enhanced' | 'maximum';
  participants: MPQKDParticipant[];
  messages?: MPQKDMessage[];
  keyHistory: MPQKDKeyGenerationEvent[];
  auditLog: MPQKDAuditEvent[];
  createdAt: number;
  keyRotationInterval?: number;
  lastKeyRotation?: number;
  status?: 'active' | 'inactive' | 'archived';
  accessControl: MPQKDAccessControl;
}
