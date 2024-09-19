'use client'

import { IoMdAdd } from "react-icons/io";
import { FaMinus } from "react-icons/fa";
import { useState, useEffect } from 'react';

export default function Tags() {
  const [genderList, setGenderList] = useState([]);
  const [showAll, setShowAll] = useState(false); // Estado para controlar la visibilidad

  useEffect(() => {
    async function fetchGendersData() {
      try {
        const response = await fetch('/api/gender');
        const data = await response.json();
        setGenderList(data);
      } catch (error) {
        console.error('Error fetching genders:', error);
      }
    }
    fetchGendersData();
  }, []);

  // Limitar la cantidad de géneros mostrados
  const displayedGenders = showAll ? genderList : genderList.slice(0, 3);

  return (
    <article className="col-span-4 flex flex-wrap justify-between gap-2">
      {displayedGenders.map(({ gender }) => (
        <button key={gender} className="bg-neutralViolet-900 p-2 rounded-lg">
          <h3>{gender}</h3>
        </button>
      ))}
      {/* Botón para mostrar más géneros */}
      {genderList.length > 3 && (
        <button onClick={() => setShowAll(!showAll)} className="flex items-center bg-neutralViolet-900 p-2 rounded-lg">
          {
            !showAll ? (<IoMdAdd size={24} color="gray" />) : (<FaMinus size={24} color="gray" />)
          }
          
          
        </button>
      )}
    </article>
  );
}
