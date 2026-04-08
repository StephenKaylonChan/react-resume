import PropTypes from 'prop-types';
import ResumeHeader from './ResumeHeader';
import GradientText from './GradientText';

/**
 * Resume 组件
 * 主简历内容 - 左侧主要内容区域
 */

const SectionTitle = ({ children }) => (
  <h2 className="text-[0.85rem] font-bold text-gray-900 uppercase tracking-wide mb-2 border-b border-gray-200 pb-1">
    {children}
  </h2>
);

const BulletItem = ({ children }) => (
  <li className="pl-3 relative text-[0.75rem] text-gray-600 leading-snug before:content-['•'] before:absolute before:left-0 before:text-blue-600 before:font-bold">
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
    <main className="px-7 py-4 bg-white flex flex-col">
      {/* 头部信息 */}
      <ResumeHeader />

      {/* 个人简介 */}
      <section className="mb-4">
        <SectionTitle>个人简介</SectionTitle>
        <p className="text-[0.8rem] text-gray-600 leading-snug">
          同济大学应届毕业生，从传统 <GradientText gradient="gradient-html5">HTML/CSS/JS</GradientText> 三件套起步，深入学习 <GradientText gradient="gradient-react">React</GradientText> 生态，结合 <GradientText gradient="gradient-tailwind">Tailwind CSS</GradientText> 构建现代化美观界面。掌握 <GradientText gradient="gradient-python">Python</GradientText> 数据分析与 <GradientText gradient="gradient-ai">AI</GradientText> 工具深度应用。后端方面已完成 <GradientText gradient="gradient-java">Java</GradientText> 基础、<GradientText gradient="gradient-mysql">SQL</GradientText> 语句、HTTP 协议、RESTful API 设计学习，目前正在系统学习 <GradientText gradient="gradient-spring">Spring Boot</GradientText>。擅长借助 <GradientText gradient="gradient-claude">Claude Code</GradientText> 等 <GradientText gradient="gradient-ai">AI</GradientText> 工具高效开发和项目管理，具备全栈开发思维。
        </p>
      </section>

      {/* 工作经历 */}
      <section className="mb-4">
        <SectionTitle>工作经历</SectionTitle>

        {/* 第一份工作 */}
        <div className="mb-4">
          <div className="flex justify-between items-start mb-1.5">
            <div>
              <h3 className="text-[0.9rem] font-semibold text-gray-900 mb-0.5">
                全栈开发工程师（试用期）
              </h3>
              <p className="text-[0.8rem] text-blue-600 font-medium">
                上海永麦管理咨询有限公司
              </p>
              <p className="text-[0.7rem] text-gray-400">上海，中国</p>
            </div>
            <div className="text-[0.75rem] text-gray-500 font-medium whitespace-nowrap">
              07/2025 - 至今
            </div>
          </div>
          <ul className="space-y-1.5">
            <BulletItem>
              负责公司数字化系统的研发工作，主导公司官网全栈开发：<GradientText gradient="gradient-react">React</GradientText> 构建现代化前端界面、<GradientText gradient="gradient-spring">Spring Boot</GradientText> 处理后台逻辑与权限认证、<GradientText gradient="gradient-fastapi">FastAPI</GradientText> 开发 <GradientText gradient="gradient-ai">AI</GradientText> 智能问答助手
            </BulletItem>
            <BulletItem>
              开发 <GradientText gradient="gradient-python">Python</GradientText> 爬虫数据采集工具，调用 <GradientText gradient="gradient-ai">AI API</GradientText> 进行全网搜索与智能分析，实现海量造价清单数据的自动化处理和关键字段提取，优化成本控制和预算管理流程
            </BulletItem>
            <BulletItem>
              系统学习 <GradientText gradient="gradient-java">Java</GradientText> 基础、<GradientText gradient="gradient-mysql">SQL</GradientText> 语句、HTTP 协议和 RESTful API 设计，目前正在深入学习 <GradientText gradient="gradient-spring">Spring Boot</GradientText> 框架，逐步参与后端开发工作
            </BulletItem>
            <BulletItem>
              擅长运用 <GradientText gradient="gradient-claude">Claude Code</GradientText>、<GradientText gradient="gradient-chatgpt">ChatGPT</GradientText> 等 <GradientText gradient="gradient-ai">AI</GradientText> 工具提升开发效率和学习速度。工作之余和周末持续深度学习前后端技术，热爱编程，致力于快速成长为高水平全栈开发者
            </BulletItem>
          </ul>
        </div>

        {/* 第二份工作 */}
        <div>
          <div className="flex justify-between items-start mb-1.5">
            <div>
              <h3 className="text-[0.9rem] font-semibold text-gray-900 mb-0.5">
                技术助理
              </h3>
              <p className="text-[0.8rem] text-blue-600 font-medium">
                甘肃明昊房地产有限公司
              </p>
              <p className="text-[0.7rem] text-gray-400">陇南，中国</p>
            </div>
            <div className="text-[0.75rem] text-gray-500 font-medium whitespace-nowrap">
              08/2024 - 09/2024
            </div>
          </div>
          <ul className="space-y-1.5">
            <BulletItem>
              使用 <GradientText gradient="gradient-python">Python</GradientText> 和 Excel 开发数据分析工具，处理工程数据统计
            </BulletItem>
            <BulletItem>
              学习 <GradientText gradient="gradient-javascript">Web</GradientText> 前端技术，参与内部系统界面设计开发
            </BulletItem>
            <BulletItem>
              运用 <GradientText gradient="gradient-ai">AI</GradientText> 工具协助工作，在资料整理等环节提升效率
            </BulletItem>
          </ul>
        </div>
      </section>

      {/* 项目经验 */}
      <section className="mb-4">
        <SectionTitle>项目经验</SectionTitle>

        {/* 项目1 */}
        <div className="mb-3">
          <div className="mb-1.5">
            <h3 className="text-[0.85rem] font-semibold text-gray-900 mb-0.5">
              全栈个人网站平台 - kaylonchan.com
            </h3>
            <p className="text-[0.7rem] text-blue-600 font-medium">
              <GradientText gradient="gradient-react">React 19</GradientText> • <GradientText gradient="gradient-vite">Vite</GradientText> • <GradientText gradient="gradient-tailwind">Tailwind CSS</GradientText> • <GradientText gradient="gradient-spring">Spring Boot</GradientText> • <GradientText gradient="gradient-fastapi">FastAPI</GradientText>
            </p>
          </div>
          <p className="text-[0.75rem] text-gray-600 leading-snug">
            采用 Monorepo 架构的现代化全栈网站。<GradientText gradient="gradient-react">React 19</GradientText> + <GradientText gradient="gradient-vite">Vite 7</GradientText> + <GradientText gradient="gradient-tailwind">Tailwind CSS</GradientText> 构建优美响应式界面，包含旅行摄影展示（瀑布流+Lightbox）、技术项目、博客系统等 6 个完整页面。<GradientText gradient="gradient-spring">Spring Boot 3.4</GradientText> 负责后端 API 和安全认证，<GradientText gradient="gradient-fastapi">FastAPI</GradientText> 开发 <GradientText gradient="gradient-ai">AI</GradientText> 智能助手，采用 RAG 技术调用 LLM API 实现智能问答。Feature-based 架构设计，完整的 SEO 优化，GitHub Actions 自动化部署。
          </p>
        </div>

        {/* 项目2 */}
        <div className="mb-3">
          <div className="mb-1.5">
            <h3 className="text-[0.85rem] font-semibold text-gray-900 mb-0.5">
              数据采集工具开发
            </h3>
            <p className="text-[0.7rem] text-blue-600 font-medium">
              <GradientText gradient="gradient-python">Python</GradientText> • requests • <GradientText gradient="gradient-pandas">pandas</GradientText> • <GradientText gradient="gradient-react">React</GradientText>
            </p>
          </div>
          <p className="text-[0.75rem] text-gray-600 leading-snug">
            实习期间开发数据采集工具，使用 <GradientText gradient="gradient-python">Python</GradientText> 进行网页数据抓取和处理分析，<GradientText gradient="gradient-react">React</GradientText> 构建数据展示界面，实现基础数据可视化功能。
          </p>
        </div>

        {/* 项目3 */}
        <div>
          <div className="mb-1.5">
            <h3 className="text-[0.85rem] font-semibold text-gray-900 mb-0.5">
              城市热岛效应分析系统（毕业设计）
            </h3>
            <p className="text-[0.7rem] text-blue-600 font-medium">
              <GradientText gradient="gradient-python">Python</GradientText> • <GradientText gradient="gradient-lstm">LSTM</GradientText> • ARIMA • 数据可视化
            </p>
          </div>
          <p className="text-[0.75rem] text-gray-600 leading-snug">
            基于 <GradientText gradient="gradient-python">Python</GradientText> 的城市热岛效应预测分析系统，使用 <GradientText gradient="gradient-lstm">LSTM</GradientText> 和 ARIMA 模型进行时间序列分析。多维度建模分析 2000-2023 年上海数据，获优秀等级。
          </p>
        </div>
      </section>

      {/* 教育背景 */}
      <section className="mb-3">
        <SectionTitle>教育背景</SectionTitle>

        <div>
          <h3 className="text-[0.85rem] font-semibold text-gray-900 mb-0.5">
            港口航道与海岸工程学士学位
          </h3>
          <p className="text-[0.8rem] text-blue-600 font-medium mb-0.5">
            同济大学
          </p>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[0.75rem] text-gray-500">09/2020 - 06/2025</span>
            <span className="text-[0.7rem] text-gray-400">上海，中国</span>
          </div>
          <div className="text-[0.7rem] text-gray-600 leading-snug space-y-0.5">
            <p>
              <strong>毕业设计：</strong>《2000-2023年上海城市热岛效应变规律研究》，荣获"优秀"等级，论文查重率2.7%
            </p>
            <p>
              <strong>自学课程：</strong>数据结构与算法、<GradientText gradient="gradient-python">Python</GradientText> 编程、<GradientText gradient="gradient-javascript">Web</GradientText> 开发技术、数据库基础、<GradientText gradient="gradient-linux">Linux</GradientText> 系统、前端技术栈、<GradientText gradient="gradient-opencv">OpenCV</GradientText> 图像识别、计算机系统结构、计算机网络
            </p>
            <p>
              <strong>专业课程：</strong>理论力学、材料力学、港口水工建筑物、水力学、城市智慧水务
            </p>
          </div>
        </div>
      </section>

      {/* 底部说明 */}
      <div className="text-[0.65rem] text-gray-400 text-center mt-3 italic">
        本简历通过 <GradientText gradient="gradient-react">React</GradientText> + <GradientText gradient="gradient-vite">Vite</GradientText> + <GradientText gradient="gradient-tailwind">Tailwind CSS</GradientText> 自主设计开发
      </div>
    </main>
  );
};

export default Resume;
