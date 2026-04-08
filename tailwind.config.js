/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        'a4': '210mm',
      },
      minHeight: {
        'a4': '297mm',
      },
      height: {
        'a4': '297mm',
      },
      spacing: {
        'a4-padding': '20mm',
      },
      backgroundImage: {
        // 技术词汇渐���色 - 仅保留项目中实际使用的，新增时需同步 GradientText.jsx
        'gradient-python': 'linear-gradient(45deg, #3776ab, #ffd43b)',
        'gradient-java': 'linear-gradient(45deg, #ed8b00, #ea2d2e)',
        'gradient-javascript': 'linear-gradient(45deg, #f7df1e, #ff6b35)',
        'gradient-spring': 'linear-gradient(45deg, #6db33f, #77bc1f)',
        'gradient-mysql': 'linear-gradient(45deg, #00758f, #f29111)',
        'gradient-html5': 'linear-gradient(45deg, #e34f26, #f06529)',
        'gradient-ai': 'linear-gradient(45deg, #10b981, #3b82f6)',
        'gradient-linux': 'linear-gradient(45deg, #fcc624, #f57900)',
        'gradient-pandas': 'linear-gradient(45deg, #150458, #e70488)',
        'gradient-lstm': 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
        'gradient-opencv': 'linear-gradient(45deg, #5c3317, #ff6347)',
        'gradient-chatgpt': 'linear-gradient(45deg, #10a37f, #41c4a5)',
        'gradient-claude': 'linear-gradient(45deg, #cc785c, #f4a78c)',
        'gradient-react': 'linear-gradient(45deg, #61dafb, #00d8ff)',
        'gradient-vite': 'linear-gradient(45deg, #646cff, #747bff)',
        'gradient-fastapi': 'linear-gradient(45deg, #009688, #00bcd4)',
        'gradient-tailwind': 'linear-gradient(45deg, #06b6d4, #38bdf8)',
      },
      colors: {
        'sidebar-teal': '#0f766e',
      },
    },
  },
  plugins: [],
}
