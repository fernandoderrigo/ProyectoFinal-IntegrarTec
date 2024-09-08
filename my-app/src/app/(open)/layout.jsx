import NavBar from '@/app/components/navigation-bar/NavigationBar';
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
