import PropTypes from 'prop-types';
import GradientText from './GradientText';

/**
 * ResumeHeader 组件
 * 简历头部 - 包含职位���题和联系信息
 */

// 联系方式图标映射（移到组件外部避免每次渲染重建）
const CONTACT_ICONS = {
  email: (
    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
    </svg>
  ),
  phone: (
    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
    </svg>
  ),
  github: (
    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
    </svg>
  ),
  website: (
    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"/>
    </svg>
  ),
  location: (
    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
    </svg>
  ),
};

const ContactIcon = ({ type }) => CONTACT_ICONS[type] || null;

ContactIcon.propTypes = {
  type: PropTypes.oneOf(Object.keys(CONTACT_ICONS)).isRequired,
};

const ResumeHeader = () => {
  return (
    <header className="mb-2.5">
      <p className="text-[0.95rem] text-blue-600 font-medium mb-2.5">
        全栈开发工程师 | 原生 <GradientText gradient="gradient-javascript">Web</GradientText> 技术 | 前沿技术实践
      </p>
      <div className="grid grid-cols-2 gap-y-1.5 mb-3">
        <div className="flex items-center gap-1 text-[0.75rem] text-gray-600">
          <ContactIcon type="email" />
          <a href="mailto:chenchengpre@163.com" className="text-blue-600 hover:underline">
            chenchengpre@163.com
          </a>
        </div>
        <div className="flex items-center gap-1 text-[0.75rem] text-gray-600">
          <ContactIcon type="phone" />
          <a href="tel:13519399194" className="text-blue-600 hover:underline">
            13519399194
          </a>
        </div>
        <div className="flex items-center gap-1 text-[0.75rem] text-gray-600">
          <ContactIcon type="github" />
          <a href="https://github.com/isabellakiko" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            github.com/isabellakiko
          </a>
        </div>
        <div className="flex items-center gap-1 text-[0.75rem] text-gray-600">
          <ContactIcon type="website" />
          <a href="https://kaylonchan.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            kaylonchan.com
          </a>
        </div>
        <div className="flex items-center gap-1 text-[0.75rem] text-gray-600">
          <ContactIcon type="location" />
          上海，中国
        </div>
      </div>
    </header>
  );
};

export default ResumeHeader;
