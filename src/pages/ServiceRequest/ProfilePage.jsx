import React from 'react';

const ProfilePage = () => {
  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'Downtown, City',
    role: 'customer',
    joinDate: 'January 2024'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg">
          {/* Profile Header */}
          <div className="px-6 py-8 sm:px-8">
            <div className="flex items-center">
              <img
                className="h-24 w-24 rounded-full"
                src="/api/placeholder/150/150"
                alt="Profile"
              />
              <div className="ml-6">
                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                <p className="text-gray-600">{user.role === 'customer' ? 'Customer' : 'Artisan'}</p>
                <p className="text-sm text-gray-500">Member since {user.joinDate}</p>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="border-t border-gray-200 px-6 py-6 sm:px-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h2>
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Phone</dt>
                <dd className="mt-1 text-sm text-gray-900">{user.phone}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Location</dt>
                <dd className="mt-1 text-sm text-gray-900">{user.location}</dd>
              </div>
            </dl>
          </div>

          {/* Action Buttons */}
          <div className="border-t border-gray-200 px-6 py-6 sm:px-8">
            <div className="flex space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Edit Profile
              </button>
              <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700">
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;