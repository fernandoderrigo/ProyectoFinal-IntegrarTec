import NavBar from '@/app/components/nabigation-bar/NabigationBar';
import Header from '../components/header/Header';

export default function LayoutOpen({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <NavBar />
    </>
  );
}
