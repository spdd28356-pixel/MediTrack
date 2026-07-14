import Active_med from "../assets/icons/Active_med.png"
import Taken from "../assets/icons/Taken.png"
import Missed from "../assets/icons/Missed.png"
import Today from "../assets/icons/Today.png"
import Pending from "../assets/icons/Pending.png"
const iconMap = {
  primary: Today,
  success: Taken,
  danger: Missed,
  muted: Pending,
};

const SummaryCard = ({ title, value, detail, accent }) => {
  return (
    <div className={`summary-card ${accent ? `summary-card--${accent}` : ""}`}>
      <div className="summary-card__top">
        <p className="summary-card__title">{title}</p>
        <span className="summary-card__value">{value}</span>
      </div>
      {detail && <p className="summary-card__detail">{detail}</p>}
      <span style={{ alignItems:"center", display:"flex", justifyContent:"center"}}>
      <img 
            src={iconMap[accent] || "insights"}              // This reads the path string
            className="nav-icon" 
            style={{ width: "20px", height: "20px"}} 
          />
      </span>

    </div>
  );
};

export default SummaryCard;
