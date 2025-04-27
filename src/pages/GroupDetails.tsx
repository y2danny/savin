import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../utils/supabaseClient';
import { Group } from '../types';
import Button from '../components/ui/Button';

const GroupDetails: React.FC = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [group, setGroup] = React.useState<Group | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isMember, setIsMember] = React.useState(false);

  React.useEffect(() => {
    const loadGroup = async () => {
      if (!groupId || !user?.id) return;

      try {
        // Load group details
        const { data: groupData, error: groupError } = await supabase
          .from('groups')
          .select('*')
          .eq('id', groupId)
          .single();

        if (groupError) throw groupError;

        // Check if user is a member
        const { data: memberData } = await supabase
          .from('group_members')
          .select('*')
          .eq('group_id', groupId)
          .eq('user_id', user.id)
          .single();

        if (groupData) {
          setGroup({
            id: groupData.id,
            name: groupData.name,
            code: groupData.code,
            contributionAmount: groupData.contribution_amount,
            frequency: groupData.frequency,
            start_date: groupData.start_date,
            owner_id: groupData.owner_id
          });
        }

        setIsMember(!!memberData);
      } catch (error) {
        console.error('Error loading group:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadGroup();
  }, [groupId, user?.id]);

  const handleJoinGroup = async () => {
    if (!user?.id || !groupId) return;

    try {
      const { error } = await supabase
        .from('group_members')
        .insert([
          {
            group_id: groupId,
            user_id: user.id,
            joined_at: new Date().toISOString()
          }
        ]);

      if (error) throw error;

      setIsMember(true);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error joining group:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!group) {
    return <div>Group not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{group.name}</h1>
          {!isMember && (
            <Button onClick={handleJoinGroup}>
              Join Group
            </Button>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Group Details</h2>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Group Code</dt>
                  <dd className="mt-1 text-sm text-gray-900">{group.code}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Contribution Amount</dt>
                  <dd className="mt-1 text-sm text-gray-900">₦{group.contributionAmount}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Frequency</dt>
                  <dd className="mt-1 text-sm text-gray-900">{group.frequency}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Start Date</dt>
                  <dd className="mt-1 text-sm text-gray-900">{new Date(group.start_date).toLocaleDateString()}</dd>
                </div>
              </dl>
            </div>

            {isMember && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Member Information</h2>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Your Status</dt>
                    <dd className="mt-1 text-sm text-gray-900">Active Member</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Next Contribution</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {new Date(group.start_date).toLocaleDateString()}
                    </dd>
                  </div>
                </dl>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupDetails; 