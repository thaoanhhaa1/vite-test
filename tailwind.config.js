// /** @type {import('tailwindcss').Config} */
// export default {
//     darkMode: ['class'],
//     content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
//     theme: {
//         extend: {
//             borderRadius: {
//                 lg: 'var(--radius)',
//                 md: 'calc(var(--radius) - 2px)',
//                 sm: 'calc(var(--radius) - 4px)',
//             },
//             colors: {
//                 background: 'hsl(var(--background))',
//                 foreground: 'hsl(var(--foreground))',
//                 card: {
//                     DEFAULT: 'hsl(var(--card))',
//                     foreground: 'hsl(var(--card-foreground))',
//                 },
//                 popover: {
//                     DEFAULT: 'hsl(var(--popover))',
//                     foreground: 'hsl(var(--popover-foreground))',
//                 },
//                 // primary: {
//                 // 	DEFAULT: 'hsl(var(--primary))',
//                 // 	foreground: 'hsl(var(--primary-foreground))'
//                 // },
//                 // secondary: {
//                 // 	DEFAULT: 'hsl(var(--secondary))',
//                 // 	foreground: 'hsl(var(--secondary-foreground))'
//                 // },
//                 muted: {
//                     DEFAULT: 'hsl(var(--muted))',
//                     foreground: 'hsl(var(--muted-foreground))',
//                 },
//                 accent: {
//                     DEFAULT: 'hsl(var(--accent))',
//                     foreground: 'hsl(var(--accent-foreground))',
//                 },
//                 destructive: {
//                     DEFAULT: 'hsl(var(--destructive))',
//                     foreground: 'hsl(var(--destructive-foreground))',
//                 },
//                 border: 'hsl(var(--border))',
//                 input: 'hsl(var(--input))',
//                 ring: 'hsl(var(--ring))',
//                 chart: {
//                     1: 'hsl(var(--chart-1))',
//                     2: 'hsl(var(--chart-2))',
//                     3: 'hsl(var(--chart-3))',
//                     4: 'hsl(var(--chart-4))',
//                     5: 'hsl(var(--chart-5))',
//                 },
//                 primary: '#E11E39',
//                 secondary: '#1E293B',
//                 neutral: '#F8FAFC',
//                 dark: '#0F172A',
//             },
//             animation: {
//                 'fade-in': 'fadeIn 0.5s ease-in-out',
//                 fadeIn: 'fadeIn 0.5s ease-in-out',
//                 slideUp: 'slideUp 0.6s ease-out',
//                 pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
//             },
//             keyframes: {
//                 fadeIn: {
//                     '0%': { opacity: '0', transform: 'translateY(10px)' },
//                     '100%': { opacity: '1', transform: 'translateY(0)' },
//                 },
//                 slideUp: {
//                     '0%': { transform: 'translateY(20px)', opacity: '0' },
//                     '100%': { transform: 'translateY(0)', opacity: '1' },
//                 },
//             },
//         },
//     },
//     plugins: [require('tailwindcss-animate')],
// };

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    dark: '#121212',
                    light: '#ffffff',
                },
                accent: {
                    blue: '#0ea5e9',
                    purple: '#8b5cf6',
                    pink: '#ec4899',
                },
                dark: {
                    100: '#1e1e1e',
                    200: '#2d2d2d',
                    300: '#3d3d3d',
                },
                light: {
                    100: '#f8fafc',
                    200: '#e2e8f0',
                    300: '#cbd5e1',
                },
            },
            fontFamily: {
                mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
                sans: ['Inter', 'Roboto', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.5s ease-in-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
        },
    },
    plugins: [],
};
