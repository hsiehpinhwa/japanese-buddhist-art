import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        washi: {
          bg:       '#f2ece0',
          bgDark:   '#1a1510',
          bgDark2:  '#251e14',
          gold:     '#c9a84c',
          goldDark: '#8b6914',
          text:     '#1a1a1a',
          muted:    '#7a6548',
          muted2:   '#9a8870',
          border:   '#d8d0c0',
          border2:  '#e8e0d0',
          card:     '#ffffff',
          cardHover:'#fffdf7',
          desc:     '#faf7f0',
          era:      '#f8f4ec',
        },
      },
      fontFamily: {
        serif: ['var(--font-noto-serif)', 'Georgia', 'serif'],
        sans:  ['var(--font-noto-sans)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.3em',
        widest3: '0.4em',
      },
    },
  },
  plugins: [],
}

export default config
