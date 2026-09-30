import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

interface Props {
  onPress?: () => void;
}

export default function AssistantAvatar({ onPress }: Props) {
  return (
    <TouchableOpacity
      style={styles.avatar}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.emoji}>🐻</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E66C13",

    justifyContent: "center",
    alignItems: "center",
  },

  emoji: {
    fontSize: 30,
  },
});