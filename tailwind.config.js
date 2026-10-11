/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        epigraphic: ['"Cinzel"', '"Cinzel Decorative"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Bricolage Grotesque"', '"Archivo"', 'system-ui', 'sans-serif'],
        classical: ['"Cormorant Garamond"', '"Instrument Serif"', 'Georgia', 'serif'],
        serif: ['"Instrument Serif"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Instrument Sans"', '"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        surface2: 'var(--surface-2)',
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        line: 'var(--line)',
        lineSoft: 'var(--line-soft)',
        accent: 'var(--accent)',
        accentDim: 'var(--accent-dim)',
        invertBg: 'var(--invert-bg)',
        invertFg: 'var(--invert-fg)',
      },
    },
  },
  plugins: [],
};
