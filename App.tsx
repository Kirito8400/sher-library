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
      <div className="min-h-screen bg-mystic-900 text-mystic-light font-ui transition-colors duration-200">
        <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.05),transparent_70%)] z-0"></div>
        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/library" element={<Library />} />
            <Route path="/create" element={<AIPoet />} />
            <Route path="/shayari/:id" element={<ShayariDetail />} />
          </Routes>
        </div>
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