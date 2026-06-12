import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "react-native";

export default function ServicesScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Services</Text>
      </View>
    </SafeAreaView>
  );
}