import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useProgressStore } from './progress-store';
import { useQuizStore } from './quiz-store';
import { learningPath } from '@/data/learning-path';
import { getGeminiResponse, getFallbackResponse } from '@/services/gemini-api';

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: string;
}

interface AssistantState {
  messages: Message[];
  isOpen: boolean;
  hasUnreadSuggestion: boolean;

  // Actions
  addMessage: (content: string, sender: 'user' | 'assistant') => void;
  clearMessages: () => void;
  toggleAssistant: () => void;
  openAssistant: () => void;
  closeAssistant: () => void;
  markSuggestionAsRead: () => void;
  generateSuggestion: () => string;
}

export const useAssistantStore = create<AssistantState>()(
  persist(
    (set, get) => ({
      messages: [],
      isOpen: false,
      hasUnreadSuggestion: false,

      addMessage: (content, sender) => set(state => ({
        messages: [
          ...state.messages,
          {
            id: Date.now().toString(),
            content,
            sender,
            timestamp: new Date().toISOString()
          }
        ]
      })),

      clearMessages: () => set({ messages: [] }),

      toggleAssistant: () => set(state => ({
        isOpen: !state.isOpen,
        hasUnreadSuggestion: state.isOpen ? state.hasUnreadSuggestion : false
      })),

      openAssistant: () => set({
        isOpen: true,
        hasUnreadSuggestion: false
      }),

      closeAssistant: () => set({ isOpen: false }),

      markSuggestionAsRead: () => set({ hasUnreadSuggestion: false }),

      generateSuggestion: () => {
        const { completedTopics } = useProgressStore.getState();
        const { quizResults } = useQuizStore.getState();

        // If user hasn't started yet, give a welcome message
        if (completedTopics.length === 0) {
          return "Welcome to your React learning journey! I recommend starting with the JSX topic to build a solid foundation.";
        }

        // If user completed a topic but hasn't taken the related quiz
        const completedTopicIds = completedTopics;
        const completedQuizIds = quizResults.map(result => result.quizId);

        const topicToQuizMap: Record<string, string> = {
          'jsx': 'jsx-quiz',
          'components': 'components-quiz',
          'props': 'props-quiz',
          'state': 'state-quiz',
        };

        for (const topicId of completedTopicIds) {
          const relatedQuizId = topicToQuizMap[topicId];
          if (relatedQuizId && !completedQuizIds.includes(relatedQuizId)) {
            return `Great job completing the ${topicId} topic! Ready to test your knowledge? Try the ${topicId} quiz to reinforce what you've learned.`;
          }
        }

        // Suggest next topic to learn
        const allTopics = learningPath.flatMap(section => section.topics);
        const nextTopic = allTopics.find(topic => !completedTopicIds.includes(topic.id));

        if (nextTopic) {
          return `Looking for what to learn next? I recommend checking out the ${nextTopic.title} topic. It builds on what you've already learned!`;
        }

        // If user has completed everything
        if (completedTopicIds.length === allTopics.length) {
          return "Amazing work! You've completed all the topics. Have you tried the coding challenges to apply your knowledge?";
        }

        // Default suggestion
        return "Need help with React concepts? Feel free to ask me any questions!";
      }
    }),
    {
      name: 'react-learning-assistant',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        messages: state.messages.slice(-20) // Only persist the last 20 messages
      }),
    }
  )
);

// Function to generate responses based on user questions
export async function generateResponse(question: string): Promise<string> {
  try {
    const response = await getGeminiResponse(question);
    return response;
  } catch (error) {
    console.error('Error generating response:', error);
    // Always return a fallback response to ensure the app doesn't break
    return getFallbackResponse(question);
  }
}
