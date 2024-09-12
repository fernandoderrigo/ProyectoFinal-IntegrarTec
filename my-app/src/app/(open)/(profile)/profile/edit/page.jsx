import React from 'react';
import { FaPen, FaCheck, FaTimes } from 'react-icons/fa';

export default function Register() {
  return (
    <div className="col-span-4 bg-black text-white h-screen p-5 flex flex-col justify-between items-center">
      {/* Profile Picture and Close Icon */}
      <div className="w-full flex justify-center items-center relative">
        <div className="w-16 h-16 bg-gray-500 rounded-full mb-5"></div>
        <button className="absolute top-0 right-0 bg-transparent border-none text-white text-xl cursor-pointer">
          <FaTimes />
        </button>
      </div>

      {/* Input Fields */}
      <div className="w-full flex flex-col items-center">
        {Array(5).fill().map((_, i) => (
          <div key={i} className="flex items-center mb-2 w-full bg-gray-800 rounded-lg p-2 relative">
            <input type="text" placeholder="Nombre" className="w-full p-2 bg-transparent text-white text-base outline-none" />
            <FaPen className="absolute right-2 text-gray-400" />
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between w-full px-2">
        <button className="flex-1 mr-2 p-2 bg-green-500 text-white rounded-lg flex justify-center items-center cursor-pointer">
          Aceptar <FaCheck className="ml-2" />
        </button>
        <button className="flex-1 ml-2 p-2 bg-red-500 text-white rounded-lg flex justify-center items-center cursor-pointer">
          Cancelar <FaTimes className="ml-2" />
        </button>
      </div>
    </div>
  );
}
