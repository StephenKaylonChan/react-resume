# 问题解决记录

本文档记录项目开发过程中遇到的问题及解决方案。

---

## 问题 1: Tailwind CSS 版本冲突

### 现象
```
Error: PostCSS plugin error
tailwindcss directly as a PostCSS plugin
```

### 原因
- `npm create vite` 默认安装 Tailwind CSS v4
- 项目要求使用 v3.4.0
- v4 配置方式与 v3 不兼容

### 解决方案
```bash
# 卸载 v4
npm uninstall tailwindcss

# 安装指定版本
npm install -D tailwindcss@^3.4.0 postcss autoprefixer

# 生成配置文件
npx tailwindcss init -p
```

### 验证
```bash
npm list tailwindcss
# 应显示: tailwindcss@3.4.0
```

### 经验教训
- 明确指定版本号
- v4 还在 beta 阶段，生产环境慎用
- 配置文件格式变化需注意

---

## 问题 2: 渐变文字显示为空白

### 现象
- 大量 `<GradientText>` 组件内容不显示
- 只有少数几个渐变文字正常显示
- 开发者工具显示元素存在但无颜色

### 原因
**Tailwind JIT 模式不支持动态类名**

错误代码：
```javascript
// ❌ 动态拼接类名不会被编译
<span className={`bg-${gradient} gradient-text`}>
  {children}
</span>
```

JIT 编译器在编译时无法识别 `` `bg-${gradient}` `` 这样的动态类名。

### 解决方案
**显式类名映射对象**

```javascript
const gradientClasses = {
  'gradient-python': 'bg-gradient-python',
  'gradient-java': 'bg-gradient-java',
  'gradient-react': 'bg-gradient-react',
  // ... 全部 29 种渐变
};

const className = gradientClasses[gradient] || '';

return (
  <span className={`${className} gradient-text`}>
    {children}
  </span>
);
```

### 技术原理
1. Tailwind JIT 在编译时静态扫描代码
2. 只编译完整出现的类名字符串
3. 模板字符串拼接的类名会被忽略
4. 必须使用完整的字符串形式

### 验证方法
```javascript
// 检查编译后的 CSS
console.log(gradientClasses['gradient-react']);
// 应输出: "bg-gradient-react"

// 检查元素样式
const element = document.querySelector('.gradient-text');
console.log(window.getComputedStyle(element).backgroundImage);
// 应显示渐变样式
```

