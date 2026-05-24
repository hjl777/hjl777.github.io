import { profile } from '../data';

export default function Footer() {
  return (
    <footer className="border-t border-ink-200 bg-white">
      <div className="container-prose flex flex-col items-start justify-between gap-3 py-8 text-xs text-ink-500 sm:flex-row sm:items-center">
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
