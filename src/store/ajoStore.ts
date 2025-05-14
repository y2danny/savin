import { create } from 'zustand';

interface Group {
  id: string;
  code: string;  // Added code property
  name: string;
  members: number;
  contributionAmount: number;
  frequency: string;
  start_date: string;
  owner_id: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  // add other fields as needed
}

interface AjoState {
  isAuthenticated: boolean;
  user: User | null;
  groups: Group[];
  setAuthenticated: (status: boolean) => void;
  setUser: (user: User | null) => void;
  getUserGroups: () => Group[];
  joinGroup: (code: string) => boolean;
}

export const useAjoStore = create<AjoState>((set, get) => ({
  isAuthenticated: false,
  user: null,
  groups: [
    // Demo groups for testing
    {
      id: '1',
      code: 'CB1234',
      name: 'Community Builders',
      members: 10,
      contributionAmount: 1000,
      frequency: 'Monthly',
      start_date: '2024-03-01',
      owner_id: 'user_1'
    },
    {
      id: '2',
      code: 'DS5678',
      name: 'Dream Savers',
      members: 12,
      contributionAmount: 500,
      frequency: 'Weekly',
      start_date: '2024-03-01',
      owner_id: 'user_2'
    },
    {
      id: '3',
      code: 'FF9012',
      name: 'Future Fund',
      members: 8,
      contributionAmount: 2000,
      frequency: 'Monthly',
      start_date: '2024-03-01',
      owner_id: 'user_3'
    }
  ],
  setAuthenticated: (status: boolean) => set({ isAuthenticated: status }),
  setUser: (user: User | null) => set({ user }),
  getUserGroups: () => get().groups,
  joinGroup: (code: string) => {
    const group = get().groups.find(g => g.code === code);
    return !!group; // Returns true if group exists, false otherwise
  }
}));

export type { Group, User }; // Export the Group and User types for use in other components