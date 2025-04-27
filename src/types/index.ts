export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  groups: string[];
}

export interface Member {
  id: string;
  name: string;
  position: number;
  paymentStatus: 'paid' | 'pending' | 'overdue';
  isCurrentTurn: boolean;
}

export interface Group {
  id: string;
  name: string;
  code: string;
  contributionAmount: number;
  frequency: string;
  start_date: string;
  owner_id: string;
  memberCount?: number;
  currentCycle?: number;
  totalCycles?: number;
  nextPayoutDate?: string;
  currentTurnMemberId?: string;
}