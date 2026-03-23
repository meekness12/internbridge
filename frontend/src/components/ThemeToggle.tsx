import React from 'react';
import { useTheme } from '../context/ThemeProvider';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative p-2.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300 flex items-center justify-center overflow-hidden"
      aria-label="Toggle Theme"
    >
      <div className={`transition-all duration-500 transform ${isDark ? 'rotate-0 scale-100' : 'rotate-90 scale-0 opacity-0'}`}>
        <Sun size={20} className="text-[var(--color-gold)]" />
      </div>
      <div className={`absolute transition-all duration-500 transform ${!isDark ? 'rotate-0 scale-100' : '-rotate-90 scale-0 opacity-0'}`}>
        <Moon size={20} className="text-blue-200" />
      </div>
      <span className="sr-only">Toggle Theme</span>
    </button>
  );
};
