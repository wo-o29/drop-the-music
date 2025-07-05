import React, { useState } from 'react';
import { Search, Play, Plus, MapPin } from 'lucide-react';
import { Song } from '../App';

interface DropPageProps {
  onSongSelect: (song: Song) => void;
}

const DropPage: React.FC<DropPageProps> = ({ onSongSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const tags = ['(여자)아이들', '여름', 'Spicy', 'Aespa', '뉴진스', '스파이시', '클래식', '여행', '버스커버지', '쇼핑'];

  const searchResults: Song[] = [
    {
      id: '1',
      title: 'Can\'t Control Myself',
      artist: 'Taeyeon',
      album: 'INVU',
      cover: 'https://images.pexels.com/photos/6505089/pexels-photo-6505089.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
      duration: '3:21',
      liked: false,
      plays: 1200,
      droppedBy: 'musiclover',
      location: '홍대',
      timestamp: '2시간 전'
    },
    {
      id: '2',
      title: 'Can\'t Control Myself',
      artist: 'Taeyeon',
      album: 'INVU',
      cover: 'https://images.pexels.com/photos/6505089/pexels-photo-6505089.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
      duration: '3:21',
      liked: false,
      plays: 1200,
      droppedBy: 'musiclover',
      location: '홍대',
      timestamp: '2시간 전'
    },
    {
      id: '3',
      title: 'Can\'t Control Myself',
      artist: 'We Are Not',
      album: 'INVU',
      cover: 'https://images.pexels.com/photos/6505089/pexels-photo-6505089.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
      duration: '3:21',
      liked: false,
      plays: 1200,
      droppedBy: 'musiclover',
      location: '홍대',
      timestamp: '2시간 전'
    },
    {
      id: '4',
      title: 'Can\'t Control Myself',
      artist: 'IlyEl BicRby',
      album: 'INVU',
      cover: 'https://images.pexels.com/photos/6505089/pexels-photo-6505089.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
      duration: '3:21',
      liked: false,
      plays: 1200,
      droppedBy: 'musiclover',
      location: '홍대',
      timestamp: '2시간 전'
    },
    {
      id: '5',
      title: 'Can\'t Control Myself',
      artist: 'David the Singer',
      album: 'INVU',
      cover: 'https://images.pexels.com/photos/6505089/pexels-photo-6505089.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
      duration: '3:21',
      liked: false,
      plays: 1200,
      droppedBy: 'musiclover',
      location: '홍대',
      timestamp: '2시간 전'
    }
  ];

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleDropSong = (song: Song) => {
    // This would handle dropping the song at current location
    console.log('Dropping song:', song.title);
    // Show success message or navigate back to map
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">드랍하고 싶은 음악을</h1>
        <h2 className="text-2xl font-bold mb-6">검색해 보세요</h2>
        <p className="text-gray-400 text-sm mb-6">
          Search for and select the music you want to drop.
        </p>
      </div>

      {/* Current Location Info */}
      <div className="bg-gray-800/50 rounded-lg p-4 mb-6 border border-gray-700">
        <div className="flex items-center space-x-2 mb-2">
          <MapPin className="w-5 h-5 text-cyan-400" />
          <span className="text-sm font-medium">드랍 위치</span>
        </div>
        <div className="text-sm text-gray-300">서울특별시 강남구 역삼동</div>
        <div className="text-xs text-gray-400 mt-1">현재 위치에 음악을 드랍합니다</div>
      </div>

      {/* Search Input */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="드랍할 음악 검색"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-gray-800 text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 border border-gray-700"
        />
      </div>

      {/* Tags */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">최근 검색어</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagToggle(tag)}
              className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                selectedTags.includes(tag)
                  ? 'bg-cyan-400 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Mood Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">지금 이 순간에</h3>
        <p className="text-sm text-gray-400 mb-4">
          드랍하고 싶은 음악을 무엇인가요?
        </p>
        <div className="flex flex-wrap gap-2">
          {['Aespa', '뉴진스', 'Spicy'].map((mood) => (
            <button
              key={mood}
              className="px-4 py-2 bg-cyan-400 text-white rounded-full text-sm hover:bg-cyan-500 transition-colors duration-200"
            >
              {mood}
            </button>
          ))}
        </div>
      </div>

      {/* Additional Tags */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {['빨간길', '여름', '버스커버지', '클래식', '여행', 'Hot summer', '(여자)아이들'].map((tag) => (
            <button
              key={tag}
              className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm hover:bg-gray-700 transition-colors duration-200"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Search Results */}
      {searchQuery && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">검색 결과</h3>
          {searchResults.map((song) => (
            <div
              key={song.id}
              className="bg-gray-800/50 rounded-lg p-4 flex items-center space-x-3"
            >
              <div className="w-12 h-12 rounded-lg overflow-hidden">
                <img 
                  src={song.cover} 
                  alt={song.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">{song.title}</h4>
                <p className="text-sm text-gray-400">{song.artist}</p>
              </div>
              <div className="text-sm text-gray-400">
                {song.duration}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onSongSelect(song)}
                  className="w-8 h-8 rounded-full bg-cyan-400 flex items-center justify-center hover:bg-cyan-500 transition-colors duration-200"
                >
                  <Play className="w-4 h-4 text-white ml-0.5" />
                </button>
                <button 
                  onClick={() => handleDropSong(song)}
                  className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 flex items-center justify-center hover:from-cyan-500 hover:to-blue-500 transition-colors duration-200"
                >
                  <Plus className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropPage;