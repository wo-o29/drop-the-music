import React, { useState, useEffect } from 'react';
import { Music, MapPin, User, Search, Heart, Plus, Users, Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import MapView from './components/MapView';
import MusicPlayer from './components/MusicPlayer';
import ProfilePage from './components/ProfilePage';
import DropPage from './components/DropPage';
import Navigation from './components/Navigation';

export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  cover: string;
  duration: string;
  liked: boolean;
  plays: number;
  droppedBy: string;
  location: string;
  comment?: string;
  timestamp: string;
}

export interface Location {
  id: string;
  lat: number;
  lng: number;
  songs: Song[];
  address: string;
}

export interface User {
  id: string;
  username: string;
  level: number;
  avatar: string;
  followers: number;
  following: number;
  droppedSongs: number;
  pickedSongs: number;
}

const sampleSongs: Song[] = [
  {
    id: '1',
    title: 'Underwater',
    artist: '권은비',
    album: 'Color',
    cover: 'https://images.pexels.com/photos/6505089/pexels-photo-6505089.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
    duration: '3:21',
    liked: false,
    plays: 1200,
    droppedBy: 'musiclover_01',
    location: '강남구 구금동',
    comment: '회사 속 무미건조까지 쫄아당겨~',
    timestamp: '2시간 전'
  },
  {
    id: '2',
    title: 'Can\'t Control Myself',
    artist: 'Taeyeon',
    album: 'INVU',
    cover: 'https://images.pexels.com/photos/6505089/pexels-photo-6505089.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
    duration: '3:45',
    liked: true,
    plays: 2100,
    droppedBy: 'kpop_fan',
    location: '홍대입구역',
    comment: '이 길을 걸을 때마다 생각나는 노래',
    timestamp: '5시간 전'
  },
  {
    id: '3',
    title: 'Spicy',
    artist: 'aespa',
    album: 'MY WORLD',
    cover: 'https://images.pexels.com/photos/6505089/pexels-photo-6505089.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
    duration: '3:12',
    liked: false,
    plays: 3200,
    droppedBy: 'seoul_walker',
    location: '명동역',
    comment: '붐비는 명동에 딱 맞는 비트',
    timestamp: '1일 전'
  },
  {
    id: '4',
    title: 'UN Village',
    artist: '백현',
    album: 'City Lights',
    cover: 'https://images.pexels.com/photos/6505089/pexels-photo-6505089.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
    duration: '3:32',
    liked: false,
    plays: 1800,
    droppedBy: 'city_walker',
    location: '강남구 역삼동',
    comment: '어디서 들어도 한남동으로 만들어주는 노래',
    timestamp: '3시간 전'
  },
  {
    id: '5',
    title: 'Paradise',
    artist: 'millic',
    album: 'Paradise',
    cover: 'https://images.pexels.com/photos/6505089/pexels-photo-6505089.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
    duration: '4:12',
    liked: true,
    plays: 2800,
    droppedBy: 'music_lover',
    location: '강남구 역삼동',
    comment: '천국이 따로 없다',
    timestamp: '1시간 전'
  },
  {
    id: '6',
    title: 'Seven',
    artist: '정국',
    album: 'Seven',
    cover: 'https://images.pexels.com/photos/6505089/pexels-photo-6505089.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
    duration: '3:05',
    liked: false,
    plays: 4200,
    droppedBy: 'bts_army',
    location: '강남구 역삼동',
    comment: '일주일 내내 듣고 싶은 노래',
    timestamp: '30분 전'
  },
  {
    id: '7',
    title: 'LOVE DIVE',
    artist: 'IVE',
    album: 'LOVE DIVE',
    cover: 'https://images.pexels.com/photos/6505089/pexels-photo-6505089.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
    duration: '2:58',
    liked: true,
    plays: 3800,
    droppedBy: 'dive_into_music',
    location: '강남구 역삼동',
    comment: '사랑에 빠져버린 기분',
    timestamp: '45분 전'
  },
  {
    id: '8',
    title: 'After LIKE',
    artist: 'IVE',
    album: 'After LIKE',
    cover: 'https://images.pexels.com/photos/6505089/pexels-photo-6505089.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
    duration: '2:56',
    liked: false,
    plays: 2900,
    droppedBy: 'ive_stan',
    location: '강남구 역삼동',
    comment: '좋아한 다음엔 뭐가 올까?',
    timestamp: '1시간 전'
  }
];

const sampleLocations: Location[] = [
  {
    id: '1',
    lat: 37.5665,
    lng: 126.9780,
    songs: [sampleSongs[0]],
    address: '서울특별시 중구 명동'
  },
  {
    id: '2',
    lat: 37.5595,
    lng: 126.9426,
    songs: [sampleSongs[1], sampleSongs[2]],
    address: '서울특별시 마포구 홍대'
  },
  {
    id: '3',
    lat: 37.5172,
    lng: 127.0473,
    songs: sampleSongs, // 모든 8곡을 역삼동에 배치
    address: '서울특별시 강남구 역삼동'
  }
];

const currentUser: User = {
  id: 'user1',
  username: '친절한 부엉이',
  level: 3,
  avatar: 'https://images.pexels.com/photos/6505089/pexels-photo-6505089.jpeg?auto=compress&cs=tinysrgb&w=150&h=150',
  followers: 248,
  following: 156,
  droppedSongs: 12,
  pickedSongs: 89
};

function App() {
  const [currentPage, setCurrentPage] = useState<'map' | 'profile' | 'drop'>('map');
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [locations, setLocations] = useState<Location[]>(sampleLocations);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const handleSongSelect = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const handleLikeSong = (songId: string) => {
    setLocations(prev => 
      prev.map(location => ({
        ...location,
        songs: location.songs.map(song => 
          song.id === songId ? { ...song, liked: !song.liked } : song
        )
      }))
    );
  };

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800/80 backdrop-blur-sm border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Music className="w-8 h-8 text-cyan-400" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              히히
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-300">
              L.3 스페셜 DJ
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20">
        {currentPage === 'map' && (
          <MapView
            locations={locations}
            selectedLocation={selectedLocation}
            onLocationSelect={handleLocationSelect}
            onSongSelect={handleSongSelect}
            onLikeSong={handleLikeSong}
          />
        )}
        {currentPage === 'profile' && (
          <ProfilePage user={currentUser} />
        )}
        {currentPage === 'drop' && (
          <DropPage onSongSelect={handleSongSelect} />
        )}
      </main>

      {/* Music Player */}
      {currentSong && (
        <MusicPlayer
          song={currentSong}
          isPlaying={isPlaying}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          onNext={() => console.log('Next song')}
          onPrevious={() => console.log('Previous song')}
          onLike={() => handleLikeSong(currentSong.id)}
        />
      )}

      {/* Navigation */}
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
    </div>
  );
}

export default App;