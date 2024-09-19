'use client'

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Gender() {
  const [genderList, setGenderList] = useState([]);

  useEffect(() => {
    async function fetchgendersData() {
      try {
        const response = await fetch('/api/gender');
        const data = await response.json();
        setGenderList(data);
      } catch (error) {
        console.error('Error fetching genders:', error);
      }
    }
    fetchgendersData();
  }, []);
  return (
      <article className="grid w-full grid-cols-4 gap-4 px-4 py-5 col-span-4">
        {genderList.map(({gender,image}) => {
          return (
            <Link
              className="grid aspect-video col-span-2 grid-cols-2 content-center rounded-xl gap-4 bg-waterGreen-500 p-2.5"
              href="{path}"
              key={gender}
            >
              <div className="w-2/5 h-full pl-2 text-lg">
                <h2>{gender}</h2>
              </div>
              <picture className="w-full col-start-2 overflow-hidden rounded-xl place-self-center">
                <img
                  src={image}
                  alt={gender}
                  className=""
                />
              </picture>
            </Link>
          );
        })}
      </article>
  );
}