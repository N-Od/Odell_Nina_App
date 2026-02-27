import React, { createContext, useContext, useMemo, useState } from "react";

export type Chore = {
  id: string;
  title: string;
  done: boolean;
};

type ChoresContextValue = {
  chores: Chore[];
  addChore: (title: string) => void;
  toggleChore: (id: string) => void;
  deleteChore: (id: string) => void;
};

const ChoresContext = createContext<ChoresContextValue | null>(null);

export function ChoresProvider({ children }: { children: React.ReactNode }) {
  const [chores, setChores] = useState<Chore[]>([
    { id: "1", title: "Dishes (5 min)", done: false },
    { id: "2", title: "Trash", done: false },
    { id: "3", title: "Wipe counters", done: false },
  ]);

  function addChore(title: string) {
    const trimmed = title.trim();
    if (!trimmed) return;

    setChores((prev) => [
      ...prev,
      { id: String(Date.now()), title: trimmed, done: false },
    ]);
  }

  function toggleChore(id: string) {
    setChores((prev) =>
      prev.map((c) => (c.id === id ? { ...c, done: !c.done } : c))
    );
  }

  function deleteChore(id: string) {
    setChores((prev) => prev.filter((c) => c.id !== id));
  }

  const value = useMemo(
    () => ({ chores, addChore, toggleChore, deleteChore }),
    [chores]
  );

  return <ChoresContext.Provider value={value}>{children}</ChoresContext.Provider>;
}

export function useChores() {
  const ctx = useContext(ChoresContext);
  if (!ctx) throw new Error("useChores must be used inside ChoresProvider");
  return ctx;
}