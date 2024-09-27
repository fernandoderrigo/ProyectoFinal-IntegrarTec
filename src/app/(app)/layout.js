import NavBar from '@/components/common/navigation-bar/NavigationBar';
import Header from '@/components/profile/header/Header';
import Reproduction from '@/components/common/reproduction/Reproduction';
import { Suspense } from 'react';

export default function LayoutOpen({ children }) {
  return (
    <>
      <Header />
      <main className="grid grid-cols-4 gap-4 px-4 pb-40 mt-16">
        {children}
      </main>
      <footer className="fixed bottom-0 z-50 w-full">
        <Reproduction />
        <NavBar />
      </footer>
    </>
  );
}
