import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { QuizResult, ChallengeResult } from '@/types/quiz';

interface QuizState {
  quizResults: QuizResult[];
  challengeResults: ChallengeResult[];
  currentQuizId: string | null;
  currentQuizAnswers: Record<string, string | number>;
  xpPoints: number;
  
  // Quiz actions
  startQuiz: (quizId: string) => void;
  answerQuestion: (questionId: string, answer: string | number) => void;
  completeQuiz: (result: QuizResult) => void;
  
  // Challenge actions
  startChallenge: (challengeId: string) => void;
  completeChallenge: (result: ChallengeResult) => void;
  
  // XP and progress
  addXpPoints: (points: number) => void;
  getCompletedQuizzes: () => string[];
  getCompletedChallenges: () => string[];
  getQuizResult: (quizId: string) => QuizResult | undefined;
  getChallengeResult: (challengeId: string) => ChallengeResult | undefined;
  resetCurrentQuiz: () => void;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      quizResults: [],
      challengeResults: [],
      currentQuizId: null,
      currentQuizAnswers: {},
      xpPoints: 0,
      
      startQuiz: (quizId: string) => set({
        currentQuizId: quizId,
        currentQuizAnswers: {}
      }),
      
      answerQuestion: (questionId: string, answer: string | number) => set(state => ({
        currentQuizAnswers: {
          ...state.currentQuizAnswers,
          [questionId]: answer
        }
      })),
      
      completeQuiz: (result: QuizResult) => set(state => {
        // Check if this quiz was already completed
        const existingIndex = state.quizResults.findIndex(r => r.quizId === result.quizId);
        let updatedResults = [...state.quizResults];
        
        if (existingIndex >= 0) {
          // Update existing result if the new score is better
          if (result.score > updatedResults[existingIndex].score) {
            updatedResults[existingIndex] = result;
          }
        } else {
          // Add new result
          updatedResults.push(result);
        }
        
        return {
          quizResults: updatedResults,
          currentQuizId: null,
          currentQuizAnswers: {},
          xpPoints: state.xpPoints + result.score
        };
      }),
      
      startChallenge: (challengeId: string) => {
        // This could initialize any state needed for the challenge
      },
      
      completeChallenge: (result: ChallengeResult) => set(state => {
        // Check if this challenge was already completed
        const existingIndex = state.challengeResults.findIndex(r => r.challengeId === result.challengeId);
        let updatedResults = [...state.challengeResults];
        
        if (existingIndex >= 0) {
          // Update existing result if the new score is better
          if (result.score > updatedResults[existingIndex].score) {
            updatedResults[existingIndex] = result;
          }
        } else {
          // Add new result
          updatedResults.push(result);
        }
        
        return {
          challengeResults: updatedResults,
          xpPoints: state.xpPoints + result.score
        };
      }),
      
      addXpPoints: (points: number) => set(state => ({
        xpPoints: state.xpPoints + points
      })),
      
      getCompletedQuizzes: () => get().quizResults.map(result => result.quizId),
      
      getCompletedChallenges: () => get().challengeResults
        .filter(result => result.completed)
        .map(result => result.challengeId),
      
      getQuizResult: (quizId: string) => 
        get().quizResults.find(result => result.quizId === quizId),
      
      getChallengeResult: (challengeId: string) => 
        get().challengeResults.find(result => result.challengeId === challengeId),
      
      resetCurrentQuiz: () => set({
        currentQuizId: null,
        currentQuizAnswers: {}
      })
    }),
    {
      name: 'react-learning-quiz-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);