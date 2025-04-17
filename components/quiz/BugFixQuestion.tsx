import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { QuizQuestion } from '@/types/quiz';
import Colors from '@/constants/colors';
import Typography from '@/constants/typography';
import CodeBlock from '@/components/CodeBlock';
import { CheckCircle, AlertCircle, HelpCircle } from 'lucide-react-native';

interface BugFixQuestionProps {
  question: QuizQuestion;
  answer: string;
  onAnswerChange: (answer: string) => void;
  showFeedback: boolean;
}

export default function BugFixQuestion({
  question,
  answer,
  onAnswerChange,
  showFeedback
}: BugFixQuestionProps) {
  const [showHint, setShowHint] = useState(false);
  
  const isCorrect = answer.trim() === question.correctAnswer.trim();
  
  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question.question}</Text>
      
      <View style={styles.codeSection}>
        <Text style={styles.sectionTitle}>Buggy Code:</Text>
        <CodeBlock code={question.code || ''} />
      </View>
      
      <View style={styles.fixSection}>
        <Text style={styles.sectionTitle}>Your Fix:</Text>
        {showFeedback ? (
          <View style={[
            styles.fixResult,
            isCorrect ? styles.correctFix : styles.incorrectFix
          ]}>
            <CodeBlock code={answer || ''} />
          </View>
        ) : (
          <TextInput
            style={styles.codeInput}
            value={answer}
            onChangeText={onAnswerChange}
            placeholder="Write your fixed code here..."
            multiline
            numberOfLines={10}
          />
        )}
      </View>
      
      {!showFeedback && question.hint && (
        <TouchableOpacity 
          style={styles.hintButton}
          onPress={() => setShowHint(!showHint)}
          activeOpacity={0.7}
        >
          <HelpCircle size={16} color={Colors.primary} style={styles.hintIcon} />
          <Text style={styles.hintButtonText}>
            {showHint ? 'Hide Hint' : 'Show Hint'}
          </Text>
        </TouchableOpacity>
      )}
      
      {!showFeedback && showHint && question.hint && (
        <View style={styles.hintContainer}>
          <Text style={styles.hintText}>{question.hint}</Text>
        </View>
      )}
      
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
              <Text style={styles.correctAnswerLabel}>Correct solution:</Text>
              <CodeBlock code={question.correctAnswer} />
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
  codeSection: {
    marginBottom: 16,
  },
  fixSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    ...Typography.body,
    fontWeight: '600',
    marginBottom: 8,
  },
  codeInput: {
    fontFamily: 'monospace',
    backgroundColor: Colors.codeBackground,
    borderRadius: 8,
    padding: 16,
    minHeight: 200,
    borderWidth: 1,
    borderColor: Colors.border,
    color: Colors.text,
    textAlignVertical: 'top',
  },
  fixResult: {
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
  },
  correctFix: {
    borderColor: Colors.completed,
  },
  incorrectFix: {
    borderColor: Colors.error,
  },
  hintButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  hintIcon: {
    marginRight: 4,
  },
  hintButtonText: {
    color: Colors.primary,
    fontWeight: '500',
  },
  hintContainer: {
    backgroundColor: 'rgba(74, 144, 226, 0.1)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  hintText: {
    ...Typography.body,
    color: Colors.text,
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  correctAnswerLabel: {
    ...Typography.body,
    fontWeight: '600',
    marginBottom: 8,
  },
  explanation: {
    ...Typography.body,
    padding: 16,
  },
});