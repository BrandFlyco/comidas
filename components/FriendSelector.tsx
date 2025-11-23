import React from 'react';
import { Friend } from '../types';
import { CheckCircleIcon } from './Icons';

interface FriendSelectorProps {
  friends: Friend[];
  selectedIds: string[];
  toggleFriend: (id: string) => void;
}

const FriendSelector: React.FC<FriendSelectorProps> = ({ friends, selectedIds, toggleFriend }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-slate-800">¿Quiénes vienen?</h2>
        <span className="text-sm font-medium text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
          {selectedIds.length} seleccionados
        </span>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {friends.map((friend) => {
          const isSelected = selectedIds.includes(friend.id);
          // Using notionists style for a clean, sketchy look
          const avatarUrl = `https://api.dicebear.com/9.x/notionists/svg?seed=${friend.name}&backgroundColor=transparent`;

          return (
            <button
              key={friend.id}
              onClick={() => toggleFriend(friend.id)}
              className={`
                relative flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-200 border-2
                ${isSelected 
                  ? 'border-orange-500 bg-orange-50 shadow-md transform scale-[1.02]' 
                  : 'border-slate-200 bg-white hover:border-orange-200 hover:shadow-sm'
                }
              `}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 text-orange-500">
                  <CheckCircleIcon className="w-6 h-6" />
                </div>
              )}
              
              <div className="w-16 h-16 mb-2 overflow-hidden rounded-full bg-slate-100 p-1">
                <img 
                  src={avatarUrl} 
                  alt={friend.name} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              
              <span className={`font-medium ${isSelected ? 'text-orange-900' : 'text-slate-600'}`}>
                {friend.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FriendSelector;
