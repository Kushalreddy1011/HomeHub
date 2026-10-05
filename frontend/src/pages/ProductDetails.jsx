import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    api.get("products/")
      .then((res) => {
        const item = res.data.find((p) => p.id === Number(id));
        setProduct(item);
      });
  }, [id]);

  if (!product) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "40px" }}>
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: "350px",
          borderRadius: "10px"
        }}
      />

      <h1>{product.name}</h1>

      <h2>₹{product.price}</h2>

      <p>{product.description}</p>

      <h3>⭐ {product.rating}</h3>

      <button>Add To Cart</button>
    </div>
  );
}

export default ProductDetails;