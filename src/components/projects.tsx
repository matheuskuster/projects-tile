'use client';

import { useEffect, useState } from 'react';

import { ProjectCard } from './project-card';

const projectsCount = 1000;

export function Projects() {
  const [tileCount, setTileCount] = useState(0);

  const calculateTiles = () => {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) - 60;
    const tileWidth = 384 + 16; // Tailwind's w-36 is equivalent to 384px
    const tileHeight = 176 + 16; // Tailwind's h-36 is equivalent to 256px
    const tilesInRow = Math.floor(vw / tileWidth);
    const tilesInColumn = Math.floor(vh / tileHeight);
    const tilesInViewport = tilesInRow * tilesInColumn;
    setTileCount(tilesInViewport);
  };

  useEffect(() => {
    calculateTiles();
    window.addEventListener('resize', calculateTiles);
    return () => window.removeEventListener('resize', calculateTiles);
  }, []);

  return (
    <section
      className="grid overflow-hidden gap-4 p-4"
      style={{
        gridTemplateColumns: 'repeat(auto-fill, minmax(384px, 1fr))',
      }}
    >
      {Array.from({ length: tileCount || projectsCount }, (_, i) => (
        <ProjectCard key={i} />
      ))}
    </section>
  );
}
