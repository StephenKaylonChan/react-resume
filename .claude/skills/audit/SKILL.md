---
name: audit
description: |
  项目健康检查。当需要检查代码质量、依赖安全、文档同步状态时使用。
  触发关键词：健康检查、audit、代码质量检查、依赖检查
argument-hint: "[--quick | --full | --security | --docs]"
allowed-tools: Read, Bash, Grep, Glob
disable-model-invocation: true
---

<task>
对项目进行健康检查，根据参数决定检查深度。
</task>

<workflow>

## Step 0: 获取基本信息

```bash
echo "=== 项目审计 $(date '+%Y-%m-%d %H:%M') ==="
echo "--- 最近 5 个 commit ---"
git log --oneline -5
echo "--- 未提交文件 ---"
git status --short | head -20
```

## Step 1: 解析参数

| 参数 | 检查范围 | 适用场景 |
|------|---------|---------|
| `--quick` | Git 状态 + CLAUDE.md 行数 | 每天快速检查 |
| 无参数 | 代码质量 + 依赖 + 文档同步 | 每周常规 |
| `--full` | 全部 + 构建测试 | 大版本发布前 |
| `--security` | 安全漏洞 + 敏感信息扫描 | 上线前 |
| `--docs` | 文档与代码同步深度检查 | Phase 完成后 |

## Step 2: Quick 模式检查

```bash
# CLAUDE.md 行数（超过 200 行需要拆分）
wc -l CLAUDE.md 2>/dev/null || echo "CLAUDE.md 不存在"

# 未提交文件数量
git status --short | wc -l
```

## Step 3: 标准模式检查（无参数）

**代码质量**：
```bash
# ESLint 检查
npm run lint 2>&1 | tail -5

# TODO/FIXME 统计
grep -r "TODO\|FIXME\|HACK\|XXX" src/ --include="*.js" --include="*.jsx" | wc -l
```

**依赖健康**：
```bash
# 过时依赖
npm outdated 2>/dev/null | head -20

# 安全漏洞
npm audit --audit-level=high 2>&1 | tail -10
```

**文档同步**：
- CLAUDE.md 是否在 200 行以内？
- 技术栈版本是否与 package.json 一致？
- .claude/rules/ 路径是否仍然有效？
- docs/roadmap/ 是否存在？当前 Phase 文件是否与 CLAUDE.md 中的 `@` 引用一致？
- docs/specs/ 中是否有状态为"实施中"超过 2 周且无相关 commit 的 spec？

## Step 4: Full 模式额外检查（--full）

```bash
# 前端构建
npm run build 2>&1 | tail -5
```

## Step 5: Security 模式（--security）

```bash
# 扫描硬编码密钥
grep -r "password\|secret\|api_key\|token" src/ --include="*.js" --include="*.jsx" \
  -i | grep -v "test\|spec\|example\|.env" | head -10

# .env 是否在 .gitignore
grep "^\.env" .gitignore || echo "⚠️ .env 可能未被忽略"
```

## Step 6: 输出审计报告

```
## 📋 项目审计报告

**时间**: [当前时间]
**模式**: [quick/标准/full/security/docs]

### 总览
| 维度 | 状态 | 说明 |
|------|------|------|
| 代码质量 | ✅/⚠️/❌ | [ESLint errors/warnings 数量] |
| 依赖健康 | ✅/⚠️/❌ | [过时依赖数] |
| 文档同步 | ✅/⚠️/❌ | [CLAUDE.md 行数] |
| Git 状态 | ✅/⚠️/❌ | [未提交文件数] |

### 🔴 需要立即处理
[列出 Critical 问题]

### 🟡 建议本周处理
[列出 Warning 问题]

### 🎯 行动建议（优先级排序）
1. [最重要的问题]
2. [次要问题]
```

</workflow>
