const ARTIST = [
  {
    img: '/img/gatito.jpeg',
    alt: 'foto de un gatito',
    id: 'gatito 4',
  },
];

export default function Singers() {
  return (
    <>
      {ARTIST.map(({img, alt, id }) => {
        return (
          <article key={id}>
            <button>
              <picture>
                <img src={img} alt={alt} />
              </picture>
            </button>
          </article>
        );
      })}
    </>
  );
}
