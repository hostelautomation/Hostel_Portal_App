import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

const ADMIN_ROLES = [
  "superadmin",
  "caretaker",
  "warden",
  "assistantwarden",
  "chiefwarden",
  "deansa",
  "director",
  "hosteloffice",
  "pic-mess",
  "pic-adc",
  "mess-chairman",
  "estate",
  "caterer",
];

export default function Index() {
  const {
    hydrate,
    isLoading,
    isAuthenticated,
    role,
  } = useAuthStore();

  useEffect(() => {
    hydrate();
  }, []);

  console.log("AUTH:", {
  isAuthenticated,
  role,
  });

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  if (role === "student") {
    return <Redirect href="/(student)/home" />;
  }

  if (role && ADMIN_ROLES.includes(role)) {
    return <Redirect href="/(admin)/home" />;
  }

  return <Redirect href="/(auth)/login" />;
}