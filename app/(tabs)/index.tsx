import React, { useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useProgressStore } from '@/store/progress-store';
import { useQuizStore } from '@/store/quiz-store';
import { useAssistantStore } from '@/store/assistant-store';
import Colors from '@/constants/colors';
import Typography from '@/constants/typography';
import { learningPath } from '@/data/learning-path';
import { ArrowRight, BookOpen, Award, Zap, Star, Sparkles } from 'lucide-react-native';
import Card from '@/components/ui/Card';
import ProgressBar from '@/components/ui/ProgressBar';
import Quote from '@/components/ui/Quote';
import SuggestionCard from '@/components/ui/SuggestionCard';

export default function HomeScreen() {
  const router = useRouter();
  const { getCompletionPercentage, completedTopics } = useProgressStore();
  const { xpPoints, quizResults } = useQuizStore();
  const { generateSuggestion, hasUnreadSuggestion } = useAssistantStore();
  const progress = getCompletionPercentage();

  // Get the next recommended topic
  const getNextTopic = () => {
    for (const section of learningPath) {
      for (const topic of section.topics) {
        if (!completedTopics.includes(topic.id)) {
          return { topic, section };
        }
      }
    }
    return null;
  };

  const nextTopic = getNextTopic();

  const navigateToTopic = (topicId: string) => {
    router.push(`/topics/${topicId}`);
  };

  // Motivational quotes
  const quotes = [
    {
      text: "Learning React might seem challenging at first, but with each component you build, you're becoming a better developer.",
      author: "React Learning Team"
    },
    {
      text: "The best way to learn React is by building something meaningful. Start small, then expand.",
      author: "Community Wisdom"
    },
    {
      text: "Understanding components and props is like learning the alphabet before writing poetry. Master the basics first.",
      author: "React Mentor"
    },
    {
      text: "Don't worry about understanding everything at once. React is learned in layers, not all at once.",
      author: "Developer Advice"
    }
  ];

  // Randomly select a quote
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  // Generate a suggestion if needed
  const suggestion = generateSuggestion();

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.greeting}>
            Welcome to React Learning
          </Text>
          <Text style={styles.subtitle}>
            Your interactive guide to mastering React
          </Text>
        </View>

        <Card variant="elevated">
          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text style={styles.sectionTitle}>Your Progress</Text>
              <TouchableOpacity 
                onPress={() => router.push('/progress')}
                style={styles.viewAllButton}
              >
                <Text style={styles.viewAllText}>View All</Text>
                <ArrowRight size={16} color={Colors.primary} />
              </TouchableOpacity>
            </View>
            
            <ProgressBar progress={progress} label="Overall Completion" />
            
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <BookOpen size={20} color={Colors.primary} style={styles.statIcon} />
                <Text style={styles.statValue}>{completedTopics.length}</Text>
                <Text style={styles.statLabel}>Topics Completed</Text>
              </View>
              
              <View style={styles.statDivider} />
              
              <View style={styles.statItem}>
                <Zap size={20} color={Colors.secondary} style={styles.statIcon} />
                <Text style={styles.statValue}>{quizResults.length}</Text>
                <Text style={styles.statLabel}>Quizzes Taken</Text>
              </View>
              
              <View style={styles.statDivider} />
              
              <View style={styles.statItem}>
                <Star size={20} color={Colors.accentYellow} style={styles.statIcon} />
                <Text style={styles.statValue}>{xpPoints}</Text>
                <Text style={styles.statLabel}>XP Points</Text>
              </View>
            </View>
          </View>
        </Card>

        {nextTopic && (
          <Card variant="elevated">
            <View style={styles.nextTopicSection}>
              <View style={styles.nextTopicHeader}>
                <Sparkles size={20} color={Colors.primary} style={styles.nextTopicIcon} />
                <Text style={styles.nextTopicTitle}>Continue Learning</Text>
              </View>
              
              <Text style={styles.nextTopicName}>{nextTopic.topic.title}</Text>
              <Text style={styles.nextTopicDescription}>{nextTopic.topic.description}</Text>
              
              <TouchableOpacity 
                style={styles.continueButton}
                onPress={() => navigateToTopic(nextTopic.topic.id)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={Colors.gradientPurple}
                  style={styles.continueButtonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.continueButtonText}>Continue</Text>
                  <ArrowRight size={16} color="white" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </Card>
        )}

        <Quote 
          text={randomQuote.text}
          author={randomQuote.author}
          variant="primary"
        />

        {hasUnreadSuggestion && (
          <SuggestionCard suggestion={suggestion} />
        )}

        <Card variant="elevated">
          <View style={styles.exploreSection}>
            <Text style={styles.sectionTitle}>Explore Topics</Text>
            
            <View style={styles.topicGrid}>
              <TouchableOpacity 
                style={styles.topicCard}
                onPress={() => router.push('/topics')}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={['rgba(156, 39, 176, 0.1)', 'rgba(156, 39, 176, 0.05)']}
                  style={styles.topicCardGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <BookOpen size={24} color={Colors.primary} style={styles.topicCardIcon} />
                  <Text style={styles.topicCardTitle}>Learning Path</Text>
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.topicCard}
                onPress={() => router.push('/practice')}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={['rgba(255, 64, 129, 0.1)', 'rgba(255, 64, 129, 0.05)']}
                  style={styles.topicCardGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Zap size={24} color={Colors.secondary} style={styles.topicCardIcon} />
                  <Text style={styles.topicCardTitle}>Practice</Text>
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.topicCard}
                onPress={() => router.push('/progress')}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={['rgba(0, 229, 255, 0.1)', 'rgba(0, 229, 255, 0.05)']}
                  style={styles.topicCardGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Award size={24} color={Colors.accent} style={styles.topicCardIcon} />
                  <Text style={styles.topicCardTitle}>Progress</Text>
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.topicCard}
                onPress={() => router.push('/search')}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={['rgba(0, 230, 118, 0.1)', 'rgba(0, 230, 118, 0.05)']}
                  style={styles.topicCardGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Star size={24} color={Colors.accentGreen} style={styles.topicCardIcon} />
                  <Text style={styles.topicCardTitle}>Explore</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </Card>
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
  header: {
    marginBottom: 24,
  },
  greeting: {
    ...Typography.heading1,
    marginBottom: 8,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  progressSection: {
    padding: 4,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    ...Typography.heading3,
    marginBottom: 0,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    ...Typography.caption,
    color: Colors.primary,
    fontWeight: '600',
    marginRight: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statIcon: {
    marginBottom: 8,
  },
  statValue: {
    ...Typography.heading2,
    marginBottom: 4,
  },
  statLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.border,
    marginHorizontal: 8,
  },
  nextTopicSection: {
    padding: 4,
  },
  nextTopicHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  nextTopicIcon: {
    marginRight: 8,
  },
  nextTopicTitle: {
    ...Typography.heading3,
    marginBottom: 0,
  },
  nextTopicName: {
    ...Typography.heading2,
    marginBottom: 8,
  },
  nextTopicDescription: {
    ...Typography.body,
    marginBottom: 16,
  },
  continueButton: {
    alignSelf: 'flex-start',
    borderRadius: 12,
    overflow: 'hidden',
  },
  continueButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  continueButtonText: {
    color: 'white',
    fontWeight: '600',
    marginRight: 8,
  },
  exploreSection: {
    padding: 4,
  },
  topicGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
    marginHorizontal: -8,
  },
  topicCard: {
    width: '50%',
    padding: 8,
  },
  topicCardGradient: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
  },
  topicCardIcon: {
    marginBottom: 12,
  },
  topicCardTitle: {
    ...Typography.body,
    fontWeight: '600',
  },
});