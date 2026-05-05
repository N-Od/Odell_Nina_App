import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  PanResponder,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";

import { useChores } from "../../lib/ChoresContext";
import type { Chore } from "../../lib/ChoresContext";

const cardShadow = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
};

function ChoreCard({
  chore,
  onToggle,
  onDelete,
}: {
  chore: Chore;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 8;
      },

      onPanResponderMove: Animated.event([null, { dx: pan.x }], {
        useNativeDriver: false,
      }),

      onPanResponderRelease: async (_, gestureState) => {
        if (Math.abs(gestureState.dx) > 55) {
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

          Animated.timing(pan, {
            toValue: {
              x: gestureState.dx > 0 ? 500 : -500,
              y: 0,
            },
            duration: 200,
            useNativeDriver: false,
          }).start(() => {
            onDelete(chore.id);
          });

          return;
        }

        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={{
        transform: [{ translateX: pan.x }],
        borderWidth: 3,
        borderColor: "#4F7C6B",
        borderRadius: 12,
        marginBottom: 10,
        padding: 12,
        backgroundColor: "#EAF3FA",
        opacity: chore.done ? 0.6 : 1,
        ...cardShadow,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <Pressable onPress={() => onToggle(chore.id)} style={{ flex: 1 }}>
          <Text style={{ fontSize: 15, color: "#2E2E2E", fontWeight: "600" }}>
            {chore.done ? "✅ " : "⬜️ "}
            {chore.title}
          </Text>

          <Text style={{ marginTop: 4, fontSize: 12, color: "#2E2E2E" }}>
            Tap to mark {chore.done ? "not done" : "done"} or swipe to remove
          </Text>
        </Pressable>

        <Pressable
          onPress={() => onDelete(chore.id)}
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
    </Animated.View>
  );
}

export default function HomeScreen() {
  const { chores, toggleChore, deleteChore, clearCompleted } = useChores();

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

  async function handleToggle(id: string) {
    const chore = chores.find((c) => c.id === id);

    if (chore && !chore.done) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      await Haptics.selectionAsync();
    }

    toggleChore(id);
  }

  async function handleDelete(id: string) {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    deleteChore(id);
  }

  async function handleClearCompleted() {
    if (doneCount === 0) return;

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    clearCompleted();
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
          Start Small
        </Text>

        <Text style={{ marginTop: 6, fontSize: 15, color: "#2E2E2E" }}>
          Tap to complete a chore or swipe to remove it.
        </Text>

        {/* Daily Motivation */}
        <View
          style={{
            marginTop: 12,
            padding: 12,
            borderRadius: 12,
            borderWidth: 3,
            borderColor: "#4F7C6B",
            backgroundColor: "#EAF3FA",
            ...cardShadow,
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

        {/* Today's Progress */}
        <View
          style={{
            marginTop: 12,
            padding: 12,
            borderRadius: 12,
            borderWidth: 3,
            borderColor: "#4F7C6B",
            backgroundColor: "#DFF1E7",
            ...cardShadow,
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

        {/* Chore List */}
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

          {chores.length === 0 ? (
            <View
              style={{
                borderWidth: 3,
                borderColor: "#4F7C6B",
                borderRadius: 12,
                padding: 14,
                backgroundColor: "#EAF3FA",
                ...cardShadow,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "700",
                  color: "#2E2E2E",
                }}
              >
                No chores yet.
              </Text>
              <Text
                style={{
                  marginTop: 6,
                  fontSize: 13,
                  lineHeight: 19,
                  color: "#2E2E2E",
                }}
              >
                Add one small task to get started.
              </Text>
            </View>
          ) : (
            chores.map((chore) => (
              <ChoreCard
                key={chore.id}
                chore={chore}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            ))
          )}

          {doneCount > 0 ? (
            <View style={{ marginTop: 10 }}>
              <Pressable
                onPress={handleClearCompleted}
                style={{
                  paddingVertical: 10,
                  borderRadius: 10,
                  backgroundColor: "#6A9C89",
                  alignItems: "center",
                  ...cardShadow,
                }}
              >
                <Text style={{ color: "#FFFFFF", fontWeight: "700" }}>
                  Clear Completed
                </Text>
              </Pressable>
            </View>
          ) : null}
        </View>

        {totalCount > 0 && doneCount === totalCount ? (
          <View
            style={{
              marginTop: 12,
              padding: 12,
              borderRadius: 12,
              borderWidth: 3,
              borderColor: "#4F7C6B",
              backgroundColor: "#DFF1E7",
              ...cardShadow,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "700",
                color: "#2E2E2E",
              }}
            >
              All done for today. Nice work.
            </Text>
          </View>
        ) : null}
      </ScrollView>
    </LinearGradient>
  );
}