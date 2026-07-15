import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'xs': '320px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-right': 'env(safe-area-inset-right)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
      },
      colors: {
        'purple': '#7c3aed',
        'purple-light': '#a855f7',
        'purple-dark': '#5b21b6',
        'blue': '#2563eb',
        'blue-light': '#3b82f6',
        'blue-dark': '#1d4ed8',
        'neon-purple': '#c084fc',
        'neon-blue': '#60a5fa',
        'neon-cyan': '#22d3ee',
        'neon-pink': '#f472b6',
        'bg-primary': '#020209',
        'bg-secondary': '#080818',
      },
      fontSize: {
        'xs': ['clamp(11px, 1.5vw, 12px)', { lineHeight: '1.5rem' }],
        'sm': ['clamp(12px, 1.75vw, 14px)', { lineHeight: '1.5rem' }],
        'base': ['clamp(14px, 2vw, 16px)', { lineHeight: '1.5rem' }],
        'lg': ['clamp(16px, 2.25vw, 18px)', { lineHeight: '1.75rem' }],
        'xl': ['clamp(18px, 2.5vw, 20px)', { lineHeight: '1.75rem' }],
        '2xl': ['clamp(20px, 3vw, 24px)', { lineHeight: '2rem' }],
        '3xl': ['clamp(24px, 4vw, 30px)', { lineHeight: '2.25rem' }],
        '4xl': ['clamp(28px, 5vw, 36px)', { lineHeight: '2.5rem' }],
      },
      padding: {
        'container': 'clamp(1rem, 4vw, 1.5rem)',
        'container-lg': 'clamp(1.5rem, 6vw, 2rem)',
      },
    },
  },
  plugins: [],
}

export default config
