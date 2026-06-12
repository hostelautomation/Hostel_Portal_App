import React from "react";
import {
  View,
  Text,
} from "react-native";

interface DetailSectionProps {
  title: string;
  children: React.ReactNode;
}

export default function DetailSection({
  title,
  children,
}: DetailSectionProps) {
  return (
    <View
      style={{
        marginTop: 20,
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        overflow: "hidden",
      }}
    >
      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 14,
          backgroundColor: "#F8FAFC",
          borderBottomWidth: 1,
          borderBottomColor: "#E2E8F0",
        }}
      >
        <Text
          style={{
            fontSize: 13,
            fontWeight: "700",
            color: "#64748B",
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          {title}
        </Text>
      </View>

      {children}
    </View>
  );
}