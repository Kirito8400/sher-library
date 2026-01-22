import React, { useMemo } from 'react';
import { SHAYARIS, CATEGORIES, POETS } from '../constants';
import ShayariCard from '../components/ShayariCard';
import { Sparkles, TrendingUp, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  // Mock "Shayari of the Day" logic
  const dailyShayari = useMemo(() => SHAYARIS[0], []);
  const trendingShayaris = useMemo(() => SHAYARIS.slice(1, 3), []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="pb-24 pt-8 px-4 max-w-md mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium uppercase tracking-wider">{getGreeting()}</p>
          <h1 className="text-3xl font-english font-bold text-zinc-900 dark:text-white">Discover Verse</h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
           <span className="font-bold text-lg">R</span>
        </div>
      </div>

      {/* Daily Pick */}
      <section>
        <div className="flex items-center space-x-2 mb-4 text-primary-600 dark:text-primary-400">
          <Sparkles size={18} />
          <h2 className="text-sm font-bold uppercase tracking-wide">Shayari of the Day</h2>
        </div>
        <ShayariCard shayari={dailyShayari} />
      </section>

      {/* Categories Horizontal Scroll */}
      <section>
        <div className="flex justify-between items-end mb-4">
           <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Categories</h2>
           <Link to="/explore" className="text-sm text-primary-600 dark:text-primary-400 hover:underline">View All</Link>
        </div>
        <div className="flex space-x-4 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4">
          {CATEGORIES.map(cat => (
            <Link key={cat.id} to={`/explore?category=${cat.id}`} className="flex-shrink-0">
              <div className="w-24 h-24 bg-white dark:bg-zinc-800 rounded-2xl flex flex-col items-center justify-center space-y-2 border border-zinc-100 dark:border-zinc-700 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-xs font-medium text-zinc-600 dark:text-zinc-300">{cat.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending */}
      <section>
        <div className="flex items-center space-x-2 mb-4 text-zinc-500 dark:text-zinc-400">
          <TrendingUp size={18} />
          <h2 className="text-sm font-bold uppercase tracking-wide">Trending Now</h2>
        </div>
        <div className="space-y-4">
          {trendingShayaris.map(s => (
            <ShayariCard key={s.id} shayari={s} />
          ))}
        </div>
      </section>

      {/* Featured Poets */}
      <section>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Masters of Verse</h2>
        <div className="grid grid-cols-4 gap-4">
           {POETS.slice(0,4).map(poet => (
             <Link key={poet.id} to={`/explore?poet=${poet.id}`} className="flex flex-col items-center space-y-2">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary-100 dark:border-primary-900 p-0.5">
                  <img src={poet.avatar} alt={poet.name} className="w-full h-full rounded-full object-cover" />
                </div>
                <span className="text-xs text-center font-medium text-zinc-600 dark:text-zinc-300 line-clamp-1">{poet.name}</span>
             </Link>
           ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
