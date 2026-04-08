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
        // 技术词汇渐变色 - 仅保留项目中实际使用的，新增时需同步 GradientText.jsx
        'gradient-python': 'linear-gradient(45deg, #3776ab, #ffd43b)',
        'gradient-java': 'linear-gradient(45deg, #ed8b00, #ea2d2e)',
        'gradient-spring': 'linear-gradient(45deg, #6db33f, #77bc1f)',
        'gradient-mysql': 'linear-gradient(45deg, #00758f, #f29111)',
        'gradient-ai': 'linear-gradient(45deg, #10b981, #3b82f6)',
        'gradient-linux': 'linear-gradient(45deg, #fcc624, #f57900)',
        'gradient-lstm': 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
        'gradient-react': 'linear-gradient(45deg, #61dafb, #00d8ff)',
        'gradient-vite': 'linear-gradient(45deg, #646cff, #747bff)',
        'gradient-fastapi': 'linear-gradient(45deg, #009688, #00bcd4)',
        'gradient-tailwind': 'linear-gradient(45deg, #06b6d4, #38bdf8)',
        'gradient-nextjs': 'linear-gradient(45deg, #000000, #555555)',
        'gradient-typescript': 'linear-gradient(45deg, #3178c6, #235a97)',
        'gradient-docker': 'linear-gradient(45deg, #0db7ed, #2496ed)',
        'gradient-echarts': 'linear-gradient(45deg, #e43961, #aa2a50)',
        'gradient-nginx': 'linear-gradient(45deg, #009639, #00b140)',
        'gradient-embedding': 'linear-gradient(45deg, #8b5cf6, #6d28d9)',
        'gradient-turborepo': 'linear-gradient(45deg, #ef4444, #f97316)',
      },
      colors: {
        'sidebar-teal': '#0f766e',
      },
    },
  },
  plugins: [],
}
