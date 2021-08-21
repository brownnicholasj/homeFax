import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useState } from 'react';
import SignUp from '../components/SignUp';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { LOGIN } from '../utils/mutations';
import { useStoreContext } from '../utils/GlobalState';
import { UPDATE_USER, UPDATE_HOMES } from '../utils/actions';
import { useHistory } from 'react-router-dom';

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="/">
				HomeFax
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100vh',
	},
	paper: {
		margin: theme.spacing(8, 4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	modal: {
		width: '50%',
		justifyContent: 'center',
		backgroundColor: theme.palette.background.paper,
		borderRadius: '1rem',
	},
}));

export default function SignIn() {
	const classes = useStyles();

	const [state, dispatch] = useStoreContext();

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const [open, setOpen] = useState(false);

	const modal = (
		<div className={classes.modal}>
			<SignUp></SignUp>
		</div>
	);

	const [formState, setFormState] = useState({
		identifier: '',
		password: '',
		errorMsg: '',
	});

	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword(!showPassword);
	const handleMouseDownPassword = () => setShowPassword(!showPassword);
	const history = useHistory();

	const [login] = useMutation(LOGIN);

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		try {
			const mutationResponse = await login({
				variables: {
					identifier: formState.identifier.toLowerCase(),
					password: formState.password,
				},
			});
			const { user, token } = mutationResponse.data.login;
			dispatch({ type: UPDATE_USER, user });
			const homes = user.homes;
			dispatch({ type: UPDATE_HOMES, homes });

			Auth.login(token);
			history.push('/home');
		} catch (e) {
			setFormState({ errorMsg: 'Incorrect Credentials' });
			console.log(e);
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormState({
			...formState,
			[name]: value,
		});
	};

	return (
		<div>
			<CssBaseline />

			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<form className={classes.form} noValidate>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="identifier"
						label="Email/Username"
						name="identifier"
						autoComplete="identifier"
						autoFocus
						onChange={handleChange}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						// showPassword state defaulted to false, will show text (showing) or password (hidden)
						type={showPassword ? 'text' : 'password'}
						id="password"
						autoComplete="current-password"
						onChange={handleChange}
						InputProps={{
							// This is where the toggle button is added.
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
									>
										{showPassword ? <Visibility /> : <VisibilityOff />}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
					<Typography variant="body1" color="error">
						{formState.errorMsg}
					</Typography>
					<br></br>
					<Button
						onClick={handleFormSubmit}
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Sign In
					</Button>
					<Grid container>
						<Grid item xs>
							<Link href="#" variant="body2">
								Forgot password?
							</Link>
						</Grid>
						<Grid item>
							<Link href="#" variant="body2" onClick={handleOpen}>
								Or Sign Up
							</Link>
							{/* <button type="button" onClick={handleOpen}>
								Or Sign Up
							</button> */}
							<Modal
								open={open}
								onClose={handleClose}
								aria-labelledby="simple-modal-title"
								aria-describedby="simple-modal-description"
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								{modal}
							</Modal>
						</Grid>
					</Grid>
				</form>
			</div>
		</div>
	);
}
