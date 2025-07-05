import React from 'react';
import { Settings, MapPin, Heart, Users, Music, Calendar } from 'lucide-react';
import { User } from '../App';

interface ProfilePageProps {
  user: User;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user }) => {
  const recentActivity = [
    {
      id: '1',
      type: 'drop',
      title: '좋아의 꿈',
      artist: 'AKMU(악동뮤지션)',
      location: '구로구 구로동',
      likes: 32,
      time: '1시간 전'
    },
    {
      id: '2',
      type: 'drop',
      title: '벤치에 앉아서 듣으면 여기가 패리더라이스',
      artist: 'JOSEI',
      location: '성동구 성수동',
      likes: 248,
      time: '2시간 전'
    },
    {
      id: '3',
      type: 'pick',
      title: '한국어',
      artist: 'MIND',
      location: '마포구 홍대',
      likes: 0,
      time: '1일 전'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-cyan-400/20 to-blue-400/20 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold">마이페이지</h1>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors duration-200">
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* User Info */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 flex items-center justify-center">
            <img 
              src={user.avatar} 
              alt={user.username}
              className="w-18 h-18 rounded-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <span className="px-2 py-1 bg-cyan-400/20 rounded-full text-xs text-cyan-400">
                L.{user.level} 스페셜 DJ
              </span>
            </div>
            <h2 className="text-xl font-bold">{user.username}</h2>
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-300">
              <span>전체 24시간</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800/30 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Music className="w-5 h-5 text-cyan-400" />
              <span className="text-sm text-gray-300">드랍</span>
            </div>
            <div className="text-lg font-bold">{user.droppedSongs}곡</div>
          </div>
          <div className="bg-gray-800/30 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Heart className="w-5 h-5 text-red-400" />
              <span className="text-sm text-gray-300">좋아요</span>
            </div>
            <div className="text-lg font-bold">{user.pickedSongs}곡</div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">최근 활동</h3>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="bg-gray-800/50 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-400 flex items-center justify-center">
                  <Music className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium">{activity.title}</span>
                    <span className="text-xs text-gray-400">{activity.artist}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <MapPin className="w-3 h-3" />
                    <span>{activity.location}</span>
                    <Heart className="w-3 h-3" />
                    <span>{activity.likes}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Level Progress */}
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">레벨 진행도</h3>
        <div className="bg-gray-800/50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">L.{user.level} 스페셜 DJ</span>
            <span className="text-sm text-gray-400">다음 레벨까지 2곡</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-gradient-to-r from-cyan-400 to-blue-400 h-2 rounded-full w-3/4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;