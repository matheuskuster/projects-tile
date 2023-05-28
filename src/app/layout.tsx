import { Outfit } from 'next/font/google';

import { SlideProvider } from '@/components/slide-provider';
import { Toaster } from '@/components/ui/toaster';

import './globals.css';
import { ProjectsProvider } from '@/components/projects-provider';

const outfit = Outfit({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <SlideProvider>
          <ProjectsProvider>{children}</ProjectsProvider>
        </SlideProvider>
        <Toaster />
      </body>
    </html>
  );
}
