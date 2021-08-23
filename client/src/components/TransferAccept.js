import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
// import Snack from './Snack';
import Auth from '../utils/auth';
import {
	Card,
	CardContent,
	Typography,
	makeStyles,
	Grid,
	TextField,
	Box,
	Button,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import { TRANSFER_HOME } from '../utils/mutations';
import HomeCard from './HomeCard';
import { useStoreContext } from '../utils/GlobalState';
import { UPDATE_TRANSFERS, ADD_HOME_TO_USER } from '../utils/actions';

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

function TransferAccept({ home, transfer, setTransferModalOpen }) {
	const classes = useStyles();
	const [state, dispatch] = useStoreContext();
	// const [snack, setSnack] = useState({ status: false, message: '' });
	const [acceptTransfer, { error }] = useMutation(TRANSFER_HOME);


	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			console.log('transferer :>> ', transfer.transferer[0]);
			console.log('receiver :>> ', transfer.receiver[0]);
			console.log('homeId :>> ', transfer.home._id);
			const mutationResponse = await acceptTransfer({
				variables: {
					transferer: transfer.transferer[0],
					receiver: transfer.receiver[0],
					home: transfer.home._id,
				},
			});
			if (mutationResponse) {
				const stateTransfers = mutationResponse.data.transferHome.transfers;
				setTransferModalOpen(false);
				dispatch({ type: UPDATE_TRANSFERS, transfers: stateTransfers });
				// dispatch({ type: ADD_HOME_TO_USER, transfers: stateTransfers });
				// setSnack({
				// 	status: true,
				// 	message: `Welcome to your new home! ${transfer.transferer[0]} has been removed.`,
				// });
			}
		} catch (e) {
			console.log(e);
		}
	};

	const handleCancel = (event) => {
		setTransferModalOpen(false);
	};

	return (
		<>
			<Card key={'homeId'} className={classes.root} variant='outlined'>
				<CardContent>
					<div className={classes.gridRoot}>
						<Grid container spacing={1}>
							{transfer ? (
								<div>
									<h3>Transfer</h3>
									<HomeCard home={home} />
								</div>
							) : (
								<h3>No Homes</h3>
							)}
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

							<Box mx={3} paddingTop={2} alignItems='center'>
								<Button variant='contained' color='secondary'>
									<Typography variant='button' onClick={handleCancel}>
										Cancel
									</Typography>
								</Button>

								{home ? (
									<Button variant='contained' color='primary'>
										<Typography variant='button' onClick={handleSubmit}>
											Accept
										</Typography>
									</Button>
								) : (
									''
								)}
							</Box>
						</Grid>
					</div>
				</CardContent>
			</Card>
		</>
	);
}

export default TransferAccept;
