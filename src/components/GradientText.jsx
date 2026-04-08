import PropTypes from 'prop-types';

/**
 * GradientText 组件
 * 用于显示带有彩色渐变效果的技术词汇
 * 注意：使用完整类名映射以支持 Tailwind JIT 模式
 * 渐变样式统一由 index.css 中的 .gradient-text class 控制
 */

// 类名映射（Tailwind JIT 需要完整的类名，移到组件外部避免重复创建）
// 仅保留项目中实际使用的渐变色，新增时需同步 tailwind.config.js
const gradientClasses = {
  'gradient-python': 'bg-gradient-python',
  'gradient-java': 'bg-gradient-java',
  'gradient-javascript': 'bg-gradient-javascript',
  'gradient-spring': 'bg-gradient-spring',
  'gradient-mysql': 'bg-gradient-mysql',
  'gradient-html5': 'bg-gradient-html5',
  'gradient-ai': 'bg-gradient-ai',
  'gradient-linux': 'bg-gradient-linux',
  'gradient-pandas': 'bg-gradient-pandas',
  'gradient-lstm': 'bg-gradient-lstm',
  'gradient-opencv': 'bg-gradient-opencv',
  'gradient-chatgpt': 'bg-gradient-chatgpt',
  'gradient-claude': 'bg-gradient-claude',
  'gradient-react': 'bg-gradient-react',
  'gradient-vite': 'bg-gradient-vite',
  'gradient-fastapi': 'bg-gradient-fastapi',
  'gradient-tailwind': 'bg-gradient-tailwind',
};

const GradientText = ({ children, gradient }) => {
  if (!gradient) {
    return <span>{children}</span>;
  }

  const bgClass = gradientClasses[gradient] || '';

  return (
    <span className={`${bgClass} gradient-text`}>
      {children}
    </span>
  );
};

GradientText.propTypes = {
  children: PropTypes.node.isRequired,
  gradient: PropTypes.oneOf(Object.keys(gradientClasses)),
};

export default GradientText;
