/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');

export default {
    content: [
        './index.html',
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            boxShadow: {
                DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 2px 0 rgba(0, 0, 0, 0.02)',
                md: '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.02)',
                lg: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.01)',
                xl: '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.01)',
            },
            outline: {
                blue: '2px solid rgba(0, 112, 244, 0.5)',
            },
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
            },
            fontSize: {
                xs: ['0.75rem', { lineHeight: '1.5' }],
                sm: ['0.875rem', { lineHeight: '1.5715' }],
                base: ['1rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
                lg: ['1.125rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
                xl: ['1.25rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
                '2xl': ['1.5rem', { lineHeight: '1.33', letterSpacing: '-0.01em' }],
                '3xl': ['1.88rem', { lineHeight: '1.33', letterSpacing: '-0.01em' }],
                '4xl': ['2.25rem', { lineHeight: '1.25', letterSpacing: '-0.02em' }],
                '5xl': ['3rem', { lineHeight: '1.25', letterSpacing: '-0.02em' }],
                '6xl': ['3.75rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
            },

            lineHeight: {
                'small': '0.5',
                'short': '0.75',
                'normal': '1',
                'semi': '1.25',
                'medium': '1.5',
                'double': '2'
            },
            screens: {
                'xs': '400px',
                'sm': '640px',
                'md': '768px',
                'pcTab': '1000px',
                'lg': '1199px',
                'xl': '1500px',
                '2xl': '1750px',
                '3xl': '2000px'
            },
            container: {
                center: true,
            },
            borderWidth: {
                3: '3px',
                '5': '5px'
            },
            minWidth: {
                36: '9rem',
                44: '11rem',
                56: '14rem',
                60: '15rem',
                72: '18rem',
                80: '20rem',
            },
            maxWidth: {
                '8xl': '88rem',
                '9xl': '96rem',
            },
            zIndex: {
                60: '60',
                '1': '1',
                '2': '2',
                '3': '3',
                '4': '4',
                '5': '5',
                '10': '10',
                '15': '15',
                '20': '20',
                '25': '25',
            },
            scrollbar: {
                'thin': { 'width': '1px' },
                'medium': { 'width': '6px' },
                'thick': { 'width': '8px' },
                'thumb': {
                    'width': '8px',
                    'borderRadius': '9999px',
                },
            },
            borderRadius: {
                'none': '0',
                'switchBase': '5px',
                'itemCard': '5px',
                'rd_2': '2px',
                'rd_5': '5px',
                'rd_7.5': '7.5px',
                'rd_10': '10px',
                'rd_15': '15px',
                'rd_17.5': '17.5px',
                'rd_20': '20px',
                'rd_25': '25px',
                'rd_30': '30px',
                'rd_35': '35px',
                'rd_40': '40px',
                'rd_45': '45px',
                'rd_50': '50px',
                'rd_100': '100px'
            },
        },
    },
    plugins: [
        // eslint-disable-next-line global-require
        require('@tailwindcss/forms'),
              require("daisyui"),
        // add custom variant for expanding sidebar
        plugin(({ addVariant, e }) => {
            addVariant('sidebar-expanded', ({ modifySelectors, separator }) => {
                modifySelectors(({ className }) => `.sidebar-expanded .${e(`sidebar-expanded${separator}${className}`)}`);
            });
        }),
    ],
};
