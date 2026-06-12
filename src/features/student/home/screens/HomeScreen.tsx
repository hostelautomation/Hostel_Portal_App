import React from "react";
import { ScrollView, View, Text, ActivityIndicator, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";
import {
  AlertTriangle,
  CalendarDays,
  CalendarCheck,
  Megaphone,
  MessageSquareWarning,
  RefreshCcw,
  Ticket,
  CircleAlert,
} from "lucide-react-native";

import { api } from "@/api/axios";
import { useAppTheme } from "../../../../context/ThemeContext";

import HomeHeader from "../components/HomeHeader";
import StudentIdentityCard from "../components/StudentIdentityCard";
import StatCard from "../components/StatCard";
import QuickActionCard from "../components/QuickActionCard";
import ActivityCard from "../components/ActivityCard";
import SectionHeader from "../components/SectionHeader";

interface Student {
  displayName: string;
  personalEmail: string;
  instituteEmail: string;
  rollNumber: string;
  role: string;
  room: string;
  building: string;
  caterer: string;
}

interface OverviewItem {
  value: number;
  status: string;
}

interface Overview {
  complaints: OverviewItem;
  passes: OverviewItem;
  leaves: OverviewItem;
  announcements: OverviewItem;
}

interface Activity {
  type: "complaint" | "leave" | "announcement";
  title: string;
  description: string;
  timestamp: string;
  category?: string;
}

interface DashboardResponse {
  student: Student;
  overview: Overview;
  activities: Activity[];
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

const fetchDashboardData = async (): Promise<DashboardResponse> => {
  const [userRes, overviewRes, activityRes] = await Promise.all([
    api.get<ApiResponse<Student>>("/api/mobile-dashboard/me"),
    api.get<ApiResponse<Overview>>("/api/mobile-dashboard/overview"),
    api.get<ApiResponse<Activity[]>>("/api/mobile-dashboard/activity"),
  ]);

  return {
    student: userRes.data.data,
    overview: overviewRes.data.data,
    activities: activityRes.data.data,
  };
};

const getRelativeTimeString = (isoString: string): string => {
  if (!isoString) return "";

  const now = new Date();
  const past = new Date(isoString);
  const elapsed = now.getTime() - past.getTime();

  const minute = 60_000;
  const hour = 3_600_000;
  const day = 86_400_000;

  if (elapsed < minute) return "JUST NOW";
  if (elapsed < hour) return `${Math.round(elapsed / minute)}M AGO`;
  if (elapsed < day) return `${Math.round(elapsed / hour)}H AGO`;
  if (elapsed < day * 2) return "1D AGO";
  return `${Math.round(elapsed / day)}D AGO`;
};

interface ActivityUIConfig {
  icon: React.ReactNode;
  bg: string;
  badgeLabel: string;
  badgeBg: string;
  badgeTextColor: string;
  categoryLabel: string;
}

const getActivityStyles = (type: Activity["type"], rawCategory?: string): ActivityUIConfig => {
  const defaultIcons = {
    complaint: { icon: <MessageSquareWarning size={20} color="#DC2626" />, bg: "#FEE2E2" },
    leave: { icon: <CalendarCheck size={20} color="#16A34A" />, bg: "#DCFCE7" },
    announcement: { icon: <Megaphone size={20} color="#2563EB" />, bg: "#DBEAFE" },
  };

  const config = defaultIcons[type] || defaultIcons.announcement;
  const normalizedCat = rawCategory?.toUpperCase() || "";

  let badgeLabel = "Info";
  let badgeBg = "#3B82F6";
  let badgeTextColor = "#FFFFFF";

  if (normalizedCat === "EMERGENCY" || normalizedCat === "MESS") {
    badgeLabel = "Urgent";
    badgeBg = "#EF4444";
  } else if (normalizedCat === "GENERAL" || normalizedCat === "EVENT") {
    badgeLabel = "Notice";
    badgeBg = "#3B82F6";
  }

  if (type === "complaint" || type === "leave") {
    badgeLabel = "Activity";
    badgeBg = "#475569";
  }

  let categoryLabel = "General";
  if (type === "complaint" || type === "leave") {
    categoryLabel = "Personal";
  } else if (rawCategory) {
    categoryLabel = rawCategory.charAt(0).toUpperCase() + rawCategory.slice(1).toLowerCase();
  }

  return {
    icon: config.icon,
    bg: config.bg,
    badgeLabel,
    badgeBg,
    badgeTextColor,
    categoryLabel,
  };
};

export default function HomeScreen() {
  const { theme } = useAppTheme();
  
  const { data, isLoading, isError, isRefetching, refetch } = useQuery<DashboardResponse>({
    queryKey: ["dashboard"],
    queryFn: fetchDashboardData,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.background }}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.background, padding: 20 }}>
        <Text style={{ color: "#DC2626", fontSize: 16, fontWeight: "600" }}>Failed to load dashboard context</Text>
        <Text style={{ color: theme.textSecondary, marginTop: 4, textDecorationLine: "underline" }} onPress={() => refetch()}>
          Tap here to retry
        </Text>
      </View>
    );
  }

  const { student, overview, activities } = data;

  const sortedTopActivities = [...(activities || [])]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 5);

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor={theme.primary} colors={[theme.primary]} />
        }
      >
        {/* Replace the old HomeHeader tag with this matching declaration */}
        <HomeHeader 
          onRefresh={refetch} 
          syncing={isRefetching} 
        />

        <View style={{ paddingHorizontal: 20 }}>
          <StudentIdentityCard
            name={student.displayName}
            rollNumber={student.rollNumber || "N/A"}
            roomNumber={student.room || "N/A"}
            blockName={student.building || "N/A"}
            status="Active Resident"
            instituteEmail={student.instituteEmail || "N/A"}
            catererName={student.caterer || "Not Assigned"}
          />

          <View style={{ height: 4 }} />

          <View style={{ marginTop: 24 }}>
            <SectionHeader title="Overview" subtitle="Hostel activity at a glance" />
            <ScrollView
              horizontal
              decelerationRate="fast"
              snapToInterval={156}
              snapToAlignment="start"
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 12, paddingRight: 40 }}
            >
              <View style={{ width: 144 }}>
                <StatCard
                  icon={<CircleAlert size={20} color="#EA580C" />}
                  value={overview.complaints.value}
                  title="Complaints"
                  status={overview.complaints.status}
                  statusColor="#EA580C"
                  iconBackgroundColor="#FFEDD5"
                />
              </View>
              <View style={{ width: 144 }}>
                <StatCard
                  icon={<Ticket size={20} color={theme.primary} />}
                  value={overview.passes.value}
                  title="Passes"
                  status={overview.passes.status}
                  statusColor="#16A34A"
                  iconBackgroundColor="#DBEAFE"
                />
              </View>
              <View style={{ width: 144 }}>
                <StatCard
                  icon={<CalendarDays size={20} color="#16A34A" />}
                  value={overview.leaves.value}
                  title="Leaves"
                  status={overview.leaves.status}
                  statusColor="#16A34A"
                  iconBackgroundColor="#DCFCE7"
                />
              </View>
              <View style={{ width: 144 }}>
                <StatCard
                  icon={<Megaphone size={20} color="#7C3AED" />}
                  value={overview.announcements.value}
                  title="Notices"
                  status={overview.announcements.status}
                  statusColor="#7C3AED"
                  iconBackgroundColor="#EDE9FE"
                />
              </View>
            </ScrollView>
          </View>

          <View style={{ marginTop: 28 }}>
            <SectionHeader title="Quick Actions" subtitle="Frequently used services" />
            <ScrollView
              horizontal
              decelerationRate="fast"
              snapToInterval={140}
              snapToAlignment="start"
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 12, paddingRight: 40 }}
            >
              <QuickActionCard title="Outpass" icon={<CalendarDays size={24} color={theme.primary} />} iconBackgroundColor="#DBEAFE" />
              <QuickActionCard title="Mess Complaint" icon={<MessageSquareWarning size={24} color="#DC2626" />} iconBackgroundColor="#FEE2E2" />
              <QuickActionCard title="Mess Transfer" icon={<RefreshCcw size={24} color="#0891B2" />} iconBackgroundColor="#CFFAFE" />
              <QuickActionCard title="Hostel Complaint" icon={<AlertTriangle size={24} color="#EA580C" />} iconBackgroundColor="#FFEDD5" />
            </ScrollView>
          </View>

          <View style={{ marginTop: 28 }}>
            <SectionHeader title="Announcements" subtitle="Latest hostel updates" />
            <View style={{ gap: 10 }}>
              {sortedTopActivities.length > 0 ? (
                sortedTopActivities.map((item: Activity, index: number) => {
                  const styleConfig = getActivityStyles(item.type, item.category);
                  return (
                    <ActivityCard
                      key={`${item.type}-${index}`}
                      title={item.title}
                      description={item.description}
                      timestamp={getRelativeTimeString(item.timestamp)}
                      icon={styleConfig.icon}
                      iconBackgroundColor={styleConfig.bg}
                      badgeText={styleConfig.badgeLabel}
                      badgeBackgroundColor={styleConfig.badgeBg}
                      badgeTextColor={styleConfig.badgeTextColor}
                      categoryText={styleConfig.categoryLabel}
                    />
                  );
                })
              ) : (
                <View style={{ padding: 20, alignItems: "center" }}>
                  <Text style={{ color: theme.textSecondary, fontSize: 14 }}>No recent activity found.</Text>
                </View>
              )}
            </View>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}