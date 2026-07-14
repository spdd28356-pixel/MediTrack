import { useCallback, useEffect, useMemo, useState } from "react";
import api from "../api/axiosConfig.js";
import SummaryCard from "../Components/SummaryCard.jsx";
import MedicineCard from "../Components/MedicineCard.jsx";
import Loader from "../Components/Loader.jsx";
import { useReminder } from "../context/ReminderContext.jsx";
import { startReminderService } from "../services/reminderservices.jsx";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [todayMedicines, setTodayMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");
  const [error, setError] = useState(null);
  const [actionError, setActionError] = useState(null);

  const fetchDashboard = async () => {
    setLoading(true);
    setError(null);
    try {
      const [summaryResponse, todayResponse] = await Promise.all([
        api.get("/dashboard"),
        api.get("/dashboard/today"),
      ]);

      setSummary(summaryResponse.data.summary || summaryResponse.data?.summary);
      setTodayMedicines(todayResponse.data.todayMedicines || []);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load dashboard.");
    } finally {
      setLoading(false);
    }
  };

  const { openReminder, registerReminderActionHandler } = useReminder();

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleStatusUpdate = useCallback(async (medicine, type) => {
    setActionError(null);
    setActionLoading(`${medicine.medicineId}-${medicine.reminderTime}-${type}`);

    try {
      await api.patch(`/medicine-log/${medicine.medicineId}/${type}`, {
        reminderTime: medicine.reminderTime,
      });

      setTodayMedicines((prev) =>
        prev.map((item) =>
          item.medicineId === medicine.medicineId && item.reminderTime === medicine.reminderTime
            ? { ...item, status: type === "taken" ? "Taken" : "Missed" }
            : item
        )
      );
    } catch (err) {
      setActionError(err.response?.data?.message || `Unable to mark ${type}.`);
    } finally {
      setActionLoading("");
    }
  }, []);

  useEffect(() => {
    registerReminderActionHandler(handleStatusUpdate);
  }, [handleStatusUpdate, registerReminderActionHandler]);

  useEffect(() => {
    if (!todayMedicines.length) return;

    const intervalId = startReminderService(todayMedicines, openReminder);
    return () => clearInterval(intervalId);
  }, [todayMedicines, openReminder]);

  const now = useMemo(() => new Date(), []);

  const upcomingMedicines = useMemo(() => {
    return todayMedicines
      .filter((medicine) => medicine.status === "Pending")
      .filter((medicine) => medicine.reminderTime >= now.toTimeString().slice(0, 5))
      .sort((a, b) => a.reminderTime.localeCompare(b.reminderTime));
  }, [todayMedicines, now]);

  const schedule = useMemo(() => {
    return [...todayMedicines].sort((a, b) => a.reminderTime.localeCompare(b.reminderTime));
  }, [todayMedicines]);

  const todayLabel = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="page-container dashboard-page">
      <section className="dashboard-header">
        <div>
          <p className="section-subtitle">{getGreeting()},</p>
          <h1 className="section-title">Welcome back to MediTrack</h1>
          <p className="section-meta">{todayLabel}</p>
        </div>
        <button className="button button--primary" type="button" onClick={fetchDashboard}>
          Refresh
        </button>
      </section>

      {loading ? (
        <div className="surface-card">
          <Loader />
        </div>
      ) : (
        <>
          {error && <p className="form-error">{error}</p>}
          <section className="dashboard-grid">
            <SummaryCard title="Today's Medicines" value={summary?.total ?? 0} detail="Scheduled for today" accent="primary" />
            <SummaryCard title="Taken" value={summary?.taken ?? 0} detail="Completed doses" accent="success" />
            <SummaryCard title="Missed" value={summary?.missed ?? 0} detail="Missed doses" accent="danger" />
            <SummaryCard title="Pending" value={Math.max(0, summary?.pending ?? 0)} detail="Pending reminders" accent="muted" />
          </section>

          <section className="section-block">
            <div className="section-block__header">
              <div>
                <h2 className="section-title">Today's Schedule</h2>
                <p className="section-subtitle">Track the reminders scheduled for today.</p>
              </div>
              <span className="section-badge">{schedule.length} items</span>
            </div>

            {schedule.length ? (
              <div className="medicine-list">
                {schedule.map((medicine) => (
                  <MedicineCard
                    key={`${medicine.medicineId}-${medicine.reminderTime}`}
                    medicine={medicine}
                    onTaken={() => handleStatusUpdate(medicine, "taken")}
                    onMissed={() => handleStatusUpdate(medicine, "missed")}
                    processing={actionLoading === `${medicine.medicineId}-${medicine.reminderTime}-taken` || actionLoading === `${medicine.medicineId}-${medicine.reminderTime}-missed`}
                  />
                ))}
              </div>
            ) : (
              <div className="placeholder-block">No medicines are scheduled for today.</div>
            )}
          </section>

          <section className="section-block">
            <div className="section-block__header">
              <div>
                <h2 className="section-title">Upcoming Medicines</h2>
                <p className="section-subtitle">Next items in your schedule.</p>
              </div>
              <span className="section-badge">{upcomingMedicines.length} upcoming</span>
            </div>

            {upcomingMedicines.length ? (
              <div className="medicine-list">
                {upcomingMedicines.map((medicine) => (
                  <MedicineCard
                    key={`${medicine.medicineId}-${medicine.reminderTime}-upcoming`}
                    medicine={medicine}
                    onTaken={() => handleStatusUpdate(medicine, "taken")}
                    onMissed={() => handleStatusUpdate(medicine, "missed")}
                    processing={actionLoading === `${medicine.medicineId}-${medicine.reminderTime}-taken` || actionLoading === `${medicine.medicineId}-${medicine.reminderTime}-missed`}
                  />
                ))}
              </div>
            ) : (
              <div className="placeholder-block">No upcoming medicines left for today.</div>
            )}
          </section>

          {actionError && <p className="form-error">{actionError}</p>}
        </>
      )}
    </main>
  );
};

export default Dashboard;

