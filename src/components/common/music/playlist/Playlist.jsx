'use client';
import React, { useState, useEffect } from 'react';
import Options from '../button/Options';

export default function Playlist({ showFullPlaylist }) {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const RefreshAccessToken = localStorage.getItem('refreshToken');
    async function fetchPlaylists() {
      try {
        let response = await fetch('/api/playlist', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.status === 401 && RefreshAccessToken) {
          console.log('intento con refresToken');
          response = await fetch('/api/playlist', {
            headers: {
              Authorization: `Bearer ${RefreshAccessToken}`,
            },
          });
        }
        if (response.ok) {
          const data = await response.json();
          setPlaylists(data);
        } else {
          console.error('Error al obtener las canciones');
        }
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    }
    fetchPlaylists();
  }, []);

  // Verificar si showFullPlaylist es una función
  if (typeof showFullPlaylist !== 'function') {
    console.error('showFullPlaylist no es una función');
    return null; // O manejar este caso de alguna otra manera
  }

  return (
    <section className="col-span-4 px-4">
      {playlists.map(({ id, name, nick_Name, image_Url, playlistSongs }) => (
        <article
          key={id}
          className="grid grid-cols-4 gap-4 px-4 py-5 my-4 bg-neutralViolet-900/40 rounded-xl"
        >
          <button
            onClick={() =>
              showFullPlaylist({
                playlistSongs,
                nick_Name,
                name,
              })
            }
            className="grid grid-cols-3 col-span-3 col-start-1 gap-4"
          >
            <picture className="w-full col-start-1 overflow-hidden aspect-square rounded-xl">
              <img src={image_Url} alt={`${name} playlist cover`} />
            </picture>
            <section className="col-span-2 col-start-2 text-start">
              <h2>{name}</h2>
              <p className="text-sm">Created by {nick_Name}</p>
            </section>
          </button>
          <button className="content-center col-start-4 ">
            <Options />
          </button>
        </article>
      ))}
    </section>
  );
}
