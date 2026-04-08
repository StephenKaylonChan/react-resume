---
name: nbp2
description: |
  帮助用户编写 Nano Banana Pro / Nano Banana 2 AI 生图 Prompt。
  当用户需要生成图片、写图片 prompt、使用 Nano Banana、NBP2、Gemini 生图时自动触发。
  触发关键词：生图、图片 prompt、Nano Banana、NBP2、AI 生图、image prompt
argument-hint: "[图片描述 或 场景需求]"
allowed-tools: Read, Bash
---

<task>
根据用户的描述需求，生成针对 Nano Banana Pro 2（Google Gemini 图像生成模型）优化的高质量 Prompt。
</task>

<context>

## Nano Banana 模型概览

| 特性 | Nano Banana Pro (Gemini 3 Pro) | Nano Banana 2 (Gemini 3.1 Flash) |
|------|-------------------------------|----------------------------------|
| 速度 (1K) | 10-20 秒 | 4-6 秒 |
| 价格/张 | ~$0.15 | ~$0.08 |
| 质量 | 最佳 | Pro 的 ~95% |
| Image Search Grounding | 无 | 有 |
| Thinking Mode | 有 | 有 |
| 角色一致性 | 强 | 最多 5 角色、14 对象 |

## 核心差异 — 工作流策略

- **Pro**：精雕细琢单个 prompt，追求一次到位的最高品质
- **Nano Banana 2**：快速起步 → 迭代精修（速度优势支撑多轮对话式调整）

</context>

<workflow>

## Step 1: 理解用户需求

询问或从 `$ARGUMENTS` 中提取：
1. **画面主题** — 要画什么？
2. **用途场景** — 社交媒体封面？产品图？海报？
3. **目标模型** — 用 Pro 还是 NBP2？默认 NBP2
4. **特殊要求** — 需要文字渲染？角色一致性？真实地标？

## Step 2: 按六要素公式构建 Prompt

### 公式：`[主体] + [动作/关系] + [场景/环境] + [构图/镜头] + [风格/介质] + [光线]`

**1. 主体 (Subject)** — 最重要，具体描述
**2. 动作与关系** — 主体在做什么
**3. 场景/环境** — 地点、时间、天气
**4. 构图/镜头** — 角度、焦距、景深
**5. 风格/介质** — 摄影 / 插画 / 3D / 水彩
**6. 光线** — 主光源、阴影、氛围

## Step 3: 应用进阶技巧

### 文字渲染
- 精确文字必须用引号包裹：`with the text "MIDNIGHT" in bold typography`
- 指定字体风格

### 负面约束
- `no text, no watermark, no extra limbs, clean framing`

### 角色一致性（多图工作流）
- 先生成角色设定图（多角度）
- 后续引用保持一致

### Image Search Grounding（仅 NBP2）
- 用于真实地标/名人/品牌
- 触发词：`search for` / `latest`

## Step 4: 输出格式

```
## NBP2 Prompt

**目标模型**: [Pro / Nano Banana 2]
**建议分辨率**: [如 1024x1024]

### Prompt

[完整的英文 prompt，自然语言描述]

### Negative Constraints

[负面约束，逗号分隔]

### 调优建议

- [1-3 条调整建议]
```

</workflow>

<rules>

## 关键规则

1. **自然语言，不是标签堆叠**
2. **Prompt 用英文**（即使用户用中文描述）
3. **具体胜过模糊**
4. **避免矛盾**
5. **顺序即权重** — 最重要的放最前
6. **文字必须引号包裹**
7. **默认推荐 NBP2**

</rules>
