import React, { useState } from 'react';


const swatchColors = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#FF33A1', '#33FFF5'];

const Swatches = ({ onSelectColor }) => {
  return (
    <div className='flex flex-wrap gap-2'>
      {swatchColors.map(color => (
        <button
          key={color}
          style={{ backgroundColor: color }}
          className='w-9 h-9 rounded-full border-2 border-gray-300'
          onClick={() => onSelectColor(color)}
        />
      ))}
    </div>
  );
};

export default Swatches;
