import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';

const styles = (theme) => ({
	paper: {
		maxWidth: 936,
		margin: 'auto',
		overflow: 'hidden',
	},
	searchBar: {
		borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
	},
	searchInput: {
		fontSize: theme.typography.fontSize,
	},
	block: {
		display: 'block',
	},
	addUser: {
		marginRight: theme.spacing(1),
	},
	contentWrapper: {
		margin: '40px 16px',
	},
});

function Content(props) {
	const { classes } = props;

	return (
		<Paper className={classes.paper}>
			<div className={classes.contentWrapper}>
				<Typography
					variant='h4'
					style={{ textAlign: 'center', fontWeight: 600 }}
				>
					Welcome to HomeFax!
				</Typography>
				<Divider />
				<br />
				<Typography color='textSecondary' align='center'>
					What Is HomeFax? - Bacon ipsum dolor amet pork drumstick pork chop
					andouille. Pork belly sirloin shank, venison drumstick landjaeger
					ground round pork. Filet mignon ham hock kevin tri-tip buffalo short
					loin. Flank jowl tenderloin bacon beef ribs short ribs t-bone tri-tip.
					Shoulder alcatra jerky, cupim picanha turducken hamburger tenderloin
					meatloaf beef ribs landjaeger tri-tip sausage pig chicken. Salami
					biltong picanha tri-tip turkey. Sausage corned beef tenderloin, ham
					hock drumstick meatball beef ribs flank shankle ribeye.
				</Typography>
				<Typography color='textSecondary' align='center'></Typography>
			</div>
		</Paper>
	);
}

Content.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);
