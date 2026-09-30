import React, { useState } from "react";


import {
  KeyboardAvoidingView,
  Platform,

  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "Contact"
>;

export default function ContactScreen({ navigation }: Props) {
  const [message, setMessage] = useState("");

  function sendMessage() {
    const cleanMessage = message.trim();

    if (!cleanMessage) return;

    console.log("Contact message:", cleanMessage);

    // Later we can actually store/send this message.
    setMessage("");
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.back}>‹</Text>
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <Text style={styles.title}>Developer Team</Text>
            <Text style={styles.subtitle}>
              Usually replies within a few hours
            </Text>
          </View>

          <View style={styles.headerSpace} />
        </View>

        {/* Chat */}
        <View style={styles.chatArea}>
          <View style={styles.developerMessage}>
            <Text style={styles.messageText}>
              Hey Morning, I am Grok, I am like a receptionist
              between you and the human developer.
            </Text>
          </View>
        </View>

        {/* Chat bar */}
        <View style={styles.inputArea}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={message}
              onChangeText={setMessage}
              placeholder="Message"
              placeholderTextColor="#8E8E93"
              returnKeyType="send"
              onSubmitEditing={sendMessage}
            />

            <TouchableOpacity
              style={styles.sendButton}
              onPress={sendMessage}
            >
              <Text style={styles.sendText}>↑</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  keyboardContainer: {
    flex: 1,
  },

  header: {
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    paddingHorizontal: 16,
  },

  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
  },

  back: {
    fontSize: 35,
    color: "#007AFF",
    lineHeight: 38,
  },

  headerCenter: {
    flex: 1,
    alignItems: "center",
  },

  headerSpace: {
    width: 40,
  },

  title: {
    color: "#000000",
    fontSize: 15,
    fontWeight: "600",
  },

  subtitle: {
    color: "#8E8E93",
    fontSize: 10,
    marginTop: 2,
  },

  chatArea: {
    flex: 1,
    padding: 16,
    justifyContent: "flex-start",
  },

  developerMessage: {
    backgroundColor: "#E5E5EA",
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 10,
    maxWidth: "75%",
    marginTop: 25,
  },

  messageText: {
    color: "#000000",
    fontSize: 13,
    lineHeight: 18,
  },

  inputArea: {
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
  },

  inputContainer: {
    height: 42,
    borderRadius: 21,
    backgroundColor: "#F2F2F7",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 6,
  },

  input: {
    flex: 1,
    color: "#000000",
    fontSize: 14,
  },

  sendButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
  },

  sendText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
});