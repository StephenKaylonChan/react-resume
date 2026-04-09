# Changelog

所有重要变更记录。格式遵循 [Keep a Changelog](https://keepachangelog.com/)。

## [v2.0.1] — 2026-04-09

### Fixed
- `resume-content/*.md` 内容同步至 v2.2（修复 Markdown 导出产物仍为 v1.0 旧内容）

## [v2.0] — 2026-04-08

### Added
- Teal 头部色带 + 单栏正文布局（替代两栏侧边栏）
- 简历内容 v2.2：AI 应用开发工程师定位，4 个项目（市场情报 + YDC + YOMY + 个人网站）
- 18 种技术关键词渐变色（新增 nextjs/typescript/docker/echarts/nginx/embedding/turborepo）
- 高清 PNG 图片导出功能
- Markdown 文档导出功能
- `exportConfig.js` 共享 toPng 配置
- `output/` 导出产物目录
- 全组件 PropTypes 验证
- 代码健康诊断报告

### Changed
- 布局：两栏 CSS Grid 侧边栏 → Teal 头部色带 + Flex 单栏
- 职位定位：全栈开发工程师 → AI 应用开发工程师 | LLM 集成
- 英文名：Kaylon Chan → Stephen K. Chan
- GitHub：isabellakiko → StephenKaylonChan
- 技能分类：4 方向（AI/LLM · 后端 · 前端 · 基础设施）
- GradientText 渐变样式统一由 CSS class 控制（移除 style={{}}）
- html2canvas 改为动态 import 按需加载
- Vite manualChunks 拆分 PDF 依赖，主 chunk 825KB → ~222KB

### Fixed
- exportPDF.js styleElement 泄漏（toPng 异常时临时样式未清理）
- img.onload 缺少 onerror 错误处理

### Refactored
- 提取 BulletItem、SkillBadge、SectionTitle 子组件消除重复代码
- 提取 createAndSavePDF 公共函数消除 PDF 生成逻辑重复
- gradientClasses 映射移到组件外部

### Removed
- ResumeSidebar.jsx（布局重构后废弃）
- 甘肃实习经历、学习成果/技术社区/兴趣板块
- 未使用的渐变色定义（html5/javascript/chatgpt/claude/opencv/pandas 等）
- Vite 脚手架残留文件、无用 @types 依赖
- 8 个冗余/过时文档（-2707 行）

## [v1.0] — 2026-04-08

### Added
- 项目初始化：React 19 + Vite 7 + Tailwind CSS 3.4
- A4 精确排版（210mm × 297mm）两栏布局
- 29 个技术关键词渐变色系统
- PDF 导出（html-to-image + html2canvas 双重策略）
- 打印优化样式
