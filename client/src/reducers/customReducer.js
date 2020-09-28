import { FETCH_CUSTOM, UPDATE_CUSTOM } from '../actions/types';
  
  const initialState = {
    settings: [],
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case FETCH_CUSTOM:
        return {
          ...state,
          settings: action.payload
        };
      case UPDATE_CUSTOM:
        const newArray = [];
        newArray.push(action.payload);
        return {
            ...state,
            settings: newArray
        };
      default:
        return state;
    }
  }