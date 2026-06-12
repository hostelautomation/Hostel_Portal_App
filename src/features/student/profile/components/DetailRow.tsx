import React from "react";
import {
  View,
  Text,
} from "react-native";

interface DetailRowProps {
  label: string;
  value?: string | null;
  hideBorder?: boolean;
}

export default function DetailRow({
  label,
  value,
  hideBorder = false,
}: DetailRowProps) {
  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderBottomWidth: hideBorder
          ? 0
          : 1,
        borderBottomColor: "#E2E8F0",
      }}
    >
      <Text
        style={{
          fontSize: 12,
          color: "#64748B",
          marginBottom: 4,
        }}
      >
        {label}
      </Text>

      <Text
        style={{
          fontSize: 15,
          fontWeight: "600",
          color: "#0F172A",
        }}
      >
        {value?.trim()
          ? value
          : "Not Available"}
      </Text>
    </View>
  );
}