import React, { useState } from 'react';
import { X, Play, Heart, UserPlus, MessageCircle, MapPin, ArrowUpDown } from 'lucide-react';
import { Location, Song } from '../App';

interface LocationModalProps {
  location: Location;
  onClose: () => void;
  onSongSelect: (song: Song) => void;
  onLikeSong: (songId: string) => void;
}

type SortType = 'latest' | 'likes' | 'plays';

const LocationModal: React.FC<LocationModalProps> = ({
  location,
  onClose,
  onSongSelect,
  onLikeSong
}) => {
  const [sortType, setSortType] = useState<SortType>('latest');

  const sortedSongs = [...location.songs].sort((a, b) => {
    switch (sortType) {
      case 'likes':
        return b.plays - a.plays; // Using plays as proxy for likes for now
      case 'plays':
        return b.plays - a.plays;
      case 'latest':
      default:
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    }
  });

  const getSortLabel = (type: SortType) => {
    switch (type) {
      case 'likes': return '좋아요순';
      case 'plays': return '재생순';
      case 'latest': return '최신순';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end">
      <div className="w-full bg-gray-900 rounded-t-3xl max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gray-900 border-b border-gray-700 p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-semibold">{location.address}</h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Sort Options */}
          <div className="flex items-center space-x-2">
            <ArrowUpDown className="w-4 h-4 text-gray-400" />
            <div className="flex space-x-2">
              {(['latest', 'likes', 'plays'] as SortType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setSortType(type)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                    sortType === type
                      ? 'bg-cyan-400 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {getSortLabel(type)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Songs List */}
        <div className="p-4 space-y-4">
          <div className="text-sm text-gray-400 mb-4">
            {location.songs.length}개의 노래가 드랍되어 있습니다
          </div>
          
          {sortedSongs.map((song, index) => (
            <div
              key={song.id}
              className="bg-gray-800/50 rounded-xl p-4 border border-gray-700"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-lg overflow-hidden">
                    <img 
                      src={song.cover} 
                      alt={song.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {sortType !== 'latest' && index < 3 && (
                    <div className="absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-xs font-bold text-white">
                      {index + 1}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white">{song.title}</h3>
                  <p className="text-sm text-gray-400">{song.artist}</p>
                  <div className="flex items-center space-x-3 mt-1 text-xs text-gray-500">
                    <span>재생 {song.plays.toLocaleString()}회</span>
                    <span>•</span>
                    <span>{song.timestamp}</span>
                  </div>
                </div>
                <button
                  onClick={() => onSongSelect(song)}
                  className="w-10 h-10 rounded-full bg-cyan-400 flex items-center justify-center hover:bg-cyan-500 transition-colors duration-200"
                >
                  <Play className="w-5 h-5 text-white ml-1" />
                </button>
              </div>

              {/* Song Comment */}
              {song.comment && (
                <div className="bg-gray-700/50 rounded-lg p-3 mb-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <MessageCircle className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs text-gray-400">@{song.droppedBy}</span>
                  </div>
                  <p className="text-sm text-gray-300">{song.comment}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => onLikeSong(song.id)}
                    className={`flex items-center space-x-1 text-sm ${
                      song.liked ? 'text-red-400' : 'text-gray-400'
                    } hover:text-red-400 transition-colors duration-200`}
                  >
                    <Heart className={`w-4 h-4 ${song.liked ? 'fill-current' : ''}`} />
                    <span>{song.plays}</span>
                  </button>
                  <button className="flex items-center space-x-1 text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-200">
                    <UserPlus className="w-4 h-4" />
                    <span>팔로우</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationModal;