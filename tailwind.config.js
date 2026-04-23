/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#080808',
        foreground: '#f0f0f0',
        card: '#111111',
        border: '#222222',
        gold: '#c9a84c',
        muted: '#666666',
        surface: '#1a1a1a',
        inactive: '#444444',
        success: '#22c55e',
        danger: '#ef4444',
      },
    },
  },
  plugins: [],
}
