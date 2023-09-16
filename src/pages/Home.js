import React from "react";

import { useSelector, useDispatch } from "react-redux";
import {
	setCategoryId,
	setCurrentPage,
	setFilters,
} from "../redux/slices/filterSlice.js";

import qs from "qs";
import { useNavigate } from "react-router-dom";

import Categories from "../components/Categories.js";
import Sort, { sortList } from "../components/Sort.js";
import PizzaBlock from "../components/PizzaBlock.js";
import Skeleton from "../components/Skeleton.js";
import Pagination from "../components/Pagination/";

import SearchContext from "../context.js";

export default function Home() {
	const { categoryId, sort, currentPage } = useSelector(
		(state) => state.filterReducer,
	);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isSearch = React.useRef(false);
	const isMounted = React.useRef(false);
	const [items, setItems] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	//const [categoryId, setCategoryId] = React.useState(0);

	const onClickCategory = React.useCallback((id) => {
		dispatch(setCategoryId(id));
	}, []);
	/*const [sortObj, setSortObj] = React.useState({
		name: "популярні",
		sortProperty: "rating",
	});*/
	/*const [currentPage, setCurrentPage] = React.useState(1);*/
	const onChangePage = (page) => {
		dispatch(setCurrentPage(page));
	};

	const { searchValue } = React.useContext(SearchContext);
	//if params was changed and first render is done
	React.useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage,
			});
			navigate(`?${queryString}`);
		}
		isMounted.current = true;
	}, [categoryId, sort.sortProperty, currentPage]);
	//if first render is done-check url params and save it in redux
	React.useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1));
			const sort = sortList.find((obj) => {
				return obj.sortProperty == params.sortProperty;
			});
			dispatch(setFilters({ ...params, sort }));
			isSearch.current = true;
		}
	}, []);

	const fetchPizzas = () => {
		const category = categoryId > 0 ? `&category=${categoryId}` : "";
		const sortBy = sort.sortProperty.replace("-", "");
		const order = sort.sortProperty.includes("-") ? "asc" : "desc";
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
	};
	//if first render is done-make a request for pizza
	React.useEffect(() => {
		window.scrollTo(0, 0);
		if (!isSearch.current) {
			fetchPizzas();
		}
		isSearch.current = false;
	}, [categoryId, sort.sortProperty, searchValue, currentPage]);

	return (
		<div className="container">
			<div className="block__filter">
				<Categories
					categoryId={categoryId}
					onClickCategory={onClickCategory}
				/>
				<Sort />
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
			<Pagination onChangePage={onChangePage} />
		</div>
	);
}
