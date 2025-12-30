import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../types/navigation';
import { BackButton } from '../../components/BackButton';
import { Theme } from '../../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

type ConversationalBookingScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'ConversationalBooking'
>;

interface Props {
  navigation: ConversationalBookingScreenNavigationProp;
}

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  quickReplies?: string[];
  bookingData?: any;
}

export const ConversationalBookingScreen: React.FC<Props> = ({
  navigation,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content:
        "Hi! I'm your AI beauty assistant 👋\n\nI can help you book appointments, find salons, or answer questions about services. What would you like to do today?",
      timestamp: new Date(),
      quickReplies: [
        'Book an appointment',
        'Find salons near me',
        'Browse services',
        'Ask a question',
      ],
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  const simulateAIResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();

    if (
      lowerMessage.includes('book') ||
      lowerMessage.includes('appointment')
    ) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content:
          "Great! I'll help you book an appointment. 📅\n\nWhat service are you looking for? For example:\n• Haircut\n• Braiding\n• Makeup\n• Nail services",
        timestamp: new Date(),
      };
    } else if (
      lowerMessage.includes('haircut') ||
      lowerMessage.includes('hair')
    ) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content:
          "Perfect! I found several salons offering haircuts near you. 💇‍♀️\n\nWhen would you like to book?\n• Today\n• Tomorrow\n• This weekend\n• Pick a specific date",
        timestamp: new Date(),
        quickReplies: ['Today', 'Tomorrow', 'This weekend', 'Pick a date'],
      };
    } else if (lowerMessage.includes('find') || lowerMessage.includes('salon')) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content:
          "I'll help you find the perfect salon! 🔍\n\nWhat are you looking for?\n• Barbershops\n• Hair salons\n• Nail tech\n• Makeup artists",
        timestamp: new Date(),
        quickReplies: ['Barbershops', 'Hair salons', 'Nail tech', 'Makeup'],
      };
    } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content:
          "Here are typical prices in Accra:\n\n💇 Haircuts: GHS 40-100\n🎨 Braiding: GHS 80-250\n💄 Makeup: GHS 100-300\n💅 Nails: GHS 50-150\n\nPrices vary by salon and service complexity. Would you like to see specific salons?",
        timestamp: new Date(),
        quickReplies: ['Yes, show salons', 'Ask another question'],
      };
    } else if (lowerMessage.includes('today') || lowerMessage.includes('now')) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content:
          "Looking for same-day bookings... ⚡\n\nI found 3 salons with availability today:\n\n1. Bestman Barbershop - 2.1km away\n   Available: 2:00 PM, 4:00 PM\n\n2. Premium Beauty - 3.5km away\n   Available: 3:00 PM, 5:00 PM\n\nWhich one interests you?",
        timestamp: new Date(),
        quickReplies: ['Bestman Barbershop', 'Premium Beauty', 'See more'],
      };
    } else if (
      lowerMessage.includes('bestman') ||
      lowerMessage.includes('barbershop')
    ) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content:
          "Excellent choice! Bestman Barbershop ⭐ 4.2 (200 reviews)\n\nAvailable times today:\n• 2:00 PM - 15% off (low traffic)\n• 4:00 PM\n\nWhich time works for you?",
        timestamp: new Date(),
        quickReplies: ['2:00 PM', '4:00 PM', 'Pick another time'],
      };
    } else if (lowerMessage.includes('2:00') || lowerMessage.includes('2pm')) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content:
          "Perfect! 🎉 Let me confirm your booking:\n\n📍 Bestman Barbershop\n🗓️ Today, 2:00 PM\n💇 Men's Haircut\n💰 GHS 60 (15% off applied!)\n\nWhat's your phone number for confirmation?",
        timestamp: new Date(),
      };
    } else {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content:
          "I'm here to help! I can assist you with:\n\n✅ Booking appointments\n✅ Finding salons nearby\n✅ Service information\n✅ Pricing details\n✅ Salon recommendations\n\nWhat would you like to know?",
        timestamp: new Date(),
      };
    }
  };

  const handleSendMessage = () => {
    if (inputText.trim() === '') return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = simulateAIResponse(inputText);
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickReply = (reply: string) => {
    setInputText(reply);
    setTimeout(() => handleSendMessage(), 100);
  };

  const renderMessage = (message: Message) => {
    const isBot = message.type === 'bot';

    return (
      <View
        key={message.id}
        style={[
          styles.messageContainer,
          isBot ? styles.botMessageContainer : styles.userMessageContainer,
        ]}
      >
        {isBot && (
          <View style={styles.botAvatar}>
            <Image
              source={require('../../assets/icons/ai-robot.png')}
              style={styles.botAvatarIcon}
              resizeMode="contain"
            />
          </View>
        )}
        <View
          style={[
            styles.messageBubble,
            isBot ? styles.botBubble : styles.userBubble,
          ]}
        >
          <Text
            style={[
              styles.messageText,
              isBot ? styles.botText : styles.userText,
            ]}
          >
            {message.content}
          </Text>
          <Text
            style={[
              styles.timestamp,
              isBot ? styles.botTimestamp : styles.userTimestamp,
            ]}
          >
            {message.timestamp.toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
            })}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        {/* Header */}
        <View style={styles.header}>
          <BackButton />
          <View style={styles.headerContent}>
            <View style={styles.headerAvatar}>
              <Image
                source={require('../../assets/icons/ai-robot.png')}
                style={styles.headerAvatarIcon}
                resizeMode="contain"
              />
            </View>
            <View>
              <Text style={styles.headerTitle}>AI Beauty Assistant</Text>
              <View style={styles.statusContainer}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>Online</Text>
              </View>
            </View>
          </View>
          <View style={styles.placeholder} />
        </View>

        {/* Messages */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((message) => (
            <View key={message.id}>
              {renderMessage(message)}
              {message.quickReplies && (
                <View style={styles.quickRepliesContainer}>
                  {message.quickReplies.map((reply, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.quickReplyButton}
                      onPress={() => handleQuickReply(reply)}
                    >
                      <Text style={styles.quickReplyText}>{reply}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          ))}

          {isTyping && (
            <View style={[styles.messageContainer, styles.botMessageContainer]}>
              <View style={styles.botAvatar}>
                <Image
                  source={require('../../assets/icons/ai-robot.png')}
                  style={styles.botAvatarIcon}
                  resizeMode="contain"
                />
              </View>
              <View style={[styles.messageBubble, styles.botBubble]}>
                <View style={styles.typingIndicator}>
                  <View style={styles.typingDot} />
                  <View style={styles.typingDot} />
                  <View style={styles.typingDot} />
                </View>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Input */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Type a message..."
              placeholderTextColor={Theme.colors.textPlaceholder}
              value={inputText}
              onChangeText={setInputText}
              multiline
              maxLength={500}
            />
            <TouchableOpacity
              style={[
                styles.sendButton,
                inputText.trim() === '' && styles.sendButtonDisabled,
              ]}
              onPress={handleSendMessage}
              disabled={inputText.trim() === ''}
            >
              <Image
                source={require('../../assets/icons/send-icon.png')}
                style={styles.sendIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Theme.colors.backgroundSecondary,
  },
  container: {
    flex: 1,
    backgroundColor: Theme.colors.backgroundSecondary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Theme.colors.backgroundSecondary,
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: Theme.spacing.sm,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Theme.spacing.sm,
  },
  headerAvatarIcon: {
    width: 24,
    height: 24,
    tintColor: Theme.colors.primary,
  },
  headerTitle: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.semibold,
    color: Theme.colors.textPrimary,
    marginBottom: 2,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 4,
  },
  statusText: {
    fontSize: Theme.fontSize.xs,
    color: Theme.colors.textSecondary,
  },
  placeholder: {
    width: 40,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: Theme.spacing.lg,
    paddingBottom: Theme.spacing.xl,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: Theme.spacing.md,
  },
  botMessageContainer: {
    justifyContent: 'flex-start',
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
  },
  botAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Theme.spacing.sm,
  },
  botAvatarIcon: {
    width: 20,
    height: 20,
    tintColor: Theme.colors.primary,
  },
  messageBubble: {
    maxWidth: '75%',
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.lg,
  },
  botBubble: {
    backgroundColor: Theme.colors.white,
    borderBottomLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: Theme.colors.primary,
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: Theme.fontSize.md,
    lineHeight: 22,
  },
  botText: {
    color: Theme.colors.textPrimary,
  },
  userText: {
    color: Theme.colors.white,
  },
  timestamp: {
    fontSize: Theme.fontSize.xs,
    marginTop: 4,
  },
  botTimestamp: {
    color: Theme.colors.textPlaceholder,
  },
  userTimestamp: {
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'right',
  },
  typingIndicator: {
    flexDirection: 'row',
    gap: 4,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Theme.colors.textPlaceholder,
  },
  quickRepliesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.sm,
    marginLeft: 44,
    marginBottom: Theme.spacing.md,
  },
  quickReplyButton: {
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.md,
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.borderRadius.full,
    borderWidth: 1,
    borderColor: Theme.colors.primary,
  },
  quickReplyText: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.primary,
    fontWeight: Theme.fontWeight.medium,
  },
  inputContainer: {
    backgroundColor: Theme.colors.white,
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.border,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: Theme.colors.backgroundSecondary,
    borderRadius: Theme.borderRadius.lg,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: Theme.fontSize.md,
    color: Theme.colors.textPrimary,
    maxHeight: 100,
    paddingVertical: Theme.spacing.sm,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Theme.spacing.sm,
  },
  sendButtonDisabled: {
    backgroundColor: Theme.colors.border,
  },
  sendIcon: {
    width: 20,
    height: 20,
    tintColor: Theme.colors.white,
  },
});