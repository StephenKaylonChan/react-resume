---
name: deep-audit
description: |
  全面深度审计，逐文件检查代码与文档一致性，自动修复并提交。
  Phase 完成后、大版本发布前使用。
argument-hint: "[--no-fix | --no-push]"
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
disable-model-invocation: true
---

<task>
执行全面深度审计：扫描所有代码文件和文档，识别不一致，自动修复，提交变更。

**默认行为**：审计 → 修复 → 提交
**参数**：
- `--no-fix`: 仅审计报告，不修复
- `--no-push`: 修复并提交，但不推送
</task>

<workflow>

## Step 0: 初始化

```bash
AUDIT_DATE=$(date +%Y-%m-%d)
AUDIT_TIME=$(date +%H:%M)
echo "=== 深度审计开始 $AUDIT_DATE $AUDIT_TIME ==="
```

## Step 1: 变更摘要 + 代码结构扫描

先定位"上次审计以来改了什么"，再全量扫描：

```bash
# 最近变更摘要（优先扫描这些区域）
echo "=== 最近 30 个 commit ==="
git log --oneline -30
echo "=== 变更密集的文件 ==="
git log --since="1 month ago" --name-only --pretty=format: | sort | uniq -c | sort -rn | head -20
echo "=== 新增的文件 ==="
git log --since="1 month ago" --diff-filter=A --name-only --pretty=format: | sort -u
```

然后全量扫描所有源文件，记录实际状态：

```bash
# 前端文件统计
find src -name "*.jsx" -o -name "*.js" | wc -l
find src/components -name "*.jsx" | sort

# 所有文档文件
find . -name "*.md" -not -path "*/node_modules/*" | sort
```

**审计优先级**：Step 2-3 MUST 优先检查上方标记的变更密集区域和新增文件。

## Step 2: 文档系统检查

逐一读取并验证：

- `CLAUDE.md`：行数是否 < 200？内容是否准确？
- `.claude/rules/`：路径 glob 是否仍然匹配实际文件？
- `docs/roadmap/`：各 Phase 功能描述是否准确反映代码现状？README.md 进度统计是否正确？
- `docs/specs/`：各 spec 状态是否正确？
- `docs/architecture/README.md`：架构认知地图是否与代码现状一致？
- `docs/development/`：部署文档和上手指南是否与代码同步？

## Step 3: 对比分析

**组件 vs 文档**：
- 实际组件数 vs 文档记录数
- 找出文档缺失的组件

**package.json vs CLAUDE.md**：
- 实际依赖版本 vs CLAUDE.md 声明的版本

## Step 4: 识别问题，按优先级分类

```
P0 - 严重（立即修复）:
1. CLAUDE.md 内容与代码不符
2. 安全漏洞或硬编码密钥

P1 - 中等（今日修复）:
1. 文档缺失的组件
2. 版本声明不一致

P2 - 轻微（本周修复）:
1. 冗余文档内容
2. 过期的注释
```

## Step 5: 生成审计报告

写入 `docs/reports/deep-audit-$AUDIT_DATE.md`

## Step 6: 执行修复（除非 --no-fix）

按 P0 → P1 → P2 顺序修复：
- 更新 CLAUDE.md
- 更新 .claude/rules/
- 更新 docs/ 各文档

## Step 7: 提交（除非 --no-push）

```bash
git add .
git commit -m "docs: 深度审计与自动优化 $AUDIT_DATE

- 修复 P0 问题: [数量] 处
- 修复 P1 问题: [数量] 处
- 生成审计报告: docs/reports/deep-audit-$AUDIT_DATE.md

🤖 Generated with Claude Code"

# 如果没有 --no-push 参数
git push
```

## Step 8: 输出完成报告

```
═══════════════════════════════════
✅ 深度审计完成
═══════════════════════════════════

📊 扫描统计:
├── 代码文件: [X] 个
├── 文档文件: [X] 个
└── 检查项目: [X] 项

🔧 修复统计:
├── P0 严重: [X] 处 ✅
├── P1 中等: [X] 处 ✅
└── P2 轻微: [X] 处 ✅

📝 报告: docs/reports/deep-audit-$AUDIT_DATE.md
⏰ 下次建议: 下一个 Phase 完成后
═══════════════════════════════════
```

</workflow>
