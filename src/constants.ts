import { Project, Experience, Skill } from './types';
import { parseProjectMarkdown } from './lib/projectParser';

// Load all markdown files from the projects directory
// @ts-ignore - Vite specific API
const projectModules = import.meta.glob('./projects/*.md', { eager: true, query: '?raw' });

// Sort by filename to ensure consistent order
const sortedProjectPaths = Object.keys(projectModules).sort();

export const PROJECTS: Project[] = sortedProjectPaths.map((path) => {
  const mod: any = projectModules[path];
  return parseProjectMarkdown(mod.default);
});

export const PERSONAL_INFO = {
  name: "성한빈 (Han-bin Seong)",
  role: "Full-Stack Developer",
  email: "briquetroad@gmail.com",
  github: "https://github.com/HanbinSeong",
  // blog: "https://velog.io/@chulsoo",
  bio: "문제의 원인을 파헤치는 개발자 성한빈입니다. 복잡한 문제를 단순화하고 효율적인 코드를 작성하는 것에 열정이 있습니다. 새로운 기술을 배우고 공유하는 것을 즐기며, 팀과 함께 성장하는 환경을 선호합니다.",
};

export const SKILLS: Skill[] = [
  // Frontend
  { name: "HTML5", category: "Frontend", bgColor: "#E34F26", textColor: "#FFFFFF" },
  { name: "JavaScript", category: "Frontend", bgColor: "#F7DF1E", textColor: "#000000" },
  { name: "TypeScript", category: "Frontend", bgColor: "#3178C6", textColor: "#FFFFFF" },
  { name: "React", category: "Frontend", bgColor: "#61DAFB", textColor: "#000000" },
  { name: "Next.js", category: "Frontend", bgColor: "#000000", textColor: "#FFFFFF" },
  { name: "Tailwind CSS", category: "Frontend", bgColor: "#06B6D4", textColor: "#FFFFFF" },
  { name: "Streamlit", category: "Frontend", bgColor: "#FF4B4B", textColor: "#FFFFFF" },

  // Backend
  { name: "Java", category: "Backend", bgColor: "#007396", textColor: "#FFFFFF" },
  { name: "Spring Boot", category: "Backend", bgColor: "#6DB33F", textColor: "#FFFFFF" },
  { name: "Python", category: "Backend", bgColor: "#3776AB", textColor: "#FFFFFF" },
  { name: "FastAPI", category: "Backend", bgColor: "#05998B", textColor: "#FFFFFF" },
  { name: "SQLAlchemy", category: "Backend", bgColor: "#D71F00", textColor: "#FFFFFF" },

  // AI & Data Engineering
  { name: "LangChain", category: "AI & Data Engineering", bgColor: "#121212", textColor: "#FFFFFF" },
  { name: "LangGraph", category: "AI & Data Engineering", bgColor: "#000000", textColor: "#FFFFFF" },
  { name: "MCP", category: "AI & Data Engineering", bgColor: "#4F46E5", textColor: "#FFFFFF" },
  { name: "Spring AI", category: "AI & Data Engineering", bgColor: "#6DB33F", textColor: "#FFFFFF" },
  { name: "RAG", category: "AI & Data Engineering", bgColor: "#3B82F6", textColor: "#FFFFFF" },
  { name: "Pandas", category: "AI & Data Engineering", bgColor: "#150458", textColor: "#FFFFFF" },
  { name: "Numpy", category: "AI & Data Engineering", bgColor: "#013243", textColor: "#FFFFFF" },
  { name: "Selenium", category: "AI & Data Engineering", bgColor: "#43B02A", textColor: "#FFFFFF" },
  { name: "Requests", category: "AI & Data Engineering", bgColor: "#FFD43B", textColor: "#000000" },
  { name: "Matplotlib", category: "AI & Data Engineering", bgColor: "#11557C", textColor: "#FFFFFF" },
  { name: "Seaborn", category: "AI & Data Engineering", bgColor: "#4C72B0", textColor: "#FFFFFF" },
  { name: "Folium", category: "AI & Data Engineering", bgColor: "#77B02A", textColor: "#FFFFFF" },

  // Database & Search & Message Broker
  { name: "MariaDB", category: "Database & Search & Message Broker", bgColor: "#003545", textColor: "#FFFFFF" },
  { name: "MySQL", category: "Database & Search & Message Broker", bgColor: "#4479A1", textColor: "#FFFFFF" },
  { name: "Pinecone", category: "Database & Search & Message Broker", bgColor: "#121212", textColor: "#FFFFFF" },
  { name: "OpenSearch", category: "Database & Search & Message Broker", bgColor: "#005EB8", textColor: "#FFFFFF" },
  { name: "Kafka", category: "Database & Search & Message Broker", bgColor: "#231F20", textColor: "#FFFFFF" },

  // Infrastructure & DevOps
  { name: "AWS", category: "Infrastructure & DevOps", bgColor: "#232F3E", textColor: "#FFFFFF" },
  { name: "Kubernetes", category: "Infrastructure & DevOps", bgColor: "#326CE5", textColor: "#FFFFFF" },
  { name: "Docker", category: "Infrastructure & DevOps", bgColor: "#2496ED", textColor: "#FFFFFF" },
  { name: "Terraform", category: "Infrastructure & DevOps", bgColor: "#7B42BC", textColor: "#FFFFFF" },
  { name: "Jenkins", category: "Infrastructure & DevOps", bgColor: "#D24939", textColor: "#FFFFFF" },
  { name: "GitHub Actions", category: "Infrastructure & DevOps", bgColor: "#2088FF", textColor: "#FFFFFF" },

  // Collaboration & Tools
  { name: "GitHub", category: "Collaboration & Tools", bgColor: "#181717", textColor: "#FFFFFF" },
  { name: "Notion", category: "Collaboration & Tools", bgColor: "#000000", textColor: "#FFFFFF" },
];

export const EXPERIENCES: Experience[] = [
  {
    // company: "더존 AX 서비스 아키텍트 양성과정",
    role: "더존 AX 서비스 아키텍트 양성과정",
    period: "2025.03 - 2025.09",
    description: [
      "비전공자임에도 '문제발생 - 원인분석 - 해결'이라는 공학적 논리를 코드에 접목하여 프론트엔드(React TypeScript)부터 백엔드(Python, JavaScript, Java SpringBoot), 인프라/CI·CD(AWS, Jenkins, Github Actions)까지 전체 개발 사이클을 빠르게 습득",
      "교육과정 동안 다양한 기술스택을 이론으로 학습한 후, 실제 프로젝트와 실습을 통해 즉시 체화하여 실질적인 개발 역량 강화",
      "AI 코드로 인한 코드의 복잡성과 잠재적 버그 문제를 팀과 함께 해결. 단순히 코드를 복사하는 대신 공식 API 문서를 철저히 분석하고 모듈 단위로 코드를 제어하는 '검증 중심의 개발 방법론'을 확립",
      "새로운 기술스택 도입 단계에서 기술 원리, 초기 설정법, 예제 코드 등을 노션 가이드로 작성 및 배포. 이를 통해 팀원들의 적응 시간을 대폭 단축하고, 팀 전체가 원활하게 프로젝트에 적응할 수 있도록 기여",
    ],
  },
];
