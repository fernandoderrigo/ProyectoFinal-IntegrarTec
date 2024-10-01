'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Options from '../button/Options';
import { PlaylistFallback } from '@/components/fallback/PlaylistFallback';
import UpdatePlaylist from './UpdatePlaylist';

export default function Component() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [isUpdateVisible, setIsUpdateVisible] = useState(false);

  const showFullPlaylist = (playlist) => {
    setSelectedPlaylist(playlist);
  };

  const hideFullPlaylist = () => {
    setSelectedPlaylist(null);
  };

  const updatePlaylist = (playlist) => {
    setSelectedPlaylist(playlist);
    setIsUpdateVisible(true);
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    async function fetchPlaylists() {
      try {
        let response = await fetch('/api/playlist', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.status === 401 && refreshToken) {
          console.log('Attempting with refresh token');
          response = await fetch('/api/playlist', {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          });
        }
        if (response.ok) {
          const data = await response.json();
          setPlaylists(data);
        } else {
          console.error('Error fetching playlists');
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
    <>
      <motion.section
        className="col-span-4 px-4"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {playlists.map(({ id, name, nick_Name, image_Url, playlistSongs }) => (
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
              <picture className="w-full col-start-1 overflow-hidden aspect-square rounded-xl place-self-center">
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
            <button
              className="content-center col-start-4 "
              onClick={() =>
                updatePlaylist({
                  playlistSongs,
                  nick_Name,
                  name,
                })
              }
            >
              <Options />
            </button>
          </motion.article>
        ))}
      </motion.section>
      {isUpdateVisible && selectedPlaylist && (
        <UpdatePlaylist
          hideFullPlaylist={() => {
            setIsUpdateVisible(false);
            setSelectedPlaylist(null);
          }}
          playlist={selectedPlaylist}
        />
      )}
    </>
  );
}
