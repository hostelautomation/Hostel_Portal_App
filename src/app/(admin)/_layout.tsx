import { Tabs } from "expo-router";

import BottomTabBar from "@/shared/components/navigation/BottomTabBar";

export default function AdminLayout() {
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
        name="tasks"
        options={{
          title: "Tasks",
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