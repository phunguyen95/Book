"use strict"
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware,createStore} from "redux";
import logger from 'redux-logger';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import reducers from "./reducers/index";
import thunk from 'redux-thunk';
const middleware = applyMiddleware(thunk,logger);
//we will pass initial state from server store 
const initialState=window.INITIAL_STATE;
//initialState is a global variable we use to capture the "initial state" from redux store in the server and pass it to the store in the client
const store = createStore(reducers,initialState,middleware);
import routes from './routes.js'
const Routes = (
  <Provider store = {store}>
   {routes}
  </Provider>
);
render(Routes , document.getElementById('app'));