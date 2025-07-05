import React, { useState, useRef, useEffect } from 'react';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { Song } from '../App';

interface HorizontalMusicDialProps {
  songs: Song[];
  onSongSelect: (song: Song) => void;
}

const HorizontalMusicDial: React.FC<HorizontalMusicDialProps> = ({
  songs,
  onSongSelect
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const visibleItems = 3; // Only show 3 items at a time
  const itemWidth = window.innerWidth / 3; // Each item takes 1/3 of screen width
  const maxIndex = Math.max(0, songs.length - visibleItems);

  // Handle mouse/touch start
  const handleStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    if (scrollContainerRef.current) {
      setScrollLeft(scrollContainerRef.current.scrollLeft);
    }
  };

  // Handle mouse/touch move
  const handleMove = (clientX: number) => {
    if (!isDragging || !scrollContainerRef.current) return;
    
    const x = clientX;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  // Handle mouse/touch end
  const handleEnd = () => {
    if (!isDragging || !scrollContainerRef.current) return;
    
    setIsDragging(false);
    
    // Snap to nearest item
    const scrollLeft = scrollContainerRef.current.scrollLeft;
    const newIndex = Math.round(scrollLeft / itemWidth);
    const clampedIndex = Math.max(0, Math.min(newIndex, maxIndex));
    
    setCurrentIndex(clampedIndex);
    scrollContainerRef.current.scrollTo({
      left: clampedIndex * itemWidth,
      behavior: 'smooth'
    });
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  const handleMouseLeave = () => {
    handleEnd();
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  // Navigation buttons
  const goToPrevious = () => {
    const newIndex = Math.max(0, currentIndex - 1);
    setCurrentIndex(newIndex);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: newIndex * itemWidth,
        behavior: 'smooth'
      });
    }
  };

  const goToNext = () => {
    const newIndex = Math.min(maxIndex, currentIndex + 1);
    setCurrentIndex(newIndex);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: newIndex * itemWidth,
        behavior: 'smooth'
      });
    }
  };

  // Update scroll position when currentIndex changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: currentIndex * itemWidth,
        behavior: 'smooth'
      });
    }
  }, [currentIndex, itemWidth]);

  // Get visible songs (only 3 at a time)
  const getVisibleSongs = () => {
    return songs.slice(currentIndex, currentIndex + visibleItems);
  };

  return (
    <div className="h-full p-6 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-white">주변 음악</h3>
          <p className="text-sm text-gray-300">{songs.length}곡 발견</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
              currentIndex === 0
                ? 'bg-gray-800/30 text-gray-600 cursor-not-allowed'
                : 'bg-gray-800/60 text-gray-300 hover:bg-gray-700/60 hover:text-white'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goToNext}
            disabled={currentIndex >= maxIndex}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
              currentIndex >= maxIndex
                ? 'bg-gray-800/30 text-gray-600 cursor-not-allowed'
                : 'bg-gray-800/60 text-gray-300 hover:bg-gray-700/60 hover:text-white'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Songs Container - Only show 3 songs */}
      <div className="flex-1 flex items-center">
        <div
          ref={containerRef}
          className="relative overflow-hidden w-full"
        >
          <div
            ref={scrollContainerRef}
            className="flex space-x-4 overflow-x-hidden cursor-grab active:cursor-grabbing select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {getVisibleSongs().map((song, index) => (
              <div
                key={song.id}
                className="flex-shrink-0 group cursor-pointer"
                style={{ width: `${100/3}%` }}
                onClick={() => !isDragging && onSongSelect(song)}
              >
                {/* Album Cover */}
                <div className="relative mb-3">
                  <div className="w-20 h-20 mx-auto rounded-xl overflow-hidden border-2 border-cyan-400/40 group-hover:border-cyan-400 transition-all duration-300 group-hover:scale-105 shadow-lg bg-gray-800">
                    <img 
                      src={song.cover} 
                      alt={song.title}
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                  </div>
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/60 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 mx-auto w-20">
                    <Play className="w-5 h-5 text-white ml-0.5" />
                  </div>

                  {/* Pulse Effect */}
                  <div className="absolute inset-0 bg-cyan-400/20 rounded-xl animate-pulse -z-10 group-hover:bg-cyan-400/30 mx-auto w-20"></div>
                  
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-xl blur-md -z-20 group-hover:from-cyan-400/20 group-hover:to-blue-400/20 transition-all duration-300 mx-auto w-20"></div>
                </div>

                {/* Song Info */}
                <div className="text-center px-2">
                  <h4 className="text-xs font-semibold text-white truncate group-hover:text-cyan-400 transition-colors duration-200">
                    {song.title}
                  </h4>
                  <p className="text-xs text-gray-300 truncate mt-0.5">
                    {song.artist}
                  </p>
                  <div className="flex items-center justify-center space-x-1 mt-1">
                    <span className="text-xs text-gray-400">
                      {song.plays > 1000 ? `${Math.floor(song.plays / 1000)}k` : song.plays}
                    </span>
                  </div>
                </div>

                {/* Comment Preview */}
                {song.comment && (
                  <div className="mt-2 text-xs text-gray-400 text-center truncate px-2">
                    "{song.comment.length > 20 ? song.comment.substring(0, 20) + '...' : song.comment}"
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="flex justify-center space-x-1 mt-4">
        {Array.from({ length: Math.ceil(songs.length / visibleItems) }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index * visibleItems)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
              Math.floor(currentIndex / visibleItems) === index
                ? 'bg-cyan-400 w-4'
                : 'bg-gray-500 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HorizontalMusicDial;