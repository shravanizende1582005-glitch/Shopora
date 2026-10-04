
import React from "react";
import "./Login.css";
import backgroundImage from "../Assets/img.jpg";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";

import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  async function handleClick() {
    const emailId = document.getElementById("emailId").value;
    const password = document.getElementById("password").value;

    if (emailId === "" || password === "") {
      alert("Please enter required fields");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        emailId,
        password
      );

      console.log("Logged in user:", userCredential.user);

      alert("Login successful!");

      // Clear fields
      document.getElementById("emailId").value = "";
      document.getElementById("password").value = "";

      // Go to Home page
      navigate("/");
    } catch (error) {
      console.error("Firebase Login Error:", error);

      if (error.code === "auth/invalid-credential") {
        alert("Invalid email or password.");
      } else if (error.code === "auth/user-not-found") {
        alert("No account found with this email.");
      } else if (error.code === "auth/wrong-password") {
        alert("Incorrect password.");
      } else if (error.code === "auth/invalid-email") {
        alert("Please enter a valid email address.");
      } else {
        alert("Login failed: " + error.message);
      }
    }
  }

  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="login-container">
        <h2>Login Page</h2>

        <label>Email ID:</label>
        <input
          type="text"
          id="emailId"
          placeholder="Enter email id"
        />

        <br />
        <br />

        <label>Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
        />

        <br />
        <br />

        <button onClick={handleClick}>Submit</button>

        <br />
        <br />

        <a href="/registration">
          New user? Click here for Registration
        </a>
      </div>
    </div>
  );
}

export default Login;

