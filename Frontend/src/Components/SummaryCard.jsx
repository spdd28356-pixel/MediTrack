const SummaryCard = ({ title, value, detail, accent }) => {
  return (
    <div className={`summary-card ${accent ? `summary-card--${accent}` : ""}`}>
      <div className="summary-card__top">
        <p className="summary-card__title">{title}</p>
        <span className="summary-card__value">{value}</span>
      </div>
      {detail && <p className="summary-card__detail">{detail}</p>}
    </div>
  );
};

export default SummaryCard;
