import PropTypes from 'prop-types';

/**
 * ResumeSidebar 组件
 * 右侧边栏 - 包含头像、技能、教育背景
 */

const BADGE_VARIANTS = {
  default: 'bg-white/20',
  highlight: 'bg-white/30',
  accent: 'bg-orange-400/30',
};

const SkillBadge = ({ children, variant = 'default' }) => (
  <span className={`text-[0.55rem] px-1.5 py-0.5 rounded text-white font-medium ${BADGE_VARIANTS[variant]}`}>
    {children}
  </span>
);

SkillBadge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(Object.keys(BADGE_VARIANTS)),
};

const ResumeSidebar = () => {
  return (
    <aside className="bg-sidebar-teal text-white px-3.5 py-3 flex flex-col gap-2">
      {/* 头部区域 - 头像和姓名 */}
      <div className="flex items-center justify-center gap-4 mb-2">
        {/* 头像 */}
        <div className="w-[85px] h-[105px] rounded-md overflow-hidden shadow-2xl flex-shrink-0">
          <img
            src="/resume_avatar.JPG"
            alt="陈澄证件照"
            className="w-full h-full object-cover"
          />
        </div>
        {/* 姓名区域 */}
        <div className="flex-1">
          <div className="text-[1.3rem] font-bold text-white leading-tight mb-0.5 font-serif">
            陈澄
          </div>
          <div className="text-[0.8rem] font-medium text-white/90 leading-tight">
            Kaylon
          </div>
        </div>
      </div>

      {/* 专业技能 */}
      <section>
        <h3 className="text-[0.65rem] font-bold uppercase tracking-wider mb-1.5 text-white">
          专业技能
        </h3>
        <div className="space-y-2">
          <div>
            <h4 className="text-[0.6rem] font-semibold mb-1 text-white/90">AI / LLM 工程</h4>
            <div className="flex flex-wrap gap-0.5">
              <SkillBadge variant="highlight">阿里云百炼</SkillBadge>
              <SkillBadge variant="highlight">OpenAI API</SkillBadge>
              <SkillBadge variant="highlight">Embedding</SkillBadge>
              <SkillBadge variant="highlight">Prompt 工程</SkillBadge>
              <SkillBadge>RAG</SkillBadge>
              <SkillBadge>语义相似度</SkillBadge>
              <SkillBadge>asyncio 批处理</SkillBadge>
            </div>
          </div>

          <div>
            <h4 className="text-[0.6rem] font-semibold mb-1 text-white/90">后端</h4>
            <div className="flex flex-wrap gap-0.5">
              <SkillBadge variant="highlight">Python</SkillBadge>
              <SkillBadge variant="highlight">FastAPI</SkillBadge>
              <SkillBadge variant="highlight">SQLAlchemy</SkillBadge>
              <SkillBadge>APScheduler</SkillBadge>
              <SkillBadge>httpx</SkillBadge>
              <SkillBadge>BeautifulSoup4</SkillBadge>
              <SkillBadge>pandas</SkillBadge>
              <SkillBadge>JWT</SkillBadge>
              <SkillBadge>Docker</SkillBadge>
            </div>
          </div>

          <div>
            <h4 className="text-[0.6rem] font-semibold mb-1 text-white/90">前端</h4>
            <div className="flex flex-wrap gap-0.5">
              <SkillBadge variant="highlight">React 19</SkillBadge>
              <SkillBadge variant="highlight">TypeScript</SkillBadge>
              <SkillBadge variant="highlight">Next.js</SkillBadge>
              <SkillBadge>Vite</SkillBadge>
              <SkillBadge>ECharts</SkillBadge>
              <SkillBadge>Ant Design</SkillBadge>
              <SkillBadge>Tailwind CSS</SkillBadge>
            </div>
          </div>

          <div>
            <h4 className="text-[0.6rem] font-semibold mb-1 text-white/90">其他全栈</h4>
            <div className="flex flex-wrap gap-0.5">
              <SkillBadge variant="accent">Spring Boot</SkillBadge>
              <SkillBadge variant="accent">Java</SkillBadge>
              <SkillBadge variant="accent">MySQL 8</SkillBadge>
              <SkillBadge>Alembic</SkillBadge>
              <SkillBadge>Nginx</SkillBadge>
              <SkillBadge>Linux</SkillBadge>
              <SkillBadge>Git</SkillBadge>
              <SkillBadge>pnpm Monorepo</SkillBadge>
            </div>
          </div>
        </div>
      </section>

      {/* 教育背景 */}
      <section className="mt-auto">
        <h3 className="text-[0.65rem] font-bold uppercase tracking-wider mb-1.5 text-white">
          教育背景
        </h3>
        <div>
          <h4 className="text-[0.65rem] font-semibold text-white mb-0.5">
            同济大学
          </h4>
          <p className="text-[0.58rem] text-white/90 mb-0.5">
            港口航道与海岸工程 · 工学学士
          </p>
          <p className="text-[0.55rem] text-white/70 mb-1">
            2020.09 — 2025.06
          </p>
          <p className="text-[0.55rem] text-white/80 leading-snug mb-0.5">
            毕业设计：《2000-2023 年上海城市热岛效应变规律研究》（LSTM + ARIMA，获优秀等级）
          </p>
          <p className="text-[0.55rem] text-white/70 leading-snug">
            自学课程：数据结构与算法 · Python · Web 开发 · 数据库 · Linux · 计算机网络
          </p>
        </div>
      </section>
    </aside>
  );
};

export default ResumeSidebar;
