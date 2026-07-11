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

  const takenCount = filteredHistory.filter((row) => row.status === "Taken").length;
  const missedCount = filteredHistory.filter((row) => row.status !== "Taken").length;

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

      <section className="dashboard-grid">
        <div className="summary-card summary-card--primary">
          <div className="summary-card__top">
            <p className="summary-card__title">Total Logs</p>
            <span className="summary-card__value">{filteredHistory.length}</span>
          </div>
          <p className="summary-card__detail">Medication records recovered from your history.</p>
        </div>
        <div className="summary-card summary-card--success">
          <div className="summary-card__top">
            <p className="summary-card__title">Taken</p>
            <span className="summary-card__value">{takenCount}</span>
          </div>
          <p className="summary-card__detail">Completed doses captured in your log.</p>
        </div>
        <div className="summary-card summary-card--danger">
          <div className="summary-card__top">
            <p className="summary-card__title">Missed</p>
            <span className="summary-card__value">{missedCount}</span>
          </div>
          <p className="summary-card__detail">Pending follow-up entries from your history.</p>
        </div>
      </section>

      {loading ? (
        <div className="surface-card">
          <Loader />
        </div>
      ) : error ? (
        <div className="placeholder-block">{error}</div>
      ) : filteredHistory.length === 0 ? (
        <div className="placeholder-block">No history records found.</div>
      ) : (
        <section className="section-block">
          <HistoryTable rows={filteredHistory} />
        </section>
      )}
    </main>
  );
};

export default History;
