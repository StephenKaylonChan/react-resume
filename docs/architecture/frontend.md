# 前端架构

## 组件分层

```
页面级     App.jsx         ← 唯一页面，管理导出状态
布局级     A4Page.jsx      ← A4 容器，CSS Grid 两栏
内容级     Resume.jsx      ← 左栏主内容
           ResumeHeader.jsx← 左栏头部
           ResumeSidebar.jsx← 右栏侧边栏
通用级     GradientText.jsx← 渐变文字，跨组件复用
工具级     exportPDF.js    ← PDF 导出逻辑
```

## A4 布局系统

- 固定尺寸：`width: 210mm`, `height: 297mm`（Tailwind 自定义 `w-a4`, `h-a4`）
- Grid 布局：`grid-cols-[7fr_3fr]`，左栏 70%，右栏 30%
- 内边距：`20mm`（Tailwind 自定义 `p-a4-padding`）
- 屏幕显示：白底 + 阴影；打印时去除阴影

## 渐变色系统

GradientText 组件维护一个 `gradientClasses` 映射对象（29 个 key），将渐变名（如 `"react"`）映射到 Tailwind 的 `bg-gradient-to-r` class。

**为什么不动态拼接**：Tailwind JIT 在编译时扫描源码，运行时拼接的 class 名不会被收集到产物中。因此必须用静态映射对象显式声明所有 class。

打印时渐变退化为纯色蓝 `#1e40af`（通过 `print:` 媒体查询覆盖）。

## PDF 导出链路

```
用户点击"导出 PDF"
  → App.jsx setIsExporting(true)
  → exportToPDF('resume-content', '陈澄-简历.pdf')
    → 尝试 html-to-image（pixelRatio: 3, 保留渐变）
    → 失败则降级 html2canvas（渐变→纯色，临时修改样式后还原）
    → jsPDF 生成 A4 PDF
    → 自动下载
  → setIsExporting(false)
```

## 打印样式策略

- `print:hidden`：隐藏工具栏按钮
- `-webkit-print-color-adjust: exact`：保留侧边栏背景色
- `print:shadow-none`：去除阴影
- GradientText 打印时渐变→纯色蓝

## 样式约定

- 全局使用 Tailwind CSS utility class
- 自定义颜色：`sidebar-teal: #0f766e`（侧边栏背景）
- 系统字体栈，中文优先（`system-ui, -apple-system, ...`）
- 技能徽章：白色/橙色半透明背景 + 圆角
