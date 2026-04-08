import { toPng } from 'html-to-image';
import { getToPngOptions } from './exportConfig';

/**
 * 将简历导出为高清 PNG 图片
 * @param {string} elementId - 要截图的元素 ID
 * @param {string} filename - 导出文件名
 * @returns {Promise<boolean>}
 */
export async function exportToImage(elementId, filename = '陈澄-简历.png') {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with id "${elementId}" not found`);
  }

  const dataUrl = await toPng(element, getToPngOptions());

  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  link.click();

  return true;
}
