import Link from 'next/link';

const GENDER = [
  {
    path: '/',
    gender: 'gatito',
    img: '/img/gatito.jpeg',
    alt: 'foto de un gatito',
    id: 'gatito 3',
  },
  {
    path: '/',
    gender: 'gatito',
    img: '/img/gatito.jpeg',
    alt: 'foto de un gatito',
    id: 'gatito 4',
  },
  {
    path: '/',
    gender: 'gatito',
    img: '/img/gatito.jpeg',
    alt: 'foto de un gatito',
    id: 'gatito 5',
  },
  {
    path: '/',
    gender: 'gatito',
    img: '/img/gatito.jpeg',
    alt: 'foto de un gatito',
    id: 'gatito 6',
  },
];

export default function Gender() {
  return (
    <>
      <article className="grid w-full grid-cols-2 gap-4 px-4 py-5">
        {GENDER.map(({ path, img, gender, alt, id }) => {
          return (
            <Link
              className="grid aspect-video w-44 grid-cols-2 content-center rounded-xl bg-lime-500 p-2.5"
              href="{path}"
              key={id}
            >
              <div className="w-2/5 h-full pl-2 text-2xl">
                <h2>{gender}</h2>
              </div>
              <picture className="w-20 col-start-3 overflow-hidden rounded-xl">
                <img
                  src="https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb"
                  alt={alt}
                  className=""
                />
              </picture>
            </Link>
          );
        })}
      </article>
    </>
  );
}