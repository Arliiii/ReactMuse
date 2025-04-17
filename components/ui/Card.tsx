import React, { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Colors from '@/constants/colors';

interface CardProps {
  children: ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'outlined' | 'elevated';
  color?: string;
}

export default function Card({ 
  children, 
  style, 
  variant = 'default',
  color
}: CardProps) {
  const getCardStyle = () => {
    switch (variant) {
      case 'outlined':
        return [
          styles.card, 
          styles.outlinedCard, 
          color && { borderColor: color },
          style
        ];
      case 'elevated':
        return [
          styles.card, 
          styles.elevatedCard, 
          style
        ];
      default:
        return [
          styles.card, 
          color && { backgroundColor: color },
          style
        ];
    }
  };

  return (
    <View style={getCardStyle()}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  outlinedCard: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.border,
  },
  elevatedCard: {
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    style: {
      pointerEvents: 'auto'
    }
  },
});
