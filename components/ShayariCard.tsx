import React, { useState } from 'react';
import { Heart, Copy, Share2 } from 'lucide-react';
import { Shayari } from '../types';
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
    alert('Inscribed to clipboard!');
  };

  return (
    <Link to={`/shayari/${shayari.id}`} className="block group">
      <div className="relative bg-scroll-gradient rounded-xl p-6 border border-mystic-gold/20 shadow-lg transition-all duration-300 hover:shadow-glow-gold hover:border-mystic-gold/40 hover:-translate-y-1">
        {/* Decorative Corners */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-mystic-gold/40 rounded-tl-lg"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-mystic-gold/40 rounded-tr-lg"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-mystic-gold/40 rounded-bl-lg"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-mystic-gold/40 rounded-br-lg"></div>

        <div className="absolute top-4 right-4 opacity-50">
            <span className="text-[10px] text-mystic-gold border border-mystic-gold/30 px-2 py-0.5 rounded-full uppercase tracking-wider">{shayari.category[0]}</span>
        </div>
        
        <div className="mb-6 mt-4 relative">
          <p className="font-urdu text-xl md:text-2xl leading-[2.2] text-center text-mystic-light drop-shadow-sm whitespace-pre-line">
            {shayari.content}
          </p>
        </div>

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-mystic-gold/10">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-full p-0.5 bg-gradient-to-tr from-mystic-gold to-mystic-600">
                <img 
                  src={poet?.avatar} 
                  alt={poet?.name} 
                  className="w-full h-full rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
            <div className="flex flex-col">
               <span className="text-sm font-english font-semibold text-mystic-gold tracking-wide">{poet?.name}</span>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <button 
              onClick={handleToggleLike}
              className={`p-2 rounded-full transition-all duration-300 ${isLiked ? 'text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'text-mystic-dim hover:text-mystic-light'}`}
            >
              <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
            </button>
            <button 
              onClick={handleCopy}
              className="p-2 rounded-full text-mystic-dim hover:text-mystic-gold transition-colors"
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