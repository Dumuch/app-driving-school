import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';

import { lessonsReducer } from "./reducers/lessons";
import { userReducer } from "./reducers/user";

const rootReducer = combineReducers({
  lessons: lessonsReducer,
  user: userReducer
});

const configureStore = () => createStore(rootReducer, applyMiddleware(thunk));

export default configureStore;