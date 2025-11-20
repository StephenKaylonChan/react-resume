# PDF 导出技术方案

## 需求
将网页版简历导出为 PDF 文件，要求：
1. 保持 A4 纸张尺寸 (210mm × 297mm)
2. 保留彩色渐变文字效果
3. 保持布局和样式
4. 高清晰度输出

## 技术方案对比

### 方案对比表
| 方案 | 优点 | 缺点 | 采用 |
|------|------|------|------|
| html2canvas | 成熟稳定 | 不支持 background-clip: text | ✅ 备用 |
| html-to-image | 更好的 CSS 支持 | 相对较新 | ✅ 主方案 |
| puppeteer | 完美渲染 | 需要后端，体积大 | ❌ |
| window.print() | 原生支持 | 无法控制文件名 | ❌ |

## 最终采用方案

### 双重降级策略
```
主方案: html-to-image (保留渐变)
   ↓ 失败
备用方案: html2canvas (纯色替代)
```

## html-to-image 实现

### 安装依赖
```bash
npm install html-to-image jspdf
```

### 核心代码
```javascript
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

export async function exportToPDF(elementId, filename = 'resume.pdf') {
  const element = document.getElementById(elementId);

  // 1. 强制颜色渲染
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    * {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
  `;
  document.head.appendChild(styleElement);

  // 2. 转换为图片
  const dataUrl = await toPng(element, {
    quality: 1.0,
    pixelRatio: 3,  // 高分辨率
    backgroundColor: '#ffffff',
    cacheBust: true,
    style: {
      '-webkit-print-color-adjust': 'exact',
      'print-color-adjust': 'exact',
    },
  });

  // 3. 清理临时样式
  document.head.removeChild(styleElement);

  // 4. 创建 PDF
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  // 5. 计算图片尺寸
  const img = new Image();
  img.src = dataUrl;
  await new Promise((resolve) => { img.onload = resolve; });

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = img.width;
  const imgHeight = img.height;

  // 6. 计算缩放比例（适配 A4）
  const ratio = Math.min(
    pdfWidth / (imgWidth / 72 * 25.4),
    pdfHeight / (imgHeight / 72 * 25.4)
  );
  const scaledWidth = (imgWidth / 72 * 25.4) * ratio;
  const scaledHeight = (imgHeight / 72 * 25.4) * ratio;

  // 7. 居中
  const x = (pdfWidth - scaledWidth) / 2;
  const y = 0;

  // 8. 添加图片到 PDF
  pdf.addImage(dataUrl, 'PNG', x, y, scaledWidth, scaledHeight, undefined, 'FAST');

  // 9. 下载
  pdf.save(filename);
}
```

## html2canvas 降级方案

### 核心代码
```javascript
async function exportToPDFWithCanvas(elementId, filename) {
  const element = document.getElementById(elementId);

  // 1. 临时替换渐变为纯色
  const optimizationResult = applyExportOptimization(element);
  await new Promise(resolve => setTimeout(resolve, 100));

  // 2. 使用 html2canvas
  const canvas = await html2canvas(element, {
    scale: 3,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
  });

  // 3. 恢复原始样式
  restoreOriginalStyles(optimizationResult);

  // 4. 创建 PDF
  const imgData = canvas.toDataURL('image/png', 1.0);
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  // 5. 添加图片
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = canvas.width;
  const imgHeight = canvas.height;
  const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

  pdf.addImage(
    imgData,
    'PNG',
    0,
    0,
    imgWidth * ratio,
    imgHeight * ratio,
    undefined,
    'FAST'
  );

  pdf.save(filename);
}
```

### 样式临时替换
```javascript
function applyExportOptimization(element) {
  const gradientTexts = element.querySelectorAll('.gradient-text');
  const shadowElements = element.querySelectorAll('.a4-shadow');

  const originalStyles = {
    gradients: [],
    shadows: []
  };

  // 渐变文字 → 纯蓝色
  gradientTexts.forEach((el) => {
    originalStyles.gradients.push({
      element: el,
      backgroundImage: el.style.backgroundImage,
      color: el.style.color,
    });

    el.style.backgroundImage = 'none';
    el.style.color = '#1e40af';
    el.style.fontWeight = '700';
  });

  // 移除阴影
  shadowElements.forEach((el) => {
    originalStyles.shadows.push({
      element: el,
      boxShadow: el.style.boxShadow,
    });
    el.style.boxShadow = 'none';
  });

  return originalStyles;
}
```

## 关键技术点

### 1. 强制颜色渲染
```css
-webkit-print-color-adjust: exact !important;
print-color-adjust: exact !important;
color-adjust: exact !important;
```
**作用**: 确保背景色和渐变在导出时正确显示

### 2. 高分辨率输出
```javascript
pixelRatio: 3,  // 3倍分辨率
scale: 3,       // html2canvas
```
**作用**: 提高清晰度，避免模糊

### 3. A4 尺寸计算
```javascript
// DPI 转换: 72 DPI → mm
const mmWidth = (pxWidth / 72) * 25.4;
```
**A4 规格**:
- 宽: 210mm
- 高: 297mm
- 像素 (72 DPI): 595 × 842

### 4. 图片格式选择
- **PNG**: 无损压缩，支持透明
- **JPEG**: 有损压缩，体积小
- **选择**: PNG（质量优先）

### 5. PDF 压缩
```javascript
compress: true  // 启用压缩
```

## 问题与解决方案

### 问题 1: 渐变文字显示为空白
**原因**: html2canvas 不支持 `background-clip: text`

**解决**:
1. 主方案：使用 html-to-image
2. 降级：临时替换为纯色

### 问题 2: 背景色丢失
**原因**: 浏览器默认不打印背景

**解决**:
```javascript
style: {
  '-webkit-print-color-adjust': 'exact',
  'print-color-adjust': 'exact',
}
```

### 问题 3: 图片模糊
**原因**: 分辨率不足

**解决**:
```javascript
pixelRatio: 3,  // 提高到 3 倍分辨率
quality: 1.0,   // 最高质量
```

### 问题 4: 阴影导出异常
**原因**: box-shadow 在某些情况下渲染不正确

**解决**:
```javascript
// 导出时临时移除阴影
shadowElements.forEach(el => {
  el.style.boxShadow = 'none';
});
```

### 问题 5: 跨域图片无法导出
**原因**: CORS 限制

**解决**:
```javascript
useCORS: true,  // 允许跨域图片
```

## 优化建议

### 性能优化
1. **按需加载**: 仅在点击导出时加载库
```javascript
const { toPng } = await import('html-to-image');
```

2. **缓存清除**: 避免使用过期缓存
```javascript
cacheBust: true
```

3. **加载状态**: 显示导出进度
```javascript
const [isExporting, setIsExporting] = useState(false);
```

### 用户体验优化
1. **文件命名**: 使用有意义的文件名
```javascript
const filename = `陈澄-简历-${new Date().toISOString().split('T')[0]}.pdf`;
```

2. **错误处理**: 友好的错误提示
```javascript
try {
  await exportToPDF(...);
} catch (error) {
  alert('PDF 导出失败，请重试');
  console.error(error);
}
```

3. **导出提示**: 显示导出状态
```jsx
<button disabled={isExporting}>
  {isExporting ? '生成中...' : '📥 导出 PDF'}
