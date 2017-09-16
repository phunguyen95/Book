"use strict"
import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import MainComponent from './main';
import BookList from './components/pages/booksList';
import BooksForm from './components/pages/booksForm';
import Cart from './components/pages/cart';
import reducers from "./reducers/index";


const routes = (
    <Router history = {browserHistory}>
       <Route path='/'component={MainComponent}>
         <IndexRoute component = {BookList} />
         <Route path='/admin' component={BooksForm}/>
         <Route path='/contactus' component=  {Cart}/>
       </Route>
     </Router>
);
export default routes;