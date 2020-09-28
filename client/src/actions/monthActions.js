import {
  FETCH_MONTHS,
  NEW_MONTH,
  SELECT_ALL, SELECT_DAY,
  UNSELECT_ALL, UNSELECT_DAY, UPDATE_MONTH
} from './types';

const obj = JSON.parse(localStorage.getItem('app')) || {};
const { token, userId } = obj;

export const fetchMonths = () => dispatch => {
  fetch(`/api/months?userId=${ userId }`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + token,
    }
  })
    .then(function (response) {
      console.log("* response", response);
      return response.text().then(function (text) {
        return text ? JSON.parse(text) : []
      })
    })
    .then(months => {
      console.log("* fetching months", months)
      if (months.status === 204) {
        // no months shown
      } else {
        dispatch({
          type: FETCH_MONTHS,
          payload: months
        });
      }
    })
};

export const newMonth = monthData => dispatch => {
  fetch('/api/months', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({ ...monthData, userId: userId.toString() })
  })
    .then(res => res.json())
    .then(month => {
      console.log("* adding month", month)

      dispatch({
        type: NEW_MONTH,
        payload: month
      });
    })
};

export const updateMonth = (monthData, id) => dispatch => {
  fetch(`/api/months/${ id }`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(monthData)
  })
    .then(res => res.json())
    .then(month => {
      console.log("* updating month", month);
      dispatch({
        type: UPDATE_MONTH,
        payload: month,
        id
      });
    })
};

export const selectDay = (day) => dispatch => {
  dispatch({
    type: SELECT_DAY,
    day,
  })
};

export const unselectDay = (day) => dispatch => {
  dispatch({
    type: UNSELECT_DAY,
    day,
  })
};

export const selectAll = (numberOfDays) => dispatch => {
  dispatch({
    type: SELECT_ALL,
    number: numberOfDays
  })
};

export const unselectAll = () => dispatch => {
  dispatch({
    type: UNSELECT_ALL,
  })
};