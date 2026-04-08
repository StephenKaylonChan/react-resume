import personalInfo from '../../resume-content/personal-info.md?raw';
import workExperience from '../../resume-content/work-experience.md?raw';
import projects from '../../resume-content/projects.md?raw';
import skills from '../../resume-content/skills.md?raw';
import education from '../../resume-content/education.md?raw';

/**
 * 将简历内容导出为 Markdown 文件
 * 合并 resume-content/ 下的所有 Markdown 源文件为单一文档
 * @param {string} filename - 导出文件名
 */
export function exportToMarkdown(filename = '陈澄-简历.md') {
  const sections = [
    personalInfo,
    workExperience,
    projects,
    skills,
    education,
  ];

  const content = sections.join('\n---\n\n');

  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
}
