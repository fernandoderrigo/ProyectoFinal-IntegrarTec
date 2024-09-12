import Link from 'next/link';

const ARTIST = [
  {
    path: '/',
    img: '/img/gatito.jpeg',
    alt: 'foto de un gatito',
    id: 'gatito 4',
  },
  {
    path: '/',
    img: '/img/gatito.jpeg',
    alt: 'foto de un gatito',
    id: 'gatito 5',
  },
  {
    path: '/',
    img: '/img/gatito.jpeg',
    alt: 'foto de un gatito',
    id: 'gatito 6',
  },
  {
    path: '/',
    img: '/img/gatito.jpeg',
    alt: 'foto de un gatito',
    id: 'gatito 7',
  },
];

export default function Artist() {
  return (
      <article className="grid grid-cols-4 gap-4 px-4 py-5 col-span-4">
        {ARTIST.map(({ path, img, alt, id }) => {
          return (
            <Link
              key={id}
              className="overflow-hidden rounded-full h-28"
              href={path}
            >
              <picture>
                <img src={img} alt={alt} />
              </picture>
            </Link>
          );
        })}
      </article>
  );
}