/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", // ❌ you had an accidental space → "./ index.html"
    "./components/**/*.{js,ts,jsx,tsx}", // ✅ scans all component files
    "./App.tsx",
    "./main.tsx",
    "./styles/**/*.css", // ✅ include your custom CSS like globals.css
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
        sm: "1.15rem", // override default
        base: "1.2rem",
        lg: "1.45rem",
        xl: "1.6rem",
      },
      darkMode: "class",
      colors: {
        border: "#e5e7ec", // or your desired color
        ring: "#1a73e8", // or your desired color
      },
      ringColor: {
        brand: "#1a73e8", // for ring-brand/50
      },
      fontFamily: {
        sans: ["Google Sans", "Inter", "sans-serif"], // 👈 Apply to body / text
      },
      borderRadius: {
        DEFAULT: "1rem", // Rounded corners by default (8px)
        md: "0.75rem",
        lg: "1rem",
      },
      ringColor: {
        brand: "#1a73e8", // or your desired color
      },
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        card: "var(--color-card)",
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
        border: "var(--color-border)",
        input: "var(--color-input)",
        ring: "var(--color-ring)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
    },
  },
  plugins: [],
};
