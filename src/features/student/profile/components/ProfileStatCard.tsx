import React from "react";
import { View, Text } from "react-native";
import { useAppTheme } from "../../../../context/ThemeContext";

interface ProfileStatCardProps {
  title: string;
  value: string;
  subtitle: string;
}

export default function ProfileStatCard({ title, value, subtitle }: ProfileStatCardProps) {
  const { theme } = useAppTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.card,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: theme.border,
        padding: 14,
      }}
    >
      <Text
        style={{
          fontSize: 11,
          fontWeight: "700",
          color: theme.textSecondary,
          letterSpacing: 0.5,
        }}
      >
        {title}
      </Text>

      <Text
        style={{
          fontSize: 18,
          fontWeight: "700",
          color: theme.textPrimary,
          marginTop: 6,
        }}
      >
        {value}
      </Text>

      <Text
        style={{
          fontSize: 12,
          color: theme.textMuted,
          marginTop: 2,
        }}
      >
        {subtitle}
      </Text>
    </View>
  );
}