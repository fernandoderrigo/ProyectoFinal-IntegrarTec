import HeaderProfile from '@/components/profile/header/HeaderProfile';
import NavMicrophoneOnly from '@/components/common/navigation-bar/NavMicrophoneOnly';

export default function LayoutOpen({ children }) {
  return (
    <>
      <HeaderProfile />
      <main className="mt-10 mb-16 grid grid-cols-4 gap-4 px-4">
        {children}
      </main>
      <footer className="fixed bottom-0 w-full">
        <NavMicrophoneOnly />
      </footer>
    </>
  );
}
