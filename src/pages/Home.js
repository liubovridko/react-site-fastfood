import React from "react";
import Categories from "../components/Categories.js";
import Sort from "../components/Sort.js";
import PizzaBlock from "../components/PizzaBlock.js";
import Skeleton from "../components/Skeleton.js";

export default function Home() {
	const [items, setItems] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);

	React.useEffect(() => {
		fetch("https://64fb19d3cb9c00518f7aa530.mockapi.io/items")
			.then((res) => {
				return res.json();
			})
			.then((json) => {
				setItems(json);
				setIsLoading(false);
			});
	}, []);
	return (
		<div className="container">
			<div className="block__filter">
				<Categories />
				<Sort />
			</div>
			<h2 className="content__title">Усі піцци</h2>
			<div className="content__items">
				{isLoading
					? [...new Array(6)].map((_, index) => (
							<Skeleton key={index} />
					  ))
					: items.map((item, key) => (
							<PizzaBlock key={item.id} {...item} />
					  ))}
			</div>
		</div>
	);
}
