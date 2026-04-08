---
name: task
description: |
  处理不需要 Spec 的日常小任务（小功能、小 Bug、功能微调、技术改进）。
  当用户有明确的小改动需求，不需要多轮讨论时使用。
  支持批量模式：`/task` 无参数时进入批量模式。
  触发关键词：小需求、快速修复、改一下、调整、小 bug
argument-hint: "<任务描述> 或留空进入批量模式"
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, Agent
---

<task>
评估并执行日常小任务，确保质量的同时避免过度流程。
</task>

<workflow>

## Step 0: 接收任务

**单任务模式**（有参数）：
- `/task 列表页加排序功能`
- 直接进入 Step 1

**批量模式**（无参数）：
- 询问用户要处理哪些任务
- 用户列出编号列表
- 按顺序逐个处理，每个走完整 Step 1-4 后独立 commit

## Step 1: 评估复杂度

快速判断任务规模：

| 信号 | 判断 | 动作 |
|------|------|------|
| 需要多轮讨论才能明确需求 | 太大 | 建议 `/spec` |
| 涉及架构变更或新模块 | 太大 | 建议 `/spec` |
| 改动预估 > 5 个文件 | 偏大 | 提醒用户确认，或建议 `/spec` |
| 改动范围可预估，方向明确 | 合适 | 继续执行 |
| 能一句话描述改动 | 合适 | 继续执行 |

如果判断太大，输出：
"这个任务涉及 [原因]，建议用 `/spec` 先讨论设计再实施。要继续还是切到 /spec？"

用户坚持继续 → 继续执行（尊重用户判断）。

## Step 2: 按复杂度执行

根据评估结果选择开发循环：

**简单**（1-2 文件，改动明确）：
→ Code → Verify → Commit

**中等**（3-5 文件，方向明确）：
→ Explore → Code → Verify → Commit

**Bug 修复**：
→ Explore（复现+定位）→ Code（回归测试+修复）→ Verify → Commit

遵循项目 CLAUDE.md 中的完成标准和编码红线。

## Step 3: 验证

- 运行 `npm run lint`，确认通过
- 运行 `npm run build`，确认构建成功
- 确认 PDF 导出和打印样式不受影响
- 回归验证（确认不影响现有功能）

## Step 4: 提交

- commit message 使用 Conventional Commits（`feat:`/`fix:`/`refactor:`/`chore:`）
- message 包含足够上下文（改了什么、为什么）
- 如果任务关联 Roadmap 条目 → 提醒用户是否更新 checkbox

**不需要 /done**：小任务的 commit message 即文档。

## Step 5: 下一个（批量模式）

批量模式下，每完成一个任务：
- 报告完成状态
- 自动开始下一个
- 全部完成后输出汇总

## 输出格式

**单任务完成**：
```
✓ [hash] fix(resume): 修复日期格式显示不正确
  改动: src/components/Resume.jsx
```

**批量完成汇总**：
```
✅ 完成 3/4 个任务：
1. ✓ [hash] feat(sidebar): 添加技能排序
2. ✓ [hash] fix(pdf): 修复导出清晰度
3. ✓ [hash] chore: 更新依赖版本
4. ⏭️ 跳过 — 建议用 /spec（涉及新增模块）
```

</workflow>
