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
        ink: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        // Warm "radiograph paper" page background.
        paper: '#f7f5ef',
        // Clinical accent — segmentation cyan, sampled from the actual QCA
        // analysis overlays rather than a generic brand hue.
        clinic: {
          50: '#edfafb',
          100: '#d2f2f5',
          200: '#a9e6ec',
          300: '#71d4de',
          400: '#35bccb',
          500: '#16a7b7',
          600: '#0d8695',
          700: '#106b78',
          800: '#145762',
          900: '#154954',
          950: '#072e35',
        },
        // Legacy accent name still used across components — aliased onto the
        // clinical cyan so a single palette governs the whole site.
        indigo: {
          50: '#edfafb',
          100: '#d2f2f5',
          200: '#a9e6ec',
          300: '#71d4de',
          400: '#35bccb',
          500: '#16a7b7',
          600: '#0d8695',
          700: '#106b78',
          800: '#145762',
          900: '#154954',
          950: '#072e35',
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
