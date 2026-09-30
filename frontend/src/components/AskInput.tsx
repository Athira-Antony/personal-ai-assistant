import React, { useState } from "react";

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS } from "../constants/theme";

interface Props {
  onSend?: (message: string) => void;
}

export default function AskInput({
  onSend,
}: Props) {
  const [message, setMessage] = useState("");

  function handleSend() {
    const cleanMessage = message.trim();

    if (!cleanMessage) {
      return;
    }

    if (onSend) {
      onSend(cleanMessage);
    }

    setMessage("");
  }

  return (
    <View style={styles.container}>

      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="Ask anything"
        placeholderTextColor="#B5B5B5"
        returnKeyType="send"
        onSubmitEditing={handleSend}
      />

      <TouchableOpacity
        style={styles.sendButton}
        onPress={handleSend}
        activeOpacity={0.8}
      >
        <Text style={styles.arrow}>
          ➜
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 46,

    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: 23,

    flexDirection: "row",
    alignItems: "center",

    paddingLeft: 15,
    paddingRight: 7,
  },

  input: {
    flex: 1,

    color: COLORS.white,
    fontSize: 12,

    height: "100%",
  },

  sendButton: {
    width: 26,
    height: 26,

    borderRadius: 13,

    backgroundColor: COLORS.white,

    alignItems: "center",
    justifyContent: "center",
  },

  arrow: {
    color: COLORS.black,
    fontSize: 14,
    fontWeight: "700",
  },
});