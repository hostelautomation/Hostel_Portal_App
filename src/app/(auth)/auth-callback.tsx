import { useEffect } from "react";
import {
  ActivityIndicator,
  View,
} from "react-native";
import {
  router,
  useLocalSearchParams,
} from "expo-router";

import { api } from "@/api/axios";
import { saveSession } from "@/shared/storage/session";
import { saveTokens } from "@/shared/storage/tokens";
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

export default function AuthCallback() {
  console.log("AUTH CALLBACK SCREEN MOUNTED");
  const params = useLocalSearchParams();
  console.log(
            "AUTH CALLBACK PARAMS",
            params
          );  
    const { login } = useAuthStore();

  useEffect(() => {
    const completeAuth = async () => {
      try {
        console.log(
          "AUTH CALLBACK PARAMS",
          params
        );

        const status =
          params.status as string;

        const token =
          params.token as string;

        const refreshToken =
          params.refreshToken as string;

        if (
          status !== "success" ||
          !token ||
          !refreshToken
        ) {
          router.replace(
            "/(auth)/login"
          );
          return;
        }

        await saveTokens(
          token,
          refreshToken
        );

        console.log("TOKEN PARAM:", token);

        const response =
          await api.get(
            "/auth/current_user"
          );

        const user = response.data.user;

        console.log(
          "CURRENT USER",
          user
        );

        await saveSession({
          user,
          role: user.role,
        });

        login(user);

        if (user.role === "student") {
          router.replace(
            "/(student)/home"
          );
          return;
        }

        if (
          ADMIN_ROLES.includes(
            user.role
          )
        ) {
          router.replace(
            "/(admin)/home"
          );
          return;
        }

        router.replace(
          "/(auth)/login"
        );
      } catch (error) {
        console.error(
          "AUTH CALLBACK ERROR",
          error
        );

        router.replace(
          "/(auth)/login"
        );
      }
    };

    completeAuth();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator
        size="large"
      />
    </View>
  );
}