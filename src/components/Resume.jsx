import PropTypes from 'prop-types';
import GradientText from './GradientText';

/**
 * Resume 组件
 * 正文区 - 单栏全宽布局
 */

const SectionTitle = ({ children }) => (
  <h2 className="text-[0.8rem] font-bold text-gray-900 uppercase tracking-wide mb-1.5 border-b border-gray-200 pb-0.5">
    {children}
  </h2>
);

const BulletItem = ({ children }) => (
  <li className="pl-3 relative text-[0.7rem] text-gray-600 leading-[1.4] before:content-['•'] before:absolute before:left-0 before:text-blue-600 before:font-bold">
    {children}
  </li>
);

SectionTitle.propTypes = {
  children: PropTypes.node.isRequired,
};

BulletItem.propTypes = {
  children: PropTypes.node.isRequired,
};

const Resume = () => {
  return (
    <>
      {/* 个人简介 */}
      <section className="mb-2.5">
        <SectionTitle>个人简介</SectionTitle>
        <p className="text-[0.7rem] text-gray-600 leading-relaxed">
          同济大学 2025 届本科毕业，9 个月全栈开发经验，专注 <GradientText gradient="gradient-ai">LLM</GradientText> 应用工程化与 <GradientText gradient="gradient-ai">AI</GradientText> 自动化系统开发。独立设计并落地三代语义分析引擎（<GradientText gradient="gradient-embedding">Embedding</GradientText> 聚类 + <GradientText gradient="gradient-ai">LLM</GradientText> 维度解析），构建多源爬虫 + <GradientText gradient="gradient-ai">LLM</GradientText> 摘要的数据流水线，设计可扩展工具调用框架。技术栈以 <GradientText gradient="gradient-python">Python</GradientText> / <GradientText gradient="gradient-fastapi">FastAPI</GradientText> 为核心，具备完整的全栈交付能力（<GradientText gradient="gradient-react">React 19</GradientText> + <GradientText gradient="gradient-spring">Spring Boot</GradientText>），擅长将 <GradientText gradient="gradient-ai">LLM</GradientText> 能力与真实业务场景结合落地。
        </p>
      </section>

      {/* 工作经历 */}
      <section className="mb-2.5">
        <SectionTitle>工作经历</SectionTitle>
        <div>
          <div className="flex justify-between items-start mb-1">
            <div>
              <h3 className="text-[0.78rem] font-semibold text-gray-900">全栈开发工程师</h3>
              <p className="text-[0.7rem] text-blue-600 font-medium">上海永麦管理咨询有限公司</p>
            </div>
            <div className="text-[0.68rem] text-gray-500 font-medium whitespace-nowrap">2025.07 — 至今 | 上海</div>
          </div>
          <p className="text-[0.68rem] text-gray-500 mb-1 leading-snug">
            独立负责公司 AI 转型的核心开发工作，将 LLM 能力集成进多个业务系统，覆盖从需求设计到容器化部署的全链路。
          </p>
          <ul className="space-y-1">
            <BulletItem>构建<strong>多源爬虫 + <GradientText gradient="gradient-ai">LLM</GradientText> 摘要数据管道</strong>，设计可扩展适配器框架（BaseCrawler ABC），实现招标情报自动采集与事件分类</BulletItem>
            <BulletItem>设计<strong>三代语义分析引擎</strong>（<GradientText gradient="gradient-embedding">Embedding</GradientText> 聚类 → <GradientText gradient="gradient-ai">LLM</GradientText> 维度解析 → 结构化提取），处理 13,548 条工程造价清单去重</BulletItem>
            <BulletItem>逆向分析外部系统 RSA + Shiro 认证，独立编写 <GradientText gradient="gradient-python">Python</GradientText> 脚本实现数据自动化拉取，无需供应商文档</BulletItem>
            <BulletItem>担任官网技术负责人，主导 <GradientText gradient="gradient-nextjs">Next.js 16</GradientText> + <GradientText gradient="gradient-spring">Spring Boot</GradientText> Monorepo 架构，制定多人协作规范（Q1 绩效满分）</BulletItem>
          </ul>
        </div>
      </section>

      {/* 项目经验 */}
      <section className="mb-2.5">
        <SectionTitle>项目经验</SectionTitle>

        {/* 项目1: 市场情报平台 */}
        <div className="mb-2.5">
          <div className="mb-0.5">
            <h3 className="text-[0.75rem] font-semibold text-gray-900">市场情报平台 · 招标信息自动化抓取</h3>
            <p className="text-[0.62rem] text-blue-600 font-medium">
              <GradientText gradient="gradient-python">Python</GradientText> · <GradientText gradient="gradient-fastapi">FastAPI</GradientText> · APScheduler · <GradientText gradient="gradient-ai">LLM API</GradientText> · <GradientText gradient="gradient-react">React 19</GradientText> · <GradientText gradient="gradient-mysql">MySQL</GradientText> · <GradientText gradient="gradient-docker">Docker</GradientText>
            </p>
          </div>
          <p className="text-[0.66rem] text-gray-500 mb-0.5 leading-snug">为市场部构建商机早期发现系统，公众号 / 网站 / 客户动向三源并行采集，LLM 自动摘要与事件分类。</p>
          <ul className="space-y-0.5">
            <BulletItem>设计<strong>可扩展爬虫适配器框架</strong>（BaseCrawler ABC → GenericHtmlCrawler / JsonApiCrawler / RssCrawler），新增数据源只需 JSON 配置，与 Agent 工具调用模式高度一致</BulletItem>
            <BulletItem>构建 <strong><GradientText gradient="gradient-ai">LLM</GradientText> 摘要管道</strong>：OpenAI-compatible 无 SDK 直调，支持通义 / Deepseek / Ollama 一键切换；pending 状态追踪 + 错误隔离，单篇失败不阻断整批</BulletItem>
            <BulletItem><strong>APScheduler 定时调度</strong>：6 个 Cron 任务 + asyncio 并发锁 + 随机抖动，防采集重叠与突发</BulletItem>
            <BulletItem>87 个 API 端点，421 个测试用例（覆盖率 72%），16 张数据库表，<GradientText gradient="gradient-docker">Docker</GradientText> Compose 一键部署</BulletItem>
          </ul>
        </div>

        {/* 项目2: YDC 语义分析 */}
        <div className="mb-2.5">
          <div className="mb-0.5">
            <h3 className="text-[0.75rem] font-semibold text-gray-900">YDC 非标清单 LLM 语义分析系统</h3>
            <p className="text-[0.62rem] text-blue-600 font-medium">
              <GradientText gradient="gradient-python">Python</GradientText> · <GradientText gradient="gradient-fastapi">FastAPI</GradientText> · 阿里云百炼 · <GradientText gradient="gradient-embedding">Embedding</GradientText> · asyncio · <GradientText gradient="gradient-react">React 19</GradientText> · <GradientText gradient="gradient-echarts">ECharts</GradientText> · <GradientText gradient="gradient-mysql">MySQL</GradientText>
            </p>
          </div>
          <p className="text-[0.66rem] text-gray-500 mb-0.5 leading-snug">通过 LLM 识别 13,548 条工程造价清单中的同义重复，辅助清单资产治理。</p>
          <ul className="space-y-0.5">
            <BulletItem>独立迭代<strong>三代语义分析引擎</strong>：V2 <GradientText gradient="gradient-embedding">Embedding</GradientText> 聚类（阈值 0.82）+ LLM 精细判断；V3 LLM 提取纯净名称（去除 12 维变体）+ 二次聚类（阈值 0.90）；V4 qwen3-max 单次结构化提取，100 条/批异步并行</BulletItem>
            <BulletItem><strong>Prompt 工程</strong>：双层提示词设计，JSON 平衡括号计数解析（防贪心正则截断），429 限流指数退避重试</BulletItem>
            <BulletItem>10 并发 LLM + 20 并发 <GradientText gradient="gradient-embedding">Embedding</GradientText> 批处理，60 个预计算缓存任务（<GradientText gradient="gradient-mysql">MySQL</GradientText> 持久化，启动注入 &lt;0.5s）</BulletItem>
            <BulletItem>后端 17 个服务模块约 9,000 行，32 个 API 端点；前端 <GradientText gradient="gradient-echarts">ECharts</GradientText> 多维可视化（热力图 / 下钻分析）</BulletItem>
          </ul>
        </div>

        {/* 项目3: YOMY 官网 */}
        <div className="mb-2.5">
          <div className="mb-0.5">
            <h3 className="text-[0.75rem] font-semibold text-gray-900">YOMY 企业官网 · yomyic.com</h3>
            <p className="text-[0.62rem] text-blue-600 font-medium">
              <GradientText gradient="gradient-nextjs">Next.js 16</GradientText> · <GradientText gradient="gradient-spring">Spring Boot 3.4</GradientText> · <GradientText gradient="gradient-typescript">TypeScript</GradientText> · Monorepo · OpenAPI 3.1 · <GradientText gradient="gradient-docker">Docker</GradientText>
            </p>
          </div>
          <p className="text-[0.66rem] text-gray-500 mb-0.5 leading-snug">担任技术负责人，从零主导公司官网全栈开发，覆盖架构设计、前后端协同、多人协作规范到生产上线全链路。</p>
          <ul className="space-y-0.5">
            <BulletItem>采用 <strong>API-First 开发流程</strong>（OpenAPI 3.1 规范 1,229 行 → 前端代码自动生成），彻底消除前后端联调歧义</BulletItem>
            <BulletItem>制定完整工程协作体系：Git 分支策略、<GradientText gradient="gradient-docker">Docker</GradientText> Compose 统一环境、8 份 ADR 架构决策文档、多套 SOP</BulletItem>
            <BulletItem>实现 next-intl 国际化（中英文路由级切换）、JWT 双层权限、Zustand 状态持久化、GitHub Actions CI/CD</BulletItem>
            <BulletItem>主动调研并推动 <GradientText gradient="gradient-nginx">Nginx</GradientText> 子域名反向代理替代 IP:Port 暴露方案，输出技术对比备忘录，成功影响决策</BulletItem>
          </ul>
        </div>

        {/* 项目4: 个人网站 */}
        <div>
          <div className="mb-0.5">
            <h3 className="text-[0.75rem] font-semibold text-gray-900">全栈个人网站 · kaylonchan.com</h3>
            <p className="text-[0.62rem] text-blue-600 font-medium">
              <GradientText gradient="gradient-nextjs">Next.js 15</GradientText> · <GradientText gradient="gradient-spring">Spring Boot 3.5</GradientText> · <GradientText gradient="gradient-typescript">TypeScript</GradientText> · <GradientText gradient="gradient-turborepo">Turborepo</GradientText> · <GradientText gradient="gradient-nginx">Nginx</GradientText> · 阿里云 ECS
            </p>
          </div>
          <p className="text-[0.68rem] text-gray-600 leading-snug">
            Monorepo 全栈个人品牌网站，3 个前端应用（旅行摄影 / 日语学习 / 开发者工具）+ <GradientText gradient="gradient-spring">Spring Boot</GradientText> 后端 + 5 个共享 npm 包，407 次提交迭代至生产级部署，<GradientText gradient="gradient-nginx">Nginx</GradientText> 多域名反向代理 + SSL + CSP 安全头。
          </p>
        </div>
      </section>

      {/* 教育背景 */}
      <section className="mb-2">
        <SectionTitle>教育背景</SectionTitle>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-[0.75rem] font-semibold text-gray-900">港口航道与海岸工程 · 工学学士</h3>
            <p className="text-[0.7rem] text-blue-600 font-medium">同济大学</p>
          </div>
          <div className="text-[0.68rem] text-gray-500 font-medium whitespace-nowrap">2020.09 — 2025.06</div>
        </div>
        <div className="text-[0.66rem] text-gray-600 leading-snug mt-1 space-y-0.5">
          <p>毕业设计：《2000-2023 年上海城市热岛效应变规律研究》（<GradientText gradient="gradient-lstm">LSTM</GradientText> + ARIMA，获优秀等级）</p>
          <p>自学课程：数据结构与算法 · <GradientText gradient="gradient-python">Python</GradientText> · Web 开发 · 数据库 · <GradientText gradient="gradient-linux">Linux</GradientText> · 计算机网络</p>
        </div>
      </section>

      {/* 底部说明 */}
      <div className="text-[0.58rem] text-gray-400 text-center mt-auto italic">
        本简历通过 <GradientText gradient="gradient-react">React</GradientText> + <GradientText gradient="gradient-vite">Vite</GradientText> + <GradientText gradient="gradient-tailwind">Tailwind CSS</GradientText> 自主设计开发
      </div>
    </>
  );
};

export default Resume;
