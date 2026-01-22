import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Library from './pages/Library';
import ShayariDetail from './pages/ShayariDetail';
import AIPoet from './pages/AIPoet';

// Wrapper to hide bottom nav on detail pages for immersive experience
const AppContent: React.FC = () => {
  const location = useLocation();
  const hideNav = location.pathname.includes('/shayari/');

  return (
    <>
      <div className="min-h-screen bg-paper dark:bg-zinc-900 text-ink dark:text-zinc-100 font-ui transition-colors duration-200">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/library" element={<Library />} />
          <Route path="/create" element={<AIPoet />} />
          <Route path="/shayari/:id" element={<ShayariDetail />} />
        </Routes>
      </div>
      {!hideNav && <Navigation />}
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
