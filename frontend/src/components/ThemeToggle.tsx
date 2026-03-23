import React from 'react';
import { useTheme } from '../context/ThemeProvider';

export const ThemeToggle: React.FC = () => {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative group p-3 rounded-2xl transition-all duration-500
        glass-panel ${resolvedTheme === 'light' ? 'glass-light' : 'glass-dark'}
        hover:scale-110 active:scale-95
        w-12 h-12 flex items-center justify-center
        overflow-hidden
      `}
      aria-label="Toggle Theme"
    >
      <div className="relative w-6 h-6 flex items-center justify-center">
        {/* Sun Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={`
            w-10 h-10 absolute transition-all duration-700 ease-in-out
            ${resolvedTheme === 'dark' ? 'translate-y-12 opacity-0 rotate-[120deg]' : 'translate-y-0 opacity-100 rotate-0'}
            text-amber-500
          `}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M3 12h2.25m.386-6.364l1.591 1.591M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
          />
        </svg>

        {/* Moon Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={`
            w-10 h-10 absolute transition-all duration-700 ease-in-out
            ${resolvedTheme === 'light' ? '-translate-y-12 opacity-0 -rotate-45' : 'translate-y-0 opacity-100 rotate-0'}
            text-blue-400
          `}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
          />
        </svg>
      </div>

      <span className="sr-only">Toggle Theme</span>
    </button>
  );
};
