---
paths:
  - "src/**/*.jsx"
  - "src/**/*.js"
---

## 前端红线（修 Bug 时同样适用）

- MUST NOT 使用 style={{}}，MUST 使用 Tailwind CSS utility class
- MUST NOT 在组件内定义一次性工具函数，MUST 提取到 utils/
- MUST NOT 直接操作 DOM（querySelector 等），MUST 使用 React ref
- MUST NOT 破坏 A4 精确尺寸（210mm × 297mm）
- MUST NOT 修改 GradientText 渐变色映射对象时遗漏新增的渐变色 key

## 前端规范

- MUST 使用函数式组件（禁止 class 组件）
- MUST 保持 Tailwind CSS utility-first 风格
- SHOULD 组件文件不超过 200 行，超过则拆分
- 命名：组件 PascalCase，文件名与组件名一致
- PDF 导出相关改动 MUST 验证 html-to-image 和 html2canvas 两种策略均正常
