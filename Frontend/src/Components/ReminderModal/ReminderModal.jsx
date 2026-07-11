import "./ReminderModal.css";
import { useReminder } from "../../context/ReminderContext";

const ReminderModal = () => {
  const context = useReminder();
  const {
    showReminder,
    currentReminders,
    closeReminder,
    acknowledgeReminder,
    reminderActionHandler,
  } = context || {};

  if (!showReminder || !currentReminders.length) return null;

  const handleAction = async (medicine, type) => {
    if (reminderActionHandler) {
      await reminderActionHandler(medicine, type);
    }

    if (currentReminders.length <= 1) {
      closeReminder();
      return;
    }

    acknowledgeReminder(medicine);
  };

  return (
    <div className="reminder-overlay">
      <div className="reminder-card">
        <div className="reminder-card__header">
          <div className="reminder-card__icon">
            <span className="material-symbols-outlined">notifications_active</span>
          </div>
          <div>
            <h2>Medicine Reminder</h2>
            <p className="reminder-card__subtitle">
              {currentReminders.length} medicine{currentReminders.length > 1 ? "s" : ""} due now.
            </p>
          </div>
        </div>

        <div className="reminder-list">
          {currentReminders.map((medicine) => (
            <div key={`${medicine.medicineId}-${medicine.reminderTime}`} className="reminder-item">
              <div className="reminder-item__details">
                <p>
                  <strong>Medicine:</strong> {medicine.medicineName}
                </p>
                <p>
                  <strong>Dosage:</strong> {medicine.dosage}
                </p>
                <p>
                  <strong>Meal:</strong> {medicine.mealTiming}
                </p>
                <p>
                  <strong>Note:</strong> {medicine.notes || "No notes"}
                </p>
                <p>
                  <strong>Time:</strong> {medicine.reminderTime}
                </p>
              </div>
              <div className="reminder-item__actions">
                <button
                  type="button"
                  className="reminder-button reminder-button--taken"
                  onClick={() => handleAction(medicine, "taken")}
                >
                  Taken
                </button>
                <button
                  type="button"
                  className="reminder-button reminder-button--missed"
                  onClick={() => handleAction(medicine, "missed")}
                >
                  Missed
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="reminder-card__footer">
          <button type="button" className="button button--secondary" onClick={closeReminder}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReminderModal;