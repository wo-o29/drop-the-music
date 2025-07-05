import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Heart, Plus, UserPlus, MessageCircle } from 'lucide-react';
import { Song } from '../App';

interface MusicPlayerProps {
  song: Song;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onLike: () => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({
  song,
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
  onLike
}) => {
  return (
    <div className="fixed bottom-20 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-700 p-4">
      {/* Song Info */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-12 h-12 rounded-lg overflow-hidden">
          <img 
            src={song.cover} 
            alt={song.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-white text-sm">{song.title}</h3>
          <p className="text-xs text-gray-400">{song.artist}</p>
        </div>
        <div className="text-xs text-gray-500">{song.duration}</div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-700 rounded-full h-1 mb-4">
        <div className="bg-cyan-400 h-1 rounded-full w-1/3"></div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center space-x-6 mb-4">
        <button
          onClick={onPrevious}
          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors duration-200"
        >
          <SkipBack className="w-5 h-5" />
        </button>
        <button
          onClick={onPlayPause}
          className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full flex items-center justify-center hover:from-cyan-500 hover:to-blue-500 transition-all duration-200"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-white" />
          ) : (
            <Play className="w-6 h-6 text-white ml-1" />
          )}
        </button>
        <button
          onClick={onNext}
          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors duration-200"
        >
          <SkipForward className="w-5 h-5" />
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center space-x-8">
        <button
          onClick={onLike}
          className={`flex flex-col items-center space-y-1 ${
            song.liked ? 'text-red-400' : 'text-gray-400'
          } hover:text-red-400 transition-colors duration-200`}
        >
          <Heart className={`w-5 h-5 ${song.liked ? 'fill-current' : ''}`} />
          <span className="text-xs">좋아요</span>
        </button>
        <button className="flex flex-col items-center space-y-1 text-gray-400 hover:text-cyan-400 transition-colors duration-200">
          <Plus className="w-5 h-5" />
          <span className="text-xs">리스트</span>
        </button>
        <button className="flex flex-col items-center space-y-1 text-gray-400 hover:text-cyan-400 transition-colors duration-200">
          <UserPlus className="w-5 h-5" />
          <span className="text-xs">팔로우</span>
        </button>
      </div>

      {/* Song Comment */}
      {song.comment && (
        <div className="mt-4 bg-gray-800/50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <MessageCircle className="w-4 h-4 text-cyan-400" />
            <span className="text-xs text-gray-400">@{song.droppedBy}</span>
          </div>
          <p className="text-sm text-gray-300">{song.comment}</p>
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;