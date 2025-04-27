import React from 'react';
import { Link } from 'react-router-dom';
import { UsersRound, Calendar, DollarSign } from 'lucide-react';
import { Group } from '../types';
import { formatCurrency, formatDate, calculateProgress } from '../utils/helpers';

interface GroupCardProps {
  group: Group;
  showDetails?: boolean;
}

const GroupCard: React.FC<GroupCardProps> = ({ group, showDetails = true }) => {
  const progress = calculateProgress(group.currentCycle || 0, group.totalCycles || 0);
  
  return (
    <Link 
      to={`/group/${group.id}`} 
      className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="p-5 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">{group.name}</h3>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            Cycle {group.currentCycle} of {group.totalCycles}
          </span>
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3">
          <div 
            className="bg-purple-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      
      {showDetails && (
        <div className="p-5 grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center">
            <DollarSign size={16} className="text-teal-600 mr-2" />
            <div>
              <div className="text-gray-500">Contribution</div>
              <div className="font-medium">{formatCurrency(group.contributionAmount)}</div>
            </div>
          </div>
          
          <div className="flex items-center">
            <UsersRound size={16} className="text-teal-600 mr-2" />
            <div>
              <div className="text-gray-500">Members</div>
              <div className="font-medium">{group.memberCount}</div>
            </div>
          </div>
          
          <div className="flex items-center">
            <Calendar size={16} className="text-teal-600 mr-2" />
            <div>
              <div className="text-gray-500">Frequency</div>
              <div className="font-medium capitalize">{group.frequency}</div>
            </div>
          </div>
          
          <div className="flex items-center">
            <Calendar size={16} className="text-teal-600 mr-2" />
            <div>
              <div className="text-gray-500">Next Payout</div>
              <div className="font-medium">
                {group.nextPayoutDate ? formatDate(new Date(group.nextPayoutDate)) : 'Not set'}
              </div>
            </div>
          </div>
        </div>
      )}
    </Link>
  );
};

export default GroupCard;