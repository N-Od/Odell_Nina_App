import React, { useState } from "react";
import {
  Pressable,
  Text,
  TextInput,
  ScrollView,
  View,
  Keyboard,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { useChores } from "../../lib/ChoresContext";

const cardShadow = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
};

export default function AddChoreScreen() {
  const { addChore } = useChores();
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");

  async function handleAdd() {
    if (!text.trim()) {
      setMessage("Please enter a chore before adding it.");
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      return;
    }

    addChore(text);
    setText("");
    setMessage("");
    Keyboard.dismiss();

    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    router.replace("/");
  }

  return (
    <LinearGradient colors={["#DFF1E7", "#D8ECF8"]} style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 14, paddingBottom: 140 }}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={{ fontSize: 26, fontWeight: "700", color: "#2E2E2E" }}>
          Add a Chore
        </Text>

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
          <Text style={{ fontSize: 15, lineHeight: 22, color: "#2E2E2E" }}>
            Add one small task at a time. Keeping chores short and manageable
            makes it easier to start.
          </Text>
        </View>

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
              fontSize: 16,
              fontWeight: "700",
              color: "#2E2E2E",
              marginBottom: 10,
            }}
          >
            ✍️ Chore Name
          </Text>

          <TextInput
            value={text}
            onChangeText={(value) => {
              setText(value);
              if (message) setMessage("");
            }}
            placeholder="Example: Wipe sink (3 min)"
            placeholderTextColor="#666666"
            style={{
              borderWidth: 2,
              borderColor: "#4F7C6B",
              borderRadius: 10,
              paddingVertical: 12,
              paddingHorizontal: 12,
              fontSize: 15,
              backgroundColor: "#FFFFFF",
              color: "#2E2E2E",
              minHeight: 48,
              cursor: "text",
            }}
            multiline={false}
            returnKeyType="default"
            blurOnSubmit={false}
          />

          {message ? (
            <Text
              style={{
                marginTop: 10,
                fontSize: 13,
                color: "#8A3A3A",
                fontWeight: "600",
              }}
            >
              {message}
            </Text>
          ) : (
            <Text
              style={{
                marginTop: 10,
                fontSize: 13,
                color: "#2E2E2E",
              }}
            >
              Try to keep it simple and specific.
            </Text>
          )}
        </View>

        <View style={{ marginTop: 28, marginBottom: 40 }}>
          <Pressable
            onPress={() => {
              Keyboard.dismiss();
              handleAdd();
            }}
            style={{
              paddingVertical: 12,
              paddingHorizontal: 12,
              borderRadius: 10,
              backgroundColor: "#6A9C89",
              alignItems: "center",
              cursor: "pointer",
              ...cardShadow,
            }}
          >
            <Text style={{ color: "#FFFFFF", fontWeight: "700", fontSize: 14 }}>
              Add to List
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}