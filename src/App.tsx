/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Github,
  Mail,
  ExternalLink,
  Code2,
  User,
  Briefcase,
  GraduationCap,
  ChevronRight,
  Globe,
  X,
  Play,
  ChevronDown,
  ChevronUp,
  FileDown
} from "lucide-react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PortfolioPDF } from "./components/PortfolioPDF.tsx";
import { PERSONAL_INFO, SKILLS, PROJECTS, EXPERIENCES } from "./constants";

export default function App() {
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [expandedProjectIds, setExpandedProjectIds] = useState<string[]>([]);

  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const openVideo = (url: string) => {
    const id = getYoutubeId(url);
    if (id) setSelectedVideoId(id);
  };

  const toggleDetail = (title: string) => {
    setExpandedProjectIds(prev => 
      prev.includes(title) ? prev.filter(id => id !== title) : [...prev, title]
    );
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#1a1a1a] font-sans selection:bg-blue-100">
      {/* YouTube Modal */}
      <AnimatePresence>
        {selectedVideoId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-10"
            onClick={() => setSelectedVideoId(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedVideoId(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
              >
                <X size={24} />
              </button>
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-bold text-xl tracking-tight">PORTFOLIO</span>
          <div className="flex items-center gap-4 md:gap-8">
            <div className="hidden md:flex gap-8 text-sm font-medium text-gray-500">
              <a href="#about" className="hover:text-black transition-colors">About</a>
              <a href="#skills" className="hover:text-black transition-colors">Skills</a>
              <a href="#experience" className="hover:text-black transition-colors">Experience</a>
              <a href="#projects" className="hover:text-black transition-colors">Projects</a>
            </div>
            <PDFDownloadLink
              document={<PortfolioPDF />}
              fileName={`portfolio_${PERSONAL_INFO.name.split(' ')[0]}.pdf`}
            >
              {({ loading }) => (
                <button
                  disabled={loading}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-bold hover:bg-blue-700 transition-all shadow-sm no-print disabled:opacity-50"
                >
                  <FileDown size={16} />
                  <span className="hidden sm:inline">
                    {loading ? "생성 중..." : "PDF 추출"}
                  </span>
                </button>
              )}
            </PDFDownloadLink>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-32 pb-20">
        {/* Hero Section */}
        <section className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              안녕하세요, <br />
              <span className="text-blue-600">{PERSONAL_INFO.role}</span> <br />
              {PERSONAL_INFO.name}입니다.
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl leading-relaxed mb-8">
              {PERSONAL_INFO.bio}
            </p>
            <div className="flex gap-4">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-all"
              >
                <Github size={20} /> GitHub
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-full font-medium hover:border-black transition-all"
              >
                <Mail size={20} /> Contact
              </a>
            </div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="mb-32 scroll-mt-32">
          <div className="flex items-center gap-3 mb-12">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <User size={24} />
            </div>
            <h2 className="text-3xl font-bold">About Me</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>
                "문제의 원인"을 파헤치는 기계공학적 사고방식으로 탄탄한 백엔드 시스템을 설계합니다.
              </p>
              <p>
                AI 코드를 맹신하지 않고 공식 문서 기반으로 철저한 모듈 단위 검증을 통해 할루시네이션을 방지하고 견고한 로직을 구현합니다.
              </p>
              <p>
                복잡한 기술은 동료들이 이해하기 쉽게 문서화하여, 팀 전체의 버그를 줄이고 개발 속도를 높이는데 기여하고, 최신 기술 트렌드를 팔로우하며 빠르게 적응하고 성과를 내겠습니다.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <GraduationCap size={20} className="text-blue-600" /> Education
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold">한국항공대학교 기계공학</p>
                  <p className="text-sm text-gray-500">2015.03 - 2021.02 (수료)</p>
                </div>
                <div className="h-px bg-gray-100" />
                <div>
                  <p className="font-semibold">정보처리기사 필기취득</p>
                  <p className="text-sm text-gray-500">2026.04 (실기예정)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="mb-32 scroll-mt-32">
          <div className="flex items-center gap-3 mb-12">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Code2 size={24} />
            </div>
            <h2 className="text-3xl font-bold">Skills</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {SKILLS.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02 }}
                whileHover={{ scale: 1.05 }}
                style={{ backgroundColor: skill.bgColor, color: skill.textColor }}
                className="px-5 py-2.5 rounded-md font-bold text-sm shadow-sm flex items-center gap-2 cursor-default select-none"
              >
                <span className="tracking-wider">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="mb-32 scroll-mt-32">
          <div className="flex items-center gap-3 mb-12">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Briefcase size={24} />
            </div>
            <h2 className="text-3xl font-bold">Experience</h2>
          </div>
          <div className="space-y-8">
            {EXPERIENCES.map((exp, index) => (
              <motion.div
                key={exp.role || index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-8 border-l-2 border-gray-100 pb-8 last:pb-0"
              >
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-blue-600 border-4 border-white shadow-sm" />
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                  {exp.role && (
                    <h3 className="text-xl font-bold">{exp.role}</h3>
                  )}
                  {exp.company && (
                    <p className="text-blue-600 font-semibold">{exp.company}</p>
                  )}
                  </div>
                  <span className="text-sm font-medium text-gray-400 mt-1 md:mt-0">{exp.period}</span>
                </div>
                <ul className="space-y-2">
                  {exp.description.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-gray-600">
                      <ChevronRight size={18} className="mt-1 flex-shrink-0 text-blue-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-32 scroll-mt-32">
          <div className="flex items-center gap-3 mb-12">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Globe size={24} />
            </div>
            <h2 className="text-3xl font-bold">Projects</h2>
          </div>
          <div className="flex flex-col gap-12">
            {PROJECTS.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  opacity: { duration: 0.5, delay: index * 0.1 },
                  y: { duration: 0.5, delay: index * 0.1 },
                  layout: { duration: 0.4, ease: "easeInOut" }
                }}
                className="bg-white rounded-3xl overflow-hidden border border-gray-100 group hover:shadow-xl transition-shadow w-full"
              >
                <div className="grid md:grid-cols-[1fr_1.5fr] gap-0">
                  <div className="aspect-video md:aspect-auto overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-8 md:p-12">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-gray-50 text-gray-500 text-xs font-medium rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className={`text-3xl font-bold ${project.period ? 'mb-2' : 'mb-8'}`}>{project.title}</h3>
                    {project.period && (
                      <p className="text-sm font-medium text-blue-500 mb-8">{project.period}</p>
                    )}

                    <div className="flex flex-wrap gap-6 mb-8">
                      {project.github && (
                        <a href={project.github} className="flex items-center gap-1 text-sm font-bold hover:text-blue-600 transition-colors">
                          <Github size={18} /> Code
                        </a>
                      )}
                      {project.link && (
                        <button
                          onClick={() => openVideo(project.link!)}
                          className="flex items-center gap-1 text-sm font-bold hover:text-blue-600 transition-colors"
                        >
                          <Play size={18} /> Watch Demo
                        </button>
                      )}
                      {project.ppt && (
                        <a href={project.ppt} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm font-bold hover:text-blue-600 transition-colors">
                          <ExternalLink size={18} /> PPT
                        </a>
                      )}
                    </div>

                    {/* Detail Button */}
                    <button
                      onClick={() => toggleDetail(project.title)}
                      className="flex items-center gap-2 px-6 py-3 bg-blue-50 text-blue-600 rounded-full font-bold hover:bg-blue-100 transition-all"
                    >
                      {expandedProjectIds.includes(project.title) ? (
                        <>
                          <ChevronUp size={20} /> Close Detail
                        </>
                      ) : (
                        <>
                          <ChevronDown size={20} /> View Detail
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {expandedProjectIds.includes(project.title) && (
                    <motion.div
                      key="content"
                      layout
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden bg-gray-50/50"
                    >
                      <div className="p-8 md:p-12 border-t border-gray-100">
                        <div className="prose prose-slate prose-base max-w-none text-[#37352f] leading-[1.6] prose-headings:font-bold prose-headings:text-[#37352f] prose-code:before:content-none prose-code:after:content-none prose-pre:bg-transparent prose-pre:p-0">
                          <Markdown
                            rehypePlugins={[rehypeRaw]}
                            components={{
                              h2: ({ children }) => (
                                <h2 className="text-[1.875rem] font-bold mt-[2em] mb-[0.5em] pb-[0.25em] border-b border-[#e9e9e8] text-[#37352f]">
                                  {children}
                                </h2>
                              ),
                              h3: ({ children }) => (
                                <h3 className="text-[1.5rem] font-bold mt-[1.5em] mb-[0.5em] text-[#37352f]">
                                  {children}
                                </h3>
                              ),
                              h4: ({ children }) => (
                                <h4 className="text-[1.25rem] font-bold mt-[1.25em] mb-[0.5em] text-[#37352f]">
                                  {children}
                                </h4>
                              ),
                              p: ({ children }) => (
                                <p className="my-[0.75em] text-[#37352f]">
                                  {children}
                                </p>
                              ),
                              ul: ({ children }) => (
                                <ul className="list-disc pl-[1.5em] my-[0.75em] space-y-[0.25em]">
                                  {children}
                                </ul>
                              ),
                              ol: ({ children }) => (
                                <ol className="list-decimal pl-[1.5em] my-[0.75em] space-y-[0.25em]">
                                  {children}
                                </ol>
                              ),
                              li: ({ children }) => (
                                <li className="text-[#37352f]">
                                  {children}
                                </li>
                              ),
                              blockquote: ({ children }) => (
                                <blockquote className="border-l-4 border-[#37352f] pl-[1em] my-[1em] italic text-[#787774]">
                                  {children}
                                </blockquote>
                              ),
                              code: ({ children, className }) => {
                                const isInline = !className;
                                return isInline ? (
                                  <code className="bg-[#f2f2f1] px-[0.4em] py-[0.2em] rounded-[3px] text-[0.9em] font-mono text-[#eb5757] font-normal">
                                    {children}
                                  </code>
                                ) : (
                                  <code className="block p-[1.5em] bg-[#f7f6f3] text-[#37352f] rounded-[4px] overflow-x-auto text-[0.9em] font-mono leading-[1.5]">
                                    {children}
                                  </code>
                                );
                              },
                              pre: ({ children }) => (
                                <div className="my-[1.5em] bg-[#f7f6f3] rounded-[4px] border border-[#e9e9e8]">
                                  <pre className="p-0 m-0 bg-transparent">
                                    {children}
                                  </pre>
                                </div>
                              ),
                              img: ({ src, alt }) => (
                                <div className="my-[2em] flex flex-col items-center">
                                  <img 
                                    src={src} 
                                    alt={alt} 
                                    referrerPolicy="no-referrer"
                                    className="rounded-[2px] max-w-full h-auto shadow-sm border border-[#e9e9e8]"
                                  />
                                  {alt && <span className="mt-[0.5em] text-[0.8em] text-[#787774]">{alt}</span>}
                                </div>
                              ),
                              hr: () => <hr className="my-[2em] border-0 border-t border-[#e9e9e8]" />,
                              details: ({ children }) => (
                                <details className="group my-[0.5em] p-[0.25em] rounded-[3px] hover:bg-[#efefef] transition-colors">
                                  {children}
                                </details>
                              ),
                              summary: ({ children }) => (
                                <summary className="list-none cursor-pointer font-bold flex items-center gap-2 text-[#37352f]">
                                  <span className="group-open:rotate-90 transition-transform duration-200">
                                    <ChevronRight size={16} />
                                  </span>
                                  {children}
                                </summary>
                              )
                            }}
                          >
                            {project.content}
                          </Markdown>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                {/* Print-only detail view (always visible when printing) */}
                <div className="hidden print:block p-8 md:p-12 border-t border-gray-100 bg-white">
                  <div className="prose prose-slate prose-sm max-w-none text-[#37352f]">
                    <Markdown rehypePlugins={[rehypeRaw]}>
                      {project.content}
                    </Markdown>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer / Contact */}
        <footer className="pt-20 border-t border-gray-100 text-center">
          <div className="flex justify-center gap-6 mb-12">
            <a href={`mailto:${PERSONAL_INFO.email}`} className="p-4 bg-white rounded-full border border-gray-100 hover:border-black transition-all shadow-sm">
              <Mail size={24} />
            </a>
            <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="p-4 bg-white rounded-full border border-gray-100 hover:border-black transition-all shadow-sm">
              <Github size={24} />
            </a>
          </div>
          <p className="text-gray-400 text-sm">© 2026 {PERSONAL_INFO.name}. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}
