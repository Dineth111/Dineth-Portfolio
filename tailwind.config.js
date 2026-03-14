/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                outfit: ['Outfit', 'sans-serif'],
                sans: ['Outfit', 'sans-serif'],
            },
            letterSpacing: {
                tightest: '-0.06em',
                tighter: '-0.04em',
                tight: '-0.02em',
                wide: '0.02em',
                wider: '0.05em',
                widest: '0.2em',
            }
        },
    },
    plugins: [],
}
