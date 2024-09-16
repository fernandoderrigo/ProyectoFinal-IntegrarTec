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
    <section className='col-span-4'>
      {PLAYLISTS.map(({ path, img, alt, name, advancement, id }) => {
        return (
          <article key={id} className="px-4 py-5 backdrop-blur-3xl bg-neutralViolet-900/10">
            <Link
              href={path}
              className="grid grid-cols-4 gap-4 overflow-hidden rounded-xl"
            >
              <picture className="col-start-1 overflow-hidden rounded-xl">
                <img src={img} alt={alt} />
              </picture>
              <section className="col-start-2 col-span-2">
                <h2>{name}</h2>
                <p className='text-sm'>{advancement}</p>
              </section>
              <button className="content-center col-span-1 col-start-4 ">
                <Options />
              </button>
            </Link>
          </article>
        );
      })}
    </section>
  );
}
