import { profile } from '../data';

export default function Footer() {
  return (
    <footer className="border-t border-ink-300 dark:border-ink-700">
      <div className="container-prose py-16 sm:py-24">
        <p className="section-kicker">{profile.role.split('—')[0].trim()}</p>
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="font-serif text-5xl font-medium leading-none tracking-[-0.04em] text-ink-900 sm:text-7xl dark:text-ink-50">
              {profile.nameKr} · {profile.name}
            </p>
          </div>
          <a
            href={`mailto:${profile.email}`}
            className="border-b border-clinic-500 pb-2 text-sm font-medium text-clinic-700 md:col-span-4 dark:text-clinic-300"
          >
            {profile.email}
          </a>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-ink-200 pt-6 text-xs text-ink-500 sm:flex-row sm:items-center dark:border-ink-800 dark:text-ink-400">
          <p>© {new Date().getFullYear()} {profile.name}. React, Vite & Tailwind.</p>
          <p className="font-mono">Last updated {__BUILD_DATE__}</p>
        </div>
      </div>
    </footer>
  );
}
