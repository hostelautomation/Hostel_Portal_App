import React from "react";
import { View, Text } from "react-native";
import { useAppTheme } from "../../../../context/ThemeContext";

interface Props {
  title: string;
  subtitle?: string;
}

export default function SectionHeader({
  title,
  subtitle,
}: Props) {
  const { theme } = useAppTheme();

  return (
    <View
      style={{
        marginBottom: 12,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "700",
          color: theme.textPrimary,
        }}
      >
        {title}
      </Text>

      {subtitle && (
        <Text
          style={{
            marginTop: 2,
            fontSize: 13,
            color: theme.textSecondary,
          }}
        >
          {subtitle}
        </Text>
      )}
    </View>
  );
}