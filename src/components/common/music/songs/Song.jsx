import Link from 'next/link';
import Options from '../button/Options';

const SONGS = [
  {
    path: '/',
    img: '/img/gatito.jpeg',
    alt: 'foto de gatito',
    name: 'gatito',
    artist: 'gatito',
    id: 'gatito',
  },
  {
    path: '/',
    img: '/img/gatito.jpeg',
    alt: 'foto de gatito',
    name: 'gatito',
    artist: 'gatito',
    id: 'gatito 2',
  },
  {
    path: '/',
    img: '/img/gatito.jpeg',
    alt: 'foto de gatito',
    name: 'gatito',
    artist: 'gatito',
    id: 'gatito 3',
  },
  {
    path: '/',
    img: '/img/gatito.jpeg',
    alt: 'foto de gatito',
    name: 'gatito',
    artist: 'gatito',
    id: 'gatito 4',
  },
];

export default async function Songs() {
  let res = await fetch('http://localhost:3001/api/songs');
  const SONGS = await res.json();

  return (
    <section className='col-span-4'>
      {SONGS.map(({  image_Url, alt, name, artist, id }) => {
        return (
          <article key={id} className="px-4 py-5 grid grid-cols-4 col-span-4 gap-4 overflow-hidden rounded-xl">
              <picture className="col-start-1 overflow-hidden rounded-xl">
                <img src={image_Url} alt={alt} />
              </picture>
              <section className="col-start-2 col-span-2">
                <h2>{name}</h2>
                <p className='text-sm' >{artist}</p>
              </section>
              <button className="w-1/5 content-center col-span-1 col-start-4 ">
                <Options />
              </button>
          </article>
        );
      })}
    </section>
  );
}
