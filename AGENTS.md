# Repository Guidelines

## 项目结构与模块组织
- `src/` 存放 React 代码：`components/` 负责版面（A4Page、Resume*、Sidebar），`utils/exportPDF.js` 封装导出逻辑，`index.css` 承载 Tailwind 全局样式。
- `assets/` 放本地素材；`public/` 提供公共资源（如 `resume_avatar.JPG`）。
- `resume-content/` 是简历内容的权威源 Markdown，更新文案后同步到 JSX。
- `docs/` 收录架构、样式、渐变与 PDF 导出方案，功能改动时一并维护。
- 产物输出到 `dist/`（已忽略）；核心配置在 `vite.config.js`、`tailwind.config.js`、`eslint.config.js`。

## 构建、测试与开发命令
- `npm install`：首次安装依赖。
- `npm run dev`：启动 Vite（默认 http://localhost:5173），实时调试版式与导出。
- `npm run build`：生成生产包到 `dist/`，发布前必跑。
- `npm run preview`：本地预览构建结果，模拟托管环境。
- `npm run lint`：运行 ESLint（JS/JSX + hooks + refresh 规则），提交前需清零告警。

## 代码风格与命名约定
- ES Module，2 空格缩进，分号，单引号，优先 `const`/`let`。
- 组件/文件用 PascalCase（如 `A4Page.jsx`），自定义 Hook 以 `use` 开头。
- Tailwind 采用显式类名，勿动态拼接渐变或尺寸，需保持与 `tailwind.config.js`、`GradientText` 映射一致。
- 保留 A4 相关 token（`width/height a4`、`spacing.a4-padding`），避免无必要的行内样式。

## 测试与验证指南
- 暂无自动化测试；默认流程：`npm run lint` → `npm run build`。
- 手动检查（`npm run dev`）：左右栏对齐、渐变文字渲染、工具栏导出 PDF 成功、打印视图隐藏 `print:hidden` 元素、移动端宽度折行正常。
- 编辑 `resume-content/` 时同步 JSX，核对联系信息、链接与排版。

## 安全与配置提示
- 建议使用 Node 18+ 且保持与 `package-lock.json` 一致的 npm 版本；不要混用 pnpm/yarn 以避免锁文件漂移。
- PDF 导出依赖 `document` 环境，确保 `resume-content` 的 DOM `id` 不被改动；动态样式可能影响 html-to-image 兼容性，新增渐变需同步更新 Tailwind 配置与 `GradientText` 映射。
- 图片放在 `public/` 时注意尺寸与清晰度，A4 页面导出时优先 300DPI 以内以控制文件体积。
- 配置变更（Vite、Tailwind、ESLint）请更新对应 `docs/`，并在 PR 说明里标明影响面。

## Commit 与 Pull Request 规范
- 使用 Conventional Commits（示例：`feat: ...`、`fix: ...`、`docs: ...`、`style: ...`、`refactor: ...`），从 `main` 派生分支。
- PR 需包含：简洁描述、影响范围（如 `Resume`、`ResumeSidebar`、`exportPDF` 等）、执行过的命令及结果、UI 变更的前后截图或 PDF 片段，并附上改动的 `docs/` 或 `resume-content/` 链接。
