import React from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import { ChatMessage as ChatMessageType } from "../types";

interface Props {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: Props) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <View style={styles.userRow}>
        <View style={styles.userBubble}>
          <Text style={styles.userText}>
            {message.content}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.assistantRow}>
      <Text style={styles.assistantText}>
        {message.content}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  userRow: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 18,
  },

  userBubble: {
    backgroundColor: "#252525",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
    maxWidth: "80%",
  },

  userText: {
    color: "#FFFFFF",
    fontSize: 14,
    lineHeight: 20,
  },

  assistantRow: {
    width: "100%",
    alignItems: "flex-start",
    marginBottom: 22,
  },

  assistantText: {
    color: "#F2F2F2",
    fontSize: 17,
    lineHeight: 24,
    maxWidth: "90%",
  },
});