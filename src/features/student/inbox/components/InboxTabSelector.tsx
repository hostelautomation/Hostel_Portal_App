import React from "react";
import { View, Text, Pressable } from "react-native";
import * as Haptics from "expo-haptics";
import { useAppTheme } from "../../../../context/ThemeContext";

export type InboxTabType = "All" | "Requests";

interface InboxTabSelectorProps {
  activeTab: InboxTabType;
  onTabChange: (tab: InboxTabType) => void;
}

export default function InboxTabSelector({ activeTab, onTabChange }: InboxTabSelectorProps) {
  const { theme, isDark } = useAppTheme();

  const handleTabPress = async (tab: InboxTabType) => {
    if (activeTab === tab) return;
    await Haptics.selectionAsync();
    onTabChange(tab);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "#F1F5F9",
        borderRadius: 14,
        padding: 4,
        marginBottom: 20,
      }}
    >
      <Pressable
        onPress={() => handleTabPress("All")}
        style={{
          flex: 1,
          paddingVertical: 10,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
          backgroundColor: activeTab === "All" ? theme.card : "transparent",
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: activeTab === "All" ? "700" : "500",
            color: activeTab === "All" ? theme.textPrimary : theme.textSecondary,
          }}
        >
          All
        </Text>
      </Pressable>

      <Pressable
        onPress={() => handleTabPress("Requests")}
        style={{
          flex: 1,
          paddingVertical: 10,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
          backgroundColor: activeTab === "Requests" ? theme.card : "transparent",
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: activeTab === "Requests" ? "700" : "500",
            color: activeTab === "Requests" ? theme.textPrimary : theme.textSecondary,
          }}
        >
          Requests
        </Text>
      </Pressable>
    </View>
  );
}