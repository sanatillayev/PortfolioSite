import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'apple-blue': '#2997ff',
        'apple-gray': '#a1a1a6',
        'apple-dark': '#1d1d1f',
        'apple-light': '#f5f5f7',
        'accent-warm': '#ff6b35',
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      backdropBlur: {
        '4xl': '72px',
      },
    },
  },
  plugins: [],
}

export default config
