'use client';

import React, { useCallback, useEffect, useMemo } from 'react';

import { useInterval } from '@/hooks/use-interval';

export interface SlideContextType {
  slideIndex: number;
  totalSlides: number;
  tileCount: number;
  totalCount: number;
  canGoBack: boolean;
  canGoForward: boolean;
  goBack: () => void;
  goForward: () => void;
  startAt: number;
  turnOnAutomaticSlides: () => void;
  turnOffAutomaticSlides: () => void;
  isAutomaticSlidesOn: boolean;

  setTotalCount: React.Dispatch<React.SetStateAction<number>>;
}

interface SlideProviderProps {
  children: React.ReactNode;
}

const SlideContext = React.createContext<SlideContextType>({} as SlideContextType);

export const SlideProvider: React.FC<SlideProviderProps> = ({ children }) => {
  const [tileCount, setTileCount] = React.useState<number>(0);
  const [totalCount, setTotalCount] = React.useState<number>(0);
  const [slideIndex, setSlideIndex] = React.useState<number>(0);
  const [totalSlides, setTotalSlides] = React.useState<number>(0);
  const [isAutomaticSlidesOn, setIsAutomaticSlidesOn] = React.useState<boolean>(false);

  const canGoBack = slideIndex > 0;
  const canGoForward = slideIndex < totalSlides - 1;

  const calculateTiles = useCallback(() => {
    if (totalCount === 0) {
      return;
    }

    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) - 60;
    const tileWidth = 384 + 16; // Tailwind's w-36 is equivalent to 384px
    const tileHeight = 176 + 16; // Tailwind's h-36 is equivalent to 256px
    const tilesInRow = Math.floor(vw / tileWidth);
    const tilesInColumn = Math.floor(vh / tileHeight);
    const availableTilesInViewport = tilesInRow * tilesInColumn;
    const tilesInViewport =
      availableTilesInViewport > totalCount ? totalCount : availableTilesInViewport;
    setTileCount(tilesInViewport);
  }, [totalCount]);

  const calculateTotalSlides = useCallback(() => {
    if (tileCount > 0 && totalCount > 0) {
      setTotalSlides(Math.ceil(totalCount / tileCount));
    } else {
      setTotalSlides(0);
    }
  }, [tileCount, totalCount]);

  const goBack = useCallback(() => {
    if (canGoBack) {
      setSlideIndex((prev) => prev - 1);
    }
  }, [canGoBack]);

  const goForward = useCallback(() => {
    if (canGoForward) {
      setSlideIndex((prev) => prev + 1);
    } else if (isAutomaticSlidesOn) {
      setSlideIndex(0);
    }
  }, [canGoForward, isAutomaticSlidesOn]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        goBack();
      } else if (event.key === 'ArrowRight') {
        goForward();
      }
    },
    [goBack, goForward]
  );

  const turnOnAutomaticSlides = useCallback(() => {
    setIsAutomaticSlidesOn(true);
    setSlideIndex(0);
  }, []);

  const turnOffAutomaticSlides = useCallback(() => {
    setIsAutomaticSlidesOn(false);
    setSlideIndex(0);
  }, []);

  const startAt = useMemo(() => {
    return slideIndex * tileCount;
  }, [slideIndex, tileCount]);

  useEffect(() => {
    calculateTiles();
    window.addEventListener('resize', calculateTiles);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('resize', calculateTiles);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [calculateTiles, handleKeyDown]);

  useEffect(() => {
    calculateTotalSlides();
  }, [calculateTotalSlides]);

  useEffect(() => {
    if (totalCount === 0) {
      setSlideIndex(0);
    }

    if (totalCount > 0 && totalSlides >= 1 && startAt >= totalCount) {
      setSlideIndex(totalSlides - 1);
    }
  }, [tileCount, totalSlides, startAt, totalCount]);

  useInterval(() => {
    if (isAutomaticSlidesOn) {
      goForward();
    }
  }, 10000); // 10 seconds

  return (
    <SlideContext.Provider
      value={{
        tileCount,
        totalCount,
        setTotalCount,
        slideIndex,
        totalSlides,
        canGoBack,
        canGoForward,
        goBack,
        goForward,
        startAt,
        turnOnAutomaticSlides,
        turnOffAutomaticSlides,
        isAutomaticSlidesOn,
      }}
    >
      {children}
    </SlideContext.Provider>
  );
};

export const useSlides = () => React.useContext(SlideContext);
