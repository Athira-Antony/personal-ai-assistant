import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { COLORS } from "../constants/theme";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "Profile"
>;

export default function ProfileScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>

      {/* Back button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
      >
        <Text style={styles.back}>
          ‹ Home
        </Text>
      </TouchableOpacity>

      {/* Avatar */}
      <View style={styles.avatar}>
        <Text style={styles.emoji}>🐻</Text>
      </View>

      <Text style={styles.label}>
        Profile
      </Text>

      <Text style={styles.name}>
        John Augusty
      </Text>

      <Text style={styles.age}>
        21 years
      </Text>

      <Text style={styles.section}>
        Skills
      </Text>

      <View style={styles.skills}>
        {["</>", "♙", "◎", "÷", "♫", "✎", "🏃"].map(
          (skill, index) => (
            <View
              key={index}
              style={styles.skill}
            >
              <Text style={styles.skillText}>
                {skill}
              </Text>
            </View>
          )
        )}
      </View>

      <Text style={styles.section}>
        What I know
      </Text>

      <View style={styles.spacer} />

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Contact us
        </Text>

        <Text style={styles.footerText}>
          Terms and Conditions
        </Text>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 30,
    paddingTop: 20,
  },

  back: {
    color: "#4285F4",
    fontSize: 12,
    paddingVertical: 10,
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#E66C13",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  emoji: {
    fontSize: 45,
  },

  label: {
    color: COLORS.textMuted,
    fontSize: 10,
    fontWeight: "600",
    marginTop: 25,
  },

  name: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "500",
    marginTop: 10,
  },

  age: {
    color: COLORS.white,
    fontSize: 12,
    marginTop: 5,
  },

  section: {
    color: COLORS.textMuted,
    fontSize: 10,
    fontWeight: "600",
    marginTop: 35,
    marginBottom: 12,
  },

  skills: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 7,
  },

  skill: {
    width: 43,
    height: 43,
    backgroundColor: "#E8DF75",
    justifyContent: "center",
    alignItems: "center",
  },

  skillText: {
    color: "#000",
    fontSize: 17,
  },

  spacer: {
    flex: 1,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 15,
  },

  footerText: {
    color: COLORS.textMuted,
    fontSize: 9,
  },
});