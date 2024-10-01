import { Inter } from 'next/font/google';
import './globals.css';
import { SongProvider } from '@/contexts/AudioContext';
import { MicrophoneProvider } from '@/contexts/MicrophoneContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'EscuchaFacil',
  description: 'Musica para todos',
  icons: {
    icon: '/logo1.ico', 
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} h-svh bg-black text-neutralViolet-50`}
      >
        <MicrophoneProvider>
          <SongProvider>{children}</SongProvider>
        </MicrophoneProvider>
      </body>
    </html>
  );
}
