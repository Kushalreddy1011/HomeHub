import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);

  const [searchParams] = useSearchParams();

  const category = searchParams.get("category");
  const search = searchParams.get("search") || "";

  useEffect(() => {
    api
      .get("products/")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const filteredProducts = products.filter((item) => {
    const categoryMatch = category
      ? item.category.toLowerCase() === category.toLowerCase()
      : true;

    const searchMatch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return categoryMatch && searchMatch;
  });

  return (
    <div>

      {/* Hero only on Home */}
      {!category && !search && (
        <>
          <section className="hero">
            <div className="overlay">
              <h1>Welcome to HomeHub</h1>
              <p>Furniture • Kitchen • Electronics</p>

              <button
                onClick={() =>
                  document
                    .getElementById("categories")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Shop Now
              </button>
            </div>
          </section>

          <section className="features">
            <div className="feature">
              🚚
              <h3>Free Delivery</h3>
            </div>

            <div className="feature">
              💳
              <h3>Secure Payment</h3>
            </div>

            <div className="feature">
              ⭐
              <h3>Premium Quality</h3>
            </div>

            <div className="feature">
              🔄
              <h3>Easy Returns</h3>
            </div>
          </section>
        </>
      )}

      {/* Category page OR Search results */}
      {(category || search) ? (
        <section className="section">
          <h2>
            {search
              ? `Search Results for "${search}"`
              : `${category} Products`}
          </h2>

          <div className="grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                />
              ))
            ) : (
              <h3>No products found.</h3>
            )}
          </div>
        </section>
      ) : (
        <div id="categories" className="categories">

          <div className="category-card">
            <a href="/?category=Furniture">
              <img
                src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600"
                alt="Furniture"
              />
              <h2>Furniture</h2>
            </a>
          </div>

          <div className="category-card">
            <a href="/?category=Kitchen">
              <img
                src="https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600"
                alt="Kitchen"
              />
              <h2>Kitchen</h2>
            </a>
          </div>

          <div className="category-card">
            <a href="/?category=Electronics">
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600"
                alt="Electronics"
              />
              <h2>Electronics</h2>
            </a>
          </div>

        </div>
      )}
    </div>
  );
}