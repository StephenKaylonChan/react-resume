---
name: handoff
description: |
  会话结束前生成交接文档。当用户说"生成交接文档"、"我要关闭了"、"记录一下进度"时使用。
argument-hint: ""
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
---

<task>
提交当前所有变更，更新项目路线图进度，然后生成结构化会话交接文档。
</task>

<workflow>

## Step 0: 收集当前状态

```bash
echo "=== 会话信息 ==="
date '+%Y-%m-%d %H:%M'
git log --oneline -10
git status --short
git diff --stat HEAD 2>/dev/null | tail -5
```

## Step 1: 提交当前变更

检查是否有未提交的变更（`git status --short` 有输出）。

**如果有未提交文件**，按以下步骤处理：

1. 精确 stage 变更文件（不用 `git add .`）：
   - 读取 `git status --short` 输出，识别已修改和新增文件
   - 排除 `.env`、`*.log`、`node_modules/`、`dist/` 等
   - 执行 `git add <具体文件列表>`

2. 分析变更内容，生成符合 Conventional Commits 规范的 commit message，尝试正常提交：
   ```bash
   git commit -m "<type>(<scope>): <subject>"
   ```

3. 根据结果：
   - **成功** → 记录"正常 commit: `<message>`"，继续 Step 2
   - **失败（测试不通过，exit code 2）** → 降级为 WIP 提交：
     ```bash
     git commit --no-verify -m "wip: <简要描述当前开发状态>"
     ```
     记录"WIP commit: `wip: <描述>`"，继续 Step 2

**如果没有未提交文件** → 记录"无变更"，直接跳到 Step 2。

## Step 2: 更新项目路线图

检查 `docs/roadmap/` 目录是否存在。

**如果存在**：

1. 读取 `docs/roadmap/README.md` 确定当前 Phase
2. 读取当前 Phase 文件
3. 根据本次会话完成的工作，**仅更新 checkbox 状态**：
   - 已完成的功能：`[ ]` → `[x] ✅ <日期>`
   - 开始进行中的功能：`[ ]` → `[-] 🏗️ <日期>`
4. 更新 README.md 中的进度统计
5. 如果当前 Phase 全部完成，将状态改为 `✅ 完成`

**重要**：只更新状态，**不添加新功能条目**。

**如果不存在** → 跳过此步骤。

**更新 Spec 状态**：检查 `docs/specs/` 中状态为"实施中"的 spec 文件。如果本次会话完成了 spec 中的全部功能，将状态更新为"已完成"。

**提交文档状态更新**：如果 Step 2 修改了 roadmap 或 spec 文件，单独提交：
```bash
git add docs/roadmap/ docs/specs/ 2>/dev/null
git commit -m "docs: 更新路线图和设计文档状态" 2>/dev/null || true
```

## Step 3: 生成交接文档

写入 `.claude/session-notes.md`：

```markdown
# 会话交接文档

**生成时间**: [当前时间]
**当前分支**: [git branch --show-current]

## 本次会话完成的工作

[总结这次会话完成了什么]

## 关键技术决策

[记录做了什么重要决策，为什么这样决定]

## 代码变更摘要

[git diff --stat HEAD 输出]

## 路线图进度

[当前 Phase 名称及进度，如："Phase 2 内容系统 0/4"]

## 设计文档状态

[如有活跃的 spec，注明文件名、状态和实施进度]

## 遗留问题 / 下次继续

[还没完成什么，下次从哪里接手]

## 注意事项

[有什么需要特别注意的，踩过的坑]

---
*下次会话运行 `/catchup` 恢复此上下文*
```

## Step 4: 确认

```
✅ 交接完成

提交状态: [正常 commit: <message> | WIP commit: wip: <描述> | 无变更]
路线图更新: [已更新 Phase X: N/M | 无 roadmap 目录，跳过]
交接文档: .claude/session-notes.md

下次会话运行 /catchup 可快速恢复上下文。
辛苦了！
```

</workflow>
