import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axiosConfig.js";
import Loader from "../Components/Loader.jsx";
import MedicinePreviewCard from "../Components/MedicinePreviewCard.jsx";

const Medicine = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState("");

  const fetchMedicines = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get("/medicines");
      setMedicines(response.data.medicines || response.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load medicines.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const handleDelete = async (medicine) => {
    const confirmed = window.confirm(`Delete ${medicine.medicineName}? This cannot be undone.`);
    if (!confirmed) return;

    setDeletingId(medicine._id);
    setError(null);

    try {
      await api.delete(`/medicines/${medicine._id}`);
      setMedicines((prev) => prev.filter((item) => item._id !== medicine._id));
    } catch (err) {
      setError(err.response?.data?.message || "Unable to delete medicine.");
    } finally {
      setDeletingId("");
    }
  };

  return (
    <main className="page-container">
      <div className="page-header">
        <div>
          <h1>Medicines</h1>
          <p className="section-subtitle">Manage your medication list and schedule reminders.</p>
        </div>
        <Link className="btn-primary" to="/medicines/add">
          Add Medicine
        </Link>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <div className="placeholder-block">{error}</div>
      ) : medicines.length === 0 ? (
        <div className="placeholder-block">
          No medicines yet. Add your first medication to get started.
        </div>
      ) : (
        <div className="medicine-grid">
          {medicines.map((medicine) => (
            <MedicinePreviewCard key={medicine._id} medicine={medicine} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </main>
  );
};

export default Medicine;
