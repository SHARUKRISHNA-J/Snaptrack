import { Slot, Link, usePathname, useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  BackHandler,
  ToastAndroid,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AuthProvider } from "../context/AuthContext";
import { useEffect, useRef } from "react";

export default function Layout() {
  const pathname = usePathname();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Animation
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.25,
        duration: 150,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }, [pathname]);

  // TAB IDENTIFICATION
  const isHome = pathname === "/home";
  const isDashboard = pathname === "/dashboard";
  const isProfile = pathname === "/profile";

  // ANDROID BACK BUTTON HANDLING (Expo-safe)
  const backPressCount = useRef(0);

  useEffect(() => {
    const backAction = () => {
      // If not on Home → go to Home
      if (pathname !== "/home") {
        router.replace("/home");
        return true;
      }

      // Double press at home → exit
      if (backPressCount.current === 0) {
        backPressCount.current++;
        ToastAndroid.show("Press again to exit", ToastAndroid.SHORT);

        setTimeout(() => {
          backPressCount.current = 0;
        }, 2000);

        return true;
      }

      BackHandler.exitApp(); // Expo-compatible exit
      return true;
    };

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => subscription.remove();
  }, [pathname]);

  return (
    <AuthProvider>
      <View style={{ flex: 1, backgroundColor: "#f4f7fa" }}>
        <View style={{ flex: 1 }}>
          <Slot />
        </View>

        {/* Hide navbar on Login & Splash */}
        {!["/login", "/splash"].includes(pathname) && (
          <View
            style={[
              styles.floatingNav,
              { paddingBottom: insets.bottom > 0 ? insets.bottom : 15 },
            ]}
          >
            {/* HOME */}
            <Link href="/home" asChild>
              <TouchableOpacity style={styles.navItem}>
                <Animated.View
                  style={{ transform: [{ scale: isHome ? scaleAnim : 1 }] }}
                >
                  <Ionicons
                    name="home"
                    size={isHome ? 32 : 24}
                    color={isHome ? "#2ec4b6" : "#ffffff"}
                  />
                </Animated.View>
                <Text style={isHome ? styles.activeText : styles.inactiveText}>
                  Home
                </Text>
              </TouchableOpacity>
            </Link>

            {/* DASHBOARD */}
            <Link href="/dashboard" asChild>
              <TouchableOpacity style={styles.navItem}>
                <Animated.View
                  style={{
                    transform: [{ scale: isDashboard ? scaleAnim : 1 }],
                  }}
                >
                  <MaterialIcons
                    name="dashboard"
                    size={isDashboard ? 32 : 24}
                    color={isDashboard ? "#2ec4b6" : "#ffffff"}
                  />
                </Animated.View>
                <Text
                  style={isDashboard ? styles.activeText : styles.inactiveText}
                >
                  Dashboard
                </Text>
              </TouchableOpacity>
            </Link>

            {/* PROFILE */}
            <Link href="/profile" asChild>
              <TouchableOpacity style={styles.navItem}>
                <Animated.View
                  style={{
                    transform: [{ scale: isProfile ? scaleAnim : 1 }],
                  }}
                >
                  <Ionicons
                    name="person"
                    size={isProfile ? 32 : 24}
                    color={isProfile ? "#2ec4b6" : "#ffffff"}
                  />
                </Animated.View>
                <Text style={isProfile ? styles.activeText : styles.inactiveText}>
                  Profile
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        )}
      </View>
    </AuthProvider>
  );
}

// NAVBAR STYLES
const styles = StyleSheet.create({
  floatingNav: {
    position: "absolute",
    bottom: 10,
    left: 20,
    right: 20,

    backgroundColor: "rgba(15, 22, 36, 0.95)",
    borderRadius: 28,
    paddingVertical: 12,

    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 20,

    overflow: "hidden",
  },

  navItem: {
    alignItems: "center",
    justifyContent: "center",
  },

  inactiveText: {
    color: "#eee3e3ff",
    marginTop: 3,
    fontSize: 12,
  },

  activeText: {
    color: "#2ec4b6",
    marginTop: 3,
    fontSize: 13,
    fontWeight: "bold",
  },
});
