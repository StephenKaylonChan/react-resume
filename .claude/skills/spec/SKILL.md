---
name: spec
description: |
  将讨论成果整理为结构化设计文档。当需求讨论、技术方案探讨、UI 设计讨论到一定程度时使用。
  触发关键词：整理讨论、写 spec、保存设计、记录方案、整理成文档
argument-hint: "[功能名称]"
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
disable-model-invocation: true
---

<task>
将当前对话中的讨论成果整理为结构化设计文档，写入 docs/specs/ 目录。
如果目标文件已存在，执行增量更新（合并新内容，保留已有内容）。

重点：输出的 spec 必须包含可追踪的实施计划（Implementation Phases），每个 Phase 独立可交付、独立可验证。
</task>

<workflow>

## Step 0: 确定文件名和模式

- 如果提供了参数（如 `/spec user-auth`），用参数作为文件名（kebab-case）
- 如果没有参数，根据讨论主题自动命名
- 检查 `docs/specs/<name>.md` 是否已存在：
  - **已存在** → 增量更新模式（读取现有内容，合并新讨论成果）
  - **不存在** → 新建模式

```bash
mkdir -p docs/specs
```

## Step 1: 收敛讨论成果

回顾当前对话，**先归纳共识与分歧**，再提取内容：

### 1a. 共识与分歧梳理

在整理前，先输出一段简要总结：

```
📋 讨论收敛总结：
✅ 已达成共识：[列出 2-5 条核心决定]
⚠️ 待确认/分歧：[列出尚未敲定的点，如有]
```

如有待确认项，询问用户是否现在确认，或标记为 draft 后续再定。

### 1b. 提取讨论内容

按需提取（不强制全部有）：

- 功能背景与目标
- 需求要点和验收标准
- 讨论过的方案及取舍理由
- 最终确定的设计方案
- UI/交互设计细节
- API 设计
- 数据模型设计
- 业务逻辑和处理流程
- 调研发现
- 约束条件和注意事项

## Step 2: 规划实施阶段

将功能拆分为 **2-5 个 Implementation Phases**，每个 Phase 必须满足：

- **独立可交付**：完成后有可验证的产出
- **独立可验证**：有明确的 Gate 条件可以检查
- **上下文友好**：单个 Phase 的实施不超过一个上下文窗口

Phase 拆分原则：
- 数据层 → 逻辑层 → UI 层
- 或按功能模块独立拆分
- 简单功能（预估 < 30 分钟）可以只有 1 个 Phase

## Step 3: 写入/更新 Spec 文件

**新建模式** — 写入 `docs/specs/<name>.md`：

```markdown
---
title: [功能名称]
status: draft
created: YYYY-MM-DD
updated: YYYY-MM-DD
phase: phase-N
total_phases: 3
active_phase: 1
---

# [功能名称] 设计文档

## 背景与目标

[为什么要做这个功能，解决什么问题]

## 需求概要

[核心功能点，验收标准]

## 设计方案

### 讨论过的方案

[方案 A vs B vs C，各自优缺点，最终选择理由]

### 最终方案

[确定的技术/设计方案]

## 详细设计

（以下模块按需包含，没有的不写）

### UI/交互设计

[页面布局、组件、交互流程]

### 数据模型

[数据结构、Schema 定义]

### 业务逻辑

[核心处理流程、边界情况]

## 约束与注意事项

[性能要求、兼容性、已知限制]

## Implementation Phases

### Phase 1: [阶段名称]
**Tasks**:
- [ ] [具体任务 1]
- [ ] [具体任务 2]

**Gate（全部满足才算完成）**:
- [ ] 所有 Tasks 已勾选
- [ ] 相关测试通过
- [ ] 无 lint errors

**On Complete**: 更新 active_phase → 2，建议执行 /done

### Phase 2: [阶段名称]
**Tasks**:
- [ ] [具体任务 1]
- [ ] [具体任务 2]

**Gate**:
- [ ] 所有 Tasks 已勾选
- [ ] 构建通过
- [ ] 与 Phase 1 集成验证通过

**On Complete**: 所有 Phase 完成，建议执行 /done + /release（如当前 Roadmap Phase 也完成）
```

**增量更新模式** — 读取已有文件，将新讨论成果合并到对应模块：
- 保留已有内容不删除
- 新增内容融入对应章节
- 更新 frontmatter 中的 `updated` 日期
- Implementation Phases 已完成的 Phase 保留 `[x]` 状态不动

## Step 4: 检查 ROADMAP 关联

如果 `docs/roadmap/` 存在：
- 检查当前 spec 对应的功能是否在 ROADMAP 中有对应条目
- 如有 → 在 spec 头部填写关联信息
- 如无 → 提示用户是否需要添加到 ROADMAP

## Step 5: 判断状态

根据讨论充分程度判断 frontmatter 中的 `status`：
- `draft`：讨论还在进行中
- `approved`：核心方案已确定，可以开始实施

**完整状态生命周期**：
```
draft → approved → implementing → implemented → [deprecated | superseded]
```

## Step 6: 输出确认

```
✅ Spec 已生成/更新

文件：docs/specs/<name>.md
状态：草稿 / 已确认
实施阶段：[N] 个 Phase，当前 Phase [active_phase]
关联 ROADMAP：[有/无]

建议下一步：
- 继续讨论 → 讨论后再次 /spec 更新
- 开始实施 → /clear 后 "读取 docs/specs/<name>.md，开始实施 Phase 1"
- 确认内容 → 告诉我"确认"，状态改为"已确认"
```

</workflow>
