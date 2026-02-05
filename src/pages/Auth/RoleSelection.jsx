import React, { useState } from 'react';

const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState('');

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    // TODO: Handle role selection and navigation
    console.log('Selected role:', role);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Choose your role
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Select whether you're looking for services or providing them
          </p>
        </div>
        <div className="mt-8 space-y-4">
          <button
            onClick={() => handleRoleSelect('customer')}
            className={`w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              selectedRole === 'customer' ? 'bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            I'm a Customer - I need services
          </button>
          <button
            onClick={() => handleRoleSelect('artisan')}
            className={`w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              selectedRole === 'artisan' ? 'bg-green-700' : 'bg-green-600 hover:bg-green-700'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
          >
            I'm an Artisan - I provide services
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;