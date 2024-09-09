import Link from 'next/link';

const GENDER = [
  {
    path: '/',
    gender: 'gatito',
    img: '/img/gatito.jpeg',
    alt: 'foto de un gatito',
    id: 'gatito 3',
  },
];

export default function Gender() {
  return (
    <>
      {GENDER.map(({ path, img, gender, alt, id }) => {
        return (
          <article key={id} className="w-1/4 flex flex-row overflow-hidden">
            <Link href={path}>
              <h2>{gender}</h2>
              <picture className="rotate-45 overflow-hidden rounded-xl">
                <img src={img} alt={alt} className="object-cover " />
              </picture>
            </Link>
          </article>
        );
      })}
    </>
  );
}
