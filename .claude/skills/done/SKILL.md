---
name: done
description: |
  智能收尾检查。用户描述完成了什么功能，自动匹配 Roadmap/Spec 并更新状态。
  触发关键词：功能完成、收尾检查、done、wrap up、Phase 完成
argument-hint: "<完成了什么功能的描述>"
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
disable-model-invocation: true
---

<task>
智能收尾检查：根据用户描述的完成内容，执行代码验证 + Roadmap/Spec 状态更新 + 代码审查。
</task>

<workflow>

## Step 0: 解析完成范围

读取 `$ARGUMENTS`，确定刚完成了什么。

**有描述**（推荐）：根据用户描述匹配 `docs/roadmap/` 中的条目和 `docs/specs/` 中的文件。

```bash
# 辅助信息
git log --oneline -5
git diff --stat HEAD~3
```

**无描述**：查看最近 git log 和 diff 推断（不推荐，可能不准确）。

如果匹配不到明确的 roadmap 条目或 spec 文件，**直接询问用户确认**，不要猜测跳过。

## Step 1: 代码验证

运行项目的测试和 lint 命令：

```bash
npm run lint
npm run build
```

检查项：
- [ ] Lint 无 error
- [ ] 构建成功
- [ ] 边界条件已考虑
- [ ] 改动不影响现有功能
- [ ] PDF 导出和打印样式不受影响

## Step 2: Roadmap 更新

如果 `docs/roadmap/` 存在：

```bash
ls docs/roadmap/
```

- 找到当前功能对应的 Phase 文件
- 将对应的 checkbox 从 `- [ ]` 改为 `- [x] ✅ YYYY/MM/DD`
- 更新 `docs/roadmap/README.md` 中的进度统计

## Step 3: Spec 状态智能检测

如果 `docs/specs/` 存在，找到关联的 spec 文件：

```bash
grep -rl "status: implementing" docs/specs/ 2>/dev/null
```

读取 spec 文件，检查 Implementation Phases 的完成情况：

### 情况 A：Spec 有 Implementation Phases
检查当前 `active_phase` 对应的 Phase：
- 所有 Tasks 是否已勾 `[x]`？
- Gate 条件是否全部满足？

**如果当前 Phase 的 Gate 通过**：
1. 更新 spec frontmatter 的 `active_phase` → 下一个 Phase
2. 检查是否所有 Phase 都已完成
   - **否** → 记录"Spec Phase N 完成，进入 Phase N+1"
   - **是** → 进入 Step 3b

### 情况 B：Spec 无 Implementation Phases
直接进入 Step 3b

### Step 3b: Spec 完全完成时的额外动作
1. 将 frontmatter `status` 更新为 `implemented`
2. 更新 `updated` 日期
3. 提示用户：建议执行 `/docs` 刷新开发文档

## Step 4: 代码审查

运行 `/simplify` 进行三维并行审查（如果本次还未运行过）。

## Step 5: Roadmap Phase 完成检测

检查当前 Roadmap Phase 的所有功能是否都已完成：

- **否** → 记录"Roadmap Phase N 还剩 [M] 个功能未完成"
- **是** → 建议执行 `/release` 进行系统性文档刷新

## Step 6: 提交文档变更

如果 Step 2-3 产生了文档更新：

```bash
git add docs/
git commit -m "docs: 更新 [功能名] 的 roadmap 和 spec 状态"
```

## Step 7: 输出状态汇总

**单功能完成**：
```
✅ 功能收尾完成

功能：[用户描述的功能]
代码验证：✅ Lint 通过 | ✅ 构建通过
Roadmap：✅ Phase N — [条目] 已勾选 / ⏭️ 无关联条目
Spec：✅ Phase [M/N] 完成 / ⏭️ 无关联 Spec
代码审查：✅ /simplify 已执行

下一步：继续实施 / 继续下一个功能
```

**Roadmap Phase 全部完成**：
```
🎉 Roadmap Phase N 全部完成！

所有功能已完成，所有 Spec 已 implemented。
建议执行 /release 进行系统性文档刷新。
```

</workflow>
