import React, { useEffect } from 'react';
import Content from '../components/Content';
import {
	CardActionArea,
	CardContent,
	Menu,
	Typography,
} from '@material-ui/core';
import { Button } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_GET_HOME } from '../utils/queries';
import { Card } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { CardHeader } from '@material-ui/core';
import { Collapse } from '@material-ui/core';
import { useState } from 'react';
import { Link } from '@material-ui/core';
import { Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import SignUp from '../components/SignUp';
import AddArea from '../components/forms/AddArea';
import AddAttribute from '../components/forms/AddAttribute';
import AddDetail from '../components/forms/AddDetail';
import Transfer from '../components/Transfer';
import { Box } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { IconButton } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { Tooltip } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import {
	DELETE_AREA,
	DELETE_ATTRIBUTE,
	DELETE_DETAIL,
} from '../utils/mutations';
import Snack from '../components/Snack';
import { ADD_AREA } from '../utils/mutations';
import { Divider } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { AppBar } from '@material-ui/core';
import { Container } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { List } from '@material-ui/core';
import { ListItem } from '@material-ui/core';
import { ListItemAvatar } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
	root: {
		// minWidth: 275,
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
	inputRoot: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: '25ch',
		},
	},
	gridRoot: {
		flexGrow: 1,
	},
}));

