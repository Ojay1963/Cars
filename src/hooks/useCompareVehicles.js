import { useCallback, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "ojay_compare_vehicles";
const MAX_COMPARE = 3;

const readCompare = () => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.slice(0, MAX_COMPARE) : [];
  } catch {
    return [];
  }
};

export default function useCompareVehicles() {
  const [compareIds, setCompareIds] = useState(() => readCompare());

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(compareIds));
  }, [compareIds]);

  const toggleCompare = useCallback((id) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((item) => item !== id);
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, id];
    });
  }, []);

  const clearCompare = useCallback(() => {
    setCompareIds([]);
  }, []);

  const canAdd = useCallback(
    (id) => compareIds.includes(id) || compareIds.length < MAX_COMPARE,
    [compareIds]
  );

  const compareCount = useMemo(() => compareIds.length, [compareIds.length]);

  return {
    compareIds,
    compareCount,
    canAdd,
    toggleCompare,
    clearCompare
  };
}
