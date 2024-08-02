/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg": "var(--bg-color)",
        "main": "var(--main-color)",
        "sub": "var(--sub-color)",
        "caret": "var(--caret-color)",
        "sub-alt": "var(--sub-alt-color)",
        "text": "var(--text-color)",
        "error-1": "var(--error-color)",
        "error-2": "var(--error-extra-color)",
        "error-3": "var(--colorful-error-color)",
        "error-4": "var(--colorful-error-extra-color)",
      }
    },
  },
  plugins: [],
}

