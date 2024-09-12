"use client";

import React, { useState } from 'react';
import { FaChevronDown, FaTimes } from 'react-icons/fa';
import { MdKeyboardVoice } from 'react-icons/md';

export default function Config() {
  const [toggles, setToggles] = useState([false, false, false]);

  const handleToggle = (index) => {
    const newToggles = [...toggles];
    newToggles[index] = !newToggles[index];
    setToggles(newToggles);
  };

  return (
    <section className='col-span-4'>
          <nav className="w-full h-full bg-black text-white p-5 flex flex-col justify-between">
      {/* Profile Section */}
      <div className="flex items-center justify-between bg-[#2D2C79] p-3 rounded-lg mb-5">
        <div className="w-16 h-16 bg-gray-500 rounded-full"></div>
        <span className="ml-3 flex-1 text-lg">Nombre</span>
        <button className="bg-transparent border-none text-white text-2xl cursor-pointer">
          <FaTimes />
        </button>
      </div>

      {/* Config Items */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        {['Option 1', 'Option 2', 'Option 3'].map((_, index) => (
          <div key={index} className="flex justify-between items-center p-3 border-b border-gray-600 mb-2.5">
            <span>Select {index + 1}</span>
            <select className="bg-gray-800 text-white border-none rounded p-1">
              {['Option 1', 'Option 2', 'Option 3'].map((option, idx) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}

        {['Activar', 'Activar', 'Activar'].map((label, index) => (
          <div key={index} className="flex justify-between items-center p-3 border-b border-gray-600 mb-2.5">
            <span>{label}</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={toggles[index]}
                onChange={() => handleToggle(index)}
              />
              <span className="slider round"></span>
            </label>
          </div>
        ))}
      </div>
    </nav>
    </section>
  );
}
