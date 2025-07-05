import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Music, Navigation } from 'lucide-react';
import { Location, Song } from '../App';
import MusicMarker from './MusicMarker';
import LocationModal from './LocationModal';
import HorizontalMusicDial from './HorizontalMusicDial';

interface MapViewProps {
  locations: Location[];
  selectedLocation: Location | null;
  onLocationSelect: (location: Location) => void;
  onSongSelect: (song: Song) => void;
  onLikeSong: (songId: string) => void;
}

const MapView: React.FC<MapViewProps> = ({
  locations,
  selectedLocation,
  onLocationSelect,
  onSongSelect,
  onLikeSong
}) => {
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const mapRef = useRef<HTMLDivElement>(null);

  // Get nearby songs from the closest location (역삼동 - location with id '3')
  const getNearbyLocation = () => {
    return locations.find(location => location.id === '3');
  };

  const handleMarkerClick = (location: Location) => {
    onLocationSelect(location);
    setShowLocationModal(true);
  };

  // Mouse/Touch handlers for map dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - mapPosition.x,
      y: e.clientY - mapPosition.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    setMapPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({
      x: touch.clientX - mapPosition.x,
      y: touch.clientY - mapPosition.y
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const touch = e.touches[0];
    setMapPosition({
      x: touch.clientX - dragStart.x,
      y: touch.clientY - dragStart.y
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const nearbyLocation = getNearbyLocation();
  const totalSongs = locations.reduce((sum, location) => sum + location.songs.length, 0);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Map Container */}
      <div 
        ref={mapRef}
        className="relative w-full h-full bg-gray-900 cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: `translate(${mapPosition.x}px, ${mapPosition.y}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s ease-out'
        }}
      >
        {/* Map Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#374151" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Street Layout */}
        <div className="absolute inset-0">
          {/* Main Streets */}
          <div className="absolute top-1/4 left-0 right-0 h-8 bg-gray-700/30 rounded"></div>
          <div className="absolute top-2/3 left-0 right-0 h-6 bg-gray-700/20 rounded"></div>
          <div className="absolute top-0 bottom-0 left-1/3 w-8 bg-gray-700/30 rounded"></div>
          <div className="absolute top-0 bottom-0 right-1/4 w-6 bg-gray-700/20 rounded"></div>
          
          {/* Smaller Streets */}
          <div className="absolute top-1/2 left-0 right-0 h-3 bg-gray-700/15 rounded"></div>
          <div className="absolute top-0 bottom-0 left-2/3 w-4 bg-gray-700/15 rounded"></div>
        </div>

        {/* Building Blocks */}
        <div className="absolute top-16 left-8 w-24 h-20 bg-gray-800/40 rounded-lg border border-gray-600/30"></div>
        <div className="absolute top-20 right-12 w-32 h-24 bg-gray-800/40 rounded-lg border border-gray-600/30"></div>
        <div className="absolute bottom-32 left-16 w-28 h-22 bg-gray-800/40 rounded-lg border border-gray-600/30"></div>
        <div className="absolute bottom-24 right-20 w-20 h-18 bg-gray-800/40 rounded-lg border border-gray-600/30"></div>
        <div className="absolute top-1/3 left-1/2 w-36 h-28 bg-gray-800/40 rounded-lg border border-gray-600/30"></div>

        {/* Street Names */}
        <div className="absolute top-20 left-4 text-xs text-gray-400 font-medium">
          강남대로
        </div>
        <div className="absolute top-36 right-8 text-xs text-gray-400 font-medium">
          테헤란로
        </div>
        <div className="absolute bottom-36 left-8 text-xs text-gray-400 font-medium">
          선릉로
        </div>
        <div className="absolute top-1/2 left-1/3 transform -rotate-90 text-xs text-gray-400 font-medium">
          역삼로
        </div>

        {/* Landmarks */}
        <div className="absolute top-1/4 right-1/3 text-xs text-gray-500">
          <div className="bg-gray-800/60 rounded px-2 py-1">강남역</div>
        </div>
        <div className="absolute bottom-1/3 left-1/4 text-xs text-gray-500">
          <div className="bg-gray-800/60 rounded px-2 py-1">선릉역</div>
        </div>

        {/* Music Markers */}
        {locations.map((location) => (
          <MusicMarker
            key={location.id}
            location={location}
            onClick={() => handleMarkerClick(location)}
          />
        ))}

        {/* Current Location Indicator - Moved closer to 역삼동 */}
        <div className="absolute top-[45%] left-[70%] transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="relative">
            <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg z-10 relative"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-blue-500/30 rounded-full animate-pulse"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-blue-500/20 rounded-full animate-pulse animation-delay-300"></div>
          </div>
        </div>
      </div>

      {/* Fixed UI Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Location Info - Compact Version */}
        <div className="absolute top-4 left-4 right-4 bg-gray-800/90 backdrop-blur-sm rounded-lg p-3 border border-gray-700 pointer-events-auto">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-medium">강남구 역삼동</span>
              </div>
              <div className="text-xs text-gray-400">
                드랍된 음악 {totalSongs}곡
              </div>
            </div>
            <div className="w-8 h-8 bg-cyan-400/20 rounded-full flex items-center justify-center">
              <Music className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
        </div>

        {/* Compass */}
        <div className="absolute top-4 right-4 w-10 h-10 bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center border border-gray-700 pointer-events-auto">
          <Navigation className="w-5 h-5 text-cyan-400" />
        </div>
      </div>

      {/* Horizontal Music Dial - Always Visible */}
      {nearbyLocation && (
        <HorizontalMusicDial
          songs={nearbyLocation.songs}
          onSongSelect={onSongSelect}
        />
      )}

      {/* Location Modal */}
      {showLocationModal && selectedLocation && (
        <LocationModal
          location={selectedLocation}
          onClose={() => setShowLocationModal(false)}
          onSongSelect={onSongSelect}
          onLikeSong={onLikeSong}
        />
      )}
    </div>
  );
};

export default MapView;