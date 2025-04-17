export type QuestionType = 'multiple-choice' | 'code-completion' | 'bug-fix';

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  topicId: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  points: number;
  question: string;
  code?: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  hint?: string;
}

export interface CodingChallenge {
  id: string;
  title: string;
  topicId: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  points: number;
  description: string;
  instructions: string[];
  starterCode: string;
  solutionCode: string;
  testCases?: {
    input: any;
    expectedOutput: any;
  }[];
  hints: string[];
}

export interface QuizResult {
  quizId: string;
  score: number;
  totalPoints: number;
  correctAnswers: number;
  totalQuestions: number;
  completedAt: string;
}

export interface ChallengeResult {
  challengeId: string;
  completed: boolean;
  score: number;
  totalPoints: number;
  completedAt?: string;
}