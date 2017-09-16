"use strict"
//step 3 define reducer
export  function booksReducers(state={
	books:[]
}
	,action){
	switch(action.type){
		case "GET_BOOKS":
		return {...state,books:[...action.payload]}

		
		case "POST_BOOK":
		let books=state.books.concat(action.payload);
			return {...state,books,msg:'Saved!,Click to continue',style:'success',validation:'success'};
	
		case "POST_BOOK_REJECTED":
		return{...state,msg:'Please try again',style:'danger',validation:'error'}

		case "DELETE_BOOK":
		const currentBookToDelete=[...state.books]
		const indexToDelete=currentBookToDelete.findIndex((book)=>{
			return book._id==action.payload //2 == '2'
		})
		return {books:[...currentBookToDelete.slice(0,indexToDelete),...currentBookToDelete.slice(indexToDelete+1)]}


		case "UPDATE_BOOK":
		//create a copy of the current array of books
		const currentBookToUpdate=[...state.books]
		//determine at which index in books array is the book to be deleted
		const indexToUpdate=currentBookToUpdate.findIndex((book)=>{
			return book._id===action.payload._id;
		})
		//create a new book object with the new values and with the same array index of the item we want to replace. To achive this we will use
		//...spread but we could use concat method aswell
		const newBookToUpdate={
			...currentBookToUpdate[indexToUpdate],
			title:action.payload.title
		}
		// let newBookToUpdate={newBookToUpdate:currentBookToUpdate.concat[indexToUpdate],title:action.payload.title}
		//this log has the purpose to show you how newbooktoupdate look like
		console.log("what is it newBookToUpdate",newBookToUpdate);
		//use slice to remove the book at specified index, replace with the new object and concatenate with the rest of item in array
		return{
			books:[...currentBookToUpdate.slice(0,indexToUpdate),newBookToUpdate,...currentBookToUpdate.slice(indexToUpdate+1)]
		}
		case "RESET_BUTTON":
		return{
			...state, msg:null, style:'primary',validation:null
		}
		default:
		return state;
	}
}