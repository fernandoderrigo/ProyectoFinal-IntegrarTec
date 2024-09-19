'use client';

import React, { useState } from 'react';
import Songs from '@/components/common/music/songs/Songs';
import Search from '@/components/common/search-component/search-bar/ExpandSearchBar';
import Tags from '@/components/common/search-component/filter/Filter';
import Microphone from '@/components/common/navigation-bar/Microphone'; // Asegúrate de que el path es correcto

export default function SearchPage() {
  const [backgroundStyle, setBackgroundStyle] = useState({ backgroundColor: 'black', backgroundImage: 'none' });
  const [searchQuery, setSearchQuery] = useState('');

  const handleColorChange = (color) => {
    setBackgroundStyle(prevStyle => ({
      ...prevStyle,
      backgroundColor: color,
      backgroundImage: 'none' // Asegúrate de que no haya imagen de fondo si solo se cambia el color
    }));
  };

  const handleBackgroundChange = (background) => {
    setBackgroundStyle(prevStyle => ({
      ...prevStyle,
      ...background // Permite la adición de imágenes de fondo
    }));
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleNavigate = (route) => {
    window.location.href = route; // Usa window.location para la navegación
  };

  return (
    <>
      <section className='col-span-4' style={backgroundStyle}>
        <Search onSearch={handleSearch} />
        <Tags />
        <Songs searchQuery={searchQuery} />
      </section>

      {/* Microphone Icon */}
      <div className='fixed bottom-5 right-5'>
        <Microphone
          onNavigate={handleNavigate}
          onColorChange={handleColorChange}
          onBackgroundChange={handleBackgroundChange}
        />
      </div>
    </>
  );
}
