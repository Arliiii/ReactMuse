import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Colors from '@/constants/colors';
import Typography from '@/constants/typography';

interface ProgressBarProps {
  progress: number;
  label?: string;
}

export default function ProgressBar({ progress, label }: ProgressBarProps) {
  // Ensure progress is between 0 and 100
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.progressContainer}>
        <View 
          style={[
            styles.progressBar, 
            { width: `${clampedProgress}%` }
          ]} 
        />
      </View>
      <Text style={styles.percentage}>{Math.round(clampedProgress)}%</Text>
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
    height: 8,
    backgroundColor: Colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  percentage: {
    ...Typography.caption,
    marginTop: 4,
    textAlign: 'right',
  },
});