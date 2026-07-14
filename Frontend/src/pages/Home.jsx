import { Link } from "react-router-dom";
import med_1 from "../assets/images/med_1.png"
import med_2 from "../assets/images/med_2.png"
import med_3 from "../assets/images/med_3.png"
import Plus_sign from "../assets/images/Plus_sign.png"
import steth from "../assets/images/stethoscope.png"


const Home = () => {
  return (
    <main className="Home-page-container">
      <img src={med_1} className="floating top-left" alt="" />
      <img src={steth} className="floating top-right" alt="" />
      <img src={med_2} className="floating bottom-left" alt="" />
      <img src={med_3} className="floating bottom-right" alt="" />
      <img src={Plus_sign} className="floating center-top" />
      <div className="Home-card">
        <h1>Welcome to MediTrack</h1>
        <p>Track your medications, history, and profile with a simple interface.</p>
        <div className="home-actions">
          <Link className="btn-primary" to="/login">
            Login
          </Link>
          <Link className="btn-link" to="/register">
            Register
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Home;
