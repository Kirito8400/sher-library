import React, { useState } from 'react';
import { Heart, Share2, Copy, BookOpen } from 'lucide-react';
import { Shayari, Poet } from '../types';
import { POETS } from '../constants';
import { storageService } from '../services/storageService';
import { Link } from 'react-router-dom';

interface ShayariCardProps {
  shayari: Shayari;
  compact?: boolean;
}

const ShayariCard: React.FC<ShayariCardProps> = ({ shayari, compact = false }) => {
  const [isLiked, setIsLiked] = useState(storageService.isFavorite(shayari.id));
  const poet = POETS.find(p => p.id === shayari.poetId);

  const handleToggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    storageService.toggleFavorite(shayari.id);
    setIsLiked(!isLiked);
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(`${shayari.content}\n\n- ${poet?.name}`);
    alert('Copied to clipboard!');
  };

  return (
    <Link to={`/shayari/${shayari.id}`} className="block">
      <div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 shadow-sm border border-zinc-100 dark:border-zinc-700 hover:shadow-md transition-shadow relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-xs text-zinc-400 bg-zinc-100 dark:bg-zinc-700 px-2 py-1 rounded-full">{shayari.category[0]}</span>
        </div>
        
        <div className="mb-4 mt-2">
          <p className="font-urdu text-xl md:text-2xl leading-loose text-center text-zinc-800 dark:text-zinc-100 whitespace-pre-line">
            {shayari.content}
          </p>
        </div>

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-700">
          <div className="flex items-center space-x-3">
            <img 
              src={poet?.avatar} 
              alt={poet?.name} 
              className="w-8 h-8 rounded-full object-cover border border-zinc-200 dark:border-zinc-600"
            />
            <div className="flex flex-col">
               <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">{poet?.name}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button 
              onClick={handleToggleLike}
              className={`p-2 rounded-full transition-colors ${isLiked ? 'text-red-500 bg-red-50 dark:bg-red-900/20' : 'text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700'}`}
            >
              <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
            </button>
            <button 
              onClick={handleCopy}
              className="p-2 rounded-full text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
            >
              <Copy size={18} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ShayariCard;
