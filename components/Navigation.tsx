import React from 'react';
import { Home, Compass, BookOpen, PenTool, LayoutGrid } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/explore', icon: Compass, label: 'Explore' },
    { path: '/create', icon: PenTool, label: 'AI Poet' },
    { path: '/library', icon: BookOpen, label: 'Library' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-zinc-900/95 backdrop-blur-md border-t border-zinc-200 dark:border-zinc-800 pb-safe pt-2 px-6 z-50 h-[88px]">
      <div className="flex justify-between items-center max-w-md mx-auto h-full pb-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center space-y-1 w-16 transition-colors duration-200 ${
              isActive(item.path)
                ? 'text-primary-600 dark:text-primary-500'
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            <item.icon size={24} strokeWidth={isActive(item.path) ? 2.5 : 2} />
            <span className="text-[10px] font-medium tracking-wide">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
