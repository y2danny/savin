import React from 'react';
import { Check, Clock, AlertCircle } from 'lucide-react';
import { Member } from '../types';
import Button from './ui/Button';

interface MemberListProps {
  members: Member[];
  currentUserId: string;
  onMarkPaid?: (memberId: string) => void;
}

const MemberList: React.FC<MemberListProps> = ({ 
  members, 
  currentUserId,
  onMarkPaid 
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <Check size={16} className="text-green-500" />;
      case 'pending':
        return <Clock size={16} className="text-yellow-500" />;
      case 'overdue':
        return <AlertCircle size={16} className="text-red-500" />;
      default:
        return null;
    }
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Paid';
      case 'pending':
        return 'Pending';
      case 'overdue':
        return 'Overdue';
      default:
        return '';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Group Members</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          List of all members and their payment status
        </p>
      </div>
      <ul className="divide-y divide-gray-200">
        {members.map((member) => (
          <li key={member.id} className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`
                  flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center font-semibold text-white
                  ${member.isCurrentTurn ? 'bg-amber-500' : 'bg-purple-600'}
                `}>
                  {member.position}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 flex items-center">
                    {member.name}
                    {member.isCurrentTurn && (
                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                        Current Turn
                      </span>
                    )}
                  </p>
                  <div className="flex items-center mt-1">
                    {getStatusIcon(member.paymentStatus)}
                    <p className="text-xs text-gray-500 ml-1">
                      {getStatusText(member.paymentStatus)}
                    </p>
                  </div>
                </div>
              </div>
              {member.id === currentUserId && member.paymentStatus === 'pending' && onMarkPaid && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onMarkPaid(member.id)}
                >
                  Mark as Paid
                </Button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemberList;