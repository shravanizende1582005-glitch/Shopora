import React from "react";
import "./component/Home.css";
import hoimg from "./Assets/hoimg.jpg";
import productImage from "./Assets/wirlessheadphone.jpg";
import smartwatch from "./Assets/smartwatch.jpg";
import runningshoes from "./Assets/runningshoes.jpg";
import laptopbag from "./Assets/laptopbag.jpg";
import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: "4999",
      image: productImage
    },
    {
      id: 2,
      name: "Smart Watch",
      price: "7999",
      image: smartwatch
    },
    {
      id: 3,
      name: "Running Shoes",
      price: "5999",
      image: runningshoes
    },
    {
      id: 4,
      name: "Laptop Bag",
      price: "3999",
      image: laptopbag
    },
  ];

  // =========================
  // SHOP NOW BUTTON
  // =========================

  const handleShopNow = () => {
    navigate("/products");
  };

  return (
    <div className="home-page">

      {/* =========================
          HERO SECTION
      ========================= */}

      <section className="hero">

        <img
          src={hoimg}
          alt="Shopping"
          className="hero-bg-image"
        />

        <div className="hero-overlay"></div>

        <div className="hero-content">

          <h1>
            Shop Smart. Live Better.
          </h1>

          <p>
            Discover amazing products at great prices.
            Shop your favorite items today!
          </p>

          <button
            className="shop-now-btn"
            onClick={handleShopNow}
          >
            Shop Now
          </button>

        </div>

      </section>


      {/* =========================
          CATEGORIES
      ========================= */}

      <section className="categories">

        <h2>
          Shop by Category
        </h2>

        <div className="category-container">

          <div className="category-card">
            <span>📱</span>
            <h3>Electronics</h3>
          </div>

          <div className="category-card">
            <span>👕</span>
            <h3>Fashion</h3>
          </div>

          <div className="category-card">
            <span>🏠</span>
            <h3>Home & Living</h3>
          </div>

          <div className="category-card">
            <span>🎮</span>
            <h3>Gaming</h3>
          </div>

        </div>

      </section>


      {/* =========================
          FEATURED PRODUCTS
      ========================= */}

      <section className="products-section">

        <h2>
          Featured Products
        </h2>

        <div className="product-container">

          {products.map((product) => (

            <div
              className="product-card"
              key={product.id}
            >

              <img
                src={product.image}
                alt={product.name}
              />

              <h3>
                {product.name}
              </h3>

              <p className="price">
                {product.price}
              </p>

              <button className="add-cart-btn">
                Add to Cart
              </button>

            </div>

          ))}

        </div>

      </section>


      {/* =========================
          OFFER SECTION
      ========================= */}

      <section className="offer-section">

        <div>

          <h2>
            Special Offer 🎉
          </h2>

          <p>
            Get up to 50% OFF on selected products!
          </p>

          <button
            className="offer-btn"
            onClick={handleShopNow}
          >
            Explore Offers
          </button>

        </div>

      </section>


      

    </div>
  );
}

export default Home;