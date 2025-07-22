module.exports = {
  plugins: {
    'postcss-nesting': {}, // ✅ Make sure this is FIRST
    'tailwindcss': {},
    'autoprefixer': {},
  }
}
