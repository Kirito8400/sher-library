import React, { useState, useEffect } from 'react';
import { SHAYARIS } from '../constants';
import ShayariCard from '../components/ShayariCard';
import { storageService } from '../services/storageService';
import { Heart, Clock, BookMarked } from 'lucide-react';
import { Shayari } from '../types';

const Library: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'favorites' | 'history'>('favorites');
  const [items, setItems] = useState<Shayari[]>([]);

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = () => {
    let ids: string[] = [];
    if (activeTab === 'favorites') {
      ids = storageService.getFavorites();
    } else {
      ids = storageService.getHistory();
    }
    
    const loadedItems = ids
      .map(id => SHAYARIS.find(s => s.id === id))
      .filter((s): s is Shayari => s !== undefined);
      
    setItems(loadedItems);
  };

  return (
    <div className="pb-32 pt-10 px-5 max-w-md mx-auto min-h-screen">
      <h1 className="text-2xl font-english font-bold mb-8 text-mystic-light">Personal Collection</h1>

      <div className="flex bg-mystic-950 border border-mystic-gold/10 p-1 rounded-xl mb-8 relative overflow-hidden">
        <div className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-mystic-800 rounded-lg shadow-sm transition-transform duration-300 ${activeTab === 'favorites' ? 'translate-x-0' : 'translate-x-[calc(100%+4px)]'}`}></div>
        <button
          onClick={() => setActiveTab('favorites')}
          className={`relative z-10 flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors ${
            activeTab === 'favorites' ? 'text-mystic-gold' : 'text-mystic-dim hover:text-mystic-light'
          }`}
        >
          <Heart size={14} className={activeTab === 'favorites' ? 'fill-current' : ''} />
          <span>Beloved</span>
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`relative z-10 flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors ${
            activeTab === 'history' ? 'text-mystic-gold' : 'text-mystic-dim hover:text-mystic-light'
          }`}
        >
          <Clock size={14} />
          <span>Echoes</span>
        </button>
      </div>

      <div className="space-y-6">
        {items.length > 0 ? (
          items.map(s => <ShayariCard key={s.id} shayari={s} />)
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center opacity-60">
             <div className="w-20 h-20 bg-mystic-800 rounded-full border border-mystic-gold/20 flex items-center justify-center mb-6 shadow-glow-gold">
                {activeTab === 'favorites' ? <BookMarked className="text-mystic-gold" size={32} /> : <Clock className="text-mystic-gold" size={32} />}
             </div>
             <p className="text-mystic-light font-english text-xl">
               {activeTab === 'favorites' ? 'No verses collected' : 'Silence in the void'}
             </p>
             <p className="text-mystic-dim text-sm mt-2 max-w-[200px]">
               {activeTab === 'favorites' ? 'Mark verses as beloved to keep them in your scroll.' : 'Begin your journey through the archives.'}
             </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;