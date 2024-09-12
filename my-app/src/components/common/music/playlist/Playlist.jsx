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
          <article key={id} className="flex w-full flex-col gap-4 px-4 py-5">
            <Link
              href={path}
              className="grid w-full grid-cols-4 gap-4 overflow-hidden h-28 rounded-xl"
            >
              <picture className="col-start-1 overflow-hidden rounded-xl">
                <img src={img} alt={alt} />
              </picture>
              <section className="col-start-2">
                <h2>{name}</h2>
                <p>{advancement}</p>
              </section>
              <button className="w-1/5 content-center col-span-1 col-start-4 ">
                <Options />
              </button>
            </Link>
          </article>
        );
      })}
    </section>
  );
}
