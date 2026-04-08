import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import { getToPngOptions } from './exportConfig';

/**
 * 导出元素为 PDF 文件（优化版 - 使用 html-to-image）
 * 尝试保留彩色渐变效果
 * @param {string} elementId - 要导出的元素 ID
 * @param {string} filename - PDF 文件名
 * @returns {Promise<boolean>}
 */
export async function exportToPDF(elementId, filename = 'resume.pdf') {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with id "${elementId}" not found`);
    }

    // 临时添加强制颜色渲染的样式
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        color-adjust: exact !important;
      }
    `;
    document.head.appendChild(styleElement);

    let dataUrl;
    try {
      dataUrl = await toPng(element, getToPngOptions(element));
    } finally {
      document.head.removeChild(styleElement);
    }

    // 创建图片对象获取尺寸
    const img = new Image();
    img.src = dataUrl;

    // 等待��片加载
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = () => reject(new Error('Failed to load exported image'));
    });

    // 生成 PDF
    createAndSavePDF(dataUrl, img.width, img.height, filename, true);

    return true;
  } catch (error) {
    console.error('PDF export with html-to-image failed, falling back to html2canvas:', error);

    // 如果 html-to-image 失败，回退到 html2canvas
    return exportToPDFWithCanvas(elementId, filename);
  }
}

/**
 * 使用 html2canvas 的备用导出方法
 * 使用纯色替代渐变
 */
async function exportToPDFWithCanvas(elementId, filename = 'resume.pdf') {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with id "${elementId}" not found`);
    }

    console.log('使用 html2canvas 备用方案（渐变将显示为纯色）');

    // 保存原始样式并应用导出优化
    const optimizationResult = applyExportOptimization(element);

    // 等待样式应用生效
    await new Promise(resolve => setTimeout(resolve, 100));

    // 动态加载 html2canvas（仅降级时加载，减小主 bundle 体积）
    const { default: html2canvas } = await import('html2canvas');
    const canvas = await html2canvas(element, {
      scale: 3,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      width: element.scrollWidth,
      height: element.scrollHeight,
      allowTaint: false,
      removeContainer: true,
      imageTimeout: 0,
    });

    // 恢复原始样式
    restoreOriginalStyles(optimizationResult);

    // 生成 PDF
    const imgData = canvas.toDataURL('image/png', 1.0);
    createAndSavePDF(imgData, canvas.width, canvas.height, filename, false);
    return true;
  } catch (error) {
    console.error('PDF export failed:', error);
    throw error;
  }
}

/**
 * 应用导出优化样式（html2canvas 备用方案）
 */
function applyExportOptimization(element) {
  const gradientTexts = element.querySelectorAll('.gradient-text');
  const shadowElements = element.querySelectorAll('.a4-shadow');

  const originalStyles = {
    gradients: [],
    shadows: []
  };

  // 处理渐变文字
  gradientTexts.forEach((el) => {
    originalStyles.gradients.push({
      element: el,
      backgroundImage: el.style.backgroundImage,
      backgroundClip: el.style.backgroundClip,
      webkitBackgroundClip: el.style.webkitBackgroundClip,
      webkitTextFillColor: el.style.webkitTextFillColor,
      color: el.style.color,
      fontWeight: el.style.fontWeight,
    });

    el.style.backgroundImage = 'none';
    el.style.backgroundClip = 'border-box';
    el.style.webkitBackgroundClip = 'border-box';
    el.style.webkitTextFillColor = 'unset';
    el.style.color = '#1e40af';
    el.style.fontWeight = '700';
  });

  // 处理阴影
  shadowElements.forEach((el) => {
    originalStyles.shadows.push({
      element: el,
      boxShadow: el.style.boxShadow,
    });
    el.style.boxShadow = 'none';
  });

  return originalStyles;
}

/**
 * 恢复原始样式
 */
function restoreOriginalStyles(originalStyles) {
  originalStyles.gradients.forEach((saved) => {
    const el = saved.element;
    el.style.backgroundImage = saved.backgroundImage;
    el.style.backgroundClip = saved.backgroundClip;
    el.style.webkitBackgroundClip = saved.webkitBackgroundClip;
    el.style.webkitTextFillColor = saved.webkitTextFillColor;
    el.style.color = saved.color;
    el.style.fontWeight = saved.fontWeight;
  });

  originalStyles.shadows.forEach((saved) => {
    const el = saved.element;
    el.style.boxShadow = saved.boxShadow;
  });
}

/**
 * 从图片数据创建 A4 PDF 并保存
 * @param {string} imageData - 图片 dataUrl 或 canvas toDataURL 输出
 * @param {number} imgWidth - 图片原始宽度
 * @param {number} imgHeight - 图片原始高度
 * @param {string} filename - PDF 文件名
 * @param {boolean} useMmConversion - 是否需要像素到毫米转换（html-to-image 需要，html2canvas 不需要）
 */
function createAndSavePDF(imageData, imgWidth, imgHeight, filename, useMmConversion = false) {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  let scaledWidth, scaledHeight;
  if (useMmConversion) {
    const widthMm = imgWidth / 72 * 25.4;
    const heightMm = imgHeight / 72 * 25.4;
    const ratio = Math.min(pdfWidth / widthMm, pdfHeight / heightMm);
    scaledWidth = widthMm * ratio;
    scaledHeight = heightMm * ratio;
  } else {
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    scaledWidth = imgWidth * ratio;
    scaledHeight = imgHeight * ratio;
  }

  const x = (pdfWidth - scaledWidth) / 2;
  pdf.addImage(imageData, 'PNG', x, 0, scaledWidth, scaledHeight, undefined, 'FAST');
  pdf.save(filename);
}
