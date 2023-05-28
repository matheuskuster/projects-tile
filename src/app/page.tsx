import { MainNav } from '@/components/main-nav';
import { Projects } from '@/components/projects';

export default function Home() {
  return (
    <main className="overflow-hidden bg-background h-screen">
      {/* @ts-expect-error Async Server Component */}
      <MainNav />

      <main className="h-full">
        <Projects />
      </main>
    </main>
  );
}
