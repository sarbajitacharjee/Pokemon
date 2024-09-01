import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './components/PokemonCard';
import SearchBar from './components/SearchBar';

const App = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=50');
        const results = response.data.results;

        const pokemonPromises = results.map(async (pokemon) => {
          const res = await axios.get(pokemon.url);
          return res.data;
        });

        const data = await Promise.all(pokemonPromises);
        setPokemonData(data);
        setFilteredPokemon(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching Pokémon data:', err);
        setError('Failed to fetch Pokémon data.');
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term === '') {
      setFilteredPokemon(pokemonData);
    } else {
      const filtered = pokemonData.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredPokemon(filtered);
    }
  };

  if (loading) {
    return <div className="text-center text-lg mt-20">Loading Pokémon...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 text-lg mt-20">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl text-center font-bold mb-8">Pokémon Gallery</h1>
      <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default App;
