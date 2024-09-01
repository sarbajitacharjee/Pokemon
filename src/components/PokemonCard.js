import React from 'react';

const PokemonCard = ({ pokemon }) => {
  const { name, sprites, types, height, weight } = pokemon;

  //  background color classes
  const colors = ['bg-red-400', 'bg-blue-400', 'bg-green-300', 'bg-yellow-400', 'bg-orange-500', 'bg-purple-500'];
  
  // Select a random color class
  const bgColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div className={`${bgColor} bg-opacity-75 rounded-xl shadow-lg p-6 text-center transition-transform transform hover:scale-105 hover:shadow-2xl`}>
      <img
        src={sprites.front_default}
        alt={name}
        className="w-28 h-28 mx-auto rounded-full border-4 border-white"
      />
      <h2 className="text-2xl font-extrabold text-white mt-4">{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
      <div className="mt-4 text-sm text-white">
        <p><strong>Type:</strong> {types.map(t => t.type.name).join(', ')}</p>
        <p><strong>Height:</strong> {height / 10} m</p>
        <p><strong>Weight:</strong> {weight / 10} kg</p>
      </div>
    </div>
  );
};

export default PokemonCard;
