import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './components/PokemonCard';
import SearchBar from './components/SearchBar';

const App = () => {
  // State to hold the full list of fetched Pokémon data
  const [pokemonData, setPokemonData] = useState([]);
  
  // State to hold the filtered Pokémon based on search input
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  
  // State to track the current search term
  const [searchTerm, setSearchTerm] = useState('');
  
  // State to manage loading status while fetching data
  const [loading, setLoading] = useState(true);
  
  // State to capture and display any errors during data fetching
  const [error, setError] = useState(null);

  // Fetch Pokémon data on component mount using the useEffect hook
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        // API call to get the first 50 Pokémon
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150');
        const results = response.data.results;

        // Fetch detailed data for each Pokémon using their individual URLs
        const pokemonPromises = results.map(async (pokemon) => {
          const res = await axios.get(pokemon.url);
          return res.data;
        });

        // Resolve all promises and store the data in state
        const data = await Promise.all(pokemonPromises);
        setPokemonData(data);
        setFilteredPokemon(data); // Initially display all Pokémon
        setLoading(false); // Data is loaded, set loading to false
      } catch (err) {
        console.error('Error fetching Pokémon data:', err);
        setError('Failed to fetch Pokémon data.'); // Set error message
        setLoading(false); // Stop loading if there's an error
      }
    };

    fetchPokemon();
  }, []);

  // Function to handle search input and filter Pokémon based on the search term
  const handleSearch = (term) => {
    setSearchTerm(term); // Update the search term state
    if (term === '') {
      // If search term is empty, show all Pokémon
      setFilteredPokemon(pokemonData);
    } else {
      // Filter Pokémon by name based on search input
      const filtered = pokemonData.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredPokemon(filtered);
    }
  };

  // Render loading message while data is being fetched
  if (loading) {
    return <div className="text-center text-lg mt-20">Loading Pokémon...</div>;
  }

  // Render error message if there's an error during data fetching
  if (error) {
    return <div className="text-center text-red-600 text-lg mt-20">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 p-4">
      {/* Page title with stylish design */}
      <h1 className="text-5xl text-center font-extrabold text-white mb-8 drop-shadow-lg">
        Pokémon Gallery
      </h1>
      
      {/* Search bar component to filter Pokémon */}
      <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
      
      {/* Grid layout to display Pokémon cards, responsive across screen sizes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPokemon.map((pokemon) => (
          // Render each Pokémon card
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default App;