### 相关资源
- [Tailwind JIT 文档](https://tailwindcss.com/docs/just-in-time-mode)
- [动态类名最佳实践](https://tailwindcss.com/docs/content-configuration#dynamic-class-names)

---

## 问题 3: PDF 导出渐变文字异常

### 现象
- PDF 导出后渐变文字后面有背景框
- 或渐变文字显示为空白
- 阴影效果异常

### 原因
**html2canvas 不支持 `background-clip: text`**

`background-clip: text` 是一个相对新的 CSS 特性，html2canvas 库还没有完全支持。

### 解决方案
**双重降级策略**

#### 方案 1: html-to-image（主方案）
```javascript
import { toPng } from 'html-to-image';

const dataUrl = await toPng(element, {
  quality: 1.0,
  pixelRatio: 3,
  backgroundColor: '#ffffff',
  style: {
    '-webkit-print-color-adjust': 'exact',
    'print-color-adjust': 'exact',
  },
});
```

✅ 支持 `background-clip: text`
✅ 保留渐变效果

#### 方案 2: html2canvas（降级）
```javascript
// 临时替换渐变为纯色
const gradientTexts = element.querySelectorAll('.gradient-text');
gradientTexts.forEach((el) => {
  el.style.backgroundImage = 'none';
  el.style.color = '#1e40af';
  el.style.fontWeight = '700';
});

const canvas = await html2canvas(element, { scale: 3 });

// 恢复原始样式
restoreOriginalStyles();
```

⚠️ 使用纯蓝色替代渐变
⚠️ 仅作为 html-to-image 失败时的备用

### 实现代码
```javascript
export async function exportToPDF(elementId, filename) {
  try {
    // 主方案：html-to-image
    return await exportWithHtmlToImage(elementId, filename);
  } catch (error) {
    console.error('html-to-image failed, fallback to html2canvas');
    // 降级方案：html2canvas
    return await exportToPDFWithCanvas(elementId, filename);
  }
}
```

### 经验教训
- 不要依赖单一库
- 提供降级方案确保功能可用
- 测试多种浏览器兼容性

---

## 问题 4: 侧边栏背景色不显示

### 现象
PDF 导出时侧边栏背景色丢失，显示为白色

### 原因
浏览器默认不打印背景颜色，需要强制渲染

### 解决方案
**强制颜色渲染**

```javascript
// 创建临时样式
const styleElement = document.createElement('style');
styleElement.textContent = `
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    color-adjust: exact !important;
  }
`;
document.head.appendChild(styleElement);

// 导出 PDF
await toPng(element, {
  style: {
    '-webkit-print-color-adjust': 'exact',
    'print-color-adjust': 'exact',
  },
});

// 清理临时样式
document.head.removeChild(styleElement);
```

### CSS 配置
```css
@media print {
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  .bg-sidebar-teal {
    background-color: #0f766e !important;
  }
}
```

### 浏览器兼容性
- `print-color-adjust`: 标准属性
- `-webkit-print-color-adjust`: Webkit 前缀
- `color-adjust`: 旧版标准

---

## 问题 5: PDF 图片模糊

### 现象
导出的 PDF 文字不够清晰，边缘模糊

### 原因
默认分辨率太低 (72 DPI)

### 解决方案
**提高分辨率**

```javascript
// html-to-image
await toPng(element, {
  pixelRatio: 3,  // 3倍分辨率
  quality: 1.0,   // 最高质量
});

// html2canvas
await html2canvas(element, {
  scale: 3,  // 3倍缩放
});
```

### 效果对比
| 设置 | DPI | 清晰度 |
|------|-----|--------|
| pixelRatio: 1 | 72 | 模糊 |
| pixelRatio: 2 | 144 | 清晰 |
| pixelRatio: 3 | 216 | 非常清晰 |

### 注意事项
- 分辨率越高，生成时间越长
- 文件体积会增大
- 建议值: 2-3

---

## 问题 6: 开发服务器热更新失效

### 现象
修改代码后浏览器不自动刷新

### 可能原因
1. Vite 配置问题
2. 浏览器缓存
3. 文件路径问题

### 解决方案

#### 1. 清除缓存
```bash
# 删除缓存
rm -rf node_modules/.vite

# 重启开发服务器
npm run dev
```

#### 2. 检查 Vite 配置
```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: true,  // 确保 HMR 开启
  },
})
```

#### 3. 硬刷新浏览器
- Windows: Ctrl + F5
- macOS: Cmd + Shift + R

---

## 问题 7: npm install 失败

### 现象
```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

### 解决方案

#### 方案 1: 使用 --legacy-peer-deps
```bash
npm install --legacy-peer-deps
```

#### 方案 2: 清理并重装
```bash
rm -rf node_modules package-lock.json
npm install
```

#### 方案 3: 使用 npm v6
```bash
npm install -g npm@6
npm install
```

---

## 问题 8: 字体在不同系统显示不一致

### 现象
macOS 和 Windows 显示效果差异较大

### 解决方案
**使用系统字体栈**

```css
font-family:
  -apple-system,        /* macOS San Francisco */
  BlinkMacSystemFont,   /* macOS */
  "Segoe UI",           /* Windows */
  Roboto,               /* Android */
  "Helvetica Neue",     /* 备用 */
  Arial,                /* 通用 */
  sans-serif;           /* 系统默认 */
```

### 最佳实践
- 优先使用系统字体
- 避免使用 Web 字体（简历不需要）
- 确保跨平台一致性

---

## 问题 9: Git 无法追踪某些文件

### 现象
修改了文件但 git status 不显示

### 原因
文件可能在 `.gitignore` 中

### 解决方案
```bash
# 检查忽略规则
git check-ignore -v <file>

# 强制添加
git add -f <file>

# 或修改 .gitignore
```

---

## 调试技巧

### 1. React 开发者工具
安装 React DevTools 浏览器插件

### 2. Tailwind CSS 调试
```javascript
// 查看编译后的类
console.log(window.getComputedStyle(element));
```

### 3. PDF 导出调试
```javascript
// 查看生成的图片
const dataUrl = await toPng(element);
window.open(dataUrl);
```

### 4. 控制台日志
```javascript
console.log('Debug:', { gradient, className });
```

---

## 常见错误代码

### ESLint 警告
```
warning  Fast refresh only works when a file only exports components
```

**解决**: 将非组件导出移到单独文件

### React 警告
```
Warning: Each child in a list should have a unique "key" prop
```

**解决**: 添加 key 属性
```jsx
{items.map((item, index) => (
  <li key={index}>{item}</li>
))}
```

---

## 预防措施

### ✅ 推荐
1. 定期更新依赖（但避免大版本跳跃）
2. 使用版本锁定文件 (package-lock.json)
3. 测试多种浏览器
4. 保持代码简洁

### ❌ 避免
1. 不要直接修改 node_modules
2. 不要忽略警告信息
3. 不要跳过测试
4. 不要使用过时的语法

---

## 求助资源

### 官方文档
- [React 文档](https://react.dev/)
- [Vite 文档](https://vitejs.dev/)
- [Tailwind CSS 文档](https://tailwindcss.com/)

### 社区
- Stack Overflow
- GitHub Issues
- Discord 社区

### AI 工具
- Claude Code
- ChatGPT
- GitHub Copilot
