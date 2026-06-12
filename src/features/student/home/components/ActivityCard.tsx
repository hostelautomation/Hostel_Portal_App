import React from "react";
import { View, Text, Pressable } from "react-native";
import { useAppTheme } from "../../../../context/ThemeContext";

interface ActivityCardProps {
  title: string;
  description: string;
  timestamp: string;
  icon: React.ReactNode;
  iconBackgroundColor?: string;
  badgeText?: string;
  badgeBackgroundColor?: string;
  badgeTextColor?: string;
  categoryText?: string;
  onPress?: () => void;
}

export default function ActivityCard({
  title,
  description,
  timestamp,
  icon,
  iconBackgroundColor = "#EEF2FF",
  badgeText,
  badgeBackgroundColor = "#2563EB",
  badgeTextColor = "#FFFFFF",
  categoryText,
  onPress,
}: ActivityCardProps) {
  const { theme } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        flexDirection: "row",
        alignItems: "flex-start",
        backgroundColor: theme.card,
        borderRadius: 16,
        padding: 14,
        borderWidth: 1,
        borderColor: theme.border,
        opacity: pressed ? 0.95 : 1,
        shadowColor: theme.isDark ? "#000000" : "#000000",
        shadowOpacity: theme.isDark ? 0.15 : 0.02,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 1,
      })}
    >
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.isDark ? "rgba(255, 255, 255, 0.08)" : iconBackgroundColor,
          marginRight: 12,
        }}
      >
        {icon}
      </View>

      <View style={{ flex: 1 }}>
        <Text
          numberOfLines={1}
          style={{
            fontSize: 15,
            fontWeight: "700",
            color: theme.textPrimary,
          }}
        >
          {title}
        </Text>

        <Text
          numberOfLines={2}
          style={{
            marginTop: 3,
            fontSize: 12,
            lineHeight: 18,
            color: theme.textSecondary,
          }}
        >
          {description}
        </Text>

        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
          <Text
            style={{
              fontSize: 11,
              fontWeight: "700",
              color: theme.textSecondary,
              letterSpacing: 0.3,
            }}
          >
            {timestamp}
          </Text>

          {badgeText ? (
            <View
              style={{
                backgroundColor: badgeBackgroundColor,
                paddingHorizontal: 10,
                paddingVertical: 2,
                borderRadius: 20,
                marginLeft: 10,
              }}
            >
              <Text
                style={{
                  color: badgeTextColor,
                  fontSize: 10,
                  fontWeight: "800",
                }}
              >
                {badgeText}
              </Text>
            </View>
          ) : null}

          {categoryText ? (
            <Text
              style={{
                fontSize: 12,
                color: theme.textMuted,
                marginLeft: 8,
                fontWeight: "500",
              }}
            >
              {categoryText}
            </Text>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}