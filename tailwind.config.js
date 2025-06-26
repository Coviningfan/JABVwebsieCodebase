/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // JABV Labs Dark Mode Brand Colors
        'jabv-primary': '#AB1C1C', // Vibrant red (primary brand)
        'jabv-accent': '#AB1C1C', // Vibrant red (accent)
        'jabv-white': '#FFFFFF', // Pure white for dark backgrounds
        'jabv-dark-text': '#FFFFFF', // White text for dark backgrounds
        'jabv-light-bg': '#000000', // Pure black background
        'jabv-secondary-text': '#9CA3AF', // Gray-400 for secondary text
        'jabv-tertiary-text': '#D1D5DB', // Gray-300 for descriptions
        
        // JABV Status Colors
        'jabv-success': '#10B981', // Green for completed
        'jabv-progress': '#AB1C1C', // Red for in progress
        'jabv-review': '#F59E0B', // Yellow/orange for client review
        'jabv-pending': '#6B7280', // Neutral grey for pending
        
        // Updated colors for dark mode
        'primary': '#AB1C1C', // Updated to JABV red
        'secondary': '#9CA3AF', // Gray-400
        'accent': '#AB1C1C', // Updated to JABV red
        'background': '#000000', // Pure black
        'surface': '#000000', // Pure black
        'text-primary': '#FFFFFF', // Pure white
        'text-secondary': '#9CA3AF', // Gray-400
        'text-tertiary': '#D1D5DB', // Gray-300
        'success': '#10B981', // Green
        'warning': '#F59E0B', // Amber
        'error': '#DC2626', // Red
        'border': 'rgba(255, 255, 255, 0.2)', // Semi-transparent white
        
        // Red gradient variations
        'red-gradient-from': '#AB1C1C',
        'red-gradient-to': '#DC2626',
        'red-gradient-via': '#B91C1C',
      },
      fontFamily: {
        'heading': ['Montserrat', 'sans-serif'], // JABV branding
        'body': ['Lato', 'sans-serif'], // JABV branding
        'caption': ['Lato', 'sans-serif'],
        'data': ['JetBrains Mono', 'monospace'],
      },
      fontWeight: {
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
      },
      borderRadius: {
        'interactive': '6px',
        'card': '8px',
        'xl': '12px',
        '2xl': '16px', // Added for cards styling
      },
      boxShadow: {
        'card': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 12px 48px rgba(0, 0, 0, 0.4)',
        'modal': '0 12px 48px rgba(0, 0, 0, 0.4)',
        'red': '0 4px 14px rgba(171, 28, 28, 0.3)',
        'red-hover': '0 6px 20px rgba(171, 28, 28, 0.4)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        'hover': '150ms',
        'state': '200ms',
        'height': '300ms',
      },
      zIndex: {
        'header': '1000',
        'dropdown': '1100',
        'modal': '2000',
      },
      spacing: {
        'header': '16px',
        'touch': '44px',
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      backgroundImage: {
        'gradient-red': 'linear-gradient(135deg, #AB1C1C 0%, #DC2626 100%)',
        'gradient-red-hover': 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
        'gradient-text': 'linear-gradient(135deg, #FFFFFF 0%, #D1D5DB 100%)',
        'gradient-dark': 'linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 100%)',
      },
    },
  },
  plugins: [],
}