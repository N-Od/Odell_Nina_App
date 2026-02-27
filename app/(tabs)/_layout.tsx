import { Tabs } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

import { ChoresProvider } from "../lib/ChoresContext";

export default function TabLayout() {
  return (
    <ChoresProvider>
      <Tabs
        screenOptions={{
          headerShown: false,

          tabBarActiveTintColor: "#6A9C89",
          tabBarInactiveTintColor: "#6b6b6b",

          tabBarStyle: {
            backgroundColor: "#FFFFFF",
            borderTopColor: "#4F7C6B",
            borderTopWidth: 2,
          },

          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size ?? 24} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="add"
          options={{
            title: "Add",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="add-circle" size={size ?? 24} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="why"
          options={{
            title: "Momentum",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="sparkles" size={size ?? 24} color={color} />
            ),
          }}
        />
      </Tabs>
    </ChoresProvider>
  );
}