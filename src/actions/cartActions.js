"use strict"
import axios from 'axios';
export function getCart(){
	return function(dispatch){
		axios.get('/api/cart').then(function(response){
			dispatch({type:"GET_CART",payload:response.data})
		}).catch(function(err){
			dispatch:({type:"GET_CART_REJECTED",payload:"there was an error while view cart"})
		})
	}
}

export function addToCart(cart){
	return function(dispatch){
		axios.post('/api/cart/',cart).then(function(response){
			dispatch({type:"ADD_TO_CART",payload:response.data})
		})
		.catch(function(err){
			dispatch:({type:"ADD_TO_CART_REJECTED",payload:"There was an error while posting"})
		})
	}
	// return{
	// 	type:"POST_BOOK",
	// 	payload:book
	// }
}
	export function deleteCartItem(cart){
		return function(dispatch){
		axios.post('/api/cart',cart) .then(function(response){
			dispatch({type:"DELETE_CART_ITEM",payload:response.data})
		}).catch(function(err){
			dispatch:({type:"DELETE_CART_ITEM",payload:"there was an error while view cart"})
		})
	}
}


	export function updateCartItem(_id,unit,cart){
				const currentBookToUpdate = cart;
			//determine at which index in books array is the book to be deleted
			const indexToUpdate = currentBookToUpdate.findIndex(book => {
				return book._id === _id;
			});
			//create a new book object with the new values and with the same array index of the item we want to replace. To achive this we will use
			//...spread but we could use concat method aswell
			const newBookToUpdate = {
				...currentBookToUpdate[indexToUpdate],
				quantity:currentBookToUpdate[indexToUpdate].quantity + unit
			};
			// let newBookToUpdate={newBookToUpdate:currentBookToUpdate.concat[indexToUpdate],title:action.payload.title}
			//this log has the purpose to show you how newbooktoupdate look like
			console.log("what is it newBookToUpdate", newBookToUpdate);
			let cartUpdate = [
				...currentBookToUpdate.slice(0, indexToUpdate),
				newBookToUpdate,
				...currentBookToUpdate.slice(indexToUpdate + 1)
			];

			//use slice to remove the book at specified index, replace with the new object and concatenate with the rest of item in array
		return function(dispatch){
		axios.post('/api/cart/',cartUpdate).then(function(response){
			dispatch({type:"UPDATE_CART_ITEM",payload:response.data})
		})
		.catch(function(err){
			dispatch:({type:"UPDATE_CART_ITEM_REJECTED",payload:"There was an error while posting"})
		})
	}
}