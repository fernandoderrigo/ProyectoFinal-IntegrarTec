import HeaderProfile from '@/components/profile/header/HeaderProfile';
import NavMicrophoneOnly from '@/components/common/navigation-bar/NavMicrophoneOnly';

export default function LayoutOpen({ children }) {
  return (
    <>
      <HeaderProfile />
      <main className="mt-16 pb-40">{children}</main>
      <footer className="fixed bottom-0 w-full">
        <NavMicrophoneOnly />
      </footer>
    </>
  );
}
