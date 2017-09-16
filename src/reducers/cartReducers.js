"use strict";
export function cartReducers(state = { cart: [] }, action) {
	switch (action.type) {
		case "GET_CART":
		return{
			...state,
			cart:action.payload,
				totalAmount: totals(action.payload).amount,
				totalQty: totalsQty(action.payload).qty
		}
		case "ADD_TO_CART":
			return {
				...state,
				cart: action.payload,
				totalAmount: totals(action.payload).amount,
				totalQty: totalsQty(action.payload).qty
			};

			break;

		case "DELETE_CART_ITEM":
			return {
				...state,
				cart: action.payload,
				totalAmount: totals(action.payload).amount,
				totalQty: totalsQty(action.payload).qty
			};
			break;
		case "UPDATE_CART_ITEM":
	
			return {...state,
				cart: action.payload,
				totalAmount: totals(action.payload).amount,
				totalQty: totalsQty(action.payload).qty
			};

			break;
	}
	return state;
}
export function totals(payloadArr) {
	const totalAmount = payloadArr
		.map(function(cartArray) {
			return cartArray.price * cartArray.quantity;
		})
		.reduce(function(a, b) {
			return a + b;
		}, 0); //start summing from index 0
	return { amount: totalAmount.toFixed(2) };
}
export function totalsQty(payloadArr) {
	const totalQty = payloadArr
		.map(function(cartArray) {
			return cartArray.quantity;
		})
		.reduce(function(a, b) {
			return a + b;
		}, 0); //start summing from index 0
	return { qty: totalQty.toFixed() };
}