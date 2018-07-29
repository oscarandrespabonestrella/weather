import { createStore, combineReducers, compose , applyMiddleware} from 'redux';
import statesReducer from './reducers/root';
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    states: statesReducer
});

let composeEnhancers = compose;

const configureStore = () =>{
    return createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;