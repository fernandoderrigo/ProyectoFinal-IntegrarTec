import Link from 'next/link';

const GENDER = [
  {
    path: '/',
    gender: 'gatito',
    img: '../../../../../public/img/gatito.jpeg',
    alt: 'foto de un gatito',
    id: 'gatito 3',
  },
];

export default function Gender() {
  return (
    <>
      {GENDER.map(({ path, gender, alt, id }) => {
        return (
          <article key={id}>
            <Link href={path}>
              <h2>{gender}</h2>
              <picture>
                <img src='' alt={alt} />
              </picture>
            </Link>
          </article>
        );
      })}
    </>
  );
}
