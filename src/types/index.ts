import { SeasonData } from '../data/seasons';
import { AnalysisResult } from '../lib/colorAnalysis';

export type UserRole = 'user' | 'admin';
export type UserPlan = 'free' | 'premium';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  firstName: string;
  lastName: string;
  birthDate?: string;
  role: UserRole;
  plan: UserPlan;
  createdAt: string;
  avatarUrl?: string;
  status: 'active' | 'suspended';
  location?: string;
  whatsappNumber?: string;
  specialTitle?: string;
  isMaster?: boolean;
}

export interface UserSubscription {
  id: string;
  userId: string;
  plan: 'premium';
  status: 'active' | 'canceled';
  startDate: string;
  endDate: string;
  price: number;
}

export interface AdminLog {
  id: string;
  adminId: string;
  adminEmail: string;
  action: string;
  targetUserId?: string;
  targetEmail?: string;
  timestamp: string;
  details: string;
}

export type AppView = 
  | 'landing' 
  | 'analyzer-select' 
  | 'analyzer-photo' 
  | 'analyzer-quiz' 
  | 'result' 
  | 'virtual-drape' 
  | 'seasons-guide' 
  | 'profile' 
  | 'admin';
