import { View, Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import { useAuthStore } from "@/store/authStore";

export default function HomeScreen() {
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();

    router.replace("/(auth)/login");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 16,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "700",
          }}
        >
          Student Home
        </Text>

        <Text>{user?.displayName}</Text>

        <Button
          title="Logout"
          onPress={handleLogout}
        />
      </View>
    </SafeAreaView>
  );
}