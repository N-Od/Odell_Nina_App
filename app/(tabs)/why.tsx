import React from "react";
import { Text, View } from "react-native";

export default function WhyScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "#E3F0EA", padding: 20 }}>
      <Text style={{ fontSize: 26, fontWeight: "700", color: "#2E2E2E" }}>
        Start the Momentum
      </Text>

      <View
        style={{
          marginTop: 18,
          padding: 16,
          borderRadius: 14,
          borderWidth: 3,
          borderColor: "#4F7C6B",
          backgroundColor: "#EAF3FA",
        }}
      >
        <Text style={{ fontSize: 16, lineHeight: 24, color: "#2E2E2E" }}>
          Starting is the hardest part. This app is here to make cleaning feel
          doable by focusing on one small task at a time.
        </Text>

        <Text style={{ marginTop: 10, fontSize: 16, lineHeight: 24, color: "#2E2E2E" }}>
          You don’t have to finish everything. You just have to begin.
        </Text>
      </View>

      <Text
        style={{
          marginTop: 18,
          fontSize: 18,
          fontWeight: "700",
          color: "#2E2E2E",
        }}
      >
        How to use it
      </Text>

      <View
        style={{
          marginTop: 12,
          padding: 16,
          borderRadius: 14,
          borderWidth: 3,
          borderColor: "#4F7C6B",
          backgroundColor: "#EAF3FA",
        }}
      >
        <Text style={{ fontSize: 16, lineHeight: 26, color: "#2E2E2E" }}>
          1) Pick the smallest chore{"\n"}
          2) Check it off{"\n"}
          3) Let that “done” feeling carry you to the next one
        </Text>

        <Text style={{ marginTop: 10, fontSize: 14, lineHeight: 20, color: "#2E2E2E" }}>
          Tip: To start out, choose the smaller chore that takes less than 5 minutes to complete.
        </Text>
      </View>

      <View
        style={{
          marginTop: 18,
          padding: 16,
          borderRadius: 14,
          borderWidth: 3,
          borderColor: "#4F7C6B",
          backgroundColor: "#EAF3FA",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "700", color: "#2E2E2E" }}>
          Reminder
        </Text>
        <Text style={{ marginTop: 6, fontSize: 16, lineHeight: 24, color: "#2E2E2E" }}>
          Progress counts — even if it is just one chore.
        </Text>
      </View>
    </View>
  );
}