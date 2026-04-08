# 前端架构

## 组件分层

```
页面级     App.jsx          ← 唯一页面，管理导出状态（isExporting）
布局级     A4Page.jsx       ← A4 容器，Flex 单栏（header slot + children slot）
头部级     ResumeHeader.jsx ← Teal 色带：头像、姓名、联系方式、4 方向技能 badges
内容级     Resume.jsx       ← 正文区（含 SectionTitle、BulletItem 子组件）
通用级     GradientText.jsx ← 渐变文字，跨组件复用
工具级     exportPDF.js     ← PDF 导出（html-to-image + html2canvas 降级）
           exportImage.js   ← PNG 图片导出（html-to-image）
           exportMarkdown.js← Markdown 文档导出（合并源文件）
           exportConfig.js  ← toPng 共享配置（exportPDF/exportImage 共用）
```

所有接收 props 的组件均配置了 PropTypes 验证。

## A4 布局系统

- 固定尺寸：`width: 210mm`, `min-height: 297mm`（Tailwind 自定义 `w-a4`, `min-h-a4`）
- Flex 布局：`flex flex-col`，头部色带（teal）+ 正文区（白色）纵向堆叠
- 头部色带：`bg-sidebar-teal` (#0f766e)，包含头像、姓名、联系方式、技能 badges
- 正文区：`flex-1`，自动占满剩余高度
- 屏幕显示：白底 + 阴影；打印时去除阴影

## 渐变色系统

GradientText 组件维护一个模块级 `gradientClasses` 映射对象（18 个 key），将渐变名映射到 Tailwind 的 `bg-gradient-*` class。渐变样式统一由 `index.css` 中的 `.gradient-text` class 控制。

**新增渐变色时需同步两处**：`tailwind.config.js` 定义渐变值 + `GradientText.jsx` 映射表添加 key。

打印时渐变退化为纯色蓝 `#1e40af`（通过 `@media print` 覆盖 `.gradient-text`）。

## 导出系统

exportPDF 和 exportImage 共享 `exportConfig.js` 中的 `getToPngOptions()` 配置，防止两处 toPng 参数漂移。

### PDF 导出（exportPDF.js）

```
用户点击"导出 PDF"
  → App.jsx setIsExporting(true)
  → exportToPDF('resume-content', '陈澄-简历.pdf')
    → 注入临时 style 元素（try/finally 确保清理，防止泄漏）
    → toPng（getToPngOptions 共享配置，pixelRatio: 3）
    → 失败则动态 import('html2canvas') 降级
    → createAndSavePDF() 公共函数生成 A4 PDF
  → setIsExporting(false)
```

### 图片导出（exportImage.js）

```
用户点击"导出图片"
  → exportToImage('resume-content') → toPng（getToPngOptions 共享配置）→ .png 下载
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
| index | 应用代码 + React | ~222KB |
| pdf-core | jsPDF + html-to-image | ~399KB |
| html2canvas | 降级方案（按需加载） | ~201KB |

## 打印样式策略

- `print:hidden`：隐藏工具栏按钮和提示文字
- `-webkit-print-color-adjust: exact`：保留头部色带背景色
- 阴影去除：打印时 `.a4-page` box-shadow: none
- GradientText 打印时渐变→纯色蓝

## 样式约定

- 全局使用 Tailwind CSS utility class（禁止 `style={{}}`）
- 自定义颜色：`sidebar-teal: #0f766e`（头部色带背景）
- 系统字体栈，中文优先（`-apple-system, BlinkMacSystemFont, ...`）
- 技能徽章（SkillBadge）：`bg-white/20` 统一样式，位于 ResumeHeader 内
