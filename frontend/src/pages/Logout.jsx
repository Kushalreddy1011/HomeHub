import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/accounts/logout/", {
      method: "POST",
    });

    localStorage.removeItem("username");

    setTimeout(() => {
      navigate("/login");
    }, 3000);
  }, []);

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "100px",
      }}
    >
      <h1>🎉 Order Placed Successfully!</h1>

      <h3>Thank you for shopping with us.</h3>

      <p>You have been logged out successfully.</p>

      <p>Redirecting to Login...</p>
    </div>
  );
}

export default Logout;