import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

function getInitial(): boolean {
  if (typeof window === 'undefined') return false;
  return document.documentElement.classList.contains('dark');
}

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean>(getInitial);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <button
      type="button"
      onClick={() => setIsDark((v) => !v)}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-600 transition hover:border-ink-300 hover:text-ink-900 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-300 dark:hover:border-ink-600 dark:hover:text-ink-50"
    >
      {isDark ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}
