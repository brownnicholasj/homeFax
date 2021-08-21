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
import { Box } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { IconButton } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { Tooltip } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { DELETE_AREA } from '../utils/mutations';
import Snack from '../components/Snack';
import { ADD_AREA } from '../utils/mutations';

const useStyles = makeStyles((theme) => ({
	modal: {
		width: '50%',
		justifyContent: 'center',
		backgroundColor: theme.palette.background.paper,
		borderRadius: '1rem',
	},
}));

function MyHome(props) {
	const classes = useStyles();
	const { homeid } = useParams();
	const [expandedId, setExpandedId] = useState(-1);
	const [open, setOpen] = useState(false);
	const [modalIndex, setModalIndex] = useState(-1);
	const [areaModalOpen, setAreaModalOpen] = useState(false);
	const [attributeModalOpen, setAttributeModalOpen] = useState(false);
	const [detailModalOpen, setDetailModalOpen] = useState(false);
	const [deleteArea] = useMutation(DELETE_AREA);
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

	const handleDeleteArea = async (areaId) => {
		try {
			const mutationResponse = await deleteArea({
				variables: {
					areaId: areaId,
				},
			});

			const areas = home.home.areas;

			const newHomeAfterDelete = {
				home: {
					address: home.home.address,
					areas: areas.filter((area) => {
						return area._id !== areaId;
					}),
					_typename: home.home._typename,
					_id: home.home._id,
				},
			};

			setHome(newHomeAfterDelete);
			console.log('newHomeAfterDelete :>> ', newHomeAfterDelete);

			if (mutationResponse) {
				setSnack({ status: true, message: `Area has been deleted.` });
			}
		} catch (e) {
			console.log('error :>> ', e);
		}
	};

	return (
		<React.Fragment>
			<Grid container spacing={3}>
				{loading ? (
					<h1>Loading...</h1>
				) : (
					<React.Fragment>
						<Grid item xs={12}>
							<h1>{data.home.address.street1}</h1>
							<h1>{data.home.address.city + ', ' + data.home.address.state}</h1>
							<h1>{data.home.address.zip}</h1>
							<br></br>
							<h3>Areas</h3>
						</Grid>
						{console.log('home :>> ', home)}
						{console.log('home.areas :>> ', home.home?.areas)}
						{home.home?.areas.map((area, i) => (
							<React.Fragment>
								<Grid item xs={3}>
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
												{area.attributes.map((attribute, j) => (
													<React.Fragment>
														<Grid item xs={12}>
															<Box
																display="flex"
																alignItems="center"
																justifyContent="space-between"
															>
																<Typography gutterBottom={true} variant="body1" xs={12}>
																	<Link
																		onClick={() => {
																			console.log('i :>> ', i);
																			console.log('j :>> ', j);
																			handleModalOpen(j);
																		}}
																		style={{ textDecoration: 'none', cursor: 'pointer' }}
																	>
																		{capitalize(attribute.type)}
																	</Link>
																</Typography>
																<IconButton>
																	<DeleteForeverIcon color="secondary"></DeleteForeverIcon>
																</IconButton>
															</Box>
														</Grid>
														<br></br>
														<Grid item xs={3}>
															<Modal
																onClose={() => setModalIndex(-1)}
																open={modalIndex === j && expandedId === i}
															>
																<div className={classes.modal}>
																	<h1>Details</h1>
																	{attribute.detail.map((detail) => (
																		<React.Fragment>
																			<h3>{detail.key + ': ' + detail.value}</h3>
																		</React.Fragment>
																	))}
																	<Link
																		style={{ textDecoration: 'none', cursor: 'pointer' }}
																		onClick={handleDetailModal}
																	>
																		Add Detail
																	</Link>
																	<Modal
																		onClose={() => setDetailModalOpen(false)}
																		open={detailModalOpen && expandedId === i && modalIndex === j}
																	>
																		<AddDetail
																			attributeName={attribute.type}
																			attributeId={attribute._id}
																			setHome={setHome}
																		></AddDetail>
																	</Modal>
																</div>
															</Modal>
														</Grid>
													</React.Fragment>
												))}
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
															onClose={() => setAttributeModalOpen(false)}
															open={attributeModalOpen && expandedId === i}
														>
															<AddAttribute
																areaName={area.name}
																areaId={area._id}
																setHome={setHome}
															></AddAttribute>
														</Modal>
													</Typography>
													<Tooltip title="Delete Area">
														<IconButton
															onClick={() => {
																console.log('area :>> ', area);
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
							</React.Fragment>
						))}
						<Grid item xs={3}>
							<Card>
								<CardActionArea onClick={handleAddAreaModal} variant="contained">
									Add Area
								</CardActionArea>
								<Modal onClose={() => setAreaModalOpen(false)} open={areaModalOpen}>
									<AddArea homeId={data.home._id} setHome={setHome}></AddArea>
								</Modal>
							</Card>
						</Grid>
					</React.Fragment>
				)}
			</Grid>
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
