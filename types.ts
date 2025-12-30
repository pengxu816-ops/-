
export enum UserRole {
  STUDENT = 'STUDENT',
  PARENT = 'PARENT',
  TEACHER = 'TEACHER',
  ADMIN = 'ADMIN'
}

export interface StrategyPoint {
  id: string;
  title: string;
  content: string[];
  icon: string;
  imageUrl?: string;
}

export interface Task {
  id: string;
  title: string;
  type: 'LEARNING' | 'ACTIVITY' | 'HABIT';
  status: 'PENDING' | 'COMPLETED';
  points: number;
}

export interface AssessmentFactor {
  name: string;
  status: 'STABLE' | 'WARNING' | 'CRITICAL';
  description: string;
}

export interface NuancedAssessmentResult {
  score: number;
  level: 'LOW' | 'MEDIUM' | 'HIGH';
  summary: string;
  factors: AssessmentFactor[];
  interventionPlan: string[];
}

export interface AssessmentResult {
  score: number;
  level: 'LOW' | 'MEDIUM' | 'HIGH';
  recommendation: string;
}

export interface ChallengeMember {
  id: string;
  name: string;
  role: string;
  status: 'COMPLETED' | 'PENDING';
  avatar: string;
}

export interface ChallengeMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
}

export interface UnpluggedChallenge {
  id: string;
  title: string;
  description: string;
  targetTime: string;
  members: ChallengeMember[];
  progress: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}
