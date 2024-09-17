'use client';

import React from 'react';
import Songs from '@/components/common/music/songs/Song';
import Gender from '@/components/common/music/gender/Gender';
import Playlist from '@/components/common/music/playlist/Playlist';
import Reproduction from '@/components/common/reproduction/Reproduction';
import Header from '@/components/profile/header/Header';
import NavBar from '@/components/common/navigation-bar/NavigationBar';
import Microphone from '@/components/common/navigation-bar/Microphone';

export default function Page() {
  const handleNavigate = (route) => {
    // Aquí puedes agregar lógica para manejar la navegación, si es necesario
    window.location.href = route;
  };

  const handleColorChange = (color) => {
    // Aquí puedes agregar lógica para manejar el cambio de color, si es necesario
    document.body.style.backgroundColor = color;
  };

  const handleBackgroundChange = ({ backgroundImage, backgroundColor }) => {
    // Aquí puedes agregar lógica para manejar el cambio de fondo, si es necesario
    document.body.style.backgroundImage = backgroundImage;
    document.body.style.backgroundColor = backgroundColor;
  };

  return (
    <>
      <Header />
      <main className='mt-16 pb-40'>
        <Songs />
        <Gender />
        <Playlist />
      </main>
      <footer className='fixed bottom-0 w-full'>
        <Reproduction />
        <NavBar />
      </footer>
      <Microphone
        onNavigate={handleNavigate}
        onColorChange={handleColorChange}
        onBackgroundChange={handleBackgroundChange}
      />
    </>
  );
}
