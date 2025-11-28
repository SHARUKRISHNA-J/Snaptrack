import { useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<any>(null); // ✅ avoid TS type issues
  const router = useRouter();

  // Still loading permission
  if (!permission) {
    return <View />;
  }

  // Permission not granted
  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>Camera access needed</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.permissionBtn}>
          <Text style={styles.permissionBtnText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePhoto = async () => {
    try {
      if (!cameraRef.current) {
        console.log("Camera not ready");
        return;
      }

      // 👇 cast to any so TS stops complaining
      const photo = await cameraRef.current.takePictureAsync({
  base64: true,
  quality: 1,
  skipProcessing: true   // makes text sharper in Android
});


      router.push({
        pathname: "/billPreview",
        params: { uri: photo.uri },
      });
    } catch (e) {
      console.log("Capture error:", e);
    }
  };

  return (
    <View style={styles.container}>
     <CameraView
  ref={cameraRef}
  style={styles.camera}
  facing="back"
  autofocus="on"
  zoom={0}
  enableTorch={false}
/>


      <View style={styles.captureContainer}>
        <TouchableOpacity style={styles.captureBtn} onPress={takePhoto}>
          <Ionicons name="camera" size={42} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  camera: { flex: 1 },

  captureContainer: {
    position: "absolute",
    bottom: 130,
    width: "100%",
    alignItems: "center",
  },

  captureBtn: {
    backgroundColor: "#2ec4b6",
    padding: 18,
    borderRadius: 50,
  },

  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  permissionText: {
    fontSize: 18,
    marginBottom: 20,
  },

  permissionBtn: {
    backgroundColor: "#2ec4b6",
    padding: 12,
    borderRadius: 10,
  },

  permissionBtnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
