import logo from "./logo.svg";
import "./scss/app.scss";

import Header from "./components/Header.js";
import Categories from "./components/Categories.js";
import Sort from "./components/Sort.js";
import PizzaBlock from "./components/PizzaBlock.js";

import items from "./db.json";

function App() {
  return (
    <div className="wrapper">
      <Header />

      <main className="content">
        <div className="container">
          <div className="block__filter">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Усі піцци</h2>
          <div className="content__items">
            {items.map((item, key) => (
              <PizzaBlock key={item.id} {...item} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
