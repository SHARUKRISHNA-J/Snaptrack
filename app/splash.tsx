import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace("/login");
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>SnapTrack</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4b7bec",
  },
  logo: {
    fontSize: 42,
    fontWeight: "900",
    color: "white",
  },
});
