import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/colors';
import Typography from '@/constants/typography';
import { Bot, MessageCircle } from 'lucide-react-native';
import { useAssistantStore } from '@/store/assistant-store';

interface SuggestionCardProps {
  suggestion: string;
}

export default function SuggestionCard({ suggestion }: SuggestionCardProps) {
  const { openAssistant } = useAssistantStore();
  
  return (
    <TouchableOpacity 
      onPress={openAssistant}
      activeOpacity={0.7}
      style={styles.container}
    >
      <LinearGradient
        colors={['rgba(255, 64, 129, 0.1)', 'rgba(255, 64, 129, 0.05)']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.header}>
          <LinearGradient
            colors={Colors.gradientPink}
            style={styles.avatar}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Bot size={16} color="white" />
          </LinearGradient>
          <Text style={styles.title}>Rea suggests</Text>
        </View>
        
        <Text style={styles.suggestion}>{suggestion}</Text>
        
        <View style={styles.footer}>
          <MessageCircle size={16} color={Colors.secondary} style={styles.icon} />
          <Text style={styles.footerText}>Tap to chat with Rea</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  gradient: {
    borderRadius: 16,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: Colors.secondary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  title: {
    ...Typography.body,
    fontWeight: '600',
    color: Colors.secondary,
  },
  suggestion: {
    ...Typography.body,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  footerText: {
    ...Typography.caption,
    color: Colors.secondary,
    fontWeight: '500',
  },
});