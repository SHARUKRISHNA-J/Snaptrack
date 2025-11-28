import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import { useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();
  const { setUsername } = useContext(AuthContext);

  // 🟢 GOOGLE AUTH CONFIG
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: "472345933214-rfhetrjrdi3e13bkaarvkvlsp6po86fs.apps.googleusercontent.com",
  });

  // 🟢 HANDLE LOGIN RESPONSE
 useEffect(() => {
  if (response?.type === "success" && response.authentication) {
    fetchUserInfo(response.authentication.accessToken);
  }
}, [response]);


  // 🟢 FETCH USER PROFILE FROM GOOGLE
  const fetchUserInfo = async (token: string) => {
  let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
    headers: { Authorization: `Bearer ${token}` },
  });

  let userInfo: any = await userInfoResponse.json();

  // Save username in context
  setUsername(userInfo.name || "User");

  // Navigate to home
  router.replace("/home");
};


  return (
    <View style={styles.container}>
      <Text style={styles.logo}>SnapTrack</Text>

      {/* Google Login Button */}
      <TouchableOpacity
        style={styles.googleBtn}
        disabled={!request}
        onPress={() => promptAsync()}
      >
        <Image
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
          }}
          style={styles.googleIcon}
        />
        <Text style={styles.googleText}>Continue with Google</Text>
      </TouchableOpacity>

      {/* Phone Login Button */}
     <TouchableOpacity
  style={styles.phoneBtn}
  onPress={() => router.replace("/home")}
>

        <Text style={styles.phoneText}>📱 Continue with Phone</Text>
      </TouchableOpacity>

      {/* OR Divider */}
      <View style={styles.dividerContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>or</Text>
        <View style={styles.line} />
      </View>

      {/* Email Login */}
      <TouchableOpacity style={styles.emailBtn}>
        <Text style={styles.emailText}>Sign in or Sign up with Email</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#fff", paddingHorizontal: 25 },
  logo: { fontSize: 42, fontWeight: "800", marginBottom: 50, color: "#4b7bec" },

  googleBtn: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", width: "100%", padding: 15, borderRadius: 10, borderWidth: 1, borderColor: "#ddd", marginBottom: 20 },
  googleIcon: { width: 24, height: 24, marginRight: 10 },
  googleText: { fontSize: 16, fontWeight: "600" },

  phoneBtn: { backgroundColor: "#4b7bec", width: "100%", padding: 15, borderRadius: 10, marginBottom: 20 },
  phoneText: { color: "#fff", textAlign: "center", fontSize: 16, fontWeight: "600" },

  dividerContainer: { flexDirection: "row", alignItems: "center", marginVertical: 20 },
  line: { flex: 1, height: 1, backgroundColor: "#ccc" },
  orText: { marginHorizontal: 10, color: "#777" },

  emailBtn: { width: "100%", padding: 15, borderRadius: 10, borderWidth: 1, borderColor: "#ddd" },
  emailText: { textAlign: "center", fontSize: 16, fontWeight: "600" },
});
