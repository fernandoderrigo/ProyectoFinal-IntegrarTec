import NavBar from '@/app/components/navigation-bar/NavigationBar';
import Header from '../components/header/Header';
import Reproduction from '../components/reproduction/Reproduction';

export default function LayoutOpen({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Reproduction />
      <NavBar />
    </>
  );
}
