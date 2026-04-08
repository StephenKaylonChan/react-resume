# 架构总览

## 模块划分

React Resume 是单页应用（SPA），采用组件化架构，无后端依赖。

```
src/
├── App.jsx              ← 应用入口：工具栏（PDF/图片/Markdown 导出 + 打印）+ A4Page 容器
├── components/
│   ├── A4Page.jsx       ← 布局容器：Teal 头部色带 + 白色正文区，固定 210mm × 297mm
│   ├── ResumeHeader.jsx ← Teal 头部：头像 + 姓名 + 联系方式 + 4 方向技能 badges
│   ├── Resume.jsx       ← 正文区：简介/工作/项目×4/教育（含 SectionTitle、BulletItem 子组件）
│   └── GradientText.jsx ← 渐变文字：18 种技术关键词渐变色映射
├── utils/
│   ├── exportPDF.js     ← PDF 导出：html-to-image 主策略 + html2canvas 动态降级
│   ├── exportImage.js   ← PNG 图片导出：html-to-image 高清截图
│   ├── exportMarkdown.js← Markdown 导出：合并 resume-content/ 源文件下载
│   └── exportConfig.js  ← 共享配置：toPng options（exportPDF/exportImage 共用）
└── index.css            ← 全局样式 + Tailwind 指令 + 打印媒体查询
```

## 数据流

```
App (isExporting state)
 ├── Toolbar
 │    ├── 导出 PDF     → exportToPDF()      → html-to-image → jsPDF → .pdf 下载
 │    ├── 导出图片     → exportToImage()     → html-to-image → .png 下载
 │    ├── 导出 Markdown → exportToMarkdown() → 合并 MD 源文件 → .md 下载
 │    └── 打印         → window.print()
 └── A4Page (header={<ResumeHeader />})
      ├── header: ResumeHeader → 头像 + 姓名 + 联系方式 + SkillBadge 技能标签
      └── children: Resume → SectionTitle + BulletItem + GradientText 渐变词
```

内容目前硬编码在 JSX 中，`resume-content/` 目录的 Markdown 文件作为内容管理参考源，同时被 Markdown 导出功能通过 Vite `?raw` import 引用。

## 关键技术决策

- **Teal 头部色带 + 单栏正文**（非两栏侧边栏）：解决侧栏内容不足导致的空白不对等问题，ATS 解析更友好
- **Tailwind 自定义 theme 渐变**（非动态 class 拼接）：JIT 编译器不支持运行时动态 class 名
- **html-to-image 优先**（非 html2canvas）：能保留 CSS 渐变效果
- **html2canvas 动态 import**：仅降级时加载，减小主 bundle 体积
- **toPng 共享配置**（exportConfig.js）：PDF 和图片导出共用同一套 options，防止配置漂移
- **manualChunks 拆分**：PDF 依赖独立 chunk，主 chunk 控制在 ~222KB
- **无状态管理库**：纯展示型应用，React state 已足够
