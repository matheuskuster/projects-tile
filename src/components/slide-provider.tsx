'use client';

import React, { useCallback, useEffect, useMemo } from 'react';

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
  isPassingSlide: boolean;

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
  const [isPassingSlide, setIsPassingSlide] = React.useState<boolean>(false);

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

    if (slideIndex >= totalSlides - 1) {
      setSlideIndex(totalSlides - 1);
    }
  }, [totalCount, totalSlides, slideIndex]);

  const calculateTotalSlides = useCallback(() => {
    if (tileCount > 0 && totalCount > 0) {
      setTotalSlides(Math.ceil(totalCount / tileCount));
    } else {
      setTotalSlides(0);
    }
  }, [tileCount, totalCount]);

  const goBack = () => {
    if (canGoBack) {
      setIsPassingSlide(true);
      setSlideIndex((prev) => prev - 1);
    }
  };

  const goForward = () => {
    if (canGoForward) {
      setIsPassingSlide(true);
      setSlideIndex((prev) => prev + 1);
    }
  };

  const startAt = useMemo(() => {
    return slideIndex * tileCount;
  }, [slideIndex, tileCount]);

  useEffect(() => {
    calculateTiles();
    window.addEventListener('resize', calculateTiles);
    return () => window.removeEventListener('resize', calculateTiles);
  }, [calculateTiles]);

  useEffect(() => {
    calculateTotalSlides();
  }, [calculateTotalSlides]);

  useEffect(() => {
    setTimeout(() => {
      setIsPassingSlide(false);
    }, 2000);
  }, [isPassingSlide]);

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
        isPassingSlide,
      }}
    >
      {children}
    </SlideContext.Provider>
  );
};

export const useSlides = () => React.useContext(SlideContext);
