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
          <article key={id} className="w-full">
            <Link href={path}>
              <picture className="w-2/5 aspect-square rounded-lg">
                <img src={img} alt={alt} />
              </picture>
              <section className="w-2/5">
                <h2>{name}</h2>
                <p>{artist}</p>
              </section>
              <button className="w-1/5">
                <Options />
              </button>
            </Link>
          </article>
        );
      })}
    </>
  );
}
