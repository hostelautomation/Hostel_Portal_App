import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  Pressable,
  Image,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";

import Logo from "@/assets/images/iiitdm.png";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      const url = `${API_URL}/auth/google/mobile`;

      const result =
        await WebBrowser.openAuthSessionAsync(
          url,
          "iiitdmhmp://auth-callback"
        );

      console.log(
        "AUTH RESULT:",
        JSON.stringify(result, null, 2)
      );

      if (
        result.type === "success" &&
        result.url
      ) {
        await Linking.openURL(result.url);
      }
    } catch (error) {
      console.error(
        "GOOGLE LOGIN ERROR:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#ffffff",
      }}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: 28,
          justifyContent: "space-between",
        }}
      >
        <View />

        <View
          style={{
            alignItems: "center",
          }}
        >
          <Image
            source={Logo}
            style={{
              width: 110,
              height: 110,
              marginBottom: 24,
            }}
            resizeMode="contain"
          />

          <Text
            style={{
              fontSize: 26,
              fontWeight: "700",
              color: "#111827",
            }}
          >
            IIITDM Kancheepuram
          </Text>

          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#374151",
              marginTop: 8,
            }}
          >
            Hostel Management Portal
          </Text>
        </View>

        <View
          style={{
            marginBottom: 40,
          }}
        >
          <Pressable
            onPress={handleGoogleLogin}
            disabled={loading}
            style={{
              height: 56,
              borderRadius: 14,
              backgroundColor: "#111827",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text
                style={{
                  color: "#ffffff",
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                Continue with Google
              </Text>
            )}
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}