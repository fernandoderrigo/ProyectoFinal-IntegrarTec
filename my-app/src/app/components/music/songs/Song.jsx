import Link from 'next/link';
import Options from '../button/Options';

const SONGS = [
  {
    path: '/',
    img: '../../../../../public/img/gatito.jpeg',
    alt: 'foto de gatito',
    name: 'gatito',
    artist: 'gatito',
    id: 'gatito',
  },
];

export default function Songs() {
  return (
    <>
      {SONGS.map(({ path, img, alt, name, artist, id}) => {
        return (
          <article key={id}>
            <Link href={path}>
              <picture>
                <img src={img} alt={alt} />
              </picture>
              <section>
                <h2>{name}</h2>
                <p>{artist}</p>
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
