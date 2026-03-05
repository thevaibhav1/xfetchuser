import { useState } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUserForm = async (e) => {
    e.preventDefault();

    // ✅ Empty validation
    if (!username.trim()) {
      setError("Please enter a GitHub username");
      setUserData(null);
      return;
    }

    setLoading(true);
    setError("");
    setUserData(null);

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);

      if (!response.ok) {
        throw new Error("User not found");
      }

      const data = await response.json();
      setUserData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>GitHub User Finder</h1>

      <form onSubmit={handleUserForm} className="form">
        <input
          type="text"
          name="username"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input"
        />
        <button type="submit" className="button">
          Search
        </button>
      </form>

      {/* ✅ Error Message */}
      {error && <p className="error">{error}</p>}

      {loading && <p>Loading...</p>}

      {userData && (
        <div className="card">
          <img src={userData.avatar_url} alt="avatar" className="avatar" />
          <h2>
            {userData.name || "No Name"} @{userData.login}
          </h2>
          <p>Repos: {userData.public_repos}</p>
          <p>Followers: {userData.followers}</p>
          <p>Following: {userData.following}</p>
        </div>
      )}
    </div>
  );
}

export default App;
