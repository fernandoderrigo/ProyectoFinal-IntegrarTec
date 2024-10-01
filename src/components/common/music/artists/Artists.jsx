'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Artist() {
  const [artistsList, setArtistsList] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = tokenExpired();
    setToken(token);
  }, []);

  useEffect(() => {
    if (!token) return;

    async function fetchArtistsData() {
      try {
        let response = await fetch('/api/artists', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setArtistsList(data);
        } else {
          console.error('Error al obtener las canciones');
        }
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
    }
    fetchArtistsData();
  }, [token]);
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
