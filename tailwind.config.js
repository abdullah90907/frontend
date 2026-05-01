/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        /* AMI Brand Palette – clean white base, Canadian red, scientific teal */
        ami: {
          red: '#C41E3A',        /* Maple-leaf red – CTAs, highlights */
          'red-dark': '#9B1B30',
          'red-light': '#E8344F',
          teal: '#378596',       /* Scientific accent */
          'teal-dark': '#2A6A78',
          'teal-light': '#4BA3B5',
          navy: '#1A2332',       /* Headings, nav background */
          'navy-light': '#2C3E50',
          slate: '#4A5568',      /* Body text */
          'gray-warm': '#F7F8FA', /* Section backgrounds */
          'gray-100': '#F1F3F5',
          'gray-200': '#E2E6EA',
          'gray-300': '#CED4DA',
          'gray-400': '#8B95A1',
          white: '#FFFFFF',
          'off-white': '#FAFBFC',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.06), 0 1px 2px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 4px 12px 0 rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.06)',
        'elevated': '0 8px 24px 0 rgba(0, 0, 0, 0.08)',
        'nav': '0 2px 8px 0 rgba(0, 0, 0, 0.06)',
      },
      borderRadius: {
        'card': '0.5rem',
      },
      maxWidth: {
        'content': '1200px',
      },
    },
  },
  plugins: [],
};