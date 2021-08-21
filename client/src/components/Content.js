import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';

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
			{/* <AppBar
				className={classes.searchBar}
				position="static"
				color="default"
				elevation={0}
			>
				<Toolbar>
					<Grid container spacing={2} alignItems="center">
						<Grid item>
							<SearchIcon className={classes.block} color="inherit" />
						</Grid>
						<Grid item xs>
							<TextField
								fullWidth
								placeholder="Search by email address, phone number, or user UID"
								InputProps={{
									disableUnderline: true,
									className: classes.searchInput,
								}}
							/>
						</Grid>
						<Grid item>
							<Button variant="contained" color="primary" className={classes.addUser}>
								Add user
							</Button>
							<Tooltip title="Reload">
								<IconButton>
									<RefreshIcon className={classes.block} color="inherit" />
								</IconButton>
							</Tooltip>
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar> */}
			<div className={classes.contentWrapper}>
				<Typography style={{ textAlign: 'center', fontWeight: 600 }}>
					Welcome to HomeFax!
				</Typography>
				<Typography color="textSecondary" align="center">
					What Is HomeFax? - Bacon ipsum dolor amet pork drumstick pork chop
					andouille. Pork belly sirloin shank, venison drumstick landjaeger ground
					round pork. Filet mignon ham hock kevin tri-tip buffalo short loin. Flank
					jowl tenderloin bacon beef ribs short ribs t-bone tri-tip. Shoulder alcatra
					jerky, cupim picanha turducken hamburger tenderloin meatloaf beef ribs
					landjaeger tri-tip sausage pig chicken. Salami biltong picanha tri-tip
					turkey. Sausage corned beef tenderloin, ham hock drumstick meatball beef
					ribs flank shankle ribeye.
				</Typography>
				<Typography
					color="textSecondary"
					align="center"
					lineHeight={2}
				></Typography>
			</div>
		</Paper>
	);
}

Content.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);
