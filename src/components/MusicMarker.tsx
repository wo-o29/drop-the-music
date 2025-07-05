import React from 'react';
import { Music } from 'lucide-react';
import { Location } from '../App';

interface MusicMarkerProps {
  location: Location;
  onClick: () => void;
}

const MusicMarker: React.FC<MusicMarkerProps> = ({ location, onClick }) => {
  const songCount = location.songs.length;
  
  // Fixed positions for demo - in real app these would be based on actual coordinates
  const positions = {
    '1': { top: '35%', left: '25%' },
    '2': { top: '55%', left: '65%' },
    '3': { top: '25%', left: '75%' }
  };
  
  const position = positions[location.id as keyof typeof positions] || { top: '50%', left: '50%' };

  const renderMarkerContent = () => {
    if (songCount === 1) {
      // Single song - show album cover
      return (
        <div className="relative group">
          <div className="w-12 h-12 rounded-full overflow-hidden border-3 border-cyan-400 shadow-lg transform transition-all duration-200 group-hover:scale-110">
            <img 
              src={location.songs[0].cover} 
              alt={location.songs[0].title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -inset-1 bg-cyan-400/20 rounded-full animate-pulse"></div>
        </div>
      );
    } else {
      // Multiple songs - show count
      const displayCount = songCount >= 10 ? '9+' : songCount.toString();
      return (
        <div className="relative group">
          <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full flex items-center justify-center shadow-lg border-3 border-white transform transition-all duration-200 group-hover:scale-110">
            <Music className="w-6 h-6 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-white shadow-md">
            {displayCount}
          </div>
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full animate-pulse"></div>
        </div>
      );
    }
  };

  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
      style={position}
      onClick={onClick}
    >
      {renderMarkerContent()}
      
      {/* Tooltip */}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-800/95 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-gray-600 shadow-lg">
        <div className="font-medium">{location.address}</div>
        <div className="text-gray-300">{songCount}곡 드랍됨</div>
        {songCount === 1 && (
          <div className="text-cyan-400 text-xs mt-1">{location.songs[0].title}</div>
        )}
        {/* Tooltip arrow */}
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45 border-l border-t border-gray-600"></div>
      </div>
    </div>
  );
};

export default MusicMarker;