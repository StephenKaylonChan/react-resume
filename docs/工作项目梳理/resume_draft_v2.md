# 陈澄 · Kaylon Chan

**AI 应用开发工程师 | LLM 集成 · 全栈开发 · 自动化系统**

📧 chenchengpre@163.com　📱 13519399194
🌐 kaylonchan.com　💻 github.com/StephenKaylonChan
📍 上海（期望深圳）

---

## 个人简介

同济大学 2025 届本科毕业，9 个月全栈开发经验，专注 **LLM 应用工程化**与 **AI 自动化系统**开发。
独立设计并落地三代语义分析引擎（Embedding 聚类 + LLM 维度解析），构建多源爬虫 + LLM 摘要的数据流水线，设计可扩展工具调用框架。
技术栈以 **Python / FastAPI** 为核心，具备完整的全栈交付能力（React 19 + Spring Boot），擅长将 LLM 能力与真实业务场景结合落地。

---

## 工作经历

### 全栈开发工程师
**上海永麦管理咨询有限公司**　2025.07 — 至今　上海

独立或作为技术负责人，交付 4 个内部数字化平台，覆盖从需求设计到容器化部署的全链路开发。核心方向是将 LLM 能力集成进业务系统，推动工程咨询公司的 AI 转型。

- 主导**市场情报平台**全栈开发，实现公众号 / 网站 / 客户动向三源自动采集 + LLM 摘要管道，帮助市场部比竞争对手更早发现商机信号
- 构建**非标清单 LLM 分析系统**，设计三代语义引擎，对 13,548 条工程造价清单进行去重与分类，核心 Prompt 策略独立设计
- 担任**官网技术负责人**，主导前端架构选型与多人协作规范，完成 Next.js 16 + Spring Boot 3.4 Monorepo 官网上线（Q1 绩效满分）
- 逆向分析外部系统（Apache Shiro + RSA 加密认证），独立编写 Python 脚本实现数据自动化拉取，无需供应商文档
- 设计并推动内部 AI Coding 工作流（Claude Code / Cursor），评估多工具链，将外包开发能力内部化

---

## 项目经验

### 市场情报平台（招标信息自动化抓取）
**FastAPI · Python · React 19 · APScheduler · LLM · MySQL · Docker**

为战略市场部构建商机早期发现系统，自动追踪招投标公告与客户扩张动向，LLM 自动生成摘要与事件分类。

- 设计**可扩展爬虫适配器框架**（BaseCrawler ABC + GenericHtmlCrawler / JsonApiCrawler / RssCrawler），新增数据源只需配置 JSON，无需改动核心逻辑——与 Agent 工具调用模式高度一致
- 实现**公众号扫码采集**（纯 HTTP 状态机，无 Selenium 依赖）+ 4 个网站适配器 + 3 源客户动向采集
- 构建 **LLM 摘要管道**：OpenAI-compatible API 无 SDK 调用，支持通义 / Deepseek / Ollama 一键切换；批处理 pending 状态追踪 + 错误隔离（单篇失败不阻断整体）
- 设计事件自动分类器（融资 / 扩张 / 管理层 / 财报），配合关键词别名匹配实现灵活的公司监控
- **APScheduler 定时调度**：6 个 Cron 任务（采集 + LLM 摘要 + 日报推送）+ 并发锁 + 随机抖动防突发
- 87 个 API 端点，421 个测试用例（覆盖率 72%），生产环境弱密钥拦截、CORS 限制、SQL 注入防御

---

### YDC 非标清单 LLM 语义分析系统
**FastAPI · Python · React 19 · ECharts · 阿里云百炼 · asyncio · MySQL · Docker**

为工程造价公司构建数据分析平台，通过 LLM 识别 13,548 条未入库清单中的同义重复，辅助清单资产管理。

