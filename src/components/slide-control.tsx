'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { useSlides } from './slide-provider';
import { Button } from './ui/button';

export function SlideControl() {
  const { canGoBack, canGoForward, goBack, goForward, totalSlides } = useSlides();

  if (totalSlides <= 1) {
    return null;
  }

  return (
    <section className="flex gap-2">
      <Button
        disabled={!canGoBack}
        onClick={goBack}
        variant="outline"
        className="w-10 rounded-full p-0"
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>
      <Button
        disabled={!canGoForward}
        onClick={goForward}
        variant="outline"
        className="w-10 rounded-full p-0"
      >
        <ChevronRight className="w-6 h-6" />
      </Button>
    </section>
  );
}
