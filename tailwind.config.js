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
      colors: {
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        card: 'var(--color-card)',
        cardForeground: 'var(--color-card-foreground)',
        primary: 'var(--color-primary)',
        primaryForeground: 'var(--color-primary-foreground)',
        secondary: 'var(--color-secondary)',
        secondaryForeground: 'var(--color-secondary-foreground)',
        muted: 'var(--color-muted)',
        mutedForeground: 'var(--color-muted-foreground)',
        accent: 'var(--color-accent)',
        accentForeground: 'var(--color-accent-foreground)',
        destructive: 'var(--color-destructive)',
        destructiveForeground: 'var(--color-destructive-foreground)',
        border: 'var(--color-border)',
        input: 'var(--color-input)',
        ring: 'var(--color-ring)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
    },
  },
  plugins: [],
}
