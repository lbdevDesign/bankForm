import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer'; 

/**
 * Redux store instance configured with the root reducer.
 * 
 * @type {Object}
 * @property {Function} dispatch - The Redux store's dispatch function.
 * @property {Function} getState - The Redux store's getState function.
 * @property {Function} subscribe - The Redux store's subscribe function.
 * @property {Function} replaceReducer - The Redux store's replaceReducer function.
 */
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;