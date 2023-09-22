import React from "react";
import { Routes, Route } from "react-router-dom";

import logo from "./logo.svg";
import "./scss/app.scss";

import Header from "./components/Header.js";
import Home from "./pages/Home.js";
import Cart from "./pages/Cart.js";
import SinglePizza from "./pages/SinglePizza.js";
import NotFound from "./pages/NotFound.js";

function App() {
  return (
    <div className="wrapper">
      <Header />

      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/pizza/:id" element={<SinglePizza />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
