import React from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/colors';
import Typography from '@/constants/typography';

interface ProgressBarProps {
  progress: number;
  label?: string;
  height?: number;
  showPercentage?: boolean;
  variant?: 'default' | 'success' | 'primary' | 'secondary';
}

export default function ProgressBar({ 
  progress, 
  label, 
  height = 8,
  showPercentage = true,
  variant = 'default'
}: ProgressBarProps) {
  // Ensure progress is between 0 and 100
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  
  const getGradientColors = () => {
    switch (variant) {
      case 'success':
        return Colors.gradientSuccess;
      case 'primary':
        return Colors.gradientPurple;
      case 'secondary':
        return Colors.gradientPink;
      default:
        return Colors.gradientPurple;
    }
  };
  
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.progressContainer, { height }]}>
        <LinearGradient
          colors={getGradientColors()}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            styles.progressBar, 
            { width: `${clampedProgress}%` }
          ]}
        />
      </View>
      {showPercentage && (
        <Text style={styles.percentage}>{Math.round(clampedProgress)}%</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  label: {
    ...Typography.caption,
    marginBottom: 4,
  },
  progressContainer: {
    backgroundColor: Colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  percentage: {
    ...Typography.caption,
    marginTop: 4,
    textAlign: 'right',
  },
});
