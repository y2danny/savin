import React from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, PlusCircle } from 'lucide-react';
import { useAjoStore } from '../store/ajoStore';
import Button from '../components/ui/Button';
import GroupCard from '../components/GroupCard';

const Profile: React.FC = () => {
  const { currentUser, getUserGroups } = useAjoStore();
  const userGroups = getUserGroups();
  
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        </div>
        
        <div className="md:grid md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col items-center">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-32 h-32 rounded-full object-cover"
                  />
                  <h2 className="mt-4 text-xl font-semibold text-gray-900">
                    {currentUser.name}
                  </h2>
                  <p className="text-gray-500">{currentUser.email}</p>
                </div>
                
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <User size={16} className="text-gray-500 mr-2" />
                      <span className="text-sm text-gray-600">Member since 2025</span>
                    </div>
                    <div className="flex items-center">
                      <Mail size={16} className="text-gray-500 mr-2" />
                      <span className="text-sm text-gray-600">{currentUser.email}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => {
                      // This would open edit profile form in a real app
                      alert('Edit profile functionality will be implemented with Civic Auth integration');
                    }}
                  >
                    Edit Profile
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Account Security Placeholder */}
            <div className="mt-6 bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">Account Security</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Manage your account security settings
                </p>
                <div className="text-center py-4 text-gray-500 italic">
                  <p className="text-xs mt-2">
                    (This feature will be implemented with Civic Auth integration)
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-3 mt-8 md:mt-0">
            <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">My Ajo Groups</h3>
                  <Link to="/create">
                    <Button
                      size="sm"
                      icon={<PlusCircle size={16} />}
                    >
                      Create New Group
                    </Button>
                  </Link>
                </div>
                
                {userGroups.length > 0 ? (
                  <div className="grid gap-6 md:grid-cols-2">
                    {userGroups.map(group => (
                      <GroupCard key={group.id} group={group} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">You are not a member of any Ajo groups yet.</p>
                    <Link to="/create">
                      <Button
                        icon={<PlusCircle size={16} />}
                      >
                        Create Your First Group
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
            
            {/* Payment Methods Placeholder */}
            <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Payment Methods</h3>
                <div className="text-center py-8 text-gray-500 italic">
                  <p>No payment methods added yet</p>
                  <p className="text-xs mt-2">
                    (Payment methods will be implemented with Supabase integration)
                  </p>
                </div>
              </div>
            </div>
            
            {/* Transaction History Placeholder */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Transaction History</h3>
                <div className="text-center py-8 text-gray-500 italic">
                  <p>Your transaction history will appear here</p>
                  <p className="text-xs mt-2">
                    (Transaction history will be implemented with Supabase integration)
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

export default Profile;