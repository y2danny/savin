import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import GroupCard from '../components/GroupCard';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../utils/supabaseClient';
import { Group } from '../types';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(true);
  const [groups, setGroups] = React.useState<Group[]>([]);
  const { user } = useAuth();

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
            startDate: item.groups.start_date,
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

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Active Groups Section */}
        {!isLoading && groups.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Your Active Groups</h2>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/groups')}
                icon={<ArrowRight size={16} />}
              >
                View All
              </Button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {groups.map(group => (
                <GroupCard key={group.id} group={group} />
              ))}
            </div>
          </div>
        )}

        {/* We'll add more dashboard sections here later */}
      </div>
    </div>
  );
};

export default Dashboard;