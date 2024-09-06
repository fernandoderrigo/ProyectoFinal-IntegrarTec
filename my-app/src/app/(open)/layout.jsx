import NavBar from '@/app/components/nabigation-bar/NabigationBar';
import Header from '../components/header/Header';
import PartialReproduction from '@/app/components/reproduction/partial-reproduction/PartialReproduction';

export default function LayoutOpen({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <PartialReproduction />
      <NavBar />
    </>
  );
}
