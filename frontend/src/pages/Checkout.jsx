import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Checkout() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery");

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const total = cart.reduce((sum, item) => sum + Number(item.price), 0);

  const placeOrder = async () => {
    if (!fullName || !phone || !address) {
      alert("Please fill all the details.");
      return;
    }

    const order = {
      customer_name: fullName,
      phone: phone,
      address: address,
      total_amount: total,
      payment_status:
        paymentMethod === "PhonePe" ? "Paid" : "Pending",
      items: cart.map((item) => ({
        product: item.id,
        quantity: 1,
        price: item.price,
      })),
    };

    try {
await api.post("orders/", order);

if (paymentMethod === "PhonePe") {
 navigate("/payment", {
  state: {
    total,
    cart,
    customer: fullName,
  },
});
  return;
}
localStorage.removeItem("cart");
navigate("/");
      if (paymentMethod === "PhonePe") {
        const upiId = "9030523441@ibl";
        const merchantName = "HomeHub";
        const note = "HomeHub Purchase";

        const upiLink =
          `upi://pay?pa=${upiId}` +
          `&pn=${encodeURIComponent(merchantName)}` +
          `&tn=${encodeURIComponent(note)}` +
          `&am=${total}` +
          `&cu=INR`;

        window.location.href = upiLink;

        setTimeout(() => {
          localStorage.removeItem("cart");
          navigate("/payment");
        }, 3000);
      } else {
        alert("Order Placed Successfully!");

        localStorage.removeItem("cart");

        navigate("/payment");
      }

    } catch (err) {
      console.log(err.response?.data);
      alert("Failed to place order.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 0 15px rgba(0,0,0,.2)",
        background: "white",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Checkout</h1>

      <input
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "15px",
        }}
      />

      <input
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "15px",
        }}
      />

      <textarea
        placeholder="Delivery Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{
          width: "100%",
          height: "120px",
          padding: "12px",
          marginBottom: "15px",
        }}
      />

      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "20px",
        }}
      >
        <option>Cash On Delivery</option>
        <option>PhonePe</option>
      </select>

      <h2>Total Amount : ₹{total}</h2>

      <button
        onClick={placeOrder}
        style={{
          width: "100%",
          padding: "15px",
          background: "#5f259f",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        {paymentMethod === "PhonePe"
          ? "💜 Pay with PhonePe"
          : "Place Order"}
      </button>
    </div>
  );
}

export default Checkout;