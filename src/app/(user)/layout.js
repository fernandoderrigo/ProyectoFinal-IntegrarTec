'use client';

import HeaderProfile from '@/components/profile/header/HeaderProfile';
import NavMicrophoneOnly from '@/components/common/navigation-bar/NavMicrophoneOnly';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LayoutOpen({ children }) {
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!accessToken && !refreshToken) {
      return router.push('/login');
    }
  }, [router]);
  return (
    <>
      <HeaderProfile />
      <main className="grid grid-cols-4 gap-4 px-4 pb-16 ">{children}</main>
      <footer className="fixed bottom-0 w-full">
        <NavMicrophoneOnly />
      </footer>
    </>
  );
}
