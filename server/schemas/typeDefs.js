const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
  }

  type Product {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    category: Category
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    dob: String!
    email: String!
    orders: [Order]
    homes: [Home]
  }

  type Home {
    _id: ID!
    address: Address!
    areas: [Area]
  }

  type Address {
    _id: ID!
    street1: String!
    street2: String
    city: String!
    state: String!
    zip: String!
  }

  input HomeAddress {
    street1: String!
    street2: String
    city: String!
    state: String!
    zip: String!
  }

  type Area {
    _id: ID!
    name: String!
    icon: String
    attributes: [Attribute]
  }

  type Attribute {
    _id: ID!
    type: String!
    detail: [Detail]
  }
  
  type Detail {
    _id: ID!
    key: String!
    value: String!
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
    home(homeId: ID!): Home
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addHome(address: HomeAddress!): Home
    addArea(homeId: ID!, name: String!, icon: String): Home
    editArea(areaId: ID!, name: String, icon: String): Home
    addAttribute(areaId: ID!, type: String!): Home
    editAttribute(attributeId: ID!, type: String!): Home
    addDetail(attributeId: ID!, key: String!, value: String!): Home
    editDetail(detailId: ID!, key: String, value: String): Home
    transferHome(transferer: ID, receiver: ID, home: ID!): User


    addOrder(products: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateProduct(_id: ID!, quantity: Int!): Product
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
