const TAGS = [
  {
    tagName: 'Gatito',
    id: '1',
  },
  {
    tagName: 'Gatito numero 2',
    id: '2',
  },
];

export default function Tags() {
  return (
    <>
      {TAGS.map(({ tagName, id }) => {
        return (
          <section key={id}>
            <h3>{tagName}</h3>
          </section>
        );
      })}
    </>
  );
}
