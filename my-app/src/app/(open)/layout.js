import NavBar from '@/app/components/navigation-bar/NavigationBar';
import Header from '../components/header/Header';
import Reproduction from '../components/reproduction/Reproduction';

export default function LayoutOpen({ children }) {
  return (
    <>
      <Header />
      <main className="mt-10 mb-16">{children}</main>
      <footer className="fixed bottom-0 w-full">
        <Reproduction />
        <NavBar />
      </footer>
    </>
  );
}
