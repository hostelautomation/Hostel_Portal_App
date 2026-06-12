import React from "react";
import { ScrollView, View, Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import {
  Mail,
  Phone,
  Building2,
  CreditCard,
  History,
  Settings,
  CircleHelp,
  LogOut,
} from "lucide-react-native";

import { useAppTheme } from "../../../../context/ThemeContext";
import HomeHeader from "../../home/components/HomeHeader";
import ProfileHero from "../components/ProfileHero";
import ProfileStatCard from "../components/ProfileStatCard";
import ProfileSection from "../components/ProfileSection";
import ProfileInfoRow from "../components/ProfileInfoRow";
import ProfileMenuItem from "../components/ProfileMenuItem";


export default function ProfileScreen() {
  const { theme } = useAppTheme();

  return (
    <SafeAreaView
      edges={["top"]}
      style={{
        flex: 1,
        backgroundColor: theme.background,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 140,
        }}
      >
        <HomeHeader />

        <View
          style={{
            paddingHorizontal: 20,
          }}
        >
          <ProfileHero
            name="Praveen Kumar T M R"
            rollNumber="CS23I1024"
          />

          <View
            style={{
              flexDirection: "row",
              gap: 12,
              marginTop: 24,
            }}
          >
            <ProfileStatCard
              title="HOSTEL"
              value="Block A"
              subtitle="Room 201"
            />

            <ProfileStatCard
              title="MESS"
              value="Annapoorna"
              subtitle="Current Caterer"
            />
          </View>

          <ProfileSection title="Institutional Information" />

          <View
            style={{
              backgroundColor: theme.card,
              borderRadius: 18,
              overflow: "hidden",
              borderWidth: 1,
              borderColor: theme.border,
            }}
          >
            <ProfileInfoRow
              icon={<Mail size={20} color="#2563EB" />}
              label="Institute Email"
              value="cs23i1024@iiitdm.ac.in"
            />

            <ProfileInfoRow
              icon={<Phone size={20} color="#16A34A" />}
              label="Mobile Number"
              value="+91 9876543210"
            />

            <ProfileMenuItem
              icon={<Building2 size={20} color="#7C3AED" />}
              title="Additional Information"
              onPress={() =>
                router.push("/profile-stack/additional-details")
              }
              hideBorder
            />
          </View>

          <ProfileSection title="Settings & Support" />

          <View
            style={{
              backgroundColor: theme.card,
              borderRadius: 18,
              overflow: "hidden",
              borderWidth: 1,
              borderColor: theme.border,
            }}
          >
            <ProfileMenuItem
              icon={<CreditCard size={20} color="#2563EB" />}
              title="Digital ID Card"
            />

            <ProfileMenuItem
              icon={<History size={20} color="#F59E0B" />}
              title="Request History"
            />

            {/* App Settings Router Binding */}
            <ProfileMenuItem
              icon={<Settings size={20} color="#64748B" />}
              title="App Settings"
              onPress={() => router.push("/profile-stack/settings")}
            />

            <ProfileMenuItem
              icon={<CircleHelp size={20} color="#16A34A" />}
              title="Help & Support"
            />
          </View>

          <Pressable
            style={{
              marginTop: 28,
              height: 54,
              borderRadius: 18,
              backgroundColor: "#EF4444",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              gap: 10,
            }}
          >
            <LogOut size={20} color="#FFFFFF" />
            <Text
              style={{
                color: "#FFFFFF",
                fontWeight: "700",
                fontSize: 16,
              }}
            >
              Logout
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}