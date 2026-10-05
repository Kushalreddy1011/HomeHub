import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {

  const logoutUser = async () => {
  try {
    await fetch("http://127.0.0.1:8000/api/accounts/logout/", {
      method: "POST",
    });
  } catch (e) {
    console.log(e);
  }

  localStorage.removeItem("username");
  navigate("/login");
};
   const [search, setSearch] = useState("");
  const navigate = useNavigate();


  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        🏠 HomeHub
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/?category=Furniture">Furniture</Link>
        <Link to="/?category=Kitchen">Kitchen</Link>
        <Link to="/?category=Electronics">Electronics</Link>
      </div>

      <input
      className="search"
      type="text"
      placeholder="Search products..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          navigate(`/?search=${encodeURIComponent(search)}`);
        }
      }}
    />

      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
  <Link to="/cart" className="cartbtn">
    🛒 Cart
  </Link>

  <button
    onClick={logoutUser}
    style={{
      background: "#5F259F",
      color: "white",
      border: "none",
      padding: "8px 15px",
      borderRadius: "6px",
      cursor: "pointer",
    }}
  >
    Logout
  </button>
</div>
    </nav>
  );
}

export default Navbar;