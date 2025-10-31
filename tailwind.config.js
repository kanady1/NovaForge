/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        base: {
          bg: "#0b0b0c",
          panel: "#111113",
          card: "#0f0f11",
          border: "#1c1c20",
          text: "#eaeaec",
          sub: "#b6b6bf",
          accent: "#7c3aed"
        }
      },
      boxShadow: {
        panel: "0 0 0 1px #1c1c20, 0 4px 16px rgba(0,0,0,.6)"
      },
      borderRadius: {
        xl2: "18px"
      }
    }
  },
  plugins: []
}
