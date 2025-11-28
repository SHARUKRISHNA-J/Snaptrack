import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function Home() {
  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>SnapTrack</Text>

      {/* SCAN UPI */}
      <Link href="/camera" asChild>
        <TouchableOpacity style={styles.card}>
          <Ionicons name="qr-code" size={40} color="#2ec4b6" />
          <Text style={styles.cardText}>Scan UPI</Text>
        </TouchableOpacity>
      </Link>

      {/* SCAN BILL */}
      <Link href="/camera" asChild>
        <TouchableOpacity style={styles.card}>
          <MaterialCommunityIcons name="file-document" size={40} color="#7167f5" />
          <Text style={styles.cardText}>Scan Bill</Text>
        </TouchableOpacity>
      </Link>

      {/* MANUAL INPUT (NEW) */}
      <Link href="/manualInput" asChild>
        <TouchableOpacity style={styles.card}>
          <Ionicons name="create-outline" size={40} color="#ffa534" />
          <Text style={styles.cardText}>Manual Input</Text>
        </TouchableOpacity>
      </Link>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1e3a5f",
    marginBottom: 30,
  },

  card: {
    backgroundColor: "#feffffff",
    padding: 25,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 20,

    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },

  cardText: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: "600",
    color: "#1e3a5f",
  },
});
