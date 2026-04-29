/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}", // Make sure this includes your component files
    ],
    theme: {
        extend: {

            colors: {
                'primary': '#070b16',
                'secondary': '#f1f5f9',
                'custom-blue': '#00d4ff',
                'neon-lime': '#b6ff3b',
                'arena': '#0d1424',
                'violet-core': '#8b5cf6',
            },
            fontFamily: {
                display: ["Space Grotesk", "sans-serif"],
            },
        }
    }
}
