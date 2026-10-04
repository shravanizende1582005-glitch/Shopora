import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

import { ref, push, set } from "firebase/database";
import { db, auth } from "../Firebase";

function Checkout() {

  const navigate = useNavigate();

  const [cartItems] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // =========================
  // CALCULATE TOTAL AMOUNT
  // =========================

  const totalAmount = cartItems.reduce(
    (total, item) =>
      total + Number(item.price) * Number(item.quantity),
    0
  );

  // =========================
  // CALCULATE TOTAL PRODUCTS
  // =========================

  const totalProducts = cartItems.reduce(
    (total, item) =>
      total + Number(item.quantity),
    0
  );

  // =========================
  // PLACE ORDER
  // =========================

  const handlePlaceOrder = async (e) => {

    e.preventDefault();

    // Prevent double clicking
    if (isPlacingOrder) {
      return;
    }

    // =========================
    // FORM VALIDATION
    // =========================

    if (
      name.trim() === "" ||
      email.trim() === "" ||
      mobile.trim() === "" ||
      address.trim() === "" ||
      city.trim() === "" ||
      state.trim() === "" ||
      pincode.trim() === ""
    ) {

      alert("Please fill in all required fields.");

      return;
    }

    // =========================
    // MOBILE VALIDATION
    // =========================

    if (!/^[0-9]{10}$/.test(mobile)) {

      alert("Please enter a valid 10-digit mobile number.");

      return;
    }

    // =========================
    // PINCODE VALIDATION
    // =========================

    if (!/^[0-9]{6}$/.test(pincode)) {

      alert("Please enter a valid 6-digit pincode.");

      return;
    }

    // =========================
    // EMAIL VALIDATION
    // =========================

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {

      alert("Please enter a valid email address.");

      return;
    }

    // =========================
    // CHECK CART
    // =========================

    if (cartItems.length === 0) {

      alert("Your cart is empty.");

      navigate("/products");

      return;
    }

    try {

      setIsPlacingOrder(true);

      // =========================
      // CHECK LOGIN USER
      // =========================

      const currentUser = auth.currentUser;

      // =========================
      // CREATE NEW ORDER REFERENCE
      // =========================

      const orderRef = push(
        ref(db, "orders")
      );

      const orderId = orderRef.key;

      // =========================
      // CREATE ORDER DATA
      // =========================

      const orderData = {

        orderId: orderId,

        userId: currentUser
          ? currentUser.uid
          : "guest",

        customerName: name.trim(),

        email: email.trim(),

        mobile: mobile.trim(),

        address: address.trim(),

        city: city.trim(),

        state: state.trim(),

        pincode: pincode.trim(),

        products: cartItems,

        totalProducts: totalProducts,

        totalAmount: totalAmount,

        orderDate: new Date().toISOString(),

        status: "Pending"

      };

      // =========================
      // SAVE ORDER TO FIREBASE
      // =========================

      await set(
        orderRef,
        orderData
      );

      console.log(
        "Order saved successfully:",
        orderData
      );

      // =========================
      // SAVE ORDER LOCALLY
      // FOR ORDER SUCCESS PAGE
      // =========================

      localStorage.setItem(
        "orderData",
        JSON.stringify(orderData)
      );

      // =========================
      // CLEAR CART
      // =========================

      localStorage.removeItem("cart");

      // =========================
      // SHOW SUCCESS PAGE
      // =========================

      navigate("/order-success");

    } catch (error) {

      console.error(
        "Firebase Order Error:",
        error
      );

      alert(
        "Order could not be placed. Please try again."
      );

      setIsPlacingOrder(false);
    }
  };


  // =========================
  // EMPTY CART
  // =========================

  if (cartItems.length === 0) {

    return (

      <div className="checkout-empty">

        <h2>Your cart is empty</h2>

        <p>
          Please add products before checkout.
        </p>

        <button
          onClick={() => navigate("/products")}
        >
          Continue Shopping
        </button>

      </div>

    );

  }


  // =========================
  // CHECKOUT PAGE
  // =========================

  return (

    <div className="checkout-page">

      <div className="checkout-header">

        <h1>Checkout</h1>

        <p>
          Enter your details to place your order
        </p>

      </div>


      <div className="checkout-container">


        {/* =========================
            CUSTOMER INFORMATION
        ========================= */}

        <div className="checkout-form-container">

          <h2>Customer Information</h2>


          <form onSubmit={handlePlaceOrder}>


            {/* FULL NAME */}

            <div className="form-group">

              <label>
                Full Name *
              </label>

              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />

            </div>


            {/* EMAIL + MOBILE */}

            <div className="form-row">

              <div className="form-group">

                <label>
                  Email *
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                />

              </div>


              <div className="form-group">

                <label>
                  Mobile Number *
                </label>

                <input
                  type="text"
                  placeholder="10-digit mobile number"
                  value={mobile}
                  maxLength="10"
                  onChange={(e) =>
                    setMobile(
                      e.target.value.replace(/\D/g, "")
                    )
                  }
                />

              </div>

            </div>


            {/* ADDRESS */}

            <div className="form-group">

              <label>
                Address *
              </label>

              <textarea
                placeholder="Enter your complete address"
                rows="4"
                value={address}
                onChange={(e) =>
                  setAddress(e.target.value)
                }
              />

            </div>


            {/* CITY + STATE */}

            <div className="form-row">

              <div className="form-group">

                <label>
                  City *
                </label>

                <input
                  type="text"
                  placeholder="Enter city"
                  value={city}
                  onChange={(e) =>
                    setCity(e.target.value)
                  }
                />

              </div>


              <div className="form-group">

                <label>
                  State *
                </label>

                <input
                  type="text"
                  placeholder="Enter state"
                  value={state}
                  onChange={(e) =>
                    setState(e.target.value)
                  }
                />

              </div>

            </div>


            {/* PINCODE */}

            <div className="form-group">

              <label>
                Pincode *
              </label>

              <input
                type="text"
                placeholder="6-digit pincode"
                value={pincode}
                maxLength="6"
                onChange={(e) =>
                  setPincode(
                    e.target.value.replace(/\D/g, "")
                  )
                }
              />

            </div>


            {/* PLACE ORDER BUTTON */}

            <button
              type="submit"
              className="place-order-button"
              disabled={isPlacingOrder}
            >

              {isPlacingOrder
                ? "Placing Order..."
                : "Place Order"
              }

            </button>


            {/* BACK TO CART */}

            <button
              type="button"
              className="back-cart-button"
              onClick={() => navigate("/cart")}
              disabled={isPlacingOrder}
            >

              ← Back to Cart

            </button>

          </form>

        </div>


        {/* =========================
            ORDER SUMMARY
        ========================= */}

        <div className="checkout-summary">

          <h2>
            Order Summary
          </h2>


          <div className="checkout-products">

            {cartItems.map((item) => (

              <div
                className="checkout-product"
                key={item.id}
              >

                <img
                  src={item.image}
                  alt={item.name}
                />


                <div>

                  <h3>
                    {item.name}
                  </h3>

                  <p>
                    Quantity: {item.quantity}
                  </p>

                </div>


                <strong>
                  ₹{item.price * item.quantity}
                </strong>

              </div>

            ))}

          </div>


          <hr />


          {/* TOTAL PRODUCTS */}

          <div className="checkout-summary-row">

            <span>
              Total Products
            </span>

            <span>
              {totalProducts}
            </span>

          </div>


          {/* DELIVERY */}

          <div className="checkout-summary-row">

            <span>
              Delivery
            </span>

            <span className="free">
              FREE
            </span>

          </div>


          {/* TOTAL */}

          <div className="checkout-total">

            <span>
              Total Amount
            </span>

            <strong>
              ₹{totalAmount}
            </strong>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Checkout;