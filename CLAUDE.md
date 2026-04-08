# React Resume

> React 19 个人简历单页应用，支持 A4 精确排版、多格式导出（PDF/PNG/Markdown）和打印优化。

## 项目结构

- `src/components/` — React 组件（A4Page, GradientText, Resume, ResumeHeader, ResumeSidebar）
- `src/utils/` — 导出工具（exportPDF.js, exportImage.js, exportMarkdown.js）
- `resume-content/` — Markdown 简历内容源文件（同时被 Markdown 导出引用）
- `docs/` — 开发文档、架构决策、项目路线图、诊断报告
- `public/` — 静态资源（头像照片）

## 常用命令

```bash
npm install           # 安装依赖
npm run dev           # 启动开发服务器（http://localhost:5173）
npm run build         # 生产构建
npm run lint          # ESLint 代码检查
npm run preview       # 预览生产构建
```

## 技术栈

- **前端**: React 19.2, Vite 7.2, Tailwind CSS 3.4
- **多格式导出**: html-to-image 1.11（PDF + PNG）, html2canvas 1.4（降级）, jsPDF 3.0
- **代码质量**: ESLint 9.39（无 Prettier、无 TypeScript）
- **包管理**: npm

## 开发约束

- MUST 提交前运行 `npm run lint`，lint 不通过禁止提交
- MUST 提交前运行 `npm run build`，构建失败禁止提交
- MUST NOT 硬编码密钥、密码或敏感配置
- MUST NOT 修改 A4 精确尺寸（210mm × 297mm）除非明确要求
- MUST NOT 破坏 PDF 导出的双重降级策略（html-to-image → html2canvas）
- MUST NOT 自造已有成熟库的功能
- SHOULD 每个 PR 只做一件事，保持 diff 可读

## 编码红线（任何场景，包括修 Bug，MUST NOT 违反）

- MUST NOT 复制现有函数并微调来修复问题，MUST 修改原函数或提取公共逻辑
- MUST NOT 绕过现有组件/工具函数封装，直接实现重复功能
- MUST NOT 引入临时方案（hardcode、magic number、TODO hack）

> 技术栈专属红线放 `.claude/rules/`，按路径自动加载。

## 完成标准

功能实现后，MUST 按顺序完成以下验证再报告"完成"：

### 代码验证
1. 运行 `npm run lint`，无 error
2. 运行 `npm run build`，构建成功
3. 检查边界条件：空值、异常输入
4. 确认改动不影响现有功能（回归验证）
5. 确认 PDF 导出和打印样式不受影响

### 文档同步（功能完成时）
6. 更新 `docs/roadmap/` 对应条目的 checkbox 状态
7. 如有关联 Spec：
   - Spec 有 Implementation Phases → 更新 `active_phase`（仅当前 Phase 完成时）
   - Spec 所有 Phase 完成 → 更新 status 为 `implemented`
   - Spec 无 Phases → 直接更新 status 为 `implemented`
8. 确认代码注释反映最终实现

### Spec 实施自检（基于 spec 开发时）
9. 每完成一个 task → 在 spec 文件中勾选 `[x]`
10. 当前 Phase 所有 Tasks 勾完 → 逐条检查 Gate 条件
11. Gate 全通过 → 更新 spec frontmatter 的 `active_phase`，提醒执行 `/done`
12. `/done` 检测：Spec 是否全部完成、Roadmap Phase 是否全部完成

## Git 提交规范

```
<type>(<scope>): <subject>

type: feat | fix | docs | refactor | perf | test | chore
示例: feat(pdf): 优化 PDF 导出图片清晰度
```

## 关键架构决策

- 布局方案：CSS Grid 两栏 `[1fr_250px]`（非 Flexbox，A4 精确尺寸需要）
- 渐变色实现：Tailwind 自定义 theme + 显式 class 映射 + CSS class 控制样式（非动态拼接，禁止 style={{}}）
- 多格式导出：PDF（html-to-image 优先 + html2canvas 动态降级）、PNG（html-to-image）、Markdown（合并源文件）
- 构建优化：manualChunks 拆分 PDF 依赖，html2canvas 动态 import 按需加载
- 样式方案：Tailwind CSS utility-first（非 CSS Modules / styled-components）
- 详细 ADR 记录见 `docs/architecture/adr/`

## 引用文档

@docs/architecture/README.md
@docs/roadmap/README.md
@docs/roadmap/phase-2-内容系统.md
