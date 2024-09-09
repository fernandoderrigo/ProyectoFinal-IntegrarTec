import Link from 'next/link';
import Options from '../button/Options';

const PLAYLISTS = [
  {
    path: '/',
    img: '/img/gatito.jpeg',
    alt: 'foto de gatito',
    name: 'gatito',
    advancement: 'es un gatito',
    id: 'gatito 2',
  },
];

export default function Playlist() {
  return (
    <>
      {PLAYLISTS.map(({ path, img, alt, name, advancement, id }) => {
        return (
          <article key={id} className="w-full">
            <Link href={path}>
              <picture className="w-2/5 aspect-square rounded-lg">
                <img src={img} alt={alt} />
              </picture>
              <section className='w-2/5'>
                <h2>{name}</h2>
                <p>{advancement}</p>
              </section>
              <button className='w-1/5'>
                <Options />
              </button>
            </Link>
          </article>
        );
      })}
    </>
  );
}
