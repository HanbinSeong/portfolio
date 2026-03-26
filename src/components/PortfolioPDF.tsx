import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { PERSONAL_INFO, SKILLS, PROJECTS, EXPERIENCES } from '../constants';

// Register Korean Font
Font.register({
  family: 'NanumGothic',
  src: 'https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/NanumGothic.ttf',
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
    marginBottom: 4,
  },
  role: {
    fontSize: 14,
    color: '#787774',
    marginBottom: 8,
  },
  contact: {
    flexDirection: 'row',
    gap: 15,
    fontSize: 9,
    color: '#37352f',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1a1a1a',
    borderBottom: 1,
    borderBottomColor: '#f1f1f0',
    paddingBottom: 4,
  },
  bio: {
    marginBottom: 10,
    textAlign: 'justify',
  },
  skillGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    marginBottom: 10,
  },
  skillBadge: {
    padding: '2 6',
    borderRadius: 4,
    fontSize: 8,
  },
  experienceItem: {
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
  }
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

export const PortfolioPDF = () => (
  <Document title={`${PERSONAL_INFO.name} Portfolio`}>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{PERSONAL_INFO.name}</Text>
        <Text style={styles.role}>{PERSONAL_INFO.role}</Text>
        <View style={styles.contact}>
          <Text>Email: {PERSONAL_INFO.email}</Text>
          <Text>GitHub: {PERSONAL_INFO.github}</Text>
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
          <View key={i} style={styles.projectItem} wrap={false}>
            <Text style={styles.projectTitle}>{project.title}</Text>
            <Text style={styles.projectPeriod}>{project.period}</Text>
            <Text style={styles.projectContent}>
              {stripMarkdown(project.content).substring(0, 500)}...
            </Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);
