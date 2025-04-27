import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '../utils/supabaseClient';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/ui/Button';
import { Input, Select, NumberInput, DateInput } from '../components/ui/FormElements';

const CreateAjo: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    contributionAmount: 100,
    memberCount: 5,
    frequency: 'monthly',
    startDate: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0], // Default to 1 week from now
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });

    // Clear error when field is edited
    if (errors[id]) {
      setErrors({
        ...errors,
        [id]: '',
      });
    }
  };

  // Handle number input changes
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const numValue = value === '' ? '' : parseInt(value, 10);
    setFormData({
      ...formData,
      [id]: numValue,
    });

    // Clear error when field is edited
    if (errors[id]) {
      setErrors({
        ...errors,
        [id]: '',
      });
    }
  };

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Group name is required';
    }

    if (!formData.contributionAmount || formData.contributionAmount <= 0) {
      newErrors.contributionAmount = 'Contribution amount must be greater than 0';
    }

    if (!formData.memberCount || formData.memberCount < 2) {
      newErrors.memberCount = 'Group must have at least 2 members';
    }

    if (!formData.frequency) {
      newErrors.frequency = 'Please select a frequency';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!user) {
      alert('You must be signed in to create an Ajo.');
      return;
    }

    setLoading(true);

    try {
      const groupCode = generateGroupCode();
      // First create the group
      const { data: groupData, error: groupError } = await supabase
        .from('groups')
        .insert({
          name: formData.name,
          code: groupCode,
          contribution_amount: formData.contributionAmount,
          frequency: formData.frequency,
          start_date: formData.startDate,
          owner_id: user.id,
        })
        .select('id')
        .single();

      if (groupError) {
        console.error('Failed to create group:', groupError);
        alert(`Failed to create group: ${groupError.message}`);
        return;
      }

      // Then add the creator as a member
      const { error: memberError } = await supabase
        .from('group_members')
        .insert({
          group_id: groupData.id,
          user_id: user.id,
          role: 'owner'
        });

      if (memberError) {
        console.error('Failed to add member:', memberError);
        alert('Group created but failed to add you as a member. Please try again.');
        return;
      }

      navigate('/dashboard');
    } catch (err) {
      console.error('Error creating group:', err);
      alert('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Frequency options
  const frequencyOptions = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'biweekly', label: 'Bi-weekly' },
    { value: 'monthly', label: 'Monthly' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
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
              <h1 className="text-3xl font-bold text-gray-900">Create New Ajo Group</h1>
              <p className="mt-2 text-gray-600">
                Set up your rotating savings group and invite members to join
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                id="name"
                label="Group Name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter a name for your group"
                required
                error={errors.name}
              />

              <NumberInput
                id="contributionAmount"
                label="Contribution Amount"
                value={formData.contributionAmount}
                onChange={handleNumberChange}
                min={1}
                required
                error={errors.contributionAmount}
              />

              <NumberInput
                id="memberCount"
                label="Maximum Number of Members"
                value={formData.memberCount}
                onChange={handleNumberChange}
                min={2}
                max={20}
                required
                error={errors.memberCount}
              />

              <Select
                id="frequency"
                label="Contribution Frequency"
                options={frequencyOptions}
                value={formData.frequency}
                onChange={handleInputChange}
                required
                error={errors.frequency}
              />

              <DateInput
                id="startDate"
                label="Start Date"
                value={formData.startDate}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                required
                error={errors.startDate}
              />

              <div className="pt-5">
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    className="mr-3"
                    onClick={() => navigate('/')}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Group'}
                  </Button>
                </div>
              </div>
            </form>
          </div>

          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-sm text-gray-600">
            <p>
              By creating a group, you'll automatically become the first member. 
              You can invite others using the group code that will be generated.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

function generateGroupCode(length = 6) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export default CreateAjo;