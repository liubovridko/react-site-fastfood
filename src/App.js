import logo from "./logo.svg";
import "./scss/app.scss";

import Header from "./components/Header.js";
import Categories from "./components/Categories.js";
import Sort from "./components/Sort.js";
import PizzaBlock from "./components/PizzaBlock.js";

function App() {
  const items = [
    { title: "Чизбургер піцца", image: "img/pizza/1.webp", price: 395 },
    { title: "Сирна", image: "img/pizza/2.webp", price: 450 },
    { title: "По азійські", image: "img/pizza/3.webp", price: 290 },
    { title: "Фірмова", image: "img/pizza/4.webp", price: 385 },
    { title: "Чизбургер піцца", image: "img/pizza/1.webp", price: 395 },
    { title: "Сирна", image: "img/pizza/2.webp", price: 450 },
    { title: "По азійські", image: "img/pizza/3.webp", price: 290 },
    { title: "Фірмова", image: "img/pizza/4.webp", price: 385 },
  ];
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
              <PizzaBlock
                key={key}
                title={item.title}
                img={item.image}
                price={item.price}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