- 独立设计并迭代**三代语义分析引擎**：
  - V2：Embedding 向量聚类（阈值 0.82 粗分组）→ LLM 精细判断，10 并发 + 指数退避重试
  - V3：LLM 纯净名称提取（去除颜色/材质/品牌等 12 个变体维度）→ 二次语义聚类（阈值 0.90）
  - V4：qwen3-max 单次结构化提取多维度，100 条/批异步并行处理
- 设计 **Prompt 工程策略**：双层提示词（系统角色 + 用户指令），JSON 平衡括号计数解析（比贪心正则更安全），429 限流指数退避重试
- 实现 **60 个预计算缓存任务**（MySQL 持久化），启动时 <0.5s 注入，支持热重载后全量重算
- 前端 6 页面 + 54 组件，16 个自定义 Hook，ECharts 多维可视化（热力图 / 趋势线 / 下钻分析）
- 后端 17 个服务模块约 9,000 行，32 个 API 端点，Docker Compose 容器化部署

---

### YOMY 企业官网
**Next.js 16 · Spring Boot 3.4 · FastAPI · TypeScript · Monorepo · Docker**

担任技术负责人，主导前端架构设计与多人开发协作规范，Monorepo 架构管理三个子应用。

- 采用 **API-First 开发流程**（OpenAPI 3.1 规范定义 → 代码自动生成），减少前后端联调成本
- 主导技术选型决策：制定 Git 分支策略、Docker Compose 统一环境、8 份 ADR 架构决策文档
- 实现 next-intl 国际化（中英文路由级切换）、JWT 双层权限体系、GitHub Actions CI/CD
- 主动研究并推动子域名 Nginx 反向代理替代 IP:Port 方案，输出技术对比备忘录，成功推动讨论

---

### 全栈个人网站 · kaylonchan.com
**Next.js 15 · Spring Boot 3.5 · TypeScript · Turborepo · Nginx · Docker · 阿里云 ECS**

独立设计并开发 Monorepo 全栈个人品牌网站，3 个前端应用 + 1 个 Spring Boot 后端 + 5 个共享 npm 包，407 次提交迭代至生产级部署。

- **3 个独立前端应用**：旅行摄影 + 博客主站（Next.js SSR/ISR + GSAP ScrollTrigger + Cobe 3D 地球仪）、日语学习平台（MDX 双编译 + SakuraRain 樱花动效 + 6 色主题）、开发者工具集（代码片段管理 + 世界时钟等）
- **Spring Boot 后端**：36 个 REST API 端点，JWT HttpOnly Cookie + Token 黑名单 + 双维度限流，ISR 缓存重验证（DTO 优化响应体从 ~500KB → ~15KB）
- **Turborepo Monorepo**：pnpm workspace + Turborepo 构建缓存，5 个跨应用共享 npm 包
- **生产级部署**：阿里云 ECS + Docker + Nginx 多域名反向代理（SSL + CSP 安全头 + 限流）

---

## 技术栈

**AI / LLM 工程**
阿里云百炼（通义千问） · OpenAI-compatible API · Embedding 向量计算 · Prompt 工程 · RAG · 语义相似度 · asyncio 并发批处理

**后端**
Python · FastAPI · SQLAlchemy 2.0 · APScheduler · httpx · BeautifulSoup4 · pandas · JWT · Docker

**前端**
React 19 · TypeScript · Next.js 16 · Vite · ECharts · Ant Design · Framer Motion · Tailwind CSS

**其他全栈**
Spring Boot 3.4（Java） · MySQL 8 · Alembic · Nginx · Linux · Git · pnpm Monorepo

---

## 教育背景

**港口航道与海岸工程 · 工学学士**　　同济大学　　2020.09 — 2025.06

毕业设计：《2000-2023 年上海城市热岛效应变规律研究》（LSTM + ARIMA，获优秀等级）

自学课程：数据结构与算法 · Python · Web 开发 · 数据库 · Linux · 计算机网络

---

> 本简历通过 React + Vite + Tailwind CSS 自主设计开发
