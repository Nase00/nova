import { createStore,
         applyMiddleware,
         combineReducers } from 'redux';

import reducers from 'ducks';

const rootReducer = combineReducers(reducers);
const store = createStore(rootReducer);

export default store;
