import React, { useState } from 'react';
import { Sparkles, Loader2, RefreshCw, Wand2 } from 'lucide-react';
import { geminiService } from '../services/geminiService';

const AIPoet: React.FC = () => {
  const [mood, setMood] = useState('');
  const [language, setLanguage] = useState('Urdu');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ content: string; translation?: string; style?: string } | null>(null);

  const handleGenerate = async () => {
    if (!mood.trim()) return;
    setLoading(true);
    setResult(null);
    try {
        const data = await geminiService.generateShayari(mood, language);
        setResult(data);
    } catch (e) {
        alert("The magic faded. Please try again.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="pb-32 pt-10 px-5 max-w-md mx-auto min-h-screen">
      <div className="text-center mb-10 relative">
        <div className="absolute inset-0 bg-mystic-magic/20 blur-[50px] -z-10 rounded-full transform scale-50"></div>
        <div className="w-16 h-16 border border-mystic-magic/50 rounded-full mx-auto flex items-center justify-center mb-5 shadow-glow-magic bg-mystic-900/50 backdrop-blur-sm">
            <Wand2 className="text-mystic-magic" size={32} />
        </div>
        <h1 className="text-2xl font-english font-bold text-mystic-light">The Oracle</h1>
        <p className="text-mystic-dim text-xs uppercase tracking-widest mt-2">Whisper your thoughts to the void</p>
      </div>

      <div className="bg-mystic-800/50 backdrop-blur-sm p-6 rounded-2xl border border-mystic-magic/20 mb-8 relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-mystic-magic/20 to-purple-500/20 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        <div className="relative space-y-6">
            <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-mystic-magic mb-3 block">Essence</label>
                <textarea 
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                    placeholder="Describe the feeling (e.g., The rain falling on an empty street...)"
                    className="w-full bg-mystic-950 border border-mystic-magic/20 rounded-xl p-4 text-sm text-mystic-light placeholder-mystic-700 focus:outline-none focus:border-mystic-magic/50 focus:shadow-glow-magic h-32 resize-none transition-all"
                />
            </div>
            
            <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-mystic-magic mb-3 block">Tongue</label>
                <div className="flex gap-2">
                    {['Urdu', 'Hindi', 'English'].map(lang => (
                        <button
                            key={lang}
                            onClick={() => setLanguage(lang)}
                            className={`flex-1 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${language === lang ? 'bg-mystic-magic text-mystic-950 shadow-glow-magic' : 'bg-mystic-950 text-mystic-dim border border-mystic-magic/10 hover:border-mystic-magic/30'}`}
                        >
                            {lang}
                        </button>
                    ))}
                </div>
            </div>

            <button 
                onClick={handleGenerate}
                disabled={loading || !mood}
                className="w-full bg-gradient-to-r from-mystic-magic to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-mystic-950 font-bold uppercase tracking-widest py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-900/20"
            >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
                <span>{loading ? 'Conjuring...' : 'Manifest Verse'}</span>
            </button>
        </div>
      </div>

      {result && (
        <div className="animate-in fade-in slide-in-from-bottom duration-700">
            <div className="bg-mystic-800 p-8 rounded-xl text-center relative overflow-hidden border border-mystic-magic/30 shadow-glow-magic">
                {/* Magic glow background */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-mystic-magic shadow-[0_0_20px_#00f0ff]"></div>
                
                <span className="inline-block px-3 py-1 rounded-full border border-mystic-magic/30 text-mystic-magic text-[10px] font-bold uppercase tracking-widest mb-6">
                    {result.style}
                </span>
                
                <p className="font-urdu text-xl md:text-2xl leading-[2.2] text-mystic-light whitespace-pre-line mb-8 drop-shadow-md">
                    {result.content}
                </p>

                {result.translation && (
                    <div className="border-t border-mystic-magic/10 pt-6">
                        <p className="text-mystic-dim text-sm italic font-english">
                            "{result.translation}"
                        </p>
                    </div>
                )}
            </div>
            
            <button 
                onClick={() => setResult(null)}
                className="mx-auto mt-6 text-mystic-dim flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-mystic-magic transition-colors"
            >
                <RefreshCw size={14} /> Recast Spell
            </button>
        </div>
      )}
    </div>
  );
};

export default AIPoet;