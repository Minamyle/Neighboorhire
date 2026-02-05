import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/artisans', label: 'Find Artisans' },
    { path: '/login', label: 'Login' },
    { path: '/signup', label: 'Sign Up' },
    { path: '/profile', label: 'Profile' },
    { path: '/jobs', label: 'My Jobs' },
    { path: '/checkout', label: 'Checkout' },
    { path: '/customer-dashboard', label: 'Customer Dashboard' },
    { path: '/artisan-dashboard', label: 'Artisan Dashboard' }
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-blue-600">
              NeighborHire
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;