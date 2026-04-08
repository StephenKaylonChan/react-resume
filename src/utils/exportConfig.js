/**
 * html-to-image toPng 共享配置
 * 被 exportPDF.js 和 exportImage.js 共同使用
 * @param {HTMLElement} element - 要截图的元素（用于 filter 检查 classList）
 * @returns {object} toPng options
 */
export function getToPngOptions() {
  return {
    quality: 1.0,
    pixelRatio: 3,
    backgroundColor: '#ffffff',
    cacheBust: true,
    style: {
      '-webkit-print-color-adjust': 'exact',
      'print-color-adjust': 'exact',
      'color-adjust': 'exact',
    },
    filter: (node) => {
      if (node.classList) {
        return !node.classList.contains('print:hidden');
      }
      return true;
    },
  };
}
