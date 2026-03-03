// src/components/hooks/useBlogs.js
import { useState, useEffect } from "react";
import { api } from "../../Api";

export default function useBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getBlogs()
      .then(setBlogs)
      .finally(() => setLoading(false));
  }, []);

  return { blogs, loading };
}