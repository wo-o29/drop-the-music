import React from 'react';
import { Play, X } from 'lucide-react';
import { Song } from '../App';

interface NearbyMusicDialProps {
  songs: Song[];
  onSongSelect: (song: Song) => void;
  onClose: () => void;
  alwaysVisible?: boolean;
}

const NearbyMusicDial: React.FC<NearbyMusicDialProps> = ({
  songs,
  onSongSelect,
  onClose,
  alwaysVisible = false
}) => {
  const centerX = 160;
  const centerY = 160;
  const radius = 120; // 더 큰 반지름으로 8곡을 배치

  const getPositionForIndex = (index: number, total: number) => {
    const angle = (index * 2 * Math.PI) / total - Math.PI / 2; // Start from top
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return { x, y };
  };

  const containerClasses = alwaysVisible 
    ? "relative w-96 h-96 pointer-events-auto" 
    : "absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center pointer-events-auto";

  const dialClasses = alwaysVisible
    ? "w-96 h-96"
    : "w-80 h-80";

  return (
    <div className={containerClasses}>
      <div className={`relative ${dialClasses}`}>
        {/* Background Circle with Gradient */}
        <div className={`absolute inset-0 ${alwaysVisible ? 'bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-900/80' : 'bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95'} rounded-full border-2 border-cyan-400/40 backdrop-blur-sm shadow-2xl`}>
          {/* Center Info */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="text-cyan-400 text-lg font-bold mb-1">주변 음악</div>
            <div className="text-white text-sm mb-2">{songs.length}곡 발견</div>
            <div className="text-xs text-gray-400 mb-3 max-w-32 text-center">어디서 들어도 한남동으로 만들어주는 노래</div>
            {!alwaysVisible && (
              <button
                onClick={onClose}
                className="w-8 h-8 bg-gray-800/80 rounded-full flex items-center justify-center hover:bg-gray-700/80 transition-colors duration-200 border border-gray-600"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>

          {/* Radial Lines */}
          <svg className="absolute inset-0 w-full h-full">
            {songs.map((_, index) => {
              const { x, y } = getPositionForIndex(index, songs.length);
              return (
                <line
                  key={index}
                  x1={centerX}
                  y1={centerY}
                  x2={x}
                  y2={y}
                  stroke="rgba(6, 182, 212, 0.3)"
                  strokeWidth="2"
                  strokeDasharray="4,4"
                />
              );
            })}
            
            {/* Inner circle */}
            <circle
              cx={centerX}
              cy={centerY}
              r="70"
              fill="none"
              stroke="rgba(6, 182, 212, 0.2)"
              strokeWidth="1"
              strokeDasharray="2,2"
            />
            
            {/* Outer circle */}
            <circle
              cx={centerX}
              cy={centerY}
              r={radius}
              fill="none"
              stroke="rgba(6, 182, 212, 0.3)"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* Music Items */}
        {songs.map((song, index) => {
          const { x, y } = getPositionForIndex(index, songs.length);
          return (
            <div
              key={song.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
              style={{ left: x, top: y }}
              onClick={() => onSongSelect(song)}
            >
              {/* Album Cover */}
              <div className="relative">
                <div className="w-16 h-16 rounded-full overflow-hidden border-3 border-cyan-400/60 group-hover:border-cyan-400 transition-all duration-300 group-hover:scale-110 shadow-xl bg-gray-800">
                  <img 
                    src={song.cover} 
                    alt={song.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Play className="w-6 h-6 text-white ml-1" />
                </div>

                {/* Pulse Effect */}
                <div className="absolute inset-0 bg-cyan-400/20 rounded-full animate-pulse -z-10 group-hover:bg-cyan-400/30"></div>
                
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-md -z-20 group-hover:from-cyan-400/20 group-hover:to-blue-400/20 transition-all duration-300"></div>
              </div>

              {/* Song Info Tooltip */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 bg-gray-900/95 backdrop-blur-sm rounded-lg px-4 py-3 text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-gray-600 shadow-xl z-10 min-w-max">
                <div className="font-bold text-center text-cyan-400">{song.title}</div>
                <div className="text-gray-300 text-center mt-1">{song.artist}</div>
                <div className="text-gray-400 text-center mt-1">재생 {song.plays.toLocaleString()}회</div>
                {song.comment && (
                  <div className="text-gray-400 text-center mt-2 max-w-32 text-wrap">"{song.comment}"</div>
                )}
                {/* Tooltip arrow */}
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45 border-l border-t border-gray-600"></div>
              </div>
            </div>
          );
        })}

        {/* Outer Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-blue-400/5 rounded-full blur-2xl -z-10"></div>
      </div>
    </div>
  );
};

export default NearbyMusicDial;