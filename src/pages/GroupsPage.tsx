import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../utils/supabaseClient';
import { Group } from '../types';
import Button from '../components/ui/Button';
import GroupCard from '../components/GroupCard';

const GroupsPage: React.FC = () => {
  const { user } = useAuth();
  const [groups, setGroups] = React.useState<Group[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const loadGroups = async () => {
      if (!user?.id) return;
      
      try {
        const { data, error } = await supabase
          .from('group_members')
          .select(`
            groups (
              id,
              name,
              code,
              contribution_amount,
              frequency,
              start_date,
              owner_id
            )
          `)
          .eq('user_id', user.id);

        if (error) throw error;

        if (data) {
          const transformedGroups = data.map((item: any) => ({
            id: item.groups.id,
            name: item.groups.name,
            code: item.groups.code,
            contributionAmount: item.groups.contribution_amount,
            frequency: item.groups.frequency,
            start_date: item.groups.start_date,
            owner_id: item.groups.owner_id
          }));
          setGroups(transformedGroups);
        }
      } catch (error) {
        console.error('Error loading groups:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadGroups();
  }, [user?.id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Ajo Groups</h1>
          <Link to="/create">
            <Button
              icon={<PlusCircle size={16} />}
            >
              Create New Group
            </Button>
          </Link>
        </div>
        
        {groups.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {groups.map(group => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500 mb-6">You are not a member of any Ajo groups yet.</p>
            <div className="flex flex-col items-center space-y-4">
              <Link to="/create">
                <Button
                  size="lg"
                  icon={<PlusCircle size={20} />}
                >
                  Create Your First Group
                </Button>
              </Link>
              <p className="text-gray-500">or</p>
              <Link to="/join">
                <Button
                  variant="outline"
                  size="lg"
                >
                  Join an Existing Group
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupsPage;