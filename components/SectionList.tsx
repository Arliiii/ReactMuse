import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Section } from '@/types/learning';
import TopicCard from './TopicCard';
import Typography from '@/constants/typography';
import Colors from '@/constants/colors';

interface SectionListProps {
  section: Section;
}

export default function SectionList({ section }: SectionListProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      <View style={styles.topicsList}>
        {section.topics.map((topic) => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  sectionTitle: {
    ...Typography.heading2,
    color: Colors.primary,
    marginBottom: 16,
  },
  topicsList: {
    paddingHorizontal: 4,
  },
});