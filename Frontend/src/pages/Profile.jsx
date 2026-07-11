import { useMemo } from "react";
import { useAuth } from "../context/AuthContext.jsx";

const Profile = () => {
  const { user, logout } = useAuth();

  const profileInitials = useMemo(() => {
    if (!user?.fullName) return "U";
    return user.fullName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join("");
  }, [user]);

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "-";

  return (
    <main className="page-container profile-page">
      <div className="page-header">
        <div>
          <h1>Profile</h1>
          <p className="section-subtitle">Your account details and profile summary.</p>
        </div>
      </div>

      <div className="profile-grid">
        <section className="profile-card card">
          <div className="profile-banner" />

          <div className="profile-avatar">
            {user?.profileImage ? (
              <img src={user.profileImage} alt={user.fullName} />
            ) : (
              <span>{profileInitials}</span>
            )}
          </div>

          <div className="profile-body">
            <h2>{user?.fullName || "Unknown User"}</h2>
            <p className="profile-email">{user?.email || "No email available"}</p>

            <div className="profile-actions">
              <button type="button" className="button button--primary">
                Edit Profile
              </button>
              <button type="button" className="button button--secondary" onClick={logout}>
                Logout
              </button>
            </div>
          </div>
        </section>

        <section className="account-card card">
          <div className="section-block__header">
            <div>
              <h2>Account Information</h2>
              <p className="section-subtitle">Review your email, account status, and membership details.</p>
            </div>
          </div>

          <div className="account-details">
            <div className="account-row">
              <span>Full Name</span>
              <strong>{user?.fullName || "-"}</strong>
            </div>
            <div className="account-row">
              <span>Email</span>
              <strong>{user?.email || "-"}</strong>
            </div>
            <div className="account-row">
              <span>Member Since</span>
              <strong>{memberSince}</strong>
            </div>
            <div className="account-row">
              <span>Account Type</span>
              <strong>Standard User</strong>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Profile;

