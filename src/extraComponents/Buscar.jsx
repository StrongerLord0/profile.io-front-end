import React, { useEffect, useState } from 'react';

export default function Buscar({ onNavBarClick, onNavBarChange, inputValue }) {
  const [input, setInput] = useState(inputValue);

  useEffect(() => {
    setInput(inputValue);
  }, [inputValue]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInput(value);
    onNavBarChange(value);
  };

  return (
    <div className="fixed top-16 left-0 right-0 p-4 bg-transparent w-full align-middle flex">
      <input
        type="text"
        className="flex border border-gray-300 p-4 rounded-md w-1/3"
        placeholder="Escribe algo..."
        value={input}
        onChange={handleInputChange}
      />
    </div>
  );
}