import React from "react";
import { View, Text, Image } from "react-native";
import { useAppTheme } from "../../../../context/ThemeContext";

interface StudentIdentityCardProps {
  name: string;
  rollNumber: string;
  roomNumber: string;
  blockName: string;
  profilePicture?: string;
  status?: string;
  instituteEmail: string;
  catererName: string;
}

export default function StudentIdentityCard({
  name,
  rollNumber,
  roomNumber,
  blockName,
  profilePicture,
  status = "Active Resident",
  instituteEmail,
  catererName = "Not Assigned",
}: StudentIdentityCardProps) {
  const { theme } = useAppTheme();

  return (
    <View
      style={{
        backgroundColor: theme.isDark ? theme.card : "#2563EB",
        borderRadius: 20,
        padding: 16,
        borderWidth: theme.isDark ? 1 : 0,
        borderColor: theme.border,
        shadowColor: "#2563EB",
        shadowOpacity: theme.isDark ? 0 : 0.15,
        shadowRadius: 12,
        shadowOffset: {
          width: 0,
          height: 6,
        },
        elevation: theme.isDark ? 0 : 4,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 56,
            height: 56,
            borderRadius: 28,
            overflow: "hidden",
            backgroundColor: theme.isDark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.25)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {profilePicture ? (
            <Image
              source={{ uri: profilePicture }}
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <Text
              style={{
                color: theme.isDark ? theme.textPrimary : "#FFFFFF",
                fontSize: 22,
                fontWeight: "700",
              }}
            >
              {name.charAt(0)}
            </Text>
          )}
        </View>

        <View
          style={{
            marginLeft: 12,
            flex: 1,
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: theme.isDark ? theme.textPrimary : "#FFFFFF",
            }}
          >
            {name}
          </Text>

          <Text
            style={{
              marginTop: 2,
              fontSize: 14,
              fontWeight: "600",
              color: theme.isDark ? theme.textSecondary : "#FFFFFF",
            }}
          >
            {rollNumber}
          </Text>

          <Text
            numberOfLines={1}
            style={{
              marginTop: 1,
              fontSize: 12,
              color: theme.isDark ? theme.textMuted : "rgba(255,255,255,0.8)",
            }}
          >
            {instituteEmail ? instituteEmail.toLowerCase() : ""}
          </Text>
        </View>
      </View>

      <View
        style={{
          marginTop: 16,
          paddingTop: 14,
          borderTopWidth: 1,
          borderTopColor: theme.isDark ? theme.border : "rgba(255,255,255,0.15)",
        }}
      >
        <Text
          style={{
            color: theme.isDark ? theme.textMuted : "rgba(255,255,255,0.75)",
            fontSize: 11,
            fontWeight: "600",
          }}
        >
          CAMPUS ALLOTMENTS
        </Text>

        <Text
          style={{
            marginTop: 4,
            fontSize: 15,
            fontWeight: "600",
            color: theme.isDark ? theme.textPrimary : "#FFFFFF",
          }}
        >
          Room {roomNumber} • {blockName}
        </Text>

        <Text
          style={{
            marginTop: 2,
            fontSize: 13,
            fontWeight: "500",
            color: theme.isDark ? theme.textSecondary : "rgba(255,255,255,0.9)",
          }}
        >
          Mess Caterer: {catererName}
        </Text>

        <View
          style={{
            marginTop: 10,
            alignSelf: "flex-start",
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 999,
            backgroundColor: theme.isDark ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.16)",
          }}
        >
          <Text
            style={{
              color: theme.isDark ? "#4ADE80" : "#FFFFFF",
              fontWeight: "600",
              fontSize: 11,
            }}
          >
            {status}
          </Text>
        </View>
      </View>
    </View>
  );
}