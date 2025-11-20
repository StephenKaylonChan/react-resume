/**
 * GradientText 组件
 * 用于显示带有彩色渐变效果的技术词汇
 * 注意：使用完整类名映射以支持 Tailwind JIT 模式
 */

const GradientText = ({ children, gradient }) => {
  if (!gradient) {
    return <span>{children}</span>;
  }

  // 完整的类名映射（Tailwind JIT 需要完整的类名）
  const gradientClasses = {
    'gradient-python': 'bg-gradient-python',
    'gradient-java': 'bg-gradient-java',
    'gradient-javascript': 'bg-gradient-javascript',
    'gradient-vue': 'bg-gradient-vue',
    'gradient-spring': 'bg-gradient-spring',
    'gradient-mysql': 'bg-gradient-mysql',
    'gradient-html5': 'bg-gradient-html5',
    'gradient-css3': 'bg-gradient-css3',
    'gradient-webassembly': 'bg-gradient-webassembly',
    'gradient-git': 'bg-gradient-git',
    'gradient-ai': 'bg-gradient-ai',
    'gradient-pwa': 'bg-gradient-pwa',
    'gradient-docker': 'bg-gradient-docker',
    'gradient-linux': 'bg-gradient-linux',
    'gradient-aliyun': 'bg-gradient-aliyun',
    'gradient-pandas': 'bg-gradient-pandas',
    'gradient-lstm': 'bg-gradient-lstm',
    'gradient-restful': 'bg-gradient-restful',
    'gradient-vscode': 'bg-gradient-vscode',
    'gradient-csharp': 'bg-gradient-csharp',
    'gradient-revit': 'bg-gradient-revit',
    'gradient-opencv': 'bg-gradient-opencv',
    'gradient-chatgpt': 'bg-gradient-chatgpt',
    'gradient-claude': 'bg-gradient-claude',
    'gradient-gemini': 'bg-gradient-gemini',
    'gradient-cursor': 'bg-gradient-cursor',
    'gradient-react': 'bg-gradient-react',
    'gradient-vite': 'bg-gradient-vite',
    'gradient-fastapi': 'bg-gradient-fastapi',
    'gradient-tailwind': 'bg-gradient-tailwind',
  };

  const className = gradientClasses[gradient] || '';

  return (
    <span
      className={`${className} gradient-text`}
      style={{
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        // 使用 inline 而非 inline-block，减少 PDF 导出时的布局问题
        display: 'inline',
      }}
    >
      {children}
    </span>
  );
};

export default GradientText;
