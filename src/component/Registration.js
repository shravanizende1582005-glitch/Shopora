import React from "react";
import "./Registration.css";
import backgroundImage from "../Assets/regimg.jpg";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";

import { auth, db } from "../Firebase";

import { useNavigate } from "react-router-dom";

function Registration() {

  const navigate = useNavigate();

  async function HandleClick() {

    // Get values from input fields
    const Name = document.getElementById("Name").value;
    const emailId = document.getElementById("emailId").value;
    const password = document.getElementById("password").value;
    const confirmpassword =
      document.getElementById("confirmpassword").value;

    // Check empty fields
    if (
      Name === "" ||
      emailId === "" ||
      password === "" ||
      confirmpassword === ""
    ) {
      alert("Please enter required fields");
      return;
    }

    // Check password match
    if (password !== confirmpassword) {
      alert("Passwords do not match");
      return;
    }

    // Check password length
    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {

      // Create account in Firebase Authentication
      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          emailId,
          password
        );

      const user = userCredential.user;

      // Save user information in Firebase Realtime Database
      await set(ref(db, "users/" + user.uid), {
        name: Name,
        email: emailId,
        uid: user.uid
      });

      alert("Registration successful!");

      // Clear input fields
      document.getElementById("Name").value = "";
      document.getElementById("emailId").value = "";
      document.getElementById("password").value = "";
      document.getElementById("confirmpassword").value = "";

      // Go to Login page
      navigate("/login");

    } catch (error) {

      console.error("Firebase Error:", error);

      if (error.code === "auth/email-already-in-use") {
        alert("This email is already registered.");
      }
      else if (error.code === "auth/invalid-email") {
        alert("Please enter a valid email address.");
      }
      else if (error.code === "auth/weak-password") {
        alert("Password must be at least 6 characters.");
      }
      else if (error.code === "PERMISSION_DENIED") {
        alert("Registration failed: Realtime Database permission denied. Please check Firebase Database Rules.");
      }
      else {
        alert("Registration failed: " + error.message);
      }
    }
  }

  return (

    <div
      className="Registration-page"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >

      <div className="Registration-container">

        <h2>Registration page</h2>

        <label>Name</label>

        <input
          type="text"
          id="Name"
          placeholder="Enter your name"
        />

        <br />
        <br />

        <label>emailId:</label>

        <input
          type="email"
          id="emailId"
          placeholder="Enter your email"
        />

        <br />
        <br />

        <label>password</label>

        <input
          type="password"
          id="password"
          placeholder="Enter password"
        />

        <br />
        <br />

        <label>confirmpassword</label>

        <input
          type="password"
          id="confirmpassword"
          placeholder="Confirm your password"
        />

        <br />
        <br />

        <button onClick={HandleClick}>
          Registration
        </button>

        <br />
        <br />

        <a href="/login">
          already user? Click here to login
        </a>

      </div>

    </div>
  );
}

export default Registration;