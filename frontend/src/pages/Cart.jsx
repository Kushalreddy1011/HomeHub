import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const removeItem = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price),
    0
  );

  return (
    <div style={{ padding: "30px" }}>
      <h1>🛒 Shopping Cart</h1>

      {cart.length === 0 ? (
        <h2>Your cart is empty</h2>
      ) : (
        <>
          {cart.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                gap: "20px",
                marginBottom: "20px",
                background: "#fff",
                padding: "15px",
                borderRadius: "10px",
                boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
                alignItems: "center",
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                width="120"
                height="120"
                style={{
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />

              <div style={{ flex: 1 }}>
                <h2>{item.name}</h2>

                <p
                  style={{
                    color: "#2563eb",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  ₹{item.price}
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "10px",
                  }}
                >
                  <button
                    onClick={() => removeItem(index)}
                    style={{
                      background: "red",
                      color: "white",
                      border: "none",
                      padding: "10px 20px",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Remove
                  </button>

                  <button
                    onClick={() =>
                      navigate("/checkout", {
                        state: {
                          product: item,
                        },
                      })
                    }
                    style={{
                      background: "#16a34a",
                      color: "white",
                      border: "none",
                      padding: "10px 20px",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          ))}

          <hr />

          <h2 style={{ marginTop: "20px" }}>
            Total: ₹{total}
          </h2>

          <button
            onClick={() => navigate("/checkout")}
            style={{
              marginTop: "20px",
              background: "#2563eb",
              color: "white",
              border: "none",
              padding: "15px 35px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Proceed To Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;