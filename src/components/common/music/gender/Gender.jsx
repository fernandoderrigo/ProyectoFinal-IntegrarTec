'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Gender({ showFullGender }) {
  const [genderList, setGenderList] = useState([]);

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
          console.error('Error al obtener los generos');
        }
      } catch (error) {
        console.error('Error fetching genders:', error);
      }
    }
    fetchGendersData();
  }, []);
  return (
    <article className="grid w-full grid-cols-4 col-span-4 gap-4 px-4 py-5">
      {genderList.map(({ gender, image }) => {
        return (
          <button
            className="grid aspect-video col-span-2 grid-cols-2 content-center rounded-xl gap-4 bg-waterGreen-500 p-2.5"
            key={gender}
            onClick={() =>
              showFullGender({
                gender,
              })
            }
          >
            <div className="w-2/5 h-full pl-2 text-lg">
              <h2>{gender}</h2>
            </div>
            <picture className="w-full col-start-2 overflow-hidden rounded-xl place-self-center">
              <img src={image} alt={gender} className="" />
            </picture>
          </button>
        );
      })}
    </article>
  );
}
