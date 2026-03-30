/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,json}'],
  theme: {
    extend: {
      colors: {
        ink: '#07080b',
        panel: '#101219',
        ember: '#dc2626',
        crimson: '#ff4d4f',
        mist: '#d4d4d8',
      },
      fontFamily: {
        display: ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.75rem',
      },
      boxShadow: {
        glow: '0 28px 60px rgba(0, 0, 0, 0.45), 0 0 60px rgba(220, 38, 38, 0.18)',
        glass: '0 24px 50px rgba(0, 0, 0, 0.42), inset 0 1px 0 rgba(255, 255, 255, 0.04)',
      },
      backgroundImage: {
        'red-mesh':
          'radial-gradient(circle at top left, rgba(239, 68, 68, 0.3), transparent 32%), radial-gradient(circle at bottom right, rgba(220, 38, 38, 0.24), transparent 26%)',
      },
      spacing: {
        18: '4.5rem',
      },
    },
  },
  plugins: [],
};
