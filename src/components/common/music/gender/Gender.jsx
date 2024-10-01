'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { tokenExpired } from '@/utils/jwtDecode';

export default function Gender({ showFullGender }) {
  const [genderList, setGenderList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = tokenExpired();
    setToken(token);
  }, []);

  useEffect(() => {
    if (!token) return;
    async function fetchGendersData() {
      try {
        let response = await fetch('/api/gender', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setGenderList(data);
        } else {
          console.error('Error al obtener los generos');
        }
      } catch (error) {
        console.error('Error fetching genders:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchGendersData();
  }, [token]);

  const SkeletonGender = () => (
    <article className="grid w-full grid-cols-4 col-span-4 gap-4 px-4 py-5 animate-pulse">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="col-span-2 bg-gray-300 aspect-video rounded-xl"
        />
      ))}
    </article>
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  if (loading) {
    return <SkeletonGender />;
  }

  return (
    <motion.article
      className="grid w-full grid-cols-4 col-span-4 gap-4 px-4 py-5"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {genderList.map(({ gender, image }) => (
        <motion.button
          className="grid aspect-video col-span-2 grid-cols-2 content-center rounded-xl gap-4 bg-waterGreen-500 p-2.5 hover:bg-waterGreen-600 transition-colors duration-300"
          key={gender}
          onClick={() => showFullGender({ gender })}
          variants={item}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center w-2/5 h-full pl-2 text-lg">
            <h2 className="font-semibold text-white">{gender}</h2>
          </div>
          <picture className="w-full col-start-2 overflow-hidden rounded-xl place-self-center">
            <img
              src={image}
              alt={gender}
              className="object-cover w-full h-full"
            />
          </picture>
        </motion.button>
      ))}
    </motion.article>
  );
}
