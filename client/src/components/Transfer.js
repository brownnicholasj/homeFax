import React from 'react';
import Content from './Content';
import Auth from '../utils/auth';
import { Card } from '@material-ui/core';
import { CardHeader } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
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

function Transfer(props) {
	const { email, username, firstName, lastName } = Auth.getProfile().data;
	const classes = useStyles();
	// const [expanded, setExpanded] = useState(false);
	// const [contactExpanded, setContactExpanded] = useState(false);
	// const [passwordExpanded, setPasswordExpanded] = useState(false);
	// const [deleteExpanded, setDeleteExpanded] = useState(false);

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
			<Grid item xs={0} md={2} lg={2}>
				<Box></Box>
			</Grid>
			<Grid item xs={12} md={4} lg={3}>
				<Card>
					<CardHeader title='Home information' />
					<CardContent>
						<Typography color='textPrimary' variant='standard'>
							{formState.street1}
							<br />
							{formState.street2}
							<br />
							{formState.city}
							<br />
							{formState.state}
							<br />
							{formState.zip}
						</Typography>
					</CardContent>
				</Card>
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
				fullWidth
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
			<Grid item xs={0} md={2} lg={4}>
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
