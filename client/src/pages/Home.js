import React, { useEffect } from 'react';
import Content from '../components/Content';
import { Menu } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';

// CODE ADDED FOR USE STATE TESTING
import { useStoreContext } from '../utils/GlobalState';
import Auth from '../utils/auth';
import { UPDATE_TRANSFERS } from '../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_USER_TRANSFERS } from '../utils/queries';

function Home() {
	const [state, dispatch] = useStoreContext();
	const { user, homes, transfers } = state;

	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};


	return (
		<React.Fragment>
			<h1>Home</h1>
			<div>
			<Button
					aria-controls="simple-menu"
					aria-haspopup="true"
					onClick={handleClick}
				>
					Open Menu
				</Button>
				{/* <Button
					aria-controls="simple-menu"
					aria-haspopup="true"
					onClick={handleState}
				>
					Test Reducer
				</Button> */}
				<Menu
					id="simple-menu"
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={handleClose}
				>
					<MenuItem onClick={handleClose}>Profile</MenuItem>
					<MenuItem onClick={handleClose}>My account</MenuItem>
					<MenuItem onClick={handleClose}>Logout</MenuItem>
				</Menu>
			</div>
			<Content></Content>
		</React.Fragment>
	);
}

export default Home;
