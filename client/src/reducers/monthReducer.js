import {
  FETCH_MONTHS,
  NEW_MONTH,



  SELECT_ALL, SELECT_DAY,


  UNSELECT_ALL, UNSELECT_DAY, UPDATE_MONTH
} from '../actions/types';

const initialState = {
  items: [],
  selectedDays: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MONTHS:
      return {
        ...state,
        items: action.payload
      };
    case NEW_MONTH:
      return {
        ...state,
        items: [action.payload, ...state.items],
      };
    case UPDATE_MONTH:
      var index = state.items.map(e => e.id).indexOf(action.id);
      return {
        ...state,
        items: [
          ...state.items.slice(0, index),
          action.payload,
          ...state.items.slice(index + 1)
        ],
      };
    case SELECT_DAY:
      return {
        ...state,
        selectedDays: [...state.selectedDays, action.day],
      };
    case UNSELECT_DAY:
      return {
        ...state,
        selectedDays: state.selectedDays.filter(item => item !== action.day),
      };
    case SELECT_ALL:
      const allSelectedArray = new Array(action.number).fill().map((_, idx) => 1 + idx);
      return {
        ...state,
        selectedDays: allSelectedArray,
      };
    case UNSELECT_ALL:
      return {
        ...state,
        selectedDays: [],
      };
    default:
      return state;
  }
}