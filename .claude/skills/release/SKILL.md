---
name: release
description: |
  Phase 完成系统性文档刷新。全量执行 /docs + 生成 Changelog + 检查 ADR + 更新 Phase 状态。
  触发关键词：release、发版、Phase 完成、阶段完成、系统性文档刷新
argument-hint: ""
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, Agent
disable-model-invocation: true
---

<task>
Phase 完成后的系统性文档刷新：全量执行 /docs（架构+上手+部署），生成 Changelog，检查 ADR，更新 Roadmap Phase 状态。
</task>

<workflow>

## Step 0: 确认 Phase 范围

- 查看 `docs/roadmap/README.md` 确认当前 Phase
- 查看当前 Phase 文件，确认所有功能是否已完成
- 如有未完成的功能条目，提醒用户确认是否继续

```bash
cat docs/roadmap/README.md
ls docs/roadmap/
```

## Step 1: 全量文档刷新（按 /docs Skill 完整流程）

执行 `/docs` Skill 的完整 6 步流程（MUST 包含变更锚定）：
1. **变更锚定**：`git diff` 定位上次文档更新以来的变更文件
2. **深度探索**：优先探索变更模块，再补充全量
3. **文档对比 + 变更覆盖检查**
4. **增量更新**：刷新 `docs/architecture/`、`getting-started.md`、`deployment.md`

## Step 2: 生成 Changelog

更新 `docs/development/changelog.md`（如不存在则新建）：

```bash
git log --oneline --no-merges --since="[Phase 开始日期]" | grep -E "^[a-f0-9]+ (feat|fix|perf|refactor)"
```

按 Keep a Changelog 格式生成：
- **Added**: feat 类型的提交
- **Fixed**: fix 类型的提交
- **Changed**: refactor/perf 类型的提交
- **Removed**: 删除功能的提交

## Step 3: 检查 ADR

检查本 Phase 是否有需要记录的架构决策：
- 是否引入了新的技术栈组件
- 是否有重大架构重构
- 是否有技术选型变更

如有，提示用户："检测到 [变更描述]，建议新增 ADR，是否创建？"

## Step 4: 更新 Roadmap Phase 状态

- 更新 docs/roadmap/README.md 中的 Phase 状态为 "✅ 完成"
- 更新进度统计

## Step 5: 提交所有文档变更

```bash
git add docs/
git commit -m "docs: Phase N [Phase名称] 完成 — 系统性文档刷新"
```

## Step 6: 输出 Release 报告

```
🎉 Phase N [Phase名称] 系统性文档刷新完成

文档更新摘要：
- 架构文档：✅ 已刷新 / ⏭️ 无变更
- 上手指南：✅ 已更新 / ⏭️ 无需更新
- 部署文档：✅ 已更新 / ⏭️ 无变更
- Changelog：✅ 新增条目
- ADR：✅ 新增 N 条 / ⏭️ 无需新增
- Roadmap：✅ Phase N 标记为完成

下一步建议：
- git push 推送更新
- /deep-audit 全面代码审计
- 开始规划 Phase N+1
```

</workflow>
