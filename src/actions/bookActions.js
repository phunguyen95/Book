"use strict"
import axios from 'axios';

//post a book
export function getBooks(book){
	return function(dispatch){
		axios.get('/api/books').then(function(response){
			dispatch({type:"GET_BOOKS",payload:response.data})
		}).catch(function(err){
			dispatch({type:"GET_BOOKS_REJECTED",payload:err})
		})
	}

}
export function postBooks(book){
	return(function(dispatch){
		axios.post('/api/books/',book).then(function(response){
			dispatch({type:"POST_BOOK",payload:response.data})
		})
		.catch(function(err){
			dispatch:({type:"POST_BOOK_REJECTED",payload:"There was an error while posting"})
		})
	})
	// return{
	// 	type:"POST_BOOK",
	// 	payload:book
	// }
}
export function deleteBooks(bookId)
{
	return function(dispatch){
		axios.delete('/api/books/'+bookId).then(function(response){
			dispatch({type:"DELETE_BOOK",payload:bookId})
		}).catch(function(err){
			dispatch:({type:"DELETE_BOOK_REJECTED",payload:err})
		})
	}
}

export function updateBook(bookId)
{
	return{
		type:"UPDATE_BOOK",
		payload:bookId
	}
}
export function resetButton()
{
	return{
		type:"RESET_BUTTON"
	}
}