function MyHome(props) {
	const classes = useStyles();
	const { homeid } = useParams();
	const [expandedId, setExpandedId] = useState(-1);
	const [open, setOpen] = useState(false);
	const [dense, setDense] = useState(false);

	const [modalIndex, setModalIndex] = useState(-1);
	const [areaModalOpen, setAreaModalOpen] = useState(false);
	const [attributeModalOpen, setAttributeModalOpen] = useState(false);
	const [detailModalOpen, setDetailModalOpen] = useState(false);
	const [transferModalOpen, setTransferModalOpen] = useState(false);
	const [deleteArea] = useMutation(DELETE_AREA);
	const [deleteAttribute] = useMutation(DELETE_ATTRIBUTE);
	const [deleteDetail] = useMutation(DELETE_DETAIL);
	const [home, setHome] = useState([]);

	const { loading, error, data } = useQuery(QUERY_GET_HOME, {
		onCompleted: setHome,
		variables: { homeId: homeid },
	});

	function capitalize(str) {
		const lower = str.toLowerCase();
		return str.charAt(0).toUpperCase() + lower.slice(1);
	}

	const [snack, setSnack] = useState({ status: false, message: '' });

	const handleModalOpen = (i) => {
		setModalIndex(i);
	};

	const handleExpandClick = (i) => {
		setExpandedId(expandedId === i ? -1 : i);
	};

	const handleAddAreaModal = () => {
		setAreaModalOpen(true);
	};
	const handleAttributeModal = () => {
		setAttributeModalOpen(true);
	};
	const handleDetailModal = () => {
		setDetailModalOpen(true);
	};
	const handleTransferModal = () => {
		setTransferModalOpen(true);
	};

	const handleDeleteArea = async (areaId) => {
		try {
			const mutationResponse = await deleteArea({
				variables: {
					areaId: areaId,
				},
			});

			if (mutationResponse) {
				const newHomeAfterDelete = {
					home: {
						...mutationResponse.data.deleteArea,
					},
				};

				setHome(newHomeAfterDelete);
				setSnack({ status: true, message: `Area has been deleted.` });
			}
		} catch (e) {
			console.log('error :>> ', e);
		}
	};
	const handleDeleteAttribute = async (attributeId) => {
		try {
			const mutationResponse = await deleteAttribute({
				variables: {
					attributeId: attributeId,
				},
			});

			if (mutationResponse) {
				const newHomeAfterDelete = {
					home: {
						...mutationResponse.data.deleteAttribute,
					},
				};

				setHome(newHomeAfterDelete);
				setSnack({ status: true, message: `Attribute has been deleted.` });
			}
		} catch (e) {
			console.log('error :>> ', e);
		}
	};
	const handleDeleteDetail = async (detailId) => {
		try {
			const mutationResponse = await deleteDetail({
				variables: {
					detailId: detailId,
				},
			});

			if (mutationResponse) {
				const newHomeAfterDelete = {
					home: {
						...mutationResponse.data.deleteDetail,
					},
				};

				setHome(newHomeAfterDelete);
				setSnack({ status: true, message: `Detail has been deleted.` });
			}
		} catch (e) {
			console.log('error :>> ', e);
		}
	};

	return (
		<React.Fragment>
			{loading ? (
				<h1>Loading...</h1>
			) : (
				<React.Fragment>
					<Grid container alignItems="stretch" spacing={3}>
						<React.Fragment>
							<Grid item xs={12} style={{ borderBottom: 'black solid 1px' }}>
								<Grid container justifyContent="center">
									<Grid item>
										<Typography variant="h2">
											{data.home.address.street1}
											<br></br>
											<Typography variant="h4">
												{data.home.address.city}, {data.home.address.state}
											</Typography>
											<Typography variant="h4">{data.home.address.zip}</Typography>
										</Typography>
									</Grid>

									{/* <Grid item xs={12}>
									<Typography variant="h2">{data.home.address.city}</Typography>
									</Grid>
									<Grid item xs={12}>
									<Typography variant="h2">{data.home.address.state}</Typography>
								</Grid> */}
									{/* <h1>{data.home.address.city + ', ' + data.home.address.state}</h1>
								<h1>{data.home.address.zip}</h1> */}
									{/* <br></br>
									<h3>Areas</h3> */}
								</Grid>
							</Grid>

							{home.home?.areas.map((area, i) => (
								<Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
									<Card>
										<CardHeader
											action={
												expandedId !== i ? (
													<IconButton onClick={() => handleExpandClick(i)}>
														<ExpandMoreIcon></ExpandMoreIcon>
													</IconButton>
												) : (
													<IconButton>
														<ExpandLessIcon
															onClick={() => {
																handleExpandClick(i);
															}}
														></ExpandLessIcon>
													</IconButton>
												)
											}
											title={capitalize(area.name)}
										></CardHeader>
										{expandedId !== i && (
											<CardContent>
												{area.attributes.length +
													(area.attributes.length === 1 ? ' attribute' : ' attributes')}
											</CardContent>
										)}
										<Collapse in={expandedId === i}>
											<CardContent>
												<List dense={dense}>
													{area.attributes.map((attribute, j) => (
														<React.Fragment>
															<Grid item xs={12}>
																<Box
																	display="flex"
																	alignItems="center"
																	justifyContent="space-between"
																>
																	<Box style={{ maxWidth: '50%' }}>
																		<Typography
																			style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
																			variant="body1"
																		>
																			<Link
																				onClick={() => {
																					handleModalOpen(j);
																				}}
																				style={{ textDecoration: 'none', cursor: 'pointer' }}
																			>
																				{capitalize(attribute.type)}
																			</Link>
																		</Typography>
																	</Box>

																	<Box>
																		<IconButton
																			onClick={() => handleDeleteAttribute(attribute._id)}
																		>
																			<DeleteForeverIcon color="secondary"></DeleteForeverIcon>
																		</IconButton>
																	</Box>
																</Box>
															</Grid>
															<Divider></Divider>
															<br></br>
															<Grid item xs={3}>
																<Modal
																	style={{
																		display: 'flex',
																		justifyContent: 'center',
																		alignContent: 'center',
																		alignItems: 'center',
																	}}
																	onClose={() => setModalIndex(-1)}
																	open={modalIndex === j && expandedId === i}
																>
																	<div>
																		<Card className={classes.root} variant="outlined">
																			<CardContent>
																				<div className={classes.gridRoot}>
																					<Grid container spacing={1}>
																						<Grid item xs={12}>
																							<h1>Detail</h1>
																							<Divider />
																						</Grid>
																						<Grid item xs={12} s={6}>
																							{attribute.detail.map((detail) => (
																								<Box display="flex" justifyContent="space-between">
																									<Typography variant="h3">
																										{capitalize(detail.key) +
																											': ' +
																											capitalize(detail.value)}
																									</Typography>
																									<IconButton
																										onClick={() => handleDeleteDetail(detail._id)}
																									>
																										<DeleteForeverIcon color="secondary"></DeleteForeverIcon>
																									</IconButton>
																								</Box>
																							))}

																							<Link
																								style={{ textDecoration: 'none', cursor: 'pointer' }}
																								onClick={handleDetailModal}
																							>
																								Add Detail
																							</Link>
																							<Modal
																								style={{
																									display: 'flex',
																									justifyContent: 'center',
																									alignItems: 'center',
																								}}
																								onClose={() => setDetailModalOpen(false)}
																								open={
																									detailModalOpen && expandedId === i && modalIndex === j
																								}
																							>
																								<AddDetail
																									attributeName={attribute.type}
																									attributeId={attribute._id}
																									setHome={setHome}
																									setDetailModalOpen={setDetailModalOpen}
																								></AddDetail>
																							</Modal>
																						</Grid>
																					</Grid>
																				</div>
																			</CardContent>
																		</Card>
																	</div>
																</Modal>
															</Grid>
														</React.Fragment>
													))}
												</List>
												<Box
													mt={2}
													display="flex"
													alignItems="center"
													justifyContent="space-between"
												>
													<Typography variant="body1">
														<Button
															onClick={handleAttributeModal}
															variant="contained"
															color="primary"
														>
															Add Attribute
														</Button>
														<Modal
															style={{
																display: 'flex',
																justifyContent: 'center',
																alignContent: 'center',
																alignItems: 'center',
															}}
															onClose={() => setAttributeModalOpen(false)}
															open={attributeModalOpen && expandedId === i}
														>
															<AddAttribute
																areaName={area.name}
																areaId={area._id}
																setHome={setHome}
																setAttributeModalOpen={setAttributeModalOpen}
															></AddAttribute>
														</Modal>
													</Typography>
													<Tooltip title="Delete Area">
														<IconButton
															onClick={() => {
																handleDeleteArea(area._id);
															}}
														>
															<HighlightOffIcon
																fontSize="large"
																color="secondary"
															></HighlightOffIcon>
														</IconButton>
													</Tooltip>
												</Box>
											</CardContent>
										</Collapse>
									</Card>
								</Grid>
							))}
							<Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
								<Card
									style={{
										display: 'flex',
										justifyContent: 'center',
										alignContent: 'center',
										height: '100%',
										backgroundColor: 'lightgreen',
									}}
								>
									<Tooltip title="Add Area">
										<CardActionArea
											style={{ display: 'flex', justifyContent: 'center' }}
											onClick={handleAddAreaModal}
											variant="contained"
										>
											<IconButton>
												<AddIcon color="primary" fontSize="large"></AddIcon>
											</IconButton>
										</CardActionArea>
									</Tooltip>
								</Card>
							</Grid>
							<Modal
								style={{
									display: 'flex',
									justifyContent: 'center',
									alignContent: 'center',
									alignItems: 'center',
								}}
								onClose={() => setAreaModalOpen(false)}
								open={areaModalOpen}
							>
								<AddArea
									setAreaModalOpen={setAreaModalOpen}
									homeId={data.home._id}
									setHome={setHome}
								></AddArea>
							</Modal>
							<Grid item xs={12} sm={6} md={4} lg={3} xl={2}></Grid>
						</React.Fragment>
					</Grid>
					<br></br>
					<Box mt={12}>
						<Grid container>
							<Grid item>
								<Button
									onClick={handleTransferModal}
									variant="contained"
									color="secondary"
								>
									Transfer Home
								</Button>
								<Modal
									style={{
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										alignContent: 'center',
									}}
									onClose={() => setTransferModalOpen(false)}
									open={transferModalOpen}
								>
									<Transfer
										home={data.home}
										setTransferModalOpen={setTransferModalOpen}
									></Transfer>
								</Modal>
							</Grid>
						</Grid>
					</Box>
				</React.Fragment>
			)}
			{snack.status ? (
				<Snack
					setOpen={setSnack}
					status={snack.status}
					message={snack.message}
				></Snack>
			) : null}
		</React.Fragment>
	);
}

export default MyHome;
