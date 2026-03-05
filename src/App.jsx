import { useState } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUserForm = async (e) => {
    e.preventDefault();

    if (!username.trim()) return;

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
      <p>Search a GitHub username to see profile details.</p>

      <form onSubmit={handleUserForm} className="form">
        <input
          type="text"
          name="username"
          placeholder="e.g. torvalds, gaearon, octocat"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input"
        />
        <button type="submit" className="button">
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {userData && (
        <div className="card">
          <img src={userData.avatar_url} alt="avatar" className="avatar" />

          <h2>
            {userData.name || "No Name"} @{userData.login}
          </h2>

          <div className="stats">
            <span>{userData.public_repos} Repos</span>
            <span>{userData.followers} Followers</span>
            <span>{userData.following} Following</span>
          </div>

          {userData.location && <p>📍 {userData.location}</p>}
          {userData.company && <p>🏢 {userData.company}</p>}

          {userData.blog && (
            <p>
              🔗{" "}
              <a href={userData.blog} target="_blank" rel="noreferrer">
                {userData.blog}
              </a>
            </p>
          )}

          <p>
            👤{" "}
            <a href={userData.html_url} target="_blank" rel="noreferrer">
              View on GitHub
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
