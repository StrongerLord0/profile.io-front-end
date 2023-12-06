import React, { useEffect, useState } from 'react';

export default function NavBar({ onNavBarClick, onNavBarChange, inputValue }) {
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
        <>
            <nav class="bg-blue-500 p-4 fixed w-full top-0">
                <div class="container mx-auto">
                    <div class="flex items-center justify-between">
                        <a onClick={() => onNavBarClick('')} class="text-white text-4xl font-bold">Perfil.io</a>
                        <input
                                type="text"
                                className="flex border border-gray-300 p-4 rounded-md w-1/3"
                                placeholder="Introduce tu búsqueda..."
                                value={input}
                                onChange={handleInputChange}
                            />
                        <div class="flex space-x-7">
                            <a onClick={() => onNavBarClick('subir')} class="text-2xl font-semibold p-2 pl-8 pr-8 rounded-xl bg-white text-blue-500">Subir Nuevo</a>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}