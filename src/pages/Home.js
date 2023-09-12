import React from "react";
import Categories from "../components/Categories.js";
import Sort from "../components/Sort.js";
import PizzaBlock from "../components/PizzaBlock.js";
import Skeleton from "../components/Skeleton.js";

export default function Home() {
	const [items, setItems] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	const [categoryId, setCategoryId] = React.useState(0);
	const [sortObj, setSortObj] = React.useState({
		name: "популярні",
		sortProperty: "rating",
	});
	console.log(categoryId);

	React.useEffect(() => {
		const category = categoryId > 0 ? `category=${categoryId}` : "";
		const sortBy = sortObj.sortProperty.replace("-", "");
		const order = sortObj.sortProperty.includes("-") ? "asc" : "desc";
		setIsLoading(true);
		fetch(
			`https://64fb19d3cb9c00518f7aa530.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`,
		)
			.then((res) => {
				return res.json();
			})
			.then((json) => {
				setItems(json);
				setIsLoading(false);
			});
		window.scrollTo(0, 0);
	}, [categoryId, sortObj]);
	return (
		<div className="container">
			<div className="block__filter">
				<Categories
					categoryId={categoryId}
					onClickCategory={(index) => setCategoryId(index)}
				/>
				<Sort value={sortObj} onChangeSort={(obj) => setSortObj(obj)} />
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
