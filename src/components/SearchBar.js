import React from 'react';

const SearchBar = ({ searchTerm, onSearch }) => {
  return (
    <div className="flex justify-center mb-8">
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        className="w-full max-w-md p-3 text-gray-800 border-2 border-white rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-transparent transition-all duration-300"
      />
    </div>
  );
};

export default SearchBar;
