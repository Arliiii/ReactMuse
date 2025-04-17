import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useProgressStore } from '@/store/progress-store';
import { useQuizStore } from '@/store/quiz-store';
import { learningPath } from '@/data/learning-path';
import Colors from '@/constants/colors';
import Typography from '@/constants/typography';
import { Award, CheckCircle, Circle, ArrowRight, Zap, Star, Sparkles } from 'lucide-react-native';
import Card from '@/components/ui/Card';
import ProgressBar from '@/components/ui/ProgressBar';
import Badge from '@/components/ui/Badge';

export default function ProgressScreen() {
  const router = useRouter();
  const { completedTopics, getCompletionPercentage } = useProgressStore();
  const { quizResults, challengeResults, xpPoints } = useQuizStore();
  const progress = getCompletionPercentage();

  // Count completed topics by difficulty
  const completedByDifficulty = {
    beginner: 0,
    intermediate: 0,
    advanced: 0,
  };

  // Count total topics by difficulty
  const totalByDifficulty = {
    beginner: 0,
    intermediate: 0,
    advanced: 0,
  };

  // Calculate completion stats
  learningPath.forEach(section => {
    section.topics.forEach(topic => {
      totalByDifficulty[topic.difficulty]++;
      if (completedTopics.includes(topic.id)) {
        completedByDifficulty[topic.difficulty]++;
      }
    });
  });

  const navigateToTopic = (topicId: string) => {
    router.push(`/topics/${topicId}`);
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <LinearGradient
            colors={Colors.gradientPurple}
            style={styles.progressCircle}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.progressPercentage}>{Math.round(progress)}%</Text>
            <Text style={styles.progressLabel}>Complete</Text>
          </LinearGradient>
          <Text style={styles.progressSummary}>
            You've completed {completedTopics.length} out of {useProgressStore.getState().totalTopics} topics
          </Text>
        </View>

        <View style={styles.content}>
          <Card variant="elevated" style={styles.xpContainer}>
            <LinearGradient
              colors={['rgba(255, 234, 0, 0.1)', 'rgba(255, 234, 0, 0.05)']}
              style={styles.xpGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.xpHeader}>
                <Star size={28} color={Colors.accentYellow} />
                <Text style={styles.xpTitle}>XP Points</Text>
              </View>
              <Text style={styles.xpValue}>{xpPoints}</Text>
              <Text style={styles.xpDescription}>
                Earn XP by completing quizzes and challenges
              </Text>
            </LinearGradient>
          </Card>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Progress by Difficulty</Text>
              <Sparkles size={20} color={Colors.primary} />
            </View>
            
            <Card variant="elevated">
              <View style={styles.difficultyCard}>
                <View style={styles.difficultyHeader}>
                  <View style={styles.difficultyTitleContainer}>
                    <Badge label="Beginner" variant="success" />
                    <Text style={styles.difficultyCount}>
                      {completedByDifficulty.beginner}/{totalByDifficulty.beginner}
                    </Text>
                  </View>
                </View>
                <ProgressBar 
                  progress={(completedByDifficulty.beginner / totalByDifficulty.beginner) * 100} 
                  variant="success"
                  showPercentage={false}
                />
              </View>
              
              <View style={styles.difficultyCard}>
                <View style={styles.difficultyHeader}>
                  <View style={styles.difficultyTitleContainer}>
                    <Badge label="Intermediate" variant="warning" />
                    <Text style={styles.difficultyCount}>
                      {completedByDifficulty.intermediate}/{totalByDifficulty.intermediate}
                    </Text>
                  </View>
                </View>
                <ProgressBar 
                  progress={(completedByDifficulty.intermediate / totalByDifficulty.intermediate) * 100} 
                  variant="primary"
                  showPercentage={false}
                />
              </View>
              
              <View style={styles.difficultyCard}>
                <View style={styles.difficultyHeader}>
                  <View style={styles.difficultyTitleContainer}>
                    <Badge label="Advanced" variant="error" />
                    <Text style={styles.difficultyCount}>
                      {completedByDifficulty.advanced}/{totalByDifficulty.advanced}
                    </Text>
                  </View>
                </View>
                <ProgressBar 
                  progress={(completedByDifficulty.advanced / totalByDifficulty.advanced) * 100} 
                  variant="secondary"
                  showPercentage={false}
                />
              </View>
            </Card>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Quiz Results</Text>
              <Zap size={20} color={Colors.primary} />
            </View>
            
            {quizResults.length === 0 ? (
              <Card variant="outlined">
                <View style={styles.emptyState}>
                  <Text style={styles.emptyStateText}>
                    You haven't completed any quizzes yet. Start practicing!
                  </Text>
                </View>
              </Card>
            ) : (
              <>
                {quizResults.slice(0, 3).map((result) => (
                  <TouchableOpacity 
                    key={result.quizId}
                    onPress={() => router.push(`/quiz/${result.quizId}`)}
                    activeOpacity={0.7}
                  >
                    <Card variant="elevated" style={styles.resultCard}>
                      <View style={styles.resultContent}>
                        <View style={styles.resultHeader}>
                          <Text style={styles.resultTitle}>
                            {result.quizId.split('-').map(word => 
                              word.charAt(0).toUpperCase() + word.slice(1)
                            ).join(' ')}
                          </Text>
                          <LinearGradient
                            colors={Colors.gradientSuccess}
                            style={styles.scoreGradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                          >
                            <Text style={styles.scoreText}>{result.score}/{result.totalPoints}</Text>
                          </LinearGradient>
                        </View>
                        <Text style={styles.resultSubtitle}>
                          {result.correctAnswers} of {result.totalQuestions} correct
                        </Text>
                        <ProgressBar 
                          progress={(result.score / result.totalPoints) * 100} 
                          variant="success"
                          showPercentage={false}
                        />
                      </View>
                    </Card>
                  </TouchableOpacity>
                ))}
                
                <TouchableOpacity 
                  style={styles.viewAllButton}
                  onPress={() => router.push('/practice')}
                  activeOpacity={0.7}
                >
                  <Text style={styles.viewAllText}>View All Practice</Text>
                  <ArrowRight size={16} color={Colors.primary} />
                </TouchableOpacity>
              </>
            )}
          </View>

          {progress === 100 && quizResults.length >= 4 && (
            <View style={styles.achievementSection}>
              <Card variant="elevated">
                <LinearGradient
                  colors={['rgba(156, 39, 176, 0.1)', 'rgba(156, 39, 176, 0.05)']}
                  style={styles.achievementGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Award size={48} color={Colors.primary} style={styles.achievementIcon} />
                  <Text style={styles.achievementTitle}>Congratulations!</Text>
                  <Text style={styles.achievementText}>
                    You've completed all topics and mastered the quizzes. You're now ready to build amazing React applications!
                  </Text>
                </LinearGradient>
              </Card>
            </View>
          )}
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
  header: {
    padding: 20,
    alignItems: 'center',
  },
  progressCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressPercentage: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },
  progressLabel: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  progressSummary: {
    ...Typography.body,
    textAlign: 'center',
  },
  content: {
    padding: 20,
  },
  xpContainer: {
    marginBottom: 24,
  },
  xpGradient: {
    padding: 20,
    alignItems: 'center',
    borderRadius: 12,
  },
  xpHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  xpTitle: {
    ...Typography.heading3,
    marginLeft: 8,
    marginBottom: 0,
    color: Colors.accentYellow,
  },
  xpValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.accentYellow,
    marginBottom: 8,
  },
  xpDescription: {
    ...Typography.caption,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    ...Typography.heading2,
    marginBottom: 0,
  },
  difficultyCard: {
    marginBottom: 16,
  },
  difficultyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  difficultyTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  difficultyCount: {
    ...Typography.caption,
    marginLeft: 8,
  },
  emptyState: {
    padding: 20,
    alignItems: 'center',
  },
  emptyStateText: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  resultCard: {
    marginBottom: 12,
  },
  resultContent: {
    padding: 16,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  resultTitle: {
    ...Typography.body,
    fontWeight: '600',
  },
  resultSubtitle: {
    ...Typography.caption,
    marginBottom: 8,
  },
  scoreGradient: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  scoreText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  viewAllText: {
    ...Typography.body,
    color: Colors.primary,
    fontWeight: '600',
    marginRight: 8,
  },
  achievementSection: {
    marginBottom: 24,
  },
  achievementGradient: {
    padding: 20,
    alignItems: 'center',
    borderRadius: 12,
  },
  achievementIcon: {
    marginBottom: 16,
  },
  achievementTitle: {
    ...Typography.heading2,
    color: Colors.primary,
    marginBottom: 8,
  },
  achievementText: {
    ...Typography.body,
    textAlign: 'center',
  },
});