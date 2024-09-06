import Link from 'next/link';

const ARTIST = [
  {
    path: '/',
    img: '../../../../../public/img/gatito.jpeg',
    alt: 'foto de un gatito',
    id: 'gatito 4',
  },
];

export default function Gender() {
  return (
    <>
      {ARTIST.map(({ path, img, alt, id }) => {
        return (
          <article key={id}>
            <Link href={path}>
              <picture>
                <img src={img} alt={alt} />
              </picture>
            </Link>
          </article>
        );
      })}
    </>
  );
}
