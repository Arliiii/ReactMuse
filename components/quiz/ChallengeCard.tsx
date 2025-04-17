import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useQuizStore } from '@/store/quiz-store';
import Colors from '@/constants/colors';
import Typography from '@/constants/typography';
import { Award, CheckCircle, Code, Star } from 'lucide-react-native';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

interface ChallengeCardProps {
  challenge: {
    id: string;
    title: string;
    topicId: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    points: number;
    description: string;
  };
}

export default function ChallengeCard({ challenge }: ChallengeCardProps) {
  const router = useRouter();
  const { getChallengeResult } = useQuizStore();
  const result = getChallengeResult(challenge.id);
  
  const handlePress = () => {
    router.push(`/challenge/${challenge.id}`);
  };
  
  const getDifficultyVariant = () => {
    switch (challenge.difficulty) {
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
      <Card variant="elevated" style={result?.completed ? styles.completedCard : undefined}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{challenge.title}</Text>
            {result?.completed && (
              <View style={styles.scoreContainer}>
                <LinearGradient
                  colors={Colors.gradientSuccess}
                  style={styles.scoreGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.scoreText}>{result.score}/{result.totalPoints}</Text>
                </LinearGradient>
              </View>
            )}
          </View>
          
          <Text style={styles.description} numberOfLines={2}>
            {challenge.description}
          </Text>
          
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Code size={16} color={Colors.secondary} style={styles.infoIcon} />
              <Text style={styles.infoText}>Coding Challenge</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Star size={16} color={Colors.secondary} style={styles.infoIcon} />
              <Text style={styles.infoText}>{challenge.points} points</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Badge 
                label={challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
                variant={getDifficultyVariant()}
                size="small"
              />
            </View>
          </View>
          
          {result?.completed ? (
            <LinearGradient
              colors={Colors.gradientSuccess}
              style={styles.completedBadge}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <CheckCircle size={16} color="white" />
              <Text style={styles.completedText}>Completed</Text>
            </LinearGradient>
          ) : (
            <LinearGradient
              colors={Colors.gradientPink}
              style={styles.startButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.startButtonText}>Start Challenge</Text>
            </LinearGradient>
          )}
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
    flex: 1,
  },
  description: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  scoreContainer: {
    marginLeft: 8,
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
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
  },
  infoIcon: {
    marginRight: 4,
  },
  infoText: {
    ...Typography.caption,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
  },
  completedText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 8,
  },
  startButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
  },
  startButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
});