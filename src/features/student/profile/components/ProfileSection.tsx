import { Text } from "react-native";

export default function ProfileSection({
  title,
}: {
  title: string;
}) {
  return (
    <Text
      style={{
        marginTop: 28,
        marginBottom: 12,
        fontSize: 15,
        fontWeight: "700",
        letterSpacing: 1,
        color: "#64748B",
        textTransform: "uppercase",
      }}
    >
      {title}
    </Text>
  );
}