# 项目经验

## 1. 市场情报平台 · 招标信息自动化抓取
**技术栈**: Python · FastAPI · APScheduler · LLM API · React 19 · MySQL · Docker

为市场部构建商机早期发现系统，公众号 / 网站 / 客户动向三源并行采集，LLM 自动摘要与事件分类。

- 设计**可扩展爬虫适配器框架**（BaseCrawler ABC → GenericHtmlCrawler / JsonApiCrawler / RssCrawler），新增数据源只需 JSON 配置，与 Agent 工具调用模式高度一致
- 构建 **LLM 摘要管道**：OpenAI-compatible 无 SDK 直调，支持通义 / Deepseek / Ollama 一键切换；pending 状态追踪 + 错误隔离，单篇失败不阻断整批
- **APScheduler 定时调度**：6 个 Cron 任务 + asyncio 并发锁 + 随机抖动，防采集重叠与突发
- 87 个 API 端点，421 个测试用例（覆盖率 72%），16 张数据库表，Docker Compose 一键部署

---

## 2. YDC 非标清单 LLM 语义分析系统
**技术栈**: Python · FastAPI · 阿里云百炼 · Embedding · asyncio · React 19 · ECharts · MySQL

通过 LLM 识别 13,548 条工程造价清单中的同义重复，辅助清单资产治理。

- 独立迭代**三代语义分析引擎**：V2 Embedding 聚类（阈值 0.82）+ LLM 精细判断；V3 LLM 提取纯净名称（去除 12 维变体）+ 二次聚类（阈值 0.90）；V4 qwen3-max 单次结构化提取，100 条/批异步并行
- **Prompt 工程**：双层提示词设计，JSON 平衡括号计数解析（防贪心正则截断），429 限流指数退避重试
- 10 并发 LLM + 20 并发 Embedding 批处理，60 个预计算缓存任务（MySQL 持久化，启动注入 <0.5s）
- 后端 17 个服务模块约 9,000 行，32 个 API 端点；前端 ECharts 多维可视化（热力图 / 下钻分析）

---

## 3. YOMY 企业官网 · yomyic.com
**技术栈**: Next.js 16 · Spring Boot 3.4 · TypeScript · Monorepo · OpenAPI 3.1 · Docker

担任技术负责人，从零主导公司官网全栈开发，覆盖架构设计、前后端协同、多人协作规范到生产上线全链路。

- 采用 **API-First 开发流程**（OpenAPI 3.1 规范 1,229 行 → 前端代码自动生成），彻底消除前后端联调歧义
- 制定完整工程协作体系：Git 分支策略、Docker Compose 统一环境、8 份 ADR 架构决策文档、多套 SOP
- 实现 next-intl 国际化（中英文路由级切换）、JWT 双层权限、Zustand 状态持久化、GitHub Actions CI/CD
- 主动调研并推动 Nginx 子域名反向代理替代 IP:Port 暴露方案，输出技术对比备忘录，成功影响决策

---

## 4. 全栈个人网站 · kaylonchan.com
**技术栈**: Next.js 15 · Spring Boot 3.5 · TypeScript · Turborepo · Nginx · 阿里云 ECS

- Monorepo 架构管理 3 个前端应用（旅行摄影 / 日语学习 / 开发者工具）+ Spring Boot 后端 + 5 个共享 npm 包
- 407 次提交迭代至生产级部署，Nginx 多域名反向代理 + SSL + CSP 安全头
