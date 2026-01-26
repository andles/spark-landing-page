import { useState } from 'react';
import { ChevronDown, Palette, Sparkles, Layers } from 'lucide-react';
import { useTheme, type ThemeVariant } from '../context/ThemeContext';

const themes: { id: ThemeVariant; name: string; icon: typeof Palette; description: string }[] = [
  { id: 'classic', name: 'Classic', icon: Layers, description: 'Current design' },
  { id: 'nextgen', name: 'Next Gen', icon: Sparkles, description: 'Ultra modern' },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  
  const currentTheme = themes.find(t => t.id === theme) || themes[0];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-full shadow-2xl hover:bg-slate-800 transition-all border border-slate-700"
        >
          <Palette className="w-4 h-4" />
          <span className="text-sm font-medium">{currentTheme.name}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isOpen && (
          <div className="absolute bottom-full right-0 mb-2 bg-slate-900 rounded-xl shadow-2xl border border-slate-700 overflow-hidden min-w-[200px]">
            <div className="p-2 border-b border-slate-700">
              <p className="text-xs text-slate-400 font-medium px-2">Theme Variant</p>
            </div>
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setTheme(t.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-800 transition-colors ${
                  theme === t.id ? 'bg-slate-800' : ''
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  theme === t.id ? 'bg-primary' : 'bg-slate-700'
                }`}>
                  <t.icon className={`w-4 h-4 ${theme === t.id ? 'text-white' : 'text-slate-400'}`} />
                </div>
                <div className="text-left">
                  <p className={`text-sm font-medium ${theme === t.id ? 'text-white' : 'text-slate-300'}`}>
                    {t.name}
                  </p>
                  <p className="text-xs text-slate-500">{t.description}</p>
                </div>
                {theme === t.id && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-primary" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
