import Link from 'next/link';
import Options from '../button/Options';

const PLAYLISTS = [
  {
    path: '/',
    img: '../../../../../public/img/gatito.jpeg',
    alt: 'foto de gatito',
    name: 'gatito',
    advancement: 'es un gatito',
    id: 'gatito 2',
  },
];

export default function Songs() {
  return (
    <>
      {PLAYLISTS.map(({ path, img, alt, name, advancement, id }) => {
        return (
          <article key={id}>
            <Link href={path}>
              <picture>
                <img src={img} alt={alt} />
              </picture>
              <section>
                <h2>{name}</h2>
                <p>{advancement}</p>
              </section>
              <button>
                <Options />
              </button>
            </Link>
          </article>
        );
      })}
    </>
  );
}
