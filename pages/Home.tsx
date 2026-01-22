import React, { useMemo } from 'react';
import { SHAYARIS, CATEGORIES, POETS } from '../constants';
import ShayariCard from '../components/ShayariCard';
import { Sparkles, TrendingUp, Feather } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const dailyShayari = useMemo(() => SHAYARIS[0], []);
  const trendingShayaris = useMemo(() => SHAYARIS.slice(1, 3), []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Dawn\'s Light';
    if (hour < 18) return 'Midday Sun';
    return 'Evening Star';
  };

  return (
    <div className="pb-32 pt-10 px-5 max-w-md mx-auto space-y-10">
      {/* Mystical Header */}
      <div className="flex justify-between items-end border-b border-mystic-gold/20 pb-4">
        <div>
          <p className="text-mystic-gold/70 text-xs font-bold uppercase tracking-[0.2em] mb-1">{getGreeting()}</p>
          <h1 className="text-3xl font-english font-bold text-mystic-light tracking-tight">
            The Golden <span className="text-mystic-gold">Scroll</span>
          </h1>
        </div>
        <div className="w-10 h-10 rounded-full border border-mystic-gold/30 flex items-center justify-center text-mystic-gold shadow-glow-gold">
           <Feather size={20} />
        </div>
      </div>

      {/* Daily Pick - Featured Glow */}
      <section className="relative">
        <div className="flex items-center space-x-2 mb-4 text-mystic-gold">
          <Sparkles size={16} />
          <h2 className="text-xs font-bold uppercase tracking-[0.15em]">Verse of the Day</h2>
        </div>
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-mystic-gold/5 blur-2xl rounded-full transform scale-90 translate-y-4"></div>
        <div className="relative">
          <ShayariCard shayari={dailyShayari} />
        </div>
      </section>

      {/* Categories - Runes/Symbols style */}
      <section>
        <div className="flex justify-between items-end mb-5">
           <h2 className="text-lg font-english text-mystic-light">Realms</h2>
           <Link to="/explore" className="text-xs text-mystic-gold/80 hover:text-mystic-gold tracking-widest uppercase">View All</Link>
        </div>
        <div className="flex space-x-4 overflow-x-auto pb-6 no-scrollbar -mx-5 px-5">
          {CATEGORIES.map(cat => (
            <Link key={cat.id} to={`/explore?category=${cat.id}`} className="flex-shrink-0 group">
              <div className="w-20 h-24 bg-mystic-800 rounded-full border border-mystic-gold/20 flex flex-col items-center justify-center space-y-3 transition-all duration-300 group-hover:border-mystic-gold group-hover:shadow-glow-gold">
                <span className="text-2xl filter drop-shadow-lg group-hover:scale-110 transition-transform">{cat.icon}</span>
                <span className="text-[10px] font-bold text-mystic-dim group-hover:text-mystic-light tracking-wider uppercase">{cat.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending */}
      <section>
        <div className="flex items-center space-x-2 mb-5 text-mystic-dim">
          <TrendingUp size={16} />
          <h2 className="text-xs font-bold uppercase tracking-[0.15em]">Echoing Now</h2>
        </div>
        <div className="space-y-6">
          {trendingShayaris.map(s => (
            <ShayariCard key={s.id} shayari={s} />
          ))}
        </div>
      </section>

      {/* Featured Poets - Medallion Style */}
      <section>
        <h2 className="text-lg font-english text-mystic-light mb-6 text-center">Masters of the Craft</h2>
        <div className="grid grid-cols-4 gap-4">
           {POETS.slice(0,4).map(poet => (
             <Link key={poet.id} to={`/explore?poet=${poet.id}`} className="flex flex-col items-center space-y-3 group">
                <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-b from-mystic-gold/50 to-transparent group-hover:from-mystic-gold transition-all duration-500">
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-mystic-900">
                    <img src={poet.avatar} alt={poet.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  </div>
                </div>
                <span className="text-[10px] text-center font-bold text-mystic-dim group-hover:text-mystic-gold tracking-widest uppercase line-clamp-1">{poet.name}</span>
             </Link>
           ))}
        </div>
      </section>
    </div>
  );
};

export default Home;