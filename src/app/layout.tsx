import { Outfit } from 'next/font/google';

import { ProjectsProvider } from '@/components/projects-provider';
import { SlideProvider } from '@/components/slide-provider';
import { Toaster } from '@/components/ui/toaster';

import './globals.css';

const outfit = Outfit({ subsets: ['latin'] });

export const metadata = {
  title: 'Project Management',
  description: 'A simple project management app.',
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
