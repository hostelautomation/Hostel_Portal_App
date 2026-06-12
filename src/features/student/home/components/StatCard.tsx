import React from "react";
import { View, Text, Pressable } from "react-native";
import { useAppTheme } from "../../../../context/ThemeContext";

interface StatCardProps {
  icon: React.ReactNode;
  value: string | number;
  title: string;
  status: string;
  statusColor?: string;
  iconBackgroundColor?: string;
  onPress?: () => void;
}

export default function StatCard({
  icon,
  value,
  title,
  status,
  statusColor = "#16A34A",
  iconBackgroundColor = "#EEF2FF",
  onPress,
}: StatCardProps) {
  const { theme } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        flex: 1,
        minHeight: 130,
        backgroundColor: theme.card,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: theme.border,
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
          width: 42,
          height: 42,
          borderRadius: 14,
          backgroundColor: theme.isDark ? "rgba(255, 255, 255, 0.08)" : iconBackgroundColor,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        {icon}
      </View>

      <Text
        style={{
          fontSize: 28,
          fontWeight: "700",
          color: theme.textPrimary,
        }}
      >
        {value}
      </Text>

      <Text
        style={{
          marginTop: 2,
          fontSize: 13,
          fontWeight: "600",
          color: theme.textSecondary,
        }}
      >
        {title}
      </Text>

      <Text
        numberOfLines={1}
        style={{
          marginTop: 6,
          fontSize: 12,
          fontWeight: "600",
          color: statusColor,
        }}
      >
        {status}
      </Text>
    </Pressable>
  );
}