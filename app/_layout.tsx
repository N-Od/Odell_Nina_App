import { Stack } from "expo-router";
import { ChoresProvider } from "../lib/ChoresContext";

export default function RootLayout() {
  return (
    <ChoresProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </ChoresProvider>
  );
}