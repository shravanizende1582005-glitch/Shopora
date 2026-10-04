import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./component/Navbar";
import Home from "./Home";
import Login from "./component/Login";
import Registration from "./component/Registration";
import Product from "./component/Product";
import ProductDetails from "./component/ProductDetails";
import Cart from "./component/Cart";
import Checkout from "./component/Checkout";
import OrderSuccess from "./component/OrderSuccess";
import Feedback from "./component/Feedback";
import shoporaLogo from "./Assets/logo.png";

import "./App.css";

function SiteFooter() {
  return (
    <footer className="site-footer">
      <h2>Shopora</h2>
      <p>© 2026 Shopora. All rights reserved.</p>
    </footer>
  );
}

function MobileSplash() {
  return (
    <main className="mobile-splash" aria-label="Shopora welcome screen">
      <div className="splash-decoration splash-decoration-one" aria-hidden="true" />
      <div className="splash-decoration splash-decoration-two" aria-hidden="true" />
      <div className="splash-content" role="status" aria-live="polite">
        <img className="splash-logo" src={shoporaLogo} alt="Shopora" />
        <p className="splash-tagline">Good finds. Great feels.</p>
        <div className="splash-loader" aria-hidden="true">
          <span />
        </div>
      </div>
      <p className="splash-caption">YOUR EVERYDAY, UPGRADED</p>
    </main>
  );
}

function PageWithFooter({ children }) {
  return (
    <>
      {children}
      <SiteFooter />
    </>
  );
}

function DesktopHome() {
  return (
    <div className="one-page-container">
      <section id="home" className="page-section">
        <Home />
      </section>
      <section id="login" className="page-section">
        <Login />
      </section>
      <section id="products" className="page-section">
        <Product />
      </section>
      <section id="cart" className="page-section">
        <Cart />
      </section>
      <section id="feedback" className="page-section">
        <Feedback />
      </section>
      <SiteFooter />
    </div>
  );
}

function AppContent() {
  const [isMobile, setIsMobile] = useState(
    () =>
      typeof window.matchMedia === "function"
        ? window.matchMedia("(max-width: 768px)").matches
        : window.innerWidth <= 768
  );
  const [showMobileSplash, setShowMobileSplash] = useState(
    () => window.innerWidth <= 768
  );

  useEffect(() => {
    if (!showMobileSplash) {
      return undefined;
    }

    const splashTimer = window.setTimeout(() => {
      setShowMobileSplash(false);
    }, 2000);

    return () => window.clearTimeout(splashTimer);
  }, [showMobileSplash]);

  useEffect(() => {
    const mediaQuery =
      typeof window.matchMedia === "function"
        ? window.matchMedia("(max-width: 768px)")
        : null;
    const updateViewport = () =>
      setIsMobile(
        mediaQuery ? mediaQuery.matches : window.innerWidth <= 768
      );

    updateViewport();
    if (mediaQuery) {
      mediaQuery.addEventListener("change", updateViewport);
    } else {
      window.addEventListener("resize", updateViewport);
    }

    return () => {
      if (mediaQuery) {
        mediaQuery.removeEventListener("change", updateViewport);
      } else {
        window.removeEventListener("resize", updateViewport);
      }
    };
  }, []);

  if (showMobileSplash) {
    return <MobileSplash />;
  }

  return (
    <>
      <Navbar isMobile={isMobile} />
      <Routes>
        <Route
          path="/"
          element={
            isMobile ? (
              <PageWithFooter>
                <Home />
              </PageWithFooter>
            ) : (
              <DesktopHome />
            )
          }
        />
        <Route
          path="/login"
          element={
            <PageWithFooter>
              <Login />
            </PageWithFooter>
          }
        />
        <Route
          path="/registration"
          element={
            <PageWithFooter>
              <Registration />
            </PageWithFooter>
          }
        />
        <Route
          path="/products"
          element={
            <PageWithFooter>
              <Product />
            </PageWithFooter>
          }
        />
        <Route
          path="/cart"
          element={
            <PageWithFooter>
              <Cart />
            </PageWithFooter>
          }
        />
        <Route
          path="/feedback"
          element={
            <PageWithFooter>
              <Feedback />
            </PageWithFooter>
          }
        />
        <Route
          path="/product-details"
          element={
            <PageWithFooter>
              <ProductDetails />
            </PageWithFooter>
          }
        />
        <Route
          path="/checkout"
          element={
            <PageWithFooter>
              <Checkout />
            </PageWithFooter>
          }
        />
        <Route
          path="/order-success"
          element={
            <PageWithFooter>
              <OrderSuccess />
            </PageWithFooter>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
