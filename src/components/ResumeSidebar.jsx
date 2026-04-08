import PropTypes from 'prop-types';

/**
 * ResumeSidebar 组件
 * 右侧边栏 - 包含头像、技能、成就等信息
 */

const BADGE_VARIANTS = {
  default: 'bg-white/20',
  highlight: 'bg-white/30',
  accent: 'bg-orange-400/30',
};

const SkillBadge = ({ children, variant = 'default' }) => (
  <span className={`text-[0.6rem] px-1.5 py-0.5 rounded text-white font-medium ${BADGE_VARIANTS[variant]}`}>
    {children}
  </span>
);

SkillBadge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(Object.keys(BADGE_VARIANTS)),
};

const ResumeSidebar = () => {
  return (
    <aside className="bg-sidebar-teal text-white px-4 py-3 flex flex-col gap-3">
      {/* 头部区域 - 头像和姓名 */}
      <div className="flex items-center justify-center gap-5 mb-4">
        {/* 头像 */}
        <div className="w-[95px] h-[115px] rounded-md overflow-hidden shadow-2xl flex-shrink-0">
          <img
            src="/resume_avatar.JPG"
            alt="陈澄证件照"
            className="w-full h-full object-cover"
          />
        </div>
        {/* 姓名区域 */}
        <div className="flex-1">
          <div className="text-[1.4rem] font-bold text-white leading-tight mb-0.5 font-serif">
            陈澄
          </div>
          <div className="text-[0.9rem] font-medium text-white/90 leading-tight">
            Kaylon
          </div>
        </div>
      </div>

      {/* 学习成果 */}
      <section className="mb-2">
        <h3 className="text-[0.7rem] font-bold uppercase tracking-wider mb-2 text-white">
          学习成果
        </h3>
        <ul className="space-y-0">
          <li className="mb-1.5 pb-1.5 border-b border-white/20 last:border-b-0 last:mb-0 last:pb-0">
            <div className="inline-flex items-center justify-center w-[18px] h-[18px] bg-white/20 rounded-full mb-1 text-[0.65rem]">
              ⚡
            </div>
            <h4 className="text-[0.75rem] font-semibold mb-1 text-white">现代化全栈开发</h4>
            <p className="text-[0.65rem] text-white/90 leading-snug">
              掌握 React + Tailwind CSS 构建美观界面，Spring Boot 后端开发，FastAPI AI 服务集成。
            </p>
          </li>
          <li className="mb-1.5 pb-1.5 border-b border-white/20 last:border-b-0 last:mb-0 last:pb-0">
            <div className="inline-flex items-center justify-center w-[18px] h-[18px] bg-white/20 rounded-full mb-1 text-[0.65rem]">
              🔧
            </div>
            <h4 className="text-[0.75rem] font-semibold mb-1 text-white">快速学习能力</h4>
            <p className="text-[0.65rem] text-white/90 leading-snug">
              从传统前端到 React 现代框架，从 Python 数据分析到 Java 后端开发，持续扩展技术栈。
            </p>
          </li>
          <li className="mb-1.5 pb-1.5 border-b border-white/20 last:border-b-0 last:mb-0 last:pb-0">
            <div className="inline-flex items-center justify-center w-[18px] h-[18px] bg-white/20 rounded-full mb-1 text-[0.65rem]">
              🤖
            </div>
            <h4 className="text-[0.75rem] font-semibold mb-1 text-white">AI 工具深度应用</h4>
            <p className="text-[0.65rem] text-white/90 leading-snug">
              擅长运用 Claude Code、ChatGPT 等 AI 工具优化开发流程，提升学习和工作效率。
            </p>
          </li>
        </ul>
      </section>

      {/* 专业技能 */}
      <section className="mb-2">
        <h3 className="text-[0.7rem] font-bold uppercase tracking-wider mb-2 text-white">
          专业技能
        </h3>
        <div className="space-y-2">
          <div className="mb-1.5">
            <h4 className="text-[0.7rem] font-semibold mb-1.5 text-white/90">前端技术</h4>
            <div className="flex flex-wrap gap-1">
              <SkillBadge variant="highlight">React</SkillBadge>
              <SkillBadge variant="highlight">JavaScript ES6+</SkillBadge>
              <SkillBadge variant="highlight">Tailwind CSS</SkillBadge>
              <SkillBadge>HTML5</SkillBadge>
              <SkillBadge>CSS3</SkillBadge>
              <SkillBadge>Vite</SkillBadge>
            </div>
          </div>

          <div className="mb-1.5">
            <h4 className="text-[0.7rem] font-semibold mb-1.5 text-white/90">数据分析</h4>
            <div className="flex flex-wrap gap-1">
              <SkillBadge variant="highlight">Python</SkillBadge>
              <SkillBadge variant="highlight">pandas</SkillBadge>
              <SkillBadge>机器学习</SkillBadge>
              <SkillBadge>LSTM</SkillBadge>
            </div>
          </div>

          <div className="mb-1.5">
            <h4 className="text-[0.7rem] font-semibold mb-1.5 text-white/90">桌面应用开发</h4>
            <div className="flex flex-wrap gap-1">
              <SkillBadge>C#</SkillBadge>
              <SkillBadge>Revit API</SkillBadge>
              <SkillBadge>OpenCV</SkillBadge>
            </div>
          </div>

          <div className="mb-1.5">
            <h4 className="text-[0.7rem] font-semibold mb-1.5 text-white/90">后端技术（快速成长中）</h4>
            <div className="flex flex-wrap gap-1">
              <SkillBadge variant="accent">Java</SkillBadge>
              <SkillBadge variant="accent">Spring Boot</SkillBadge>
              <SkillBadge variant="accent">MySQL</SkillBadge>
              <SkillBadge variant="accent">RESTful API</SkillBadge>
            </div>
          </div>

          <div className="mb-1.5">
            <h4 className="text-[0.7rem] font-semibold mb-1.5 text-white/90">AI工具应用</h4>
            <div className="flex flex-wrap gap-1">
              <SkillBadge>ChatGPT</SkillBadge>
              <SkillBadge>Claude Code</SkillBadge>
              <SkillBadge>Gemini</SkillBadge>
              <SkillBadge>Cursor</SkillBadge>
            </div>
          </div>

          <div className="mb-1.5">
            <h4 className="text-[0.7rem] font-semibold mb-1.5 text-white/90">开发工具</h4>
            <div className="flex flex-wrap gap-1">
              <SkillBadge>Git</SkillBadge>
              <SkillBadge>VS Code</SkillBadge>
              <SkillBadge>Linux</SkillBadge>
              <SkillBadge>阿里云</SkillBadge>
            </div>
          </div>
        </div>
      </section>

      {/* 技术社区 */}
      <section className="mb-2">
        <h3 className="text-[0.7rem] font-bold uppercase tracking-wider mb-2 text-white">
          技术社区
        </h3>
        <ul className="space-y-0">
          <li className="mb-1.5 px-1.5 py-1.5 bg-white/10 rounded">
            <h4 className="text-[0.7rem] font-semibold mb-0.5 text-white">Linux DO 社区</h4>
            <p className="text-[0.6rem] text-white/90 leading-snug">
              活跃参与技术讨论，学习前沿开发理念和最佳实践。
            </p>
          </li>
          <li className="mb-1.5 px-1.5 py-1.5 bg-white/10 rounded last:mb-0">
            <h4 className="text-[0.7rem] font-semibold mb-0.5 text-white">GitHub 开源</h4>
            <p className="text-[0.6rem] text-white/90 leading-snug">
              维护个人项目，参与开源社区贡献和技术交流。
            </p>
          </li>
        </ul>
      </section>

      {/* 个人兴趣 */}
      <section>
        <h3 className="text-[0.7rem] font-bold uppercase tracking-wider mb-2 text-white">
          个人兴趣
        </h3>
        <p className="text-[0.7rem] text-white/90 leading-relaxed mb-1">
          热爱计算机前沿技术与社区
        </p>
        <p className="text-[0.7rem] text-white/90 leading-relaxed">
          热爱旅游摄影创意拍摄
        </p>
      </section>
    </aside>
  );
};

export default ResumeSidebar;
