import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="page-container">
      <div className="card">
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
