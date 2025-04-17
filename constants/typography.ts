import { StyleSheet } from 'react-native';
import Colors from './colors';

export default StyleSheet.create({
  heading1: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
    letterSpacing: 0.25,
  },
  heading2: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
    letterSpacing: 0.15,
  },
  heading3: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
    letterSpacing: 0.1,
  },
  body: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    letterSpacing: 0.5,
  },
  bodyLarge: {
    fontSize: 18,
    color: Colors.text,
    lineHeight: 26,
    letterSpacing: 0.5,
  },
  caption: {
    fontSize: 14,
    color: Colors.textSecondary,
    letterSpacing: 0.4,
  },
  button: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.75,
    textTransform: 'uppercase',
  },
  code: {
    fontFamily: 'monospace',
    fontSize: 14,
    backgroundColor: Colors.codeBackground,
    padding: 12,
    borderRadius: 8,
    color: Colors.text,
    letterSpacing: 0,
  },
  quote: {
    fontSize: 16,
    fontStyle: 'italic',
    color: Colors.textSecondary,
    lineHeight: 24,
    letterSpacing: 0.5,
    paddingLeft: 16,
    borderLeftWidth: 2,
    borderLeftColor: Colors.primary,
  },
});