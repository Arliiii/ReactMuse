import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/colors';
import Typography from '@/constants/typography';
import { Quote as QuoteIcon } from 'lucide-react-native';

interface QuoteProps {
  text: string;
  author?: string;
  variant?: 'default' | 'primary' | 'secondary';
}

export default function Quote({ 
  text, 
  author,
  variant = 'default' 
}: QuoteProps) {
  const getGradientColors = () => {
    switch (variant) {
      case 'primary':
        return ['rgba(156, 39, 176, 0.1)', 'rgba(156, 39, 176, 0.05)'];
      case 'secondary':
        return ['rgba(255, 64, 129, 0.1)', 'rgba(255, 64, 129, 0.05)'];
      default:
        return ['rgba(0, 0, 0, 0.05)', 'rgba(0, 0, 0, 0.02)'];
    }
  };
  
  const getIconColor = () => {
    switch (variant) {
      case 'primary':
        return Colors.primary;
      case 'secondary':
        return Colors.secondary;
      default:
        return Colors.textSecondary;
    }
  };
  
  return (
    <LinearGradient
      colors={getGradientColors()}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <QuoteIcon 
        size={24} 
        color={getIconColor()} 
        style={styles.icon} 
      />
      <Text style={styles.text}>{text}</Text>
      {author && (
        <Text style={styles.author}>— {author}</Text>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 20,
    marginVertical: 16,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  icon: {
    marginBottom: 12,
  },
  text: {
    ...Typography.quote,
    borderLeftWidth: 0,
    paddingLeft: 0,
    marginBottom: 12,
  },
  author: {
    ...Typography.caption,
    textAlign: 'right',
    fontWeight: '600',
  },
});