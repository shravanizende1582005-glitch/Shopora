import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ProductDetails.css";

function ProductDetails() {

  const location = useLocation();
  const navigate = useNavigate();

  // Get selected product from Product page
  const product = location.state?.product;

  // Quantity
  const [quantity, setQuantity] = useState(1);

  // If product is not available
  if (!product) {
    return (
      <div className="product-not-found">

        <h2>Product not found</h2>

        <p>
          Please go back to the products page and select a product.
        </p>

        <button
          onClick={() => navigate("/products")}
        >
          Back to Products
        </button>

      </div>
    );
  }

  // Increase quantity
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Decrease quantity
  const decreaseQuantity = () => {

    if (quantity > 1) {
      setQuantity(quantity - 1);
    }

  };

  // Add to cart
  const handleAddToCart = () => {

  const savedCart =
    JSON.parse(localStorage.getItem("cart")) || [];

  const existingProduct = savedCart.find(
    (item) => item.id === product.id
  );

  let updatedCart;

  if (existingProduct) {

    updatedCart = savedCart.map((item) => {

      if (item.id === product.id) {

        return {
          ...item,
          quantity: item.quantity + quantity
        };

      }

      return item;

    });

  } else {

    updatedCart = [
      ...savedCart,
      {
        ...product,
        quantity: quantity
      }
    ];

  }

  localStorage.setItem(
    "cart",
    JSON.stringify(updatedCart)
  );

  alert(
    `${product.name} added to cart!`
  );

};
  // Buy now
  const handleBuyNow = () => {

    const totalPrice = product.price * quantity;

    alert(
      `You selected ${product.name}\n` +
      `Quantity: ${quantity}\n` +
      `Total: ₹${totalPrice}`
    );

  };

  return (

    <div className="product-details-page">

      {/* Back Button */}

      <button
        className="back-button"
        onClick={() => navigate("/products")}
      >
        ← Back to Products
      </button>


      {/* Product Details Container */}

      <div className="product-details-card">


        {/* Product Image */}

        <div className="details-image-section">

          <img
            src={product.image}
            alt={product.name}
            className="details-product-image"
          />

        </div>


        {/* Product Information */}

        <div className="details-info-section">

          {/* Category */}

          <span className="details-category">
            {product.category}
          </span>


          {/* Product Name */}

          <h1>
            {product.name}
          </h1>


          {/* Rating */}

          <div className="details-rating">

            ⭐ {product.rating}

            <span>
              {" "} / 5
            </span>

          </div>


          {/* Price */}

          <div className="details-price">

            ₹{product.price}

          </div>


          {/* Description */}

          <p className="details-description">

            This is a high-quality {product.name.toLowerCase()}
            designed to provide excellent performance,
            comfort and value. It is a great choice for
            everyday use and offers reliable quality.

          </p>


          {/* Product Information */}

          <div className="product-information">

            <div>
              <strong>Category:</strong>
              <span>{product.category}</span>
            </div>

            <div>
              <strong>Rating:</strong>
              <span>⭐ {product.rating}</span>
            </div>

            <div>
              <strong>Availability:</strong>
              <span className="available">
                In Stock
              </span>
            </div>

          </div>


          {/* Quantity */}

          <div className="quantity-section">

            <h3>Quantity</h3>

            <div className="quantity-control">

              <button
                onClick={decreaseQuantity}
              >
                −
              </button>

              <span>
                {quantity}
              </span>

              <button
                onClick={increaseQuantity}
              >
                +
              </button>

            </div>

          </div>


          {/* Total */}

          <div className="details-total">

            <span>Total:</span>

            <strong>
              ₹{product.price * quantity}
            </strong>

          </div>


          {/* Buttons */}

          <div className="details-buttons">

            <button
              className="add-cart-button"
              onClick={handleAddToCart}
            >
              🛒 Add to Cart
            </button>


            <button
              className="details-buy-button"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>

          </div>

        </div>

      </div>

    </div>

  );
}

export default ProductDetails;