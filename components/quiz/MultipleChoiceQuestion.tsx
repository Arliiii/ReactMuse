import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { QuizQuestion } from '@/types/quiz';
import Colors from '@/constants/colors';
import Typography from '@/constants/typography';
import { CheckCircle, Circle, AlertCircle } from 'lucide-react-native';

interface MultipleChoiceQuestionProps {
  question: QuizQuestion;
  selectedAnswer: number | null;
  onSelectAnswer: (answer: number) => void;
  showFeedback: boolean;
}

export default function MultipleChoiceQuestion({
  question,
  selectedAnswer,
  onSelectAnswer,
  showFeedback
}: MultipleChoiceQuestionProps) {
  const isCorrect = selectedAnswer === question.correctAnswer;
  
  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question.question}</Text>
      
      {question.options?.map((option, index) => {
        const isSelected = selectedAnswer === index;
        const isCorrectOption = index === question.correctAnswer;
        
        let optionStyle = styles.option;
        let textStyle = styles.optionText;
        let IconComponent = isSelected ? CheckCircle : Circle;
        let iconColor = Colors.textSecondary;
        
        if (showFeedback) {
          if (isSelected && isCorrect) {
            optionStyle = styles.correctOption;
            textStyle = styles.correctOptionText;
            iconColor = Colors.completed;
          } else if (isSelected && !isCorrect) {
            optionStyle = styles.incorrectOption;
            textStyle = styles.incorrectOptionText;
            iconColor = Colors.error;
          } else if (isCorrectOption) {
            optionStyle = styles.correctOption;
            textStyle = styles.correctOptionText;
            iconColor = Colors.completed;
          }
        } else if (isSelected) {
          optionStyle = styles.selectedOption;
          textStyle = styles.selectedOptionText;
          iconColor = Colors.primary;
        }
        
        return (
          <TouchableOpacity
            key={index}
            style={[optionStyle]}
            onPress={() => !showFeedback && onSelectAnswer(index)}
            disabled={showFeedback}
            activeOpacity={0.7}
          >
            <IconComponent size={20} color={iconColor} style={styles.optionIcon} />
            <Text style={textStyle}>{option}</Text>
          </TouchableOpacity>
        );
      })}
      
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
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.card,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  selectedOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.card,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  correctOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(46, 204, 113, 0.1)',
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.completed,
  },
  incorrectOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(231, 76, 60, 0.1)',
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.error,
  },
  optionIcon: {
    marginRight: 12,
  },
  optionText: {
    ...Typography.body,
    flex: 1,
  },
  selectedOptionText: {
    ...Typography.body,
    flex: 1,
    color: Colors.primary,
    fontWeight: '500',
  },
  correctOptionText: {
    ...Typography.body,
    flex: 1,
    color: Colors.completed,
    fontWeight: '500',
  },
  incorrectOptionText: {
    ...Typography.body,
    flex: 1,
    color: Colors.error,
    fontWeight: '500',
  },
  feedbackContainer: {
    marginTop: 8,
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
  explanation: {
    ...Typography.body,
    padding: 16,
  },
});