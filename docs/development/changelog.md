# Changelog

所有重要变更记录。格式遵循 [Keep a Changelog](https://keepachangelog.com/)。

## [未发布]

### Added
- 项目初始化：React 19 + Vite 7 + Tailwind CSS 3.4
- A4 精确排版（210mm × 297mm）两栏布局
- 17 个技术关键词渐变色系统
- PDF 导出（html-to-image + html2canvas 双重策略）
- 打印优化样式
- 高清 PNG 图片导出功能（html-to-image 3x pixelRatio）
- Markdown 文档导出功能（合并 resume-content/ 源文件）
- 全组件 PropTypes 验证
- 技术文档 + 代码健康诊断报告

### Changed
- GradientText 渐变样式统一由 CSS class 控制（移除 style={{}}）
- html2canvas 改为动态 import 按需加载
- Vite manualChunks 拆分 PDF 依赖，主 chunk 825KB → 227KB

### Refactored
- 提取 BulletItem、SkillBadge、SectionTitle 子组件消除重复代码
- 提取 createAndSavePDF 公共函数消除 PDF 生成逻辑重复
- ContactIcon icons 对象、gradientClasses 映射移到组件外部

### Removed
- 13 个未使用的渐变色定义
- Vite 脚手架残留文件（react.svg）
- 无用 @types/react、@types/react-dom 依赖
