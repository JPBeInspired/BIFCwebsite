/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Core Colors
        background: {
          main: '#121212',    // Charcoal Black
          section: '#1C1C1C', // Graphite Grey
          card: '#2A2A2A',    // Deep Slate
        },
        text: {
          primary: '#E6E6E6', // Soft White
          secondary: '#9A9A9A', // Muted Grey
        },
        // Primary Accent
        accent: {
          primary: '#00B4D8',   // Electric Blue
          hover: '#48CAE4',     // Sky Blue
          highlight: '#2ECC71', // Neon Green
        },
        // Alternative Accents
        alt: {
          coral: '#FF6B6B',    // Fiery Coral
          amber: '#F4A261',    // Soft Amber
          purple: '#7D5FFF',   // Royal Purple
        },
        // UI Elements
        ui: {
          divider: '#3C3C3C',  // Gunmetal
          border: '#2E2E2E',   // Stealth Grey
          shadow: '#1A1A1A',   // Shadow Tint
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#E6E6E6',
            maxWidth: 'none',
            h1: { 
              color: '#E6E6E6',
              fontSize: '2.5rem',
              marginTop: '2rem',
              marginBottom: '1.5rem',
              lineHeight: '1.2',
              fontWeight: '700',
            },
            h2: { 
              color: '#E6E6E6',
              fontSize: '2rem',
              marginTop: '2rem',
              marginBottom: '1rem',
              lineHeight: '1.3',
              fontWeight: '700',
            },
            h3: { 
              color: '#E6E6E6',
              fontSize: '1.5rem',
              marginTop: '1.5rem',
              marginBottom: '0.75rem',
              lineHeight: '1.4',
              fontWeight: '600',
            },
            p: {
              color: '#9A9A9A',
              fontSize: '1.125rem',
              lineHeight: '1.75',
              marginTop: '1.25rem',
              marginBottom: '1.25rem',
            },
            strong: { 
              color: '#E6E6E6',
              fontWeight: '600',
            },
            blockquote: {
              color: '#9A9A9A',
              borderLeftColor: '#00B4D8',
              borderLeftWidth: '4px',
              paddingLeft: '1.5rem',
              fontStyle: 'italic',
              marginTop: '2rem',
              marginBottom: '2rem',
            },
            code: { 
              color: '#00B4D8',
              backgroundColor: '#1C1C1C',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontSize: '0.875em',
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            pre: { 
              backgroundColor: '#1C1C1C',
              padding: '1.5rem',
              borderRadius: '0.5rem',
              overflow: 'auto',
            },
            a: { 
              color: '#00B4D8',
              textDecoration: 'none',
              '&:hover': {
                color: '#48CAE4',
              },
            },
            ul: {
              color: '#9A9A9A',
              marginTop: '1.25rem',
              marginBottom: '1.25rem',
              paddingLeft: '1.625rem',
            },
            ol: {
              color: '#9A9A9A',
              marginTop: '1.25rem',
              marginBottom: '1.25rem',
              paddingLeft: '1.625rem',
            },
            li: {
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
            },
            img: {
              borderRadius: '0.5rem',
              marginTop: '2rem',
              marginBottom: '2rem',
            },
            hr: { 
              borderColor: '#3C3C3C',
              marginTop: '2rem',
              marginBottom: '2rem',
            },
            table: {
              fontSize: '0.875rem',
              lineHeight: '1.5',
            },
            thead: {
              borderBottomColor: '#3C3C3C',
            },
            'thead th': {
              color: '#E6E6E6',
              fontWeight: '600',
              padding: '0.75rem',
            },
            'tbody td': {
              padding: '0.75rem',
              borderBottomColor: '#3C3C3C',
            },
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};