import React from "react";
import { View, Text, Pressable } from "react-native";
import { Shield, RefreshCw } from "lucide-react-native";
import { useAppTheme } from "../../../../context/ThemeContext";

interface HomeHeaderProps {
  syncing?: boolean;
  onRefresh?: () => void;
}

export default function HomeHeader({
  syncing = false,
  onRefresh,
}: HomeHeaderProps) {
  const { theme } = useAppTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: theme.background,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <View
          style={{
            width: 38,
            height: 38,
            borderRadius: 12,
            backgroundColor: theme.isDark ? "#3B82F6" : "#1E3A8A",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Shield
            size={18}
            color="#FFFFFF"
          />
        </View>

        <Text
          style={{
            fontSize: 22,
            fontWeight: "700",
            color: theme.isDark ? "#FFFFFF" : "#1E3A8A",
          }}
        >
          HMP IIITDM
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 999,
            backgroundColor: theme.isDark ? "rgba(34, 197, 94, 0.15)" : "#DCFCE7",
            gap: 6,
          }}
        >
          <View
            style={{
              width: 7,
              height: 7,
              borderRadius: 999,
              backgroundColor: "#22C55E",
            }}
          />

          <Text
            style={{
              fontSize: 12,
              fontWeight: "600",
              color: theme.isDark ? "#4ADE80" : "#15803D",
            }}
          >
            {syncing ? "Syncing" : "Sync"}
          </Text>
        </View>

        <Pressable
          onPress={onRefresh}
          style={({ pressed }) => ({
            width: 34,
            height: 34,
            borderRadius: 999,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.isDark ? "rgba(255, 255, 255, 0.05)" : "transparent",
            opacity: pressed ? 0.7 : 1,
          })}
        >
          <RefreshCw
            size={18}
            color={theme.textSecondary}
          />
        </Pressable>
      </View>
    </View>
  );
}