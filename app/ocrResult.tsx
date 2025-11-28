import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import Tesseract from "tesseract.js";

export default function OCRResult() {
  const { base64 } = useLocalSearchParams();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    runOCR();
  }, []);

  const runOCR = async () => {
    try {
      setLoading(true);

      const result = await Tesseract.recognize(
        `data:image/jpeg;base64,${base64}`,
        "eng",
        {
          logger: () => {}, // keep it quiet so it feels faster
        }
      );

      const cleanText = result.data.text.trim();

      if (!cleanText || cleanText.length < 5) {
        setText("Couldn't read the bill. Try taking a clearer close-up picture.");
      } else {
        setText(cleanText);
      }
    } catch (err) {
      console.log(err);
      setText("OCR Failed. Please retake a clearer bill photo.");
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Extracted Text</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#2ec4b6" />
      ) : (
        <ScrollView style={styles.box}>
          <Text style={styles.text}>{text}</Text>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40, paddingHorizontal: 20, backgroundColor: "#f5f5f5" },
  title: { fontSize: 28, fontWeight: "800", marginBottom: 20, color: "#333" },
  box: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    maxHeight: "80%",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  text: { fontSize: 16, color: "#333", lineHeight: 22 },
});
