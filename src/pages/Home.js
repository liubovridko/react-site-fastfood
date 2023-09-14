import React from "react";
import Categories from "../components/Categories.js";
import Sort from "../components/Sort.js";
import PizzaBlock from "../components/PizzaBlock.js";
import Skeleton from "../components/Skeleton.js";
import Pagination from "../components/Pagination/";

import SearchContext from "../context.js";

export default function Home() {
	const [items, setItems] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	const [categoryId, setCategoryId] = React.useState(0);
	const [sortObj, setSortObj] = React.useState({
		name: "популярні",
		sortProperty: "rating",
	});
	const [currentPage, setCurrentPage] = React.useState(1);

	const { searchValue } = React.useContext(SearchContext);

	React.useEffect(() => {
		const category = categoryId > 0 ? `&category=${categoryId}` : "";
		const sortBy = sortObj.sortProperty.replace("-", "");
		const order = sortObj.sortProperty.includes("-") ? "asc" : "desc";
		const search = searchValue ? `&search=${searchValue}` : "";
		setIsLoading(true);
		fetch(
			`https://64fb19d3cb9c00518f7aa530.mockapi.io/items?limit=4&page=${currentPage}${category}&sortBy=${sortBy}&order=${order}${search}`,
		)
			.then((res) => {
				return res.json();
			})
			.then((json) => {
				setItems(json);
				setIsLoading(false);
			});
		window.scrollTo(0, 0);
	}, [categoryId, sortObj, searchValue, currentPage]);
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
					: items
							.filter((obj) => {
								if (
									obj.title
										.toLowerCase()
										.includes(searchValue.toLowerCase())
								) {
									return true;
								}
								return false;
							})
							.map((item, key) => (
								<PizzaBlock key={item.id} {...item} />
							))}
			</div>
			<Pagination onChangePage={(number) => setCurrentPage(number)} />
		</div>
	);
}
