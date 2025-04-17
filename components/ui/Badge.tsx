import React from 'react';
import { StyleSheet, View, Text, ViewStyle } from 'react-native';
import Colors from '@/constants/colors';

interface BadgeProps {
  label: string;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
}

export default function Badge({ 
  label, 
  variant = 'default',
  size = 'medium',
  style 
}: BadgeProps) {
  const getBadgeColor = () => {
    switch (variant) {
      case 'success':
        return Colors.success;
      case 'warning':
        return Colors.warning;
      case 'error':
        return Colors.error;
      case 'info':
        return Colors.info;
      default:
        return Colors.primary;
    }
  };
  
  const getBadgeSize = () => {
    switch (size) {
      case 'small':
        return styles.badgeSmall;
      case 'large':
        return styles.badgeLarge;
      default:
        return styles.badgeMedium;
    }
  };
  
  const getTextSize = () => {
    switch (size) {
      case 'small':
        return styles.textSmall;
      case 'large':
        return styles.textLarge;
      default:
        return styles.textMedium;
    }
  };
  
  return (
    <View 
      style={[
        styles.badge, 
        getBadgeSize(),
        { backgroundColor: getBadgeColor() },
        style
      ]}
    >
      <Text style={[styles.text, getTextSize()]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  badgeSmall: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeMedium: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  badgeLarge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  text: {
    color: 'white',
    fontWeight: '600',
  },
  textSmall: {
    fontSize: 10,
  },
  textMedium: {
    fontSize: 12,
  },
  textLarge: {
    fontSize: 14,
  },
});