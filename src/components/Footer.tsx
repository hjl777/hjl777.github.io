import { profile } from '../data';

export default function Footer() {
  return (
    <footer className="border-t border-ink-200 bg-white dark:border-ink-800 dark:bg-ink-950">
      <div className="container-prose flex flex-col items-start justify-between gap-3 py-8 text-xs text-ink-500 sm:flex-row sm:items-center dark:text-ink-400">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with React, Vite &
          Tailwind.
        </p>
        <p className="font-mono">
          Last updated {new Date().toLocaleDateString('en-CA')}
        </p>
      </div>
    </footer>
  );
}
