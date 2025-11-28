import { View, Text, StyleSheet } from "react-native";

export default function ScanUPI() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan UPI Payment</Text>
      <Text style={styles.subtitle}>UPI QR scanner will be added here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#555",
  },
});
