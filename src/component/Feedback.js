import React, { useState } from "react";
import "./Feedback.css";
import backgroundImage from "../Assets/fedimg.jpg";

import { ref, push } from "firebase/database";
import { db } from "../Firebase";

function Feedback() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      name === "" ||
      email === "" ||
      feedback === "" ||
      rating === 0
    ) {
      alert("Please fill in all fields and select a rating");
      return;
    }

    try {

      // Save feedback in Firebase Realtime Database
      const feedbackRef = ref(db, "feedback");

      await push(feedbackRef, {
        name: name,
        email: email,
        feedback: feedback,
        rating: rating,
        date: new Date().toISOString()
      });

      alert(
        `Thank you for your feedback! You rated us ${rating} stars ⭐`
      );

      // Clear form after submission
      setName("");
      setEmail("");
      setFeedback("");
      setRating(0);

    } catch (error) {

      console.error("Firebase Feedback Error:", error);

      alert("Feedback could not be submitted. Please try again.");

    }
  };

  return (

    <div
      className="feedback-page"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >

      <div className="feedback-container">

        <h2>Feedback Form</h2>

        <p>We would love to hear your feedback!</p>

        <form onSubmit={handleSubmit}>

          <label>Name</label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Rate Your Experience</label>

          <div className="star-rating">

            {[1, 2, 3, 4, 5].map((star) => (

              <span
                key={star}
                className={
                  star <= rating
                    ? "star active"
                    : "star"
                }
                onClick={() => setRating(star)}
              >
                ★
              </span>

            ))}

          </div>

          <label>Your Feedback</label>

          <textarea
            placeholder="Write your feedback here..."
            rows="5"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          ></textarea>

          <button type="submit">
            Submit Feedback
          </button>

        </form>

      </div>


      {/* =========================
          FOOTER
      ========================= */}

      <footer className="feedback-footer">

        <h3>
          Shopora
        </h3>

        <p>
          © 2026 Shopora. All rights reserved.
        </p>

      </footer>


    </div>
  );
}

export default Feedback;