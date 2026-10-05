import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

function Category() {
  const { category } = useParams();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("products/")
      .then((res) => {
        const filtered = res.data.filter(
          (item) =>
            item.category.toLowerCase() === category.toLowerCase()
        );
        setProducts(filtered);
      });
  }, [category]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>{category}</h1>

      <div className="grid">
        {products.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
}

export default Category;