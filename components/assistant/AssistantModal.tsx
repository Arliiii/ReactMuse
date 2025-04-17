import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Animated
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAssistantStore, Message, generateResponse } from '@/store/assistant-store';
import Colors from '@/constants/colors';
import Typography from '@/constants/typography';
import { Bot, Send, X, Sparkles } from 'lucide-react-native';

interface AssistantModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function AssistantModal({ visible, onClose }: AssistantModalProps) {
  const { messages, addMessage, generateSuggestion } = useAssistantStore();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Add welcome message if there are no messages
  useEffect(() => {
    if (visible && messages.length === 0) {
      const welcomeMessage = "Hi! I'm Rea, your React learning assistant. I can help explain concepts, provide code examples, or suggest what to learn next. What would you like to know?";
      addMessage(welcomeMessage, 'assistant');

      // Also add a suggestion
      const suggestion = generateSuggestion();
      setTimeout(() => {
        addMessage(suggestion, 'assistant');
      }, 1000);
    }
  }, [visible, messages.length]);

  // Fade in animation when modal becomes visible
  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [visible]);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    if (messages.length > 0 && flatListRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '') return;

    // Add user message
    addMessage(input, 'user');
    setInput('');

    // Simulate assistant typing
    setIsTyping(true);

    // Generate response using Gemini API
    try {
      const userQuestion = input;
      Keyboard.dismiss();

      // Add a small delay to make the typing indicator visible
      setTimeout(async () => {
        const response = await generateResponse(userQuestion);
        addMessage(response, 'assistant');
        setIsTyping(false);
      }, 1500);
    } catch (error) {
      console.error('Error getting response:', error);
      addMessage("I'm having trouble connecting right now. Please try again later.", 'assistant');
      setIsTyping(false);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isAssistant = item.sender === 'assistant';

    return (
      <View style={[
        styles.messageContainer,
        isAssistant ? styles.assistantMessageContainer : styles.userMessageContainer
      ]}>
        {isAssistant && (
          <View style={styles.avatarContainer}>
            <LinearGradient
              colors={Colors.gradientPink}
              style={styles.avatar}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Bot size={16} color="white" />
            </LinearGradient>
          </View>
        )}

        <View style={[
          styles.messageBubble,
          isAssistant ? styles.assistantBubble : styles.userBubble
        ]}>
          <Text style={[
            styles.messageText,
            isAssistant ? styles.assistantText : styles.userText
          ]}>
            {item.content}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.keyboardAvoidingView}
          >
            <View style={styles.header}>
              <View style={styles.headerContent}>
                <LinearGradient
                  colors={Colors.gradientPink}
                  style={styles.headerIcon}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Bot size={20} color="white" />
                </LinearGradient>
                <Text style={styles.headerTitle}>Rea</Text>
                <Text style={styles.headerSubtitle}>React Learning Assistant</Text>
              </View>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <X size={24} color={Colors.text} />
              </TouchableOpacity>
            </View>

            <FlatList
              ref={flatListRef}
              data={messages}
              renderItem={renderMessage}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.messagesContainer}
            />

            {isTyping && (
              <View style={styles.typingContainer}>
                <View style={styles.typingBubble}>
                  <View style={styles.typingDot} />
                  <View style={[styles.typingDot, styles.typingDotMiddle]} />
                  <View style={styles.typingDot} />
                </View>
              </View>
            )}

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={input}
                onChangeText={setInput}
                placeholder="Ask Rea about React..."
                placeholderTextColor={Colors.textSecondary}
                multiline
                maxLength={500}
              />
              <TouchableOpacity
                style={[
                  styles.sendButton,
                  input.trim() === '' ? styles.sendButtonDisabled : null
                ]}
                onPress={handleSend}
                disabled={input.trim() === ''}
              >
                <Send size={20} color="white" />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    flex: 1,
    marginTop: 50,
    marginBottom: 20,
    marginHorizontal: 20,
    backgroundColor: Colors.card,
    borderRadius: 20,
    overflow: 'hidden',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTitle: {
    ...Typography.heading3,
    marginBottom: 0,
    marginRight: 8,
  },
  headerSubtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  closeButton: {
    padding: 4,
  },
  messagesContainer: {
    padding: 16,
    paddingBottom: 24,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    maxWidth: '80%',
  },
  assistantMessageContainer: {
    alignSelf: 'flex-start',
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse',
  },
  avatarContainer: {
    marginRight: 8,
    alignSelf: 'flex-end',
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageBubble: {
    padding: 12,
    borderRadius: 16,
  },
  assistantBubble: {
    backgroundColor: 'rgba(255, 64, 129, 0.1)',
    borderTopLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: Colors.primary,
    borderTopRightRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  assistantText: {
    color: Colors.text,
  },
  userText: {
    color: 'white',
  },
  typingContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  typingBubble: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 64, 129, 0.1)',
    padding: 12,
    borderRadius: 16,
    borderTopLeftRadius: 4,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.secondary,
    marginHorizontal: 2,
    opacity: 0.6,
  },
  typingDotMiddle: {
    opacity: 0.8,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.card,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxHeight: 100,
    fontSize: 16,
    color: Colors.text,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  sendButtonDisabled: {
    backgroundColor: Colors.textSecondary,
  },
});