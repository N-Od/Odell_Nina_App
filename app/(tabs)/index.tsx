import React, { useMemo } from "react";
import { Pressable, Text, View } from "react-native";
import { useChores } from "../lib/ChoresContext";

export default function HomeScreen() {
  const { chores, toggleChore, deleteChore } = useChores();

  const doneCount = useMemo(() => chores.filter((c) => c.done).length, [chores]);
  const totalCount = chores.length;

  return (
    <View style={{ flex: 1, backgroundColor: "#E3F0EA", padding: 20 }}>
      <Text style={{ fontSize: 28, fontWeight: "700", color: "#2E2E2E" }}>
        Start Small
      </Text>

      <Text style={{ marginTop: 8, fontSize: 16, color: "#2E2E2E" }}>
        Tap a chore to check it off.
      </Text>

      {/* Today's Progress placard */}
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
        <Text style={{ fontSize: 16, fontWeight: "600", color: "#2E2E2E" }}>
          Today’s Progress
        </Text>

        <Text style={{ marginTop: 6, fontSize: 16, color: "#4F7C6B" }}>
          {doneCount} of {totalCount} chores done
        </Text>

        <Text style={{ marginTop: 6, fontSize: 14, color: "#2E2E2E" }}>
          Tip: start with the easiest chore to build momentum.
        </Text>
      </View>

      {/* Chore list placards */}
      <View style={{ marginTop: 18 }}>
        {chores.map((chore) => (
          <View
            key={chore.id}
            style={{
              borderWidth: 3,
              borderColor: "#4F7C6B",
              borderRadius: 14,
              marginBottom: 14,
              padding: 16,
              backgroundColor: "#EAF3FA",
              opacity: chore.done ? 0.6 : 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <Pressable onPress={() => toggleChore(chore.id)} style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, color: "#2E2E2E", fontWeight: "600" }}>
                  {chore.done ? "✅ " : "⬜️ "}
                  {chore.title}
                </Text>

                <Text style={{ marginTop: 4, fontSize: 13, color: "#2E2E2E" }}>
                  Tap to mark {chore.done ? "not done" : "done"}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => deleteChore(chore.id)}
                style={{
                  alignSelf: "center",
                  paddingVertical: 8,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: "#4F7C6B",
                  backgroundColor: "#FFFFFF",
                }}
              >
                <Text style={{ color: "#4F7C6B", fontWeight: "700" }}>Delete</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </View>

      {/* Optional calm completion message */}
      {totalCount > 0 && doneCount === totalCount ? (
        <View
          style={{
            marginTop: 6,
            padding: 16,
            borderRadius: 14,
            borderWidth: 3,
            borderColor: "#4F7C6B",
            backgroundColor: "#EAF3FA",
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "700", color: "#2E2E2E" }}>
            All done for today. Nice work.
          </Text>
        </View>
      ) : null}
    </View>
  );
}