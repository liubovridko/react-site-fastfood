import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

import logo from "./logo.svg";
import "./scss/app.scss";

import Header from "./components/Header.js";
import Home from "./pages/Home.js";
import Cart from "./pages/Cart.js";
import NotFound from "./pages/NotFound.js";

function App() {
  return (
    <div className="wrapper">
      <Header />

      <main className="content">
        <Home />
      </main>
    </div>
  );
}

export default App;
