import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SHAYARIS, POETS } from '../constants';
import { storageService } from '../services/storageService';
import { ArrowLeft, Share2, Heart, Type, Settings, Download, X, Sparkles } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import html2canvas from 'html2canvas';

const ShayariDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [shayari, setShayari] = useState(SHAYARIS.find(s => s.id === id));
  const [poet, setPoet] = useState(POETS.find(p => p.id === shayari?.poetId));
  const [fontSize, setFontSize] = useState<number>(24);
  const [showSettings, setShowSettings] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [loadingExplain, setLoadingExplain] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  
  // Theme state for reading
  const [themeColor, setThemeColor] = useState<'light' | 'dark' | 'sepia'>('light');

  useEffect(() => {
    if (id && shayari) {
      storageService.addToHistory(id);
      setIsLiked(storageService.isFavorite(id));
    }
  }, [id, shayari]);

  if (!shayari || !poet) return <div className="p-8 text-center">Shayari not found</div>;

  const toggleLike = () => {
    storageService.toggleFavorite(shayari.id);
    setIsLiked(!isLiked);
  };

  const handleExplain = async () => {
    if (explanation) return;
    setLoadingExplain(true);
    try {
        const text = await geminiService.explainShayari(shayari.content);
        setExplanation(text);
    } catch (e) {
        alert('Failed to get explanation');
    } finally {
        setLoadingExplain(false);
    }
  };

  const captureAndShare = async () => {
    const element = document.getElementById('share-card');
    if (!element) return;
    try {
        const canvas = await html2canvas(element, { scale: 2 });
        const image = canvas.toDataURL("image/png");
        
        // Mobile share
        if (navigator.share) {
            const blob = await (await fetch(image)).blob();
            const file = new File([blob], "shayari.png", { type: "image/png" });
            await navigator.share({
                files: [file],
                title: 'Share Shayari',
            });
        } else {
            // Fallback download
            const link = document.createElement('a');
            link.href = image;
            link.download = `shayari-${shayari.id}.png`;
            link.click();
        }
        setShowShareModal(false);
    } catch (err) {
        console.error(err);
    }
  };

  const themeClasses = {
      light: 'bg-white text-zinc-900',
      dark: 'bg-zinc-900 text-zinc-100',
      sepia: 'bg-[#f4ecd8] text-[#5b4636]'
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${themeClasses[themeColor]}`}>
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 z-10">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10">
          <ArrowLeft size={24} />
        </button>
        <div className="flex space-x-2">
           <button onClick={() => setShowSettings(!showSettings)} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10">
             <Type size={24} />
           </button>
           <button onClick={() => setShowShareModal(true)} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10">
             <Share2 size={24} />
           </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="absolute top-16 right-4 w-64 bg-white dark:bg-zinc-800 rounded-2xl shadow-xl border border-zinc-100 dark:border-zinc-700 p-4 z-20">
            <h3 className="text-xs font-bold uppercase text-zinc-400 mb-3">Reading Preferences</h3>
            
            <div className="mb-4">
                <label className="text-sm font-medium mb-2 block dark:text-zinc-300">Size</label>
                <input 
                    type="range" 
                    min="18" 
                    max="48" 
                    value={fontSize} 
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="w-full accent-primary-500"
                />
            </div>

            <div>
                <label className="text-sm font-medium mb-2 block dark:text-zinc-300">Theme</label>
                <div className="flex space-x-2">
                    <button onClick={() => setThemeColor('light')} className="w-8 h-8 rounded-full bg-white border border-zinc-300 shadow-sm"></button>
                    <button onClick={() => setThemeColor('sepia')} className="w-8 h-8 rounded-full bg-[#f4ecd8] border border-[#e0d6b6] shadow-sm"></button>
                    <button onClick={() => setThemeColor('dark')} className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-700 shadow-sm"></button>
                </div>
            </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-2xl mx-auto">
         <div className="mb-12">
            <p 
                style={{ fontSize: `${fontSize}px`, lineHeight: 1.8 }} 
                className="font-urdu font-medium whitespace-pre-line leading-loose transition-all duration-200"
            >
                {shayari.content}
            </p>
         </div>
         
         <div className="flex flex-col items-center space-y-2">
             <img src={poet.avatar} alt={poet.name} className="w-16 h-16 rounded-full border-4 border-current opacity-20" />
             <h2 className="text-lg font-semibold opacity-70">{poet.name}</h2>
             <span className="text-xs uppercase tracking-widest opacity-50">{poet.period} Period</span>
         </div>
      </div>

      {/* Action Bar */}
      <div className="p-8 pb-12 flex justify-center space-x-8">
         <button 
            onClick={toggleLike}
            className={`flex flex-col items-center space-y-1 ${isLiked ? 'text-red-500' : 'opacity-50 hover:opacity-100'}`}
        >
            <Heart size={28} fill={isLiked ? "currentColor" : "none"} />
            <span className="text-xs">Like</span>
         </button>
         
         <button 
            onClick={handleExplain}
            disabled={loadingExplain}
            className={`flex flex-col items-center space-y-1 ${explanation ? 'text-primary-500' : 'opacity-50 hover:opacity-100'}`}
        >
            <Sparkles size={28} className={loadingExplain ? 'animate-pulse' : ''} />
            <span className="text-xs">Meaning</span>
         </button>
      </div>

      {/* Explanation Modal */}
      {explanation && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
              <div className="bg-white dark:bg-zinc-800 w-full max-w-md rounded-3xl p-6 relative animate-in slide-in-from-bottom duration-300">
                  <button onClick={() => setExplanation(null)} className="absolute top-4 right-4 p-2 opacity-50 hover:opacity-100">
                      <X size={20} className="dark:text-white" />
                  </button>
                  <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-primary-600 dark:text-primary-400">
                      <Sparkles size={18} /> AI Explanation
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-sm">
                      {explanation}
                  </p>
              </div>
          </div>
      )}

      {/* Share Modal / Card Generator */}
      {showShareModal && (
          <div className="fixed inset-0 bg-black/80 z-50 flex flex-col items-center justify-center p-4">
              <div className="bg-white dark:bg-zinc-900 rounded-3xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
                  <div className="p-4 border-b dark:border-zinc-700 flex justify-between items-center">
                      <h3 className="font-bold dark:text-white">Share Card</h3>
                      <button onClick={() => setShowShareModal(false)}><X size={24} className="dark:text-white" /></button>
                  </div>
                  
                  <div className="flex-1 overflow-auto p-6 bg-zinc-100 dark:bg-black flex items-center justify-center">
                      {/* The Capture Area */}
                      <div 
                        id="share-card" 
                        className="w-[300px] h-[400px] bg-gradient-to-br from-primary-500 to-purple-800 p-8 flex flex-col items-center justify-center text-center relative shadow-2xl"
                      >
                          <div className="absolute inset-0 bg-black/20"></div>
                          <div className="relative z-10 text-white">
                              <p className="font-urdu text-xl mb-6 leading-loose">{shayari.content}</p>
                              <div className="w-12 h-0.5 bg-white/50 mx-auto mb-4"></div>
                              <p className="font-english uppercase tracking-widest text-sm">{poet.name}</p>
                          </div>
                          <div className="absolute bottom-4 text-[10px] text-white/40 uppercase tracking-widest">
                              RekhtaVerse App
                          </div>
                      </div>
                  </div>

                  <div className="p-4 border-t dark:border-zinc-700">
                      <button 
                        onClick={captureAndShare}
                        className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2"
                      >
                          <Share2 size={18} /> Share Image
                      </button>
                  </div>
              </div>
          </div>
      )}

    </div>
  );
};

export default ShayariDetail;
