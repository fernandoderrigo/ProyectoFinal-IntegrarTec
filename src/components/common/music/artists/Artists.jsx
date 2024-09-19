'use client'

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Artist() {
  const [artistsList, setArtistsList] = useState([]);

  useEffect(() => {
    async function fetchArtistsData() {
      try {
        const response = await fetch('/api/artists');
        const data = await response.json();
        setArtistsList(data);
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
    }
    fetchArtistsData();
  }, []);
  return (
      <article className="grid grid-cols-4 gap-4 px-4 py-5 col-span-4">
        {artistsList.map(({ id, name }) => {
          return (
            <Link
              key={id}
              className="overflow-hidden rounded-full w-full aspect-square"
              href={name}
            >
              <picture>
                <img src='' alt={name} />
              </picture>
            </Link>
          );
        })}
      </article>
  );
}