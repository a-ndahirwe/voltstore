import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";

const App = () => {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="app-shell" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          <Navbar />

          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-confirmation/:id" element={<OrderConfirmation />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;
