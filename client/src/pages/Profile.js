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

function Profile(props) {
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
		dob: '',
		firstName: '',
		lastName: '',
		username: '',
		email: '',
		password: '',
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
				<Typography variant="h2">Profile Settings</Typography>
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
									id="personal"
									style={{ cursor: 'pointer' }}
									onClick={handleExpandClick}
									variant="body2"
								>
									Close
								</Link>
							) : (
								<Link
									id="personal"
									style={{ cursor: 'pointer' }}
									onClick={handleExpandClick}
									variant="body2"
								>
									Update
								</Link>
							)
						}
						title="Personal information"
					/>
					<CardContent>
						{!expanded && (
							<Typography color="textPrimary" variant="h4">
								{firstName + ' ' + lastName}
							</Typography>
						)}
					</CardContent>
					<Collapse in={expanded} timeout="auto" unmountOnExit>
						<CardContent>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={6}>
									<TextField
										name="firstName"
										variant="standard"
										fullWidth
										id="firstName"
										label="First Name"
										defaultValue={firstName}
										autoFocus
										onChange={handleChange}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										variant="standard"
										fullWidth
										id="lastName"
										label="Last Name"
										name="lastName"
										defaultValue={lastName}
										onChange={handleChange}
									/>
								</Grid>
								<Grid container justifyContent="flex-end">
									<Box mx={3}>
										<Button variant="contained" color="secondary">
											<Typography variant="button">Cancel</Typography>
										</Button>
									</Box>
									<Button variant="contained" color="primary">
										<Typography variant="button">Save & Close</Typography>
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
			<Grid item xs={0} md={2} lg={2}>
				<Box></Box>
			</Grid>
			<Grid item xs={12} md={8} lg={6}>
				<Card>
					<CardHeader
						action={
							contactExpanded ? (
								<Link
									id="contact"
									style={{ cursor: 'pointer' }}
									onClick={handleExpandClick}
									variant="body2"
								>
									Close
								</Link>
							) : (
								<Link
									id="contact"
									style={{ cursor: 'pointer' }}
									onClick={handleExpandClick}
									variant="body2"
								>
									Update
								</Link>
							)
						}
						title="Contact Settings"
						subheader="Let us know the best way to contact you"
					/>
					<CardContent>
						{!contactExpanded && (
							<Box>
								<Typography color="textPrimary" variant="h4">
									Email
								</Typography>
								<Typography color="textPrimary" variant="h6">
									{email}
								</Typography>
							</Box>
						)}
					</CardContent>
					<Collapse in={contactExpanded} timeout="auto" unmountOnExit>
						<CardContent>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<TextField
										name="email"
										variant="standard"
										fullWidth
										id="email"
										label="Email"
										defaultValue={email}
										autoFocus
										onChange={handleChange}
									/>
								</Grid>
								<Grid container justifyContent="flex-end">
									<Box mx={3}>
										<Button variant="contained" color="secondary">
											<Typography variant="button">Cancel</Typography>
										</Button>
									</Box>
									<Button variant="contained" color="primary">
										<Typography variant="button">Save & Close</Typography>
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
			<Grid item xs={0} md={2} lg={2}>
				<Box></Box>
			</Grid>
			<Grid item xs={12} md={8} lg={6}>
				<Card>
					<CardHeader
						action={
							passwordExpanded ? (
								<Link
									id="passwordandsecurity"
									style={{ cursor: 'pointer' }}
									onClick={handleExpandClick}
									variant="body2"
								>
									Close
								</Link>
							) : (
								<Link
									id="passwordandsecurity"
									style={{ cursor: 'pointer' }}
									onClick={handleExpandClick}
									variant="body2"
								>
									Update
								</Link>
							)
						}
						title="Password and security"
						subheader="Manage your sign in and security settings."
					/>

					<Collapse in={passwordExpanded} timeout="auto" unmountOnExit>
						<CardContent>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<TextField
										name="currentpassword"
										variant="standard"
										fullWidth
										id="currentpassword"
										label="Current Password"
										autoFocus
										onChange={handleChange}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										name="newpassword1"
										variant="standard"
										fullWidth
										id="newpassword1"
										label="Your New Password"
										autoFocus
										onChange={handleChange}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										name="newpassword2"
										variant="standard"
										fullWidth
										id="newpassword2"
										label="Confirm New Password"
										autoFocus
										onChange={handleChange}
									/>
								</Grid>
								<Grid container justifyContent="flex-end">
									<Box mx={3}>
										<Button variant="contained" color="secondary">
											<Typography variant="button">Cancel</Typography>
										</Button>
									</Box>
									<Button variant="contained" color="primary">
										<Typography variant="button">Save & Close</Typography>
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
			<Grid item xs={0} md={2} lg={2}>
				<Box></Box>
			</Grid>
			<Grid item xs={12} md={8} lg={6}>
				<Card>
					<CardHeader
						action={
							deleteExpanded ? (
								<Link
									id="deleteprofile"
									style={{ cursor: 'pointer' }}
									onClick={handleExpandClick}
									variant="body2"
								>
									Close
								</Link>
							) : (
								<Link
									id="deleteprofile"
									style={{ cursor: 'pointer', textDecoration: 'underline' }}
									onClick={handleExpandClick}
									variant="body1"
									color="red"
								>
									Delete
								</Link>
							)
						}
						title="Delete my profile"
						subheader="Proceeding will delete your profile data."
					/>

					<Collapse in={deleteExpanded} timeout="auto" unmountOnExit>
						<CardContent>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<TextField
										name="currentpassword"
										variant="standard"
										fullWidth
										id="currentpassword"
										label="Confirm password"
										autoFocus
										helperText="Your password must match"
										onChange={handleChange}
									/>
								</Grid>
								<Grid container justifyContent="flex-end">
									<Box mx={3}>
										<Button variant="contained" color="primary">
											<Typography variant="button">Cancel</Typography>
										</Button>
									</Box>
									<Button variant="contained" color="secondary">
										<Typography variant="button">Delete Profile</Typography>
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

export default Profile;
