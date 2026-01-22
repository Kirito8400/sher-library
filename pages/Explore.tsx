import React, { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { SHAYARIS, CATEGORIES, POETS } from '../constants';
import ShayariCard from '../components/ShayariCard';
import { useSearchParams } from 'react-router-dom';

const Explore: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  
  const initialCategory = searchParams.get('category');
  const initialPoet = searchParams.get('poet');

  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);
  const [selectedPoet, setSelectedPoet] = useState<string | null>(initialPoet);

  const filteredShayaris = useMemo(() => {
    return SHAYARIS.filter(item => {
      const matchesSearch = item.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory ? item.category.includes(selectedCategory) : true;
      const matchesPoet = selectedPoet ? item.poetId === selectedPoet : true;
      return matchesSearch && matchesCategory && matchesPoet;
    });
  }, [searchTerm, selectedCategory, selectedPoet]);

  return (
    <div className="pb-24 pt-6 px-4 max-w-md mx-auto min-h-screen">
      <div className="sticky top-0 bg-paper dark:bg-zinc-900 z-10 pb-4 pt-2">
         <h1 className="text-2xl font-english font-bold mb-4 dark:text-white">Explore Library</h1>
         
         {/* Search Input */}
         <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" size={18} />
            <input 
              type="text" 
              placeholder="Search shayaris, poets, or words..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
            />
         </div>

         {/* Filters */}
         <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            <button 
              onClick={() => { setSelectedCategory(null); setSelectedPoet(null); }}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-medium border transition-colors ${!selectedCategory && !selectedPoet ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-transparent' : 'bg-transparent border-zinc-300 dark:border-zinc-600 text-zinc-600 dark:text-zinc-300'}`}
            >
              All
            </button>
            {CATEGORIES.map(cat => (
              <button 
                key={cat.id}
                onClick={() => { setSelectedCategory(cat.id === selectedCategory ? null : cat.id); setSelectedPoet(null); }}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-medium border transition-colors ${selectedCategory === cat.id ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-transparent' : 'bg-transparent border-zinc-300 dark:border-zinc-600 text-zinc-600 dark:text-zinc-300'}`}
              >
                {cat.label}
              </button>
            ))}
         </div>
      </div>

      <div className="space-y-4 mt-2">
        {filteredShayaris.length > 0 ? (
          filteredShayaris.map(s => <ShayariCard key={s.id} shayari={s} />)
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
             <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                <Search className="text-zinc-400" size={24} />
             </div>
             <p className="text-zinc-500 font-medium">No poetry found</p>
             <p className="text-zinc-400 text-sm mt-1">Try searching for something else</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
