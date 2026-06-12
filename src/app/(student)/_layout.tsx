import { Tabs } from "expo-router";

import BottomTabBar from "@/shared/components/navigation/BottomTabBar";

export default function StudentLayout() {
  return (
    <Tabs
      tabBar={(props) => (
        <BottomTabBar {...props} />
      )}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
        }}
      />

      <Tabs.Screen
        name="passes"
        options={{
          title: "Passes",
        }}
      />

      <Tabs.Screen
        name="services"
        options={{
          title: "Services",
        }}
      />

      <Tabs.Screen
        name="inbox"
        options={{
          title: "Inbox",
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
        }}
      />
    </Tabs>
  );
}