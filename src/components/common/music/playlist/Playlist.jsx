'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Options from '../button/Options';
import { PlaylistFallback } from '@/components/fallback/PlaylistFallback';

export default function Playlist({
  showFullPlaylist,
  filterFunction,
  order = [],
}) {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    }
    fetchPlaylists();
  }, []);

  if (loading) {
    return <PlaylistFallback />;
  }

  const filteredPlaylist = filterFunction
    ? playlists
        .filter(filterFunction)
        .sort((a, b) =>
          order.length > 0 ? order.indexOf(a.id) - order.indexOf(b.id) : 0
        )
    : playlists;

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.section
      className="col-span-4 px-4"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {filteredPlaylist.map(
        ({ id, name, nick_Name, image_Url, playlistSongs }) => (
          <motion.article
            key={id}
            className="grid grid-cols-4 gap-4 px-4 py-5 my-4 bg-neutralViolet-900/40 rounded-xl"
            variants={item}
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
                <img
                  src={image_Url}
                  alt={`${name} playlist cover`}
                  className="object-cover w-full h-full"
                />
              </picture>
              <section className="col-span-2 col-start-2 text-start">
                <h2 className="text-lg font-semibold text-neutralViolet-50">
                  {name}
                </h2>
                <p className="text-sm text-neutralViolet-300">
                  Created by {nick_Name}
                </p>
              </section>
            </button>
            <button className="content-center col-start-4 ">
              <Options />
            </button>
          </motion.article>
        )
      )}
    </motion.section>
  );
}
