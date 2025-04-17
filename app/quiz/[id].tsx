import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/colors';
import Typography from '@/constants/typography';
import { useQuizStore } from '@/store/quiz-store';
import { jsxQuiz } from '@/data/quizzes/jsx-quiz';
import { componentsQuiz } from '@/data/quizzes/components-quiz';
import { propsQuiz } from '@/data/quizzes/props-quiz';
import { stateQuiz } from '@/data/quizzes/state-quiz';
import { QuizQuestion } from '@/types/quiz';
import MultipleChoiceQuestion from '@/components/quiz/MultipleChoiceQuestion';
import CodeCompletionQuestion from '@/components/quiz/CodeCompletionQuestion';
import BugFixQuestion from '@/components/quiz/BugFixQuestion';
import { ArrowLeft, ArrowRight, CheckCircle, Award, Sparkles } from 'lucide-react-native';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function QuizScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { 
    startQuiz, 
    answerQuestion, 
    completeQuiz, 
    currentQuizAnswers,
    resetCurrentQuiz
  } = useQuizStore();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizTotalPoints, setQuizTotalPoints] = useState(0);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  
  // Get questions based on quiz ID
  useEffect(() => {
    let quizQuestions: QuizQuestion[] = [];
    
    switch (id) {
      case 'jsx-quiz':
        quizQuestions = jsxQuiz;
        break;
      case 'components-quiz':
        quizQuestions = componentsQuiz;
        break;
      case 'props-quiz':
        quizQuestions = propsQuiz;
        break;
      case 'state-quiz':
        quizQuestions = stateQuiz;
        break;
      default:
        // Handle unknown quiz ID
        Alert.alert('Error', 'Quiz not found');
        router.back();
        return;
    }
    
    setQuestions(quizQuestions);
    startQuiz(id as string);
    
    // Calculate total points
    const total = quizQuestions.reduce((sum, q) => sum + q.points, 0);
    setQuizTotalPoints(total);
    
    // Cleanup when leaving the quiz
    return () => {
      if (!quizCompleted) {
        resetCurrentQuiz();
      }
    };
  }, [id]);
  
  const currentQuestion = questions[currentQuestionIndex];
  
  const handleAnswer = (answer: string | number) => {
    if (!currentQuestion) return;
    
    answerQuestion(currentQuestion.id, answer);
    setShowFeedback(true);
  };
  
  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowFeedback(false);
    } else {
      // Calculate score
      let score = 0;
      questions.forEach(question => {
        const userAnswer = currentQuizAnswers[question.id];
        if (userAnswer !== undefined) {
          if (question.type === 'multiple-choice' && userAnswer === question.correctAnswer) {
            score += question.points;
          } else if (
            (question.type === 'code-completion' || question.type === 'bug-fix') && 
            String(userAnswer).trim() === String(question.correctAnswer).trim()
          ) {
            score += question.points;
          }
        }
      });
      
      setQuizScore(score);
      setQuizCompleted(true);
      
      // Save quiz result
      completeQuiz({
        quizId: id as string,
        score,
        totalPoints: quizTotalPoints,
        correctAnswers: questions.filter(q => {
          const userAnswer = currentQuizAnswers[q.id];
          return userAnswer !== undefined && 
            String(userAnswer).trim() === String(q.correctAnswer).trim();
        }).length,
        totalQuestions: questions.length,
        completedAt: new Date().toISOString(),
      });
    }
  };
  
  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowFeedback(true); // Show feedback for previous questions
    }
  };
  
  const renderQuestion = () => {
    if (!currentQuestion) return null;
    
    const userAnswer = currentQuizAnswers[currentQuestion.id];
    
    switch (currentQuestion.type) {
      case 'multiple-choice':
        return (
          <MultipleChoiceQuestion
            question={currentQuestion}
            selectedAnswer={userAnswer as number}
            onSelectAnswer={handleAnswer}
            showFeedback={showFeedback}
          />
        );
      case 'code-completion':
        return (
          <CodeCompletionQuestion
            question={currentQuestion}
            answer={userAnswer as string || ''}
            onAnswerChange={handleAnswer}
            showFeedback={showFeedback}
          />
        );
      case 'bug-fix':
        return (
          <BugFixQuestion
            question={currentQuestion}
            answer={userAnswer as string || ''}
            onAnswerChange={handleAnswer}
            showFeedback={showFeedback}
          />
        );
      default:
        return null;
    }
  };
  
  const renderQuizCompletion = () => {
    const correctAnswers = questions.filter(q => {
      const userAnswer = currentQuizAnswers[q.id];
      return userAnswer !== undefined && 
        String(userAnswer).trim() === String(q.correctAnswer).trim();
    }).length;
    
    const percentage = Math.round((quizScore / quizTotalPoints) * 100);
    
    return (
      <View style={styles.completionContainer}>
        <Card variant="elevated">
          <LinearGradient
            colors={['rgba(156, 39, 176, 0.1)', 'rgba(156, 39, 176, 0.05)']}
            style={styles.completionGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Sparkles size={64} color={Colors.primary} style={styles.completionIcon} />
            
            <Text style={styles.completionTitle}>Quiz Completed!</Text>
            
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreLabel}>Your Score</Text>
              <Text style={styles.scoreValue}>{quizScore}/{quizTotalPoints}</Text>
              <Text style={styles.scorePercentage}>{percentage}%</Text>
            </View>
            
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{correctAnswers}</Text>
                <Text style={styles.statLabel}>Correct</Text>
              </View>
              
              <View style={styles.statDivider} />
              
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{questions.length - correctAnswers}</Text>
                <Text style={styles.statLabel}>Incorrect</Text>
              </View>
              
              <View style={styles.statDivider} />
              
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{questions.length}</Text>
                <Text style={styles.statLabel}>Total</Text>
              </View>
            </View>
            
            <Button
              title="Return to Practice"
              onPress={() => router.back()}
              variant="filled"
              color={Colors.primary}
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
          title: id ? id.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' ') : 'Quiz',
          headerBackground: () => (
            <LinearGradient
              colors={Colors.gradientPurple}
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
        {quizCompleted ? (
          renderQuizCompletion()
        ) : (
          <>
            <View style={styles.progressContainer}>
              <Text style={styles.progressText}>
                Question {currentQuestionIndex + 1} of {questions.length}
              </Text>
              <View style={styles.progressBar}>
                <LinearGradient
                  colors={Colors.gradientPurple}
                  style={[
                    styles.progressFill, 
                    { width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                />
              </View>
            </View>
            
            <ScrollView 
              style={styles.scrollView} 
              contentContainerStyle={styles.content}
            >
              <Card variant="elevated">
                {renderQuestion()}
              </Card>
            </ScrollView>
            
            <View style={styles.navigationContainer}>
              {currentQuestionIndex > 0 && (
                <Button
                  title="Previous"
                  onPress={goToPreviousQuestion}
                  variant="text"
                  color={Colors.primary}
                  icon="arrow-left"
                />
              )}
              
              {showFeedback ? (
                <Button
                  title={currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish Quiz'}
                  onPress={goToNextQuestion}
                  variant="filled"
                  color={Colors.primary}
                  icon={currentQuestionIndex < questions.length - 1 ? 'arrow-right' : 'check-circle'}
                  iconPosition="right"
                />
              ) : (
                <Button
                  title="Check Answer"
                  onPress={() => setShowFeedback(true)}
                  variant="filled"
                  color={Colors.primary}
                  icon="check-circle"
                  iconPosition="right"
                  disabled={!currentQuizAnswers[currentQuestion?.id]}
                />
              )}
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
  progressContainer: {
    padding: 16,
    backgroundColor: Colors.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  progressText: {
    ...Typography.caption,
    marginBottom: 8,
    textAlign: 'center',
  },
  progressBar: {
    height: 6,
    backgroundColor: Colors.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: Colors.card,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
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
    color: Colors.primary,
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
    color: Colors.primary,
    marginBottom: 4,
  },
  scorePercentage: {
    ...Typography.heading3,
    color: Colors.text,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  statLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.border,
  },
  returnButton: {
    marginTop: 16,
  },
});