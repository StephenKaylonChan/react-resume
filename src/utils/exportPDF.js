import { toPng } from 'html-to-image';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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

    // 使用 html-to-image（对渐变支持更好）
    const dataUrl = await toPng(element, {
      quality: 1.0,
      pixelRatio: 3, // 高清晰度
      backgroundColor: '#ffffff',
      cacheBust: true,
      // 关键配置：确保样式正确渲染
      style: {
        // 强制使用精确的颜色
        '-webkit-print-color-adjust': 'exact',
        'print-color-adjust': 'exact',
        'color-adjust': 'exact',
      },
      // 跳过不需要的元素
      filter: (node) => {
        // 排除工具栏按钮等
        if (node.classList) {
          return !node.classList.contains('print:hidden');
        }
        return true;
      },
    });

    // 移除临时样式
    document.head.removeChild(styleElement);

    // 创建 PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    // 创建图片对象
    const img = new Image();
    img.src = dataUrl;

    // 等待图片加载
    await new Promise((resolve) => {
      img.onload = resolve;
    });

    // 计算尺寸以适配 A4
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = img.width;
    const imgHeight = img.height;

    // 计算缩放比例
    const ratio = Math.min(pdfWidth / (imgWidth / 72 * 25.4), pdfHeight / (imgHeight / 72 * 25.4));
    const scaledWidth = (imgWidth / 72 * 25.4) * ratio;
    const scaledHeight = (imgHeight / 72 * 25.4) * ratio;

    // 居中
    const x = (pdfWidth - scaledWidth) / 2;
    const y = 0;

    pdf.addImage(dataUrl, 'PNG', x, y, scaledWidth, scaledHeight, undefined, 'FAST');
    pdf.save(filename);

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

    // 使用 html2canvas
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

    // 创建 PDF
    const imgData = canvas.toDataURL('image/png', 1.0);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 0;

    pdf.addImage(
      imgData,
      'PNG',
      imgX,
      imgY,
      imgWidth * ratio,
      imgHeight * ratio,
      undefined,
      'FAST'
    );

    pdf.save(filename);
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
