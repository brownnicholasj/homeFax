import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      dob
      username
      homes {
        _id
        address {
          _id
          street1
          street2
          city
          state
          zip
        }
        areas {
          _id
          name
          icon
          attributes {
            _id
            type
            detail {
              _id
              key
              value
            }
          }
        }
      }
    }
  }
`;

export const QUERY_GET_HOME = gql`
query getHome($homeId: ID!) {
  home(homeId: $homeId) {
    _id
    address {
      street1
      street2
      city
      state
      zip
    }
    areas {
      name
    }
  }
}
`

export const QUERY_PRODUCTS = gql`
  query getProducts($category: ID) {
    products(category: $category) {
      _id
      name
      description
      price
      quantity
      image
      category {
        _id
      }  
    }  
  }  
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;

export const QUERY_ALL_PRODUCTS = gql`
  {
    products {
      _id
      name
      description
      price
      quantity
      category {
        name
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;
// Use graph and apollo to update user email
export const QUERY_UPDATE_USER = gql`
  {
    user {
      firstName
      lastName
      dob
      username
            }
          }
 `;