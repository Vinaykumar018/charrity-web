// src/components/hooks/useEvents.js
import { useState, useEffect } from "react";
import { api } from "../../Api";

export default function useEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getEvents()
      .then(setEvents)
      .finally(() => setLoading(false));
  }, []);

  return { events, loading };
}