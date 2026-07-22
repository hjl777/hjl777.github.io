import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// For GitHub Pages: set VITE_BASE="/<repo>/" when deploying to a project page.
// For a user/organization page, leave it unset (defaults to "/").
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    base: env.VITE_BASE || '/',
    define: {
      // Baked into the bundle so the footer's "Last updated" reflects the
      // deploy date, not the visitor's clock. Pinned to KST so UTC build
      // runners (GitHub Actions) don't stamp the previous day.
      __BUILD_DATE__: JSON.stringify(
        new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Seoul' }),
      ),
    },
  };
});
