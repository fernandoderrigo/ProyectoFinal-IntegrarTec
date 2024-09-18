import NavBar from '@/components/common/navigation-bar/NavigationBar';
import Header from '@/components/profile/header/Header';
import Reproduction from '@/components/common/reproduction/Reproduction';

export default function LayoutOpen({ children }) {
  return (
    <>
      <Header />
      <main className="mt-16 pb-40 grid grid-cols-4 gap-4 px-4">
        {children}
      </main>
      <footer className="fixed bottom-0 w-full z-50">
        <Reproduction />
        <NavBar />
      </footer>
    </>
  );
}
