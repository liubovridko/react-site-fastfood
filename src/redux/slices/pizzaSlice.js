import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const fetchPizzas = createAsyncThunk(
	"pizza/fetchPizzasByParams",
	async (params) => {
		const { currentPage, category, sortBy, order, search } = params;
		const res = await axios.get(
			`https://64fb19d3cb9c00518f7aa530.mockapi.io/items?limit=4&page=${currentPage}${category}&sortBy=${sortBy}&order=${order}${search}`,
		);
		return res.data;
	},
);

const initialState = {
	items: [],
	status: "loading", //"loading", "succes", "error"
};

export const pizzaSlice = createSlice({
	name: "pizza",
	initialState,
	reducers: {
		setItems(state, action) {
			state.items = action.payload;
		},
	},
	extraReducers: {
		// Add reducers for additional action types here, and handle loading state as needed
		[fetchPizzas.pending]: (state) => {
			state.status = "loading";
			state.items = [];
		},
		[fetchPizzas.fulfilled]: (state, action) => {
			state.status = "succes";
			state.items = action.payload;
		},
		[fetchPizzas.rejected]: (state) => {
			state.status = "error";
			state.items = [];
		},
	},
});

// Action creators are generated for each case reducer function
export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;