import React, { useState, useEffect } from 'react';
import { SHAYARIS } from '../constants';
import ShayariCard from '../components/ShayariCard';
import { storageService } from '../services/storageService';
import { Heart, Clock } from 'lucide-react';
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
    
    // Filter shayaris that exist in our "database" and match the IDs
    // In a real app, you'd fetch these by ID
    const loadedItems = ids
      .map(id => SHAYARIS.find(s => s.id === id))
      .filter((s): s is Shayari => s !== undefined);
      
    setItems(loadedItems);
  };

  return (
    <div className="pb-24 pt-8 px-4 max-w-md mx-auto min-h-screen">
      <h1 className="text-2xl font-english font-bold mb-6 dark:text-white">My Library</h1>

      <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl mb-6">
        <button
          onClick={() => setActiveTab('favorites')}
          className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'favorites' 
            ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm' 
            : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
          }`}
        >
          <Heart size={16} className={activeTab === 'favorites' ? 'fill-red-500 text-red-500' : ''} />
          <span>Favorites</span>
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'history' 
            ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm' 
            : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
          }`}
        >
          <Clock size={16} />
          <span>History</span>
        </button>
      </div>

      <div className="space-y-4">
        {items.length > 0 ? (
          items.map(s => <ShayariCard key={s.id} shayari={s} />)
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
             <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4 text-zinc-400">
                {activeTab === 'favorites' ? <Heart size={24} /> : <Clock size={24} />}
             </div>
             <p className="text-zinc-500 font-medium">
               {activeTab === 'favorites' ? 'No favorites yet' : 'No reading history'}
             </p>
             <p className="text-zinc-400 text-sm mt-1">
               {activeTab === 'favorites' ? 'Heart shayaris to save them here' : 'Start reading to build history'}
             </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;
