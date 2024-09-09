export default async function Page() {
  let data = await fetch('http://localhost:3001/api/index');
  let posts = await data.json();
  return <p>{posts}</p>;
}
