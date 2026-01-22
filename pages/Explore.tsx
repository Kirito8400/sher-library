import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { SHAYARIS, CATEGORIES } from '../constants';
import ShayariCard from '../components/ShayariCard';
import { useSearchParams } from 'react-router-dom';

const Explore: React.FC = () => {
  const [searchParams] = useSearchParams();
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
    <div className="pb-32 pt-8 px-5 max-w-md mx-auto min-h-screen">
      <div className="sticky top-0 bg-mystic-900/95 backdrop-blur-md z-20 pb-6 pt-2 -mx-5 px-5 border-b border-mystic-gold/10">
         <h1 className="text-2xl font-english font-bold mb-6 text-mystic-light">Archives</h1>
         
         {/* Search Input */}
         <div className="relative mb-6 group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-mystic-gold/20 to-mystic-600/20 rounded-xl blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-mystic-gold/50" size={18} />
                <input 
                  type="text" 
                  placeholder="Search the scrolls..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-mystic-950 border border-mystic-gold/20 rounded-xl py-3.5 pl-11 pr-4 text-sm text-mystic-light placeholder-mystic-700 focus:outline-none focus:border-mystic-gold/50 transition-colors shadow-inner-gold"
                />
            </div>
         </div>

         {/* Filters */}
         <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            <button 
              onClick={() => { setSelectedCategory(null); setSelectedPoet(null); }}
              className={`whitespace-nowrap px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all ${!selectedCategory && !selectedPoet ? 'bg-mystic-gold text-mystic-950 border-mystic-gold shadow-glow-gold' : 'bg-transparent border-mystic-gold/20 text-mystic-dim hover:border-mystic-gold/50'}`}
            >
              All
            </button>
            {CATEGORIES.map(cat => (
              <button 
                key={cat.id}
                onClick={() => { setSelectedCategory(cat.id === selectedCategory ? null : cat.id); setSelectedPoet(null); }}
                className={`whitespace-nowrap px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all ${selectedCategory === cat.id ? 'bg-mystic-gold text-mystic-950 border-mystic-gold shadow-glow-gold' : 'bg-transparent border-mystic-gold/20 text-mystic-dim hover:border-mystic-gold/50'}`}
              >
                {cat.label}
              </button>
            ))}
         </div>
      </div>

      <div className="space-y-6 mt-6">
        {filteredShayaris.length > 0 ? (
          filteredShayaris.map(s => <ShayariCard key={s.id} shayari={s} />)
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center opacity-50">
             <div className="w-16 h-16 border border-mystic-gold/30 rounded-full flex items-center justify-center mb-4">
                <Search className="text-mystic-gold" size={24} />
             </div>
             <p className="text-mystic-light font-english text-lg">The scroll is blank</p>
             <p className="text-mystic-dim text-sm mt-1">Try a different query</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;