import Animated, {
  FadeIn,
} from "react-native-reanimated";

export default function ScreenWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Animated.View
      entering={FadeIn.duration(250)}
      style={{ flex: 1 }}
    >
      {children}
    </Animated.View>
  );
}