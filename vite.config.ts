import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// For GitHub Pages: set VITE_BASE="/<repo>/" when deploying to a project page.
// For a user/organization page, leave it unset (defaults to "/").
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    base: env.VITE_BASE || '/',
  };
});
