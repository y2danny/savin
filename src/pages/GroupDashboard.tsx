import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Copy, CheckCircle2, AlertTriangle, Share2 } from 'lucide-react';
import { useAjoStore } from '../store/ajoStore';
import Button from '../components/ui/Button';
import MemberList from '../components/MemberList';
import CycleTracker from '../components/CycleTracker';
import { formatCurrency, formatDate } from '../utils/helpers';

const GroupDashboard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getGroupById, currentUser, markPaymentAsPaid } = useAjoStore();
  
  const [group, setGroup] = useState(getGroupById(id || ''));
  const [copied, setCopied] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  
  // If group not found, navigate to groups list
  useEffect(() => {
    if (!group) {
      navigate('/groups');
    }
  }, [group, navigate]);
  
  // Update group when store changes
  useEffect(() => {
    setGroup(getGroupById(id || ''));
  }, [getGroupById, id]);
  
  if (!group) {
    return null;
  }
  
  const handleCopyCode = () => {
    navigator.clipboard.writeText(group.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleMarkPaid = (memberId: string) => {
    markPaymentAsPaid(group.id, memberId);
    setShowPaymentSuccess(true);
    setTimeout(() => setShowPaymentSuccess(false), 5000);
  };
  
  const userMember = group.members.find(m => m.id === currentUser.id);
  const isUserTurn = userMember?.isCurrentTurn || false;
  
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link
            to="/groups"
            className="flex items-center text-purple-700 hover:text-purple-900"
          >
            <ArrowLeft size={16} className="mr-1" />
            <span>Back to Groups</span>
          </Link>
        </div>
        
        <div className="md:flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{group.name}</h1>
            <div className="mt-2 flex items-center">
              <p className="text-gray-600 mr-2">Group Code:</p>
              <button
                onClick={handleCopyCode}
                className="flex items-center text-purple-700 hover:text-purple-900 focus:outline-none"
                title="Copy code"
              >
                <span className="font-medium">{group.code}</span>
                {copied ? (
                  <CheckCircle2 size={16} className="ml-2 text-green-500" />
                ) : (
                  <Copy size={16} className="ml-2" />
                )}
              </button>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0">
            <Button
              variant="outline"
              size="sm"
              icon={<Share2 size={16} />}
              onClick={() => {
                // In a real app, this would show a share dialog
                alert(`Share this code with others: ${group.code}`);
              }}
            >
              Invite Members
            </Button>
          </div>
        </div>
        
        {/* Payment success notification */}
        {showPaymentSuccess && (
          <div className="mb-6 bg-green-100 text-green-800 p-4 rounded-md flex items-center">
            <CheckCircle2 className="mr-2 flex-shrink-0" size={20} />
            <div>
              <p className="font-medium">Payment marked as completed!</p>
              <p className="text-sm">Thank you for your contribution.</p>
            </div>
          </div>
        )}
        
        {/* User turn notification */}
        {isUserTurn && (
          <div className="mb-6 bg-amber-100 text-amber-800 p-4 rounded-md flex items-center">
            <AlertTriangle className="mr-2 flex-shrink-0" size={20} />
            <div>
              <p className="font-medium">It's your turn to receive the payout!</p>
              <p className="text-sm">
                You will receive {formatCurrency(group.contributionAmount * group.memberCount)} on {formatDate(group.nextPayoutDate)}.
              </p>
            </div>
          </div>
        )}
        
        <div className="md:grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow mb-8">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Group Summary</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-gray-500">Contribution</p>
                    <p className="text-lg font-medium">{formatCurrency(group.contributionAmount)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Frequency</p>
                    <p className="text-lg font-medium capitalize">{group.frequency}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Members</p>
                    <p className="text-lg font-medium">{group.members.length}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Start Date</p>
                    <p className="text-lg font-medium">{formatDate(group.startDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Next Payout</p>
                    <p className="text-lg font-medium">{formatDate(group.nextPayoutDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Cycles</p>
                    <p className="text-lg font-medium">
                      {group.currentCycle} of {group.totalCycles}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <MemberList 
              members={group.members} 
              currentUserId={currentUser.id}
              onMarkPaid={handleMarkPaid}
            />
          </div>
          
          <div>
            <CycleTracker group={group} />
            
            <div className="mt-8 bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Your Status</h3>
                {userMember ? (
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Your Position</p>
                      <p className="text-lg font-medium">{userMember.position} of {group.members.length}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Payment Status</p>
                      <div className="flex items-center mt-1">
                        {userMember.paymentStatus === 'paid' ? (
                          <>
                            <div className="rounded-full bg-green-100 p-1">
                              <CheckCircle2 size={16} className="text-green-600" />
                            </div>
                            <span className="ml-2 font-medium text-green-700">Paid</span>
                          </>
                        ) : (
                          <Button 
                            onClick={() => handleMarkPaid(userMember.id)}
                            fullWidth
                          >
                            Make Payment
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    {userMember.isCurrentTurn && (
                      <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-md">
                        <p className="font-medium text-amber-800">
                          It's your turn to receive the payout!
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-600">You are not a member of this group.</p>
                )}
              </div>
            </div>
            
            {/* Transaction History Placeholder */}
            <div className="mt-8 bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">Transaction History</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Your recent transactions in this group
                </p>
                <div className="text-center py-4 text-gray-500 italic">
                  <p>Transaction history will appear here</p>
                  <p className="text-xs mt-2">
                    (This feature will be implemented with Supabase integration)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupDashboard;