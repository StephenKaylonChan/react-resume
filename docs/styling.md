# 样式系统说明

## Tailwind CSS 配置

### 配置文件
**文件路径**: `tailwind.config.js`

```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 自定义配置
    },
  },
  plugins: [],
}
```

## 自定义扩展

### 1. A4 纸张尺寸
```javascript
width: {
  'a4': '210mm',
},
minHeight: {
  'a4': '297mm',
},
height: {
  'a4': '297mm',
},
```

**使用**:
```jsx
<div className="w-a4 min-h-a4">
  {/* A4 内容 */}
</div>
```

### 2. 渐变背景 (29 种)
```javascript
backgroundImage: {
  'gradient-python': 'linear-gradient(45deg, #3776ab, #ffd43b)',
  'gradient-java': 'linear-gradient(45deg, #ed8b00, #ea2d2e)',
  'gradient-react': 'linear-gradient(45deg, #61dafb, #00d8ff)',
  'gradient-spring': 'linear-gradient(45deg, #6db33f, #77bc1f)',
  'gradient-mysql': 'linear-gradient(45deg, #00758f, #f29111)',
  'gradient-tailwind': 'linear-gradient(45deg, #06b6d4, #3b82f6)',
  'gradient-vite': 'linear-gradient(45deg, #646cff, #747bff)',
  'gradient-fastapi': 'linear-gradient(45deg, #009688, #00bfa5)',
  'gradient-vue': 'linear-gradient(45deg, #42b883, #35495e)',
  'gradient-javascript': 'linear-gradient(45deg, #f7df1e, #f0db4f)',
  'gradient-html5': 'linear-gradient(45deg, #e34f26, #f06529)',
  'gradient-css3': 'linear-gradient(45deg, #1572b6, #33a9dc)',
  'gradient-ai': 'linear-gradient(45deg, #8b5cf6, #ec4899)',
  'gradient-claude': 'linear-gradient(45deg, #cc785c, #d4976e)',
  'gradient-chatgpt': 'linear-gradient(45deg, #10a37f, #1a7f64)',
  'gradient-pandas': 'linear-gradient(45deg, #150458, #e70488)',
  'gradient-lstm': 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
  'gradient-opencv': 'linear-gradient(45deg, #5c3ee8, #f05032)',
  'gradient-linux': 'linear-gradient(45deg, #fcc624, #000000)',
  'gradient-restful': 'linear-gradient(45deg, #61dafb, #282c34)',
  'gradient-git': 'linear-gradient(45deg, #f05032, #f34f29)',
  'gradient-docker': 'linear-gradient(45deg, #0db7ed, #384d54)',
  'gradient-kubernetes': 'linear-gradient(45deg, #326ce5, #fff)',
  'gradient-aws': 'linear-gradient(45deg, #ff9900, #232f3e)',
  'gradient-azure': 'linear-gradient(45deg, #0078d4, #50e6ff)',
  'gradient-gcp': 'linear-gradient(45deg, #4285f4, #34a853)',
  'gradient-graphql': 'linear-gradient(45deg, #e10098, #c00095)',
  'gradient-typescript': 'linear-gradient(45deg, #3178c6, #235a97)',
  'gradient-nodejs': 'linear-gradient(45deg, #339933, #66cc66)',
}
```

### 3. 自定义颜色
```javascript
colors: {
  'sidebar-teal': '#0f766e',  // 侧边栏背景色
}
```

**使用**:
```jsx
<aside className="bg-sidebar-teal">
  {/* 侧边栏内容 */}
</aside>
```

## 全局样式

### 文件路径
`src/index.css`

### 基础样式重置
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto;
  line-height: 1.3;
  color: #333;
  background: #f3f4f6;
  font-size: 13px;
}
```

### 打印样式优化
```css
@media print {
  @page {
    size: A4;
    margin: 0;
  }

  body {
    margin: 0;
    padding: 0;
    background: white !important;
  }

  .print\:hidden {
    display: none !important;
  }

  .a4-page {
    width: 210mm !important;
    height: 297mm !important;
    margin: 0 !important;
    box-shadow: none !important;
    page-break-after: always !important;
  }

  /* 渐变文字打印降级 */
  .gradient-text {
    background: none !important;
    color: #1e40af !important;
    font-weight: 700 !important;
  }

  /* 确保背景色打印 */
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    color-adjust: exact !important;
  }
}
```

### 自定义工具类
```css
@layer utilities {
  /* 渐变文字效果 */
  .gradient-text {
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 600;
    display: inline;
    color: #1e40af;  /* 回退颜色 */
  }

  /* A4 页面阴影 */
  .a4-shadow {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
}
```

## 字体系统

### 字体栈
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
             "Helvetica Neue", Arial, sans-serif;
```

**优先级**:
1. `-apple-system` - macOS San Francisco
2. `BlinkMacSystemFont` - macOS
3. `Segoe UI` - Windows
4. `Roboto` - Android
5. `Helvetica Neue` - 备用
6. `Arial` - 通用
7. `sans-serif` - 系统默认

### 字号系统
```javascript
// Tailwind 默认 + 自定义
text-[0.6rem]   // 9.6px  - 技能标签
text-[0.65rem]  // 10.4px - 侧边栏小字
text-[0.7rem]   // 11.2px - 侧边栏标题
text-[0.75rem]  // 12px   - 工作内容
text-[0.8rem]   // 12.8px - 段落文字
text-[0.85rem]  // 13.6px - 章节标题
text-[0.9rem]   // 14.4px - 职位标题
text-[0.95rem]  // 15.2px - 主标题
text-[1.4rem]   // 22.4px - 姓名
```

**设计原则**:
- 层次分明
- 紧凑排版（简历特性）
- 可读性优先

## 颜色系统

### 主色调
```css
/* 蓝色系 - 主题色 */
text-blue-600   #2563eb  /* 链接、标题 */

/* 灰色系 - 文本 */
text-gray-900   #111827  /* 主标题 */
text-gray-600   #4b5563  /* 正文 */
text-gray-500   #6b7280  /* 次要信息 */
text-gray-400   #9ca3af  /* 辅助信息 */

/* 白色 - 侧边栏 */
text-white      #ffffff
bg-white/90     rgba(255, 255, 255, 0.9)  /* 半透明 */
bg-white/30     rgba(255, 255, 255, 0.3)  /* 技能标签 */
bg-white/20     rgba(255, 255, 255, 0.2)  /* 次要标签 */

/* 青色 - 侧边栏背景 */
bg-sidebar-teal #0f766e

/* 橙色 - 后端标签 */
bg-orange-400/30  rgba(251, 146, 60, 0.3)
```

### 边框颜色
```css
border-gray-200  #e5e7eb  /* 分隔线 */
border-white/20  rgba(255, 255, 255, 0.2)  /* 侧边栏分隔 */
```

## 间距系统

### Tailwind 间距值
```javascript
// 使用 Tailwind 默认间距
gap-1      0.25rem  // 4px
gap-1.5    0.375rem // 6px
mb-0.5     0.125rem // 2px
mb-1       0.25rem  // 4px
mb-1.5     0.375rem // 6px
mb-2       0.5rem   // 8px
mb-2.5     0.625rem // 10px
mb-3       0.75rem  // 12px
mb-4       1rem     // 16px
```

### 布局间距
```jsx
// 页面边距
px-7 py-4    // 主内容
px-4 py-3    // 侧边栏

// 章节间距
mb-4         // 主要章节
mb-3         // 次要章节
mb-2         // 小节

// 项目间距
space-y-1.5  // 列表项
gap-1        // 技能标签
```

## 布局系统

### Grid 布局
```jsx
// A4 页面 - 7:3 分栏
<div className="grid grid-cols-[7fr_3fr]">
  <Resume />      {/* 70% */}
  <ResumeSidebar /> {/* 30% */}
</div>

// 联系信息 - 2 列
<div className="grid grid-cols-2 gap-y-1.5">
  {/* 联系信息项 */}
</div>
```

### Flexbox 布局
```jsx
// 水平对齐
<div className="flex items-center gap-1">
  <Icon />
  <Text />
</div>

// 两端对齐
<div className="flex justify-between items-start">
  <LeftContent />
  <RightContent />
</div>
```

## 响应式设计

### 打印适配
```jsx
// 隐藏导出按钮
<button className="print:hidden">导出 PDF</button>

// A4 尺寸调整
<div className="w-a4 min-h-a4 a4-shadow print:shadow-none">
  {/* 内容 */}
</div>
```

### 屏幕适配
当前版本为固定 A4 尺寸，未做移动端适配。

**未来改进**:
```jsx
// 响应式宽度
<div className="w-full md:w-a4">
  {/* 移动端全宽，桌面端 A4 */}
</div>
```

## 阴影系统

### 屏幕显示
```css
.a4-shadow {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

### 打印时移除
```css
@media print {
  .a4-shadow {
    box-shadow: none !important;
  }
}
```

## 最佳实践

### ✅ 推荐
1. 使用 Tailwind 工具类，避免自定义 CSS
2. 保持间距系统一致性
3. 遵循字号层次
4. 适度使用颜色，突出重点

### ❌ 避免
1. 不要内联样式（除非必要）
2. 不要过度使用颜色
3. 不要破坏打印样式
4. 不要使用过小的字号

## 调试技巧

### 1. 检查 Tailwind 编译
```bash
npm run dev
# 检查控制台输出
```

### 2. 查看生成的 CSS
浏览器开发者工具 → Elements → Computed

### 3. 测试打印样式
浏览器 → 打印预览 (Ctrl+P / Cmd+P)

### 4. 验证 A4 尺寸
```javascript
const element = document.querySelector('.w-a4');
console.log(getComputedStyle(element).width);  // 应为 210mm
```

## 性能优化

### 1. JIT 模式
Tailwind v3 默认启用 JIT，仅编译使用的类。

### 2. 生产构建
```bash
npm run build
# 自动移除未使用的样式
```

### 3. CSS 大小
```
开发环境: ~300KB (所有工具类)
生产环境: ~10KB (实际使用的类)
```

## 主题切换（未来扩展）

### 暗色主题
```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class',  // 或 'media'
  theme: {
    extend: {
      colors: {
        'sidebar-teal-dark': '#064e3b',
      }
    }
  }
}
```

### 多配色方案
```javascript
// 定义多套配色
const colorSchemes = {
  blue: { primary: '#2563eb', sidebar: '#0f766e' },
  green: { primary: '#059669', sidebar: '#065f46' },
  purple: { primary: '#7c3aed', sidebar: '#5b21b6' },
};
```
