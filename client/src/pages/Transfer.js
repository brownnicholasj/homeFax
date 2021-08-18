import React from 'react';
import Content from '../components/Content';
import Auth from '../utils/auth';
import { Card } from '@material-ui/core';
import { CardHeader } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Collapse } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { Link } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { useState } from 'react';
import { Paper } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Button } from '@material-ui/core';

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
	const [expanded, setExpanded] = useState(false);
	const [contactExpanded, setContactExpanded] = useState(false);
	const [passwordExpanded, setPasswordExpanded] = useState(false);
	const [deleteExpanded, setDeleteExpanded] = useState(false);

	const handleExpandClick = (e) => {
		console.log('e.currentTarget.id :>> ', e.currentTarget.id);
		switch (e.currentTarget.id) {
			case 'personal':
				setExpanded(!expanded);
				break;
			case 'contact':
				setContactExpanded(!contactExpanded);
				break;
			case 'passwordandsecurity':
				setPasswordExpanded(!passwordExpanded);
				break;
			case 'deleteprofile':
				setDeleteExpanded(!deleteExpanded);
				break;

			default:
				break;
		}
	};

	const [formState, setFormState] = useState({
		street1: '1 Main St',
		street2: 'PO BOX 1',
		city: 'Kansas City',
		state: 'KS',
		zip: '65432',
		transferEmail: '',
	});

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormState({
			...formState,
			[name]: value,
		});
	};

	return (
		<Grid container spacing={4}>
			<Grid item xs={12}>
				<Typography variant='h2'>Transfer Home</Typography>
			</Grid>
			<Grid item xs={0} md={2} lg={2}>
				<Box></Box>
			</Grid>
			<Grid item xs={12} md={8} lg={6}>
				<Card>
					<CardHeader
						action={
							expanded ? (
								<Link
									id='personal'
									style={{ cursor: 'pointer' }}
									onClick={handleExpandClick}
									variant='body2'
								>
									Close
								</Link>
							) : (
								<Link
									id='personal'
									style={{ cursor: 'pointer' }}
									onClick={handleExpandClick}
									variant='body2'
								>
									Update
								</Link>
							)
						}
						title='Home information'
					/>
					<CardContent>
						{!expanded && (
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
						)}
					</CardContent>
					<Collapse in={expanded} timeout='auto' unmountOnExit>
						<CardContent>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={6}>
									<TextField
										name='firstName'
										variant='standard'
										fullWidth
										id='firstName'
										label='First Name'
										defaultValue={firstName}
										autoFocus
										onChange={handleChange}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										variant='standard'
										fullWidth
										id='lastName'
										label='Last Name'
										name='lastName'
										defaultValue={lastName}
										onChange={handleChange}
									/>
								</Grid>
								<Grid container justifyContent='flex-end'>
									<Box mx={3}>
										<Button variant='contained' color='secondary'>
											<Typography variant='button'>Cancel</Typography>
										</Button>
									</Box>
									<Button variant='contained' color='primary'>
										<Typography variant='button'>Save & Close</Typography>
									</Button>
								</Grid>
							</Grid>
						</CardContent>
					</Collapse>
				</Card>
			</Grid>
			<Grid item xs={0} md={2} lg={4}>
				<Box></Box>
			</Grid>
		</Grid>
	);
}

export default Transfer;
