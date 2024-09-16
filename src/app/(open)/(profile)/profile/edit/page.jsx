import React from 'react';
import { FaPen, FaCheck, FaTimes } from 'react-icons/fa';

export default function Register() {
  return (
    <section className="col-span-4 bg-black text-white p-5 grid grid-rows-2fr_1fr gap-16">

      {/* Input Fields */}
      <section className="w-full flex flex-col items-center">
        {Array(5).fill().map((_, i) => (
          <label key={i} className="flex items-center mb-2 w-full bg-gray-800 rounded-lg p-2 relative">
            <input type="text" placeholder="Nombre" className="w-full p-2 bg-transparent text-white text-base outline-none" />
            <FaPen className="absolute right-2 text-gray-400" />
          </label>
        ))}
      </section>

      {/* Action Buttons */}
      <section className="flex justify-between w-full">
        <button className="flex-1 mr-2 p-2 bg-green-500 text-white rounded-lg flex justify-center items-center cursor-pointer">
          Aceptar <FaCheck className="ml-2" />
        </button>
        <button className="flex-1 ml-2 p-2 bg-red-500 text-white rounded-lg flex justify-center items-center cursor-pointer">
          Cancelar <FaTimes className="ml-2" />
        </button>
      </section>
    </section>
  );
}
