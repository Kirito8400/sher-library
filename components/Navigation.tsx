import React from 'react';
import { Home, Compass, BookOpen, Sparkles } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/explore', icon: Compass, label: 'Explore' },
    { path: '/create', icon: Sparkles, label: 'Oracle' },
    { path: '/library', icon: BookOpen, label: 'Scrolls' },
  ];

  return (
    <nav className="fixed bottom-4 left-4 right-4 z-50">
      <div className="max-w-md mx-auto bg-mystic-950/80 backdrop-blur-xl border border-mystic-gold/20 rounded-2xl shadow-glow-gold h-[70px] flex items-center justify-between px-6">
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center space-y-1 w-14 transition-all duration-300 ${
                active
                  ? 'text-mystic-gold translate-y-[-4px]'
                  : 'text-mystic-dim hover:text-mystic-light'
              }`}
            >
              <div className={`relative ${active ? 'drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]' : ''}`}>
                <item.icon size={22} strokeWidth={active ? 2.5 : 2} />
                {active && item.label === 'Oracle' && (
                  <div className="absolute inset-0 bg-mystic-magic blur-lg opacity-20"></div>
                )}
              </div>
              <span className={`text-[10px] font-medium tracking-widest uppercase ${active ? 'opacity-100' : 'opacity-0'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;