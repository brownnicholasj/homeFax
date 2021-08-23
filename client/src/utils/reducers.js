import { useReducer } from 'react';
import {
  UPDATE_USER,
  UPDATE_TRANSFERS
} from './actions';
import { idbPromise } from './helpers'

// The reducer is a function that accepts the current state and an action. It returns a new state based on that action.
export const reducer = (state, action) => {
  switch (action.type) {
    // Returns a copy of state with an update products array. We use the action.products property and spread it's contents into the new array.
    case UPDATE_USER:
      const updatedState = {
        ...state,
        user: action.user,
        homes: action.user.homes
      }
      idbPromise('user', 'put', action.user);
      action.user.homes.forEach((home) => {
        idbPromise('homes', 'put', home);
      });
      return updatedState;
    
    case UPDATE_TRANSFERS:
      const updatedUserTransfers = {
        ...state,
        transfers: action.transfers
      };
      action.transfers.forEach((transfer) => {
        idbPromise('transfers', 'put', transfer)
      });
      return updatedUserTransfers;
		default:
			return state;
	}
};

export function useHFReducer(initialState) {
	return useReducer(reducer, initialState);
}
