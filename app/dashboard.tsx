import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function Dashboard() {
  // week | month | year
  const [range, setRange] = useState("week");
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);

  // Fake data for now – later we plug in real from bills/UPI/manual
  const weekData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    data: [320, 540, 210, 430, 760, 120, 90],
  };

  const monthData = {
    labels: ["W1", "W2", "W3", "W4"],
    data: [2500, 4200, 3100, 3800],
  };

  const yearData = {
    labels: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
    data: [8000, 9200, 7000, 11000, 9500, 12000, 10000, 9800, 10500, 11500, 9000, 13000],
  };

  const getChartData = () => {
    if (range === "week") return weekData;
    if (range === "month") return monthData;
    return yearData;
  };

  // For summary card
  const todaySpent = 654;          // later: calculate from today’s entries
  const periodBudget = range === "week" ? 7000 : range === "month" ? 20000 : 200000;
  const remaining = periodBudget - todaySpent;

  const remainingPercent = Math.max(0, (remaining / periodBudget) * 100);

  const getRemainingColor = () => {
    if (remainingPercent < 20) return "#ff4d4f"; // red
    if (remainingPercent < 40) return "#fbbf24"; // yellow
    return "#22c55e"; // green
  };

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  // animate when range changes
  useEffect(() => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.05,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  }, [range]);

  const categories = [
    { name: "Swiggy / Food", amount: 820, icon: "🍔" },
    { name: "Travel", amount: 450, icon: "🚌" },
    { name: "Shopping", amount: 1200, icon: "🛒" },
    { name: "Bills", amount: 980, icon: "🧾" },
    { name: "UPI Transfers", amount: 650, icon: "📱" },
    { name: "Others", amount: 300, icon: "🔖" },
  ];

  const recent = [
    { name: "Swiggy - Pizza", amount: 320, time: "Today • 1:24 PM" },
    { name: "Auto to College", amount: 80, time: "Today • 9:10 AM" },
    { name: "Amazon", amount: 799, time: "Yesterday" },
  ];

  const chartData = getChartData();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* TOP: LINE GRAPH CARD */}
      <Animated.View style={[styles.graphCard, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        <View style={styles.graphHeader}>
          <Text style={styles.graphTitle}>Spending Timeline</Text>
          <View style={styles.rangeTabs}>
            {["week", "month", "year"].map((r) => (
              <TouchableOpacity
                key={r}
                style={[
                  styles.rangeTab,
                  range === r && styles.rangeTabActive,
                ]}
                onPress={() => {
                  setRange(r);
                  setHoverValue(null);
                  setHoverLabel(null);
                }}
              >
                <Text
                  style={[
                    styles.rangeTabText,
                    range === r && styles.rangeTabTextActive,
                  ]}
                >
                  {r === "week" ? "Week" : r === "month" ? "Month" : "Year"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Hover / Tap Info */}
        <View style={styles.hoverBox}>
          {hoverValue != null && hoverLabel ? (
            <Text style={styles.hoverText}>
              {hoverLabel}: ₹ {hoverValue}
            </Text>
          ) : (
            <Text style={styles.hoverText}>
              Tap any point on the line to see exact spending
            </Text>
          )}
        </View>

        <LineChart
          data={{
            labels: chartData.labels,
            datasets: [{ data: chartData.data }],
          }}
          width={screenWidth - 40}
          height={220}
          yAxisLabel="₹ "
          chartConfig={{
            backgroundColor: "#151618ff",
            backgroundGradientFrom: "#141415ff",
            backgroundGradientTo: "#161617ff",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(94, 234, 212, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(148, 163, 184, ${opacity})`,
            propsForDots: {
              r: "5",
              strokeWidth: "2",
              stroke: "#22c55e",
            },
            propsForBackgroundLines: {
              strokeDasharray: "3 5",
            },
          }}
          bezier
          style={styles.chartStyle}
          onDataPointClick={(point) => {
            setHoverValue(point.value);
            setHoverLabel(chartData.labels[point.index]);
          }}
        />
      </Animated.View>

      {/* SUMMARY CARD */}
      <Animated.View style={[styles.summaryCard, { opacity: fadeAnim }]}>
        <Text style={styles.summaryTitle}>Summary ({range === "week" ? "This Week" : range === "month" ? "This Month" : "This Year"})</Text>

        <View style={styles.summaryRow}>
          <View>
            <Text style={styles.summaryLabel}>Total Spending</Text>
            <Text style={styles.summaryAmount}>₹ {todaySpent}</Text>
          </View>

          <View>
            <Text style={styles.summaryLabel}>Remaining Budget</Text>
            <Text style={[styles.summaryAmount, { color: getRemainingColor() }]}>
              ₹ {remaining < 0 ? 0 : remaining}
            </Text>
          </View>
        </View>

        {/* Remaining bar */}
        <View style={styles.remainingBarBg}>
          <View
            style={[
              styles.remainingBarFill,
              {
                width: `${Math.max(5, remainingPercent)}%`,
                backgroundColor: getRemainingColor(),
              },
            ]}
          />
        </View>

        <Text style={styles.budgetInfo}>
          Budget: ₹ {periodBudget} • {remainingPercent < 20
            ? "Careful! Budget almost over 🔴"
            : remainingPercent < 40
            ? "Spending a bit high 🟡"
            : "You're on track 🟢"}
        </Text>
      </Animated.View>

      {/* CATEGORIES GRID */}
      <Text style={styles.sectionTitle}>Categories</Text>
      <View style={styles.grid}>
        {categories.map((c, i) => (
          <Animated.View key={i} style={styles.categoryCard}>
            <Text style={styles.categoryIcon}>{c.icon}</Text>
            <Text style={styles.categoryName}>{c.name}</Text>
            <Text style={styles.categoryAmount}>₹ {c.amount}</Text>
          </Animated.View>
        ))}
      </View>

      {/* LAST TRANSACTIONS BOX */}
      <View style={styles.transactionsCard}>
        <Text style={styles.transactionsTitle}>Recent Transactions</Text>

        {recent.map((t, i) => (
          <View key={i} style={styles.transactionRow}>
            <View>
              <Text style={styles.transactionName}>{t.name}</Text>
              <Text style={styles.transactionTime}>{t.time}</Text>
            </View>
            <Text style={styles.transactionAmount}>₹ {t.amount}</Text>
          </View>
        ))}

        <Text style={styles.moreText}>Tap here later to view full history (we'll add screen)</Text>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingHorizontal: 20,
    backgroundColor: "#fbfcfcff",
    flex: 1,
  },

  /* GRAPH CARD */
  graphCard: {
    backgroundColor: "#e7ebf4ff",
    borderRadius: 18,
    padding: 15,
    marginBottom: 18,
    elevation: 4,
  },
  graphHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  graphTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#e5e7eb",
  },
  rangeTabs: {
    flexDirection: "row",
    backgroundColor: "#f0f2f7ff",
    borderRadius: 20,
    padding: 2,
  },
  rangeTab: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  rangeTabActive: {
    backgroundColor: "#22c55e",
  },
  rangeTabText: {
    fontSize: 12,
    color: "#9ca3af",
    fontWeight: "600",
  },
  rangeTabTextActive: {
    color: "#0b1120",
  },
  hoverBox: {
    marginTop: 4,
    marginBottom: 6,
  },
  hoverText: {
    fontSize: 13,
    color: "#9ca3af",
  },
  chartStyle: {
    borderRadius: 16,
    marginTop: 4,
  },

  /* SUMMARY CARD */
  summaryCard: {
    backgroundColor: "#48494dff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 18,
    elevation: 4,
  },
  summaryTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#e5e7eb",
    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 13,
    color: "#9ca3af",
  },
  summaryAmount: {
    fontSize: 20,
    fontWeight: "800",
    color: "#e5e7eb",
    marginTop: 2,
  },
  remainingBarBg: {
    height: 8,
    borderRadius: 10,
    backgroundColor: "#1f2937",
    overflow: "hidden",
  },
  remainingBarFill: {
    height: 8,
    borderRadius: 10,
  },
  budgetInfo: {
    marginTop: 8,
    fontSize: 13,
    color: "#9ca3af",
  },

  /* CATEGORIES */
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#e5e7eb",
    marginBottom: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  categoryCard: {
    width: "48%",
    backgroundColor: "#020617",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    elevation: 3,
  },
  categoryIcon: {
    fontSize: 26,
    marginBottom: 6,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#e5e7eb",
  },
  categoryAmount: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: "600",
    color: "#22c55e",
  },

  /* TRANSACTIONS */
  transactionsCard: {
    backgroundColor: "#020617",
    borderRadius: 18,
    padding: 15,
  },
  transactionsTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#e5e7eb",
    marginBottom: 10,
  },
  transactionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  transactionName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#e5e7eb",
  },
  transactionTime: {
    fontSize: 12,
    color: "#9ca3af",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#22c55e",
  },
  moreText: {
    marginTop: 8,
    fontSize: 12,
    color: "#9ca3af",
  },
});
