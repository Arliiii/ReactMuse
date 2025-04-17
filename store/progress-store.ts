import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ProgressState {
  completedTopics: string[];
  markTopicCompleted: (topicId: string) => void;
  markTopicIncomplete: (topicId: string) => void;
  isTopicCompleted: (topicId: string) => boolean;
  getCompletionPercentage: () => number;
  totalTopics: number;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedTopics: [],
      totalTopics: 24, // Update this based on the total number of topics
      
      markTopicCompleted: (topicId: string) => 
        set((state) => ({
          completedTopics: state.completedTopics.includes(topicId) 
            ? state.completedTopics 
            : [...state.completedTopics, topicId]
        })),
      
      markTopicIncomplete: (topicId: string) => 
        set((state) => ({
          completedTopics: state.completedTopics.filter(id => id !== topicId)
        })),
      
      isTopicCompleted: (topicId: string) => 
        get().completedTopics.includes(topicId),
      
      getCompletionPercentage: () => 
        (get().completedTopics.length / get().totalTopics) * 100,
    }),
    {
      name: 'react-learning-progress',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);