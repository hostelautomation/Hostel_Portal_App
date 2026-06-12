import React from "react";
import { Pressable, View, Text } from "react-native";
import { ChevronRight } from "lucide-react-native";
import { useAppTheme } from "../../../../context/ThemeContext";

interface ProfileMenuItemProps {
  icon: React.ReactNode;
  title: string;
  onPress?: () => void;
  hideBorder?: boolean;
}

export default function ProfileMenuItem({ icon, title, onPress, hideBorder = false }: ProfileMenuItemProps) {
  const { theme } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        borderBottomWidth: hideBorder ? 0 : 1,
        borderBottomColor: theme.border,
        backgroundColor: pressed ? (theme.isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)") : "transparent",
      })}
    >
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          backgroundColor: theme.isDark ? "rgba(255, 255, 255, 0.06)" : "#F1F5F9",
          alignItems: "center",
          justifyContent: "center",
          marginRight: 14,
        }}
      >
        {icon}
      </View>

      <Text style={{ flex: 1, fontSize: 15, fontWeight: "600", color: theme.textPrimary }}>
        {title}
      </Text>

      <ChevronRight size={18} color={theme.textMuted} />
    </Pressable>
  );
}