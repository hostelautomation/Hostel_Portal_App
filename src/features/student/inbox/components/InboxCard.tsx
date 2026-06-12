import React from "react";
import { View, Text, Platform } from "react-native";
import { CheckCircle2, Bell, Clock, AlertTriangle, Pin } from "lucide-react-native";
import { useAppTheme } from "../../../../context/ThemeContext";

export interface InboxItem {
  id: string;
  type: "success" | "info" | "warning" | "danger";
  title: string;
  description: string;
  timestamp: string;
  isPinned?: boolean;
}

interface InboxCardProps {
  item: InboxItem;
}

export default function InboxCard({ item }: InboxCardProps) {
  const { theme, isDark } = useAppTheme();

  const getNotificationConfig = (type: InboxItem["type"]) => {
    switch (type) {
      case "success":
        return {
          icon: <CheckCircle2 size={20} color="#16A34A" />,
          accentColor: "#16A34A",
          iconBg: isDark ? "rgba(22, 163, 74, 0.15)" : "#F0FDF4",
        };
      case "info":
        return {
          icon: <Bell size={20} color="#2563EB" />,
          accentColor: "#2563EB",
          iconBg: isDark ? "rgba(37, 99, 235, 0.15)" : "#EFF6FF",
        };
      case "warning":
        return {
          icon: <Clock size={20} color="#D97706" />,
          accentColor: "#D97706",
          iconBg: isDark ? "rgba(217, 119, 6, 0.15)" : "#FEF3C7",
        };
      case "danger":
        return {
          icon: <AlertTriangle size={20} color="#DC2626" />,
          accentColor: "#DC2626",
          iconBg: isDark ? "rgba(220, 38, 38, 0.15)" : "#FEF2F2",
        };
    }
  };

  const config = getNotificationConfig(item.type);

  return (
    <View
      style={{
        backgroundColor: theme.card,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: theme.border,
        flexDirection: "row",
        overflow: "hidden",
        position: "relative",
        ...Platform.select({
          ios: {
            shadowColor: "#000000",
            shadowOpacity: isDark ? 0.15 : 0.02,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 3 },
          },
          android: { elevation: 1 },
        }),
      }}
    >
      {/* LEFT ACCENT STRIP */}
      <View style={{ width: 5, backgroundColor: config?.accentColor }} />

      <View style={{ flex: 1, flexDirection: "row", padding: 16, alignItems: "flex-start" }}>
        {/* ICON CONTAINER */}
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: config?.iconBg,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 14,
          }}
        >
          {config?.icon}
        </View>

        {/* TEXT CONTENT CONTAINER */}
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Text numberOfLines={1} style={{ fontSize: 16, fontWeight: "700", color: theme.textPrimary, flex: 1, paddingRight: 8 }}>
              {item.title}
            </Text>
            <Text style={{ fontSize: 11, fontWeight: "600", color: theme.textMuted }}>
              {item.timestamp}
            </Text>
          </View>

          <Text style={{ fontSize: 13, color: theme.textSecondary, marginTop: 4, lineHeight: 19 }}>
            {item.description}
          </Text>

          {/* PINNED LABEL CHIP */}
          {item.isPinned && (
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10, gap: 4 }}>
              <Pin size={12} color={theme.textMuted} style={{ transform: [{ rotate: "45deg" }] }} />
              <Text style={{ fontSize: 10, fontWeight: "700", color: theme.textMuted, letterSpacing: 0.3, textTransform: "uppercase" }}>
                Pinned
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}