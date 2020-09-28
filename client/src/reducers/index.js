import { combineReducers } from 'redux';
import monthReducer from './monthReducer';
import customReducer from './customReducer';

export default combineReducers({
  months: monthReducer,
  custom: customReducer
});