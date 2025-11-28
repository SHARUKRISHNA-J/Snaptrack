import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as ImageManipulator from "expo-image-manipulator";
import { useState } from "react";


export default function BillPreview() {
  const { uri } = useLocalSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleExtract = async () => {
    setLoading(true);

    // Optionally compress image for better OCR
    const cleanedUri = Array.isArray(uri) ? uri[0] : uri;

const enhanced = await ImageManipulator.manipulateAsync(
  cleanedUri,
  [
    { resize: { width: 1200 } },      // shrink large images
  ],
  { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG, base64: true }
);


    router.push({
      pathname: "/ocrResult",
      params: { base64: enhanced.base64 },
    });
  };

  return (
    <View style={styles.container}>
      {uri && (
  <Image source={{ uri: String(uri) }} style={styles.image} />
)}


      <TouchableOpacity style={styles.extractBtn} onPress={handleExtract}>
        {loading ? (
          <ActivityIndicator color="#fff" size="large" />
        ) : (
          <Text style={styles.extractText}>Extract Text</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, alignItems: "center" },
  image: {
    width: "90%",
    height: "70%",
    borderRadius: 15,
    marginBottom: 30,
  },
  extractBtn: {
    backgroundColor: "#2ec4b6",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  extractText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});
