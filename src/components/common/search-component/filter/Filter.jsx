'use client';
import { IoMdAdd } from 'react-icons/io';
import { FaMinus } from 'react-icons/fa';
import { useState, useEffect } from 'react';

export default function Tags({ onGenreSelect }) {
  const [genderList, setGenderList] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const RefreshAccessToken = localStorage.getItem('refreshToken');
    async function fetchGendersData() {
      try {
        let response = await fetch('/api/gender', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.status === 401 && RefreshAccessToken) {
          console.log('intento con refresToken');
          response = await fetch('/api/gender', {
            headers: {
              Authorization: `Bearer ${RefreshAccessToken}`,
            },
          });
        }
        if (response.ok) {
          const data = await response.json();
          setGenderList(data);
        } else {
          console.error('Error al obtener las canciones');
        }
      } catch (error) {
        console.error('Error fetching genders:', error);
      }
    }
    fetchGendersData();
  }, []);

  const displayedGenders = showAll ? genderList : genderList.slice(0, 3);

  const handleGenreClick = (genre) => {
    const updatedGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter((g) => g !== genre)
      : [...selectedGenres, genre];
    setSelectedGenres(updatedGenres);
    onGenreSelect(updatedGenres);
  };

  return (
    <article className="flex flex-wrap justify-between col-span-4 gap-2">
      {displayedGenders.map(({ gender }) => (
        <button
          key={gender}
          className={`p-2 rounded-lg ${
            selectedGenres.includes(gender)
              ? 'bg-neutralViolet-700'
              : 'bg-neutralViolet-900'
          }`}
          onClick={() => handleGenreClick(gender)}
        >
          <h3>{gender}</h3>
        </button>
      ))}
      {genderList.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="flex items-center p-2 rounded-lg bg-neutralViolet-900"
        >
          {!showAll ? (
            <IoMdAdd size={24} color="gray" />
          ) : (
            <FaMinus size={24} color="gray" />
          )}
        </button>
      )}
    </article>
  );
}
