import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function SignIn({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    const users = JSON.parse(localStorage.getItem("users")) || {};
    if (users[username] && users[username] === password) {
      setUser(username);
      navigate("/todo");
    } else {
      alert("Invalid username or password");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign In</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={styles.input}
      />
      <button type="submit" style={styles.button}>
        Sign In
      </button>
      <p style={styles.text}>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    background: "rgba(255, 255, 255, 0.8)",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  input: {
    margin: "10px 0",
    padding: "10px",
    width: "100%",
    maxWidth: "300px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 20px",
    margin: "10px 0",
    border: "none",
    borderRadius: "4px",
    background: "#007bff",
    color: "white",
    cursor: "pointer",
  },
  text: {
    marginTop: "10px",
  },
};
export default SignIn;
