import React, { useState } from "react";
import { ScrollView, View, Text, Switch, Pressable, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import { ArrowLeft, Palette, Bell, Info } from "lucide-react-native";
import { useAppTheme } from "../../../context/ThemeContext";

export default function SettingsScreen() {
  const { theme, isDark, toggleTheme } = useAppTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 140 }}>
        
        {/* NATIVE NAVIGATION HEADER */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 20,
            paddingVertical: 16,
          }}
        >
          <Pressable
            onPress={async () => {
              await Haptics.selectionAsync();
              router.replace("/(student)/profile");
            }}
            style={({ pressed }) => ({
              marginRight: 12,
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <ArrowLeft size={24} color={theme.textPrimary} />
          </Pressable>

          <Text style={{ fontSize: 28, fontWeight: "800", color: theme.textPrimary }}>
            Settings
          </Text>
        </View>

        <View style={{ paddingHorizontal: 20, gap: 24 }}>
          
          {/* APPEARANCE SECTION */}
          <View>
            <Text style={{ fontSize: 13, fontWeight: "700", color: theme.textSecondary, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>
              Appearance
            </Text>
            <View style={{ backgroundColor: theme.card, borderRadius: 18, borderWidth: 1, borderColor: theme.border, overflow: "hidden" }}>
              <Pressable
                onPress={async () => {
                  await Haptics.selectionAsync();
                  toggleTheme();
                }}
                style={({ pressed }) => ({
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: 16,
                  backgroundColor: pressed ? (isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)") : "transparent",
                })}
              >
                <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                  <Palette size={20} color={theme.primary} />
                  <Text style={{ fontSize: 16, fontWeight: "600", color: theme.textPrimary }}>
                    Theme
                  </Text>
                </View>
                <Text style={{ fontSize: 15, fontWeight: "500", color: theme.textSecondary }}>
                  {isDark ? "Dark" : "Light"}
                </Text>
              </Pressable>
            </View>
          </View>

          {/* NOTIFICATIONS SECTION */}
          <View>
            <Text style={{ fontSize: 13, fontWeight: "700", color: theme.textSecondary, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>
              Notifications
            </Text>
            <View style={{ backgroundColor: theme.card, borderRadius: 18, borderWidth: 1, borderColor: theme.border, overflow: "hidden" }}>
              <View style={{ flexDirection: "row", alignItems: "center", padding: 16, justifyContent: "space-between" }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 12, flex: 1 }}>
                  <Bell size={20} color="#16A34A" />
                  <View style={{ flex: 1, paddingRight: 8 }}>
                    <Text style={{ fontSize: 16, fontWeight: "600", color: theme.textPrimary }}>
                      Enable Notifications
                    </Text>
                    <Text style={{ fontSize: 12, color: theme.textSecondary, marginTop: 2 }}>
                      Announcements, inbox and service updates
                    </Text>
                  </View>
                </View>
                <Switch
                  value={notificationsEnabled}
                  onValueChange={async (value) => {
                    await Haptics.selectionAsync();
                    setNotificationsEnabled(value);
                  }}
                  trackColor={{ false: isDark ? "#374151" : "#E2E8F0", true: "#22C55E" }}
                  thumbColor={Platform.OS === "android" ? "#FFFFFF" : undefined}
                />
              </View>
            </View>
          </View>

          {/* ABOUT SECTION */}
          <View>
            <Text style={{ fontSize: 13, fontWeight: "700", color: theme.textSecondary, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>
              About
            </Text>
            <View style={{ backgroundColor: theme.card, borderRadius: 18, borderWidth: 1, borderColor: theme.border, overflow: "hidden" }}>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 16 }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                  <Info size={20} color="#7C3AED" />
                  <Text style={{ fontSize: 16, fontWeight: "600", color: theme.textPrimary }}>
                    Version
                  </Text>
                </View>
                <Text style={{ fontSize: 14, fontWeight: "600", color: theme.textSecondary }}>
                  1.0.0 (Build 1)
                </Text>
              </View>
            </View>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}