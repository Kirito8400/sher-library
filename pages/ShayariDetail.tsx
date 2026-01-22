import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SHAYARIS, POETS } from '../constants';
import { storageService } from '../services/storageService';
import { ArrowLeft, Share2, Heart, Sparkles, X, Feather } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import html2canvas from 'html2canvas';

const ShayariDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [shayari, setShayari] = useState(SHAYARIS.find(s => s.id === id));
  const [poet, setPoet] = useState(POETS.find(p => p.id === shayari?.poetId));
  const [isLiked, setIsLiked] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [loadingExplain, setLoadingExplain] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    if (id && shayari) {
      storageService.addToHistory(id);
      setIsLiked(storageService.isFavorite(id));
    }
  }, [id, shayari]);

  if (!shayari || !poet) return <div className="p-8 text-center text-mystic-dim">Verse not found in the archives.</div>;

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
        alert('The Oracle is silent.');
    } finally {
        setLoadingExplain(false);
    }
  };

  const captureAndShare = async () => {
    const element = document.getElementById('share-card');
    if (!element) return;
    try {
        const canvas = await html2canvas(element, { 
            scale: 2,
            backgroundColor: null
        });
        const image = canvas.toDataURL("image/png");
        
        if (navigator.share) {
            const blob = await (await fetch(image)).blob();
            const file = new File([blob], "mystic-verse.png", { type: "image/png" });
            await navigator.share({
                files: [file],
                title: 'Mystic Verse',
            });
        } else {
            const link = document.createElement('a');
            link.href = image;
            link.download = `mystic-verse-${shayari.id}.png`;
            link.click();
        }
        setShowShareModal(false);
    } catch (err) {
        console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-mystic-900">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-mystic-gold/5 to-transparent pointer-events-none"></div>

      {/* Top Bar */}
      <div className="flex items-center justify-between p-6 z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full text-mystic-dim hover:text-mystic-light hover:bg-mystic-gold/5 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div className="flex space-x-2">
           <button onClick={() => setShowShareModal(true)} className="p-2 rounded-full text-mystic-dim hover:text-mystic-light hover:bg-mystic-gold/5 transition-colors">
             <Share2 size={24} />
           </button>
        </div>
      </div>

      {/* Main Content - The Scroll */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-2xl mx-auto z-10 w-full">
         <div className="relative w-full py-16 px-8 bg-gradient-to-b from-mystic-800 to-mystic-900 border-y border-mystic-gold/30">
            {/* Ornamental Dividers */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-mystic-gold/20">
                <Feather size={20} className="rotate-90" />
            </div>

            <p className="font-urdu text-2xl md:text-4xl leading-[2.2] text-mystic-light whitespace-pre-line drop-shadow-md">
                {shayari.content}
            </p>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-mystic-gold/20">
                <Feather size={20} className="-rotate-90" />
            </div>
         </div>
         
         <div className="mt-12 flex flex-col items-center space-y-3">
             <div className="p-1 rounded-full border border-mystic-gold/30">
                <img src={poet.avatar} alt={poet.name} className="w-14 h-14 rounded-full grayscale hover:grayscale-0 transition-all duration-700" />
             </div>
             <div>
                <h2 className="text-xl font-english text-mystic-gold">{poet.name}</h2>
                <span className="text-[10px] uppercase tracking-[0.2em] text-mystic-dim">{poet.period} Era</span>
             </div>
         </div>
      </div>

      {/* Action Bar */}
      <div className="p-10 pb-16 flex justify-center space-x-12 z-10">
         <button 
            onClick={toggleLike}
            className={`flex flex-col items-center space-y-2 group transition-all duration-300 ${isLiked ? 'text-red-500 scale-110' : 'text-mystic-dim hover:text-mystic-light'}`}
        >
            <div className={`p-3 rounded-full border ${isLiked ? 'border-red-500/50 bg-red-500/10 shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'border-mystic-dim/30 group-hover:border-mystic-light/50'}`}>
                <Heart size={24} fill={isLiked ? "currentColor" : "none"} />
            </div>
            <span className="text-[10px] uppercase tracking-widest font-bold">Cherish</span>
         </button>
         
         <button 
            onClick={handleExplain}
            disabled={loadingExplain}
            className={`flex flex-col items-center space-y-2 group transition-all duration-300 ${explanation ? 'text-mystic-magic' : 'text-mystic-dim hover:text-mystic-magic'}`}
        >
            <div className={`p-3 rounded-full border ${loadingExplain ? 'animate-pulse border-mystic-magic/50' : 'border-mystic-dim/30 group-hover:border-mystic-magic/50 group-hover:shadow-glow-magic'}`}>
                <Sparkles size={24} />
            </div>
            <span className="text-[10px] uppercase tracking-widest font-bold">Divinate</span>
         </button>
      </div>

      {/* Explanation Modal */}
      {explanation && (
          <div className="fixed inset-0 bg-mystic-950/90 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
              <div className="bg-mystic-800 w-full max-w-md rounded-2xl p-8 relative border border-mystic-magic/30 shadow-glow-magic animate-in slide-in-from-bottom duration-500">
                  <button onClick={() => setExplanation(null)} className="absolute top-4 right-4 p-2 text-mystic-dim hover:text-mystic-light">
                      <X size={20} />
                  </button>
                  <h3 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2 text-mystic-magic">
                      <Sparkles size={16} /> Oracle's Insight
                  </h3>
                  <p className="text-mystic-light leading-relaxed font-english text-lg italic opacity-90">
                      "{explanation}"
                  </p>
              </div>
          </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
          <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-4">
              <div className="bg-mystic-900 rounded-3xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh] border border-mystic-gold/20">
                  <div className="p-4 border-b border-mystic-gold/10 flex justify-between items-center">
                      <h3 className="font-bold text-mystic-gold">Share Scroll</h3>
                      <button onClick={() => setShowShareModal(false)}><X size={24} className="text-mystic-dim" /></button>
                  </div>
                  
                  <div className="flex-1 overflow-auto p-8 bg-mystic-950 flex items-center justify-center">
                      {/* Capture Area */}
                      <div 
                        id="share-card" 
                        className="w-[300px] h-[450px] bg-mystic-800 p-8 flex flex-col items-center justify-center text-center relative border border-mystic-gold/40 shadow-2xl"
                        style={{
                            backgroundImage: 'radial-gradient(circle at center, #2e241d 0%, #1c1612 100%)'
                        }}
                      >
                          {/* Decorative corners for share card */}
                          <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-mystic-gold"></div>
                          <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-mystic-gold"></div>
                          <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-mystic-gold"></div>
                          <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-mystic-gold"></div>

                          <div className="relative z-10 text-mystic-light">
                              <Sparkles size={16} className="text-mystic-gold mx-auto mb-6 opacity-50" />
                              <p className="font-urdu text-xl mb-8 leading-[2.5] text-mystic-light">{shayari.content}</p>
                              <div className="w-8 h-px bg-mystic-gold/50 mx-auto mb-4"></div>
                              <p className="font-english uppercase tracking-[0.2em] text-xs text-mystic-gold">{poet.name}</p>
                          </div>
                      </div>
                  </div>

                  <div className="p-4 border-t border-mystic-gold/10">
                      <button 
                        onClick={captureAndShare}
                        className="w-full bg-mystic-gold hover:bg-yellow-600 text-mystic-950 py-3 rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"
                      >
                          <Share2 size={18} /> Inscribe & Share
                      </button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default ShayariDetail;