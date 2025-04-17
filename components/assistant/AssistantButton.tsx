import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Animated } from 'react-native';
import { useAssistantStore } from '@/store/assistant-store';
import Colors from '@/constants/colors';
import { Bot, X } from 'lucide-react-native';

interface AssistantButtonProps {
  onPress: () => void;
}

export default function AssistantButton({ onPress }: AssistantButtonProps) {
  const { isOpen, hasUnreadSuggestion } = useAssistantStore();
  const [pulseAnim] = useState(new Animated.Value(1));
  
  // Create a pulsing animation when there's an unread suggestion
  useEffect(() => {
    if (hasUnreadSuggestion) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [hasUnreadSuggestion]);
  
  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ scale: pulseAnim }] }
      ]}
    >
      <TouchableOpacity
        style={[
          styles.button,
          isOpen ? styles.buttonOpen : null
        ]}
        onPress={onPress}
        activeOpacity={0.8}
      >
        {isOpen ? (
          <X size={24} color="white" />
        ) : (
          <Bot size={24} color="white" />
        )}
      </TouchableOpacity>
      
      {hasUnreadSuggestion && !isOpen && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>1</Text>
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    zIndex: 1000,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonOpen: {
    backgroundColor: Colors.textSecondary,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: Colors.error,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});