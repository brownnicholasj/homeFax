import React from 'react';
import { useMutation } from '@apollo/client';
// import Snack from './Snack';
import Auth from '../utils/auth';
import { Card } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { Grid } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { useState } from 'react';
import { Box } from '@material-ui/core';
import { Button } from '@material-ui/core';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import HomeIcon from '@material-ui/icons/Home';
import { useStoreContext } from '../utils/GlobalState';
import { CREATE_TRANSFER } from '../utils/mutations';

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

function Transfer(
	{ user, homes, transfers, homeId, Street1, Street2, City, State, Zip },
	...props
) {
	const { email, username, firstName, lastName } = Auth.getProfile().data;
	const classes = useStyles();
	const [formState, setFormState] = useState({
		transferEmail: ''
	});
	// const [snack, setSnack] = useState({ status: false, message: '' });
	const [createTransfer, { error }] = useMutation(CREATE_TRANSFER);

	const [state, dispatch] = useStoreContext();
	// NEED TO RECEIVE THE INPUT FROM THE TRANSFER BUTTON ACTION

	// console.log(state);
	// const [formState, setFormState] = useState({
	// 	street1: '1 Main St',
	// 	street2: 'PO BOX',
	// 	city: 'Kansas City',
	// 	state: 'KS',
	// 	zip: '65432',
	// 	transferEmail: '',
	// });

	// NEED TO CATCH THE INPUT FROM SUBMIT
	const handleChange = (event) => {
		const { id, value } = event.target;
		setFormState({
			...formState,
			[id]: value,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log(formState.transferEmail);

		if (formState.transferEmail) {
			try {
				const mutationResponse = await createTransfer({
					variables: {
						transferer: email,
						receiver: formState.transferEmail,
						home: homeId,
					},
				});
				if (mutationResponse) {
					console.log(mutationResponse);
					// setSnack({
					// 	status: true,
					// 	message: `${formState.transferEmail} has been added to transfer`,
					// });
				}
			} catch (e) {
				console.log(e);
			}
		}
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
		<>
			<Card key={'homeId'} className={classes.root} variant='outlined'>
				<CardContent>
					<div className={classes.gridRoot}>
						<Grid container spacing={1}>
							<Typography
								className={classes.title}
								color='Primary'
								gutterBottom
								align='center'
							>
								<HomeIcon /> Transfer
								<Typography color='textPrimary'>{formState.Street1}</Typography>
								<Typography className={classes.pos} color='textPrimary'>
									{formState.Street2}
								</Typography>
								<Typography color='textPrimary' component='p'>
									{formState.City}, {formState.State} {formState.Zip}
								</Typography>
							</Typography>
							<Grid item xs={12}>
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
							</Grid>
							<Grid item xs={12}>
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
												onChange={handleChange}
											/>
										</CardContent>
									</Card>
								</Box>
							</Grid>

							<Box mx={3} paddingTop={2} alignItems='center'>
								<Button variant='contained' color='secondary'>
									<Typography variant='button' onClick={handleCancel}>
										Cancel
									</Typography>
								</Button>

								<Button variant='contained' color='primary'>
									<Typography variant='button' onClick={handleSubmit}>
										Save & Close
									</Typography>
								</Button>
							</Box>
						</Grid>
					</div>
				</CardContent>
			</Card>
		</>
	);
}

export default Transfer;
