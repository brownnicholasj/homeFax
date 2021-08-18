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
		password: String!
		dob: String!
		username: String!
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
		addUser(
			firstName: String!
			lastName: String!
			username: String!
			email: String!
			password: String!
			dob: String!
		): Auth
		deleteUser(password: String): User
		addHome(address: HomeAddress!): Home
		editHome(homeId: String!, address: HomeAddress): Home
		deleteHome(homeId: ID!): Home
		addArea(homeId: ID!, name: String!, icon: String): Home
		editArea(areaId: ID!, name: String, icon: String): Home
		deleteArea(areaId: ID!): Home
		addAttribute(areaId: ID!, type: String!): Home
		editAttribute(attributeId: ID!, type: String!): Home
		deleteAttribute(attributeId: ID!): Home
		addDetail(attributeId: ID!, key: String!, value: String!): Home
		editDetail(detailId: ID!, key: String, value: String): Home
		deleteDetail(detailId: ID!): Home
		transferHome(transferer: ID, receiver: ID, home: ID!): User

		addOrder(products: [ID]!): Order
		updateUser(
			firstName: String
			lastName: String
			username: String
			email: String
			password: String
		): User
		updateProduct(_id: ID!, quantity: Int!): Product
		login(identifier: String!, password: String!): Auth
	}
`;

module.exports = typeDefs;
