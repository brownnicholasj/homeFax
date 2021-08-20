import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import HomeIcon from '@material-ui/icons/Home';
import Modal from './Modal';
import HomeList from './HomeList';
import { useParams } from 'react-router-dom';
import { CardHeader, Collapse, Link, Grid } from '@material-ui/core';
import { QUERY_GET_HOME } from '../utils/queries';

const useStyles = makeStyles({
	root: {
		minWidth: 275,
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
});

export default function AreaCard({ area, i }) {
	const classes = useStyles();
	const { homeid } = useParams();
	const [expandedId, setExpandedId] = useState(-1);
	const [open, setOpen] = useState(false);
	const [modalIndex, setModalIndex] = useState(-1);

	const { loading, error, data } = useQuery(QUERY_GET_HOME, {
		variables: { homeId: homeid },
	});

	function capitalize(str) {
		const lower = str.toLowerCase();
		return str.charAt(0).toUpperCase() + lower.slice(1);
	}

	if (!loading) {
		// console.log('data :>> ', data);
	}

	const handleModalOpen = (i) => {
		setModalIndex(i);
	};

	const handleExpandClick = (i) => {
		console.log('i before state :>> ', expandedId);
		setExpandedId(expandedId === i ? -1 : i);
		console.log('i after state :>> ', expandedId);
	};

	return (
		<Card>
			<CardHeader
				action={
					<Link
						style={{ cursor: 'pointer' }}
						onClick={() => {
							console.log('i :>> ', i);
							handleExpandClick(i);
						}}
					>
						Inspect
					</Link>
				}
				title={capitalize(area.name)}
			></CardHeader>
			{expandedId !== i && (
				<CardContent>
					{area.attributes.length +
						(area.attributes.length === 1 ? ' attribute' : 'attributes')}
				</CardContent>
			)}
			<Collapse in={expandedId === i}>
				<CardContent>
					{area.attributes.map((attribute, j) => (
						<React.Fragment>
							<Grid item xs={12}>
								<Typography gutterBottom="true" variant="p" xs={12}>
									<Link
										onClick={() => {
											console.log('i :>> ', i);
											console.log('j :>> ', j);
											console.log('modalIndex :>> ', modalIndex);
											console.log('expandedId :>> ', expandedId);
											handleModalOpen(j);
											console.log('modalIndex :>> ', modalIndex);
										}}
										style={{ textDecoration: 'none', cursor: 'pointer' }}
									>
										{capitalize(attribute.type)}
									</Link>
								</Typography>
							</Grid>
							<br></br>
							<Grid item xs={3}>
								<Modal
									onClose={() => setModalIndex(-1)}
									open={modalIndex === j && expandedId === i}
								>
									<div className={classes.modal}>
										{attribute.detail.map((detail) => (
											<h1>{detail.key + ': ' + detail.value}</h1>
										))}
									</div>
								</Modal>
							</Grid>
						</React.Fragment>
					))}
					<Typography variant="p">
						<Button variant="contained" color="primary">
							Add Attribute
						</Button>
					</Typography>
				</CardContent>
			</Collapse>
		</Card>
	);
}
