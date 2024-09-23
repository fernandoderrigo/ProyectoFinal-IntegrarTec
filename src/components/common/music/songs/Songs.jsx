'use client';
import { useState, useEffect, useContext } from 'react';
import Options from '../button/Options';
import { SongContext } from '@/contexts/AudioContext';
export default function SongList({ filterFunction }) {
  const [songList, setSongList] = useState([]);
  const { setSelectedSong } = useContext(SongContext);

  const handleClick = (song) => {
    setSelectedSong(song);
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const RefreshAccessToken = localStorage.getItem('refreshToken');
    
    async function fetchSongsData() {
      try {
        console.log('intento con Token');
        let response = await fetch('/api/filter', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log('despues del fetch');
        if (response.status === 401 && RefreshAccessToken){
          console.log("intento con refresToken")
          response = await fetch('/api/filter', {
            headers: {
              Authorization: `Bearer ${RefreshAccessToken}`,
            },
          });
        }

        if (response.ok) {
          const data = await response.json();
          setSongList(data);
        } else {
          console.error('Error al obtener las canciones');
        }
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    }
    fetchSongsData();
  }, []);

  const filteredSongs = filterFunction
    ? songList.filter(filterFunction)
    : songList;

  return (
    <article className="col-span-4 px-4">

        {filteredSongs.map(
          ({ id, name, duration, gender, imageUrl, audioUrl, artists }) => (
            <section
              key={id}
              className="grid grid-cols-4 gap-4 px-4 py-5 my-4 bg-neutralViolet-900/40 rounded-xl"
            >
              <button
                className="grid grid-cols-3 col-span-3 col-start-1 gap-4"
                onClick={() =>
                  handleClick({
                    id,
                    name,
                    duration,
                    gender,
                    imageUrl,
                    audioUrl,
                    artists,
                  })
                }
              >
                <picture className="w-full col-start-1 overflow-hidden aspect-square rounded-xl">
                  <img src={imageUrl} alt={gender} />
                </picture>
                <section className="col-span-2 col-start-2 text-start">
                  <h2>{name}</h2>
                  <p className="text-sm">{artists}</p>
                  <p className="text-sm">{duration}</p>
                </section>
              </button>
              <button className="content-center col-start-4">
                <Options />
              </button>
            </section>
          )
        )}

    </article>
  );
}
