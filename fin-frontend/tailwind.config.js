/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./App.tsx",
    "./main.tsx",
    "./styles/**/*.css",
  ],
  theme: {
    extend: {
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        float: "float 18s ease-in-out infinite",
        "float-slow": "float-slow 28s ease-in-out infinite",
        fadeInUp: "fadeInUp 1s ease-out forwards",
      },
      fontSize: {
        sm: "0.9rem",
        base: "1.1rem",
        lg: "1.25rem",
        xl: "1.4rem",
      },
      fontFamily: {
        sans: ["Google Sans", "Inter", "sans-serif"],
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        DEFAULT: "1rem", // ensure default radius works
      },
      colors: {
        border: "#e5e7ec",
        ring: "#1a73e8",
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        card: "#ffffff",
        cardForeground: "var(--color-card-foreground)",
        primary: "var(--color-primary)",
        primaryForeground: "var(--color-primary-foreground)",
        secondary: "var(--color-secondary)",
        secondaryForeground: "var(--color-secondary-foreground)",
        muted: "var(--color-muted)",
        mutedForeground: "var(--color-muted-foreground)",
        accent: "var(--color-accent)",
        accentForeground: "var(--color-accent-foreground)",
        destructive: "var(--color-destructive)",
        destructiveForeground: "var(--color-destructive-foreground)",
        input: "var(--color-input)",
      },
      ringColor: {
        brand: "#1a73e8",
      },
    },
  },
  plugins: [],
};
