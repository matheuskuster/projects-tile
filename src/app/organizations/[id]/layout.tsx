import { ProjectsProvider } from '@/components/projects-provider';
import { SlideProvider } from '@/components/slide-provider';

export const metadata = {
  title: 'Project Management',
  description: 'A simple project management app.',
};

export default function OrganizationsLayout({ children }: { children: React.ReactNode }) {
  return (
    <SlideProvider>
      <ProjectsProvider>{children}</ProjectsProvider>
    </SlideProvider>
  );
}