</button>
```

## 浏览器兼容性

### html-to-image
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 11+
- ✅ Edge 79+
- ❌ IE 11（不支持）

### html2canvas
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 11+
- ✅ Edge 79+
- ⚠️ IE 11（部分支持）

## 替代方案

### 1. 服务端渲染
使用 Puppeteer 或 Playwright：
```javascript
// 后端实现
const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto('http://localhost:3000');
await page.pdf({ path: 'resume.pdf', format: 'A4' });
```

**优点**: 完美渲染
**缺点**: 需要 Node.js 后端，无法纯前端实现

### 2. 原生打印
```javascript
window.print();
```

**优点**: 简单
**缺点**:
- 无法自定义文件名
- 用户体验差
- 样式可能不一致

## 最佳实践

### ✅ 推荐
- 使用双重降级策略
- 提供清晰的导出状态反馈
- 测试多种浏览器兼容性
- 压缩 PDF 文件大小

### ❌ 避免
- 不要依赖单一导出方案
- 不要忽略错误处理
- 不要使用过低的分辨率
- 不要在导出时执行复杂动画

## 调试技巧

### 1. 查看生成的图片
```javascript
const dataUrl = await toPng(element);
// 在控制台打开图片
window.open(dataUrl);
```

### 2. 检查元素样式
```javascript
console.log(window.getComputedStyle(element));
```

### 3. 测试降级方案
```javascript
// 强制使用 html2canvas
return exportToPDFWithCanvas(elementId, filename);
```

## 未来改进方向

1. **增量渲染**: 大型简历分页处理
2. **水印支持**: 添加自定义水印
3. **模板系统**: 支持多种 PDF 模板
4. **批量导出**: 导出多个版本（全栈/后端）
5. **云端生成**: 服务端渲染，更高质量
