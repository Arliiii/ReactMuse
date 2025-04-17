import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import Colors from '@/constants/colors';
import Typography from '@/constants/typography';

interface CodeBlockProps {
  code: string;
  title?: string;
}

export default function CodeBlock({ code, title }: CodeBlockProps) {
  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={true}
        style={styles.scrollContainer}
      >
        <Text style={styles.code}>{code}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  title: {
    ...Typography.caption,
    backgroundColor: Colors.primary,
    color: 'white',
    padding: 8,
    fontWeight: '500',
  },
  scrollContainer: {
    backgroundColor: Colors.codeBackground,
  },
  code: {
    ...Typography.code,
    padding: 16,
  },
});