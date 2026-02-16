import { useCallback, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "ojay_saved_vehicles";

const readSaved = () => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export default function useSavedVehicles() {
  const [savedIds, setSavedIds] = useState(() => readSaved());

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(savedIds));
  }, [savedIds]);

  const toggleSaved = useCallback((id) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((savedId) => savedId !== id) : [...prev, id]
    );
  }, []);

  const clearSaved = useCallback(() => {
    setSavedIds([]);
  }, []);

  const isSaved = useCallback((id) => savedIds.includes(id), [savedIds]);
  const savedCount = useMemo(() => savedIds.length, [savedIds.length]);

  return {
    savedIds,
    savedCount,
    isSaved,
    toggleSaved,
    clearSaved
  };
}
