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
        // 技术词汇渐变色 - 基于原 HTML 的颜色配置
        'gradient-python': 'linear-gradient(45deg, #3776ab, #ffd43b)',
        'gradient-java': 'linear-gradient(45deg, #ed8b00, #ea2d2e)',
        'gradient-javascript': 'linear-gradient(45deg, #f7df1e, #ff6b35)',
        'gradient-vue': 'linear-gradient(45deg, #4fc08d, #41b883)',
        'gradient-spring': 'linear-gradient(45deg, #6db33f, #77bc1f)',
        'gradient-mysql': 'linear-gradient(45deg, #00758f, #f29111)',
        'gradient-html5': 'linear-gradient(45deg, #e34f26, #f06529)',
        'gradient-css3': 'linear-gradient(45deg, #1572b6, #33a9dc)',
        'gradient-webassembly': 'linear-gradient(45deg, #654ff0, #7c3aed)',
        'gradient-git': 'linear-gradient(45deg, #f05032, #f14e32)',
        'gradient-ai': 'linear-gradient(45deg, #10b981, #3b82f6)',
        'gradient-pwa': 'linear-gradient(45deg, #5a0fc8, #7c3aed)',
        'gradient-docker': 'linear-gradient(45deg, #0db7ed, #2496ed)',
        'gradient-linux': 'linear-gradient(45deg, #fcc624, #f57900)',
        'gradient-aliyun': 'linear-gradient(45deg, #ff6a00, #ff9500)',
        'gradient-pandas': 'linear-gradient(45deg, #150458, #e70488)',
        'gradient-lstm': 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
        'gradient-restful': 'linear-gradient(45deg, #61dafb, #21aa93)',
        'gradient-vscode': 'linear-gradient(45deg, #007acc, #0078d4)',
        'gradient-csharp': 'linear-gradient(45deg, #239120, #68217a)',
        'gradient-revit': 'linear-gradient(45deg, #0078d4, #00bcf2)',
        'gradient-opencv': 'linear-gradient(45deg, #5c3317, #ff6347)',
        'gradient-chatgpt': 'linear-gradient(45deg, #10a37f, #41c4a5)',
        'gradient-claude': 'linear-gradient(45deg, #cc785c, #f4a78c)',
        'gradient-gemini': 'linear-gradient(45deg, #4285f4, #ea4335)',
        'gradient-cursor': 'linear-gradient(45deg, #000000, #6366f1)',
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
