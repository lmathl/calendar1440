import { FETCH_CUSTOM, UPDATE_CUSTOM } from './types';

const obj = JSON.parse(localStorage.getItem('app')) || {};
const { token, userId } = obj;

export const fetchCustom = () => dispatch => {
  fetch(`/api/customs?userId=${ userId }`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
  })
    .then(res => res.json())
    .then(customs => {
      console.log("* fetching customs", customs);

      dispatch({
        type: FETCH_CUSTOM,
        payload: customs
      });
    })
};

export const updateCustom = (custom, id) => dispatch => {
  fetch(`/api/customs/${ id }`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(custom)
  })
    .then(res => res.json())
    .then(custom => {
      console.log("* udpating customs", custom);
      dispatch({
        type: UPDATE_CUSTOM,
        payload: custom,
        id
      });
    })
};