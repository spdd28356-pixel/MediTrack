import { useEffect, useMemo, useState } from "react";
import api from "../api/axiosConfig.js";
import HistoryTable from "../Components/HistoryTable.jsx";
import Loader from "../Components/Loader.jsx";

const History = () => {
  const [history, setHistory] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    api
      .get("/dashboard/history")
      .then((response) => {
        setHistory(response.data?.history || []);
      })
      .catch((err) => setError(err.response?.data?.message || "Unable to load history"))
      .finally(() => setLoading(false));
  }, []);

  const filteredHistory = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return history
      .filter((row) => row.medicineName.toLowerCase().includes(normalizedQuery))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [history, query]);

  return (
    <main className="page-container history-page">
      <div className="page-header">
        <div>
          <h1>History</h1>
          <p className="section-subtitle">Review medication status and timeline.</p>
        </div>
        <div className="search-group">
          <label htmlFor="search-history" className="sr-only">
            Search medicines
          </label>
          <input
            id="search-history"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by medicine"
          />
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <div className="placeholder-block">{error}</div>
      ) : filteredHistory.length === 0 ? (
        <div className="placeholder-block">No history records found.</div>
      ) : (
        <div className="card">
          <HistoryTable rows={filteredHistory} />
        </div>
      )}
    </main>
  );
};

export default History;
