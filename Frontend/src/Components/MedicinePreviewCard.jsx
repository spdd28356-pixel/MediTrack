import { Link } from "react-router-dom";

const MedicinePreviewCard = ({ medicine, onDelete }) => {
  const {
    _id,
    medicineName,
    dosage,
    mealTiming,
    reminderTimes,
    startDate,
    endDate,
    notes,
    isCompleted,
  } = medicine;

  return (
    <div className="medicine-preview-card">
      <div className="medicine-preview-card__header">
        <div>
          <p className="medicine-card__label">{medicineName}</p>
          <p className="medicine-card__meta">{dosage} • {mealTiming}</p>
        </div>
        <span className={`status-pill status-pill--${isCompleted ? "taken" : "pending"}`}>
          {isCompleted ? "Completed" : "Active"}
        </span>
      </div>

      <div className="medicine-preview-card__body">
        <div className="medicine-field">
          <strong>Reminder Times</strong>
          <p>{reminderTimes?.join(", ") || "None"}</p>
        </div>
        <div className="medicine-field">
          <strong>Start Date</strong>
          <p>{new Date(startDate).toLocaleDateString()}</p>
        </div>
        <div className="medicine-field">
          <strong>End Date</strong>
          <p>{new Date(endDate).toLocaleDateString()}</p>
        </div>
        <div className="medicine-field">
          <strong>Notes</strong>
          <p>{notes || "No notes"}</p>
        </div>
      </div>

      <div className="medicine-preview-card__footer">
        <Link className="button button--secondary" to={`/medicines/${_id}/edit`}>
          Edit
        </Link>
        <button className="button button--secondary" onClick={() => onDelete(medicine)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default MedicinePreviewCard;
