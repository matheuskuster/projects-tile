import { AutoPlaySwitch } from '@/components/auto-play-switch';
import { NewProject } from '@/components/new-project';
import { Projects } from '@/components/projects';
import { SlideControl } from '@/components/slide-control';
import { StatusSelect } from '@/components/status-select';

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-background">
      <header className="px-4 h-16 border-b flex items-center justify-between">
        <section className="flex gap-4">
          <StatusSelect />
          <SlideControl />
          <AutoPlaySwitch />
        </section>

        <section className="flex items-center gap-4">
          <NewProject />
        </section>
      </header>

      <main>
        <Projects />
      </main>
    </main>
  );
}
