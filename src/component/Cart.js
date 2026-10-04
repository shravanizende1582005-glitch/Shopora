import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart() {

  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage
  useEffect(() => {

    const savedCart = localStorage.getItem("cart");

    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }

  }, []);


  // Update localStorage
  const updateCart = (updatedCart) => {

    setCartItems(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

  };


  // Increase quantity
  const increaseQuantity = (id) => {

    const updatedCart = cartItems.map((item) => {

      if (item.id === id) {

        return {
          ...item,
          quantity: item.quantity + 1
        };

      }

      return item;

    });

    updateCart(updatedCart);

  };


  // Decrease quantity
  const decreaseQuantity = (id) => {

    const updatedCart = cartItems.map((item) => {

      if (item.id === id && item.quantity > 1) {

        return {
          ...item,
          quantity: item.quantity - 1
        };

      }

      return item;

    });

    updateCart(updatedCart);

  };


  // Remove product
  const removeItem = (id) => {

    const updatedCart = cartItems.filter(
      (item) => item.id !== id
    );

    updateCart(updatedCart);

  };


  // Calculate total
  const totalAmount = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );


  // Empty cart
  if (cartItems.length === 0) {

    return (

      <div className="empty-cart">

        <div className="empty-cart-icon">
          🛒
        </div>

        <h2>Your Cart is Empty</h2>

        <p>
          You haven't added any products to your cart yet.
        </p>

        <button
          onClick={() => navigate("/products")}
        >
          Continue Shopping
        </button>

      </div>

    );

  }


  return (

    <div className="cart-page">

      {/* Page Header */}

      <div className="cart-header">

        <h1>Shopping Cart</h1>

        <p>
          Review your products before checkout
        </p>

      </div>


      <div className="cart-container">


        {/* Cart Products */}

        <div className="cart-products">

          {cartItems.map((item) => (

            <div
              className="cart-item"
              key={item.id}
            >

              {/* Image */}

              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
              />


              {/* Product Information */}

              <div className="cart-item-info">

                <span className="cart-item-category">
                  {item.category}
                </span>

                <h2>
                  {item.name}
                </h2>

                <p>
                  ⭐ {item.rating}
                </p>

                <div className="cart-item-price">
                  ₹{item.price}
                </div>

              </div>


              {/* Quantity */}

              <div className="cart-quantity">

                <button
                  onClick={() =>
                    decreaseQuantity(item.id)
                  }
                >
                  −
                </button>

                <span>
                  {item.quantity}
                </span>

                <button
                  onClick={() =>
                    increaseQuantity(item.id)
                  }
                >
                  +
                </button>

              </div>


              {/* Item Total */}

              <div className="cart-item-total">

                ₹{item.price * item.quantity}

              </div>


              {/* Remove */}

              <button
                className="remove-button"
                onClick={() =>
                  removeItem(item.id)
                }
              >
                Remove
              </button>

            </div>

          ))}

        </div>


        {/* Order Summary */}

        <div className="cart-summary">

          <h2>
            Order Summary
          </h2>

          <div className="summary-row">

            <span>
              Products
            </span>

            <span>
              {cartItems.reduce(
                (total, item) =>
                  total + item.quantity,
                0
              )}
            </span>

          </div>


          <div className="summary-row">

            <span>
              Subtotal
            </span>

            <span>
              ₹{totalAmount}
            </span>

          </div>


          <div className="summary-row">

            <span>
              Delivery
            </span>

            <span className="free">
              FREE
            </span>

          </div>


          <hr />


          <div className="summary-total">

            <span>
              Total
            </span>

            <strong>
              ₹{totalAmount}
            </strong>

          </div>


          <button
  className="checkout-button"
  onClick={() => navigate("/checkout")}
>
  Proceed to Checkout
</button>


          <button
            className="continue-button"
            onClick={() => navigate("/products")}
          >
            Continue Shopping
          </button>

        </div>

      </div>

    </div>

  );

}

export default Cart;