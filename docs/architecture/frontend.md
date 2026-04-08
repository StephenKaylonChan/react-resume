# 前端架构

## 组件分层

```
页面级     App.jsx          ← 唯一页面，管理导出状态（isExporting）
布局级     A4Page.jsx       ← A4 容器，CSS Grid 两栏
内容级     Resume.jsx       ← 左栏主内容（含 SectionTitle、BulletItem 子组件）
           ResumeHeader.jsx ← 左栏头部（含 ContactIcon）
           ResumeSidebar.jsx← 右栏侧边栏（含 SkillBadge 子组件）
通用级     GradientText.jsx ← 渐变文字，跨组件复用
工具级     exportPDF.js     ← PDF 导出（html-to-image + html2canvas 降级）
           exportImage.js   ← PNG 图片导出（html-to-image）
           exportMarkdown.js← Markdown 文档导出（合并源文件）
```

所有接收 props 的组件均配置了 PropTypes 验证。

## A4 布局系统

- 固定尺寸：`width: 210mm`, `min-height: 297mm`（Tailwind 自定义 `w-a4`, `min-h-a4`）
- Grid 布局：`grid-cols-[1fr_250px]`，左栏自适应，右栏固定 250px
- 屏幕显示：白底 + 阴影；打印时去除阴影

## 渐变色系统

GradientText 组件维护一个模块级 `gradientClasses` 映射对象（17 个 key），将渐变名（如 `"gradient-react"`）映射到 Tailwind 的 `bg-gradient-*` class。渐变样式统一由 `index.css` 中的 `.gradient-text` class 控制（`background-clip: text` + `-webkit-text-fill-color: transparent`）。

**为什么不动态拼接**：Tailwind JIT 在编译时扫描源码，运行时拼接的 class 名不会被收集到产物中。因此必须用静态映射对象显式声明所有 class。

**新增渐变色时需同步两处**：`tailwind.config.js` 定义渐变值 + `GradientText.jsx` 映射表添加 key。

打印时渐变退化为纯色蓝 `#1e40af`（通过 `@media print` 覆盖 `.gradient-text`）。

## 导出系统

### PDF 导出（exportPDF.js）

```
用户点击"导出 PDF"
  → App.jsx setIsExporting(true)
  → exportToPDF('resume-content', '陈澄-简历.pdf')
    → 尝试 html-to-image toPng（pixelRatio: 3, 保留渐变）
    → 失败则动态 import('html2canvas') 降级（渐变→纯色，临时修改样式后还原）
    → createAndSavePDF() 公共函数生成 A4 PDF
    → 自动下载
  → setIsExporting(false)
```

html2canvas 通过动态 `import()` 按需加载，不计入主 bundle。两种策略共享 `createAndSavePDF()` 避免 PDF 生成逻辑重复。

### 图片导出（exportImage.js）

```
用户点击"导出图片"
  → exportToImage('resume-content') → html-to-image toPng（3x 高清）→ .png 下载
```

### Markdown 导出（exportMarkdown.js）

```
用户点击"导出 Markdown"
  → exportToMarkdown() → 合并 resume-content/*.md（Vite ?raw import）→ .md 下载
```

## 构建优化

Vite `manualChunks` 拆分策略：

| Chunk | 内容 | 大小 |
|-------|------|------|
| index | 应用代码 + React | ~227KB |
| pdf-core | jsPDF + html-to-image | ~399KB |
| html2canvas | 降级方案（按需加载） | ~201KB |

## 打印样式策略

- `print:hidden`：隐藏工具栏按钮和提示文字
- `-webkit-print-color-adjust: exact`：保留侧边栏背景色
- 阴影去除：打印时 `.a4-page` box-shadow: none
- GradientText 打印时渐变→纯色蓝

## 样式约定

- 全局使用 Tailwind CSS utility class（禁止 `style={{}}`）
- 自定义颜色：`sidebar-teal: #0f766e`（侧边栏背景）
- 系统字体栈，中文优先（`-apple-system, BlinkMacSystemFont, ...`）
- 技能徽章（SkillBadge）：三种变体 default（white/20）、highlight（white/30）、accent（orange-400/30）
