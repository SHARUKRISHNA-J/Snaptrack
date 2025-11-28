import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { username } = useContext(AuthContext);  // Get name from login

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Profile</Text>

      {/* Profile Photo & Name */}
      <View style={styles.center}>
        <Image
          source={{ uri: "https://i.pravatar.cc/150?img=12" }}
          style={styles.avatar}
        />
        <Text style={styles.name}>
          {username && username.trim() !== "" ? username : "Guest"}
        </Text>
      </View>

      {/* Options */}
      <TouchableOpacity style={styles.option}>
        <Ionicons name="person-circle-outline" size={24} color="#4A90E2" />
        <Text style={styles.optionText}>Account Details</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <Ionicons name="notifications-outline" size={24} color="#4A90E2" />
        <Text style={styles.optionText}>Notifications</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <Ionicons name="shield-checkmark-outline" size={24} color="#4A90E2" />
        <Text style={styles.optionText}>Privacy & Security</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.option, { marginTop: 20 }]}>
        <MaterialIcons name="logout" size={24} color="#e63946" />
        <Text style={[styles.optionText, { color: "#e63946" }]}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fc",
    padding: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 25,
    color: "#333",
  },
  center: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 60,
    marginBottom: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
  },
  optionText: {
    marginLeft: 15,
    fontSize: 17,
    color: "#333",
  },
});
