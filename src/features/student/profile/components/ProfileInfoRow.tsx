import React from "react";
import { View, Text } from "react-native";
import { useAppTheme } from "../../../../context/ThemeContext";

interface ProfileInfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  hideBorder?: boolean;
}

export default function ProfileInfoRow({ icon, label, value, hideBorder = false }: ProfileInfoRowProps) {
  const { theme } = useAppTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        borderBottomWidth: hideBorder ? 0 : 1,
        borderBottomColor: theme.border,
      }}
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

      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 12, color: theme.textSecondary, fontWeight: "500" }}>
          {label}
        </Text>
        <Text style={{ fontSize: 15, fontWeight: "600", color: theme.textPrimary, marginTop: 2 }}>
          {value}
        </Text>
      </View>
    </View>
  );
}