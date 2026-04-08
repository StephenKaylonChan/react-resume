import PropTypes from 'prop-types';

/**
 * ResumeHeader 组件
 * Teal 头部色带 - 头像、姓名、职位、联系方式、技能标签
 */

const CONTACT_ITEMS = [
  { icon: '📧', label: '邮箱', text: 'chenchengpre@163.com', href: 'mailto:chenchengpre@163.com' },
  { icon: '📱', label: '电话', text: '13519399194', href: 'tel:13519399194' },
  { icon: '📍', label: '地点', text: '上海（期望深圳）' },
  { icon: '🌐', label: '网站', text: 'kaylonchan.com', href: 'https://kaylonchan.com' },
  { icon: '💻', label: 'GitHub', text: 'github.com/StephenKaylonChan', href: 'https://github.com/StephenKaylonChan' },
];

const SKILL_CATEGORIES = [
  {
    label: 'AI / LLM',
    skills: ['阿里云百炼', 'OpenAI API', 'Embedding', 'Prompt 工程', 'RAG', '语义相似度', 'asyncio 批处理'],
  },
  {
    label: '后端',
    skills: ['Python', 'FastAPI', 'Spring Boot', 'Java', 'SQLAlchemy', 'MySQL 8', 'APScheduler', 'httpx', 'BeautifulSoup4', 'pandas', 'JWT', 'Docker'],
  },
  {
    label: '前端',
    skills: ['React 19', 'TypeScript', 'Next.js', 'Vite', 'ECharts', 'Ant Design', 'Tailwind CSS'],
  },
  {
    label: '基础设施',
    skills: ['Nginx', 'Linux', 'Git', 'pnpm Monorepo'],
  },
];

const SkillBadge = ({ children }) => (
  <span className="text-[0.55rem] px-1.5 py-[1px] bg-white/20 rounded text-white/90 font-medium">
    {children}
  </span>
);

SkillBadge.propTypes = {
  children: PropTypes.node.isRequired,
};

const ResumeHeader = () => {
  return (
    <div>
      <div className="flex gap-4 mb-2.5">
        <div className="w-[72px] h-[90px] rounded-md overflow-hidden shadow-xl flex-shrink-0">
          <img
            src="/resume_avatar.JPG"
            alt="陈澄证件照"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-baseline gap-2.5 mb-0.5">
            <h1 className="text-[1.3rem] font-bold text-white font-serif leading-tight">陈澄</h1>
            <span className="text-[0.8rem] text-white/80 font-medium">Stephen K. Chan</span>
          </div>
          <p className="text-[0.7rem] text-white/90 font-medium mb-2">
            AI 应用开发工程师 | LLM 集成 · 全栈开发 · 自动化系统
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-0.5">
            {CONTACT_ITEMS.map((item) => (
              <span key={item.text} className="text-[0.57rem] text-white/80 flex items-center gap-1">
                <span className="text-[0.5rem]" role="img" aria-label={item.label}>{item.icon}</span>
                {item.href ? (
                  <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="text-white/90 hover:text-white">
                    {item.text}
                  </a>
                ) : (
                  item.text
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-1">
        {SKILL_CATEGORIES.map((cat) => (
          <div key={cat.label} className="flex items-start gap-1.5">
            <span className="text-[0.5rem] font-bold text-white/50 whitespace-nowrap w-[38px] pt-[2px] flex-shrink-0 text-right pr-1">{cat.label}</span>
            <span className="text-white/30 pt-[1px] flex-shrink-0">|</span>
            <div className="flex flex-wrap gap-[3px]">
              {cat.skills.map((skill) => (
                <SkillBadge key={skill}>{skill}</SkillBadge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeHeader;
