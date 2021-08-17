const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Category, Order, Home } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
	Query: {
		user: async (parent, args, context) => {
			if (context.user) {
				const user = await User.findById(context.user._id).populate('homes');

				return user;
			}

			throw new AuthenticationError('Not logged in');
		},
		home: async (parent, { homeId }) => {
			console.log(homeId);
			const home = await Home.findById(homeId);

			return home;
		},
		// categories: async () => {
		//   return await Category.find();
		// },
		// home: async (parent, { _id }) => {
		//   return await Category.findById(_id);
		// },
		// products: async (parent, { category, name }) => {
		//   const params = {};

		//   if (category) {
		//     params.category = category;
		//   }

		//   if (name) {
		//     params.name = {
		//       $regex: name
		//     };
		//   }

		//   return await Product.find(params).populate('category');
		// },
		// product: async (parent, { _id }) => {
		//   return await Product.findById(_id).populate('category');
		// },
		// order: async (parent, { _id }, context) => {
		//   if (context.user) {
		//     const user = await User.findById(context.user._id).populate({
		//       path: 'orders.products',
		//       populate: 'category'
		//     });

		//     return user.orders.id(_id);
		//   }

		//   throw new AuthenticationError('Not logged in');
		// },
		// checkout: async (parent, args, context) => {
		//   const url = new URL(context.headers.referer).origin;
		//   const order = new Order({ products: args.products });
		//   const line_items = [];

		//   const { products } = await order.populate('products').execPopulate();

		//   for (let i = 0; i < products.length; i++) {
		//     const product = await stripe.products.create({
		//       name: products[i].name,
		//       description: products[i].description,
		//       images: [`${url}/images/${products[i].image}`]
		//     });

		//     const price = await stripe.prices.create({
		//       product: product.id,
		//       unit_amount: products[i].price * 100,
		//       currency: 'usd',
		//     });

		//     line_items.push({
		//       price: price.id,
		//       quantity: 1
		//     });
		//   }

		//   const session = await stripe.checkout.sessions.create({
		//     payment_method_types: ['card'],
		//     line_items,
		//     mode: 'payment',
		//     success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
		//     cancel_url: `${url}/`
		//   });

		//   return { session: session.id };
		// }
	},
	Mutation: {
		addUser: async (parent, args) => {
			console.log('trying to create user');
			const user = await User.create(args);
			const token = signToken(user);

			return { token, user };
		},
		addHome: async (parent, args) => {
			console.log(args);
			const home = await Home.create(args);
			return home;
		},
		addArea: async (parent, { homeId, name, icon }) => {
			const home = await Home.findByIdAndUpdate(
				homeId,
				{
					$addToSet: { areas: { name, icon } },
				},
				{ new: true }
			);
			return home;
		},
		editArea: async (parent, { areaId, name, icon }) => {
			const home = await Home.findOne({ 'areas._id': areaId });
			const areas = home.areas.map((area) => {
				if (area._id == areaId) {
					area.name = name;
					area.icon = icon;
				}
				return area;
			});
			const updatedHome = await Home.findOneAndUpdate(
				{ 'areas._id': areaId },
				{
					areas: areas,
				},
				{ new: true }
			);
			return updatedHome;
		},
		addAttribute: async (parent, { areaId, type }) => {
			const home = await Home.findOne({ 'areas._id': areaId });
			const areas = home.areas.map((area) => {
				if (area._id == areaId) {
					area.attributes.push({ type: type });
				}
				return area;
			});
			const updatedHome = await Home.findOneAndUpdate(
				{ 'areas._id': areaId },
				{
					areas: areas,
				},
				{ new: true }
			);
			return updatedHome;
		},
		editAttribute: async (parent, { attributeId, type }) => {
			const home = await Home.findOne({ 'areas.attributes._id': attributeId });
			const areas = home.areas.map((area) => {
				const attributes = area.attributes.map((attribute) => {
					if (attribute._id == attributeId) {
						attribute.type = type;
					}
					return attribute;
				});
				return area;
			});
			const updatedHome = await Home.findOneAndUpdate(
				{ 'areas.attributes._id': attributeId },
				{
					areas: areas,
				},
				{ new: true }
			);

			return updatedHome;
		},
		addDetail: async (parent, { attributeId, key, value }) => {
			const home = await Home.findOne({ 'areas.attributes._id': attributeId });
			const areas = home.areas.map((area) => {
				const attributes = area.attributes.map((attribute) => {
					if (attribute._id == attributeId) {
						attribute.detail.push({ key, value });
					}
					return attribute;
				});
				return area;
			});
			const updatedHome = await Home.findOneAndUpdate(
				{ 'areas.attributes._id': attributeId },
				{
					areas: areas,
				},
				{ new: true }
			);

			return updatedHome;
		},
		editDetail: async (parent, { detailId, key, value }) => {
			const home = await Home.findOne({ 'areas.attributes.detail._id': detailId });
			const areas = home.areas.map((area) => {
				const attributes = area.attributes.map((attribute) => {
					const details = attribute.detail.map((detail) => {
						if (detail._id == detailId) {
							detail.key = key;
							detail.value = value;
						}
						return detail;
					});
					return attribute;
				});
				return area;
			});
			const updatedHome = await Home.findOneAndUpdate(
				{ 'areas.attributes.detail._id': detailId },
				{
					areas: areas,
				},
				{ new: true }
			);

			return updatedHome;
		},
		transferHome: async (parent, { transferer, receiver, home }, context) => {
			// We need to have a serious discussion about how homes are transfered in our app. At this point it's pretty wide open.
			if (transferer) {
				await User.findByIdAndUpdate(transferer, {
					$pull: { homes: home },
				});
			}
			if (receiver) {
				await User.findByIdAndUpdate(receiver, {
					$addToSet: { homes: home },
				});
			}
			const user = await User.findById(context.user._id).populate('homes');
			return user;

			// CODE USED FOR TESTING IN INSOMNIA - PLEASE DON'T DELETE.
			// let transferUser;
			// if (transferer) {
			//   transferUser = await User.findByIdAndUpdate(transferer, {
			//     $pull: { 'homes': home }
			//   }, { new: true }).populate('homes');
			//   return transferUser;
			// }
			// let receiptUser;
			// if (receiver) {
			//   receiptUser = await User.findByIdAndUpdate(receiver, {
			//     $addToSet: { 'homes': home }
			//   }, { new: true }).populate('homes');
			//   return receiptUser;
			// }
		},
		updateUser: async (parent, args, context) => {
			if (context.user) {
				return await User.findByIdAndUpdate(context.user._id, args, { new: true });
			}

			throw new AuthenticationError('Not logged in');
		},
		login: async (parent, { email, password }) => {
			console.log('logging in');
			const user = await User.findOne({ email });

			if (!user) {
				throw new AuthenticationError('Incorrect credentials');
			}

			const correctPw = await user.isCorrectPassword(password);

			if (!correctPw) {
				throw new AuthenticationError('Incorrect credentials');
			}

			const token = signToken(user);

			return { token, user };
		},
	},
};

module.exports = resolvers;
