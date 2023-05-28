import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from './ui/button';

export function SlideControl() {
  return (
    <section className="flex gap-2">
      <Button variant="outline" className="w-10 rounded-full p-0">
        <ChevronLeft className="w-6 h-6" />
      </Button>
      <Button variant="outline" className="w-10 rounded-full p-0">
        <ChevronRight className="w-6 h-6" />
      </Button>
    </section>
  );
}
