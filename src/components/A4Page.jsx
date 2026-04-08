import PropTypes from 'prop-types';

/**
 * A4Page 组件
 * A4 尺寸的页面容器 (210mm x 297mm)
 * 全宽单栏布局：Teal 头部色带 + 白色正文区
 */

const A4Page = ({ header, children }) => {
  return (
    <div className="a4-page w-a4 min-h-a4 bg-white mx-auto a4-shadow overflow-hidden flex flex-col">
      {/* Teal 头部色带 */}
      <header className="bg-sidebar-teal text-white px-7 pt-3.5 pb-2.5">
        {header}
      </header>
      {/* 白色正文区 */}
      <main className="px-7 py-3 flex-1 flex flex-col">
        {children}
      </main>
    </div>
  );
};

A4Page.propTypes = {
  header: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};

export default A4Page;
