import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";
import React, { useEffect } from "react";
import {
  Platform,
  Pressable,
  Text,
  View,
  Dimensions,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import {
  House,
  User,
  Inbox,
  Briefcase,
  ClipboardList,
  Ticket,
} from "lucide-react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function GlassTabBar({
  state,
  descriptors,
  navigation,
}: any) {
  const tabWidth =
    (SCREEN_WIDTH - 32) /
    state.routes.length;

  const translateX =
    useSharedValue(
      state.index * tabWidth
    );

  useEffect(() => {
    translateX.value = withSpring(
      state.index * tabWidth,
      {
        damping: 18,
        stiffness: 180,
      }
    );
  }, [state.index]);

  const indicatorStyle =
    useAnimatedStyle(() => ({
      transform: [
        {
          translateX:
            translateX.value,
        },
      ],
    }));

  const getIcon = (
    routeName: string,
    focused: boolean
  ) => {
    const color = focused
      ? "#111827"
      : "#6B7280";

    const size = focused
      ? 24
      : 22;

    switch (routeName) {
      case "home":
        return (
          <House
            size={size}
            color={color}
          />
        );

      case "passes":
        return (
          <Ticket
            size={size}
            color={color}
          />
        );

      case "services":
        return (
          <Briefcase
            size={size}
            color={color}
          />
        );

      case "tasks":
        return (
          <ClipboardList
            size={size}
            color={color}
          />
        );

      case "inbox":
        return (
          <Inbox
            size={size}
            color={color}
          />
        );

      case "profile":
        return (
          <User
            size={size}
            color={color}
          />
        );

      default:
        return null;
    }
  };

  const Content = (
    <View
      style={{
        position: "relative",
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
      }}
    >
      <Animated.View
        style={[
          {
            position: "absolute",
            left: 0,
            top: 6,
            bottom: 6,
            width: tabWidth,
            paddingHorizontal: 6,
          },
          indicatorStyle,
        ]}
      >
        <View
          style={{
            flex: 1,
            borderRadius: 20,
            backgroundColor:
              Platform.OS === "ios"
                ? "rgba(255,255,255,0.45)"
                : "rgba(255,255,255,0.9)",
          }}
        />
      </Animated.View>

      {state.routes.map(
        (
          route: any,
          index: number
        ) => {
          const focused =
            state.index === index;

          return (
            <Pressable
              key={route.key}
              onPress={() => {
                Haptics.impactAsync(
                  Haptics.ImpactFeedbackStyle
                    .Light
                );

                navigation.navigate(
                  route.name
                );
              }}
              style={{
                width: tabWidth,
                alignItems: "center",
                justifyContent:
                  "center",
                paddingVertical: 8,
                zIndex: 10,
              }}
            >
              {getIcon(
                route.name,
                focused
              )}

              <Text
                style={{
                  marginTop: 4,
                  fontSize: 11,
                  fontWeight: focused
                    ? "600"
                    : "500",
                  color: focused
                    ? "#111827"
                    : "#6B7280",
                }}
              >
                {
                  descriptors[
                    route.key
                  ].options.title
                }
              </Text>
            </Pressable>
          );
        }
      )}
    </View>
  );

  return (
    <View
      style={{
        position: "absolute",
        left: 16,
        right: 16,
        bottom: 24,
      }}
    >
      {Platform.OS === "ios" ? (
        <BlurView
          intensity={90}
          tint="light"
          style={{
            borderRadius: 30,
            overflow: "hidden",
          }}
        >
          {Content}
        </BlurView>
      ) : (
        <View
          style={{
            borderRadius: 30,
            overflow: "hidden",
            backgroundColor:
              "rgba(255,255,255,0.95)",
            elevation: 12,
            borderWidth: 1,
            borderColor:
              "rgba(255,255,255,0.3)",
          }}
        >
          {Content}
        </View>
      )}
    </View>
  );
}