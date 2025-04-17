import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Colors from '@/constants/colors';
import Typography from '@/constants/typography';
import { CheckCircle } from 'lucide-react-native';

interface KeyPointsListProps {
  points: string[];
}

export default function KeyPointsList({ points }: KeyPointsListProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Key Points</Text>
      {points.map((point, index) => (
        <View key={index} style={styles.pointContainer}>
          <CheckCircle size={18} color={Colors.primary} style={styles.icon} />
          <Text style={styles.pointText}>{point}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    backgroundColor: Colors.card,
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  title: {
    ...Typography.heading3,
    marginBottom: 12,
  },
  pointContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  icon: {
    marginRight: 8,
    marginTop: 2,
  },
  pointText: {
    ...Typography.body,
    flex: 1,
  },
});