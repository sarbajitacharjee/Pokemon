import React from 'react';

const PokemonCard = ({ pokemon }) => {
  const { name, sprites, types, height, weight } = pokemon;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 text-center">
      <img
        src={sprites.front_default}
        alt={name}
        className="w-24 h-24 mx-auto"
      />
      <h2 className="text-xl font-bold mt-4">{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
      <div className="mt-2 text-sm text-gray-700">
        <p><strong>Type:</strong> {types.map(t => t.type.name).join(', ')}</p>
        <p><strong>Height:</strong> {height}</p>
        <p><strong>Weight:</strong> {weight}</p>
      </div>
    </div>
  );
};

export default PokemonCard;
