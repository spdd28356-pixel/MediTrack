import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axiosConfig.js";

const initialState = {
  medicineName: "",
  dosage: "",
  mealTiming: "After Food",
  reminderTimes: "",
  startDate: "",
  endDate: "",
  notes: "",
  isCompleted: false,
};

const AddEditMedicine = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    api
      .get(`/medicines/${id}`)
      .then((response) => {
        const data = response.data.medicine || response.data;
        setFormData({
          medicineName: data.medicineName || "",
          dosage: data.dosage || "",
          mealTiming: data.mealTiming || "After Food",
          reminderTimes: (data.reminderTimes || []).join(", "),
          startDate: data.startDate ? data.startDate.slice(0, 10) : "",
          endDate: data.endDate ? data.endDate.slice(0, 10) : "",
          notes: data.notes || "",
          isCompleted: data.isCompleted || false,
        });
      })
      .catch((err) => setError(err.response?.data?.message || "Unable to load medicine."))
      .finally(() => setLoading(false));
  }, [id]);

  const reminderList = useMemo(
    () => formData.reminderTimes.split(",").map((time) => time.trim()).filter(Boolean),
    [formData.reminderTimes]
  );

  const validate = () => {
    if (!formData.medicineName.trim()) return "Medicine name is required.";
    if (!formData.dosage.trim()) return "Dosage is required.";
    if (!reminderList.length) return "At least one reminder time is required.";
    if (!formData.startDate) return "Start date is required.";
    if (!formData.endDate) return "End date is required.";
    if (new Date(formData.startDate) > new Date(formData.endDate)) return "End date must be after start date.";
    return null;
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const nextValue = type === "checkbox" ? checked : value;
    setFormData((current) => ({ ...current, [name]: nextValue }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    const payload = {
      medicineName: formData.medicineName,
      dosage: formData.dosage,
      mealTiming: formData.mealTiming,
      reminderTimes: reminderList,
      startDate: formData.startDate,
      endDate: formData.endDate,
      notes: formData.notes,
      isCompleted: formData.isCompleted,
    };

    try {
      if (id) {
        await api.put(`/medicines/${id}`, payload);
        setSuccess("Medicine updated successfully.");
      } else {
        await api.post("/medicines", payload);
        setSuccess("Medicine added successfully.");
        setFormData(initialState);
      }
      setTimeout(() => navigate("/medicines"), 1200);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to save medicine.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-container medicine-form-page">
      <div className="page-header">
        <div>
          <h1>{id ? "Edit Medicine" : "Add Medicine"}</h1>
          <p className="section-subtitle">Enter the medication details below.</p>
        </div>
      </div>
      <div className="card">
        <form className="medicine-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="medicineName">Medicine Name</label>
              <input id="medicineName" name="medicineName" value={formData.medicineName} onChange={handleChange} required />
            </div>
            <div className="form-field">
              <label htmlFor="dosage">Dosage</label>
              <input id="dosage" name="dosage" value={formData.dosage} onChange={handleChange} required />
            </div>
            <div className="form-field">
              <label htmlFor="mealTiming">Meal Timing</label>
              <select id="mealTiming" name="mealTiming" value={formData.mealTiming} onChange={handleChange}>
                <option>Before Food</option>
                <option>After Food</option>
                <option>With Food</option>
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="reminderTimes">Reminder Times</label>
              <input
                id="reminderTimes"
                name="reminderTimes"
                value={formData.reminderTimes}
                onChange={handleChange}
                placeholder="08:00, 12:00, 20:00"
              />
            </div>
            <div className="form-field">
              <label htmlFor="startDate">Start Date</label>
              <input id="startDate" name="startDate" type="date" value={formData.startDate} onChange={handleChange} required />
            </div>
            <div className="form-field">
              <label htmlFor="endDate">End Date</label>
              <input id="endDate" name="endDate" type="date" value={formData.endDate} onChange={handleChange} required />
            </div>
            <div className="form-field form-field--full">
              <label htmlFor="notes">Notes</label>
              <textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} rows={4} />
            </div>
          </div>

          <div className="form-actions">
            <button className="button button--primary" type="submit" disabled={loading}>
              {loading ? "Saving..." : id ? "Update Medicine" : "Create Medicine"}
            </button>
          </div>

          {error && <p className="form-error">{error}</p>}
          {success && <p className="form-success">{success}</p>}
        </form>
      </div>
    </main>
  );
};

export default AddEditMedicine;
