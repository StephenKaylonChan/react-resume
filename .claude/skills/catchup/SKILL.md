---
name: catchup
description: |
  执行 /clear 后快速恢复工作上下文。
  当用户说"重新开始"、"清空后需要继续"、"帮我恢复上下文"时使用。
argument-hint: ""
allowed-tools: Read, Bash, Glob
---

<task>
快速恢复工作上下文，让我们继续之前的工作。
</task>

<workflow>

## Step 0: 获取当前状态

```bash
echo "=== 当前状态 $(date '+%Y-%m-%d %H:%M') ==="
git log --oneline -5
echo "--- 修改的文件 ---"
git status --short
echo "--- 未推送 commit ---"
git log --oneline @{u}.. 2>/dev/null || echo "（无法获取，可能没有追踪分支）"
```

## Step 1: 读取关键文件

依次读取（按重要性）：
1. `CLAUDE.md`（项目规范）
2. `.claude/session-notes.md`（如果存在，是压缩前保存的进度）
3. `docs/architecture/README.md`（如果存在，项目架构认知地图）
4. `docs/roadmap/README.md`（如果存在，项目整体进度）
5. 当前 Phase 文件（从 README.md 中确定当前 Phase，读取对应文件）
6. `docs/specs/` 中状态为"实施中"或"已确认"的 spec 文件（如有）
7. 最近修改的源文件（`git diff HEAD~3 --name-only` 列出的文件）

## Step 2: 输出恢复摘要

```
✅ 上下文已恢复

## 项目: [项目名称]
**技术栈**: [从 CLAUDE.md 获取]

## 项目路线图
[当前 Phase 名称及进度，如："Phase 2 内容系统 0/4"]
[列出当前 Phase 中进行中和待办的条目]

## 当前设计文档
[如有状态为"实施中"或"已确认"的 spec，列出文件名和概要]

## 最近工作
[最近 5 个 commit 摘要]

## 修改中的文件
[git status --short 输出]

## 下一步建议
[根据 session-notes.md + 路线图当前 Phase 的待办项推断]

---
**准备好继续了。我们从哪里开始？**
```

</workflow>
