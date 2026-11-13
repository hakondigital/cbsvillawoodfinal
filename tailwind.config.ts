import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cbs: '#014BAD',
        ink: '#1a1a18',
        'warm-dark': '#2a2520',
        terracotta: '#b5705a',
        'body-text': '#444444',
      },
      fontFamily: {
        heading: ['var(--font-barlow-condensed)', 'Barlow Condensed', 'sans-serif'],
        body: ['var(--font-barlow)', 'Barlow', 'sans-serif'],
      },
      maxWidth: {
        site: '1320px',
      },
    },
  },
  plugins: [],
}

export default config
