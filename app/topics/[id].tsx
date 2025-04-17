import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { jsxDetails } from '@/data/topic-details/jsx';
import { componentsDetails } from '@/data/topic-details/components';
import { propsDetails } from '@/data/topic-details/props';
import { stateDetails } from '@/data/topic-details/state';
import { TopicDetail } from '@/types/learning';
import Colors from '@/constants/colors';
import Typography from '@/constants/typography';
import CodeBlock from '@/components/CodeBlock';
import KeyPointsList from '@/components/KeyPointsList';

export default function TopicDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  
  // Get topic details based on ID
  const getTopicDetails = (): TopicDetail | null => {
    switch (id) {
      case 'jsx':
        return jsxDetails;
      case 'components':
        return componentsDetails;
      case 'props':
        return propsDetails;
      case 'state':
        return stateDetails;
      default:
        // For other topics, we would add more cases
        // This is a simplified example
        return null;
    }
  };
  
  const topicDetail = getTopicDetails();
  
  if (!topicDetail) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Topic not found</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: topicDetail.title,
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: 'white',
        }} 
      />
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
          <Text style={styles.definition}>{topicDetail.definition}</Text>
          
          <KeyPointsList points={topicDetail.keyPoints} />
          
          <Text style={styles.sectionTitle}>Code Examples</Text>
          {topicDetail.codeExamples.map((example, index) => (
            <View key={index} style={styles.exampleContainer}>
              <CodeBlock code={example.code} title={example.title} />
              <Text style={styles.explanation}>{example.explanation}</Text>
            </View>
          ))}
          
          {topicDetail.furtherReading && (
            <View style={styles.furtherReadingContainer}>
              <Text style={styles.furtherReadingTitle}>Further Reading</Text>
              {topicDetail.furtherReading.map((item, index) => (
                <Text key={index} style={styles.furtherReadingItem}>
                  • {item}
                </Text>
              ))}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  definition: {
    ...Typography.body,
    fontSize: 18,
    marginBottom: 20,
    lineHeight: 26,
  },
  sectionTitle: {
    ...Typography.heading2,
    marginBottom: 16,
    marginTop: 8,
  },
  exampleContainer: {
    marginBottom: 24,
  },
  explanation: {
    ...Typography.body,
    marginTop: 12,
    paddingHorizontal: 4,
  },
  furtherReadingContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: Colors.card,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: Colors.secondary,
  },
  furtherReadingTitle: {
    ...Typography.heading3,
    marginBottom: 12,
  },
  furtherReadingItem: {
    ...Typography.body,
    marginBottom: 8,
  },
  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  notFoundText: {
    ...Typography.heading2,
    color: Colors.textSecondary,
  },
});