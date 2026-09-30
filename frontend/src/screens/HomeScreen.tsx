import React, {
  useRef,
  useState,
} from "react";

import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../navigation/AppNavigator";

import AssistantAvatar from "../components/AssistantAvatar";
import Organizer from "../components/Organizer";
import AskInput from "../components/AskInput";
import ChatMessage from "../components/ChatMessage";

import { COLORS } from "../constants/theme";

import {
  ChatMessage as ChatMessageType,
} from "../types";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "Home"
>;

export default function HomeScreen({
  navigation,
}: Props) {
  const [organizerOpen, setOrganizerOpen] =
    useState(false);

  const [messages, setMessages] = useState<
    ChatMessageType[]
  >([]);

  const [isThinking, setIsThinking] =
    useState(false);

  const scrollViewRef =
    useRef<ScrollView>(null);

    async function handleSend(message: string) {
  const userMessage: ChatMessageType = {
    id: Date.now().toString(),
    role: "user",
    content: message,
  };

  setMessages((current) => [
    ...current,
    userMessage,
  ]);

  setIsThinking(true);

  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/api/chat`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          message: message,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Server returned ${response.status}`
      );
    }

    const data = await response.json();

    const assistantMessage: ChatMessageType = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: data.response,
    };

    setMessages((current) => [
      ...current,
      assistantMessage,
    ]);
  } catch (error) {
    console.error("Chat error:", error);

    const errorMessage: ChatMessageType = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content:
        "Sorry, I couldn't connect to the assistant.",
    };

    setMessages((current) => [
      ...current,
      errorMessage,
    ]);
  } finally {
    setIsThinking(false);
  }
}

  function openProfile() {
    navigation.navigate("Profile");
  }

  function openContact() {
    navigation.navigate("Contact");
  }

  const hasConversation =
    messages.length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.background}
      />

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
        }
      >
        {/* Header */}

        <View style={styles.top}>
          <AssistantAvatar
            onPress={openProfile}
          />

          <View style={styles.avatarSpacing} />

          <Organizer
            onOpenChange={setOrganizerOpen}
          />
        </View>

        {/* Main area */}

        {organizerOpen ? (
          <View style={styles.emptySpace} />
        ) : hasConversation ? (
          <ScrollView
            ref={scrollViewRef}
            style={styles.chat}
            contentContainerStyle={
              styles.chatContent
            }
            keyboardShouldPersistTaps="handled"
            onContentSizeChange={() =>
              scrollViewRef.current?.scrollToEnd({
                animated: true,
              })
            }
          >
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
              />
            ))}

            {isThinking && (
              <Text style={styles.thinking}>
                Thinking...
              </Text>
            )}
          </ScrollView>
        ) : (
          <View style={styles.welcome}>
            <Text style={styles.mainText}>
              This is where the{"\n"}
              model talks with{"\n"}
              us
            </Text>

            <Text style={styles.subtitle}>
              Let us begin the journey
            </Text>
          </View>
        )}

        {/* Bottom */}

        <View style={styles.bottom}>
          <AskInput onSend={handleSend} />

          <TouchableOpacity
            onPress={openContact}
            activeOpacity={0.7}
          >
            <Text style={styles.contact}>
              Contact us
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 22,
  },

  keyboardView: {
    flex: 1,
  },

  top: {
    paddingTop: 22,
  },

  avatarSpacing: {
    height: 18,
  },

  welcome: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 8,
    paddingBottom: 60,
  },

  mainText: {
    color: COLORS.textPrimary,
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 34,
  },

  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginTop: 10,
  },

  chat: {
    flex: 1,
  },

  chatContent: {
    paddingTop: 30,
    paddingBottom: 20,
  },

  thinking: {
    color: COLORS.textSecondary,
    fontSize: 13,
    marginBottom: 20,
  },

  emptySpace: {
    flex: 1,
  },

  bottom: {
    paddingBottom: 12,
  },

  contact: {
    color: COLORS.textMuted,
    fontSize: 9,
    textAlign: "center",
    marginTop: 18,
  },
});