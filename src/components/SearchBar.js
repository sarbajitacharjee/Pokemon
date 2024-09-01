import React from 'react';

const SearchBar = ({ searchTerm, onSearch }) => {
  return (
    <div className="flex justify-center mb-6">
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        className="w-full max-w-md p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
      />
    </div>
  );
};

export default SearchBar;
