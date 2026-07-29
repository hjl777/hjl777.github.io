/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        serif: ['"Source Serif 4"', '"Source Serif Pro"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        // Warm charcoal / greige "ink" — replaces the cold Tailwind slate so
        // body text (ink-800) and the dark page background (ink-950) share the
        // same warm temperature as the editorial beige/black surfaces.
        ink: {
          50: '#f8f5ee',
          100: '#efeade',
          200: '#e2dccd',
          300: '#cbc3b0',
          400: '#aba28f',
          500: '#857c6b',
          600: '#625b4e',
          700: '#453f36',
          800: '#2b2721',
          900: '#1a1712',
          950: '#11110f',
        },
        // Warm ivory page background.
        paper: '#f2efe6',
        // Accent — burgundy / plum, chosen to sit with the warm ivory + black
        // system and the photographic backgrounds. Anchored so clinic-700 is
        // the light-mode accent (#6a3f4d) and clinic-300 the dark-mode accent
        // (#b77c8d), matching the clinic-700/dark:clinic-300 usage pattern.
        clinic: {
          50: '#f8eef1',
          100: '#f0dae1',
          200: '#dcb0bf',
          300: '#b77c8d',
          400: '#a06378',
          500: '#8a4f64',
          600: '#7a4657',
          700: '#6a3f4d',
          800: '#4e2d38',
          900: '#3a222b',
          950: '#241419',
        },
        // Legacy accent name still used across components — aliased onto the
        // burgundy scale so a single palette governs the whole site.
        indigo: {
          50: '#f8eef1',
          100: '#f0dae1',
          200: '#dcb0bf',
          300: '#b77c8d',
          400: '#a06378',
          500: '#8a4f64',
          600: '#7a4657',
          700: '#6a3f4d',
          800: '#4e2d38',
          900: '#3a222b',
          950: '#241419',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
          },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-up': 'fadeUp 0.7s ease-out',
        'word-rise': 'wordRise 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        wordRise: {
          '0%': { opacity: '0', transform: 'translateY(100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
