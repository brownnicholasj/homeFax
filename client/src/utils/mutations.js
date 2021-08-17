import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
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
  }
`;

export const ADD_HOME = gql`
mutation Addhome($address: HomeAddress!) {
  addHome(address: $address) {
    _id
    address {
      street1
      street2
      city
      state
      zip
    }
  }
}
`
export const TRANSFER_HOME = gql`
mutation TransferHome($transferer: ID, $receiver: ID, $home: ID!) {
  transferHome(transferer: $transferer, receiver: $receiver, home: $home) {
    _id
    firstName
    lastName
    homes {
      _id
      address {
        street1
        street2
        city
        state
        zip
      }
    }
  }
}
`

export const ADD_AREA = gql`
mutation AddArea($homeId: ID!, $name: String!, $icon: String) {
  addArea(homeId: $homeId, name: $name, icon: $icon) {
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
      icon
      attributes {
        type
        detail {
          key
          value
        }
      }
    }
  }
}
`

export const ADD_ATTRIBUTE = gql`
mutation AddAttribute($areaId: ID!, $type: String!) {
  addAttribute(areaId: $areaId, type: $type) {
    _id
    address {
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
          key
          value
        }
      }
    }
  }
}
`

export const ADD_DETAIL = gql`
mutation AddDetail($attributeId: ID!, $key: String!, $value: String!) {
  addDetail(attributeId: $attributeId, key: $key, value: $value) {
    _id
    address {
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
          key
          value
        }
      }
    }
  }
}
`
export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const EDIT_AREA = gql`
mutation EditArea($areaId: ID!, $name: String, $icon: String) {
  editArea(areaId: $areaId, name: $name, icon: $icon) {
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
      icon
      attributes {
        type
        detail {
          key
          value
        }
      }
    }
  }
}
`;

export const EDIT_ATTRIBUTE = gql`
mutation EditAttribute($attributeId: ID!, $type: String!) {
  editAttribute(attributeId: $attributeId, type: $type) {
    _id
    address {
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
          key
          value
        }
      }
    }
  }
}
`;

export const EDIT_DETAIL = gql`
mutation EditDetail($detailId: ID!, $key: String, $value: String) {
  editDetail(detailId: $detailId, key: $key, value: $value) {
    _id
    address {
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
          key
          value
        }
      }
    }
  }
}
`;