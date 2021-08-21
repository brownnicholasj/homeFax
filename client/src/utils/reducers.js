import { useReducer } from 'react';
import {
  UPDATE_USER,
  UPDATE_HOMES,
  ADD_HOME,
  EDIT_HOME,
  DELETE_HOME,
  ADD_AREA,
  EDIT_AREA,
  DELETE_AREA,
  ADD_ATTRIBUTE,
  EDIT_ATTRIBUTE,
  DELETE_ATTRIBUTE,
  ADD_DETAIL,
  EDIT_DETAIL,
  DELETE_DETAIL
} from './actions';

// The reducer is a function that accepts the current state and an action. It returns a new state based on that action.
export const reducer = (state, action) => {
  switch (action.type) {
    // Returns a copy of state with an update products array. We use the action.products property and spread it's contents into the new array.
    case UPDATE_USER:
      console.log('hit at reducer')
      const test = {
        ...state,
        user: action.user,
        homes: action.user.homes
      }
      console.log(test);
      return test;

    case UPDATE_HOMES:
      return {
        ...state,
        homes: [...action.homes],
      };
  
    case ADD_HOME:
      return {
        ...state,
        products: [...action.products],
      };

      case EDIT_HOME:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.product],
      };
    case DELETE_HOME:
      return {
        ...state,
        cart: [...state.cart, ...action.products],
      };
    // Returns a copy of state, sets the cartOpen to true and maps through the items in the cart.
    // If the item's `id` matches the `id` that was provided in the action.payload, we update the purchase quantity.
    // case UPDATE_CART_QUANTITY:
    //   return {
    //     ...state,
    //     cartOpen: true,
    //     cart: state.cart.map((product) => {
    //       if (action._id === product._id) {
    //         product.purchaseQuantity = action.purchaseQuantity;
    //       }
    //       return product;
    //     }),
    //   };

    // // First we iterate through each item in the cart and check to see if the `product._id` matches the `action._id`
    // // If so, we remove it from our cart and set the updated state to a variable called `newState`
    // case REMOVE_FROM_CART:
    //   let newState = state.cart.filter((product) => {
    //     return product._id !== action._id;
    //   });

    //   // Then we return a copy of state and check to see if the cart is empty.
    //   // If not, we set the cartOpen status to  `true`. Then we return an updated cart array set to the value of `newState`.
    //   return {
    //     ...state,
    //     cartOpen: newState.length > 0,
    //     cart: newState,
    //   };

    // case CLEAR_CART:
    //   return {
    //     ...state,
    //     cartOpen: false,
    //     cart: [],
    //   };

    // case TOGGLE_CART:
    //   return {
    //     ...state,
    //     cartOpen: !state.cartOpen,
    //   };

    // case UPDATE_CATEGORIES:
    //   return {
    //     ...state,
    //     categories: [...action.categories],
    //   };

    // case UPDATE_CURRENT_CATEGORY:
    //   return {
    //     ...state,
    //     currentCategory: action.currentCategory,
    //   };

    // Return the state as is in the event that the `action.type` passed to our reducer was not accounted for by the developers
    // This saves us from a crash.
    default:
      return state;
  }
};

export function useHFReducer(initialState) {
  return useReducer(reducer, initialState);
}
