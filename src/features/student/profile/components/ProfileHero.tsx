import React from "react";
import { View, Text } from "react-native";
import { useAppTheme } from "../../../../context/ThemeContext";

interface ProfileHeroProps {
  name: string;
  rollNumber: string;
}

export default function ProfileHero({ name, rollNumber }: ProfileHeroProps) {
  const { theme } = useAppTheme();

  return (
    <View style={{ alignItems: "center", marginTop: 20 }}>
      {/* AVATAR PLACEHOLDER SQUIRCLE */}
      <View
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          backgroundColor: theme.isDark ? "rgba(255, 255, 255, 0.15)" : "#E2E8F0",
          marginBottom: 16,
        }}
      />

      {/* 🌟 FIX: Name text scales dynamically with active theme canvas */}
      <Text
        style={{
          fontSize: 22,
          fontWeight: "700",
          color: theme.textPrimary,
          textAlign: "center",
        }}
      >
        {name}
      </Text>

      {/* 🌟 FIX: Roll number scales dynamically with theme */}
      <Text
        style={{
          fontSize: 14,
          fontWeight: "500",
          color: theme.textSecondary,
          marginTop: 4,
        }}
      >
        {rollNumber}
      </Text>
    </View>
  );
}