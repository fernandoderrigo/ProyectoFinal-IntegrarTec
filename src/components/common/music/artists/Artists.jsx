'use client'

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Artist() {
  const [artistsList, setArtistsList] = useState([]);

  useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const RefreshAccessToken = localStorage.getItem('refreshToken');

    async function fetchArtistsData() {
      try {
        let response = await fetch('/api/artists', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log('despues del fetch');
        if (response.status === 401 && RefreshAccessToken) {
          console.log('intento con refresToken');
          response = await fetch('/api/artists', {
            headers: {
              Authorization: `Bearer ${RefreshAccessToken}`,
            },
          });
        }
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setArtistsList(data);
        } else {
          console.error('Error al obtener las canciones');
        }
        
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
    }
    fetchArtistsData();
  }, []);
  return (
    <article className="grid grid-cols-4 col-span-4 gap-4 px-4 py-5">
      {artistsList.map(({ id, name }) => {
        return (
          <Link
            key={id}
            className="w-full overflow-hidden rounded-full aspect-square"
            href={name}
          >
            <picture>
              <img src="" alt={name} />
            </picture>
          </Link>
        );
      })}
    </article>
  );
}