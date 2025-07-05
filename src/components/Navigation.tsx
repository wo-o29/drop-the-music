import React from 'react';
import { MapPin, User, Plus } from 'lucide-react';

interface NavigationProps {
  currentPage: 'map' | 'profile' | 'drop';
  onPageChange: (page: 'map' | 'profile' | 'drop') => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onPageChange }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-700">
      <div className="flex items-center justify-around py-3">
        <button
          onClick={() => onPageChange('map')}
          className={`flex flex-col items-center space-y-1 px-4 py-2 rounded-lg transition-colors duration-200 ${
            currentPage === 'map'
              ? 'text-cyan-400 bg-cyan-400/10'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <MapPin className="w-6 h-6" />
          <span className="text-xs">지도</span>
        </button>
        
        <button
          onClick={() => onPageChange('drop')}
          className={`flex flex-col items-center space-y-1 px-4 py-2 rounded-lg transition-colors duration-200 ${
            currentPage === 'drop'
              ? 'text-cyan-400 bg-cyan-400/10'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Plus className="w-6 h-6" />
          <span className="text-xs">드랍</span>
        </button>
        
        <button
          onClick={() => onPageChange('profile')}
          className={`flex flex-col items-center space-y-1 px-4 py-2 rounded-lg transition-colors duration-200 ${
            currentPage === 'profile'
              ? 'text-cyan-400 bg-cyan-400/10'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <User className="w-6 h-6" />
          <span className="text-xs">내 정보</span>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;