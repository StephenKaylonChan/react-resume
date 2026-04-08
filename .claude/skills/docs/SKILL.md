---
name: docs
description: |
  深度探索代码逻辑，梳理并更新开发文档（架构、上手指南、部署）。
  当用户说"更新文档"、"梳理架构"、"写一下开发文档"时使用。
  触发关键词：更新文档、梳理文档、docs、架构梳理、文档同步
argument-hint: "[architecture | frontend | getting-started | deployment | 空=全量]"
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, Agent
disable-model-invocation: true
---

<task>
深度探索项目代码，对比现有开发文档，增量更新。保持文档准确反映代码现状。
</task>

<workflow>

## Step 0: 确定范围

解析 `$ARGUMENTS`：

| 参数 | 更新范围 |
|------|---------|
| 无参数 | 全量：architecture + getting-started + deployment |
| `architecture` | `docs/architecture/` 全部（README + frontend.md） |
| `frontend` | `docs/architecture/frontend.md` |
| `getting-started` | `docs/development/getting-started.md` |
| `deployment` | `docs/development/deployment.md` |

```bash
mkdir -p docs/architecture docs/development
```

## Step 1: 变更锚定（增量检测基准）

确定"上次文档更新以来改了什么"：

```bash
# 找到最近一次文档更新的 commit
LAST_DOC_COMMIT=$(git log --oneline -- 'docs/architecture/' 'docs/development/' | head -1 | cut -d' ' -f1)

# 自那以后变更的源文件
echo "=== 变更文件 ==="
git diff --name-only $LAST_DOC_COMMIT..HEAD -- '*.js' '*.jsx' '*.css' 2>/dev/null | sort

# 新增的文件
echo "=== 新增文件 ==="
git diff --diff-filter=A --name-only $LAST_DOC_COMMIT..HEAD 2>/dev/null

# 最近 commit 摘要
echo "=== 变更摘要 ==="
git log --oneline $LAST_DOC_COMMIT..HEAD | head -30
```

**Step 2 的探索 MUST 覆盖所有有变更的模块**。

如果 `LAST_DOC_COMMIT` 找不到（首次运行），Step 2 做全量探索。

## Step 2: 深度探索代码

**架构相关**（architecture / frontend）：
- 扫描顶层目录结构和模块划分
- 读取组件目录结构，梳理分层和复用模式
- 识别数据流：App → 子组件 → 工具函数
- 梳理 PDF 导出链路
- 特别关注跨多文件才能串起来的逻辑

**上手指南相关**（getting-started）：
- 读取 package.json（依赖和脚本）
- 验证启动步骤是否仍然有效

**部署相关**（deployment）：
- 读取已有 docs/deployment.md
- 检查构建配置

## Step 3: 读取现有文档 + 变更覆盖检查

读取对应的现有文档文件（如存在），标记：
- ✅ 仍然准确的内容
- ⚠️ 需要更新的内容
- ❌ 已过时需删除的内容
- 🆕 代码中有但文档中缺失的内容

## Step 4: 增量更新

### `docs/architecture/README.md` — 架构总览（30-50 行）
- 顶层模块职责和边界
- 组件间依赖关系
- 数据流（App → Resume/Sidebar → GradientText/exportPDF）
- 关键技术选型一句话理由

### `docs/architecture/frontend.md` — 前端架构（50-100 行）
- 组件分层规则
- A4 布局系统
- 渐变色系统实现
- PDF 导出链路
- 打印样式策略

### `docs/development/getting-started.md` — 上手指南
- 环境要求
- 从 clone 到跑通的完整步骤
- 关键 URL

### `docs/development/deployment.md` — 部署文档
- 构建命令和输出
- 各平台部署步骤

**写入原则**：
- 写代码里看不出来的
- 写跨多文件才能串起来的逻辑链路
- 不写具体函数签名、props 列表
- 已有内容只增量更新

## Step 5: 提交

```bash
git add docs/architecture/ docs/development/
git commit -m "docs: 更新开发文档 — [更新范围描述]"
```

## Step 6: 输出报告

```
✅ 开发文档已更新

更新范围：[全量 / architecture / frontend / getting-started / deployment]

变更摘要：
- docs/architecture/README.md: [新建 / 更新 N 处 / 无变更]
- docs/architecture/frontend.md: [新建 / 更新 N 处 / 无变更]
- docs/development/getting-started.md: [新建 / 更新 N 处 / 无变更]
- docs/development/deployment.md: [新建 / 更新 N 处 / 无变更]
```

</workflow>
