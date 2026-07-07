const MedicineCard = ({ medicine, onTaken, onMissed, processing }) => {
  const { medicineName, dosage, reminderTime, mealTiming, status } = medicine;
  const isPending = status === "Pending";

  return (
    <div className="medicine-card">
      <div className="medicine-card__head">
        <div>
          <p className="medicine-card__label">{medicineName}</p>
          <p className="medicine-card__meta">{dosage} • {mealTiming}</p>
        </div>
        <div className={`status-pill status-pill--${status.toLowerCase()}`}>
          {status}
        </div>
      </div>
      <div className="medicine-card__body">
        <div>
          <p className="medicine-card__time">{reminderTime}</p>
          <p className="medicine-card__subtext">Scheduled time</p>
        </div>
        <div className="medicine-card__actions">
          <button
            type="button"
            className="button button--secondary"
            onClick={() => onTaken(medicine)}
            disabled={!isPending || processing}
          >
            Mark as Taken
          </button>
          <button
            type="button"
            className="button button--secondary"
            onClick={() => onMissed(medicine)}
            disabled={!isPending || processing}
          >
            Mark as Missed
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicineCard;
