# 组件设计文档

## 组件概览

### 1. App.jsx - 主应用组件
**路径**: `src/App.jsx`
**职责**: 应用入口，管理 PDF 导出功能

#### 功能
- 渲染简历内容容器
- 提供 PDF 导出按钮
- 管理导出状态（loading）

#### 状态管理
```javascript
const [isExporting, setIsExporting] = useState(false);
```

#### 关键代码
```javascript
const handleExportPDF = async () => {
  setIsExporting(true);
  await exportToPDF('resume-content', '陈澄-简历.pdf');
  setIsExporting(false);
};
```

---

### 2. A4Page.jsx - A4 纸张容器
**路径**: `src/components/A4Page.jsx`
**职责**: 提供 A4 纸张尺寸的容器

#### 特点
- 固定 A4 尺寸 (210mm × 297mm)
- 两栏 Grid 布局 (70% + 30%)
- 屏幕显示带阴影，打印时无阴影
- 白色背景

#### 布局结构
```javascript
<div className="w-a4 min-h-a4 bg-white grid grid-cols-[7fr_3fr]">
  {children}  {/* Resume 和 ResumeSidebar */}
</div>
```

#### 响应式设计
- `a4-shadow` class: 仅屏幕显示时生效
- `print:` 修饰符: 打印时移除阴影

---

### 3. GradientText.jsx - 渐变文字组件
**路径**: `src/components/GradientText.jsx`
**职责**: 为技术关键词添加彩色渐变效果

#### Props
- `children`: 要显示的文本
- `gradient`: 渐变类型（如 'gradient-react'）

#### 核心实现
```javascript
const gradientClasses = {
  'gradient-python': 'bg-gradient-python',
  'gradient-java': 'bg-gradient-java',
  'gradient-react': 'bg-gradient-react',
  // ... 29 种渐变映射
};

const className = gradientClasses[gradient] || '';
```

#### 重要技术点
**为什么需要显式映射？**
- Tailwind JIT 模式不支持动态类名
- `` `bg-${gradient}` `` 不会被编译
- 必须使用完整的类名字符串

#### 样式
```javascript
style={{
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  display: 'inline',
}}
```

#### 打印降级
打印时通过 CSS 转为纯色：
```css
@media print {
  .gradient-text {
    background: none !important;
    color: #1e40af !important;
    font-weight: 700 !important;
  }
}
```

---

### 4. ResumeHeader.jsx - 头部信息
**路径**: `src/components/ResumeHeader.jsx`
**职责**: 显示职位标题和联系信息

#### 子组件
**ContactIcon** - 联系方式图标
- 支持 5 种图标类型: email, phone, github, website, location
- SVG 图标，无需外部依赖

#### 布局
- 职位标题: 蓝色加粗
- 联系信息: 2 列网格布局
- 所有链接可点击（mailto:, tel:, https://）

#### 联系信息
```javascript
{
  email: 'chenchengpre@163.com',
  phone: '13519399194',
  github: 'github.com/isabellakiko',
  website: 'kaylonchan.com',
  location: '上海，中国'
}
```

---

### 5. Resume.jsx - 主内容区域
**路径**: `src/components/Resume.jsx`
**职责**: 左侧主要内容（个人简介、工作经历、项目、教育）

#### 子组件
**SectionTitle** - 章节标题
```javascript
const SectionTitle = ({ children }) => (
  <h2 className="text-[0.85rem] font-bold uppercase border-b">
    {children}
  </h2>
);
```

#### 内容结构
1. **个人简介** - 单段文字，技术关键词高亮
2. **工作经历** - 2 份工作
   - 公司名、职位、时间、地点
   - 4 条工作内容（列表形式）
3. **项目经验** - 3 个项目
   - 项目名称、技术栈、描述
4. **教育背景** - 学历信息
   - 学校、专业、时间
   - 毕业设计、课程

#### 样式特点
- 使用小字号 (0.75rem - 0.9rem)
- 蓝色项目符号
- 技术关键词渐变高亮

---

### 6. ResumeSidebar.jsx - 侧边栏
**路径**: `src/components/ResumeSidebar.jsx`
**职责**: 右侧边栏（头像、技能、成就）

#### 背景色
- `bg-sidebar-teal` (#0f766e)
- 白色文字

#### 内容结构
1. **头部区域**
   - 证件照 (95px × 115px)
   - 姓名（中英文）

2. **学习成果** (3 条)
   - emoji 图标
   - 标题 + 描述

3. **专业技能** (6 类)
   - 前端技术
   - 数据分析
   - 桌面应用开发
   - 后端技术（快速成长中）
   - AI 工具应用
   - 开发工具

4. **技术社区** (2 项)
   - Linux DO 社区
   - GitHub 开源

5. **个人兴趣**
   - 文字描述

#### 技能标签样式
```javascript
// 高亮技能 (bg-white/30)
<span className="bg-white/30 rounded">核心技能</span>

// 普通技能 (bg-white/20)
<span className="bg-white/20 rounded">辅助技能</span>

// 后端技能 (bg-orange-400/30)
<span className="bg-orange-400/30 rounded">后端技能</span>
```

---

## 组件间通信

### 当前实现
- **无状态管理**: 所有内容硬编码在组件中
- **单向数据流**: 无需跨组件通信
- **纯展示组件**: 无复杂交互

### 优点
- 简单直接
- 无额外依赖
- 易于理解

### 缺点
- 内容更新需修改代码
- 无法动态切换版本（全栈 vs 后端）

---

## 组件复用建议

### 可复用的模式
1. **SectionTitle** - 已抽离，可在多处使用
2. **ContactIcon** - 图标组件，易于扩展
3. **GradientText** - 通用渐变文字

### 可改进的地方
1. **工作经历/项目** - 可抽离为独立组件
2. **技能标签** - 可统一为 SkillTag 组件
3. **列表项** - 可抽离为 BulletPoint 组件

### 示例优化
```javascript
// 当前
<span className="text-[0.6rem] px-1.5 py-0.5 bg-white/30 rounded">
  React
</span>

// 优化后
<SkillTag level="primary">React</SkillTag>
<SkillTag level="secondary">Vue.js</SkillTag>
<SkillTag level="backend">Spring Boot</SkillTag>
```

---

## 组件测试建议

### 建议添加的测试
1. **GradientText** - 渐变映射是否正确
2. **A4Page** - 尺寸是否符合 A4 规格
3. **ContactIcon** - 所有图标类型是否渲染
4. **PDF Export** - 导出功能是否正常

### 测试工具推荐
- **Vitest**: 与 Vite 集成良好
- **React Testing Library**: 组件测试
- **Playwright**: E2E 测试（PDF 导出）
