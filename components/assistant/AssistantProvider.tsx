import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useAssistantStore } from '@/store/assistant-store';
import AssistantButton from './AssistantButton';
import AssistantModal from './AssistantModal';

export default function AssistantProvider() {
  const { isOpen, toggleAssistant, hasUnreadSuggestion, generateSuggestion, addMessage } = useAssistantStore();
  
  // Generate a suggestion after a delay when the app starts
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        const suggestion = generateSuggestion();
        addMessage(suggestion, 'assistant');
        useAssistantStore.setState({ hasUnreadSuggestion: true });
      }
    }, 60000); // Show first suggestion after 1 minute
    
    return () => clearTimeout(timer);
  }, []);
  
  // Generate a new suggestion periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isOpen) {
        const suggestion = generateSuggestion();
        addMessage(suggestion, 'assistant');
        useAssistantStore.setState({ hasUnreadSuggestion: true });
      }
    }, 15 * 60 * 1000); // Show new suggestions every 15 minutes
    
    return () => clearInterval(interval);
  }, [isOpen]);
  
  return (
    <View>
      <AssistantButton onPress={toggleAssistant} />
      <AssistantModal visible={isOpen} onClose={toggleAssistant} />
    </View>
  );
}