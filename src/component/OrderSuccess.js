import React from "react";
import { useNavigate } from "react-router-dom";
import "./OrderSuccess.css";

function OrderSuccess() {

  const navigate = useNavigate();

  const orderData =
    JSON.parse(localStorage.getItem("orderData"));

  if (!orderData) {

    return (

      <div className="order-success-page">

        <h2>No Order Found</h2>

        <button
          onClick={() => navigate("/products")}
        >
          Continue Shopping
        </button>

      </div>

    );

  }


  const handleContinueShopping = () => {

    localStorage.removeItem("cart");

    localStorage.removeItem("orderData");

    navigate("/products");

  };


  return (

    <div className="order-success-page">

      <div className="success-card">

        <div className="success-icon">
          ✓
        </div>

        <h1>
          Order Placed Successfully!
        </h1>

        <p>
          Thank you for your purchase, {orderData.name}.
        </p>

        <div className="order-info">

          <div>
            <span>
              Total Products
            </span>

            <strong>
              {orderData.totalProducts}
            </strong>
          </div>

          <div>
            <span>
              Total Amount
            </span>

            <strong>
              ₹{orderData.totalAmount}
            </strong>
          </div>

          <div>
            <span>
              Delivery City
            </span>

            <strong>
              {orderData.city}
            </strong>
          </div>

        </div>

        <p className="success-message">

          Your order has been received.
          We will contact you soon regarding delivery.

        </p>

        <button
          className="success-button"
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </button>

      </div>

    </div>

  );

}

export default OrderSuccess;