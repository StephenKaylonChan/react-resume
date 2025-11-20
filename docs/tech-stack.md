# 技术栈说明

## 核心依赖

### 前端框架
```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0"
}
```
- **React 19**: 最新版本，性能优化，现代化特性
- 使用函数组件和 Hooks

### 构建工具
```json
{
  "vite": "^7.2.0",
  "@vitejs/plugin-react": "^4.3.4"
}
```
- **Vite 7**: 极快的开发服务器
- 原生 ESM 支持
- 优化的生产构建

### 样式框架
```json
{
  "tailwindcss": "^3.4.0",
  "autoprefixer": "^10.4.20",
  "postcss": "^8.4.49"
}
```
- **Tailwind CSS v3.4.0**: 实用优先的 CSS 框架
- **PostCSS**: CSS 转换工具
- **Autoprefixer**: 自动添加浏览器前缀

### PDF 导出
```json
{
  "html-to-image": "^1.11.11",
  "html2canvas": "^1.4.1",
  "jspdf": "^2.5.2"
}
```
- **html-to-image**: 主要导出方案（支持渐变）
- **html2canvas**: 备用方案
- **jsPDF**: PDF 生成库

## 开发依赖

```json
{
  "@eslint/js": "^9.17.0",
  "eslint": "^9.17.0",
  "eslint-plugin-react": "^7.37.3",
  "eslint-plugin-react-hooks": "^5.0.0",
  "eslint-plugin-react-refresh": "^0.4.16",
  "globals": "^15.14.0"
}
```
- **ESLint**: 代码质量检查
- **React ESLint 插件**: React 最佳实践规则

## 版本选择说明

### React 19 vs React 18
选择 React 19 的原因：
- 更好的性能
- 新的并发特性
- 改进的 Hooks API
- 项目较新，可以使用最新版本

### Tailwind CSS v3 vs v4
选择 v3.4.0 的原因：
- v4 还在 beta 阶段，不够稳定
- v3 生态成熟，文档完善
- JIT 模式已经很快
- 兼容性更好

### Vite vs Webpack
选择 Vite 的原因：
- 开发服务器启动速度极快（几百ms）
- HMR 更新速度快
- 配置简单
- 原生支持 ES modules
- 生产构建使用 Rollup，体积小

## Tailwind 配置亮点

### 1. 自定义 A4 尺寸
```javascript
theme: {
  extend: {
    width: { 'a4': '210mm' },
    minHeight: { 'a4': '297mm' },
    height: { 'a4': '297mm' }
  }
}
```

### 2. 29 种渐变配置
为不同技术栈配置专属渐变颜色：
- `gradient-java`: Java 橙色渐变
- `gradient-python`: Python 蓝黄渐变
- `gradient-react`: React 青色渐变
- `gradient-spring`: Spring 绿色渐变
- ... 共 29 种

### 3. 自定义颜色
```javascript
colors: {
  'sidebar-teal': '#0f766e'  // 侧边栏背景色
}
```

## 浏览器兼容性

### 目标浏览器
```javascript
// package.json
"browserslist": {
  "production": [
    ">0.2%",
    "not dead",
    "not op_mini all"
  ],
  "development": [
    "last 1 chrome version",
    "last 1 firefox version",
    "last 1 safari version"
  ]
}
```

### CSS 兼容性
- Tailwind CSS: 现代浏览器
- Flexbox/Grid: 广泛支持
- CSS Variables: 支持 IE 11+（通过 PostCSS）

## 性能优化

### 构建优化
- Vite 自动代码分割
- Tree-shaking 移除未使用代码
- CSS 压缩和优化
- 资源懒加载

### 运行时优化
- 函数组件（比类组件更轻量）
- 避免不必要的重渲染
- 图片优化（JPG 证件照）

## 未来可扩展性

### 潜在升级
1. **TypeScript**: 增加类型安全
2. **状态管理**: 如果内容变得动态（Zustand/Jotai）
3. **内容管理**: 从 Markdown 文件读取内容
4. **多语言**: i18n 国际化支持
5. **主题切换**: 多套配色方案
6. **在线编辑**: 实时编辑简历内容

### 不建议的升级
- ❌ 不建议升级到 Tailwind v4（beta 阶段）
- ❌ 不建议添加复杂状态管理（内容基本静态）
- ❌ 不建议使用 SSR（无需 SEO）
