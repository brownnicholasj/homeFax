import React, { useState } from 'react';
import Auth from '../utils/auth';
import { Card, CardContent, Typography, makeStyles, Grid, TextField, Box, Button } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import HomeIcon from '@material-ui/icons/Home';
import { useStoreContext } from '../utils/GlobalState';

// These imports are for bringing in data from the globalState
// They're only here for testing, as components will receive them as props.
// import { useStoreContext } from '../utils/GlobalState';
// import { effectHelper } from '../utils/helpers';
// import { useQuery, useMutation } from '@apollo/client';
// import { QUERY_USER } from '../utils/queries';





const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 345,
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	avatar: {
		backgroundColor: red[500],
	},
}));

function Transfer({ user, homes, transfers }) {
	const { email, username, firstName, lastName } = Auth.getProfile().data;
	const classes = useStyles();

	const [state, dispatch] = useStoreContext();
	// NEED TO RECEIVE THE INPUT FROM THE TRANSFER BUTTON ACTION
	const [formState, setFormState] = useState({
		street1: '1 Main St',
		street2: 'PO BOX',
		city: 'Kansas City',
		state: 'KS',
		zip: '65432',
		transferEmail: '',
	});

	// NEED TO CATCH THE INPUT FROM SUBMIT
	const handleSubmit = (event) => {
		console.log('handle save and submit action');
		// const { name, value } = event.target;

		// setFormState({
		// 	...formState,
		// 	[name]: value,
		// });
	};

	const handleCancel = (event) => {
		console.log('send user back to homes?');
	};

	return (
		<Grid container spacing={4}>
			<Grid item xs={12}>
				<Typography variant='h2'>Transfer Home</Typography>
			</Grid>
			<Grid item xs={2} md={2} lg={2}>
				<Box></Box>
			</Grid>
			<Grid item xs={12} md={4} lg={3}>
				{homes.map(home => (
					<Card key={home._id}>
						<CardContent>
							<Typography className={classes.title} color="textSecondary" gutterBottom>
								<HomeIcon />
							</Typography>
							<Typography variant="h5" component="h2">
								{home.address.street1}
							</Typography>
							<Typography className={classes.pos} color="textSecondary">
								{home.address.street2}
							</Typography>
							<Typography variant="body2" component="p">
								{home.address.city}, {home.address.state} {home.address.zip}
							</Typography>
						</CardContent>
					</Card>
				))}
			</Grid>
			<Box
				display='flex'
				justifyContent='center'
				alignItems='center'
				xs={12}
				md={2}
				lg={3}
			>
				<TransferWithinAStationIcon fontSize='large' />
			</Box>
			<Box
				display='flex'
				justifyContent='center'
				alignItems='center'
				ml={2}
			>
				<Card>
					<CardContent>
						<TextField
							name='transferEmail'
							variant='standard'
							fullWidth
							id='transferEmail'
							label='Email of Receiver'
							defaultValue=''
						/>
					</CardContent>
				</Card>
			</Box>
			<Grid item xs={2} md={2} lg={4}>
				<Box></Box>
			</Grid>
			<Grid container justifyContent='center'>
				<Box mx={3}>
					<Button variant='contained' color='secondary'>
						<Typography variant='button' onClick={handleCancel}>
							Cancel
						</Typography>
					</Button>
				</Box>
				<Button variant='contained' color='primary'>
					<Typography variant='button' onClick={handleSubmit}>
						Save & Close
					</Typography>
				</Button>
			</Grid>
		</Grid>
	);
}

export default Transfer;
