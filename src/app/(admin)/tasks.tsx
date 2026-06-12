import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "react-native";

export default function TasksScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Passes</Text>
      </View>
    </SafeAreaView>
  );
}