import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image, Link } from '@react-pdf/renderer';
import { PERSONAL_INFO, SKILLS, PROJECTS, EXPERIENCES } from '../constants';

// Register Korean Font
Font.register({
  family: 'NanumGothic',
  src: 'https://fonts.gstatic.com/ea/nanumgothic/v5/NanumGothic-Regular.ttf',
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'NanumGothic',
    fontSize: 10,
    color: '#37352f',
    lineHeight: 1.5,
  },
  header: {
    marginBottom: 20,
    borderBottom: 1,
    borderBottomColor: '#e9e9e8',
    paddingBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  role: {
    marginTop: 10,
    fontSize: 14,
    color: '#787774',
    marginBottom: 8,
  },
  contact: {
    flexDirection: 'row',
    // gap: 15,
    fontSize: 9,
    color: '#37352f',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1a1a1a',
    borderBottom: 1,
    borderBottomColor: '#f1f1f0',
    paddingBottom: 8,
  },
  bio: {
    marginTop: 5,
    marginBottom: 10,
    textAlign: 'justify',
  },
  skillGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
    marginBottom: 10,
  },
  skillBadge: {
    padding: '2 6',
    borderRadius: 4,
    fontSize: 8,
    marginRight: 5,   // gap 대신 여백 추가
    marginBottom: 5,  // 줄바꿈 시 상하 여백을 위해 추가
  },
  experienceItem: {
    marginTop: 5,
    marginBottom: 12,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  experienceRole: {
    fontWeight: 'bold',
    fontSize: 11,
  },
  experiencePeriod: {
    color: '#787774',
    fontSize: 9,
  },
  experienceBullet: {
    marginLeft: 10,
    marginBottom: 2,
    flexDirection: 'row',
  },
  bulletPoint: {
    width: 10,
  },
  bulletText: {
    flex: 1,
  },
  projectItem: {
    marginTop: 5,
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f7f6f3',
    borderRadius: 4,
  },
  projectTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  projectPeriod: {
    fontSize: 8,
    color: '#787774',
    marginBottom: 6,
  },
  projectContent: {
    fontSize: 9,
    color: '#37352f',
    marginBottom: 4,
  },
  // 이미지 스타일 추가
  projectImage: {
    marginVertical: 10,
    maxWidth: '100%',
    maxHeight: 400,
    borderRadius: 4,
    objectFit: 'contain',
  },
  // 2. 하이퍼링크용 텍스트 스타일 추가
  linkText: {
    color: '#0066cc',          // 링크 파란색
    textDecoration: 'none',    // 혹은 'underline' (취향에 맞게 선택)
  },
});

// Simple markdown stripper for PDF
const stripMarkdown = (text: string) => {
  return text
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Keep link text
    .replace(/#{1,6}\s/g, '') // Remove headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/`(.*?)`/g, '$1') // Remove inline code
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/>\s/g, '') // Remove blockquotes
    .replace(/-\s/g, '• ') // Replace bullets
    .trim();
};

// 텍스트와 이미지를 분리하여 렌더링하는 함수 추가
const renderContentWithImages = (content: string) => {
  const imageRegex = /!\[.*?\]\((.*?)\)/g;
  const elements = [];
  let lastIndex = 0;
  let match;

  while ((match = imageRegex.exec(content)) !== null) {
    // 이미지 이전의 텍스트 처리
    if (match.index > lastIndex) {
      const textPart = content.slice(lastIndex, match.index);
      if (textPart.trim()) {
        elements.push(
          <Text key={`text-${lastIndex}`} style={styles.projectContent}>
            {stripMarkdown(textPart)}
          </Text>
        );
      }
    }

    // 추출한 이미지 URL로 Image 컴포넌트 생성 (match[1]에 URL이 담김)
    const imageUrl = match[1];
    elements.push(
      <Image key={`img-${match.index}`} src={imageUrl} style={styles.projectImage} />
    );

    lastIndex = imageRegex.lastIndex;
  }

  // 마지막 이미지 이후 남은 텍스트 처리
  if (lastIndex < content.length) {
    const remainingText = content.slice(lastIndex);
    if (remainingText.trim()) {
      elements.push(
        <Text key={`text-last`} style={styles.projectContent}>
          {stripMarkdown(remainingText)}
        </Text>
      );
    }
  }

  return elements.length > 0 ? elements : <Text style={styles.projectContent}>{stripMarkdown(content)}</Text>;
};

export const PortfolioPDF = () => (
  <Document title={`${PERSONAL_INFO.name} Portfolio`}>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{PERSONAL_INFO.name}</Text>
        <Text style={styles.role}>{PERSONAL_INFO.role}</Text>
        <View style={styles.contact}>
          <Text style={{ marginRight: 15 }}>Email: {PERSONAL_INFO.email}</Text>
          {/* GitHub 링크 처리 */}
          <Text style={{ marginRight: 15 }}>
            GitHub:{' '}
            <Link src={PERSONAL_INFO.github} style={styles.linkText}>
              {PERSONAL_INFO.github}
            </Link>
          </Text>
          {/* 웹 포트폴리오 링크 추가 */}
          <Text>
            포트폴리오 웹:{' '}
            <Link src="https://hbdevportfolio.netlify.app/" style={styles.linkText}>
              https://hbdevportfolio.netlify.app/
            </Link>
          </Text>
        </View>
      </View>

      {/* About */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About Me</Text>
        <Text style={styles.bio}>{PERSONAL_INFO.bio}</Text>
      </View>

      {/* Skills */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills</Text>
        <View style={styles.skillGroup}>
          {SKILLS.map((skill, i) => (
            <View 
              key={i} 
              style={[
                styles.skillBadge, 
                { backgroundColor: skill.bgColor, color: skill.textColor }
              ]}
            >
              <Text>{skill.name}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Experience */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience</Text>
        {EXPERIENCES.map((exp, i) => (
          <View key={i} style={styles.experienceItem}>
            <View style={styles.experienceHeader}>
              <Text style={styles.experienceRole}>{exp.role}</Text>
              <Text style={styles.experiencePeriod}>{exp.period}</Text>
            </View>
            {exp.description.map((desc, j) => (
              <View key={j} style={styles.experienceBullet}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>{desc}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>

      {/* Projects */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Projects</Text>
        {PROJECTS.map((project, i) => (
          // 1. wrap={false}를 제거하여 페이지 넘김을 허용합니다.
          <View key={i} style={styles.projectItem}>
            <Text style={styles.projectTitle}>{project.title}</Text>
            <Text style={styles.projectPeriod}>{project.period}</Text>
            <View>
              {renderContentWithImages(project.content)}
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);
