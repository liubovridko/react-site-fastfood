import React from "react";
import { Routes, Route } from "react-router-dom";

import logo from "./logo.svg";
import "./scss/app.scss";

import Header from "./components/Header.js";
import Home from "./pages/Home.js";
import Cart from "./pages/Cart.js";
import NotFound from "./pages/NotFound.js";

import SearchContext from "./context.js";

function App() {
  const [searchValue, setSearchValue] = React.useState("");
  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />

        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
