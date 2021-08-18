const db = require('./connection');
const { User, Product, Category, Home } = require('../models');

db.once('open', async () => {
	// await Category.deleteMany();

	// const categories = await Category.insertMany([
	//   { name: 'Food' },
	//   { name: 'Household Supplies' },
	//   { name: 'Electronics' },
	//   { name: 'Books' },
	//   { name: 'Toys' }
	// ]);

	// console.log('categories seeded');

	// await Product.deleteMany();

	// const products = await Product.insertMany([
	//   {
	//     name: 'Tin of Cookies',
	//     description:
	//       'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
	//     image: 'cookie-tin.jpg',
	//     category: categories[0]._id,
	//     price: 2.99,
	//     quantity: 500
	//   },
	//   {
	//     name: 'Canned Coffee',
	//     description:
	//       'Praesent sed lacinia mauris. Nulla congue nibh magna, at feugiat nunc scelerisque quis. Donec iaculis rutrum vulputate. Suspendisse lectus sem, vulputate ac lectus sed, placerat consequat dui.',
	//     image: 'canned-coffee.jpg',
	//     category: categories[0]._id,
	//     price: 1.99,
	//     quantity: 500
	//   },
	//   {
	//     name: 'Toilet Paper',
	//     category: categories[1]._id,
	//     description:
	//       'Donec volutpat erat erat, sit amet gravida justo sodales in. Phasellus tempus euismod urna. Proin ultrices nisi ut ipsum congue, vitae porttitor libero suscipit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam lacinia a nisi non congue.',
	//     image: 'toilet-paper.jpg',
	//     price: 7.99,
	//     quantity: 20
	//   },
	//   {
	//     name: 'Handmade Soap',
	//     category: categories[1]._id,
	//     description:
	//       'Praesent placerat, odio vel euismod venenatis, lectus arcu laoreet felis, et fringilla sapien turpis vestibulum nisl.',
	//     image: 'soap.jpg',
	//     price: 3.99,
	//     quantity: 50
	//   },
	//   {
	//     name: 'Set of Wooden Spoons',
	//     category: categories[1]._id,
	//     description:
	//       'Vivamus ut turpis in purus pretium mollis. Donec turpis odio, semper vel interdum ut, vulputate at ex. Duis dignissim nisi vel tortor imperdiet finibus. Aenean aliquam sagittis rutrum.',
	//     image: 'wooden-spoons.jpg',
	//     price: 14.99,
	//     quantity: 100
	//   },
	//   {
	//     name: 'Camera',
	//     category: categories[2]._id,
	//     description:
	//       'Vestibulum risus metus, luctus non tortor quis, tincidunt consectetur ex. Nullam vitae lobortis ligula, ut sagittis massa. Curabitur consectetur, tellus at pulvinar venenatis, erat augue cursus erat, eu ullamcorper eros lectus ultrices ipsum. Integer rutrum, augue vitae auctor venenatis, turpis turpis elementum orci, at sagittis risus mi a leo.',
	//     image: 'camera.jpg',
	//     price: 399.99,
	//     quantity: 30
	//   },
	//   {
	//     name: 'Tablet',
	//     category: categories[2]._id,
	//     description:
	//       'In sodales, ipsum quis ultricies porttitor, tellus urna aliquam arcu, eget venenatis purus ligula ut nisi. Fusce ut felis dolor. Mauris justo ante, aliquet non tempus in, tempus ac lorem. Aliquam lacinia dolor eu sem eleifend ultrices. Etiam mattis metus metus. Sed ligula dui, placerat non turpis vitae, suscipit volutpat elit. Phasellus sagittis, diam elementum suscipit fringilla, libero mauris scelerisque ex, ac interdum diam erat non sapien.',
	//     image: 'tablet.jpg',
	//     price: 199.99,
	//     quantity: 30
	//   },
	//   {
	//     name: 'Tales at Bedtime',
	//     category: categories[3]._id,
	//     description:
	//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare diam quis eleifend rutrum. Aliquam nulla est, volutpat non enim nec, pharetra gravida augue. Donec vitae dictum neque. Pellentesque arcu lorem, fringilla non ligula ac, tristique bibendum erat. Ut a semper nibh. Quisque a mi et mi tempor ultricies. Maecenas eu ipsum eu enim hendrerit accumsan at euismod urna.',
	//     image: 'bedtime-book.jpg',
	//     price: 9.99,
	//     quantity: 100
	//   },
	//   {
	//     name: 'Spinning Top',
	//     category: categories[4]._id,
	//     description: 'Ut vulputate hendrerit nibh, a placerat elit cursus interdum.',
	//     image: 'spinning-top.jpg',
	//     price: 1.99,
	//     quantity: 1000
	//   },
	//   {
	//     name: 'Set of Plastic Horses',
	//     category: categories[4]._id,
	//     description:
	//       'Sed a mauris condimentum, elementum enim in, rhoncus dui. Phasellus lobortis leo odio, sit amet pharetra turpis porta quis.',
	//     image: 'plastic-horses.jpg',
	//     price: 2.99,
	//     quantity: 1000
	//   },
	//   {
	//     name: 'Teddy Bear',
	//     category: categories[4]._id,
	//     description:
	//       'Vestibulum et erat finibus erat suscipit vulputate sed vitae dui. Ut laoreet tellus sit amet justo bibendum ultrices. Donec vitae felis vestibulum, congue augue eu, finibus turpis.',
	//     image: 'teddy-bear.jpg',
	//     price: 7.99,
	//     quantity: 100
	//   },
	//   {
	//     name: 'Alphabet Blocks',
	//     category: categories[4]._id,
	//     description:
	//       'Morbi consectetur viverra urna, eu fringilla turpis faucibus sit amet. Suspendisse potenti. Donec at dui ac sapien eleifend hendrerit vel sit amet lectus.',
	//     image: 'alphabet-blocks.jpg',
	//     price: 9.99,
	//     quantity: 600
	//   }
	// ]);

	// console.log('products seeded');

	await Home.deleteMany();

	const homes = await Home.insertMany([
		//PAMELA WASHINGTON HOME -- SIMPLE EXAMPLE
		//INDEX 0
		{
			address: {
				street1: '6137 sw 38th ter',
				city: 'Topeka',
				state: 'KS',
				zip: '66610',
			},
			areas: [
				{
					name: 'kitchen',
					icon: '',
					attributes: [
						{
							type: 'Paint',
							detail: [
								{
									key: 'color',
									value: 'periwinkle',
								},
								{
									key: 'painted',
									value: 'May of 2019',
								},
							],
						},
					],
				},
				{
					name: 'bathroom',
					icon: '',
					attributes: [
						{
							type: 'floor',
							detail: [
								{
									key: 'model number',
									value: '#11324',
								},
							],
						},
					],
				},
			],
		},
		//FRANK FLIPPERS HOUSE THAT HE IS RENOVATING (LOTS OF ITEMS)
		//INDEX 1
		{
			address: {
				street1: '1947 N 4th St',
				street2: 'nothing here',
				city: 'Kansas City',
				state: 'KS',
				zip: '66101',
			},
			areas: [
				{
					name: 'porch',
					icon: '',
					attributes: [
						{
							type: 'Stairs',
							detail: [
								{
									key: '2x4x8 boards',
									value: '24',
								},
								{
									key: 'screws',
									value: '2 1/2 outdoor',
								},
								{
									key: 'stain',
									value:
										'533-Cedar-Naturaltone-Semi-Transparent-Waterproofing-Exterior-Wood-Stain-and-Sealer-553301',
								},
							],
						},
						{
							type: 'Front Door',
							detail: [
								{
									key: 'Home Depot',
									value:
										'https://www.homedepot.com/p/Pacific-Entries-36-in-x-80-in-Craftsman-Espresso-Left-Hand-Inswing-3-lite-w-Arched-Reed-Glass-Stained-Alder-Wood-Pre-Hung-Front-Door-EA75CRDL/312022782',
								},
							],
						},
						{
							type: 'Entry',
							detail: [
								{
									key: 'Paint',
									value: 'PPG1056-2',
								},
								{
									key: 'Paint',
									value: 'Home Depot',
								},
								{
									key: 'Paint',
									value: 'Behr',
								},
							],
						},
						{
							type: 'Kitchen',
							detail: [
								{
									key: 'Refridgerator',
									value:
										'https://www.homedepot.com/p/Frigidaire-18-3-cu-ft-Top-Freezer-Refrigerator-in-White-FFTR1835VW/311743494',
								},
								{
									key: 'Dish Washer',
									value:
										'https://www.homedepot.com/p/GE-Profile-18-in-White-Top-Control-Smart-Dishwasher-120-Volt-with-Stainless-Steel-Tub-and-47-dBA-PDT145SGLWW/304789504',
								},
								{
									key: 'Disposal',
									value:
										'https://www.homedepot.com/p/InSinkErator-Badger-100-1-3-HP-Continuous-Feed-Garbage-Disposal-Badger-100/203144490',
								},
								{
									key: 'Cabinets',
									value:
										'https://www.homedepot.com/collection/kitchen-cabinets/hampton-wall-kitchen-cabinets-in-medium-oak',
								},
							],
						},
					],
				},
			],
		},
		//LAND LORD AND JOE RENTER SPLIT HOME
		//INDEX 2
		{
			address: {
				street1: '1474 Carla Rdg',
				city: 'Beverly Hills',
				state: 'CA',
				zip: '90210',
			},
			areas: [
				{
					name: 'pool',
					icon: '',
					attributes: [
						{
							type: 'Maintenance',
							detail: [
								{
									key: 'chemicals',
									value: 'chlorine',
								},
								{
									key: 'filter',
									value: '05/01/2021',
								},
							],
						},
					],
				},
				{
					name: 'elevator',
					icon: '',
					attributes: [
						{
							type: 'hardware',
							detail: [
								{
									key: 'plating',
									value: 'gold',
								},
								{
									key: 'adhesive',
									value: 'velcro',
								},
							],
						},
					],
				},
			],
		},
		// index 03
		{
			address: {
				street1: '2146 Louisiana Street',
				city: 'Lawrence',
				state: 'KS',
				zip: '66046',
			},
			areas: [
				{
					name: 'Studio',
					icon: '',
					attributes: [
						{
							type: 'Drums',
							detail: [
								{
									key: 'Sticks',
									value: 'Wooden',
								},
								{
									key: 'Snare',
									value: 'White',
								},
								{
									key: 'Stool',
									value: 'Metal',
								},
							],
						},
					],
				},
			],
		},
		// index 04
		{
			address: {
				street1: '6637 State Line Rd',
				city: 'Kansas City',
				state: 'MO',
				zip: '64113',
			},
			areas: [
				{
					name: 'Movie Theater',
					icon: '',
					attributes: [
						{
							type: 'Sofa',
							detail: [
								{
									key: 'Color',
									value: 'Black',
								},
								{
									key: 'Reclining',
									value: 'Yes',
								},
							],
						},
						{
							type: 'Screen',
							detail: [
								{
									key: 'Size',
									value: 'Large',
								},
								{
									key: 'Definition',
									value: 'Hi',
								},
							],
						},
					],
				},
			],
		},
		// index 05
		{
			address: {
				street1: '1137 SW Camden Ln',
				city: 'Topeka',
				state: 'KS',
				zip: '66604',
			},
			areas: [
				{
					name: 'Shop',
					icon: '',
					attributes: [
						{
							type: 'Workbench',
							detail: [
								{
									key: 'Material',
									value: 'Wood',
								},
								{
									key: 'Functional',
									value: 'Yes',
								},
							],
						},
					],
				},
			],
		},
		// index 06
		{
			address: {
				street1: '9860 La Jolla Farms Rd',
				city: 'La Jolla',
				state: 'CA',
				zip: '92037',
			},
			areas: [
				{
					name: 'Garden',
					icon: '',
					attributes: [
						{
							type: 'Plant Seeds',
							detail: [
								{
									key: 'Flower',
									value: 'Creative',
								},
								{
									key: 'Shrubs',
									value: 'Lazy',
								},
							],
						},
					],
				},
			],
		},
	]);

	console.log('homes seeded');

	await User.deleteMany();

	await User.create(
		//OWNS HOME[0] IN TOPEKA KS -- SIMPLE EXAMPLE
		{
			firstName: 'Pamela',
			lastName: 'Washington',
			dob: '1980-05-19',
			username: 'pam-o',
			email: 'pamela@testmail.com',
			password: 'password12345',
			// orders: [
			// 	{
			// 		products: [products[0]._id, products[0]._id, products[1]._id],
			// 	},
			// ],
			homes: [homes[0]._id],
		},
		//HOME FLIPPER WITH A LOT OF ACTIVITIES
		//INDEX 01
		{
			firstName: 'Frank',
			lastName: 'Flipper',
			dob: '1990-03-03',
			username: 'flipper',
			email: 'frankflipper@email.com',
			password: 'password12345',
			homes: [homes[1]._id],
		},
		//OWNS HOME IN BEVERLY HILLS RENTS TO JOE RENTER
		//INDEX 02
		{
			firstName: 'Land',
			lastName: 'Lord',
			dob: '1969-01-01',
			username: 'landlord',
			email: 'landlord@email.com',
			password: 'password12345',
			homes: [homes[2]._id],
		},
		//RENTS HOME IN BEVERLY HILLS FROM LAND LORD
		//INDEX 02
		{
			firstName: 'Joe',
			lastName: 'Renter',
			dob: '1969-02-02',
			username: 'renter',
			email: 'joerenter@email.com',
			password: 'password12345',
			homes: [homes[2]._id],
		},
		//Eddie
		//INDEX 03
		{
			firstName: 'Edward',
			lastName: 'Reed',
			dob: '2000-01-01',
			username: 'Edward',
			email: 'edward@email.com',
			password: 'password12345',
			homes: [homes[3]._id],
		},
		//Blake
		//INDEX 04
		{
			firstName: 'Blake',
			lastName: 'Wright',
			dob: '2000-01-01',
			username: 'Blake',
			email: 'blake@email.com',
			password: 'password12345',
			homes: [homes[4]._id],
		},
		//Bryan
		//INDEX 05
		{
			firstName: 'Bryan',
			lastName: 'Barnes',
			dob: '2000-01-01',
			username: 'Bryan',
			email: 'bryan@email.com',
			password: 'password12345',
			homes: [homes[5]._id],
		},
		//Nic
		//INDEX 06
		{
			firstName: 'Nicholas',
			lastName: 'Brown',
			dob: '2000-01-01',
			username: 'Nic',
			email: 'nicholas@email.com',
			password: 'password12345',
			homes: [homes[6]._id],
		}
	);

	console.log('users seeded');

	process.exit();
});
