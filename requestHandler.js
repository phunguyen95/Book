"use strict"
import axios from 'axios'
import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {renderToString} from 'react-dom/server'
import {match,RouterContext} from 'react-router';
import reducers from './src/reducers/index';
import routes from './src/routes';
function handleRender(req,res){
axios.get('http://localhost:3001/books').then(function(response){

	//step 1: create a redux store on the server
	const store=createStore(reducers,{"books":{"books":response.data}}) 

	//step 2: get initial state from the store
	const initialState=JSON.stringify(store.getState()).replace(/<\/script/g,'<\\/script').replace(/<!--/g, '<\\!--');


	//sterp 3: implement react-router on the server to intercept clients requests and define what to do with them 
	const Routes={
		routes:routes,
		location:req.url 	
	}
	match(Routes,function(error,redirect,props){
		if(error){
			res.status(500).send('error fullfiling the request');
		}
		else if(redirect){
			res.status(302,redirect.pathname +redirect.search)
		}
		else if(props){
			const reactComponent=renderToString(
				<Provider store={store}>
					<RouterContext {...props}/>
				</Provider>
				)
			res.status(200).render('index',{reactComponent,initialState })
		}
		else
		{
			res.status(404).send('not found');
		}
	})
}) 
.catch(function(err){
	console.log('initial server side rendering errror',err);
})
}
module.exports =handleRender;