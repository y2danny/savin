import React from 'react';
import { useUser } from "@civic/auth/react";

const UserProfile: React.FC = () => {
  const { user } = useUser();

  if (!user) {
    return null; // Or return a login button/message
  }

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-700">
        Hello, {user.name || 'User'}
      </span>
    </div>
  );
};

export default UserProfile;