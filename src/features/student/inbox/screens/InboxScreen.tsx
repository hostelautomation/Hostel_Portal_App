import React, { useState } from "react";
import { ScrollView, View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { SlidersHorizontal } from "lucide-react-native";

import { useAppTheme } from "../../../../context/ThemeContext";
import HomeHeader from "../../home/components/HomeHeader";
import InboxTabSelector, { InboxTabType } from "../components/InboxTabSelector";
import InboxCard, { InboxItem } from "../components/InboxCard";

const mockNotifications: InboxItem[] = [
  {
    id: "1",
    type: "success",
    title: "Outpass Approved",
    description: "Your local outing pass for Phoenix Marketcity has been approved.",
    timestamp: "15M AGO",
    isPinned: true,
  },
  {
    id: "2",
    type: "info",
    title: "Maintenance Completed",
    description: "The plumbing issue in Room 402 has been resolved.",
    timestamp: "1H AGO",
  },
  {
    id: "3",
    type: "warning",
    title: "Mess Feedback Survey",
    description: "Please take 2 minutes to provide feedback on the special dinner.",
    timestamp: "3H AGO",
  },
  {
    id: "4",
    type: "danger",
    title: "Water Supply Notice",
    description: "Main tank maintenance tomorrow 9 AM - 12 PM. Store water.",
    timestamp: "5H AGO",
    isPinned: true,
  },
];

export default function InboxScreen() {
  const { theme } = useAppTheme();
  const [activeTab, setActiveTab] = useState<InboxTabType>("All");

  // Stub filter condition for sorting out request-related updates later
  const filteredNotifications = mockNotifications.filter((item) => {
    if (activeTab === "Requests") {
      return item.type === "success" || item.type === "danger"; 
    }
    return true;
  });

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 140 }}>
        
        <HomeHeader />

        <View style={{ paddingHorizontal: 20, marginTop: 8 }}>
          
          {/* HEADER LAYER */}
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <Text style={{ fontSize: 32, fontWeight: "800", color: theme.textPrimary }}>
              Inbox
            </Text>
            
            <Pressable
              onPress={async () => {
                await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
              style={({ pressed }) => ({
                width: 44,
                height: 44,
                borderRadius: 22,
                borderWidth: 1,
                borderColor: theme.border,
                backgroundColor: theme.card,
                alignItems: "center",
                justifyContent: "center",
                opacity: pressed ? 0.8 : 1,
              })}
            >
              <SlidersHorizontal size={20} color={theme.textPrimary} />
            </Pressable>
          </View>

          {/* MODULAR TAB SELECTOR */}
          <InboxTabSelector activeTab={activeTab} onTabChange={setActiveTab} />

          {/* RENDERED CARDS FEED */}
          <View style={{ gap: 14 }}>
            {filteredNotifications.map((item) => (
              <InboxCard key={item.id} item={item} />
            ))}
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}