/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        waterGreen: {
          50: '#cdf9ff',
          100: '#9cf4ff',
          200: '#6aeeff',
          300: '#38e9ff',
          400: '#07e3ff',
          500: '#00bcd4 ',
          600: '#009db1',
          700: '#007d8d',
          800: '#005e6a',
          900: '#003f47',
        },

        violet: {
          50: '#e8cdfb',
          100: '#d19bf7',
          200: '#b968f4',
          300: '#a236f0',
          400: '#8911df',
          500: '#6a0dad',
          600: '#580b90',
          700: '#470973',
          800: '#350757',
          900: '#23043a',
        },

        blue: {
          50: '#bfbfff',
          100: '#8080ff',
          200: '#4040ff',
          300: '#0000ff',
          400: '#0000c0',
          500: '#000080',
          600: '#00006b',
          700: '#000055',
          800: '#000040',
          900: '#00002b',
        },

        violetBlue: {
          50: '#e0defc',
          100: '#c2befa',
          200: '#a39df7',
          300: '#847cf5',
          400: '#665cf3',
          500: '#473BF0',
          600: '#2012e7',
          700: '#1a0eb9',
          800: '#130b8b',
          900: '#0d075d',
        },

        neutralGreen: {
          50: '#fafbfb',
          100: '#f1f4f5',
          200: '#eaeff0',
          300: '#e3eaea',
          400: '#dce4e5',
          500: '#d5dfe0',
          600: '#abbfc1',
          700: '#819fa2',
          800: '#5d7b7e',
          900: '#3e5254',
        },

        neutralViolet: {
          50: '#fbfbfc',
          100: '#f0f0f4',
          200: '#e8e8ee',
          300: '#e0e0e8',
          400: '#d9d9e3',
          500: '#d1d1dd',
          600: '#a8a8bf',
          700: '#7f7fa0',
          800: '#5b5b7c',
          900: '#3d3d52',
        },
      },
    },
  },
  plugins: [],
};
