const HistoryTable = ({ rows }) => {
  return (
    <div className="table-wrapper">
      <table className="table history-table">
        <thead>
          <tr>
            <th>Medicine Name</th>
            <th>Dosage</th>
            <th>Meal Timing</th>
            <th>Date</th>
            <th>Reminder Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.logId}>
              <td>{row.medicineName}</td>
              <td>{row.dosage}</td>
              <td>{row.mealTiming}</td>
              <td>{new Date(row.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td>
              <td>{row.reminderTime}</td>
              <td>
                <span className={`badge badge--${row.status === "Taken" ? "success" : "danger"}`}>
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;
