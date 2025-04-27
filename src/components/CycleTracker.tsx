import React from 'react';
import { Calendar, User } from 'lucide-react';
import { Group } from '../types';
import { formatDate, formatCurrency, getDaysRemaining } from '../utils/helpers';

interface CycleTrackerProps {
  group: Group;
}

const CycleTracker: React.FC<CycleTrackerProps> = ({ group }) => {
  const currentTurnMember = group.members.find(m => m.isCurrentTurn);
  const daysRemaining = getDaysRemaining(group.nextPayoutDate);
  
  return (
    <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg shadow-lg text-white p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Current Cycle</h3>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white bg-opacity-20">
          Cycle {group.currentCycle} of {group.totalCycles}
        </span>
      </div>
      
      <div className="mt-6 space-y-4">
        <div className="flex items-start">
          <User className="mr-3 flex-shrink-0 text-purple-200" size={20} />
          <div>
            <p className="text-sm text-purple-100">Current Turn</p>
            <p className="text-lg font-medium">
              {currentTurnMember ? currentTurnMember.name : 'Not started'}
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Calendar className="mr-3 flex-shrink-0 text-purple-200" size={20} />
          <div>
            <p className="text-sm text-purple-100">Next Payout Date</p>
            <p className="text-lg font-medium">{formatDate(group.nextPayoutDate)}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <div className="flex justify-between text-sm mb-2">
          <span>{daysRemaining} days remaining</span>
          <span>{formatCurrency(group.contributionAmount)}</span>
        </div>
        <div className="w-full bg-white bg-opacity-20 rounded-full h-2.5">
          <div 
            className="bg-amber-400 h-2.5 rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${Math.max(0, 100 - (daysRemaining * 10))}%` }}
          ></div>
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-white border-opacity-20">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-purple-100">Total Payout</p>
            <p className="text-2xl font-bold">
              {formatCurrency(group.contributionAmount * group.memberCount)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-purple-100">Your Contribution</p>
            <p className="text-lg font-semibold">
              {formatCurrency(group.contributionAmount)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CycleTracker;