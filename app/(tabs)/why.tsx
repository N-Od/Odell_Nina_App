import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Pressable,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function MomentumScreen() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchQuote() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "https://motivational-spark-api.vercel.app/api/quotes/random"
      );
      const data = await response.json();

      if (data?.quote && data?.author) {
        setQuote(data.quote);
        setAuthor(data.author);
      } else {
        setError("Could not load motivation right now.");
      }
    } catch (err) {
      setError("Could not load motivation right now.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <LinearGradient colors={["#DFF1E7", "#D8ECF8"]} style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 14, paddingBottom: 24 }}
      >
        <Text style={{ fontSize: 26, fontWeight: "700", color: "#2E2E2E" }}>
          Start the Momentum
        </Text>

        {/* Explanation */}
        <View
          style={{
            marginTop: 12,
            padding: 12,
            borderRadius: 12,
            borderWidth: 3,
            borderColor: "#4F7C6B",
            backgroundColor: "#EAF3FA",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <Text style={{ fontSize: 15, lineHeight: 22, color: "#2E2E2E" }}>
            Starting chores can feel like the hardest part. This app is here to
            make cleaning feel manageable by focusing on one small task at a
            time.
          </Text>

          <Text
            style={{
              marginTop: 8,
              fontSize: 15,
              lineHeight: 22,
              color: "#2E2E2E",
            }}
          >
            Don't overwhelm yourself. You don't have to finish everything at
            once. You just have to begin.
          </Text>
        </View>

        {/* How to use */}
        <View
          style={{
            marginTop: 12,
            padding: 12,
            borderRadius: 12,
            borderWidth: 3,
            borderColor: "#4F7C6B",
            backgroundColor: "#DFF1E7",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "700", color: "#2E2E2E" }}>
            🌿 How to use it
          </Text>

          <Text
            style={{
              marginTop: 8,
              fontSize: 15,
              lineHeight: 24,
              color: "#2E2E2E",
            }}
          >
            1) Pick the smallest chore to do.{"\n"}
            2) Check it off your list.{"\n"}
            3) Use that “done” feeling to keep going. One small task leads to
            the next.
          </Text>

          <Text
            style={{
              marginTop: 8,
              fontSize: 13,
              lineHeight: 19,
              color: "#2E2E2E",
            }}
          >
            Tip: To start out, choose a smaller chore that takes less than 5
            minutes to complete.
          </Text>
        </View>

        {/* Daily Motivation */}
        <View
          style={{
            marginTop: 12,
            padding: 12,
            borderRadius: 12,
            borderWidth: 3,
            borderColor: "#4F7C6B",
            backgroundColor: "#EAF3FA",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              color: "#2E2E2E",
            }}
          >
            ✨ Daily Motivation
          </Text>

          {loading ? (
            <View style={{ marginTop: 10 }}>
              <ActivityIndicator size="small" color="#4F7C6B" />
            </View>
          ) : error ? (
            <Text style={{ marginTop: 10, fontSize: 14, color: "#2E2E2E" }}>
              {error}
            </Text>
          ) : (
            <>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 15,
                  fontWeight: "bold",
                  color: "#2E2E2E",
                  lineHeight: 22,
                }}
              >
                "{quote}"
              </Text>

              <Text
                style={{
                  marginTop: 6,
                  fontSize: 13,
                  color: "#4F7C6B",
                  fontWeight: "600",
                }}
              >
                – {author}
              </Text>
            </>
          )}

          <Pressable
            onPress={fetchQuote}
            style={{
              marginTop: 12,
              paddingVertical: 9,
              paddingHorizontal: 12,
              borderRadius: 10,
              backgroundColor: "#6A9C89",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#FFFFFF", fontWeight: "700", fontSize: 14 }}>
              New Quote
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}