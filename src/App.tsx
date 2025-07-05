import React, { useState, useEffect } from 'react';
import { Music, MapPin, User, Search, Heart, Plus, Users, Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import MapView from './components/MapView';
import MusicPlayer from './components/MusicPlayer';
import ProfilePage from './components/ProfilePage';
import DropPage from './components/DropPage';
import Navigation from './components/Navigation';
import HorizontalMusicDial from './components/HorizontalMusicDial';

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
    location: '강남구 역삼동',
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
    location: '강남구 역삼동',
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
    location: '강남구 역삼동',
    comment: '붐비는 역삼에 딱 맞는 비트',
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

// Additional songs for other locations
const additionalSongs: Song[] = [
  {
    id: '9',
    title: 'NewJeans',
    artist: 'NewJeans',
    album: 'Get Up',
    cover: 'https://images.pexels.com/photos/6505089/pexels-photo-6505089.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
    duration: '2:48',
    liked: false,
    plays: 5200,
    droppedBy: 'newjeans_fan',
    location: '홍대입구역',
    comment: '홍대 거리를 걸으며 듣기 좋은 노래',
    timestamp: '3시간 전'
  },
  {
    id: '10',
    title: 'Hype Boy',
    artist: 'NewJeans',
    album: 'NewJeans',
    cover: 'https://images.pexels.com/photos/6505089/pexels-photo-6505089.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
    duration: '2:59',
    liked: true,
    plays: 4800,
    droppedBy: 'street_musician',
    location: '홍대입구역',
    comment: '젊음이 느껴지는 홍대의 밤',
    timestamp: '2시간 전'
  },
  {
    id: '11',
    title: 'Dynamite',
    artist: 'BTS',
    album: 'BE',
    cover: 'https://images.pexels.com/photos/6505089/pexels-photo-6505089.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
    duration: '3:19',
    liked: false,
    plays: 8900,
    droppedBy: 'army_forever',
    location: '명동역',
    comment: '명동의 활기찬 에너지',
    timestamp: '4시간 전'
  },
  {
    id: '12',
    title: 'Butter',
    artist: 'BTS',
    album: 'Butter',
    cover: 'https://images.pexels.com/photos/6505089/pexels-photo-6505089.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
    duration: '2:44',
    liked: true,
    plays: 7200,
    droppedBy: 'tourist_guide',
    location: '명동역',
    comment: '관광객들이 가장 좋아하는 노래',
    timestamp: '1시간 전'
  },
  {
    id: '13',
    title: 'Next Level',
    artist: 'aespa',
    album: 'Savage',
    cover: 'https://images.pexels.com/photos/6505089/pexels-photo-6505089.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
    duration: '3:30',
    liked: false,
    plays: 3400,
    droppedBy: 'gangnam_style',
    location: '강남역',
    comment: '강남의 미래적인 느낌',
    timestamp: '2시간 전'
  },
  {
    id: '14',
    title: 'Savage',
    artist: 'aespa',
    album: 'Savage',
    cover: 'https://images.pexels.com/photos/6505089/pexels-photo-6505089.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
    duration: '3:58',
    liked: true,
    plays: 2900,
    droppedBy: 'tech_worker',
    location: '강남역',
    comment: '테크 기업들이 모인 강남답게',
    timestamp: '5시간 전'
  },
  {
    id: '15',
    title: 'Spring Day',
    artist: 'BTS',
    album: 'You Never Walk Alone',
    cover: 'https://images.pexels.com/photos/6505089/pexels-photo-6505089.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
    duration: '3:48',
    liked: false,
    plays: 6100,
    droppedBy: 'hangang_walker',
    location: '한강공원',
    comment: '한강을 바라보며 듣는 봄날',
    timestamp: '6시간 전'
  },
  {
    id: '16',
    title: 'Through the Night',
    artist: 'IU',
    album: 'Palette',
    cover: 'https://images.pexels.com/photos/6505089/pexels-photo-6505089.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
    duration: '3:42',
    liked: true,
    plays: 4500,
    droppedBy: 'night_rider',
    location: '한강공원',
    comment: '밤 한강의 로맨틱한 분위기',
    timestamp: '3시간 전'
  },
  {
    id: '17',
    title: 'Lilac',
    artist: 'IU',
    album: 'Lilac',
    cover: 'https://images.pexels.com/photos/6505089/pexels-photo-6505089.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
    duration: '3:20',
    liked: false,
    plays: 3800,
    droppedBy: 'itaewon_local',
    location: '이태원역',
    comment: '다국적 문화가 어우러진 이태원',
    timestamp: '4시간 전'
  },
  {
    id: '18',
    title: 'Celebrity',
    artist: 'IU',
    album: 'Celebrity',
    cover: 'https://images.pexels.com/photos/6505089/pexels-photo-6505089.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
    duration: '3:15',
    liked: true,
    plays: 5600,
    droppedBy: 'fashion_lover',
    location: '이태원역',
    comment: '세련된 이태원의 밤',
    timestamp: '2시간 전'
  }
];

const sampleLocations: Location[] = [
  {
    id: '1',
    lat: 37.5665,
    lng: 126.9780,
    songs: [additionalSongs[2], additionalSongs[3]], // 명동역 - BTS songs
    address: '서울특별시 중구 명동'
  },
  {
    id: '2',
    lat: 37.5559,
    lng: 126.9239,
    songs: [additionalSongs[0], additionalSongs[1]], // 홍대입구역 - NewJeans songs
    address: '서울특별시 마포구 홍대'
  },
  {
    id: '3',
    lat: 37.5172,
    lng: 127.0473,
    songs: sampleSongs, // 역삼동 - 모든 8곡 (가장 가까운 위치)
    address: '서울특별시 강남구 역삼동'
  },
  {
    id: '4',
    lat: 37.4979,
    lng: 127.0276,
    songs: [additionalSongs[4], additionalSongs[5]], // 강남역 - aespa songs
    address: '서울특별시 강남구 강남역'
  },
  {
    id: '5',
    lat: 37.5219,
    lng: 126.9707,
    songs: [additionalSongs[6], additionalSongs[7]], // 한강공원 - BTS & IU songs
    address: '서울특별시 용산구 한강공원'
  },
  {
    id: '6',
    lat: 37.5344,
    lng: 126.9794,
    songs: [additionalSongs[8], additionalSongs[9]], // 이태원역 - IU songs
    address: '서울특별시 용산구 이태원역'
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

  // Get nearby songs from the closest location (역삼동 - location with id '3')
  const getNearbyLocation = () => {
    return locations.find(location => location.id === '3');
  };

  const nearbyLocation = getNearbyLocation();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Map Area - Takes remaining space */}
        <div className="flex-1 relative">
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
            <div className="h-full overflow-y-auto">
              <ProfilePage user={currentUser} />
            </div>
          )}
          {currentPage === 'drop' && (
            <div className="h-full overflow-y-auto">
              <DropPage onSongSelect={handleSongSelect} />
            </div>
          )}
        </div>

        {/* Music Dial Area - Fixed height, only visible on map page */}
        {currentPage === 'map' && nearbyLocation && (
          <div className="h-40 bg-gray-900/95 backdrop-blur-sm border-t border-gray-700/50">
            <HorizontalMusicDial
              songs={nearbyLocation.songs}
              onSongSelect={handleSongSelect}
            />
          </div>
        )}

        {/* Music Player - Overlay when song is playing */}
        {currentSong && (
          <div className="absolute bottom-16 left-0 right-0">
            <MusicPlayer
              song={currentSong}
              isPlaying={isPlaying}
              onPlayPause={() => setIsPlaying(!isPlaying)}
              onNext={() => console.log('Next song')}
              onPrevious={() => console.log('Previous song')}
              onLike={() => handleLikeSong(currentSong.id)}
            />
          </div>
        )}
      </div>

      {/* Navigation Tab Area - Fixed at bottom */}
      <div className="h-16">
        <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      </div>
    </div>
  );
}

export default App;