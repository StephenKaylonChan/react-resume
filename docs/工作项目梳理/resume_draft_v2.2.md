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

独立负责公司 AI 转型的核心开发工作，将 LLM 能力集成进多个业务系统，覆盖从需求设计到容器化部署的全链路。

- 构建**多源爬虫 + LLM 摘要数据管道**，设计可扩展适配器框架（BaseCrawler ABC），实现招标情报自动采集与事件分类
- 设计**三代语义分析引擎**（Embedding 聚类 → LLM 维度解析 → 结构化提取），处理 13,548 条工程造价清单去重
- 逆向分析外部系统 RSA + Shiro 认证，独立编写 Python 脚本实现数据自动化拉取，无需供应商文档
- 担任官网技术负责人，主导 Next.js 16 + Spring Boot Monorepo 架构，制定多人协作规范（Q1 绩效满分）

---

## 项目经验

### 市场情报平台 · 招标信息自动化抓取
**Python · FastAPI · APScheduler · LLM API · React 19 · MySQL · Docker**

为市场部构建商机早期发现系统，公众号 / 网站 / 客户动向三源并行采集，LLM 自动摘要与事件分类。

- 设计**可扩展爬虫适配器框架**（BaseCrawler ABC → GenericHtmlCrawler / JsonApiCrawler / RssCrawler），新增数据源只需 JSON 配置，无需改动核心逻辑，与 Agent 工具调用模式高度一致
- 构建 **LLM 摘要管道**：OpenAI-compatible 无 SDK 直调，支持通义 / Deepseek / Ollama 一键切换；pending 状态追踪 + 错误隔离，单篇失败不阻断整批
- **APScheduler 定时调度**：6 个 Cron 任务 + asyncio 并发锁 + 随机抖动，防采集重叠与突发
- 87 个 API 端点，421 个测试用例（覆盖率 72%），16 张数据库表，Docker Compose 一键部署

---

### YDC 非标清单 LLM 语义分析系统
**Python · FastAPI · 阿里云百炼 · Embedding · asyncio · React 19 · ECharts · MySQL**

通过 LLM 识别 13,548 条工程造价清单中的同义重复，辅助清单资产治理。

- 独立迭代**三代语义分析引擎**：V2 Embedding 聚类（阈值 0.82）+ LLM 精细判断；V3 LLM 提取纯净名称（去除 12 维变体）+ 二次聚类（阈值 0.90）；V4 qwen3-max 单次结构化提取，100 条 / 批异步并行
- **Prompt 工程**：双层提示词设计，JSON 平衡括号计数解析（防贪心正则截断），429 限流指数退避重试
- 10 并发 LLM + 20 并发 Embedding 批处理，60 个预计算缓存任务（MySQL 持久化，启动注入 <0.5s）
- 后端 17 个服务模块约 9,000 行，32 个 API 端点；前端 ECharts 多维可视化（热力图 / 下钻分析）

---

### YOMY 企业官网 · yomyic.com
**Next.js 16 · Spring Boot 3.4 · TypeScript · Monorepo · OpenAPI 3.1 · Docker**

担任技术负责人，从零主导公司官网全栈开发，覆盖架构设计、前后端协同、多人协作规范到生产上线全链路。

- 采用 **API-First 开发流程**（OpenAPI 3.1 规范 1,229 行 → 前端代码自动生成），彻底消除前后端联调歧义
- 制定完整工程协作体系：Git 分支策略、Docker Compose 统一环境、8 份 ADR 架构决策文档、多套 SOP
- 实现 next-intl 国际化（中英文路由级切换）、JWT 双层权限、Zustand 状态持久化、GitHub Actions CI/CD
- 主动调研并推动 Nginx 子域名反向代理替代 IP:Port 暴露方案，输出技术对比备忘录，成功影响决策

---

### 全栈个人网站 · kaylonchan.com
**Next.js 15 · Spring Boot 3.5 · TypeScript · Turborepo · Nginx · 阿里云 ECS**

Monorepo 全栈个人品牌网站，3 个前端应用（旅行摄影 / 日语学习 / 开发者工具）+ Spring Boot 后端 + 5 个共享 npm 包，407 次提交迭代至生产级部署，Nginx 多域名反向代理 + SSL + CSP 安全头。

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
