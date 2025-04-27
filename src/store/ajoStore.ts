import { create } from 'zustand';

interface Group {
  id: string;
  code: string;  // Added code property
  name: string;
  members: number;
  contributionAmount: number;
  frequency: string;
}

interface AjoState {
  isAuthenticated: boolean;
  groups: Group[];
  setAuthenticated: (status: boolean) => void;
  getUserGroups: () => Group[];
  joinGroup: (code: string) => boolean;
}

export const useAjoStore = create<AjoState>((set, get) => ({
  isAuthenticated: false,
  groups: [
    // Demo groups for testing
    {
      id: '1',
      code: 'CB1234',
      name: 'Community Builders',
      members: 10,
      contributionAmount: 1000,
      frequency: 'Monthly'
    },
    {
      id: '2',
      code: 'DS5678',
      name: 'Dream Savers',
      members: 12,
      contributionAmount: 500,
      frequency: 'Weekly'
    },
    {
      id: '3',
      code: 'FF9012',
      name: 'Future Fund',
      members: 8,
      contributionAmount: 2000,
      frequency: 'Monthly'
    }
  ],
  setAuthenticated: (status: boolean) => set({ isAuthenticated: status }),
  getUserGroups: () => get().groups,
  joinGroup: (code: string) => {
    const group = get().groups.find(g => g.code === code);
    return !!group; // Returns true if group exists, false otherwise
  }
}));

export type { Group }; // Export the Group type for use in other components