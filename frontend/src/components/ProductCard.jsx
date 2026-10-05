import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const addCart = (e) => {
    e.stopPropagation();

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const exists = cart.find((item) => item.id === product.id);

    if (!exists) {
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
    }

    alert("Product added to cart!");
  };

  return (
    <div
      className="card"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <img
  src={product.image}
  alt={product.name}
  style={{
    width: "100%",
    height: "220px",
    objectFit: "cover",
    borderRadius: "8px",
  }}
/>
      <h2>{product.name}</h2>

      <h3 style={{ color: "#2563eb" }}>
        ₹{product.price}
      </h3>

      <p style={{ color: "gold", fontSize: "20px" }}>
        ⭐⭐⭐⭐☆
      </p>

      <button onClick={addCart}>
        🛒 Add To Cart
      </button>
    </div>
  );
}

export default ProductCard;