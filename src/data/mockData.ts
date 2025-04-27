import { User, Group } from '../types';

// Mock users data
export const users: User[] = [
  {
    id: 'user1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    groups: ['group1', 'group2']
  },
  {
    id: 'user2',
    name: 'Michael Chen',
    email: 'michael@example.com',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150',
    groups: ['group1']
  },
  {
    id: 'user3',
    name: 'Amina Okoro',
    email: 'amina@example.com',
    avatar: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&w=150',
    groups: ['group1', 'group3']
  },
  {
    id: 'user4',
    name: 'David Garcia',
    email: 'david@example.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    groups: ['group1']
  },
  {
    id: 'user5',
    name: 'Fatima Kamara',
    email: 'fatima@example.com',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    groups: ['group1', 'group2']
  }
];

// Mock groups data
export const groups: Group[] = [
  {
    id: 'group1',
    name: 'Community Builders',
    code: 'CB1234',
    contributionAmount: 100,
    memberCount: 5,
    frequency: 'monthly',
    startDate: '2025-02-01',
    currentCycle: 2,
    totalCycles: 5,
    members: [
      {
        id: 'user1',
        name: 'Sarah Johnson',
        position: 1,
        paymentStatus: 'paid',
        isCurrentTurn: false
      },
      {
        id: 'user2',
        name: 'Michael Chen',
        position: 2,
        paymentStatus: 'paid',
        isCurrentTurn: true
      },
      {
        id: 'user3',
        name: 'Amina Okoro',
        position: 3,
        paymentStatus: 'pending',
        isCurrentTurn: false
      },
      {
        id: 'user4',
        name: 'David Garcia',
        position: 4,
        paymentStatus: 'pending',
        isCurrentTurn: false
      },
      {
        id: 'user5',
        name: 'Fatima Kamara',
        position: 5,
        paymentStatus: 'pending',
        isCurrentTurn: false
      }
    ],
    nextPayoutDate: '2025-03-01',
    currentTurnMemberId: 'user2'
  },
  {
    id: 'group2',
    name: 'Dream Savers',
    code: 'DS5678',
    contributionAmount: 200,
    memberCount: 4,
    frequency: 'biweekly',
    startDate: '2025-01-15',
    currentCycle: 3,
    totalCycles: 4,
    members: [
      {
        id: 'user1',
        name: 'Sarah Johnson',
        position: 2,
        paymentStatus: 'paid',
        isCurrentTurn: false
      },
      {
        id: 'user5',
        name: 'Fatima Kamara',
        position: 3,
        paymentStatus: 'paid',
        isCurrentTurn: true
      },
      {
        id: 'user6',
        name: 'James Wilson',
        position: 1,
        paymentStatus: 'paid',
        isCurrentTurn: false
      },
      {
        id: 'user7',
        name: 'Priya Patel',
        position: 4,
        paymentStatus: 'pending',
        isCurrentTurn: false
      }
    ],
    nextPayoutDate: '2025-02-15',
    currentTurnMemberId: 'user5'
  },
  {
    id: 'group3',
    name: 'Future Fund',
    code: 'FF9012',
    contributionAmount: 150,
    memberCount: 3,
    frequency: 'weekly',
    startDate: '2025-02-10',
    currentCycle: 1,
    totalCycles: 3,
    members: [
      {
        id: 'user3',
        name: 'Amina Okoro',
        position: 1,
        paymentStatus: 'paid',
        isCurrentTurn: true
      },
      {
        id: 'user8',
        name: 'Omar Hassan',
        position: 2,
        paymentStatus: 'pending',
        isCurrentTurn: false
      },
      {
        id: 'user9',
        name: 'Lisa Wong',
        position: 3,
        paymentStatus: 'pending',
        isCurrentTurn: false
      }
    ],
    nextPayoutDate: '2025-02-17',
    currentTurnMemberId: 'user3'
  }
];

// Current logged in user (mock)
export const currentUser: User = users[0];