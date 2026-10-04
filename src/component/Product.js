import React from "react";
import { useNavigate } from "react-router-dom";
import "./Product.css";

function Product() {
const navigate = useNavigate();
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      category: "Electronics",
      price: 1499,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    },
    {
      id: 2,
      name: "Smart Watch",
      category: "Electronics",
      price: 2499,
      rating: 4.3,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
    },
    {
      id: 3,
      name: "Running Shoes",
      category: "Footwear",
      price: 1999,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
    },
    {
      id: 4,
      name: "Women's Handbag",
      category: "Fashion",
      price: 1299,
      rating: 4.4,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3"
    },
    {
      id: 5,
      name: "Sunglasses",
      category: "Fashion",
      price: 799,
      rating: 4.2,
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083"
    },
    {
      id: 6,
      name: "Casual T-Shirt",
      category: "Clothing",
      price: 699,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"
    },
    {
      id: 7,
      name: "Laptop Backpack",
      category: "Accessories",
      price: 999,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62"
    },
    {
      id: 8,
      name: "Bluetooth Speaker",
      category: "Electronics",
      price: 1799,
      rating: 4.4,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1"
    }
  ];

  const handleBuyNow = (product) => {

  navigate("/product-details", {
    state: {
      product: product
    }
  });

};

  return (
    <div className="product-page">

      {/* Page Header */}
      <div className="product-header">
        <h1>Our Products</h1>
        <p>
          Discover our latest products at the best prices
        </p>
      </div>

      {/* Product Cards */}
      <div className="product-container">

        {products.map((product) => (

          <div className="product-card" key={product.id}>

            {/* Product Image */}
            <div className="product-image-container">

              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />

            </div>

            {/* Product Details */}
            <div className="product-details">

              <span className="product-category">
                {product.category}
              </span>

              <h2>{product.name}</h2>

              <div className="product-rating">
                ⭐ {product.rating}
              </div>

              <div className="product-bottom">

                <span className="product-price">
                  ₹{product.price}
                </span>

                <button
                  className="buy-button"
                  onClick={() => handleBuyNow(product)}
                >
                  Buy Now
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Product;