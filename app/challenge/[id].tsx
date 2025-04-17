import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/colors';
import Typography from '@/constants/typography';
import { useQuizStore } from '@/store/quiz-store';
import { codingChallenges } from '@/data/challenges';
import { CodingChallenge } from '@/types/quiz';
import CodeBlock from '@/components/CodeBlock';
import { Award, Code, HelpCircle, CheckCircle, Sparkles } from 'lucide-react-native';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

export default function ChallengeScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { completeChallenge } = useQuizStore();
  
  const [challenge, setChallenge] = useState<CodingChallenge | null>(null);
  const [userCode, setUserCode] = useState('');
  const [showSolution, setShowSolution] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(-1);
  const [challengeCompleted, setChallengeCompleted] = useState(false);
  
  // Get challenge based on ID
  useEffect(() => {
    const foundChallenge = codingChallenges.find(c => c.id === id);
    
    if (foundChallenge) {
      setChallenge(foundChallenge);
      setUserCode(foundChallenge.starterCode);
    } else {
      // Handle unknown challenge ID
      Alert.alert('Error', 'Challenge not found');
      router.back();
    }
  }, [id]);
  
  const showNextHint = () => {
    if (!challenge) return;
    
    if (currentHintIndex < challenge.hints.length - 1) {
      setCurrentHintIndex(currentHintIndex + 1);
    }
  };
  
  const handleComplete = () => {
    if (!challenge) return;
    
    // In a real app, we would validate the solution here
    // For this demo, we'll just mark it as completed
    
    completeChallenge({
      challengeId: challenge.id,
      completed: true,
      score: challenge.points,
      totalPoints: challenge.points,
      completedAt: new Date().toISOString(),
    });
    
    setChallengeCompleted(true);
  };
  
  if (!challenge) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading challenge...</Text>
      </View>
    );
  }
  
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
  
  const renderChallengeCompletion = () => {
    return (
      <View style={styles.completionContainer}>
        <Card variant="elevated">
          <LinearGradient
            colors={['rgba(255, 64, 129, 0.1)', 'rgba(255, 64, 129, 0.05)']}
            style={styles.completionGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Sparkles size={64} color={Colors.secondary} style={styles.completionIcon} />
            
            <Text style={styles.completionTitle}>Challenge Completed!</Text>
            
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreLabel}>Points Earned</Text>
              <Text style={styles.scoreValue}>{challenge.points}</Text>
            </View>
            
            <Button
              title="Return to Practice"
              onPress={() => router.back()}
              variant="filled"
              color={Colors.secondary}
              size="large"
              style={styles.returnButton}
            />
          </LinearGradient>
        </Card>
      </View>
    );
  };
  
  return (
    <>
      <Stack.Screen 
        options={{ 
          title: challenge.title,
          headerBackground: () => (
            <LinearGradient
              colors={Colors.gradientPink}
              style={{ flex: 1 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          ),
          headerTintColor: 'white',
          headerShadowVisible: false,
        }} 
      />
      
      <SafeAreaView style={styles.container} edges={['bottom']}>
        {challengeCompleted ? (
          renderChallengeCompletion()
        ) : (
          <>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
              <View style={styles.challengeHeader}>
                <Badge 
                  label={challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
                  variant={getDifficultyVariant()}
                />
                <View style={styles.pointsContainer}>
                  <Star size={16} color={Colors.secondary} style={styles.pointsIcon} />
                  <Text style={styles.pointsText}>{challenge.points} points</Text>
                </View>
              </View>
              
              <Text style={styles.description}>{challenge.description}</Text>
              
              <Card variant="elevated">
                <View style={styles.instructionsContainer}>
                  <Text style={styles.sectionTitle}>Instructions:</Text>
                  {challenge.instructions.map((instruction, index) => (
                    <View key={index} style={styles.instructionItem}>
                      <Text style={styles.instructionNumber}>{index + 1}.</Text>
                      <Text style={styles.instructionText}>{instruction}</Text>
                    </View>
                  ))}
                </View>
              </Card>
              
              <View style={styles.codeContainer}>
                <Text style={styles.sectionTitle}>Starter Code:</Text>
                <Card variant="outlined">
                  <CodeBlock code={challenge.starterCode} />
                </Card>
              </View>
              
              {currentHintIndex >= 0 && (
                <Card variant="outlined" style={styles.hintsCard}>
                  <LinearGradient
                    colors={['rgba(255, 64, 129, 0.1)', 'rgba(255, 64, 129, 0.05)']}
                    style={styles.hintsGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Text style={styles.sectionTitle}>Hints:</Text>
                    {challenge.hints.slice(0, currentHintIndex + 1).map((hint, index) => (
                      <View key={index} style={styles.hintItem}>
                        <Text style={styles.hintText}>{hint}</Text>
                      </View>
                    ))}
                  </LinearGradient>
                </Card>
              )}
              
              {showSolution && (
                <Card variant="outlined" style={styles.solutionCard}>
                  <LinearGradient
                    colors={['rgba(156, 39, 176, 0.1)', 'rgba(156, 39, 176, 0.05)']}
                    style={styles.solutionGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Text style={styles.sectionTitle}>Solution:</Text>
                    <CodeBlock code={challenge.solutionCode} />
                  </LinearGradient>
                </Card>
              )}
            </ScrollView>
            
            <View style={styles.actionsContainer}>
              <View style={styles.actionButtons}>
                {currentHintIndex < challenge.hints.length - 1 && (
                  <Button
                    title={currentHintIndex === -1 ? 'Show Hint' : 'Next Hint'}
                    onPress={showNextHint}
                    variant="outlined"
                    color={Colors.secondary}
                    icon="help-circle"
                    size="medium"
                  />
                )}
                
                {!showSolution && (
                  <Button
                    title="View Solution"
                    onPress={() => setShowSolution(true)}
                    variant="outlined"
                    color={Colors.primary}
                    icon="code"
                    size="medium"
                  />
                )}
              </View>
              
              <Button
                title="Mark as Completed"
                onPress={handleComplete}
                variant="filled"
                color={Colors.secondary}
                icon="check-circle"
                iconPosition="right"
                size="large"
              />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  challengeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsIcon: {
    marginRight: 4,
  },
  pointsText: {
    ...Typography.body,
    fontWeight: '600',
    color: Colors.secondary,
  },
  description: {
    ...Typography.bodyLarge,
    marginBottom: 24,
    lineHeight: 26,
  },
  instructionsContainer: {
    padding: 16,
  },
  sectionTitle: {
    ...Typography.heading3,
    marginBottom: 12,
  },
  instructionItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  instructionNumber: {
    ...Typography.body,
    fontWeight: '600',
    marginRight: 8,
    width: 20,
  },
  instructionText: {
    ...Typography.body,
    flex: 1,
  },
  codeContainer: {
    marginVertical: 24,
  },
  hintsCard: {
    marginBottom: 24,
  },
  hintsGradient: {
    padding: 16,
    borderRadius: 12,
  },
  hintItem: {
    marginBottom: 8,
  },
  hintText: {
    ...Typography.body,
  },
  solutionCard: {
    marginBottom: 24,
  },
  solutionGradient: {
    padding: 16,
    borderRadius: 12,
  },
  actionsContainer: {
    padding: 16,
    backgroundColor: Colors.card,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  completionContainer: {
    flex: 1,
    padding: 20,
  },
  completionGradient: {
    padding: 20,
    alignItems: 'center',
    borderRadius: 12,
  },
  completionIcon: {
    marginBottom: 24,
  },
  completionTitle: {
    ...Typography.heading1,
    marginBottom: 24,
    textAlign: 'center',
    color: Colors.secondary,
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  scoreLabel: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.secondary,
  },
  returnButton: {
    marginTop: 16,
  },
});