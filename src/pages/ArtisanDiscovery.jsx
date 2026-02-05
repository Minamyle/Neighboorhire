import React, { useState } from 'react';

const ArtisanDiscovery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data for artisans
  const artisans = [
    {
      id: 1,
      name: 'John Smith',
      category: 'Plumbing',
      rating: 4.8,
      reviews: 24,
      location: 'Downtown',
      image: '/api/placeholder/150/150'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      category: 'Electrical',
      rating: 4.9,
      reviews: 31,
      location: 'Midtown',
      image: '/api/placeholder/150/150'
    },
    {
      id: 3,
      name: 'Mike Davis',
      category: 'Carpentry',
      rating: 4.7,
      reviews: 18,
      location: 'Uptown',
      image: '/api/placeholder/150/150'
    }
  ];

  const categories = ['all', 'Plumbing', 'Electrical', 'Carpentry'];

  const filteredArtisans = artisans.filter(artisan => {
    const matchesSearch = artisan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artisan.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || artisan.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Find an Artisan</h1>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search artisans or services..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="md:w-48">
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Artisan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArtisans.map(artisan => (
            <div key={artisan.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={artisan.image}
                alt={artisan.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">{artisan.name}</h3>
                <p className="text-gray-600">{artisan.category}</p>
                <div className="flex items-center mt-2">
                  <span className="text-yellow-400">★</span>
                  <span className="ml-1 text-gray-700">{artisan.rating}</span>
                  <span className="ml-1 text-gray-500">({artisan.reviews} reviews)</span>
                </div>
                <p className="text-gray-500 mt-2">{artisan.location}</p>
                <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                  Contact Artisan
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtisanDiscovery;