import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Topic } from '@/types/learning';
import { useProgressStore } from '@/store/progress-store';
import Colors from '@/constants/colors';
import Typography from '@/constants/typography';
import { CheckCircle, Circle } from 'lucide-react-native';
import Card from './ui/Card';
import Badge from './ui/Badge';

interface TopicCardProps {
  topic: Topic;
}

export default function TopicCard({ topic }: TopicCardProps) {
  const router = useRouter();
  const { isTopicCompleted, markTopicCompleted, markTopicIncomplete } = useProgressStore();
  const completed = isTopicCompleted(topic.id);

  const handlePress = () => {
    router.push(`/topics/${topic.id}`);
  };

  const toggleCompletion = (e: any) => {
    e.stopPropagation();
    if (completed) {
      markTopicIncomplete(topic.id);
    } else {
      markTopicCompleted(topic.id);
    }
  };

  const getDifficultyVariant = () => {
    switch (topic.difficulty) {
      case 'beginner':
        return 'success';
      case 'intermediate':
        return 'warning';
      case 'advanced':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <TouchableOpacity 
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Card variant="elevated" style={completed ? styles.completedCard : undefined}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{topic.title}</Text>
            <TouchableOpacity onPress={toggleCompletion}>
              {completed ? (
                <CheckCircle size={24} color={Colors.completed} />
              ) : (
                <Circle size={24} color={Colors.textSecondary} />
              )}
            </TouchableOpacity>
          </View>
          <Text style={styles.description}>{topic.description}</Text>
          <View style={styles.footer}>
            <Badge 
              label={topic.difficulty.charAt(0).toUpperCase() + topic.difficulty.slice(1)}
              variant={getDifficultyVariant()}
            />
            {completed && (
              <LinearGradient
                colors={Colors.gradientSuccess}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.completedBadge}
              >
                <Text style={styles.completedText}>Completed</Text>
              </LinearGradient>
            )}
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  completedCard: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.completed,
    backgroundColor: 'rgba(0, 200, 83, 0.05)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    ...Typography.heading3,
    marginBottom: 0,
  },
  description: {
    ...Typography.body,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  completedBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  completedText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
});