import React, { useState } from 'react';
import { Sparkles, Loader2, RefreshCw } from 'lucide-react';
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
        alert("Failed to generate poetry. Please try again.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="pb-24 pt-8 px-4 max-w-md mx-auto min-h-screen">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-tr from-primary-500 to-purple-600 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-primary-500/30">
            <Sparkles className="text-white" size={32} />
        </div>
        <h1 className="text-2xl font-english font-bold dark:text-white">AI Poet Muse</h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-2">Describe a feeling, and I will write a verse for you.</p>
      </div>

      <div className="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-700 mb-6">
        <div className="space-y-4">
            <div>
                <label className="text-xs font-bold uppercase text-zinc-400 mb-2 block">I want to write about...</label>
                <textarea 
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                    placeholder="e.g., The rain in Lahore, Missing an old friend, The silence of the night..."
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 h-24 resize-none dark:text-white"
                />
            </div>
            
            <div>
                <label className="text-xs font-bold uppercase text-zinc-400 mb-2 block">Language</label>
                <div className="flex gap-2">
                    {['Urdu', 'Hindi', 'English'].map(lang => (
                        <button
                            key={lang}
                            onClick={() => setLanguage(lang)}
                            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${language === lang ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300'}`}
                        >
                            {lang}
                        </button>
                    ))}
                </div>
            </div>

            <button 
                onClick={handleGenerate}
                disabled={loading || !mood}
                className="w-full bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary-500/20"
            >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
                <span>{loading ? 'Composing...' : 'Generate Verse'}</span>
            </button>
        </div>
      </div>

      {result && (
        <div className="animate-in fade-in slide-in-from-bottom duration-500">
            <div className="bg-paper dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 p-8 rounded-2xl text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-50"></div>
                
                <span className="inline-block px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-[10px] font-bold uppercase tracking-wider mb-4">
                    {result.style} Style
                </span>
                
                <p className="font-urdu text-xl md:text-2xl leading-loose text-zinc-800 dark:text-zinc-100 whitespace-pre-line mb-6">
                    {result.content}
                </p>

                {result.translation && (
                    <div className="border-t border-zinc-200 dark:border-zinc-700 pt-4">
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm italic font-english">
                            "{result.translation}"
                        </p>
                    </div>
                )}
            </div>
            
            <button 
                onClick={() => setResult(null)}
                className="mx-auto mt-4 text-zinc-400 flex items-center gap-2 text-sm hover:text-zinc-600 dark:hover:text-zinc-200"
            >
                <RefreshCw size={14} /> Create Another
            </button>
        </div>
      )}
    </div>
  );
};

export default AIPoet;
