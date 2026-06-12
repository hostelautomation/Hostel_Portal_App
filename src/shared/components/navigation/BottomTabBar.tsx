import React, { useEffect, useState } from "react";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";
import { View, Pressable, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  House,
  Ticket,
  Briefcase,
  Inbox,
  User,
  ClipboardList,
} from "lucide-react-native";

import { useAppTheme } from "../../../context/ThemeContext";

function AnimatedTabIcon({
  children,
  focused,
}: {
  children: React.ReactNode;
  focused: boolean;
}) {
  const scale = useSharedValue(focused ? 1.15 : 1);

  useEffect(() => {
    scale.value = withSpring(focused ? 1.15 : 1, {
      damping: 14,
      stiffness: 220,
    });
  }, [focused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
}

function AnimatedLabel({
  title,
  focused,
}: {
  title: string;
  focused: boolean;
}) {
  const { theme } = useAppTheme();
  const opacity = useSharedValue(focused ? 1 : 0.75);

  useEffect(() => {
    opacity.value = withTiming(focused ? 1 : 0.75, {
      duration: 200,
    });
  }, [focused]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.Text
      style={[
        {
          marginTop: 4,
          fontSize: 11,
          fontWeight: focused ? "700" : "500",
          color: focused ? theme.textPrimary : theme.textSecondary,
        },
        animatedStyle,
      ]}
    >
      {title}
    </Animated.Text>
  );
}

export default function BottomTabBar({
  state,
  descriptors,
  navigation,
}: any) {
  const { theme } = useAppTheme();
  const insets = useSafeAreaInsets();
  const [containerWidth, setContainerWidth] = useState(0);

  const tabCount = state.routes.length;
  const tabWidth = containerWidth > 0 ? containerWidth / tabCount : 0;
  const translateX = useSharedValue(0);

  useEffect(() => {
    if (!tabWidth) return;
    translateX.value = withSpring(state.index * tabWidth, {
      damping: 18,
      stiffness: 180,
      mass: 0.8,
    });
  }, [state.index, tabWidth]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const getIcon = (routeName: string, focused: boolean) => {
    const color = focused ? theme.textPrimary : theme.textSecondary;
    const size = 21;

    switch (routeName) {
      case "home":
        return <House size={size} color={color} />;
      case "passes":
        return <Ticket size={size} color={color} />;
      case "tasks":
        return <ClipboardList size={size} color={color} />;
      case "services":
        return <Briefcase size={size} color={color} />;
      case "inbox":
        return <Inbox size={size} color={color} />;
      case "profile":
        return <User size={size} color={color} />;
      default:
        return null;
    }
  };

  const content = (
    <View
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
      style={{
        flexDirection: "row",
        position: "relative",
        paddingVertical: 6,
        width: "100%",
      }}
    >
      {tabWidth > 0 && (
        <Animated.View
          style={[
            {
              position: "absolute",
              left: 0,
              top: 4,
              bottom: 4,
              width: tabWidth,
            },
            indicatorStyle,
          ]}
        >
          <View
            style={{
              flex: 1,
              marginHorizontal: 4,
              borderRadius: 18,
              backgroundColor: theme.isDark
                ? "rgba(255, 255, 255, 0.08)"
                : Platform.OS === "ios"
                ? "rgba(255, 255, 255, 0.65)"
                : "#F3F4F6",
              shadowColor: "#000000",
              shadowOpacity: theme.isDark ? 0.2 : 0.08,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 2 },
            }}
          />
        </Animated.View>
      )}

      {state.routes.map((route: any, index: number) => {
        const focused = state.index === index;

        return (
          <Pressable
            key={route.key}
            onPress={() => {
              if (focused) return;
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              navigation.navigate(route.name);
            }}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 6,
              zIndex: 10,
            }}
          >
            <AnimatedTabIcon focused={focused}>
              {getIcon(route.name, focused)}
            </AnimatedTabIcon>

            <AnimatedLabel
              title={descriptors[route.key].options.title}
              focused={focused}
            />
          </Pressable>
        );
      })}
    </View>
  );

  return (
    <View
      style={{
        position: "absolute",
        left: 12,
        right: 12,
        bottom:
          Platform.OS === "ios"
            ? Math.max(insets.bottom - 4, 4)
            : 8,
      }}
    >
      {Platform.OS === "ios" ? (
        <BlurView
          intensity={90}
          tint={theme.isDark ? "dark" : "light"}
          style={{
            borderRadius: 26,
            overflow: "hidden",
            borderWidth: 1,
            borderColor: theme.isDark
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(255, 255, 255, 0.35)",
          }}
        >
          {content}
        </BlurView>
      ) : (
        <View
          style={{
            borderRadius: 26,
            overflow: "hidden",
            backgroundColor: theme.isDark ? theme.card : "rgba(255, 255, 255, 0.98)",
            borderWidth: 1,
            borderColor: theme.border,
            elevation: 12,
          }}
        >
          {content}
        </View>
      )}
    </View>
  );
}