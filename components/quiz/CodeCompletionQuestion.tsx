import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { QuizQuestion } from '@/types/quiz';
import Colors from '@/constants/colors';
import Typography from '@/constants/typography';
import CodeBlock from '@/components/CodeBlock';
import { CheckCircle, AlertCircle } from 'lucide-react-native';

interface CodeCompletionQuestionProps {
  question: QuizQuestion;
  answer: string;
  onAnswerChange: (answer: string) => void;
  showFeedback: boolean;
}

export default function CodeCompletionQuestion({
  question,
  answer,
  onAnswerChange,
  showFeedback
}: CodeCompletionQuestionProps) {
  const [userAnswers, setUserAnswers] = useState<string[]>(
    answer ? answer.split(',') : Array(question.code?.match(/___+/g)?.length || 0).fill('')
  );
  
  const isCorrect = answer === question.correctAnswer;
  
  const handleAnswerChange = (text: string, index: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = text;
    setUserAnswers(newAnswers);
    onAnswerChange(newAnswers.join(','));
  };
  
  // Replace blanks in code with input fields or answers
  const renderCodeWithInputs = () => {
    if (!question.code) return null;
    
    const parts = question.code.split(/___+/g);
    const blanks = question.code.match(/___+/g) || [];
    
    return (
      <View style={styles.codeContainer}>
        <Text style={styles.codeText}>
          {parts.map((part, index) => {
            const isLastPart = index === parts.length - 1;
            
            return (
              <React.Fragment key={index}>
                {part}
                {!isLastPart && (
                  showFeedback ? (
                    <Text style={[
                      styles.codeAnswer,
                      userAnswers[index] === question.correctAnswer.split(',')[index]
                        ? styles.correctAnswer
                        : styles.incorrectAnswer
                    ]}>
                      {userAnswers[index] || ''}
                    </Text>
                  ) : (
                    <TextInput
                      style={styles.codeInput}
                      value={userAnswers[index]}
                      onChangeText={(text) => handleAnswerChange(text, index)}
                      placeholder="..."
                      placeholderTextColor="#999"
                    />
                  )
                )}
              </React.Fragment>
            );
          })}
        </Text>
      </View>
    );
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question.question}</Text>
      
      {renderCodeWithInputs()}
      
      {showFeedback && (
        <View style={styles.feedbackContainer}>
          <View style={[
            styles.feedbackHeader,
            isCorrect ? styles.correctFeedbackHeader : styles.incorrectFeedbackHeader
          ]}>
            {isCorrect ? (
              <CheckCircle size={20} color="white" style={styles.feedbackIcon} />
            ) : (
              <AlertCircle size={20} color="white" style={styles.feedbackIcon} />
            )}
            <Text style={styles.feedbackHeaderText}>
              {isCorrect ? 'Correct!' : 'Incorrect'}
            </Text>
          </View>
          
          {!isCorrect && (
            <View style={styles.correctAnswerContainer}>
              <Text style={styles.correctAnswerLabel}>Correct answer:</Text>
              <Text style={styles.correctAnswerText}>
                {question.correctAnswer.split(',').join(', ')}
              </Text>
            </View>
          )}
          
          <Text style={styles.explanation}>{question.explanation}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  question: {
    ...Typography.heading3,
    marginBottom: 16,
  },
  codeContainer: {
    backgroundColor: Colors.codeBackground,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  codeText: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: Colors.text,
  },
  codeInput: {
    fontFamily: 'monospace',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 4,
    padding: 2,
    paddingHorizontal: 4,
    minWidth: 60,
    color: Colors.primary,
  },
  codeAnswer: {
    fontFamily: 'monospace',
    padding: 2,
    paddingHorizontal: 4,
    fontWeight: 'bold',
  },
  correctAnswer: {
    color: Colors.completed,
    backgroundColor: 'rgba(46, 204, 113, 0.1)',
  },
  incorrectAnswer: {
    color: Colors.error,
    backgroundColor: 'rgba(231, 76, 60, 0.1)',
    textDecorationLine: 'line-through',
  },
  feedbackContainer: {
    backgroundColor: Colors.card,
    borderRadius: 8,
    overflow: 'hidden',
  },
  feedbackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  correctFeedbackHeader: {
    backgroundColor: Colors.completed,
  },
  incorrectFeedbackHeader: {
    backgroundColor: Colors.error,
  },
  feedbackIcon: {
    marginRight: 8,
  },
  feedbackHeaderText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  correctAnswerContainer: {
    backgroundColor: 'rgba(46, 204, 113, 0.1)',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  correctAnswerLabel: {
    ...Typography.caption,
    fontWeight: '600',
    marginBottom: 4,
  },
  correctAnswerText: {
    fontFamily: 'monospace',
    color: Colors.completed,
    fontWeight: '500',
  },
  explanation: {
    ...Typography.body,
    padding: 16,
  },
});