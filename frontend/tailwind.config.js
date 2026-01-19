/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,jsx}",],
  theme: {
    extend: {

      colors: {
        aiPrimary: "#00F5A0",
        aiSecondary: "#00D9F5",
        aiDark: "#0A0F1F",
        aiGlass: "rgba(255,255,255,0.05)"
      },
      backgroundImage: {
        "ai-gradient":
          "linear-gradient(135deg, #00F5A0 0%, #00D9F5 100%)",
        "ai-radial":
          "radial-gradient(circle, rgba(0,245,160,0.4), rgba(0,0,0,1))",
      },
      boxShadow: {
        neon: "0 0 20px rgba(0, 245, 160, 0.6)",
      },
    },
    },
  
  plugins: [],
}

