import React, { useEffect, useMemo, useState } from "react";
import {
  Pressable,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useChores } from "../lib/ChoresContext";

export default function HomeScreen() {
  const { chores, toggleChore, deleteChore } = useChores();

  const doneCount = useMemo(() => chores.filter((c) => c.done).length, [chores]);
  const totalCount = chores.length;

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
    <ScrollView
      style={{ flex: 1, backgroundColor: "#E3F0EA" }}
      contentContainerStyle={{ padding: 14, paddingBottom: 24 }}
    >
      <Text style={{ fontSize: 26, fontWeight: "700", color: "#2E2E2E" }}>
        Start Small
      </Text>

      <Text style={{ marginTop: 6, fontSize: 15, color: "#2E2E2E" }}>
        Tap a chore to check it off.
      </Text>

      <View
        style={{
          marginTop: 12,
          padding: 12,
          borderRadius: 12,
          borderWidth: 3,
          borderColor: "#4F7C6B",
          backgroundColor: "#EAF3FA",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "700", color: "#2E2E2E" }}>
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
                fontSize: 14,
                fontStyle: "italic",
                color: "#2E2E2E",
                lineHeight: 20,
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

      <View
        style={{
          marginTop: 12,
          padding: 12,
          borderRadius: 12,
          borderWidth: 3,
          borderColor: "#4F7C6B",
          backgroundColor: "#DFF1E7",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "700", color: "#2E2E2E" }}>
          ✅ Today’s Progress
        </Text>

        <Text style={{ marginTop: 6, fontSize: 15, color: "#4F7C6B" }}>
          {doneCount} of {totalCount} chores done
        </Text>

        <Text style={{ marginTop: 6, fontSize: 13, color: "#2E2E2E" }}>
          Tip: start with the easiest chore to build momentum.
        </Text>
      </View>

      <View style={{ marginTop: 12 }}>
        <Text
          style={{
            marginBottom: 8,
            fontSize: 16,
            fontWeight: "700",
            color: "#2E2E2E",
          }}
        >
          🌿 Today’s Chores
        </Text>

        {chores.map((chore) => (
          <View
            key={chore.id}
            style={{
              borderWidth: 3,
              borderColor: "#4F7C6B",
              borderRadius: 12,
              marginBottom: 10,
              padding: 12,
              backgroundColor: "#EAF3FA",
              opacity: chore.done ? 0.6 : 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              <Pressable onPress={() => toggleChore(chore.id)} style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 15,
                    color: "#2E2E2E",
                    fontWeight: "600",
                  }}
                >
                  {chore.done ? "✅ " : "⬜️ "}
                  {chore.title}
                </Text>

                <Text style={{ marginTop: 4, fontSize: 12, color: "#2E2E2E" }}>
                  Tap to mark {chore.done ? "not done" : "done"}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => deleteChore(chore.id)}
                style={{
                  alignSelf: "center",
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                  borderRadius: 8,
                  borderWidth: 2,
                  borderColor: "#4F7C6B",
                  backgroundColor: "#FFFFFF",
                }}
              >
                <Text style={{ color: "#4F7C6B", fontWeight: "700", fontSize: 13 }}>
                  Delete
                </Text>
              </Pressable>
            </View>
          </View>
        ))}
      </View>

      {totalCount > 0 && doneCount === totalCount ? (
        <View
          style={{
            marginTop: 4,
            padding: 12,
            borderRadius: 12,
            borderWidth: 3,
            borderColor: "#4F7C6B",
            backgroundColor: "#DFF1E7",
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "700", color: "#2E2E2E" }}>
            All done for today. Nice work.
          </Text>
        </View>
      ) : null}
    </ScrollView>
  );
}