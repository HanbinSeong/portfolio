import { Project } from '../types';

export function parseProjectMarkdown(md: string): Project {
  // 1. Extract Title (# Title)
  const titleMatch = md.match(/^# (.*)/m);
  const title = titleMatch ? titleMatch[1].trim() : 'Untitled Project';

  // 2. Extract Links and Period
  const githubMatch = md.match(/\[🔗 \[Github\]\((.*?)\) \]/);
  const demoMatch = md.match(/\[🎥 \[Demo\]\((.*?)\) \]/);
  const pptMatch = md.match(/\[📊 \[PPT\]\((.*?)\) \]/);
  const periodMatch = md.match(/\*\*진행 기간\*\*:\s*(.*)/);
  
  const github = githubMatch ? githubMatch[1] : undefined;
  const link = demoMatch ? demoMatch[1] : undefined;
  const ppt = pptMatch ? pptMatch[1] : undefined;
  const period = periodMatch ? periodMatch[1].trim() : undefined;

  // 3. Extract Image (Specifically "Project Banner" if available)
  const bannerMatch = md.match(/!\[프로젝트 배너\]\((.*?)\)/);
  const image = bannerMatch ? bannerMatch[1] : (md.match(/!\[.*?\]\((.*?)\)/)?.[1] || 'https://picsum.photos/seed/project/800/600');

  // 4. Extract Tags from ## Skills section
  let tags: string[] = [];
  const skillsMatch = md.match(/## Skills([\s\S]*?)(?=\n##|$)/);
  if (skillsMatch) {
    const skillsContent = skillsMatch[1];
    const skillLines = skillsContent.split('\n');
    skillLines.forEach(line => {
      // Handle "- **Category**: item1, item2"
      const colonMatch = line.match(/:\s*(.*)/);
      if (colonMatch) {
        const items = colonMatch[1].split(',').map(i => i.trim());
        tags = [...tags, ...items];
      } else {
        // Handle "- item1, item2" or just "- item1"
        const listMatch = line.match(/^-\s*(.*)/);
        if (listMatch) {
          const items = listMatch[1].split(',').map(i => i.trim());
          tags = [...tags, ...items];
        }
      }
    });
  }
  tags = Array.from(new Set(tags)).filter(t => t.length > 0);
  if (tags.length === 0) tags = ['Project'];

  // 5. Prepare Content for Detail View
  
  let content = md;
  
  // Remove H1 Title
  content = content.replace(/^# .*\n?/m, '');
  
  // Remove Project Banner Image from Detail View
  content = content.replace(/!\[프로젝트 배너\].*\n?/g, '');
  
  // Remove Metadata lines (Links and Period)
  content = content.replace(/\[.*\[Github\].*\]\(.*\).*\n?/g, '');
  content = content.replace(/\[.*\[Demo\].*\]\(.*\).*\n?/g, '');
  content = content.replace(/\[.*\[PPT\].*\]\(.*\).*\n?/g, '');
  content = content.replace(/\*\*진행 기간\*\*.*\n?/g, '');
  
  // Optional: Remove Skills section if we want it ONLY as tags on the card
  content = content.replace(/## Skills[\s\S]*?(?=\n##|$)/, '');

  return {
    title,
    description: '', // Not used
    tags,
    github,
    link,
    ppt,
    image,
    period,
    content: content.trim()
  };
}
