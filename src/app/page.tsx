import { NewProject } from '@/components/new-project';
import { Projects } from '@/components/projects';
import { SettingsPopover } from '@/components/settings-popover';
import { SlideControl } from '@/components/slide-control';
import { StatusSelect } from '@/components/status-select';

export default function Home() {
  return (
    <main className="overflow-hidden bg-background h-screen">
      <header className="px-4 h-16 border-b flex items-center justify-between">
        <section className="flex gap-4">
          <StatusSelect />
          <SlideControl />
        </section>

        <section className="flex items-center gap-4">
          <NewProject />
          <SettingsPopover />
        </section>
      </header>

      <main className="h-full">
        <Projects />
      </main>
    </main>
  );
}
