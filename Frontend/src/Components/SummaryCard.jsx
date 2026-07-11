const iconMap = {
  primary: "inventory_2",
  success: "check_circle",
  danger: "error",
  muted: "calendar_today",
};

const SummaryCard = ({ title, value, detail, accent }) => {
  return (
    <div className={`summary-card ${accent ? `summary-card--${accent}` : ""}`}>
      <div className="summary-card__top">
        <p className="summary-card__title">{title}</p>
        <span className="summary-card__value">{value}</span>
      </div>
      {detail && <p className="summary-card__detail">{detail}</p>}
      <span className="material-symbols-outlined" aria-hidden="true">
        {iconMap[accent] || "insights"}
      </span>
    </div>
  );
};

export default SummaryCard;
