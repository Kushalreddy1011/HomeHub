import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();

  const total = location.state?.total || 0;
  const cart = location.state?.cart || [];
  const customer = location.state?.customer || "Customer";

  const [paid, setPaid] = useState(false);

  const downloadInvoice = () => {
    const doc = new jsPDF();

    const invoiceNo = "INV" + Date.now();

    // Header
    doc.setFontSize(22);
    doc.setTextColor(95, 37, 159);
    doc.text("HOMEHUB", 75, 20);

    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text("INVOICE", 85, 32);

    // Customer Details
    doc.setFontSize(12);
    doc.text("Invoice No : " + invoiceNo, 20, 45);
    doc.text("Customer : " + customer, 20, 55);
    doc.text("Date : " + new Date().toLocaleDateString(), 20, 65);

    // Product Table
    const rows = cart.map((item) => [
      item.name || item.title || "Product",
      "1",
      "₹" + item.price,
    ]);

    autoTable(doc, {
      startY: 75,
      head: [["Product", "Qty", "Price"]],
      body: rows,
      theme: "grid",
      headStyles: {
        fillColor: [95, 37, 159],
      },
    });

    const finalY = doc.lastAutoTable.finalY;

    doc.setFontSize(14);

    doc.text("Total Amount : ₹" + total, 20, finalY + 20);

    doc.text("Payment Status : PAID", 20, finalY + 30);

    doc.text(
      "Thank you for shopping with HomeHub!",
      20,
      finalY + 45
    );

    doc.save("HomeHub_Invoice.pdf");
  };

  const completePayment = () => {
    setPaid(true);

    downloadInvoice();

    localStorage.removeItem("cart");

    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  if (paid) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "120px",
        }}
      >
        <h1 style={{ color: "green" }}>
          ✅ Payment Successful
        </h1>

        <h2>Thank you for shopping with HomeHub.</h2>

        <h3>Your order has been placed successfully.</h3>

        <p>📄 Invoice downloaded successfully.</p>

        <p>Redirecting to Home...</p>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "450px",
        margin: "40px auto",
        background: "#fff",
        borderRadius: "15px",
        padding: "30px",
        boxShadow: "0 0 20px rgba(0,0,0,.15)",
        textAlign: "center",
      }}
    >
      <img
        src="https://download.logo.wine/logo/PhonePe/PhonePe-Logo.wine.png"
        alt="PhonePe"
        style={{ width: "180px" }}
      />

      <h2 style={{ color: "#5F259F" }}>
        Pay using PhonePe
      </h2>

      <h1>₹ {total}</h1>

      <h2 style={{ color: "green" }}>
        Payment Status : Pending
      </h2>

      <img
        src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=9030523441@ibl&pn=HomeHub&am=${total}&cu=INR`}
        alt="QR Code"
        style={{
          width: "250px",
          margin: "20px auto",
        }}
      />

      <h3>UPI ID</h3>

      <h2 style={{ color: "#5F259F" }}>
        9030523441@ibl
      </h2>

      <p>Scan using PhonePe App</p>

      <button
        onClick={completePayment}
        style={{
          marginTop: "20px",
          padding: "15px 40px",
          background: "#5F259F",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        Payment Completed
      </button>
    </div>
  );
}

export default Payment;