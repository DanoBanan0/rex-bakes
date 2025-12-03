import { useState, useEffect } from "react";
import { getDesserts } from "../services/dessertService";
import type { Dessert } from "../types";

export function useDesserts() {
  const [desserts, setDesserts] = useState<Dessert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDesserts = async () => {
    try {
      setLoading(true);
      const data = await getDesserts();
      setDesserts(data);
    } catch (err) {
      setError("Failed to load desserts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDesserts();
  }, [])

  return {
    desserts,
    loading,
    error,
    reload: loadDesserts
  };


}