import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';
import Typography from '@/constants/typography';
import { jsxQuiz } from '@/data/quizzes/jsx-quiz';
import { componentsQuiz } from '@/data/quizzes/components-quiz';
import { propsQuiz } from '@/data/quizzes/props-quiz';
import { stateQuiz } from '@/data/quizzes/state-quiz';
import { codingChallenges } from '@/data/challenges';
import QuizCard from '@/components/quiz/QuizCard';
import ChallengeCard from '@/components/quiz/ChallengeCard';

export default function PracticeScreen() {
  // Group quizzes by topic
  const quizzesByTopic = {
    jsx: {
      id: 'jsx-quiz',
      title: 'JSX Quiz',
      topicId: 'jsx',
      questions: jsxQuiz,
      difficulty: 'beginner' as const,
    },
    components: {
      id: 'components-quiz',
      title: 'Components Quiz',
      topicId: 'components',
      questions: componentsQuiz,
      difficulty: 'intermediate' as const,
    },
    props: {
      id: 'props-quiz',
      title: 'Props Quiz',
      topicId: 'props',
      questions: propsQuiz,
      difficulty: 'beginner' as const,
    },
    state: {
      id: 'state-quiz',
      title: 'State Quiz',
      topicId: 'state',
      questions: stateQuiz,
      difficulty: 'intermediate' as const,
    },
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quizzes</Text>
          <Text style={styles.sectionDescription}>
            Test your knowledge with interactive quizzes
          </Text>
          
          {Object.values(quizzesByTopic).map((quiz) => (
            <QuizCard
              key={quiz.id}
              quizId={quiz.id}
              title={quiz.title}
              topicId={quiz.topicId}
              questionCount={quiz.questions.length}
              difficulty={quiz.difficulty}
              totalPoints={quiz.questions.reduce((sum, q) => sum + q.points, 0)}
            />
          ))}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Coding Challenges</Text>
          <Text style={styles.sectionDescription}>
            Apply your skills with hands-on coding challenges
          </Text>
          
          {codingChallenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={{
                id: challenge.id,
                title: challenge.title,
                topicId: challenge.topicId,
                difficulty: challenge.difficulty,
                points: challenge.points,
                description: challenge.description,
              }}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    ...Typography.heading2,
    marginBottom: 8,
  },
  sectionDescription: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
});