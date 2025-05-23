import { useState, useEffect } from "react";

export default function useGistsByPage(page) {
  const [gists, setGists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGists = async () => {
      try {
        const res = await fetch(`https://api.github.com/gists?page=${page}`);
        if (!res.ok) {
          throw new Error("Error: ", `${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        setGists(data);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGists();
  }, [page]);

  return { gists, loading, error };
}
