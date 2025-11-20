/**
 * A4Page 组件
 * A4 尺寸的页面容器 (210mm x 297mm)
 */

const A4Page = ({ children }) => {
  return (
    <div className="a4-page w-a4 min-h-a4 bg-white mx-auto a4-shadow grid grid-cols-[1fr_250px] overflow-hidden">
      {children}
    </div>
  );
};

export default A4Page;
