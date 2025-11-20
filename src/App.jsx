import { useState } from 'react';
import A4Page from './components/A4Page';
import Resume from './components/Resume';
import ResumeSidebar from './components/ResumeSidebar';
import { exportToPDF } from './utils/exportPDF';

function App() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      await exportToPDF('resume-content', '陈澄-简历.pdf');
      alert('PDF 导出成功！');
    } catch (error) {
      console.error('导出失败:', error);
      alert('PDF 导出失败，请重试');
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-[210mm] mx-auto">
        {/* 工具栏 - 打印时隐藏 */}
        <div className="mb-6 flex gap-4 print:hidden">
          <button
            onClick={handleExportPDF}
            disabled={isExporting}
            className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            {isExporting ? '生成中...' : '📥 导出 PDF'}
          </button>
          <button
            onClick={handlePrint}
            className="px-6 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors shadow-md"
          >
            🖨️ 打印
          </button>
        </div>

        {/* A4 简历页面 */}
        <div id="resume-content">
          <A4Page>
            <Resume />
            <ResumeSidebar />
          </A4Page>
        </div>

        {/* 说明文字 - 打印时隐藏 */}
        <div className="mt-6 text-center text-sm text-gray-500 print:hidden">
          <p>💡 提示：可以使用导出 PDF 按钮生成简历文件，或使用打印功能</p>
        </div>
      </div>
    </div>
  );
}

export default App;
