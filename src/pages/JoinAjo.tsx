import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../utils/supabaseClient';
import Button from '../components/ui/Button';
import { Input } from '../components/ui/FormElements';

const JoinAjo: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [groupCode, setGroupCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupCode(e.target.value.toUpperCase());
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!groupCode.trim()) {
      setError('Please enter a group code');
      return;
    }
    if (!user) {
      setError('You must be signed in to join a group.');
      return;
    }

    setIsLoading(true);

    // 1. Find the group by code
    const { data: group, error: groupError } = await supabase
      .from('groups')
      .select('id, name')
      .eq('code', groupCode)
      .single();

    if (groupError || !group) {
      setError('Invalid group code. Please check and try again.');
      setIsLoading(false);
      return;
    }

    // 2. Check if user is already a member
    const { data: existing, error: memberError } = await supabase
      .from('group_members')
      .select('group_id')
      .eq('group_id', group.id)
      .eq('user_id', user.id)
      .maybeSingle();

    if (memberError) {
      setError('Error checking membership. Please try again.');
      setIsLoading(false);
      return;
    }
    if (existing) {
      setError('You are already a member of this group.');
      setIsLoading(false);
      return;
    }

    // 3. Add user as a member
    const { error: joinError } = await supabase
      .from('group_members')
      .insert({
        group_id: group.id,
        user_id: user.id,
        // optionally add a role: 'member'
      });

    if (joinError) {
      setError('Failed to join group. Please try again.');
      setIsLoading(false);
      return;
    }

    // 4. Navigate to the group dashboard or details
    navigate(`/group/${group.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="mb-8">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex items-center text-purple-700 hover:text-purple-900"
          >
            <ArrowLeft size={16} className="mr-1" />
            <span>Back to Home</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-8 sm:p-10">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Join an Ajo Group</h1>
              <p className="mt-2 text-gray-600">
                Enter the group code provided by the group creator
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                id="groupCode"
                label="Group Code"
                value={groupCode}
                onChange={handleInputChange}
                placeholder="e.g. AB1234"
                required
                error={error}
              />

              <div className="pt-4">
                <Button 
                  type="submit" 
                  fullWidth
                  disabled={isLoading}
                  icon={isLoading ? <RefreshCw size={16} className="animate-spin" /> : undefined}
                >
                  {isLoading ? 'Joining...' : 'Join Group'}
                </Button>
              </div>
            </form>
          </div>

          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Don't have a code? Ask the group creator to share their group code with you, 
              or <a href="/create" className="text-purple-700 hover:text-purple-900">create your own group</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinAjo;