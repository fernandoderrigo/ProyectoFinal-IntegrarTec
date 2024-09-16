"use client";

import React, { useState } from 'react';

export default function Config() {
  const [toggles, setToggles] = useState([false, false, false]);

  const handleToggle = (index) => {
    const newToggles = [...toggles];
    newToggles[index] = !newToggles[index];
    setToggles(newToggles);
  };

  return (
    <section className='col-span-4 bg-violetBlue-900/20 rounded-3xl p-5 backdrop-blur-sm'>
          <nav className="w-full h-full text-white p-5 flex flex-col justify-between">

      {/* Config Items */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        {['Option 1', 'Option 2', 'Option 3'].map((_, index) => (
          <div key={index} className="flex justify-between items-center p-3 border-b border-neutralViolet-700 mb-2.5">
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
