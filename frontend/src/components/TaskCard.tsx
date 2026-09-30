import React from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import { OrganizerItem } from "../types";
import { COLORS } from "../constants/theme";

interface Props {
  item: OrganizerItem;
}

export default function TaskCard({ item }: Props) {
  const backgroundColor =
    item.type === "task"
      ? COLORS.task
      : COLORS.schedule;

  return (
    <View style={styles.row}>

      <View style={styles.timeContainer}>
        <Text style={styles.time}>
          {item.time}
        </Text>

        <Text style={styles.period}>
          {item.period}
        </Text>
      </View>

      <View
        style={[
          styles.card,
          { backgroundColor },
        ]}
      >
        <Text
          style={styles.cardText}
          numberOfLines={1}
        >
          {item.title}
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  timeContainer: {
    width: 46,
    alignItems: "center",
  },

  time: {
    color: COLORS.textPrimary,
    fontSize: 11,
    fontWeight: "700",
    lineHeight: 12,
  },

  period: {
    color: COLORS.textPrimary,
    fontSize: 9,
    fontWeight: "600",
    lineHeight: 10,
  },

  card: {
    flex: 1,
    height: 28,
    borderRadius: 5,

    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: 10,
  },

  cardText: {
    color: COLORS.white,
    fontSize: 10,
  },
});