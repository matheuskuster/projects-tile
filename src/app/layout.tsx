import { Outfit } from 'next/font/google';

import { Toaster } from '@/components/ui/toaster';

import './globals.css';

const outfit = Outfit({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
