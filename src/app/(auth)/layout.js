import HeaderProfile from '@/components/profile/header/HeaderProfile';
import NavMicrophoneOnly from '@/components/common/navigation-bar/NavMicrophoneOnly';

export default function LayoutOpen({ children }) {
  return (
    <>
      <HeaderProfile />
      <main className="grid grid-cols-4 gap-4 pb-40 mt-0">{children}</main>
      <footer className="fixed bottom-0 w-full">
        <NavMicrophoneOnly />
      </footer>
    </>
  );
}
