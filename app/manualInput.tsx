import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";

export default function ManualInput() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manual Entry</Text>

      <TextInput placeholder="Item Name" style={styles.input} />
      <TextInput placeholder="Amount" style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="Category" style={styles.input} />

      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>Save Entry</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 80 },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 20 },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  btn: {
    backgroundColor: "#2ec4b6",
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
  },
  btnText: { textAlign: "center", color: "#fff", fontSize: 16, fontWeight: "700" },
});
