/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}", // Make sure this includes your component files
    ],
    theme: {
        extend: {

            colors: {
                'primary': '#7F13EC',
                'secondary': '#f1f5f9',
                'custom-blue': '#3b82f6',
            },
            fontFamily: {
                display: ["Space Grotesk", "sans-serif"],
            },
        }
    }
}
