import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:8000/api/accounts/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();

    if (data.success) {
      localStorage.setItem("username", data.username);
      alert("Login Successful");
      navigate("/");
    } else {
      alert(data.message);
    }
  };

  return (
    <div
      style={{
        width: "400px",
        margin: "60px auto",
        padding: "30px",
        border: "1px solid #ddd",
        borderRadius: "10px",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Login</h2>

      <form onSubmit={loginUser}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>

      <p style={{ textAlign: "center", marginTop: "20px" }}>
        Don't have an account?{" "}
        <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;