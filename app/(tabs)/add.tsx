import React, { useState } from "react";
import { Pressable, Text, TextInput, View, Keyboard } from "react-native";
import { router } from "expo-router";
import { useChores } from "../lib/ChoresContext";

export default function AddChoreScreen() {
  const { addChore } = useChores();
  const [text, setText] = useState("");

  function handleAdd() {
    if (!text.trim()) return;

    addChore(text);
    setText("");
    Keyboard.dismiss();
    router.replace("/");
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#F4F6F4", padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "700", color: "#2E2E2E" }}>
        Add a Chore
      </Text>

      <Text style={{ marginTop: 8, fontSize: 16, color: "#2E2E2E" }}>
        Keep it small.
      </Text>

      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Example: Wipe sink (3 min)"
        style={{
          marginTop: 20,
          borderWidth: 1,
          borderColor: "#D8E2DC",
          borderRadius: 12,
          padding: 12,
          fontSize: 16,
          backgroundColor: "#FFFFFF",
        }}
      />

      <Pressable
        onPress={handleAdd}
        style={{
          marginTop: 14,
          backgroundColor: "#6A9C89",
          padding: 14,
          borderRadius: 12,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#FFFFFF", fontWeight: "700" }}>
          Add to List
        </Text>
      </Pressable>
    </View>
  );
}