import React from "react";
import { Pressable, Text, View } from "react-native";
import { useAppTheme } from "../../../../context/ThemeContext";

interface QuickActionCardProps {
  icon: React.ReactNode;
  title: string;
  iconBackgroundColor?: string;
  onPress?: () => void;
}

export default function QuickActionCard({
  icon,
  title,
  iconBackgroundColor = "#EEF2FF",
  onPress,
}: QuickActionCardProps) {
  const { theme } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        flex: 1,
        minHeight: 120,
        backgroundColor: theme.card,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: theme.border,
        justifyContent: "center",
        alignItems: "center",
        padding: 14,
        transform: [
          {
            scale: pressed ? 0.98 : 1,
          },
        ],
        shadowColor: theme.isDark ? "#000000" : "#000000",
        shadowOpacity: theme.isDark ? 0.15 : 0.03,
        shadowRadius: 6,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        elevation: 1,
      })}
    >
      <View
        style={{
          width: 50,
          height: 50,
          borderRadius: 16,
          backgroundColor: theme.isDark ? "rgba(255, 255, 255, 0.08)" : iconBackgroundColor,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        {icon}
      </View>

      <Text
        numberOfLines={2}
        style={{
          textAlign: "center",
          fontSize: 14,
          fontWeight: "600",
          color: theme.textPrimary,
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
}